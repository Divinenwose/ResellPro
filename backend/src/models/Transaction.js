const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    userType: { 
        type: String, 
        required: true 
    },
    reference: { 
        type: String, 
        required: true 
    },
    paymentMethod: { 
        type: String, 
        required: true 
    },
    paymentStatus: { 
        type: String, 
        required: true 
    },
    paymentDate: { 
        type: Date, 
        required: true 
    },
    paymentMetadata: { 
        type: Object, 
        required: true 
    },
    paymentReason: { 
        type: String, 
        required: false 
    },
    verificationResponse: { 
        type: Object, 
        required: false 
    },
    webhookResponse: { 
        type: Object, 
        required: false 
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

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;

