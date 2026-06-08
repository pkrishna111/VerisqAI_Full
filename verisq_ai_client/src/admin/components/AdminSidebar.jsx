import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Building2,
  Bot,
  ClipboardList
} from "lucide-react";

import "../styles/AdminSidebar.css";

function AdminSidebar() {
  return (
    <aside className="adminsidebar">

      <nav className="adminsidebar-nav">

        <NavLink
          to="/admin/dashboard"
          className="adminsidebar-link"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className="adminsidebar-link"
        >
          <Users size={20} />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/vendors"
          className="adminsidebar-link"
        >
          <Building2 size={20} />
          <span>Vendors</span>
        </NavLink>

        <NavLink
          to="/admin/ai-monitoring"
          className="adminsidebar-link"
        >
          <Bot size={20} />
          <span>AI Monitoring</span>
        </NavLink>

        <NavLink
          to="/admin/audit-logs"
          className="adminsidebar-link"
        >
          <ClipboardList size={20} />
          <span>Audit Logs</span>
        </NavLink>

      </nav>

    </aside>
  );
}

export default AdminSidebar;