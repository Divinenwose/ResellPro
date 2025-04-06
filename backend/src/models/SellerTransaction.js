const mongoose = require('mongoose');

const sellerTransactionSchema = new mongoose.Schema({
  reference: { 
    type: String, 
    required: true
  },
  amount: { 
    type: Number, 
    required: true 
  },
  currency: { 
    type: String, 
    required: true,
    default: "NGN"
  },
  accountNumber: { 
    type: String, 
    required: false 
  },
  accountName: { 
    type: String, 
    required: false 
  },
  bankCode: { 
    type: String, 
    required: false 
  },
  listingId: { 
    type: String, 
    required: true 
  },
  bankName: { 
    type: String, 
    required: false 
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'paid', 'cancelled', 'to_be_paid'],
    default: 'pending'
  },
  paidAt: { 
    type: Date, 
    required: false 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const SellerTransaction = mongoose.model('SellerTransaction', sellerTransactionSchema);
module.exports = SellerTransaction;

