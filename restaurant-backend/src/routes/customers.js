const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get customer bookings and orders
router.get("/:customerUuid", (req, res) => {
  const customerUuid = req.params.customerUuid;
  console.log('=== Customer Endpoint Start ===');
  console.log('Request received for customer UUID:', customerUuid);

  if (!customerUuid) {
    console.error('❌ Error: Missing customer UUID');
    return res.status(400).json({ error: "Customer UUID is required" });
  }

  // First check if customer exists
  const checkCustomerQuery = "SELECT id FROM customers WHERE uuid = ?";
  console.log('🔍 Checking if customer exists with query:', checkCustomerQuery);
  
  db.query(checkCustomerQuery, [customerUuid], (err, customerResult) => {
    if (err) {
      console.error('❌ Database error while checking customer:', {
        error: err.message,
        sql: checkCustomerQuery,
        params: [customerUuid]
      });
      return res.status(500).json({ 
        error: "Server error",
        details: err.message
      });
    }

    console.log('📊 Customer check result:', {
      exists: customerResult.length > 0,
      result: customerResult
    });

    // If customer doesn't exist, create a new one
    if (customerResult.length === 0) {
      console.log('➕ Creating new customer with UUID:', customerUuid);
      const insertCustomerQuery = "INSERT INTO customers (uuid, name, email, phone) VALUES (?, 'Guest', NULL, NULL)";
      
      console.log('📝 Executing insert query:', {
        query: insertCustomerQuery,
        params: [customerUuid]
      });

      db.query(insertCustomerQuery, [customerUuid], (err, insertResult) => {
        if (err) {
          console.error('❌ Error creating new customer:', {
            error: err.message,
            sql: insertCustomerQuery,
            params: [customerUuid]
          });
          return res.status(500).json({ 
            error: "Server error",
            details: err.message
          });
        }

        console.log('✅ New customer created successfully:', {
          insertId: insertResult.insertId,
          uuid: customerUuid
        });

        // Return empty customer data for new customer
        const newCustomerData = {
          id: insertResult.insertId,
          uuid: customerUuid,
          name: 'Guest',
          email: null,
          phone: null,
          address: null,
          reservation_id: null,
          table_number: null,
          booking_date: null,
          reservation_status: null,
          number_of_guests: null,
          recent_orders: []
        };

        console.log('📤 Sending response for new customer:', newCustomerData);
        return res.json(newCustomerData);
      });
    } else {
      // Customer exists, fetch details
      console.log('🔍 Fetching details for existing customer');
      const query = `
        SELECT 
          c.*,
          r.id as reservation_id,
          t.table_number,
          r.reservation_time as booking_date,
          r.status as reservation_status,
          r.number_of_people as number_of_guests,
          (
            SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                'id', o.id,
                'order_date', o.order_date,
                'status', o.status,
                'total_price', o.total_price,
                'delivery_address', o.delivery_address
              )
            )
            FROM orders o
            WHERE o.customer_id = c.id
            ORDER BY o.order_date DESC
            LIMIT 5
          ) as recent_orders
        FROM customers c
        LEFT JOIN reservations r ON c.id = r.customer_id 
          AND r.reservation_time >= CURDATE() 
          AND r.status = 'confirmed'
        LEFT JOIN tables t ON r.table_id = t.id
        WHERE c.uuid = ?
      `;

      db.query(query, [customerUuid], (err, result) => {
        if (err) {
          console.error('❌ Error fetching customer details:', {
            error: err.message,
            sql: query,
            params: [customerUuid]
          });
          return res.status(500).json({ 
            error: "Server error",
            details: err.message
          });
        }

        if (result.length === 0) {
          console.log('⚠️ No customer found with UUID:', customerUuid);
          return res.json({
            id: null,
            name: null,
            email: null,
            phone: null,
            address: null,
            reservation_id: null,
            table_number: null,
            booking_date: null,
            reservation_status: null,
            number_of_guests: null,
            recent_orders: []
          });
        }

        const customerData = result[0];
        try {
          console.log('🔄 Parsing recent orders JSON');
          customerData.recent_orders = JSON.parse(customerData.recent_orders || '[]');
          console.log('✅ Recent orders parsed successfully:', {
            orderCount: customerData.recent_orders.length
          });
        } catch (e) {
          console.error('❌ Error parsing recent orders:', {
            error: e.message,
            rawOrders: customerData.recent_orders
          });
          customerData.recent_orders = [];
        }

        // Clean up the response data
        const responseData = {
          ...customerData,
          reservation_id: customerData.reservation_id || null,
          table_number: customerData.table_number || null,
          booking_date: customerData.booking_date || null,
          reservation_status: customerData.reservation_status || null,
          number_of_guests: customerData.number_of_guests || null
        };

        console.log('📤 Sending customer details:', {
          customerId: responseData.id,
          hasReservation: !!responseData.reservation_id,
          ordersCount: responseData.recent_orders.length
        });

        res.json(responseData);
      });
    }
  });
  console.log('=== Customer Endpoint End ===');
});

module.exports = router; 