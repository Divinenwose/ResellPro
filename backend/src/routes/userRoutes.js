const express = require("express");
const { User } = require("../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users
    });
});

module.exports = router;


