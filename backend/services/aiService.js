const axios = require('axios');

const predictExpense = async (expenses) => {
  try {
    const res = await axios.post('http://localhost:5001/predict', {
      expenses
    });
    return res.data;
  } catch (error) {
    console.error('Prediction error:', error.message);
    return null;
  }
};

module.exports = { predictExpense };
