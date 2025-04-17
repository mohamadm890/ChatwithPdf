const mongoose = require('mongoose');


const PaymentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, 
    amount: { type: Number, required: true }, 
    currency: { type: String, default: "USD" }, 
    paymentMethod: { type: String, enum: ["paypal", "credit_card"], required: true }, 
    transactionId: { type: String, required: true, unique: true }, 
    status: { 
      type: String, 
      enum: ["pending", "completed", "failed", "refunded"], 
      default: "pending" 
    }, // Payment status
    payerDetails: {
      email: { type: String }, 
      cardLast4: { type: String }, 
    },
    credits: { 
      type: Number, 
      default: 0, 
      min: 0 
    }, 
    plan: { 
      type: String, 
      enum: ["free", "paid"], 
      default: "free" 
    }, 
  },
  { timestamps: true }
);

PaymentSchema.index({ transactionId: 1 }, { unique: true });

const payment = mongoose.model("Payment", PaymentSchema);

module.exports = payment;
