const express = require("express");
const { User } = require("../models/User");
const router = express.Router();
const { buyerMiddleware } = require("../middlewares/roleMiddleware");

router.get("/", async (req, res) => {
    const users = await User.find().select("-password");

    return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users
    });
});

module.exports = router;


