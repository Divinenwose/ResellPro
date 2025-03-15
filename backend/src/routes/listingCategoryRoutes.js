const express = require("express");
const router = express.Router();
const { ListingCategory, validateListingCategory } = require("../models/ListingCategory");
const { sellerMiddleware, adminMiddleware } = require("../middlewares/roleMiddleware");
const { default: mongoose } = require("mongoose");


router.post("/create", adminMiddleware, async (req, res) => {
    const { error } = validateListingCategory(req.body);
    if (error) return res.status(400).send(
        {
            success: false,
            message: error.details[0].message,
            status_code: 400
        }
    );

    const category = await ListingCategory.findOne({ name: req.body.name });
    if (category) return res.status(400).send(
        {
            success: false,
            message: "Category already exists",
            status_code: 400
        }
    );
    
    const listingCategory = new ListingCategory({
        ...req.body
    });
    await listingCategory.save();
    return res.status(201).send(
        {
            success: true,
            message: "Listing category created successfully",
            status_code: 201,
            data: listingCategory
        }
    );
});

router.get("/", async (req, res) => {
    const listingCategories = await ListingCategory.find();
    return res.status(200).send(
        {
            success: true,
            message: "Listing categories fetched successfully",
            status_code: 200,
            data: listingCategories
        }
    );
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const categoryWithListings = await ListingCategory.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: "listings",
                    localField: "_id",
                    foreignField: "category",
                    as: "listings"
                }
            }
        ]);

        if (categoryWithListings.length === 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: "Category not found",
                    status_code: 404
                }
            );
        }

        return res.status(200).json(
            {
                success: true,
                message: "Category with listings fetched successfully",
                status_code: 200,
                data: categoryWithListings[0]
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).send(
            {
                success: false,
                message: "Server error",
                status_code: 500
            }
        );
    }
});

router.put("/:id", adminMiddleware, async (req, res) => {
    
    const { error } = validateListingCategory(req.body);
    if (error) return res.status(400).send(
        {
            success: false,
            message: error.details[0].message,
            status_code: 400
        }
    );  

    const listingCategory = await ListingCategory.findById(req.params.id);
    if (!listingCategory) return res.status(404).send(
        {
            success: false,
            message: "Listing category not found",
            status_code: 404
        }
    );


    const updatedListingCategory = await ListingCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).send(
        {
            success: true,
            message: "Listing category updated successfully",
            status_code: 200,
            data: updatedListingCategory
        }
    );
});

router.delete("/:id", adminMiddleware, async (req, res) => {  
    const listingCategory = await ListingCategory.findById(req.params.id);
    if (!listingCategory) return res.status(404).send(
        {
            success: false,
            message: "Listing category not found",
            status_code: 404
        }
    );
    await ListingCategory.findByIdAndDelete(req.params.id);
    return res.status(200).send(
        {
            success: true,
            message: "Listing category deleted successfully",
            status_code: 200,   
            data: listingCategory
        }
    );
});

module.exports = router;
