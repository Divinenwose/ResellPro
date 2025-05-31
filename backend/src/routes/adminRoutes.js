const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { ListingCategory } = require("../models/ListingCategory");
const { Listing } = require("../models/Listing");

router.get("/users", async (req, res) => {
    const users = await User.find({_id: {$nin: [req.user._id]}}).select("-password");
    
    return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users
    });
});

router.get("/stats", async (req, res) => {
    const users = await User.find({});
    const categories = await ListingCategory.find({});
    const most_popular_category_id = await Listing.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 }
    ]);
    let most_popular_category = await ListingCategory.findById(most_popular_category_id) || null;

    let data = [];
    let total_users = 0;
    let total_sellers = 0;
    let total_buyers = 0;
    let total_categories = 0;
    let total_listings = 0;

    users.forEach(user => {
        total_users += 1;
        if (user.roles.includes("seller")) {
            total_sellers += 1;
        } else if (user.roles.includes("buyer")) {
            total_buyers += 1;
        }
    });

    

    data.push({
        total_users: total_users,
        total_sellers: total_sellers,
        total_buyers: total_buyers,
        total_categories: categories.length,
        total_listings: total_listings,
        most_popular_category: most_popular_category
    });
    

    return res.status(200).json({
        success: true,
        message: "Stats fetched successfully",
        data: data
    });
});

module.exports = router;
