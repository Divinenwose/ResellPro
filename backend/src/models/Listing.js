const mongoose = require("mongoose");
const Joi = require("joi");
const listingSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 255
    },
    description: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 255
    },
    price: { 
        type: mongoose.Schema.Types.Decimal128, 
        required: true,
        validate: {
            validator: function(v) {
                return parseFloat(v) > 0;
            },
            message: "Price must be greater than 0"
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ListingCategory",
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    condition: {
        type: String,
        required: true,
        enum: ["new", "used", "like_new"]
    },
    isEcoFriendly: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["active", "expired", "sold", "removed", "inactive"],
        default: "active"
    },
    expirationDate: {
        type: Date,
        default: null
    },
    autoRelist: {
        type: Boolean,
        default: false
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

listingSchema.index({ 
    price: 1, 
    category: 1, 
    condition: 1, 
    isEcoFriendly: 1, 
    autoRelist: 1 
});

listingSchema.index({ title: "text", description: "text" }); 

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const validateListing = (listing) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0).required(),
        
        category_id: Joi.string()
            .regex(objectIdPattern)
            .required()
            .messages({
                "string.pattern.base": "Invalid ObjectId format. Must be a 24-character hex string.",
                "any.required": "Category ID is required."
            }),
        condition: Joi.string().valid("new", "used", "like_new").required(),
        isEcoFriendly: Joi.boolean().required(),
        status: Joi.string().valid("active", "expired", "sold", "removed", "inactive"),
        expirationDate: Joi.date(),
        autoRelist: Joi.boolean().required(),
        images: Joi.array().items(Joi.string())
    });
    return schema.validate(listing);
};

const Listing = mongoose.model("Listing", listingSchema);

module.exports = {
    Listing,
    validateListing
};
