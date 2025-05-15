const express = require('express');
const router = express.Router();
const db = require('../config/database');
const upload = require('../config/upload');

// Get all chefs
router.get("/", (req, res) => {
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
router.get("/:id", (req, res) => {
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
router.post("/", upload.single('pic'), (req, res) => {
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
router.put("/:id", upload.single('pic'), (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router; 