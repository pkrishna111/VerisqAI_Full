import "../styles/UserTable.css";

function UserTable({
  users = [],
  onViewUser,
  onApprove,
  onReject,
  onDelete
}) {

  const getStatusClass = (
    status
  ) => {

    switch (status) {

      case 0:
        return "pending";

      case 1:
        return "approved";

      case 2:
        return "rejected";

      default:
        return "";
    }

  };

  const getStatusText = (
    status
  ) => {

    switch (status) {

      case 0:
        return "Pending";

      case 1:
        return "Approved";

      case 2:
        return "Rejected";

      default:
        return "Unknown";
    }

  };

  return (

    <div className="usertable-container">

      <table className="usertable">

        <thead>

          <tr>

            <th>#</th>

            <th>Name</th>

            <th>Email</th>

            <th>Company</th>

            <th>Phone</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {users.length === 0 ? (

            <tr>

              <td
                colSpan="7"
                className="usertable-empty"
              >
                No users found
              </td>

            </tr>

          ) : (

            users.map(
              (
                user,
                index
              ) => (

                <tr key={user.id}>

                  <td>
                    {index + 1}
                  </td>

                  <td>

                    <span
                      className="usertable-name"
                      onClick={() =>
                        onViewUser(
                          user.id
                        )
                      }
                    >
                      {user.fullName}
                    </span>

                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>
                    {user.companyName || "-"}
                  </td>

                  <td>
                    {user.mobilePhone || "-"}
                  </td>

                  <td>

                    <span
                      className={`user-status ${getStatusClass(
                        user.status
                      )}`}
                    >
                      {getStatusText(
                        user.status
                      )}
                    </span>

                  </td>

                  <td>

                    <div className="usertable-actions">

                      <button
                        className="usertable-view-btn"
                        title="View User"
                        onClick={() =>
                          onViewUser(
                            user.id
                          )
                        }
                      >
                        View
                      </button>

                      {user.status !== 1 && (

                        <button
                          className="usertable-approve-btn"
                          title="Approve User"
                          onClick={() =>
                            onApprove(
                              user.id
                            )
                          }
                        >
                          Approve
                        </button>

                      )}

                      {user.status !== 2 && (

                        <button
                          className="usertable-reject-btn"
                          title="Reject User"
                          onClick={() =>
                            onReject(
                              user.id
                            )
                          }
                        >
                          Reject
                        </button>

                      )}

                      <button
                        className="usertable-delete-btn"
                        title="Delete User"
                        onClick={() =>
                          onDelete(
                            user.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              )
            )

          )}

        </tbody>

      </table>

    </div>

  );

}

export default UserTable;