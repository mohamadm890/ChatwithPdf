const rateLimit = require("express-rate-limit");

const freeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Free users: 10 requests per 15 mins

    message: { message: "Free plan limit reached. Upgrade for more access." },
    keyGenerator: (req) => {
        // 👇 Make sure req.user exists from your auth middleware
        return req.user?.id || req.ip; // fallback to IP if not logged in
      },
  });

  
  

  module.exports = freeLimiter;