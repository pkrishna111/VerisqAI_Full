import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="landing-header">
      <div className="landing-header-content">

        {/* Logo */}
        <Link to="/" className="landing-logo">
          <span className="landing-logo-text">VERISQ</span>
          <span className="landing-logo-badge">AI</span>
        </Link>

        {/* Navigation */}
        <nav className="landing-header-nav">
          <Link to="/how-it-works" className="nav-link">How It Works</Link>
          <Link to="/Scorecard" className="nav-link">LiveThreat Scorecards</Link>
          <Link to="/Questionnaires" className="nav-link">Auto Questionnaires</Link>
          <Link to="/RiskTiering" className="nav-link">Risk Tiering</Link>
          <Link to="/Breachalerts" className="nav-link">Breach Alerts</Link>
          <Link to="/how-it-works" className="landing-btn-header">
            Start Free Trial
          </Link>
        </nav>

      </div>
    </header>
  );
}

export default Header;