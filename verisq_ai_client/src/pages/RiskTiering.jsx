// RiskTiering.jsx
// All component names and CSS classes are prefixed with RiskTiering__

import { useState } from "react";
import "../styles/Scorecards.css";
import { Link } from "react-router-dom";
import "../styles/Risktiering.css"
import Header from "../components/landingPage/Header";
import Footer from "../components/landingPage/Footer";

// ══════════════════════════════════════════════════════════════════════
//  Data
// ══════════════════════════════════════════════════════════════════════
const tiers = [
  {
    number: "Tier 1",
    label: "Critical Risk",
    color: "#E63946",
    actionTitle: "Immediate Action",
    description:
      "Vendors with critical data exposure or severe security issues requiring urgent intervention.",
    items: ["Weekly review", "Escalation required", "Exit planning"],
  },
  {
    number: "Tier 2",
    label: "High Risk",
    color: "#F4842A",
    actionTitle: "Active Management",
    description:
      "Vendors with sensitive data access or significant security findings requiring remediation.",
    items: ["Quarterly review", "Remediation tracking", "Executive visibility"],
  },
  {
    number: "Tier 3",
    label: "Medium Risk",
    color: "#F4A235",
    actionTitle: "Regular Monitoring",
    description:
      "Vendors with moderate data access or some security gaps requiring attention.",
    items: ["Semi-annual review", "Active monitoring", "Enhanced controls"],
  },
  {
    number: "Tier 4",
    label: "Low Risk",
    color: "#2A9D5C",
    actionTitle: "Minimal Oversight",
    description:
      "Vendors with limited data access, strong security posture, and minimal business impact.",
    items: ["Annual review", "Basic monitoring", "Standard terms"],
  },
];

const factors = [
  {
    emoji: "🗄️",
    title: "Data Sensitivity",
    desc: "What type of data does this vendor access? PII, PHI, PCI, confidential business data — each classification impacts the risk tier.",
  },
  {
    emoji: "🛡️",
    title: "Security Posture",
    desc: "LiveThreat scorecard findings, questionnaire responses, and compliance certifications all factor into the security assessment.",
  },
  {
    emoji: "📊",
    title: "Business Impact",
    desc: "How critical is this vendor to your operations? Single points of failure and high-dependency vendors receive elevated risk consideration.",
  },
];

const heatRows = ["Very Likely", "Likely", "Unlikely", "Rare"];
const heatCols = ["Low", "Medium", "High", "Critical"];

const heatData = [
  [
    { label: "M", color: "#F4A235" },
    { label: "H", color: "#F4842A" },
    { label: "H", color: "#F4842A" },
    { label: "C", color: "#E63946" },
  ],
  [
    { label: "L", color: "#2A9D5C" },
    { label: "M", color: "#F4A235" },
    { label: "M", color: "#F4A235" },
    { label: "M", color: "#F4A235" },
  ],
  [
    { label: "L", color: "#2A9D5C" },
    { label: "L", color: "#2A9D5C" },
    { label: "M", color: "#F4A235" },
    { label: "M", color: "#F4A235" },
  ],
  [
    { label: "L", color: "#2A9D5C" },
    { label: "L", color: "#2A9D5C" },
    { label: "L", color: "#2A9D5C" },
    { label: "M", color: "#F4A235" },
  ],
];

const legend = [
  { label: "Low", color: "#2A9D5C" },
  { label: "Medium", color: "#F4A235" },
  { label: "High", color: "#F4842A" },
  { label: "Critical", color: "#E63946" },
];

const reasons = [
  {
    emoji: "🎯",
    title: "Focus Your Efforts",
    desc: "Stop treating all vendors the same. Tier 1 vendors need weekly attention. Tier 4 vendors can be reviewed annually.",
  },
  {
    emoji: "👥",
    title: "Board-Ready Reports",
    desc: 'Explain your vendor risk posture in terms leadership understands. "21 low-risk, 3 critical" tells a clear story.',
  },
  {
    emoji: "⚖️",
    title: "Audit Defense",
    desc: "Demonstrate risk-based vendor management to auditors. Show your methodology, not just your spreadsheets.",
  },
];

