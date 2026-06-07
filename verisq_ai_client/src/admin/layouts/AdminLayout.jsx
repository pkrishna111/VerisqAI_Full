import "./AdminLayout.css";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

function AdminLayout({ children }) {
  return (
    <div className="adminlayout">

      <AdminSidebar />

      <div className="adminlayout-content">

        <AdminHeader />

        {children}

      </div>

    </div>
  );
}

export default AdminLayout;