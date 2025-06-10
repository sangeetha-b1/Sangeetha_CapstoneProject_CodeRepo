// backend/controllers/analyticsController.js
const Expense = require('../models/expense');

const analyzeSpending = async (req, res) => {
  try {
    const expenses = await Expense.find(); // ← removed user filter

    const categoryTotals = {};
    const monthlyTotals = {};

    expenses.forEach(exp => {
      // Category totals
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;

      // Monthly totals
      const month = new Date(exp.date).toISOString().slice(0, 7);
      monthlyTotals[month] = (monthlyTotals[month] || 0) + exp.amount;
    });

    res.json({ categoryTotals, monthlyTotals });
  } catch (error) {
    res.status(500).json({ message: 'Failed to analyze spending', error });
  }
};

module.exports = { analyzeSpending };
