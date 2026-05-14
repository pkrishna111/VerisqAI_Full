import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

import {
  countFindingsBySeverity
} from "../../utils/riskUtils";

import "../../styles/vendor-details/severityDonutChart.css";

const COLORS = [
  "#dc2626",
  "#ea580c",
  "#ca8a04",
  "#16a34a"
];

function SeverityDonutChart({
  findings = []
}) {
  const counts =
    countFindingsBySeverity(findings);

  const data = [
    {
      name: "Critical",
      value: counts.critical
    },
    {
      name: "High",
      value: counts.high
    },
    {
      name: "Medium",
      value: counts.medium
    },
    {
      name: "Low",
      value: counts.low
    }
  ].filter(item => item.value > 0);

  return (
    <div className="vd-chart-card">

      <div className="vd-chart-card__header">

        <div>
          <h2>Severity Distribution</h2>

          <p>
            Findings grouped by risk severity
          </p>
        </div>

      </div>

      <div className="vd-chart-card__body">

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={3}
            >

              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

        <div className="vd-chart-card__legend">

          {data.map((item, index) => (
            <div
              key={item.name}
              className="vd-chart-card__legend-item"
            >

              <div
                className="vd-chart-card__legend-color"
                style={{
                  background: COLORS[index]
                }}
              />

              <span>{item.name}</span>

              <strong>{item.value}</strong>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default SeverityDonutChart;