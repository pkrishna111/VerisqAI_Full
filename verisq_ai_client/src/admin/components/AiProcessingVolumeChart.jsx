import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import "../styles/AiProcessingVolumeChart.css";

function AiProcessingVolumeChart({
  data = []
}) {

  return (
    <div className="aiprocessingvolumechart">

      <div className="aiprocessingvolumechart-header">

        <h3>
          AI Processing Volume
        </h3>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart
          data={data}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="requests"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AiProcessingVolumeChart;