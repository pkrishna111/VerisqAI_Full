import "./AdminLayout.css";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />

      <div className="adminlayout">

        <AdminSidebar />

        <main className="adminlayout-content">
          {children}
        </main>

      </div>
    </>
  );
}

export default AdminLayout;