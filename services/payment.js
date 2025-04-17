const axios = require('axios');
const paymentsave = require('../models/payment.js');
require('dotenv').config();

 const generateAccessToken = async () => {
    const response = await axios({
        url: 'https://api-m.paypal.com/v1/oauth2/token',
        method: 'post',
        data: 'grant_type=client_credentials',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            username: process.env.PAYPAL_USERNAME,
            password: process.env.PAYPAL_PASSWORD
        }
    });
    console.log(response.data.access_token);

    return response.data.access_token;
};

const createOrder = async ( name, description, quantity, price, totalAmount, accessToken, user_id ) => {
    console.log( user_id);
  
    try {
      const response = await axios({
        url: 'https://api-m.paypal.com/v2/checkout/orders',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'PayPal-Request-Id': `order-${Date.now()}` // Unique request ID
        },
        data: {
            "intent": "CAPTURE",
            "purchase_units": [
              {
                "reference_id": "unique_reference_id_123",
                "amount": {
                  "currency_code": "USD",
                  "value": totalAmount.toFixed(2),
                  "breakdown": {
                    "item_total": {
                      "currency_code": "USD",
                      "value": totalAmount.toFixed(2)
                    }
                  }
                },
                "items": [
                  {
                    "name": name,
                    "description": description,
                    "quantity": quantity,
                    "unit_amount": {
                      "currency_code": "USD",
                      "value": price.toFixed(2)
                    }
                  }
                ]
              }
            ],
            "application_context": {
              "return_url": "http://localhost:3000/complete-order",
              "cancel_url": "http://localhost:3000/cancel-order",
              "shipping_preference": "NO_SHIPPING",
              "user_action": "PAY_NOW",
              "brand_name": "Your Brand Name"
            }
          }
          
      });
      const orderId = response.data.id;
      const approvalUrl = response.data.links.find(link => link.rel === 'approve').href;

       const payment = new paymentsave({
            userId: user_id,
            amount: totalAmount,
            currency: "USD",
            paymentMethod: "paypal", 
            transactionId: orderId,
            status: "pending",
            credits: 0, 
            plan: "free", 
        });
      const add = await payment.save();
      console.log("add", add);
      return { orderId, approvalUrl };

    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };
  


  const capturePayment = async (orderID, accessToken) => {
    console.log("Order ID:", orderID);
    try {
        const response = await axios({
            url: `https://api-m.paypal.com/v2/checkout/orders/${orderID}/capture`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        console.log("status", response.data.status);
        console.log("status", response.data);
        console.log("status", response.status);

        if ('status' in response.data && response.data.status === 'COMPLETED') {
            const payment = await paymentsave.findOne({ transactionId: orderID });
            console.log("payment say", payment);
            // If the payment is found, update its status to 'completed'
            if (payment) {
                payment.status = 'completed';
                payment.credits = 50;  // Adjust based on your business logic
                payment.plan = 'paid';  // Or other plan status as needed
                payment.paypalResponse = response.data;

                // Save the updated payment document
                const save = await payment.save();
                console.log("save", save);
            }
        }

        console.log("Response:", response);

        return response.data; 

    } catch (error) {
        if (error.response) {
            // Log the full error response for detailed debugging
            console.log("Error Response Data:", error.response.data);
            console.log("Error Response Status:", error.response.status);
            console.log("Error Response Headers:", error.response.headers);
        } else {
            // If there's no response, log the general error message
            console.log("Error Message:", error.message);
        }
        throw error; 
    }
};


const getUserPaymentStatus = async (userId) => {
  try {
    const user = await paymentsave.findOne({ userId, status: 'completed', plan:'paid' });
    console.log("user", user)
    if (!user) {
      throw new Error('User not found');
    }
    return { hasPaid: user.plan, credits: user.credits };

  } catch(error) {
    throw new Error('Error fetching user payment data: ' + error.message);

  }
}
module.exports = {
    generateAccessToken,
    createOrder,
    capturePayment,
    getUserPaymentStatus
}