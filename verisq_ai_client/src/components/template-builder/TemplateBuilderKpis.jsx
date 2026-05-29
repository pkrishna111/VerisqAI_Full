import {
  ClipboardList,
  Layers3,
  FileText,
  ShieldCheck
} from "lucide-react";

function TemplateBuilderKpis({ templates }) {

  const totalSections =
    templates.reduce(
      (acc, template) =>
        acc +
        (template.sections?.length || 0),
      0
    );

  const totalQuestions =
    templates.reduce(
      (acc, template) =>
        acc +
        (
          template.sections || []
        ).reduce(
          (sectionAcc, section) =>
            sectionAcc +
            (
              section.questions?.length || 0
            ),
          0
        ),
      0
    );

  return (
    <div className="kpi-grid">

      <div
        className="kpi-card"
        style={{
          "--kpi-color": "var(--primary)",
          "--kpi-bg": "var(--primary-light)"
        }}
      >
        <div className="kpi-header">

          <span className="kpi-label">
            Templates
          </span>

          <div className="kpi-icon">
            <ClipboardList size={22} />
          </div>

        </div>

        <div className="kpi-value">
          {templates.length}
        </div>

        <div className="kpi-subtext">
          Active assessment templates
        </div>
      </div>

      <div
        className="kpi-card"
        style={{
          "--kpi-color": "var(--success)",
          "--kpi-bg": "var(--success-light)"
        }}
      >
        <div className="kpi-header">

          <span className="kpi-label">
            Sections
          </span>

          <div className="kpi-icon">
            <Layers3 size={22} />
          </div>

        </div>

        <div className="kpi-value">
          {totalSections}
        </div>

        <div className="kpi-subtext">
          Total questionnaire sections
        </div>
      </div>

      <div
        className="kpi-card"
        style={{
          "--kpi-color": "var(--warning)",
          "--kpi-bg": "var(--warning-light)"
        }}
      >
        <div className="kpi-header">

          <span className="kpi-label">
            Questions
          </span>

          <div className="kpi-icon">
            <FileText size={22} />
          </div>

        </div>

        <div className="kpi-value">
          {totalQuestions}
        </div>

        <div className="kpi-subtext">
          Dynamic assessment questions
        </div>
      </div>

      <div
        className="kpi-card"
        style={{
          "--kpi-color": "var(--purple)",
          "--kpi-bg": "var(--purple-light)"
        }}
      >
        <div className="kpi-header">

          <span className="kpi-label">
            Status
          </span>

          <div className="kpi-icon">
            <ShieldCheck size={22} />
          </div>

        </div>

        <div className="kpi-value">
          LIVE
        </div>

        <div className="kpi-subtext">
          Dynamic engine connected
        </div>
      </div>

    </div>
  );
}

export default TemplateBuilderKpis;