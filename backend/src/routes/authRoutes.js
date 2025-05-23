require('dotenv').config();
const express = require("express");
const router = express.Router();
const { User, validateUser, validateLogin } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const BlackListedToken = require("../models/BlackListedToken");
const UserSocialAccount = require("../models/UserSocialAccount");
const SellerDetail = require("../models/SellerDetail");
const PasswordReset = require("../models/PasswordReset");
const { sendEmail } = require('../utils/mailers');
const { renderTemplate } = require('../utils/templateEngine');


router.post("/signup", async (req, res) => {
    console.log(req.body);
    const { error } = validateUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
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

    if(req.body.role === "seller"){
        if(!req.body.businessName || !req.body.description){
            return res.status(400).json({
                success: false,
                message: "Business name and description are required for seller role",
                status_code: 400
            });
        }
    }

    user = new User(req.body);
    user.name = user.name.trim();
    user.email = user.email.trim();
    user.password = await bcrypt.hash(user.password, 10);
    if(req.body.role === "buyer"){
        user.roles = ["buyer"];
    } else if(req.body.role === "seller"){
        user.roles = ["seller", "buyer"];
    }
    if(user.phone){
        user.phone = user.phone.trim();
        user.phone_verification_code = Math.floor(100000 + Math.random() * 900000).toString();
    }
    user.email_verification_code = Math.floor(100000 + Math.random() * 900000).toString();
    await user.save();
    
    if(req.body.role === "seller"){
        const sellerDetail = new SellerDetail({
            user: user._id,
            businessName: req.body.businessName,
            description: req.body.description
        });
        await sellerDetail.save();
    }

    return res.status(201).json({
        success: true,
        message: "User created successfully",
        status_code: 201
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
    if(!user.roles.includes(req.body.role)){
        return res.status(400).json({
            success: false,
            message: "You are not authorized to login as a " + req.body.role,
            status_code: 400
        });
    }
    if(!user.password) {
        try {
            const userSocialAccount = await UserSocialAccount.findOne({ user: user._id });
            const authProvider = userSocialAccount.provider === "google" ? "Google" : "Facebook";
            return res.status(400).json({
                success: false,
                message: `This account is linked to your ${authProvider} account. Please log in with ${authProvider} instead of using a password.`,
                status_code: 400
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                status_code: 500
            });
        }
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        status_code: 400
    });     

    const token = jwt.sign({ _id: user._id, roles: user.roles, email: user.email, phone: user.phone, name: user.name }, 
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

router.post("/admin-login", async (req, res) => {
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
    if(!user.roles.includes("admin")){
        return res.status(400).json({
            success: false,
            message: "Invalid email or password",
            status_code: 400
        });
    }
    if(!user.password) {
        try {
            const userSocialAccount = await UserSocialAccount.findOne({ user: user._id });
            const authProvider = userSocialAccount.provider === "google" ? "Google" : "Facebook";
            return res.status(400).json({
                success: false,
                message: `This account is linked to your ${authProvider} account. Please log in with ${authProvider} instead of using a password.`,
                status_code: 400
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                status_code: 500
            });
        }
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        status_code: 400
    });     

    const token = jwt.sign({ _id: user._id, roles: user.roles, email: user.email, phone: user.phone, name: user.name }, 
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

        
    } catch (error) {

        await BlackListedToken.create({
            token,
            expiresAt: new Date() // Use current date and time
        });
    }

    return res.status(200).json({
        success: true,
        message: "User logged out successfully",
        status_code: 200
    });

});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    (req, res) => {

        if (!req.user) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=GoogleAuthFailed`);
        }
        const token = req.user.token;
        return res.redirect(`${process.env.FRONTEND_URL}/?token=${token}&authType=google`);
    }
);

router.get("/facebook", passport.authenticate("facebook", {scope: ["email", "public_profile"	]}));

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/", session: false }),
    (req, res) => {

        if (!req.user) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=FacebookAuthFailed`);
        }
        const token = req.user.token;
        return res.redirect(`${process.env.FRONTEND_URL}/?token=${token}&authType=facebook`);
    }
);

//forget password
router.post('/forget-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json(
            {
                success: false,
                message: "User not found",
                status_code: 404
            }
        );
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const passwordReset = new PasswordReset({
        email: user.email,
        token: token,
        userType: user.user_type
    });
    await passwordReset.save();

    const html = renderTemplate('reset-password', { resetLink });
    try{
        let to = process.env.LOCAL_EMAIL;
        if(process.env.NODE_ENV === "production"){
            to = user.email;
        }
        await sendEmail({
            to: to,
            subject: 'Reset Password',
            html: html
        });
        return res.status(200).json({
            success: true,
            message: 'Reset password email sent',
            status_code: 200
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            status_code: 500
        });
    }
});

router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                status_code: 404
            });
        }

        //check if token is here
        const passwordReset = await PasswordReset.findOne({ token: token, email: decoded.email });
        if(!passwordReset){
            return res.status(404).json({
                success: false,
                message: "Invalid or expired token",
                status_code: 404
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await User.updateOne({ email: decoded.email }, { $set: { password: hashedPassword } });

        
        //expire token
        await PasswordReset.deleteOne({ token: token, email: decoded.email });
        
        return res.status(200).json({
            success: true,
            message: 'Password reset successful',
            status_code: 200
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: 'invalid or expired token, Please request a new reset password link',
            status_code: 400
        });
    }
});


module.exports = router;
