import {
  Building2,
  CheckCircle2,
  ShieldAlert,
  ClipboardList
} from "lucide-react";

import KpiCard from "./KpiCard";

function KpiGrid({ stats }) {
  const kpis = [
    {
      label: "Vendors Added",
      value: stats?.totalVendors ?? 0,
      subtext: "of 5 available",
      icon: Building2,
      colorVar: "--primary",
      bgVar: "--primary-light"
    },
    {
      label: "Scorecards Complete",
      value: stats?.scorecardsComplete ?? 0,
      subtext: "PDF ready to download",
      icon: CheckCircle2,
      colorVar: "--success",
      bgVar: "--success-light"
    },
    {
      label: "High+ Findings",
      value: stats?.highFindings ?? 0,
      subtext: "Require attention",
      icon: ShieldAlert,
      colorVar: "--danger",
      bgVar: "--danger-light"
    },
    {
      label: "Questionnaires",
      value: stats?.questionnairesPending ?? 0,
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
