import '../styles/Howitworks.css'
import "../styles/Scorecards.css"   // ✅ added for CTA reuse
import { Link } from "react-router-dom";
import Header from "../components/landingPage/Header"
import Footer from "../components/landingPage/Footer"

/* =========================
   STEPS DATA
========================= */
const STEPS = [
  {
    number: '1',
    color: 'orange',
    title: 'Sign Up with Your Work Email',
    desc: 'Fill out the trial form with your name, company, and work email. We block personal email providers — this is a professional tool for real security teams. Your company domain will be verified against your email.',
    badge: { variant: 'blue', icon: '⊙', text: 'Work emails only — no Gmail, Yahoo, etc...' },
  },
  {
    number: '2',
    color: 'blue',
    title: 'Get Approved & Log In',
    desc: "Our team reviews each trial request to ensure quality. Once approved, you'll receive an email with a link to your unique trial login page. Authentication uses a one-time code sent to your email — no passwords to remember.",
    badge: { variant: 'blue', icon: '⊙', text: 'Most approvals within a few hours' },
  },
  {
    number: '3',
    color: 'green',
    title: 'Add Your Vendors (Up to 5)',
    desc: "Enter your real vendors — just a name and domain for each. That's it. No complex onboarding, no data classification required. Verisq LiveThreat™ immediately begins scanning their external attack surface.",
    badge: { variant: 'blue', icon: '✦', text: 'Scans start instantly — results in minutes' },
  },
  {
    number: '4',
    color: 'purple',
    title: 'View Scores & Send AI Assessments',
    desc: 'Each vendor receives a security rating (250–900), letter grade (A–F), and detailed findings across risk vectors like TLS/SSL, open ports, DNS, and more. Optionally send AI-powered security questionnaires to your vendors.',
    badge: { variant: 'blue', icon: '✦', text: 'AI pre-fills assessments from uploaded SOC/PEN reports' },
  },
  {
    number: '5',
    color: 'orange',
    title: 'Upgrade or Share PDF Reports',
    desc: "Download professional PDF scorecards to share with stakeholders.",
    badge: null,
  },
]

/* =========================
   INCLUDED CARDS
========================= */
const INCLUDED = [
  {
    icon: <span>🛡️</span>,
    title: 'Verisq LiveThreat™ Scorecards',
    sub: 'Full security ratings for up to 5 vendors',
    items: [
      '250–900 rating scale with A–F grades',
      'Risk vector breakdown',
      'Downloadable PDF reports',
      'External attack surface discovery',
    ],
  },
  {
    icon: <span>📄</span>,
    title: 'AI-Powered Questionnaires',
    sub: 'Smart vendor security assessments',
    items: [
      'Send assessments to vendor contacts',
      'Upload SOC/PEN reports for AI pre-fill',
      'Automatic analysis',
      'Faster vendor response times',
    ],
  },
  {
    icon: <span>📊</span>,
    title: 'Risk Intelligence',
    sub: 'Actionable security insights',
    items: [
      'High/Critical alerts',
      'Vulnerability breakdown',
      'Remediation guidance',
      'Ransomware indicators',
    ],
  },
]

/* =========================
   STEP CARD
========================= */
function StepCard({ number, color, title, desc, badge, isLast }) {
  return (
    <>
      <div className="Howitworks_step_card">
        <div className={`Howitworks_step_number Howitworks_step_${color}`}>
          {number}
        </div>
        <div className="Howitworks_step_content">
          <h3 className="Howitworks_step_title">{title}</h3>
          <p className="Howitworks_step_desc">{desc}</p>
          {badge && (
            <span className={`Howitworks_step_badge Howitworks_badge_${badge.variant}`}>
              <span className="Howitworks_badge_icon">{badge.icon}</span>
              {badge.text}
            </span>
          )}
        </div>
      </div>
      {!isLast && <hr className="Howitworks_step_divider" />}
    </>
  )
}

/* =========================
   INCLUDED CARD
========================= */
function IncludedCard({ icon, title, sub, items }) {
  return (
    <div className="Howitworks_included_card">
      <div className="Howitworks_included_icon_wrap">{icon}</div>
      <h4 className="Howitworks_included_card_title">{title}</h4>
      <p className="Howitworks_included_card_sub">{sub}</p>
      <ul className="Howitworks_included_list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

/* =========================
   REUSED CTA (FROM SCORECARDS)
========================= */
function CtaSection() {
  return (
    <section className="scorecards-cta">
      <div className="scorecards-container">
        <h2 className="scorecards-cta__title">
          Don't Be Larry. Start Today.
        </h2>
        <p className="scorecards-cta__sub">
          See where your vendors really stand — in minutes, not months.
        </p>
        <Link to="/" className="scorecards-btn scorecards-btn--white">
          Try 5 Vendors for Free →
        </Link>
      </div>
    </section>
  )
}

/* =========================
   MAIN COMPONENT
========================= */
function HowItWorks() {
  return (
    <main id="Howitworks_main">

      {/* ✅ FIXED: Header moved here */}
      <Header />

      {/* HERO */}
      <section id="Howitworks_hero">
        <h1 id="Howitworks_hero_title">
          How the Verisq LiveThreat™ Trial Works
        </h1>
        <p id="Howitworks_hero_subtitle">
          Five steps from sign-up to actionable vendor risk intelligence.
        </p>
      </section>

      {/* STEPS */}
      <section id="Howitworks_steps_section">
        <div id="Howitworks_steps_container">
          {STEPS.map((step, index) => (
            <StepCard
              key={step.number}
              {...step}
              isLast={index === STEPS.length - 1}
            />
          ))}
        </div>
      </section>

      {/* INCLUDED */}
      <section id="Howitworks_included_section">
        <div id="Howitworks_included_inner">
          <h2 id="Howitworks_included_title">
            What's Included in Your Free Trial
          </h2>
          <p id="Howitworks_included_subtitle">
            Everything you need to evaluate vendor risk
          </p>
          <div id="Howitworks_included_cards_wrap">
            {INCLUDED.map((card) => (
              <IncludedCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* ✅ NEW CTA (MATCHED WITH SCORECARD) */}
      <CtaSection />

      <Footer />
    </main>
  )
}

export default HowItWorks