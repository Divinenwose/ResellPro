const mongoose = require("mongoose");

const blackListedTokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true }
});

const BlackListedToken = mongoose.model("BlackListedToken", blackListedTokenSchema);

module.exports = BlackListedToken;