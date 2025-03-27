const mongoose = require("mongoose");

const listingImageSchema = new mongoose.Schema({
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },
    image_path: {
        type: String,
        required: true
    },
    original_name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const ListingImage = mongoose.model("ListingImage", listingImageSchema);

module.exports = ListingImage;
