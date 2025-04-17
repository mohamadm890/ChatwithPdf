const paymentsave = require('../models/payment.js');
const userRetryCount = new Map(); 

const reduceCredite = async (req, res, next) =>  {
    try {
    const { userId } = req.body;
    console.log(userId);
    const find_user = await paymentsave.findOne({userId, plan: "paid"});
    console.log("this user", find_user);

    if (!find_user) {
        const retry = userRetryCount.get(userId) || 0;
  
        if (retry < 2) {
          userRetryCount.set(userId, retry + 1);
          console.log(`User not found, attempt ${retry + 1}, letting it pass`);
          return next(); // let it pass
        }
  
        return res.status(404).json({ error: 'User not found after 2 tries' });
      }

      
    if (find_user.credits < 0) {
        return res.status(400).json({ error: 'Insufficient credits' });
    }    
    find_user.credits = Math.max(0, find_user.credits - 1);
    await find_user.save();

    next();


    }
    catch (error) {
        console.error('Error reducing credits:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    

}





module.exports = reduceCredite;
