const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'pic'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully!");
  }
});

// Add the upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      console.error('No file received in request');
      return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log('File upload details:', {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
    res.json({ filename: req.file.filename });
  } catch (error) {
    console.error('Error in upload endpoint:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all categories
app.get("/api/categories", (req, res) => {
  console.log('Fetching categories');
  const query = "SELECT * FROM categories";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).json({ error: "Server error" });
    }
    console.log(`Found ${result.length} categories`);
    res.json(result);
  });
});

// Serve images
app.get("/pic/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "public", "pic", imageName);
  res.sendFile(imagePath);
});

// Add a specific route for debugging image paths
app.get('/debug-image/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, '..', 'public', 'pic', filename);
  console.log('Debug image path:', {
    requested: filename,
    fullPath: imagePath,
    exists: fs.existsSync(imagePath)
  });
  res.json({
    requested: filename,
    fullPath: imagePath,
    exists: fs.existsSync(imagePath)
  });
});

// Get all orders
app.get("/api/orders", (req, res) => {
  console.log('Fetching orders');
  const query = `
    SELECT orders.*, 
           customers.name as customer_name,
           GROUP_CONCAT(order_items.meal_id) as meal_ids,
           GROUP_CONCAT(meals.name) as meal_names,
           GROUP_CONCAT(order_items.quantity) as quantities
    FROM orders
    LEFT JOIN customers ON orders.customer_id = customers.id
    LEFT JOIN order_items ON orders.id = order_items.order_id
    LEFT JOIN meals ON order_items.meal_id = meals.id
    GROUP BY orders.id
    ORDER BY orders.order_date DESC
  `;

  console.log('Executing query:', query);

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ error: "Server error" });
    }
    
    console.log('Query result:', {
      rowCount: result.length,
      firstRow: result[0],
      allRows: result
    });

    // If no orders found, check if tables exist and have data
    if (result.length === 0) {
      const checkTablesQuery = `
        SELECT 
          (SELECT COUNT(*) FROM orders) as orders_count,
          (SELECT COUNT(*) FROM customers) as customers_count,
          (SELECT COUNT(*) FROM order_items) as order_items_count,
          (SELECT COUNT(*) FROM meals) as meals_count
      `;
      
      db.query(checkTablesQuery, (err, counts) => {
        if (err) {
          console.error("Error checking table counts:", err);
        } else {
          console.log('Table counts:', counts[0]);
        }
      });
    }

    res.json(result);
  });
});

// Update order status
app.put("/api/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  console.log('Updating order status:', { id: orderId, status });

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  const query = "UPDATE orders SET status = ? WHERE id = ?";
  const params = [status, orderId];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error updating order:", err);
      return res.status(500).json({ error: "Server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    console.log('Order updated successfully:', { id: orderId });
    res.json({ message: "Order updated successfully" });
  });
});

// Delete order
app.delete("/api/orders/:id", (req, res) => {
  const orderId = req.params.id;
  console.log('Deleting order:', orderId);

  // First delete order items
  const deleteItemsQuery = "DELETE FROM order_items WHERE order_id = ?";
  db.query(deleteItemsQuery, [orderId], (err, result) => {
    if (err) {
      console.error("Error deleting order items:", err);
      return res.status(500).json({ error: "Server error" });
    }

    // Then delete the order
    const deleteOrderQuery = "DELETE FROM orders WHERE id = ?";
    db.query(deleteOrderQuery, [orderId], (err, result) => {
      if (err) {
        console.error("Error deleting order:", err);
        return res.status(500).json({ error: "Server error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Order not found" });
      }
      console.log('Order deleted successfully:', { id: orderId });
      res.json({ message: "Order deleted successfully" });
    });
  });
});

// Create a test order
app.post("/api/orders/test", (req, res) => {
  console.log('Creating test order');
  
  // First create the order
  const createOrderQuery = `
    INSERT INTO orders (customer_id, order_date, status, total_price)
    VALUES (1, NOW(), 'Pending', 150.00)
  `;

  db.query(createOrderQuery, (err, orderResult) => {
    if (err) {
      console.error("Error creating order:", err);
      return res.status(500).json({ error: "Server error" });
    }

    const orderId = orderResult.insertId;
    console.log('Created order with ID:', orderId);

    // Then add order items
    const createOrderItemsQuery = `
      INSERT INTO order_items (order_id, meal_id, quantity)
      VALUES 
        (?, 1, 2),
        (?, 2, 1)
    `;

    db.query(createOrderItemsQuery, [orderId, orderId], (err, itemsResult) => {
      if (err) {
        console.error("Error creating order items:", err);
        return res.status(500).json({ error: "Server error" });
      }

      console.log('Created order items for order:', orderId);
      res.status(201).json({ 
        message: "Test order created successfully",
        orderId: orderId
      });
    });
  });
});

