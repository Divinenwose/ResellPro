const express = require('express');
const PaystackService = require('../services/paystackService');
const { Listing, validateListing } = require("../models/Listing");
const Joi = require('joi');
const Transaction = require('../models/Transaction');
const { User } = require('../models/User');
const crypto = require('crypto');
const SellerTransaction = require('../models/SellerTransaction');
const SellerDetail = require('../models/SellerDetail');

const router = express.Router();
const paystackService = new PaystackService();

// Initialize a transaction
router.post('/initialize', async (req, res) => {
  const { email, amount, userId, userType, listingIds = [], paymentReason, paymentMethod} = req.body;
  
  if (!email || !amount || !userId || !userType || !paymentReason || !paymentMethod) {
    return res.status(400).json({
      success: false,
      message: "Email, amount, userId, userType, paymentReason and paymentMethod are required",
      status_code: 400
    });
  }

  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  let listingIdsArray = [];
  if(listingIds){
    if (typeof listingIds !== 'object') {
      return res.status(400).json({
        success: false,
        message: "ListingIds must be an array",
        status_code: 400
      });
    }
    for (const listingId of listingIds) {
      if (!objectIdPattern.test(listingId)) {
        return res.status(400).json({
        success: false,
        message: "Invalid listingId",
          status_code: 400
        });
      }

      const listing = await Listing.findById(listingId);
      if (!listing) {
        return res.status(400).json({
          success: false,
          message: "Invalid listingId",
          status_code: 400
        });
      }
      const sellerAccountDetails = await SellerDetail.findOne({ user: listing.seller._id });
      if(!sellerAccountDetails || (sellerAccountDetails && !sellerAccountDetails.accountNumber)){
        return res.status(400).json({
          success: false,
          message: "Seller account details not found",
          status_code: 400
        });
      }
      listingIdsArray.push({
        listingId: listingId,
        amount: listing.price,
        accountNumber: sellerAccountDetails.accountNumber,
        accountName: sellerAccountDetails.accountName,
        bankCode: sellerAccountDetails.bankCode,
        bankName: sellerAccountDetails.bankName
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
      verificationResponse: null,
      paymentReason: paymentReason
    });

    //create a new seller transaction in the database
    if(listingIdsArray.length > 0){
      for (const listingId of listingIdsArray) {
        const sellerTransaction = await SellerTransaction.create({
          reference: data.data.reference,
          amount: listingId.amount,
          listingId: listingId.listingId,
          accountNumber: listingId.accountNumber,
          accountName: listingId.accountName,
          bankCode: listingId.bankCode,
          bankName: listingId.bankName
        });
      }
    }

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

//paystack webhook
router.post('/paystack/webhook', async (req, res) => {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  try{
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    console.log(hash, req.headers['x-paystack-signature']);
    if (hash == req.headers['x-paystack-signature']) {
      console.log("hash is valid");
      const event = req.body;
      console.log(req.body);
      if(event.event && (event.event === "charge.success" || event.event === "transfer.success" || event.event === "transfer.failed" || event.event === "transfer.reversed")){
        const transaction = await Transaction.findOne({ reference: event.data.reference });
        if(transaction){
          transaction.paymentStatus = event.data.status;
          transaction.paymentDate = new Date();
          transaction.webhookResponse = event.data;
          await transaction.save();

          //update the seller transaction
          if(event.event === "charge.success" && event.data.status === "success"){
            const sellerTransactions = await SellerTransaction.find({ reference: event.data.reference });
            if(sellerTransactions){
              for (const sellerTransaction of sellerTransactions) {
                sellerTransaction.status = "to_be_paid";
                await sellerTransaction.save();
              }
            }
          }
        }
      }
    }

    res.json({
      success: true,
      message: "Webhook received successfully",
      status_code: 200
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Webhook verification failed",
      error: error.message,
      status_code: 500
    });
  }
});

//my balance 
router.get('/paystack/balance', async (req, res) => {
  try{
    const balance = await paystackService.getBalance();
    res.json({
      success: true,
      message: "Balance fetched successfully",
      data: balance.data,
      status_code: 200
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Balance fetching failed",
      error: error.message,
      status_code: 500
    });
  }
});

//make a transfer
router.post('/paystack/transfer', async (req, res) => {
  const { amount, transferRecipientCode, reason } = req.body;
  if(!amount || !transferRecipientCode || !reason){
    return res.status(400).json({
      success: false,
      message: "Amount, transfer recipient code and reason are required",
      status_code: 400
    });
  }
  try{
    const transfer = await paystackService.makeTransfer(amount, transferRecipientCode, reason);
    res.json({
      success: true,
      message: "Transfer made successfully",
      data: transfer,
      status_code: 200
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Transfer failed",
      error: error.message,
      status_code: 500
    });
  }
});

//get bank list
router.get('/paystack/banklist', async (req, res) => {
  try{
    const bankList = await paystackService.getBankList();
    res.json({  
      success: true,
      message: "Bank list fetched successfully",
      data: bankList.data,
      status_code: 200
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Bank list fetching failed",
      error: error.message,
      status_code: 500
    });
  }
});

//resolve bank account
router.get('/paystack/resolvebank', async (req, res) => {
  const { bankCode, accountNumber } = req.body;
  if(!bankCode || !accountNumber){
    return res.status(400).json({
      success: false,
      message: "Bank code and account number are required",
      status_code: 400
    });
  }
  try{
      const bank = await paystackService.resolveBank(bankCode, accountNumber);
      res.json({
      success: true,
      message: "Bank resolved successfully",
      data: bank.data,
      status_code: 200
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Bank resolution failed",
      error: error.message,
        status_code: 500
      });
    }

});

module.exports = router; 