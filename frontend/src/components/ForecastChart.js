import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from "recharts";

const ForecastChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch("http://localhost:5001/predict");
        const json = await response.json();

        // Format date for better chart display
        const formatted = json.map(item => ({
          date: new Date(item.ds).toLocaleDateString(),
          yhat: parseFloat(item.yhat.toFixed(2))
        }));

        setData(formatted);
      } catch (error) {
        console.error("Failed to fetch forecast:", error);
      }
    };

    fetchForecast();
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded-lg mt-4">
      <h2 className="text-center text-xl font-semibold mb-4">Forecast for Next 30 Days</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
          <YAxis label={{ value: "Amount (₹)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="yhat" stroke="#00BCD4" strokeWidth={2} name="Predicted Expense (₹)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
