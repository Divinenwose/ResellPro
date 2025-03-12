const express = require("express");
const router = express.Router();
const { Listing, validateListing } = require("../models/Listing");
const { sellerMiddleware, listingMiddleware } = require("../middlewares/roleMiddleware");
const { ListingCategory } = require("../models/ListingCategory");


router.post("/create", listingMiddleware, async (req, res) => {
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
    const listingData = await Listing.findById(listing._id).populate("category");
    return res.status(201).send(
        {
            success: true,
            message: "Listing created successfully",
            status_code: 201,
            data: listingData
        }
    );
});

router.get("/", async (req, res) => {
    const listings = await Listing.find().populate("category").populate("seller", "name email phone");
    return res.status(200).send(
        {
            success: true,
            message: "Listings fetched successfully",
            status_code: 200,
            data: listings
        }
    );
});

router.get("/:id", async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate("category").populate("seller", "name email phone");
    if (!listing) return res.status(404).send(
        {
            success: false,
            message: "Listing not found",
            status_code: 404
        }
    );
    res.status(200).send(
        {
            success: true,
            message: "Listing fetched successfully",
            status_code: 200,
            data: listing
        }
    );
});

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
