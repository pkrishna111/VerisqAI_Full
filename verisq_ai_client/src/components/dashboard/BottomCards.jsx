import { PieChart, Lightbulb, CheckCircle, Send, Download } from "lucide-react";

function BottomCards({ stats }) {
  const tier1 = stats?.tierCounts?.tier1 ?? 0;
  const tier2 = stats?.tierCounts?.tier2 ?? 0;
  const tier3 = stats?.tierCounts?.tier3 ?? 0;
  const tier4 = stats?.tierCounts?.tier4 ?? 0;

  const total = tier1 + tier2 + tier3 + tier4;

  // avoid divide by 0
  const t1Percent = total ? (tier1 / total) * 100 : 0;
  const t2Percent = total ? (tier2 / total) * 100 : 0;
  const t3Percent = total ? (tier3 / total) * 100 : 0;
  const t4Percent = total ? (tier4 / total) * 100 : 0;

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

        <div className="tier-bar" style={{ display: "flex", height: "8px", borderRadius: "6px", overflow: "hidden" }}>
          <div style={{ width: `${t1Percent}%`, background: "#22c55e" }} />
          <div style={{ width: `${t2Percent}%`, background: "#eab308" }} />
          <div style={{ width: `${t3Percent}%`, background: "#f97316" }} />
          <div style={{ width: `${t4Percent}%`, background: "#ef4444" }} />
        </div>

        <div className="tier-legend">
          <span className="tier-item">
            <span className="dot green" /> Tier 1 (Low) <b>{stats?.tierCounts?.tier1 ?? 0}</b>
          </span>

          <span className="tier-item">
            <span className="dot yellow" /> Tier 2 (Medium) <b>{stats?.tierCounts?.tier2 ?? 0}</b>
          </span>

          <span className="tier-item">
            <span className="dot orange" /> Tier 3 (High) <b>{stats?.tierCounts?.tier3 ?? 0}</b>
          </span>

          <span className="tier-item">
            <span className="dot red" /> Tier 4 (Critical) <b>{stats?.tierCounts?.tier4 ?? 0}</b>
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
