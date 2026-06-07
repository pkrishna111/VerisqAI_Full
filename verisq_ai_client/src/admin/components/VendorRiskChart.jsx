import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

import "../styles/VendorRiskChart.css";

import { getVendorRisk } from "../services/dashboardApi";

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#ef4444"
];

function VendorRiskChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadVendorRisk();
  }, []);

  const loadVendorRisk = async () => {
    try {
      const result = await getVendorRisk();

      setData(result);
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="vendorriskchart">

      <h3>Vendor Risk Distribution</h3>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default VendorRiskChart;