// Chat endpoint
app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  
  // Simple response logic with HTML links
  let reply = "I'm sorry, I don't understand that. How can I help you with our restaurant services? You can <a href='/menu'>view our menu</a> or <a href='/booking'>make a reservation</a>.";
  
  // Basic keyword matching with HTML links
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("menu") || lowerMessage.includes("food")) {
    reply = "You can find our menu in the main navigation. We offer a variety of delicious dishes! <a href='/menu'>Click here to view our menu</a>.";
  } else if (lowerMessage.includes("reservation") || lowerMessage.includes("book")) {
    reply = "You can make a reservation through our booking page. <a href='/booking'>Click here to make a reservation</a> or <a href='/contact'>contact us</a> for assistance.";
  } else if (lowerMessage.includes("hours") || lowerMessage.includes("open")) {
    reply = "We are open daily from 11:00 AM to 10:00 PM. <a href='/contact'>Click here for more information</a>.";
  } else if (lowerMessage.includes("location") || lowerMessage.includes("address")) {
    reply = "We are located at 123 Restaurant Street, City, Country. <a href='/location'>Click here for directions</a> or <a href='/contact'>contact us</a> for more details.";
  } else if (lowerMessage.includes("contact") || lowerMessage.includes("phone")) {
    reply = "You can reach us at (123) 456-7890 or email us at info@restaurant.com. <a href='/contact'>Click here for more contact information</a>.";
  } else if (lowerMessage.includes("delivery") || lowerMessage.includes("takeout")) {
    reply = "We offer both delivery and takeout services! <a href='/delivery'>Click here to place a delivery order</a> or <a href='/takeout'>order for pickup</a>.";
  } else if (lowerMessage.includes("special") || lowerMessage.includes("promotion")) {
    reply = "Check out our current specials and promotions! <a href='/specials'>Click here to view our special offers</a>.";
  }

  res.json({ reply });
});

// Routes
const categoriesRoutes = require("./src/routes/categories");
const chatRouter = require("./src/routes/chat");
const bookingsRouter = require("./src/routes/bookings");

// Mount the routers
app.use("/api/categories", categoriesRoutes);
app.use("/api/chat", chatRouter);
app.use("/api/bookings", bookingsRouter);

// Get all meals with category name and optional filter by category
app.get("/api/meals", (req, res) => {
  const { category_name } = req.query;

  let query = `
    SELECT meals.*, categories.name AS category_name
    FROM meals
    JOIN categories ON meals.category_id = categories.id
  `;

  let params = [];

  if (category_name) {
    query += ` WHERE categories.name = ?`;
    params.push(category_name);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error fetching meals:", err);
      res.status(500).send("Server error");
    } else {
      res.json(result);
    }
  });
});

// Get a single meal by ID
app.get("/api/meals/:id", (req, res) => {
  const mealId = req.params.id;
  console.log('Fetching meal with ID:', mealId);
  
  const query = `
    SELECT meals.*, categories.name AS category_name
    FROM meals
    JOIN categories ON meals.category_id = categories.id
    WHERE meals.id = ?
  `;

  console.log('Executing query:', query);
  console.log('With parameters:', [mealId]);

  db.query(query, [mealId], (err, result) => {
    if (err) {
      console.error("Error fetching meal:", err);
      return res.status(500).json({ error: "Server error", details: err.message });
    }
    
    console.log('Query result:', result);
    
    if (!result || result.length === 0) {
      console.log('No meal found with ID:', mealId);
      return res.status(404).json({ error: "Meal not found" });
    }

    console.log('Sending meal data:', result[0]);
    res.json(result[0]);
  });
});

