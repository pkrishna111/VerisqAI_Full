import { useEffect, useState } from "react";

const API_BASE = "https://localhost:7183";

function AdminTrialRequests() {
  const [users, setUsers] = useState([]);

  // fetch pending users
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

  // approve user
  const handleApprove = async (email) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/approve-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(email)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      alert("User approved");

      // refresh list
      fetchUsers();

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Admin - Trial Requests</h2>

      {users.length === 0 ? (
        <p>No pending users</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
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
                <td>{user.status}</td>
                <td>
                  <button onClick={() => handleApprove(user.email)}>
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminTrialRequests;