const express = require("express");
const router = express.Router();
const { User, validateUser, validateLogin } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const BlackListedToken = require("../models/BlackListedToken");

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
    

    const token = jwt.sign({ _id: user._id, role: user.role, email: user.email, phone: user.phone }, 
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: "4h" });
    return res.status(201).json({
        success: true,
        message: "User created successfully",
        status_code: 201,
        data: {
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                is_verified_email: user.is_verified_email,
                is_verified_phone: user.is_verified_phone,
                phone_verification_code: user.phone_verification_code,
                email_verification_code: user.email_verification_code,
                created_at: user.created_at,
                updated_at: user.updated_at,
                __v: user.__v
            },
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

    const token = jwt.sign({ _id: user._id, role: user.role, email: user.email, phone: user.phone }, 
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: "4h" });
    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        status_code: 200,
        data: {
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                is_verified_email: user.is_verified_email,
                is_verified_phone: user.is_verified_phone,
                phone_verification_code: user.phone_verification_code,
                email_verification_code: user.email_verification_code,
                created_at: user.created_at,
                updated_at: user.updated_at,
                __v: user.__v
            },
            token
        }
    });
});

router.post("/logout", async (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        await BlackListedToken.create({
            token,
            expiresAt: new Date(decoded.exp * 1000) 
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully",
            status_code: 200
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid token",
            status_code: 400
        });
    }

});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login", session: false }),
    (req, res) => {

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
                user: {
                    name: req.user.name,
                    email: req.user.email,
                    phone: req.user.phone,
                    role: req.user.role,
                    is_verified_email: req.user.is_verified_email,
                    is_verified_phone: req.user.is_verified_phone,
                    phone_verification_code: req.user.phone_verification_code,
                    email_verification_code: req.user.email_verification_code,
                    created_at: req.user.created_at,
                    updated_at: req.user.updated_at,
                    __v: req.user.__v
                },
                token: req.user.token
            }
        });
    }
);

module.exports = router;
