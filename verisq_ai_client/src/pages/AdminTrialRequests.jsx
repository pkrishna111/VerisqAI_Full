import { useEffect, useState } from "react";
import "../styles/AdminTrialRequests.css";

const API_BASE = "https://localhost:7183";

function AdminTrialRequests() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/pending-users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (email) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/approve-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      alert("User approved");

      // ✅ remove approved user from UI instantly
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.email !== email)
      );

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="AdminTrialRequests-container">
      <div className="AdminTrialRequests-card">
        <h2 className="AdminTrialRequests-title">
          Admin - Trial Requests
        </h2>

        {users.length === 0 ? (
          <p className="AdminTrialRequests-empty">
            No pending users
          </p>
        ) : (
          <table className="AdminTrialRequests-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Company</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.fullName}</td>
                  <td>{user.companyName}</td>
                  <td>
                    <span className="AdminTrialRequests-status">
                      {/* ✅ show Pending instead of 0 */}
                      {user.status === 0 ? "Pending" : "Approved"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="AdminTrialRequests-btn"
                      onClick={() => handleApprove(user.email)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminTrialRequests;