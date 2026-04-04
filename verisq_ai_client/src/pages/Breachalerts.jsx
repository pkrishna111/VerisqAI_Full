// BreachAlerts.jsx
// All component names and CSS classes are prefixed with BreachAlerts__

import { useState } from "react";
import "../styles/BreachAlerts.css";
import Header from "../components/landingPage/Header"
import Footer from "../components/landingPage/Footer"

// ══════════════════════════════════════════════════════════════════════
//  Data
// ══════════════════════════════════════════════════════════════════════
const monitoringFeatures = [
  {
    emoji: "📰",
    bg: "#FDE8E8",
    title: "Breach Disclosures",
    desc: "Monitor SEC filings, press releases, and regulatory notifications for breach announcements affecting your vendors.",
  },
  {
    emoji: "🕶️",
    bg: "#FEF9C3",
    title: "Dark Web Intelligence",
    desc: "Scan dark web forums and marketplaces for vendor credential leaks, data dumps, and threat actor discussions.",
  },
  {
    emoji: "📉",
    bg: "#E0E7FF",
    title: "Security Degradation",
    desc: "Detect when vendor security posture deteriorates — expired certificates, new vulnerabilities, or configuration drift.",
  },
  {
    emoji: "✅",
    bg: "#D1FAE5",
    title: "Compliance Changes",
    desc: "Track when vendor certifications expire or compliance status changes — SOC 2, ISO 27001, HIPAA attestations.",
  },
  {
    emoji: "🏢",
    bg: "#E0E7FF",
    title: "Corporate Changes",
    desc: "Alert on acquisitions, leadership changes, or financial instability that could impact vendor security or continuity.",
  },
  {
    emoji: "⚖️",
    bg: "#FEF9C3",
    title: "Regulatory Actions",
    desc: "Monitor for enforcement actions, fines, or regulatory investigations involving your vendors.",
  },
];

const severityLevels = [
  {
    code: "P1",
    color: "#E63946",
    title: "Critical — Immediate Action",
    desc: "Confirmed breach with potential data exposure. Requires immediate response and stakeholder notification.",
  },
  {
    code: "P2",
    color: "#F4642A",
    title: "High — Same Day Response",
    desc: "Security incident under investigation or significant security degradation detected.",
  },
  {
    code: "P3",
    color: "#F4A235",
    title: "Medium — This Week",
    desc: "Moderate findings, expiring certifications, or emerging risk indicators requiring attention.",
  },
  {
    code: "P4",
    color: "#3B5BDB",
    title: "Info — Awareness Only",
    desc: "Minor changes, industry news, or informational updates about your vendor ecosystem.",
  },
];

const stats = [
  { value: "<4h",  label: "Average alert time" },
  { value: "24/7", label: "Continuous monitoring" },
  { value: "100+", label: "Threat intel sources" },
];

const channels = [
  { emoji: "📧", title: "Email",     desc: "Instant email alerts with full context" },
  { emoji: "📊", title: "Dashboard", desc: "Centralized alert management" },
  { emoji: "💬", title: "Slack",     desc: "Team channel notifications" },
  { emoji: "🔗", title: "Webhooks",  desc: "Custom integrations via API" },
];

