const mongoose = require("mongoose");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const passport = require("passport");
require("./config/passport");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;