// ══════════════════════════════════════════════════════════════════════
//  SECTION 1 – Hero
// ══════════════════════════════════════════════════════════════════════
function RiskTiering__HeroSection() {
  return (
    <section className="RiskTiering__hero">
      <div className="RiskTiering__hero-inner">

        <div className="RiskTiering__hero-badge">
          <span className="RiskTiering__hero-badge-icon">🎯</span>
          <span className="RiskTiering__hero-badge-text">Smart Classification</span>
        </div>

        <div className="RiskTiering__hero-headline-box">
          <h1 className="RiskTiering__hero-h1">
            Know Which Vendors{" "}
            <span className="RiskTiering__hero-h1-accent">Need Attention</span>
          </h1>
        </div>

        <p className="RiskTiering__hero-subtitle">
          Automatic risk tiering based on data sensitivity, security posture,
          and business impact. Focus your time where it matters most.
        </p>

      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════
//  SECTION 2 – Four-Tier Risk Classification
// ══════════════════════════════════════════════════════════════════════
function RiskTiering__TierCard({ tier }) {
  return (
    <div
      className="RiskTiering__tier-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = tier.color;
        e.currentTarget.style.boxShadow = `0 12px 36px ${tier.color}44`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E5E7EB";
        e.currentTarget.style.boxShadow = "0 2px 14px rgba(0,0,0,0.07)";
      }}
    >
      {/* Dynamic background color stays inline — comes from data */}
      <div
        className="RiskTiering__tier-card-header"
        style={{ background: tier.color }}
      >
        <span className="RiskTiering__tier-card-number">{tier.number}</span>
        <span className="RiskTiering__tier-card-label">{tier.label}</span>
      </div>

      <div className="RiskTiering__tier-card-body">
        {/* Dynamic text color stays inline — comes from data */}
        <p
          className="RiskTiering__tier-card-action"
          style={{ color: tier.color }}
        >
          {tier.actionTitle}
        </p>
        <p className="RiskTiering__tier-card-desc">{tier.description}</p>
        <p className="RiskTiering__tier-card-recommended">Recommended:</p>
        <ul className="RiskTiering__tier-card-list">
          {tier.items.map((item) => (
            <li key={item} className="RiskTiering__tier-card-list-item">
              <span className="RiskTiering__tier-card-check">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RiskTiering__FourTierSection() {
  return (
    <section className="RiskTiering__fourtier">
      <div className="RiskTiering__fourtier-inner">
        <div className="RiskTiering__section-header">
          <h2 className="RiskTiering__section-title">
            Four-Tier Risk Classification
          </h2>
          <p className="RiskTiering__section-subtitle">
            Each vendor automatically assigned based on multiple risk factors
          </p>
        </div>
        <div className="RiskTiering__fourtier-grid">
          {tiers.map((t) => (
            <RiskTiering__TierCard key={t.number} tier={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════
//  SECTION 3 – How Tiering Works
// ══════════════════════════════════════════════════════════════════════
function RiskTiering__FactorCard({ f }) {
  return (
    <div className="RiskTiering__factor-card">
      <div className="RiskTiering__factor-card-icon">{f.emoji}</div>
      <h3 className="RiskTiering__factor-card-title">{f.title}</h3>
      <p className="RiskTiering__factor-card-desc">{f.desc}</p>
    </div>
  );
}

function RiskTiering__HowTieringSection() {
  return (
    <section className="RiskTiering__howtiering">
      <div className="RiskTiering__howtiering-inner">
        <div className="RiskTiering__section-header">
          <h2 className="RiskTiering__section-title">How Tiering Works</h2>
          <p className="RiskTiering__section-subtitle">
            Automated classification based on three key factors
          </p>
        </div>
        <div className="RiskTiering__howtiering-grid">
          {factors.map((f) => (
            <RiskTiering__FactorCard key={f.title} f={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════
//  SECTION 4 – Risk Heat Map
// ══════════════════════════════════════════════════════════════════════
function RiskTiering__HeatMapSection() {
  const [hoveredKey, setHoveredKey] = useState(null);

  return (
    <section className="RiskTiering__heatmap">
      <div className="RiskTiering__heatmap-inner">

        <div className="RiskTiering__section-header">
          <h2 className="RiskTiering__section-title">Risk Heat Map</h2>
          <p className="RiskTiering__section-subtitle">
            Probability vs. Impact matrix for precise risk scoring
          </p>
        </div>

        <div className="RiskTiering__heatmap-scroll">
          <table className="RiskTiering__heatmap-table">
            <thead>
              <tr>
                <td style={{ width: 100 }} />
                {heatCols.map((c) => (
                  <th key={c} className="RiskTiering__heatmap-col-header">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatRows.map((row, ri) => (
                <tr key={row}>
                  <td className="RiskTiering__heatmap-row-label">{row}</td>
                  {heatData[ri].map((cell, ci) => {
                    const key = `${ri}-${ci}`;
                    const isHov = hoveredKey === key;
                    return (
                      <td key={ci}>
                        <div
                          className="RiskTiering__heatmap-cell"
                          style={{
                            background: cell.color,
                            transform: isHov ? "scale(1.08)" : "scale(1)",
                            boxShadow: isHov
                              ? `0 4px 18px ${cell.color}88`
                              : "none",
                          }}
                          onMouseEnter={() => setHoveredKey(key)}
                          onMouseLeave={() => setHoveredKey(null)}
                        >
                          {cell.label}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="RiskTiering__heatmap-impact-label">← Impact →</p>

        <div className="RiskTiering__heatmap-legend">
          {legend.map((l) => (
            <div key={l.label} className="RiskTiering__heatmap-legend-item">
              <div
                className="RiskTiering__heatmap-legend-dot"
                style={{ background: l.color }}
              />
              <span className="RiskTiering__heatmap-legend-label">{l.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════
//  SECTION 5 – Why Risk Tiering Matters
// ══════════════════════════════════════════════════════════════════════
function RiskTiering__WhySection() {
  return (
    <section className="RiskTiering__why">
      <div className="RiskTiering__why-inner">
        <div className="RiskTiering__section-header">
          <h2 className="RiskTiering__section-title">
            Why Risk Tiering Matters
          </h2>
        </div>
        <div className="RiskTiering__why-grid">
          {reasons.map((r) => (
            <div key={r.title} className="RiskTiering__why-card">
              <div className="RiskTiering__why-card-icon">{r.emoji}</div>
              <h3 className="RiskTiering__why-card-title">{r.title}</h3>
              <p className="RiskTiering__why-card-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════
//  SECTION 6 – CTA Banner
// ══════════════════════════════════════════════════════════════════════
function RiskTiering__CTASection() {
  return (
    <section className="scorecards-cta">
      <div className="scorecards-container">

        <h2 className="scorecards-cta__title">
          See Your Vendors Tiered Automatically
        </h2>

        <p className="scorecards-cta__sub">
          Add 5 vendors free and watch Verisq classify them by risk level.
        </p>

        <Link to="/" className="scorecards-btn scorecards-btn--white">
          Try 5 Vendors for Free →
        </Link>

      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════
//  ROOT EXPORT
// ══════════════════════════════════════════════════════════════════════
export default function RiskTiering() {
  return (
    <div className="RiskTiering__root">
      <Header />
      <RiskTiering__HeroSection />
      <RiskTiering__FourTierSection />
      <RiskTiering__HowTieringSection />
      <RiskTiering__HeatMapSection />
      <RiskTiering__WhySection />
      <RiskTiering__CTASection />
      <Footer />
    </div>
  );
}