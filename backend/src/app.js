const mongoose = require("mongoose");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");
const listingCategoryRoutes = require("./routes/listingCategoryRoutes");
const path = require("path");
const passport = require("passport");
require("./config/passport");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use("/api/uploads", express.static(path.join(__dirname, "../", "uploads")));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/listing-categories', listingCategoryRoutes);

module.exports = app;

