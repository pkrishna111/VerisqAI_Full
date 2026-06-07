import { useEffect, useState } from "react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import AdminLayout from "../layouts/AdminLayout";

import UserTable from "../components/UserTable";
import UserDetailsModal from "../components/UserDetailsModal";
import UserStats from "../components/UserStats";

import {
  getUsers,
  getUserById,
  approveUser,
  rejectUser,
  deleteUser,
  getUserStats
} from "../services/userApi";

import "../styles/Users.css";

function Users() {

  const [users, setUsers] =
    useState([]);

  const [filteredUsers,
    setFilteredUsers] =
    useState([]);

  const [stats, setStats] =
    useState(null);

  const [selectedUser,
    setSelectedUser] =
    useState(null);

  const [notification,
    setNotification] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const [searchQuery,
    setSearchQuery] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("");

  const [currentPage,
    setCurrentPage] =
    useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    loadUsers();
  }, []);

  const showNotification = (
    message,
    type = "success"
  ) => {

    setNotification({
      message,
      type
    });

    setTimeout(() => {

      setNotification(
        null
      );

    }, 3000);
  };

  const loadUsers = async () => {

    try {

      setLoading(true);

      const usersData =
        await getUsers();

      const statsData =
        await getUserStats();

      setUsers(
        usersData
      );

      setFilteredUsers(
        usersData
      );

      setStats(
        statsData
      );

    }
    catch (error) {

      console.error(error);

      showNotification(
        "Failed to load users",
        "error"
      );

    }
    finally {

      setLoading(false);

    }
  };

  // ==========================
  // SEARCH + FILTER
  // ==========================

  const applyFilters = (
    search,
    status
  ) => {

    let result =
      [...users];

    if (search) {

      result =
        result.filter(
          user =>

            user.fullName
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

            ||

            user.email
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

            ||

            user.companyName
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );
    }

    if (status) {

      result =
        result.filter(
          user =>
            String(
              user.status
            ) === status
        );
    }

    setCurrentPage(1);

    setFilteredUsers(
      result
    );
  };

  const handleSearch =
    (value) => {

      setSearchQuery(
        value
      );

      applyFilters(
        value,
        statusFilter
      );
    };

  const handleStatusFilter =
    (value) => {

      setStatusFilter(
        value
      );

      applyFilters(
        searchQuery,
        value
      );
    };

  // ==========================
  // REFRESH
  // ==========================

  const handleRefresh =
    () => {

      setSearchQuery("");

      setStatusFilter("");

      loadUsers();

      // showNotification(
      //   "Users refreshed"
      // );
    };

  // ==========================
  // PDF EXPORT
  // ==========================

  const handleExportPdf =
    () => {

      const doc =
        new jsPDF();

      doc.setFontSize(18);

      doc.text(
        "Users Report",
        14,
        20
      );

      autoTable(doc, {

        startY: 30,

        head: [[
          "Name",
          "Email",
          "Company",
          "Status"
        ]],

        body:
          filteredUsers.map(
            user => [

              user.fullName,

              user.email,

              user.companyName,

              user.status
            ]
          )
      });

      doc.save(
        "UsersReport.pdf"
      );
    };

  // ==========================
  // VIEW USER
  // ==========================

  const handleViewUser =
    async (userId) => {

      try {

        const user =
          await getUserById(
            userId
          );

        setSelectedUser(
          user
        );

      }
      catch {

        showNotification(
          "Failed to load user details",
          "error"
        );

      }
    };

  // ==========================
  // APPROVE USER
  // ==========================

  const handleApprove =
    async (userId) => {

      try {

        await approveUser(
          userId
        );

        showNotification(
          "User approved successfully"
        );

        loadUsers();

      }
      catch {

        showNotification(
          "Failed to approve user",
          "error"
        );

      }
    };

  // ==========================
  // REJECT USER
  // ==========================

  const handleReject =
    async (userId) => {

      try {

        await rejectUser(
          userId
        );

        showNotification(
          "User rejected successfully"
        );

        loadUsers();

      }
      catch {

        showNotification(
          "Failed to reject user",
          "error"
        );

      }
    };

  // ==========================
  // DELETE USER
  // ==========================

  const handleDelete =
    async (userId) => {

      const confirmed =
        window.confirm(
          "Delete this user?"
        );

      if (!confirmed)
        return;

      try {

        await deleteUser(
          userId
        );

        showNotification(
          "User deleted successfully"
        );

        loadUsers();

      }
      catch {

        showNotification(
          "Failed to delete user",
          "error"
        );

      }
    };

  // ==========================
  // PAGINATION
  // ==========================

  const totalPages =
    Math.ceil(
      filteredUsers.length /
      itemsPerPage
    );

  const paginatedUsers =
    filteredUsers.slice(
      (currentPage - 1)
      * itemsPerPage,

      currentPage
      * itemsPerPage
    );

  return (

    <AdminLayout>

      <div className="users">

        <div className="users-header">

          <h1>
            User Management
          </h1>

        </div>

        {notification && (

          <div
            className={`users-notification ${notification.type}`}
          >
            {notification.message}
          </div>

        )}

        {stats && (

          <UserStats
            stats={stats}
          />

        )}

        <div className="users-toolbar">

          <input
            type="text"
            placeholder="Search User..."
            value={searchQuery}
            onChange={(e) =>
              handleSearch(
                e.target.value
              )
            }
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              handleStatusFilter(
                e.target.value
              )
            }
          >
            <option value="">
              All Users
            </option>

            <option value="0">
              Pending
            </option>

            <option value="1">
              Approved
            </option>

            <option value="2">
              Rejected
            </option>

          </select>

          <button
            className="users-refresh-btn"
            onClick={
              handleRefresh
            }
          >
            Refresh
          </button>

          <button
            className="users-pdf-btn"
            onClick={
              handleExportPdf
            }
          >
            Export PDF
          </button>

        </div>

        <div className="users-count">

          Showing
          {" "}
          {filteredUsers.length}
          {" "}
          user(s)

        </div>

        <UserTable
          users={
            paginatedUsers
          }
          onViewUser={
            handleViewUser
          }
          onApprove={
            handleApprove
          }
          onReject={
            handleReject
          }
          onDelete={
            handleDelete
          }
        />

        {totalPages > 1 && (

          <div className="users-pagination">

            <button
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  prev =>
                    prev - 1
                )
              }
            >
              Previous
            </button>

            <span>
              Page {currentPage}
              {" "}of{" "}
              {totalPages}
            </span>

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  prev =>
                    prev + 1
                )
              }
            >
              Next
            </button>

          </div>

        )}

        <UserDetailsModal
          user={
            selectedUser
          }
          onClose={() =>
            setSelectedUser(
              null
            )
          }
        />

      </div>

    </AdminLayout>

  );
}

export default Users;