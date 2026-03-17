import {
  Building2,
  CheckCircle2,
  ShieldAlert,
  ClipboardList
} from "lucide-react";

import KpiCard from "./KpiCard";

function KpiGrid() {
  const kpis = [
    {
      label: "Vendors Added",
      value: 2,
      subtext: "of 5 available",
      icon: Building2,
      colorVar: "--primary",
      bgVar: "--primary-light"
    },
    {
      label: "Scorecards Complete",
      value: 1,
      subtext: "PDF ready to download",
      icon: CheckCircle2,
      colorVar: "--success",
      bgVar: "--success-light"
    },
    {
      label: "High+ Findings",
      value: 3,
      subtext: "Require attention",
      icon: ShieldAlert,
      colorVar: "--danger",
      bgVar: "--danger-light"
    },
    {
      label: "Questionnaires",
      value: 1,
      subtext: "Awaiting response",
      icon: ClipboardList,
      colorVar: "--purple",
      bgVar: "--purple-light"
    }
  ];

  return (
    <div className="kpi-grid">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.label} {...kpi} />
      ))}
    </div>
  );
}

export default KpiGrid;
