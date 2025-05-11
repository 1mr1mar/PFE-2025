const express = require("express");
const router = express.Router();
const db = require("../db.js"); // Assuming db is set up with mysql2's promise pool

// Get all categories
router.get("/", async (req, res) => {
  try {
    // استخدام Promise بدلاً من callback
    const [rows] = await db.query("SELECT * FROM categories");

    // إرسال البيانات كـ JSON
    res.json(rows);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

module.exports = router;
