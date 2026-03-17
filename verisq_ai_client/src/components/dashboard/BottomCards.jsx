import { PieChart, Lightbulb, CheckCircle, Send, Download } from "lucide-react";

function BottomCards() {
  return (
    <div className="bottom-grid">
      {/* LEFT — Risk Tier Distribution */}
      <div className="card">
        <div className="card-header">
          <div className="card-icon blue">
            <PieChart size={18} />
          </div>
          <h4>Risk Tier Distribution</h4>
        </div>

        <div className="tier-bar" />

        <div className="tier-legend">
          <span className="tier-item">
            <span className="dot green" /> Tier 1 (Low) <b>0</b>
          </span>
          <span className="tier-item">
            <span className="dot yellow" /> Tier 2 (Medium) <b>0</b>
          </span>
          <span className="tier-item">
            <span className="dot orange" /> Tier 3 (High) <b>1</b>
          </span>
          <span className="tier-item">
            <span className="dot red" /> Tier 4 (Critical) <b>0</b>
          </span>
        </div>
      </div>

      {/* RIGHT — Getting the Most */}
      <div className="card">
        <div className="card-header">
          <div className="card-icon yellow">
            <Lightbulb size={18} />
          </div>
          <h4>Getting the Most from Your Trial</h4>
        </div>

        <div className="trial-item">
          <CheckCircle size={18} className="green-text" />
          <div>
            <b>Add vendors with different risk profiles</b>
            <p>See how LiveThreat scores vary by security posture</p>
          </div>
        </div>

        <div className="trial-item">
          <Send size={18} className="blue-text" />
          <div>
            <b>Send a questionnaire</b>
            <p>Experience our QFX auto-completion technology</p>
          </div>
        </div>

        <div className="trial-item">
          <Download size={18} className="purple-text" />
          <div>
            <b>Download your PDF scorecards</b>
            <p>Share with stakeholders or keep for your records</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomCards;
