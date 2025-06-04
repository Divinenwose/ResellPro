const express = require("express");
const router = express.Router();
const { Listing, validateListing } = require("../models/Listing");
const { sellerMiddleware, listingMiddleware } = require("../middlewares/roleMiddleware");
const { ListingCategory } = require("../models/ListingCategory");
const { upload, uploadErrorHandler } = require("../middlewares/uploadMiddleware");
const ListingImage = require("../models/ListingImage");
const path = require("path");
const { default: mongoose } = require("mongoose");

// Create a new listing
router.post(
    "/create", 
    listingMiddleware, 
    upload.array("images", 5), 
    uploadErrorHandler,
    async (req, res) => {
    const { error } = validateListing(req.body);
    if (error) return res.status(400).send(
        {
            success: false,
            message: error.details[0].message,
            status_code: 400
        }
    );

    const category = await ListingCategory.findById(req.body.category_id);
    if (!category) return res.status(400).send(
        {
            success: false,
            message: "Category not found",
            status_code: 400
        }
    );
    
    const listing = new Listing({
        ...req.body, 
        seller: req.user._id,
        category: category._id
    });
    await listing.save();

    // Save images
    const images = req.files.map(file => ({
        listing: listing._id,
        image_path: path.relative(path.join(__dirname, "../../"), file.path),
        original_name: file.originalname
    }));
    await ListingImage.insertMany(images);

    const [listingData] = await Listing.aggregate([
      { $match: { _id: listing._id } },
      {
        $addFields: {
          price: { $toDouble: "$price" },
        },
      },

      {
        $lookup: {
          from: "listingimages",
          localField: "_id",
          foreignField: "listing",
          as: "images",
        },
      },
      {
        $lookup: {
          from: "listingcategories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },

      {
        $lookup: {
          from: "users",
          let: { sellerId: "$seller" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$sellerId"] } } },
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1
              },
            },
          ],
          as: "seller",
        },
      },
      { $unwind: "$seller" },
      {
        $project: {
          __v: 0,
          // if you have other top‐level fields to suppress, list them here
        },
      },
    ]);

    listingData.images = listingData.images.map((img) => ({
      _id: img._id,
      image_url: `${process.env.BASE_URL}/api/${img.image_path}`,
      original_name: img.original_name,
    }));

    return res.status(201).send({
      success: true,
      message: "Listing created successfully",
      status_code: 201,
      data: listingData,
    });
});

// Get listings with filters, including pagination
router.get("/", async (req, res) => {
    try {
      const {
        minPrice,
        maxPrice,
        category,
        condition,
        isEcoFriendly,
        autoRelist,
        search,
        page = 1,
        limit = 10,
        location,
        seller,
      } = req.query;
  
      const filters = {};
  
      if (minPrice && maxPrice) {
        filters.price = {
          $gte: parseFloat(minPrice),
          $lte: parseFloat(maxPrice),
        };
      }
      if (category) filters.category = category;
      if (condition) filters.condition = condition;
      if (isEcoFriendly !== undefined) {
        filters.isEcoFriendly = isEcoFriendly === "true";
      }
      if (autoRelist !== undefined) {
        filters.autoRelist = autoRelist === "true";
      }
      if (search) {
        filters.$text = { $search: search };
      }
      if (location) filters.location = location;
  
      if (seller) {
        try {
          filters.seller = mongoose.Types.ObjectId(seller);
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: "Invalid seller ID format",
            status_code: 400,
          });
        }
      }
  
      // Turn page/limit into numbers
      const pageInt = parseInt(page, 10);
      const limitInt = parseInt(limit, 10);
  
      const listings = await Listing.aggregate([
        { $match: filters },
        { $sort: { createdAt: -1 } },
        {
          $addFields: {
            price: { $toDouble: "$price" }
          }
        },
        {
          $lookup: {
            from: "listingimages",
            localField: "_id",
            foreignField: "listing",
            as: "images",
          },
        },
        {
          $lookup: {
            from: "listingcategories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" },
        {
          $lookup: {
            from: "users",
            let: { sellerId: "$seller" },

            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$sellerId"] } } },
              { $project: { 
                name: 1,
                email: 1,
                _id: 1
              } },
            ],
            as: "seller",
          },
        },
        { $unwind: "$seller" },
        {
          $project: {
            "seller.password": 0, // hide password
          },
        },
        { $skip: (pageInt - 1) * limitInt },
        { $limit: limitInt },
      ]);
  
      // Convert each image record into a full URL
      listings.forEach((listing) => {
        listing.images = listing.images.map((img) => ({
          _id: img._id,
          image_url: `${process.env.BASE_URL}/api/${img.image_path}`,
          original_name: img.original_name,
        }));
      });
  
      const totalListings = await Listing.countDocuments(filters);
  
      return res.status(200).json({
        success: true,
        message: "Listings fetched successfully",
        status_code: 200,
        data: listings,
        pagination: {
          total: totalListings,
          page: pageInt,
          limit: limitInt,
          pages: Math.ceil(totalListings / limitInt),
        },
      });
    } catch (error) {
      console.error("Error fetching listings:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        status_code: 500,
        error: error.message,
      });
    }
  });

// Get a single listing by ID
router.get("/:id", async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)
            .populate("category")
            .populate("seller", "name email phone");

        if (!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found",
                status_code: 404
            });
        }

        // Fetch images associated with the listing
        const images = await ListingImage.find({ listing: listing._id });

        return res.status(200).json({
            success: true,
            message: "Listing fetched successfully",
            status_code: 200,
            data: {
                ...listing.toObject(),
                images: images.map(img => ({
                    _id: img._id,
                    image_url: `${process.env.BASE_URL}/api/${img.image_path}`,
                    original_name: img.original_name
                }))
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            status_code: 500
        });
    }
});

// Update a listing
router.put("/:id", listingMiddleware, async (req, res) => {
    const { error } = validateListing(req.body);
    if (error) return res.status(400).send(
        {
            success: false,
            message: error.details[0].message,
            status_code: 400
        }
    );  

    const listing = await Listing.findById(req.params.id).populate("category").populate("seller");
    if (!listing) return res.status(404).send(
        {
            success: false,
            message: "Listing not found",
            status_code: 404
        }
    );
    if (listing.seller._id.toString() !== req.user._id.toString()) return res.status(403).send(
        {
            success: false,
            message: "You are not authorized to update this listing",
            status_code: 403
        }
    );


    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("category");
    return res.status(200).send(
        {
            success: true,
            message: "Listing updated successfully",
            status_code: 200,
            data: updatedListing
        }
    );
});

// Delete a listing
router.delete("/:id", listingMiddleware, async (req, res) => {  
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).send(
        {
            success: false,
            message: "Listing not found",
            status_code: 404
        }
    );
    if (listing.seller.toString() !== req.user._id.toString()) return res.status(403).send(
        {
            success: false,
            message: "You are not authorized to delete this listing",
            status_code: 403
        }
    );
    // Delete images
    await ListingImage.deleteMany({ listing: req.params.id });
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).send(
        {
            success: true,
            message: "Listing deleted successfully",
            status_code: 200,   
            data: listing
        }
    );
});

module.exports = router;
