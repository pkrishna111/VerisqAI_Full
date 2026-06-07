import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import "../styles/UserGrowthChart.css";

import { getUserGrowth } from "../services/dashboardApi";

function UserGrowthChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      const result = await getUserGrowth();

      setData(result);
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="usergrowthchart">

      <h3>User Growth</h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="users"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default UserGrowthChart;