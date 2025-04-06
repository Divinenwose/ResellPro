const axios = require('axios');
const PaymentService = require('./paymentService');

class PaystackService extends PaymentService {
  async initializeTransaction(email, amount) {
    try {
      const response = await axios.post('https://api.paystack.co/transaction/initialize', {
        email,
        amount: amount * 100, // Paystack expects the amount in kobo
      }, {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async verifyTransaction(reference) {
    try {
      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getBalance() {
    try {
      const response = await axios.get('https://api.paystack.co/balance', {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async makeTransfer(amount, transferRecipientCode, reason) {
    try {
      const response = await axios.post('https://api.paystack.co/transfer', {
        amount: amount * 100,//paystack expects the amount in kobo
        source: 'balance',
        recipient: transferRecipientCode,
        reason,
      }, {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async makeTransferRecipient(accountNumber, accountName, bankCode) {
    try {
      const response = await axios.post('https://api.paystack.co/transferrecipient', {
        account_number: accountNumber,
        name: accountName,
        bank_code: bankCode,
        type: 'nuban',
        currency: 'NGN',
      }, {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  } 

  async resolveBank(bankCode, accountNumber) {
    try {
      const response = await axios.get(`https://api.paystack.co/bank/resolve?bank_code=${bankCode}&account_number=${accountNumber}`, {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTransferRecipient(recipientCode) {
    try {
      const response = await axios.get(`https://api.paystack.co/transferrecipient/${recipientCode}`, {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTransferRecipientList() {
    try {
      const response = await axios.get('https://api.paystack.co/transferrecipient', {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getBankList() {
    try {
      const response = await axios.get('https://api.paystack.co/bank', {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
}

module.exports = PaystackService; 