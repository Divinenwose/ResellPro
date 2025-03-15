const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: { 
        type: String,
        default: null 
    },
    password: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ["buyer", "seller", "admin"],
        default: "buyer",
    },
    is_verified_email: {
        type: Boolean,
        default: false,
    },
    is_verified_phone: {
        type: Boolean,
        default: false,
    },
    phone_verification_code: {
        type: String,
        default: null,
    },
    email_verification_code: {
        type: String,
        default: null,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(255),
        email: Joi.string().email().required().min(6).max(255),
        password: Joi.string().required().min(6).max(255),
        role: Joi.string().valid("buyer", "seller", "admin").required(),
        phone: Joi.string().min(10).max(15),
    });
    return schema.validate(user);
};

const validateLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required().min(6).max(255),
        password: Joi.string().required().min(6).max(255),
        role: Joi.string().valid("buyer", "seller", "admin").required(),
    });
    return schema.validate(user);
};

module.exports = { User, validateUser, validateLogin };
