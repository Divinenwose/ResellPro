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
}

module.exports = PaystackService; 