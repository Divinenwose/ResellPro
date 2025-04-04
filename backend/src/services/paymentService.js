class PaymentService {
  initializeTransaction(email, amount) {
    throw new Error("Method 'initializeTransaction()' must be implemented.");
  }

  verifyTransaction(reference) {
    throw new Error("Method 'verifyTransaction()' must be implemented.");
  }
}

module.exports = PaymentService; 