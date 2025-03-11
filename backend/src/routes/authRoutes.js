const express = require("express");
const router = express.Router();
const { User, validateUser, validateLogin } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

require('dotenv').config();

router.post("/signup", async (req, res) => {
    console.log(req.body);
    const { error } = validateUser(req.body);
    if(error) return res.status(400).json({
        success: false,
        message: error.details[0].message,
        status_code: 400
    });

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).json({
        success: false,
        message: "User already exists",
        status_code: 400
    });

    user = new User(req.body);
    user.name = user.name.trim();
    user.email = user.email.trim();
    user.password = await bcrypt.hash(user.password, 10);
    if(user.phone){
        user.phone = user.phone.trim();
        user.phone_verification_code = Math.floor(100000 + Math.random() * 900000).toString();
    }
    user.email_verification_code = Math.floor(100000 + Math.random() * 900000).toString();
    await user.save();
    

    const token = jwt.sign({ _id: user._id, role: user.role, email: user.email, phone: user.phone }, process.env.JWT_SECRET_KEY);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        status_code: 201,
        data: {
            user,
            token
        }
    });
});

router.post("/login", async (req, res) => {
    const { error } = validateLogin(req.body);
    if(error) return res.status(400).json({
        success: false,
        message: error.details[0].message,
        status_code: 400
    });

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        status_code: 400
    });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        status_code: 400
    });     

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        status_code: 200,
        data: {
            user,
            token
        }
    });
});

router.post("/logout", async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "User logged out successfully",
        status_code: 200
    });

});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login", session: false }),
    (req, res) => {
        console.log("Google Callback Triggered");
        console.log("Request User Object:", req.user);

        if (!req.user) {
            return res.status(400).json({
                success: false,
                message: "Google authentication failed",
                status_code: 400
            });
        }

        return res.status(200).json({
            success: true,
            message: "Google authentication successful",
            status_code: 200,
            data: {
                user: req.user.user,
                token: req.user.token
            }
        });
    }
);

module.exports = router;
