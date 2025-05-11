const express = require("express");
const router = express.Router();
const db = require("../db.js");

// Create a new booking
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query = `
      INSERT INTO bookings (name, email, phone, date, time, guests, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
      name,
      email,
      phone,
      date,
      time,
      guests,
      message || null
    ]);

    res.status(201).json({
      message: "Booking created successfully",
      bookingId: result.insertId
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM bookings ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Update booking status
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const query = "UPDATE bookings SET status = ? WHERE id = ?";
    const [result] = await db.query(query, [status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ message: "Booking status updated successfully" });
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).json({ error: "Failed to update booking" });
  }
});

module.exports = router; 