// ══════════════════════════════════════════════════════════════════════
//  SECTION 1 – Hero
// ══════════════════════════════════════════════════════════════════════
function BreachAlerts__HeroSection() {
  return (
    
    <>
    <Header/>
    <section className="BreachAlerts__hero">
      <div className="BreachAlerts__hero-inner">

        {/* Left */}
        <div className="BreachAlerts__hero-left">
          <h1 className="BreachAlerts__hero-h1">
            Know About Vendor{" "}
            <span className="BreachAlerts__hero-h1-accent">Breaches First</span>
          </h1>
          <p className="BreachAlerts__hero-desc">
            Real-time monitoring for security incidents affecting your vendors.
            Get alerted within hours, not weeks — before you read about it in the news.
          </p>
          <ul className="BreachAlerts__hero-list">
            <li className="BreachAlerts__hero-list-item">
              <span className="BreachAlerts__hero-list-icon">⚡</span>
              Alerts within hours of public disclosure
            </li>
            <li className="BreachAlerts__hero-list-item">
              <span className="BreachAlerts__hero-list-icon">🔔</span>
              Email + dashboard notifications
            </li>
            <li className="BreachAlerts__hero-list-item">
              <span className="BreachAlerts__hero-list-icon">🛡️</span>
              Impact assessment included
            </li>
          </ul>
        </div>

        {/* Right – Alert card */}
        <div className="BreachAlerts__hero-right">
          <div className="BreachAlerts__alert-card">
            <div className="BreachAlerts__alert-card-header">
              <span className="BreachAlerts__alert-card-header-icon">⚠️</span>
              <span className="BreachAlerts__alert-card-header-text">Active Alerts (2)</span>
            </div>

            <div className="BreachAlerts__alert-card-body">
              {/* Alert 1 */}
              <div className="BreachAlerts__alert-item">
                <div className="BreachAlerts__alert-item-dot BreachAlerts__alert-item-dot--critical" />
                <div className="BreachAlerts__alert-item-content">
                  <p className="BreachAlerts__alert-item-title">
                    Data Breach Confirmed — CloudSync Pro
                  </p>
                  <p className="BreachAlerts__alert-item-desc">
                    Vendor disclosed unauthorized access to customer data. Investigation
                    ongoing. 2.3M records potentially exposed.
                  </p>
                  <div className="BreachAlerts__alert-item-meta">
                    <span className="BreachAlerts__alert-item-meta-pill">
                      🕐 2 hours ago
                    </span>
                    <span className="BreachAlerts__alert-item-meta-pill BreachAlerts__alert-item-meta-pill--warn">
                      ⚠️ Tier 3 Vendor
                    </span>
                  </div>
                </div>
              </div>

              <div className="BreachAlerts__alert-divider" />

              {/* Alert 2 */}
              <div className="BreachAlerts__alert-item">
                <div className="BreachAlerts__alert-item-dot BreachAlerts__alert-item-dot--warning" />
                <div className="BreachAlerts__alert-item-content">
                  <p className="BreachAlerts__alert-item-title">
                    Security Degradation — DataPipe Analytics
                  </p>
                  <p className="BreachAlerts__alert-item-desc">
                    SSL certificate expired. LiveThreat score dropped from 85 to 62.
                    Immediate attention recommended.
                  </p>
                  <div className="BreachAlerts__alert-item-meta">
                    <span className="BreachAlerts__alert-item-meta-pill">
                      🕐 6 hours ago
                    </span>
                    <span className="BreachAlerts__alert-item-meta-pill BreachAlerts__alert-item-meta-pill--score">
                      📉 -23 points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    </>
    
  );
}

// ══════════════════════════════════════════════════════════════════════
//  SECTION 2 – Continuous Threat Monitoring
// ══════════════════════════════════════════════════════════════════════
function BreachAlerts__MonitoringCard({ feature }) {
  return (
    <div className="BreachAlerts__monitoring-card">
      <div
        className="BreachAlerts__monitoring-card-icon"
        style={{ background: feature.bg }}
      >
        {feature.emoji}
      </div>
      <h3 className="BreachAlerts__monitoring-card-title">{feature.title}</h3>
      <p className="BreachAlerts__monitoring-card-desc">{feature.desc}</p>
    </div>
  );
}

