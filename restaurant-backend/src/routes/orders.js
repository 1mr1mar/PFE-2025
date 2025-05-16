const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Get all orders
router.get("/", (req, res) => {
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

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.json(result);
  });
});

// Update order status
router.put("/:id", (req, res) => {
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
    res.json({ message: "Order updated successfully" });
  });
});

// Delete order
router.delete("/:id", (req, res) => {
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
      res.json({ message: "Order deleted successfully" });
    });
  });
});

// Create a new order
router.post("/", async (req, res) => {
  const { items, customer_uuid, total, status, customer_info, order_info, payment_info } = req.body;
  
  console.log('Received order request:', {
    items,
    customer_uuid,
    total,
    status,
    customer_info,
    order_info,
    payment_info
  });

  try {
    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error('Invalid items array:', items);
      return res.status(400).json({ message: "Valid items array is required", received: items });
    }
    if (!customer_uuid) {
      console.error('Missing customer UUID');
      return res.status(400).json({ message: "Customer UUID is required" });
    }
    if (!total || isNaN(total) || total <= 0) {
      console.error('Invalid total amount:', total);
      return res.status(400).json({ message: "Valid total amount is required", received: total });
    }

    // 1. Ensure customer exists (create or update)
    let customerId;
    let customerName = customer_info?.name || null;
    let customerEmail = customer_info?.email || null;
    let customerPhone = customer_info?.phone || null;
    let customerAddress = order_info?.address || null;

    console.log('Customer info:', {
      uuid: customer_uuid,
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      address: customerAddress
    });

    const getCustomerQuery = "SELECT id FROM customers WHERE uuid = ?";
    console.log('Checking customer existence:', getCustomerQuery, [customer_uuid]);
    
    const [customerResult] = await new Promise((resolve, reject) => {
      db.query(getCustomerQuery, [customer_uuid], (err, result) => {
        if (err) {
          console.error('Error checking customer:', err);
          reject(err);
        } else {
          console.log('Customer check result:', result);
          resolve([result]);
        }
      });
    });

    if (customerResult.length === 0) {
      // Create new customer
      const insertCustomerQuery = "INSERT INTO customers (uuid, name, email, phone, address) VALUES (?, ?, ?, ?, ?)";
      console.log('Creating new customer:', insertCustomerQuery, [customer_uuid, customerName, customerEmail, customerPhone, customerAddress]);
      
      const insertResult = await new Promise((resolve, reject) => {
        db.query(insertCustomerQuery, [customer_uuid, customerName, customerEmail, customerPhone, customerAddress], (err, result) => {
          if (err) {
            console.error('Error creating customer:', err);
            reject(err);
          } else {
            console.log('New customer created:', result);
            resolve(result);
          }
        });
      });
      customerId = insertResult.insertId;
    } else {
      // Update customer info
      customerId = customerResult[0].id;
      const updateCustomerQuery = "UPDATE customers SET name=?, email=?, phone=?, address=? WHERE uuid=?";
      console.log('Updating customer:', updateCustomerQuery, [customerName, customerEmail, customerPhone, customerAddress, customer_uuid]);
      
      await new Promise((resolve, reject) => {
        db.query(updateCustomerQuery, [customerName, customerEmail, customerPhone, customerAddress, customer_uuid], (err) => {
          if (err) {
            console.error('Error updating customer:', err);
            reject(err);
          } else {
            console.log('Customer updated successfully');
            resolve();
          }
        });
      });
    }

    // 2. Check for reservation if needed
    let reservationId = null;
    if (order_info?.reservation) {
      reservationId = order_info.reservation.id;
      console.log('Using reservation:', reservationId);
    }

    // 3. Create the order
    const orderUuid = uuidv4();
    const insertOrderQuery = `
      INSERT INTO orders (
        customer_id, 
        uuid, 
        order_date, 
        status, 
        total_price, 
        delivery_address, 
        reservation_id,
        customer_uuid
      )
      VALUES (?, ?, NOW(), ?, ?, ?, ?, ?)
    `;
    const orderStatus = status || "pending";
    const deliveryAddress = customerAddress;
    
    console.log('Creating order:', {
      query: insertOrderQuery,
      params: [customerId, orderUuid, orderStatus, total, deliveryAddress, reservationId, customer_uuid]
    });

    const orderResult = await new Promise((resolve, reject) => {
      db.query(insertOrderQuery, [customerId, orderUuid, orderStatus, total, deliveryAddress, reservationId, customer_uuid], (err, result) => {
        if (err) {
          console.error('Error creating order:', err);
          reject(err);
        } else {
          console.log('Order created:', result);
          resolve(result);
        }
      });
    });
    const orderId = orderResult.insertId;

    // 4. Insert order items
    const orderItemsValues = items.map(item => [orderId, item.id, item.quantity, item.price]);
    const insertItemsQuery = "INSERT INTO order_items (order_id, meal_id, quantity, price) VALUES ?";
    console.log('Inserting order items:', {
      query: insertItemsQuery,
      values: orderItemsValues
    });

    await new Promise((resolve, reject) => {
      db.query(insertItemsQuery, [orderItemsValues], (err) => {
        if (err) {
          console.error('Error inserting order items:', err);
          reject(err);
        } else {
          console.log('Order items inserted successfully');
          resolve();
        }
      });
    });

    // 5. Save payment info if provided
    if (payment_info) {
      const insertPaymentQuery = "INSERT INTO payments (order_id, payment_method, amount, payment_status, payment_date) VALUES (?, ?, ?, ?, NOW())";
      console.log('Saving payment info:', {
        query: insertPaymentQuery,
        params: [orderId, payment_info.method, payment_info.amount, payment_info.status]
      });

      await new Promise((resolve, reject) => {
        db.query(insertPaymentQuery, [orderId, payment_info.method, payment_info.amount, payment_info.status], (err) => {
          if (err) {
            console.error('Error saving payment info:', err);
            reject(err);
          } else {
            console.log('Payment info saved successfully');
            resolve();
          }
        });
      });
    }

    // 6. Respond
    console.log('Order creation completed successfully');
    res.status(201).json({
      message: "Order placed successfully",
      order_uuid: orderUuid,
      customer_id: customerId,
      order_id: orderId
    });
  } catch (err) {
    console.error('Order creation error:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      sqlMessage: err.sqlMessage
    });
    res.status(500).json({ 
      message: "Server error (order creation)", 
      details: err.message,
      code: err.code,
      sqlMessage: err.sqlMessage
    });
  }
});

module.exports = router; 