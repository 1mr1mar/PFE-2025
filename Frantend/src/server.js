require('dotenv').config();
const express = require('express');
const app = express();
const paymentRoutes = require('./routes/paymentRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/api/payments', paymentRoutes); 