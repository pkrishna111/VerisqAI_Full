import {
  useEffect,
  useRef,
  useState
} from "react";
import { Sparkles, ChevronDown } from "lucide-react";

function DashboardHeader() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

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
          <div className="trial-badge"> <Sparkles size={16} /> <span>Free Trial</span> </div>
          <div
            className="user-menu"
            ref={dropdownRef}
          >
            <div
              className="user-menu-trigger"
              onClick={() => setOpen(!open)}
            >

              <div className="user-avatar">
                {initials}
              </div>

              <div className="user-meta">

                <span className="user-name">
                  {fullName}
                </span>

                <span className="user-role">
                  Trial Workspace
                </span>

              </div>

              <ChevronDown
                size={16}
                style={{
                  opacity: 0.7,
                  transition: "transform 0.2s ease",
                  transform: open
                    ? "rotate(180deg)"
                    : "rotate(0deg)"
                }}
              />

            </div>

            {open && (

              <div className="user-dropdown">

                <div className="user-dropdown__header">

                  <div className="user-dropdown__name">
                    {fullName}
                  </div>

                  <div className="user-dropdown__email">
                    Trial Workspace
                  </div>

                </div>

                <div className="user-dropdown__menu">

                  <button
                    className="user-dropdown__item"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </header>
  );
}

export default DashboardHeader;
