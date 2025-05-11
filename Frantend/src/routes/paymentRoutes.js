const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../controllers/paymentController');

// Create a payment intent
router.post('/create-payment-intent', createPaymentIntent);

module.exports = router; 