const rateLimit = require("express-rate-limit");
const connectDB = require('../config/db.cjs');
const Session = require('../models/session.js');
const paymentsave = require('../models/payment.js');

const checkFileLimit = async (req, res, next) => {
  const MAX_FILES = 2; // Limit for free plan per month
  const auth = req.headers['authorization'];
  const userId = auth.split(' ')[1];
  console.log("userAuthorization", userId);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  try {

    const fileCount = await Session.countDocuments({
      user_id: userId,
    });

    console.log('File count for user:', fileCount);
    const userPayment = await paymentsave.findOne({ userId: userId, status: 'completed' });
    console.log("usrPay", userPayment);

    if (fileCount >= MAX_FILES && (!userPayment || userPayment.plan !== 'paid')) {
      console.log("❌ File limit reached");
      const message = "❌ لقد وصلت للحد الشهري من الملفات في خطتك المجانية. قم بالترقية للوصول الكامل.";
      console.log('Returning rate limit response:', message); 
      return res.status(429).json({
        message: message,
      });
    }

    next();
  } catch (error) {
    console.error("Error while checking file limit:", error); 
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = checkFileLimit;
