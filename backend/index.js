require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const chatRoutes = require('./routes/chatRoutes');
const connectDB = require("./config/database");
const analyticsRoutes = require('./routes/analyticsRoutes');


const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use('/api/expense', expenseRoutes); // Expense routes
app.use('/api/income', incomeRoutes); // Income routes
app.use('/api/budget', budgetRoutes); // Budget routes
app.use('/api/chat', chatRoutes); // Chat routes
app.use('/api/analytics', analyticsRoutes);
app.use('/api/forecast', require('./routes/forecast'));

//app.use('/api/prediction', predictionRoutes);


connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
