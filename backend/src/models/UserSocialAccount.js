const mongoose = require("mongoose");

const userSocialAccountSchema = new mongoose.Schema({
    user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
    provider: { type: String, required: true },
    provider_user_id: { 
        type: String, 
        required: true 
    },
    metadata: {
        type: Object,
        default: {}
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

const UserSocialAccount = mongoose.model("UserSocialAccount", userSocialAccountSchema);

module.exports = UserSocialAccount;