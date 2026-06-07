import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

import "../styles/AiModelUsageChart.css";

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4"
];

function AiModelUsageChart({
  data = []
}) {

  return (
    <div className="aimodelusagechart">

      <div className="aimodelusagechart-header">

        <h3>
          Model Usage
        </h3>

        <span>
          AI Models Distribution
        </span>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="count"
            nameKey="model"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={70}
            paddingAngle={3}
            label
          >

            {data.map(
              (
                entry,
                index
              ) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                      COLORS.length
                    ]
                  }
                />

              )
            )}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AiModelUsageChart;