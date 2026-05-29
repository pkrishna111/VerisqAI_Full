// Questionnaires.jsx
// Pixel-perfect replica of livethreatuat.verisq.ai/dnbl/questionnaires
// Orange → replaced with Primary Blue (#2563eb)
// Header & Footer already exist — not included here

import '../styles/Questionnaires.css';
import { Link } from "react-router-dom";
import Header from "../components/landingPage/Header"
import Footer from "../components/landingPage/Footer"

/* ─────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────── */

const DEMO_QUESTIONS = [
  {
    id: '3.1',
    question: 'Does your organization maintain an inventory of all IT assets?',
    answer: 'Yes',
    source: 'sourced from SOC 2 Type II Report, Section 4.2',
  },
  {
    id: '3.2',
    question: 'Is encryption used for data at rest?',
    answer: 'Yes, AES-256',
    source: 'sourced from Security Whitepaper',
  },
  {
    id: '3.3',
    question: 'Do you have a documented incident response plan?',
    answer: 'Yes',
    source: 'sourced from ISO 27001 Certificate',
  },
];

const HOW_STEPS = [
  {
    emoji: '🔍',
    name: 'Document Ingestion',
    desc: 'QFX reads vendor SOC 2 reports, security docs, and public filings.',
  },
  {
    emoji: '🧠',
    name: 'Intelligent Mapping',
    desc: 'AI maps documentation to questionnaire requirements across frameworks.',
  },
  {
    emoji: '📋',
    name: 'Auto-Completion',
    desc: 'Responses pre-filled with verified answers and source citations.',
  },
  {
    emoji: '✅',
    name: 'Review & Approve',
    desc: 'You verify AI suggestions and approve — no manual data entry.',
  },
];

const WHY_ITEMS = [
  {
    emoji: '⏱️',
    title: 'Weeks → Hours',
    desc: 'Traditional questionnaires take 3–6 weeks with endless follow-ups. QFX delivers completed assessments in hours.',
  },
  {
    emoji: '📵',
    title: 'No Chase Emails',
    desc: 'Stop sending 47 reminder emails per vendor. QFX finds answers without bothering your vendors.',
  },
  {
    emoji: '📎',
    title: 'Evidence-Based Answers',
    desc: 'Every auto-filled response includes source citations so you know exactly where the answer came from.',
  },
  {
    emoji: '🔧',
    title: 'Framework Flexible',
    desc: 'Works with SIG, CAIQ, NIST CSF, or your custom questionnaire templates. One vendor, multiple assessments.',
  },
];

const NUMBERS = [
  { old: '3–6 weeks', now: 'Hours', label: 'Time to completion' },
  { old: '47 emails', now: 'Zero', label: 'Follow-up messages' },
  { old: 'Manual entry', now: '85%', label: 'Auto-filled responses' },
];

/* ─────────────────────────────────────────────
   SMALL SUB-COMPONENTS
───────────────────────────────────────────── */

/** Single Q&A row inside the demo card */
function DemoRow({ id, question, answer, source }) {
  return (
    <div className="Questionnaires-demo-qrow">
      <p className="Questionnaires-demo-qtext">
        <span className="Questionnaires-demo-qnum">{id}</span>
        {question}
      </p>
      <div className="Questionnaires-demo-answer">
        <span className="Questionnaires-demo-tag">
          <span className="Questionnaires-demo-tag-dot" />
          QFX
        </span>
        <span className="Questionnaires-demo-ans-text">
          {answer}{' '}
          <span className="Questionnaires-demo-ans-src">— {source}</span>
        </span>
      </div>
    </div>
  );
}

/** Step card — centered icon + title + desc */
function StepCard({ emoji, name, desc }) {
  return (
    <div className="Questionnaires-step-card">
      <div className="Questionnaires-step-icon">
        <span role="img" aria-label={name}>{emoji}</span>
      </div>
      <h3 className="Questionnaires-step-name">{name}</h3>
      <p className="Questionnaires-step-desc">{desc}</p>
    </div>
  );
}

/** Why card — icon LEFT, text RIGHT */
function WhyCard({ emoji, title, desc }) {
  return (
    <div className="Questionnaires-why-card">
      <div className="Questionnaires-why-icon">
        <span role="img" aria-label={title}>{emoji}</span>
      </div>
      <div>
        <h4 className="Questionnaires-why-title">{title}</h4>
        <p className="Questionnaires-why-desc">{desc}</p>
      </div>
    </div>
  );
}

