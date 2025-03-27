const mongoose = require("mongoose");
const Joi = require("joi");
const listingCategorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const validateListingCategory = (listingCategory) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        description: Joi.string().required().min(3).max(255),
    });
    return schema.validate(listingCategory);
};

const ListingCategory = mongoose.model("ListingCategory", listingCategorySchema);
module.exports = {
    ListingCategory,
    validateListingCategory
};
