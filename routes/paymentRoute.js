    const {  generateAccessToken, createOrder, capturePayment, getUserPaymentStatus    } = require('../services/payment');

    const express = require('express');
    const router = express.Router();

    router.post('/create-order', async (req, res) => {
        try {
            const accessToken = await generateAccessToken();
              const { name, description, quantity, price, totalAmount, user_id  } = req.body;

            console.log("order", name, description, quantity, price, totalAmount, "user id", user_id);
            // Assuming order details are sent in the body
            const approvalUrl = await createOrder(name, description, quantity, price, totalAmount, accessToken, user_id );
            console.log("approvalUrl", approvalUrl)
            res.json({ approvalUrl });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    
    router.post('/capture-payment', async (req, res) => {
        try {
            const { orderID } = req.body; // Assuming orderId is passed as a query parameter
            const accessToken = await generateAccessToken();
            const paymentDetails = await capturePayment(orderID, accessToken);
            console.log("err", paymentDetails)
            res.json(paymentDetails);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.post('/check-payment', async (req, res) => {
        try {
            const { orderID } = req.body;
            console.log("check-payment", orderID);
            const paymentStatus = await getUserPaymentStatus(orderID);
            console.log(paymentStatus);

            res.json({paymentStatus});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });


    module.exports = router;