import "../styles/Scorecards.css";
import Header from "../components/landingPage/Header"
import { Link } from "react-router-dom";
import Footer from "../components/landingPage/Footer"

// ── Hero + Card ──────────────────────────────────────────────────────────────
const HeroSection = () => (
  <>
    <Header />
    <section className="scorecards-hero">
      <div className="scorecards-container">
        <div className="scorecards-hero__layout">

          {/* LEFT — text */}
          <div className="scorecards-hero__left">
            <h1 className="scorecards-hero__title">
              <span>LiveThreat</span> Security Scorecards
            </h1>
            <p className="scorecards-hero__subtitle">
              Real-time cyber threat intelligence that scans your vendors' external
              security posture. No questionnaire needed — just enter a domain and
              get actionable insights within hours.
            </p>
            <div className="scorecards-hero__stats">
              <div className="scorecards-hero__stat">
                <span className="scorecards-hero__stat-value">100+</span>
                <span className="scorecards-hero__stat-label">Security Signals</span>
              </div>
              <div className="scorecards-hero__stat">
                <span className="scorecards-hero__stat-value">&lt;24h</span>
                <span className="scorecards-hero__stat-label">Results Delivery</span>
              </div>
              <div className="scorecards-hero__stat">
                <span className="scorecards-hero__stat-value">PDF</span>
                <span className="scorecards-hero__stat-label">Shareable Reports</span>
              </div>
            </div>
          </div>

          {/* RIGHT — scorecard card */}
          <div className="scorecards-hero__right">
            <div className="scorecards-card">
              <div className="scorecards-card__header">
                <p className="scorecards-card__header-title">LiveThreat Security Scorecard</p>
                <p className="scorecards-card__domain">CloudSync Pro — cloudsyncpro.com</p>
              </div>
              <div className="scorecards-card__body">
                <div className="scorecards-card__score-wrap">
                  <div className="scorecards-card__score-ring">
                    <span className="scorecards-card__score-number">72</span>
                  </div>
                  <div className="scorecards-card__score-info">
                    <p className="scorecards-card__risk-label">Medium Risk</p>
                    <p className="scorecards-card__risk-sub">3 High findings require attention</p>
                  </div>
                </div>
                <div className="scorecards-card__findings">
                  {[
                    { level: "high", text: "SSL Certificate expires in 14 days" },
                    { level: "high", text: "Outdated TLS 1.0 protocol detected" },
                    { level: "medium", text: "Missing DMARC email policy" },
                  ].map((f, i) => (
                    <div key={i} className={`scorecards-card__finding scorecards-card__finding--${f.level}`}>
                      <span className="scorecards-card__finding-badge">{f.level}</span>
                      <span className="scorecards-card__finding-text">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

  </>
);

// ── What LiveThreat Delivers — 3-column card grid ────────────────────────────
const deliverItems = [
  {
    icon: "📊",
    iconBg: "#fff0f0",
    title: "Security Score",
    desc: "Single 0–100 score that summarizes overall security posture based on weighted findings across all categories.",
  },
  {
    icon: "⚡",
    iconBg: "#fff8ec",
    title: "Prioritized Findings",
    desc: "Critical, high, medium, and low findings ranked by impact so you know exactly what needs immediate attention.",
  },
  {
    icon: "📄",
    iconBg: "#f0fdf4",
    title: "PDF Reports",
    desc: "Professional, shareable reports you can send to stakeholders, auditors, or attach to vendor files.",
  },
  {
    icon: "🔄",
    iconBg: "#fef9ec",
    title: "Continuous Monitoring",
    desc: "Scorecards auto-refresh to catch security degradation before it becomes a breach vector.",
  },
  {
    icon: "📈",
    iconBg: "#eff6ff",
    title: "Trend Analysis",
    desc: "Track how vendor security changes over time. See if issues are being remediated or new risks emerging.",
  },
  {
    icon: "⚙️",
    iconBg: "#fff4ec",
    title: "Instant Results",
    desc: "No waiting for vendors to respond. Get initial findings within hours of adding a vendor.",
  },
];

const DeliverSection = () => (
  <section className="scorecards-deliver">
    <div className="scorecards-container">
      <h2 className="scorecards-section-title">What LiveThreat Delivers</h2>
      <p className="scorecards-section-sub">
        Comprehensive external security assessment without vendor involvement
      </p>
      <div className="scorecards-deliver__grid">
        {deliverItems.map((item, i) => (
          <div className="scorecards-deliver__card" key={i}>
            <div
              className="scorecards-deliver__icon"
              style={{ background: item.iconBg }}
            >
              {item.icon}
            </div>
            <h3 className="scorecards-deliver__card-title">{item.title}</h3>
            <p className="scorecards-deliver__card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── What We Scan ─────────────────────────────────────────────────────────────
const scanItems = [
  { icon: "🔒", title: "SSL/TLS Security", desc: "Certificate validity, protocol versions, cipher strength" },
  { icon: "📧", title: "Email Security", desc: "SPF, DKIM, DMARC configuration and policy" },
  { icon: "🌐", title: "DNS Configuration", desc: "DNSSEC, nameserver security, zone transfers" },
  { icon: "🖥️", title: "Web Application", desc: "Security headers, WAF detection, HTTPS enforcement" },
  { icon: "🔌", title: "Network Security", desc: "Open ports, exposed services, IP reputation" },
  { icon: "💥", title: "Breach History", desc: "Known breaches, dark web mentions, credential leaks" },
  { icon: "✅", title: "Compliance Signals", desc: "SOC 2, ISO 27001, privacy policy presence" },
  { icon: "🛡️", title: "Vulnerability Intel", desc: "Known CVEs, patching cadence, tech stack risks" },
];

const ScanSection = () => (
  <section className="scorecards-scan">
    <div className="scorecards-container">
      <h2 className="scorecards-section-title">What We Scan</h2>
      <p className="scorecards-section-sub">100+ security signals across these key categories</p>
      <div className="scorecards-scan__grid">
        {scanItems.map((item, i) => (
          <div className="scorecards-scan__card" key={i}>
            <div className="scorecards-scan__card-icon">{item.icon}</div>
            <h3 className="scorecards-scan__card-title">{item.title}</h3>
            <p className="scorecards-scan__card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── CTA ───────────────────────────────────────────────────────────────────────
const CtaSection = () => (
  <section className="scorecards-cta">
    <div className="scorecards-container">
      <h2 className="scorecards-cta__title">See Your Vendors' Security Posture Today</h2>
      <p className="scorecards-cta__sub">
        Try LiveThreat free with 5 vendors. Get your first scorecard within hours.
      </p>
      <Link to="/" className="scorecards-btn scorecards-btn--white">
        Try 5 Vendors for Free →
      </Link>
    </div>
  </section>
);

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Scorecards() {
  return (
    <div className="scorecards-root">
      <HeroSection />
      <DeliverSection />
      <ScanSection />
      <CtaSection />
      <Footer />
    </div>
  );
}