// Add a new meal
app.post("/api/meals", (req, res) => {
  const { name, description, price, category_id, pic, made_by, rating, popularity } = req.body;
  const query = `
    INSERT INTO meals (name, description, price, category_id, pic, made_by, rating, popularity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [name, description, price, category_id, pic, made_by, rating, popularity], (err, result) => {
    if (err) {
      console.error("Error adding meal:", err);
      res.status(500).send("Server error");
    } else {
      res.status(201).json({ message: "Meal added successfully", id: result.insertId });
    }
  });
});

// Update a meal
app.put("/api/meals/:id", (req, res) => {
  const mealId = req.params.id;
  const { name, description, price, category_id, pic, made_by, rating, popularity } = req.body;
  const query = `
    UPDATE meals
    SET name = ?, description = ?, price = ?, category_id = ?, pic = ?, made_by = ?, rating = ?, popularity = ?
    WHERE id = ?
  `;

  db.query(query, [name, description, price, category_id, pic, made_by, rating, popularity, mealId], (err, result) => {
    if (err) {
      console.error("Error updating meal:", err);
      res.status(500).send("Server error");
    } else {
      res.json({ message: "Meal updated successfully" });
    }
  });
});

// Delete a meal
app.delete("/api/meals/:id", (req, res) => {
  const mealId = req.params.id;
  const query = "DELETE FROM meals WHERE id = ?";

  db.query(query, [mealId], (err, result) => {
    if (err) {
      console.error("Error deleting meal:", err);
      res.status(500).send("Server error");
    } else {
      res.json({ message: "Meal deleted successfully" });
    }
  });
});

// Get all chefs
app.get("/api/chefs", (req, res) => {
  const query = "SELECT * FROM chefs";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching chefs:", err);
      res.status(500).send("Server error");
    } else {
      res.json(result);
    }
  });
});

// Get a single chef by ID
app.get("/api/chefs/:id", (req, res) => {
  const chefId = req.params.id;
  const query = "SELECT * FROM chefs WHERE id = ?";
  
  db.query(query, [chefId], (err, result) => {
    if (err) {
      console.error("Error fetching chef:", err);
      res.status(500).json({ error: "Server error" });
    } else {
      if (!result || result.length === 0) {
        return res.status(404).json({ error: "Chef not found" });
      }

      res.json(result[0]);
    }
  });
});

// Add a new chef
app.post("/api/chefs", upload.single('pic'), (req, res) => {
  const { fullname, specialization, about } = req.body;
  const pic = req.file ? req.file.filename : null;
  
  const query = `
    INSERT INTO chefs (fullname, specialization, pic, about)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [fullname, specialization, pic, about], (err, result) => {
    if (err) {
      console.error("Error adding chef:", err);
      res.status(500).send("Server error");
    } else {
      res.status(201).json({ 
        message: "Chef added successfully", 
        id: result.insertId,
        pic: pic ? `/pic/${pic}` : null
      });
    }
  });
});

// Update a chef
app.put("/api/chefs/:id", upload.single('pic'), (req, res) => {
  const chefId = req.params.id;
  const { fullname, specialization, about } = req.body;
  const pic = req.file ? req.file.filename : req.body.pic;
  
  const query = `
    UPDATE chefs 
    SET fullname = ?, specialization = ?, pic = ?, about = ?
    WHERE id = ?
  `;

  db.query(query, [fullname, specialization, pic, about, chefId], (err, result) => {
    if (err) {
      console.error("Error updating chef:", err);
      res.status(500).send("Server error");
    } else {
      res.json({ 
        message: "Chef updated successfully",
        pic: pic ? `/pic/${pic}` : null
      });
    }
  });
});

// Delete a chef
app.delete("/api/chefs/:id", (req, res) => {
  const chefId = req.params.id;
  const query = "DELETE FROM chefs WHERE id = ?";

  db.query(query, [chefId], (err, result) => {
    if (err) {
      console.error("Error deleting chef:", err);
      res.status(500).send("Server error");
    } else {
      res.json({ message: "Chef deleted successfully" });
    }
  });
});

// Payment Routes
app.post('/api/payments/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      error: 'Failed to create payment intent',
      message: error.message,
    });
  }
});

// Get customer bookings
app.get("/api/bookings/customer/:customerId", (req, res) => {
  const customerId = req.params.customerId;
  
  if (!customerId) {
    return res.status(400).json({ error: "Customer ID is required" });
  }

  const query = `
    SELECT * FROM bookings 
    WHERE customer_uuid = ? 
    ORDER BY booking_date DESC
  `;

  db.query(query, [customerId], (err, result) => {
    if (err) {
      console.error("Error fetching customer bookings:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.json(result);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
