const express = require('express');
const PaystackService = require('../services/paystackService');
const { Listing, validateListing } = require("../models/Listing");
const Joi = require('joi');
const Transaction = require('../models/Transaction');
const { User } = require('../models/User');

const router = express.Router();
const paystackService = new PaystackService();

// Initialize a transaction
router.post('/initialize', async (req, res) => {
  const { email, amount, userId, userType, listingId = null, paymentReason, paymentMethod} = req.body;
  
  if (!email || !amount || !userId || !userType || !paymentReason || !paymentMethod) {
    return res.status(400).json({
      success: false,
      message: "Email, amount, userId, userType, paymentReason and paymentMethod are required",
      status_code: 400
    });
  }

  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  if(listingId){
    if (!objectIdPattern.test(listingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid listingId",
        status_code: 400
      });
    }
  }

  if(userId){
    if (!objectIdPattern.test(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
        status_code: 400
      });
    }
  }

  //check if the listingId is valid
  if (listingId) {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(400).json({
        success: false,
        message: "Invalid listingId",
        status_code: 400
      });
    }
  }

  //check if the userId is valid
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid user",
      status_code: 400
    });
  }

  try {
    let data;
    if(paymentMethod === "paystack"){
      data = await paystackService.initializeTransaction(email, amount);
    }else{
      //add other payment methods here
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
        status_code: 400
      });
    }

    //create a new transaction in the database
    const transaction = await Transaction.create({
      email: email,
      amount: amount,
      userId: userId,
      userType: userType,
      reference: data.data.reference,
      paymentMethod: paymentMethod,
      paymentStatus: "pending",
      paymentDate: new Date(),
      paymentMetadata: data.data,
      listingId: listingId,
      verificationResponse: null,
      paymentReason: paymentReason
    });

    res.json({
      success: true,
      message: "Transaction initialized successfully",
      data: data,
      status_code: 200
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Transaction initialization failed",
      error: error.message,
      status_code: 500
    });
  }
});

// Verify a transaction
router.get('/verify/:reference', async (req, res) => {
  const { reference } = req.params;

  try {
    const transaction = await Transaction.findOne({ reference: reference });
    if(!transaction){
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
        status_code: 404
      });
    }

    let data;
    if(transaction.paymentMethod === "paystack"){
      data = await paystackService.verifyTransaction(reference);
    }else{
      //add other payment methods here
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
        status_code: 400
      });
    }

    transaction.paymentStatus = data.data.status;
    transaction.paymentDate = new Date();
    transaction.paymentMetadata = data.data;
    transaction.verificationResponse = data.data;
    await transaction.save();

    res.json({
      success: true,
      message: "Transaction verified successfully",
      data: data,
      status_code: 200
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Transaction verification failed",
      error: error.message,
      status_code: 500
    });
  }
});

module.exports = router; 