const express = require("express");
const router = express.Router();
const { findBestMatch } = require("../controllers/chatbot.service.js"); 

router.post("/", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const reply = findBestMatch(message);
  res.json({ reply });
});

module.exports = router;
