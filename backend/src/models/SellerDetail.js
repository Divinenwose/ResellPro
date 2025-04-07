const mongoose = require("mongoose");

const sellerDetailSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    businessName: { type: String, required: true },
    description: { type: String, required: true },
    accountNumber: { type: String, required: false },
    accountName: { type: String, required: false },
    bankName: { type: String, required: false },
    bankCode: { type: String, required: false },
    recipientCode: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const SellerDetail = mongoose.model("SellerDetail", sellerDetailSchema);

module.exports = SellerDetail;
