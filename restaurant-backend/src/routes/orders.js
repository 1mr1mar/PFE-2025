const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

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
router.post("/", (req, res) => {
  const { items, customer_uuid, total, status, customer_info, order_info } = req.body;
  
  console.log('=== Order Creation Start ===');
  console.log('Received order request:', {
    hasItems: !!items,
    hasCustomerUuid: !!customer_uuid,
    total,
    status,
    hasCustomerInfo: !!customer_info,
    hasOrderInfo: !!order_info,
    itemsCount: items?.length
  });

  // Validate required fields
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ 
      message: "Valid items array is required",
      received: items
    });
  }

  if (!customer_uuid) {
    return res.status(400).json({ 
      message: "Customer UUID is required"
    });
  }

  if (!total || isNaN(total) || total <= 0) {
    return res.status(400).json({ 
      message: "Valid total amount is required",
      received: total
    });
  }

  // First get the customer ID from UUID
  const getCustomerQuery = "SELECT id FROM customers WHERE uuid = ?";
  
  db.query(getCustomerQuery, [customer_uuid], (err, customerResult) => {
    if (err) {
      return res.status(500).json({ 
        message: "Server error (customer lookup)",
        details: err.message
      });
    }

    if (customerResult.length === 0) {
      return res.status(404).json({ 
        message: "Customer not found"
      });
    }

    const customerId = customerResult[0].id;

    // Then check if customer has an active reservation
    const checkReservationQuery = `
      SELECT r.id, t.table_number, r.reservation_time as booking_date, r.number_of_people
      FROM reservations r
      LEFT JOIN tables t ON r.table_id = t.id
      WHERE r.customer_id = ? 
      AND r.reservation_time >= CURDATE() 
      AND r.status = 'confirmed'
    `;

    db.query(checkReservationQuery, [customerId], (err, reservationResult) => {
      if (err) {
        return res.status(500).json({ 
          message: "Server error (reservation check)",
          details: err.message
        });
      }

      const hasActiveReservation = reservationResult.length > 0;
      const reservationDetails = hasActiveReservation ? reservationResult[0] : null;

      // If no active reservation and no delivery address, suggest booking
      if (!hasActiveReservation && (!order_info || !order_info.address)) {
        return res.status(400).json({
          message: "No active reservation found",
          suggestion: "Please either provide a delivery address or make a reservation",
          canBook: true
        });
      }

      // Create the order
      const orderUuid = uuidv4();
      const insertOrderQuery = `
        INSERT INTO orders (
          customer_id, 
          uuid, 
          order_date, 
          status, 
          total_price, 
          delivery_address, 
          reservation_id
        )
        VALUES (?, ?, NOW(), ?, ?, ?, ?)
      `;

      const orderStatus = status || "pending";
      const deliveryAddress = order_info && order_info.address ? order_info.address : null;
      const reservationId = reservationDetails ? reservationDetails.id : null;

      db.query(insertOrderQuery, [
        customerId,
        orderUuid,
        orderStatus,
        total,
        deliveryAddress,
        reservationId
      ], (err, orderResult) => {
        if (err) {
          return res.status(500).json({ 
            message: "Server error (order insert)",
            details: err.message
          });
        }

        const orderId = orderResult.insertId;

        // Insert order items
        const orderItemsValues = items.map(item => [orderId, item.id, item.quantity, item.price]);
        const insertItemsQuery = "INSERT INTO order_items (order_id, meal_id, quantity, price) VALUES ?";
        
        db.query(insertItemsQuery, [orderItemsValues], (err) => {
          if (err) {
            return res.status(500).json({ 
              message: "Server error (order items insert)",
              details: err.message
            });
          }

          // Return order details including reservation info if available
          const response = {
            message: "Order placed successfully",
            order_uuid: orderUuid,
            reservation: reservationDetails ? {
              id: reservationDetails.id,
              table_number: reservationDetails.table_number,
              booking_date: reservationDetails.booking_date,
              number_of_guests: reservationDetails.number_of_people
            } : null
          };

          res.status(201).json(response);
        });
      });
    });
  });
});

module.exports = router; 