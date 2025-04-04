const mongoose = require("mongoose");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");
const listingCategoryRoutes = require("./routes/listingCategoryRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
require("./config/passport");
const {User} = require("./models/User");
const UserSocialAccount = require("./models/UserSocialAccount");
const {Listing} = require("./models/Listing");
const ListingImage = require("./models/ListingImage");
const paymentRoutes = require('./routes/payment');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/uploads", express.static(path.join(__dirname, "../", "uploads")));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/listing-categories', listingCategoryRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/payments', paymentRoutes);

// app.use((req, res, next) => {
//     res.status(404).json({
//         success: false,
//         message: "Not found",
//         status_code: 404
//     });
// });

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({
//         success: false,
//         message: "Internal server error",
//         status_code: 500
//     });
// });

// a route to delete all users including the social media accounts, listings, and listing images (TO EXECUTE ONLY IN DEV ENVIRONMENT)
app.delete("/api/remove-all-data", async (req, res) => {
    if(!process.env.NODE_ENV || process.env.NODE_ENV !== "development") {
        return res.status(403).json({
            success: false,
            message: "This route is only available in development environment",
            status_code: 403
        });
    }
    await User.deleteMany();
    await UserSocialAccount.deleteMany();
    await Listing.deleteMany();
    await ListingImage.deleteMany();
    res.status(200).json({
        success: true,
        message: "All users, social media accounts, listings and listing images deleted",
        status_code: 200
    });
});

module.exports = app;
