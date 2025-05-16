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

  // Check if customer exists
  const checkCustomerQuery = "SELECT * FROM customers WHERE uuid = ?";
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

    if (customerResult.length === 0) {
      // If not, create a new customer with only the UUID
      const insertCustomerQuery = "INSERT INTO customers (uuid) VALUES (?)";
      
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

        // Return the new customer info (all other fields null)
        const newCustomerData = {
          uuid: customerUuid,
          name: null,
          email: null,
          phone: null,
          address: null,
          reservation_id: null,
          table_id: null
        };

        console.log('📤 Sending response for new customer:', newCustomerData);
        return res.json(newCustomerData);
      });
    } else {
      // If exists, return customer info
      const customerData = customerResult[0];

      // Clean up the response data
      const responseData = {
        ...customerData,
        reservation_id: customerData.reservation_id || null,
        table_id: customerData.table_id || null
      };

      console.log('📤 Sending customer details:', {
        customerId: responseData.id,
        hasReservation: !!responseData.reservation_id
      });

      res.json(responseData);
    }
  });
  console.log('=== Customer Endpoint End ===');
});

module.exports = router; 