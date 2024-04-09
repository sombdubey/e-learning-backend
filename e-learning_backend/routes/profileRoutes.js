// routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Example route that requires authentication
router.get('/profile', authMiddleware, (req, res) => {
  res.json(req.user); // Access user object from request
});

module.exports = router;
