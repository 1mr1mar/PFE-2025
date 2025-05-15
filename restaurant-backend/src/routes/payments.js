const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, customer_uuid } = req.body;
    console.log('Creating payment intent:', {
      amount,
      hasCustomerUuid: !!customer_uuid
    });

    if (!amount) {
      console.error('Payment intent creation failed: Amount is missing');
      return res.status(400).json({ error: 'Amount is required' });
    }

    // Create a PaymentIntent with the order amount and currency
    console.log('Calling Stripe API to create payment intent...');
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(amount) * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customer_uuid: customer_uuid || 'guest'
      }
    });
    
    console.log('Payment intent created successfully:', {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      status: paymentIntent.status,
      customer_uuid: customer_uuid || 'guest'
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Error creating payment intent:', {
      message: error.message,
      type: error.type,
      code: error.code,
      stack: error.stack
    });
    res.status(500).json({
      error: 'Failed to create payment intent',
      message: error.message,
    });
  }
});

module.exports = router; 