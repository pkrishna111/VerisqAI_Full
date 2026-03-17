function Header() {
  return (
    <header className="landing-header">
      <div className="landing-header-content">
        {/* Left: Logo */}
        <a href="#" className="landing-logo">
          <span className="landing-logo-text">VERISQ</span>
          <span className="landing-logo-badge">AI</span>
        </a>

        {/* Right: Navigation */}
        <nav className="landing-header-nav">
          <a href="#" className="nav-link">How It Works</a>
          <a href="#" className="nav-link">LiveThreat Scorecards</a>
          <a href="#" className="nav-link">Auto Questionnaires</a>
          <a href="#" className="nav-link">Risk Tiering</a>
          <a href="#" className="nav-link">Breach Alerts</a>
          <a href="#form" className="landing-btn-header">Start Free Trial</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
