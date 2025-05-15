const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const upload = require('../config/upload');

// Add the upload endpoint
router.post('/', upload.single('image'), (req, res) => {
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

// Serve images
router.get("/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '..', '..', '..', 'public', 'pic', imageName);
  res.sendFile(imagePath);
});

// Add a specific route for debugging image paths
router.get('/debug/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, '..', '..', '..', 'public', 'pic', filename);
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

module.exports = router; 