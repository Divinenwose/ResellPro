const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

router.get("/users", async (req, res) => {
    const users = await User.find({_id: {$nin: [req.user._id]}}).select("-password");
    
    return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users
    });
});

module.exports = router;
