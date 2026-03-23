import '../styles/Howitworks.css'
import Header from "../components/landingPage/Header"

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
    desc: 'Each vendor receives a security rating (250–900), letter grade (A–F), and detailed findings across risk vectors like TLS/SSL, open ports, DNS, and more. Optionally send AI-powered security questionnaires to your vendors — upload existing attestations and Verisq AI will pre-fill responses.',
    badge: { variant: 'blue', icon: '✦', text: 'AI pre-fills assessments from uploaded SOC/PEN reports' },
  },
  {
    number: '5',
    color: 'orange',
    title: 'Upgrade or Share PDF Reports',
    desc: "Download professional PDF scorecards to share with stakeholders. When you're ready for unlimited vendors, continuous monitoring, and the full Verisq AI TPRM platform — upgrade with one click.",
    badge: null,
  },
]

/* Only 3 cards — single row */
const INCLUDED = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Verisq LiveThreat™ Scorecards',
    sub: 'Full security ratings for up to 5 vendors',
    items: [
      '250–900 rating scale with A–F grades',
      'Risk vector breakdown (TLS, DNS, Ports, etc.)',
      'Downloadable PDF reports',
      'External attack surface discovery',
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    title: 'AI-Powered Questionnaires',
    sub: 'Smart vendor security assessments',
    items: [
      'Send assessments to vendor contacts',
      'Upload SOC/PEN reports for AI pre-fill',
      'Verisq AI analyzes attestations automatically',
      'Faster vendor response times',
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6"  y1="20" x2="6"  y2="14" />
      </svg>
    ),
    title: 'Risk Intelligence',
    sub: 'Actionable security insights',
    items: [
      'High/Critical finding alerts',
      'Vulnerability severity breakdown',
      'Remediation guidance',
      'Ransomware risk indicators',
    ],
  },
]

function StepCard({ number, color, title, desc, badge, isLast }) {
  return (
    <>
        <Header/>

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

function HowItWorks() {
  return (
    <main id="Howitworks_main">

      {/* Hero */}
      <section id="Howitworks_hero">
        <h1 id="Howitworks_hero_title">
          How the Verisq LiveThreat™ Trial Works
        </h1>
        <p id="Howitworks_hero_subtitle">
          Five steps from sign-up to actionable vendor risk intelligence — no
          credit card, no commitment.
        </p>
      </section>

      {/* Steps */}
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

      {/* What's Included — 3 cards single row */}
      <section id="Howitworks_included_section">
        <div id="Howitworks_included_inner">
          <h2 id="Howitworks_included_title">
            What's Included in Your Free Trial
          </h2>
          <p id="Howitworks_included_subtitle">
            Everything you need to evaluate your vendor risk posture — completely free
          </p>
          <div id="Howitworks_included_cards_wrap">
            {INCLUDED.map((card) => (
              <IncludedCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="Howitworks_cta_section">
        <h2 id="Howitworks_cta_title">Don't Be Larry. Start Today.</h2>
        <p id="Howitworks_cta_subtitle">
          See where your vendors really stand — in minutes, not months.
        </p>
        <a href="#" id="Howitworks_cta_btn">→ Try 5 Vendors for Free</a>
        <p id="Howitworks_cta_powered">
          Powered by <strong>Verisq.AI</strong>
        </p>
      </section>

    </main>
  )
}

export default HowItWorks