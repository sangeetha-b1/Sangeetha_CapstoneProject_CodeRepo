const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5001/predict');
    res.json(response.data);
  } catch (error) {
    console.error('Forecast error:', error.message);
    res.status(500).json({ error: 'Prediction service unavailable' });
  }
});

module.exports = router;
