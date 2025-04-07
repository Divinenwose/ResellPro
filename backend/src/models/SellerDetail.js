const mongoose = require("mongoose");

const sellerDetailSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    businessName: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const SellerDetail = mongoose.model("SellerDetail", sellerDetailSchema);

module.exports = SellerDetail;
