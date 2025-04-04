const express = require("express");
const router = express.Router();
const { sellerMiddleware } = require("../middlewares/roleMiddleware");
const { User } = require("../models/User");
const SellerDetail = require("../models/SellerDetail");
const PaystackService = require('../services/paystackService');

const paystackService = new PaystackService();

router.get("/profile-details", sellerMiddleware, async (req, res) => {
    const user_id = req.user._id;

    try {
        const seller = await User.findOne({ _id: user_id, roles: { $in: ["seller"] } });
        if (!seller) return res.status(404).json({
            success: false,
            message: "Seller Information not found",
            status_code: 404
        });

        const sellerDetail = await SellerDetail.findOne({ user: user_id });
        const sellerProfile = {
            name: seller.name,
            email: seller.email,
            phone: seller.phone,
            businessName: sellerDetail.businessName ?? "",
            description: sellerDetail.description ?? ""
        }
        res.status(200).json({
            success: true,
            message: "Seller Information found",
            status_code: 200,
            data: sellerProfile
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            status_code: 500
        });
    }
});

router.put("/profile-details", sellerMiddleware, async (req, res) => {
    const user_id = req.user._id;
    const { businessName, description, accountNumber, bankCode, bankName, phone, addBankDetails = false } = req.body;
    let accountName;
    let recipientCode;
    if(addBankDetails){
        if(!accountNumber || !bankCode || !bankName){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                status_code: 400
            });
        }

        //create a transfer recipient
        try{
            
            //verify the bank account
            const bank = await paystackService.resolveBank(bankCode, accountNumber);
            if(bank.status === false){
                return res.status(400).json({
                    success: false,
                    message: "Invalid bank account",
                    status_code: 400
                });
            }
            accountName = bank.data.account_name;
            const transferRecipient = await paystackService.makeTransferRecipient(accountNumber, accountName, bankCode);
            recipientCode = transferRecipient.data.recipient_code;

        }catch(error){
            return res.status(400).json({
                success: false,
                message: "Failed to create transfer recipient",
                status_code: 400
            });
        }
    }

    try {
        const sellerDetail = await SellerDetail.updateOne(
            { user: user_id }, 
            { $set: { businessName, description, accountNumber, accountName, bankCode, bankName, phone, recipientCode } }, 
            { new: true }
        );
        if(!sellerDetail){
            return res.status(404).json({
                success: false,
                message: "Seller details not found",
                status_code: 404
            });
        }

        res.status(200).json({
            success: true,
            message: "Seller details updated",
            status_code: 200,
            data: sellerDetail
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            status_code: 500
        });
    }
});
module.exports = router;


