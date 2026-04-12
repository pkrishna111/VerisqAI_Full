import { useState } from "react";
import { Sparkles, ChevronDown } from "lucide-react";

function DashboardHeader() {
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // redirect to login
  };

  let fullName = "User";

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      fullName = payload.fullName || payload.email || "User";
    } catch {
      fullName = "User";
    }
  }

  const initials = fullName
    .split(" ")
    .map(w => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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

          <div className="user-menu" style={{ position: "relative" }}>

            <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <div className="user-avatar">{initials}</div>
              <span className="user-name">{fullName}</span>
              <ChevronDown size={16} style={{ opacity: 0.7 }} />
            </div>

            {open && (
              <div style={{
                position: "absolute",
                top: "40px",
                right: 0,
                background: "white",
                border: "1px solid #eee",
                borderRadius: "8px",
                padding: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 12px",
                    width: "100%",
                    textAlign: "left"
                  }}
                >
                  Logout
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </header>
  );
}

export default DashboardHeader;
