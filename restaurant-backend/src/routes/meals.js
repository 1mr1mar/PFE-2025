const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all meals with category name and optional filter by category
router.get("/", (req, res) => {
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
router.get("/:id", (req, res) => {
  const mealId = req.params.id;
  console.log('Fetching meal with ID:', mealId);
  
  const query = `
    SELECT meals.*, categories.name AS category_name
    FROM meals
    JOIN categories ON meals.category_id = categories.id
    WHERE meals.id = ?
  `;

  db.query(query, [mealId], (err, result) => {
    if (err) {
      console.error("Error fetching meal:", err);
      return res.status(500).json({ error: "Server error", details: err.message });
    }
    
    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res.json(result[0]);
  });
});

// Add a new meal
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router; 