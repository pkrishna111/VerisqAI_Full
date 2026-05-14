import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer
} from "recharts";

import "../../styles/vendor-details/riskGaugeChart.css";

function RiskGaugeChart({ score = 0 }) {
  const data = [
    {
      name: "Risk",
      value: score,
      fill:
        score >= 75
          ? "#dc2626"
          : score >= 50
          ? "#ea580c"
          : score >= 25
          ? "#ca8a04"
          : "#16a34a"
    }
  ];

  return (
    <div className="vd-chart-card">

      <div className="vd-chart-card__header">

        <div>
          <h2>Risk Posture</h2>

          <p>
            Overall vendor risk exposure
          </p>
        </div>

      </div>

      <div className="vd-risk-gauge">

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={data}
            startAngle={180}
            endAngle={0}
          >

            <RadialBar
              dataKey="value"
              cornerRadius={12}
            />

          </RadialBarChart>

        </ResponsiveContainer>

        <div className="vd-risk-gauge__center">

          <h2>{score}</h2>

          <p>Risk Score</p>

        </div>

      </div>

    </div>
  );
}

export default RiskGaugeChart;