const mongoose = require("mongoose");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
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
const { adminMiddleware } = require("./middlewares/roleMiddleware");
const seedUsers = require("./seeders/userSeeder");
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
app.use('/api/admin', adminMiddleware, adminRoutes);


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
app.post('/seed/users', async (req, res) => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      const result = await seedUsers();
      res.status(200).json({ success: true, message: result });
    } catch (err) {
      console.error('Seeder failed:', err);
      res.status(500).json({ success: false, message: 'Seeding failed', error: err.message });
    }
  });
module.exports = app;