/** Numbers comparison item */
function NumberItem({ old: oldVal, now, label }) {
  return (
    <div className="Questionnaires-number-item">
      <span className="Questionnaires-number-old">{oldVal}</span>
      <span className="Questionnaires-number-new">{now}</span>
      <span className="Questionnaires-number-desc">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE COMPONENT
───────────────────────────────────────────── */
export default function Questionnaires() {
  return (
    <>

      <Header />

      <main className="Questionnaires-page">

        {/* ══════════════════════════════════════════
          SECTION 1 — HERO
          Grid: [left text] [right demo card]
      ══════════════════════════════════════════ */}
        <section className="Questionnaires-hero">
          <div className="Questionnaires-container">
            <div className="Questionnaires-hero-grid">

              {/* ── Left column ─────────────────────── */}
              <div className="Questionnaires-hero-left">

                {/* Breadcrumb chip */}
                <div className="Questionnaires-chip">
                  <span className="Questionnaires-chip-icon">⚡</span>
                  QFX Technology
                </div>

                {/* Headline — accent on second line */}
                <h1 className="Questionnaires-hero-title">
                  Questionnaires That
                  <span className="Questionnaires-hero-title-accent">
                    Complete Themselves
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="Questionnaires-hero-subtitle">
                  QFX reads vendor SOC 2 reports, security documentation, and
                  public filings to auto-fill questionnaire responses. What used to
                  take weeks now takes hours.
                </p>

                {/* Stats */}
                <div className="Questionnaires-stats">
                  <div>
                    <div className="Questionnaires-stat-val">85%</div>
                    <div className="Questionnaires-stat-label">Auto-Fill Rate</div>
                  </div>
                  <div>
                    <div className="Questionnaires-stat-val">Hours</div>
                    <div className="Questionnaires-stat-label">vs. Weeks</div>
                  </div>
                  <div>
                    <div className="Questionnaires-stat-val">0</div>
                    <div className="Questionnaires-stat-label">Chase Emails</div>
                  </div>
                </div>
              </div>

              {/* ── Right column — demo card ─────────── */}
              <div className="Questionnaires-hero-right">
                <div className="Questionnaires-demo-card">

                  {/* Card header */}
                  <div className="Questionnaires-demo-header">
                    <div className="Questionnaires-demo-header-row">
                      <span className="Questionnaires-demo-header-title">
                        Security Assessment Questionnaire
                      </span>
                    </div>
                    <div className="Questionnaires-demo-progress-wrap">
                      <div className="Questionnaires-demo-progress-track">
                        <div className="Questionnaires-demo-progress-fill" />
                      </div>
                      <span className="Questionnaires-demo-progress-label">
                        85% Auto-filled
                      </span>
                    </div>
                  </div>

                  {/* Card body — Q&A rows */}
                  <div className="Questionnaires-demo-body">
                    {DEMO_QUESTIONS.map((q) => (
                      <DemoRow key={q.id} {...q} />
                    ))}
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
          SECTION 2 — HOW QFX WORKS
          4 cards in a row, centered content
      ══════════════════════════════════════════ */}
        <section className="Questionnaires-how">
          <div className="Questionnaires-container">
            <h2 className="Questionnaires-section-title">How QFX Works</h2>
            <p className="Questionnaires-section-sub">
              AI-powered questionnaire completion in four steps
            </p>
            <div className="Questionnaires-steps-grid">
              {HOW_STEPS.map((step) => (
                <StepCard key={step.name} {...step} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
          SECTION 3 — WHY QFX CHANGES EVERYTHING
          2×2 grid, icon on left
      ══════════════════════════════════════════ */}
        <section className="Questionnaires-why">
          <div className="Questionnaires-container">
            <h2 className="Questionnaires-section-title">Why QFX Changes Everything</h2>
            <p className="Questionnaires-section-sub">
              The operational burden of TPRM finally solved
            </p>
            <div className="Questionnaires-why-grid">
              {WHY_ITEMS.map((item) => (
                <WhyCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
          SECTION 4 — THE NUMBERS DON'T LIE
          Peach bg, no card, strikethrough + big val
      ══════════════════════════════════════════ */}
        <section className="Questionnaires-numbers">
          <div className="Questionnaires-container">
            <h2 className="Questionnaires-section-title">The Numbers Don't Lie</h2>
            <p className="Questionnaires-section-sub">
              Traditional questionnaire process vs. Verisq QFX
            </p>
            <div className="Questionnaires-numbers-grid">
              {NUMBERS.map((n) => (
                <NumberItem key={n.label} {...n} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
          SECTION 5 — CTA
          Dark navy bg, headline + subtitle + button
      ══════════════════════════════════════════ */}
        <section className="scorecards-cta">
          <div className="scorecards-container">
            <h2 className="scorecards-cta__title">
              Experience QFX Technology
            </h2>
            <p className="scorecards-cta__sub">
              Send a questionnaire to one of your trial vendors and watch QFX work its magic.
            </p>
            <Link to="/" className="scorecards-btn scorecards-btn--white">
              Try 5 Vendors for Free →
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>


  );
}