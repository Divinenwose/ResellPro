const express = require("express");
const router = express.Router();
const { sellerMiddleware } = require("../middlewares/roleMiddleware");
const { User } = require("../models/User");
const SellerDetail = require("../models/SellerDetail");

router.get("/profile-details", sellerMiddleware, async (req, res) => {
    const user_id = req.user._id;

    try {
        const seller = await User.findOne({ _id: user_id, roles: { $in: ["seller"] } });
        if (!seller) return res.status(404).json({
            success: false,
            message: "Seller Information not found",
            status_code: 404
        });

        const sellerDetail = await SellerDetail.findOne({ user: user_id });
        const sellerProfile = {
            name: seller.name,
            email: seller.email,
            phone: seller.phone,
            businessName: sellerDetail.businessName ?? "",
            description: sellerDetail.description ?? ""
        }
        res.status(200).json({
            success: true,
            message: "Seller Information found",
            status_code: 200,
            data: sellerProfile
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            status_code: 500
        });
    }
});

router.put("/profile-details", sellerMiddleware, (req, res) => {
    res.send("Seller profile");
});

module.exports = router;


