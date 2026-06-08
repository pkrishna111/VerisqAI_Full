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
  "#10b981",
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="vendorriskchart">

      <div className="vendorriskchart-header">
        <h3>Vendor Risk Distribution</h3>
        <p>Current vendor risk overview</p>
      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={75}
            outerRadius={120}
            paddingAngle={4}
            cornerRadius={8}
          >

            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow:
                "0 10px 30px rgba(15,23,42,.12)"
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={36}
          />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default VendorRiskChart;