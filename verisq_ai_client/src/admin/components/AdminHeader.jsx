import { useState, useRef, useEffect } from "react";
import { Sparkles, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getFullName,
  getInitials
} from "../../utils/auth";

import "../styles/AdminHeader.css";

function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const navigate = useNavigate();
  const fullName = getFullName();
  const initials = getInitials();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");

    navigate("/");
  };

  return (
    <header className="adminheader">

      {/* LEFT */}

      <div className="adminheader-left">

        <div className="verisq-logo">

          <span className="logo-text">
            VERISQ
          </span>

          <span className="logo-ai">
            AI
          </span>

        </div>

        <div className="header-divider"></div>

        <div className="workspace-title">
          Admin Control Center
        </div>

      </div>

      {/* RIGHT */}

      <div className="adminheader-right">

        <button className="admin-pro-btn">

          <Sparkles size={16} />

          Admin Pro

        </button>

        <div
          className="profile-wrapper"
          ref={dropdownRef}
        >

          <div
            className="admin-profile"
            onClick={() => setIsOpen(!isOpen)}
          >

            <div className="admin-avatar">
              {initials}
            </div>

            <div className="admin-details">

              <span className="admin-name">
                {fullName}
              </span>

              <span className="admin-role">
                Super Admin
              </span>

            </div>

            <ChevronDown
              size={18}
              className={`dropdown-icon ${isOpen ? "rotate" : ""
                }`}
            />

          </div>

          {isOpen && (
            <div className="profile-dropdown">

              <div className="dropdown-user-info">

                <h4>
                  {fullName}
                </h4>

                <span>
                  Super Admin Workspace
                </span>

              </div>

              <div className="dropdown-divider"></div>

              <button
                className="dropdown-item logout-btn"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default AdminHeader;