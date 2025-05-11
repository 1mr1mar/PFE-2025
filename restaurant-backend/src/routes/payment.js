// backend/routes/payment.js
const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
const stripe = Stripe("YOUR_SECRET_KEY"); // من لوحة Stripe

router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // بالدولار => 10.00$ = 1000
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