function BreachAlerts__MonitoringSection() {
  return (
    <section className="BreachAlerts__monitoring">
      <div className="BreachAlerts__monitoring-inner">
        <div className="BreachAlerts__section-header">
          <h2 className="BreachAlerts__section-title">Continuous Threat Monitoring</h2>
          <p className="BreachAlerts__section-subtitle">We watch so you don't have to</p>
        </div>
        <div className="BreachAlerts__monitoring-grid">
          {monitoringFeatures.map((f) => (
            <BreachAlerts__MonitoringCard key={f.title} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════
//  SECTION 3 – Alert Severity Levels
// ══════════════════════════════════════════════════════════════════════
function BreachAlerts__SeveritySection() {
  return (
    <section className="BreachAlerts__severity">
      <div className="BreachAlerts__severity-inner">
        <div className="BreachAlerts__section-header">
          <h2 className="BreachAlerts__section-title">Alert Severity Levels</h2>
          <p className="BreachAlerts__section-subtitle">
            Prioritized notifications so you know what needs immediate action
          </p>
        </div>
        <div className="BreachAlerts__severity-list">
          {severityLevels.map((s) => (
            <div key={s.code} className="BreachAlerts__severity-item">
              <div
                className="BreachAlerts__severity-badge"
                style={{ background: s.color }}
              >
                {s.code}
              </div>
              <div className="BreachAlerts__severity-content">
                <p className="BreachAlerts__severity-title">{s.title}</p>
                <p className="BreachAlerts__severity-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════
//  SECTION 4 – Speed Matters
// ══════════════════════════════════════════════════════════════════════
function BreachAlerts__SpeedSection() {
  return (
    <section className="BreachAlerts__speed">
      <div className="BreachAlerts__speed-inner">
        <div className="BreachAlerts__speed-card">
          <h2 className="BreachAlerts__speed-title">
            Speed Matters in Incident Response
          </h2>
          <p className="BreachAlerts__speed-subtitle">
            The faster you know, the faster you can act. Verisq monitors 24/7 so
            you're never blindsided.
          </p>
          <div className="BreachAlerts__speed-stats">
            {stats.map((s) => (
              <div key={s.label} className="BreachAlerts__speed-stat">
                <span className="BreachAlerts__speed-stat-value">{s.value}</span>
                <span className="BreachAlerts__speed-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════
//  SECTION 5 – Get Alerts Where You Work
// ══════════════════════════════════════════════════════════════════════
function BreachAlerts__ChannelsSection() {
  return (
    <section className="BreachAlerts__channels">
      <div className="BreachAlerts__channels-inner">
        <div className="BreachAlerts__section-header">
          <h2 className="BreachAlerts__section-title">Get Alerts Where You Work</h2>
          <p className="BreachAlerts__section-subtitle">
            Multiple notification channels to ensure you never miss critical alerts
          </p>
        </div>
        <div className="BreachAlerts__channels-grid">
          {channels.map((c) => (
            <div key={c.title} className="BreachAlerts__channel-card">
              <div className="BreachAlerts__channel-card-icon">{c.emoji}</div>
              <h3 className="BreachAlerts__channel-card-title">{c.title}</h3>
              <p className="BreachAlerts__channel-card-desc">{c.desc}</p>
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
function BreachAlerts__CTASection() {
  return (
    <>
    <section className="BreachAlerts__cta">
      <h2 className="BreachAlerts__cta-title">
        Never Be Surprised by a Vendor Breach
      </h2>
      <p className="BreachAlerts__cta-subtitle">
        Start monitoring your vendors today. Free for 5 vendors.
      </p>
      <button className="BreachAlerts__cta-btn">
        Try 5 Vendors for Free →
      </button>
    </section>
    <Footer/>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════
//  ROOT EXPORT
// ══════════════════════════════════════════════════════════════════════
export default function BreachAlerts() {
  return (
    <div className="BreachAlerts__root">
      <BreachAlerts__HeroSection />
      <BreachAlerts__MonitoringSection />
      <BreachAlerts__SeveritySection />
      <BreachAlerts__SpeedSection />
      <BreachAlerts__ChannelsSection />
      <BreachAlerts__CTASection />
    </div>
  );
}