import { BarChart3, FileText, Target, Bell } from "lucide-react";

function FeaturesStrip() {
  return (
    <section className="features-strip">
      <div className="features-content">

        <div className="feature-item">
          <BarChart3 className="feature-icon" />
          <span>LiveThreat Scorecards</span>
        </div>

        <span className="feature-divider">|</span>

        <div className="feature-item">
          <FileText className="feature-icon" />
          <span>Auto Questionnaires</span>
        </div>

        <span className="feature-divider">|</span>

        <div className="feature-item">
          <Target className="feature-icon" />
          <span>Risk Tiering</span>
        </div>

        <span className="feature-divider">|</span>

        <div className="feature-item">
          <Bell className="feature-icon" />
          <span>Breach Alerts</span>
        </div>

      </div>
    </section>
  )
}

export default FeaturesStrip
