import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const SpendingInsights = () => {
  const [data, setData] = useState(null);

  const fetchInsights = async () => {
    try {
      const res = await axios.get('/api/analytics/spending-patterns');
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  if (!data) return <p>Loading analysis...</p>;

  const pieData = {
    labels: Object.keys(data.categoryTotals),
    datasets: [{
      data: Object.values(data.categoryTotals),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }]
  };

  const lineData = {
    labels: Object.keys(data.monthlyTotals),
    datasets: [{
      label: 'Monthly Spending',
      data: Object.values(data.monthlyTotals),
      borderColor: '#4BC0C0',
      fill: false
    }]
  };

  return (
    <div>
      <h3>Spending Pattern Insights</h3>
      <div style={{ maxWidth: '500px', margin: '1rem auto' }}>
        <Pie data={pieData} />
      </div>
      <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default SpendingInsights;
