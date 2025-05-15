const express = require("express");
const cors = require("cors");
const path = require("path");
require('dotenv').config();

// Import routes
const mealsRouter = require('./src/routes/meals');
const categoriesRoutes = require("./src/routes/categories");
const chatRouter = require("./src/routes/chat");
const bookingsRouter = require("./src/routes/bookings");
const ordersRouter = require('./src/routes/orders');
const chefsRouter = require('./src/routes/chefs');
const paymentsRouter = require('./src/routes/payments');
const uploadsRouter = require('./src/routes/uploads');
const customersRouter = require('./src/routes/customers');

const app = express();
const port = 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Mount the routers
app.use("/api/meals", mealsRouter);
app.use("/api/categories", categoriesRoutes);
app.use("/api/chat", chatRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/chefs", chefsRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/upload", uploadsRouter);
app.use("/api/customer", customersRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  res.status(500).json({ 
    error: "Something broke!",
    message: err.message,
    path: req.path
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

