import "../styles/AdminHeader.css";

function AdminHeader() {
  return (
    <header className="adminheader">

      <div className="adminheader-left">
        <h2>Dashboard</h2>
      </div>

      <div className="adminheader-right">

        <div className="adminheader-search">
          <input
            type="text"
            placeholder="Search..."
          />
        </div>

        <div className="adminheader-profile">
          Admin
        </div>

      </div>

    </header>
  );
}

export default AdminHeader;