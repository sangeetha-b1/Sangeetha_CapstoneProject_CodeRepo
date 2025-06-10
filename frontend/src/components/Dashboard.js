import React, { useEffect, useState } from 'react';
import { expenseService } from '../services/expenseService';
import { budgetService } from '../services/budgetService';

import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

import ForecastChart from '../components/ForecastChart'; //
import './Dashboard.css';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState(0);
    const [monthlyData, setMonthlyData] = useState({});
    const [aiInsights, setAiInsights] = useState(null);

    const COLORS = ['#2196f3', '#7090be', '#234972'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const expenseData = await expenseService.getAllExpenses();
                setExpenses(expenseData);

                const budgetData = await budgetService.getBudget();
                if (budgetData.data?.income) {
                    setIncome(budgetData.data.income);
                }

                // Process expenses
                const categoryExpenses = {};
                const uniqueMonths = new Set();

                expenseData.forEach(expense => {
                    const date = new Date(expense.date);
                    const monthYear = `${date.getFullYear()}-${date.getMonth()}`;
                    uniqueMonths.add(monthYear);

                    if (!categoryExpenses[expense.category]) {
                        categoryExpenses[expense.category] = 0;
                    }
                    categoryExpenses[expense.category] += expense.amount;
                });

                const totalExpenses = Object.values(categoryExpenses).reduce((sum, amount) => sum + amount, 0);
                const numberOfMonths = Math.max(uniqueMonths.size, 1);

                setMonthlyData({
                    totalExpenses,
                    categoryExpenses,
                    numberOfMonths
                });

                // AI insights
                const aiData = await expenseService.getSpendingPatterns();

                const topCategory = Object.entries(aiData.categoryTotals)
                    .sort(([, a], [, b]) => b - a)[0]?.[0] || '';

                const topMonthRaw = Object.entries(aiData.monthlyTotals)
                    .sort(([, a], [, b]) => b - a)[0]?.[0] || '';

                const [year, month] = topMonthRaw.split('-');
                const topMonth = topMonthRaw
                    ? `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`
                    : '';

                const totalExpense = Object.values(aiData.monthlyTotals)
                    .reduce((sum, val) => sum + val, 0);

                const avgMonthlyExpense = totalExpense / Object.keys(aiData.monthlyTotals).length;

                setAiInsights({
                    topCategory,
                    topMonth,
                    totalExpense,
                    avgMonthlyExpense
                });

            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    const barChartData = Object.entries(monthlyData.categoryExpenses || {}).map(([category, amount]) => ({
        name: category,
        amount
    }));

    const monthlyIncome = income;
    const totalMonthlyExpenses = monthlyData.totalExpenses || 0;
    const numberOfMonths = monthlyData.numberOfMonths || 1;
    const totalPotentialIncome = monthlyIncome * numberOfMonths;
    const totalMonthlySavings = totalPotentialIncome - totalMonthlyExpenses;

    const budgetData = [
        { name: 'Total Expense', value: totalMonthlyExpenses },
        { name: 'Total Savings', value: totalMonthlySavings }
    ];

    const allData = [
        { name: 'Total Income', value: totalPotentialIncome },
        { name: 'Total Expense', value: totalMonthlyExpenses },
        { name: 'Total Savings', value: totalMonthlySavings }
    ];

    return (
        <div className="dashboard-container">
            {expenses.length > 0 ? (
                <div className="charts-container">
                    {/* Bar Chart */}
                    <div className="chart-container">
                        <h3>Expense Categories</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={barChartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 85 }}
                                animationDuration={1000}
                            >
                                <XAxis
                                    dataKey="name"
                                    label={{ value: 'Categories', position: 'insideBottom', offset: -82 }}
                                    angle={-70}
                                    tick={{ textAnchor: "end", fontSize: 12 }}
                                    tickFormatter={(value) => value.length > 7 ? `${value.slice(0, 11)}...` : value}
                                />
                                <YAxis label={{ value: 'Total Amount', angle: -90, position: 'insideLeft', offset: -10, dy: 20 }} />
                                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                                <Bar dataKey="amount" fill="#6192cf" animationBegin={0} animationDuration={500} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Pie Chart */}
                    <div className="chart-container">
                        <h3>Budget Overview</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={budgetData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    animationBegin={0}
                                    animationDuration={1000}
                                >
                                    {budgetData.map((entry, index) => (
                                        <Cell key={`cell-${entry.name}`} fill={index === 0 ? COLORS[1] : COLORS[2]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                                <Legend
                                    verticalAlign="middle"
                                    align="right"
                                    layout="vertical"
                                    iconType="circle"
                                    payload={allData.map((item, index) => ({
                                        id: item.name,
                                        type: 'circle',
                                        value: `${item.name}\n$${item.value.toFixed(2)}`,
                                        color: COLORS[index]
                                    }))}
                                    wrapperStyle={{
                                        paddingLeft: '20px',
                                        lineHeight: '24px',
                                        fontSize: '13px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* AI Insights */}
                    {aiInsights && (
                        <div className="chart-container">
                            <h3>AI-Powered Spending Insights</h3>
                            <ul>
                                <li><strong>Top Category:</strong> {aiInsights.topCategory}</li>
                                <li><strong>Top Month:</strong> {aiInsights.topMonth}</li>
                                <li><strong>Average Monthly Expense:</strong> ${aiInsights.avgMonthlyExpense?.toFixed(2)}</li>
                                <li><strong>Total Expense:</strong> ${aiInsights.totalExpense?.toFixed(2)}</li>
                            </ul>
                        </div>
                    )}

                    {/* Forecast Chart */}
                    <div className="chart-container">
                        <ForecastChart />
                    </div>
                </div>
            ) : (
                <p>No Expenses Found</p>
            )}
        </div>
    );
};

export default Dashboard;
