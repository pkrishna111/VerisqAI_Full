import { Sparkles, ChevronDown } from "lucide-react";

function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header-content">

        {/* LEFT */}
        <div className="dashboard-header-left">
          <div className="dashboard-logo">
            <span className="dashboard-logo-text">VERISQ</span>
            <span className="dashboard-logo-badge">AI</span>
          </div>

          <div className="dashboard-header-divider"></div>

          <span className="dashboard-header-title">Trial Dashboard</span>
        </div>

        {/* RIGHT */}
        <div className="dashboard-header-right">
          <div className="trial-badge">
            <Sparkles size={16} />
            <span>Free Trial</span>
          </div>

          <div className="user-menu">
            <div className="user-avatar">JS</div>
            <span className="user-name">Jane Smith</span>
            <ChevronDown size={16} style={{ opacity: 0.7 }} />
          </div>
        </div>

      </div>
    </header>
  );
}

export default DashboardHeader;
