// backend/routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const { analyzeSpending } = require('../controllers/analyticsController');

// No auth middleware
router.get('/spending-patterns', analyzeSpending);

module.exports = router;
