import { NavLink } from "react-router-dom";
import "../styles/AdminSidebar.css";

function AdminSidebar() {
  return (
    <aside className="adminsidebar">

      <div className="adminsidebar-logo">
        <h2>VerisqAI</h2>
        <span>Admin Portal</span>
      </div>

      <nav className="adminsidebar-nav">

        <NavLink
          to="/admin/dashboard"
          className="adminsidebar-link"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className="adminsidebar-link"
        >
          Users
        </NavLink>

        <NavLink
          to="/admin/vendors"
          className="adminsidebar-link"
        >
          Vendors
        </NavLink>

        {/* <NavLink
          to="/admin/assessments"
          className="adminsidebar-link"
        >
          Assessments
        </NavLink> */}

        <NavLink
          to="/admin/ai-monitoring"
          className="adminsidebar-link"
        >
          AI Monitoring
        </NavLink>

        <NavLink
          to="/admin/audit-logs"
          className="adminsidebar-link"
        >
          Audit Logs
        </NavLink>

        {/* <NavLink
          to="/admin/settings"
          className="adminsidebar-link"
        >
          Settings
        </NavLink> */}

      </nav>

    </aside>
  );
}

export default AdminSidebar;