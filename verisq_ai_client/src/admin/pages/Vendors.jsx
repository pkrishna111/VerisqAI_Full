import { useEffect, useState } from "react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import AdminLayout from "../layouts/AdminLayout";

import VendorTable from "../components/VendorTable";
import VendorDetailsModal from "../components/VendorDetailsModal";
import VendorStats from "../components/VendorStats";
import VendorsSkeleton from "../components/skeletons/VendorsSkeleton";

import {
  getVendors,
  getVendorById,
  deleteVendor,
  getVendorStats,
} from "../services/vendorApi";

import "../styles/Vendors.css";

function Vendors() {
  const [vendors, setVendors] = useState([]);

  const [filteredVendors, setFilteredVendors] = useState([]);

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedVendor, setSelectedVendor] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [riskFilter, setRiskFilter] = useState("");

  const [userFilter, setUserFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      setLoading(true);

      const startTime = Date.now();

      const vendorsData = await getVendors();

      const statsData = await getVendorStats();

      const elapsed = Date.now() - startTime;

      const minimumSkeletonTime = 1000;

      if (elapsed < minimumSkeletonTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minimumSkeletonTime - elapsed)
        );
      }

      setVendors(vendorsData);

      setFilteredVendors(vendorsData);

      setStats(statsData);
    } catch (error) {
      console.error("Vendor Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FILTERS
  // ==========================================

  const applyFilters = (
    search,
    status,
    risk,
    user
  ) => {
    let result = [...vendors];

    if (search) {
      result = result.filter(
        (vendor) =>
          vendor.name?.toLowerCase().includes(search.toLowerCase()) ||
          vendor.email?.toLowerCase().includes(search.toLowerCase()) ||
          vendor.domain?.toLowerCase().includes(search.toLowerCase()) ||
          vendor.status?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status) {
      result = result.filter((vendor) => vendor.status === status);
    }

    if (risk) {
      result = result.filter((vendor) => String(vendor.riskTier) === risk);
    }

    if (user) {
      result = result.filter(
        (vendor) =>
          vendor.ownerName === user
      );
    }

    setFilteredVendors(result);
  };

  const handleSearch = (value) => {
    setCurrentPage(1);

    setSearchQuery(value);

    applyFilters(
      value,
      statusFilter,
      riskFilter,
      userFilter
    );
  };

  const handleStatusFilter = (value) => {
    setCurrentPage(1);

    setStatusFilter(value);

    applyFilters(
      searchQuery,
      value,
      riskFilter,
      userFilter
    );
  };

  const handleRiskFilter = (value) => {
    setCurrentPage(1);

    setRiskFilter(value);

    applyFilters(
      searchQuery,
      statusFilter,
      value,
      userFilter
    );
  };

  const handleUserFilter = (
    value
  ) => {

    setCurrentPage(1);

    setUserFilter(value);

    applyFilters(
      searchQuery,
      statusFilter,
      riskFilter,
      value
    );
  };

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = () => {
    setCurrentPage(1);

    setSearchQuery("");

    setStatusFilter("");

    setRiskFilter("");

    setUserFilter("");

    loadVendors();
  };

  // ==========================================
  // EXPORT PDF
  // ==========================================

  const handleExportPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text("VerisqAI Vendor Report", 14, 20);

    doc.setFontSize(10);

    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);

    autoTable(doc, {
      startY: 35,

      head: [["Name", "Email", "Domain", "Status", "Risk Tier", "Score"]],

      body: filteredVendors.map((vendor) => [
        vendor.name || "",

        vendor.email || "",

        vendor.domain || "",

        vendor.status || "",

        vendor.riskTier || "",

        vendor.score || "",
      ]),
    });

    doc.save("VendorReport.pdf");
  };

  // ==========================================
  // VIEW VENDOR
  // ==========================================

  const handleViewVendor = async (vendorId) => {
    try {
      const vendor = await getVendorById(vendorId);

      setSelectedVendor(vendor);
    } catch (error) {
      console.error("View Vendor Error:", error);
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (vendorId) => {
    const confirmed = window.confirm("Delete this vendor?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteVendor(vendorId);

      await loadVendors();
    } catch (error) {
      console.error("Delete Vendor Error:", error);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <AdminLayout>
        <VendorsSkeleton />
      </AdminLayout>
    );
  }

  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedVendors = filteredVendors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const users = [
    ...new Set(
      vendors
        .map(v => v.ownerName)
        .filter(Boolean)
    )
  ];

  return (
    <AdminLayout>
      <div className="vendors">
        <div className="vendors-header">
          <h1>Vendor Management</h1>
        </div>

        {stats && <VendorStats stats={stats} />}

        <div className="vendors-toolbar">
          <div className="vendors-search">
            <input
              type="text"
              placeholder="Search Vendor..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <select
            className="vendors-filter"
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>

            <option value="Queued">Queued</option>

            <option value="Complete">Complete</option>
          </select>

          <select
            className="vendors-filter"
            value={userFilter}
            onChange={(e) =>
              handleUserFilter(
                e.target.value
              )
            }
          >
            <option value="">
              All Users
            </option>

            {users.map(user => (
              <option
                key={user}
                value={user}
              >
                {user}
              </option>
            ))}
          </select>

          <select
            className="vendors-filter"
            value={riskFilter}
            onChange={(e) => handleRiskFilter(e.target.value)}
          >
            <option value="">All Risk</option>

            <option value="1">Low</option>

            <option value="2">Medium</option>

            <option value="3">High</option>

            <option value="4">Critical</option>
          </select>

          <button className="vendors-refresh-btn" onClick={handleRefresh}>
            Refresh
          </button>

          <button
            className="vendors-pdf-btn"
            onClick={handleExportPdf}
            disabled={!filteredVendors.length}
          >
            Export PDF
          </button>
        </div>

        <div className="vendors-count">
          Showing {filteredVendors.length} vendor(s)
        </div>

        {filteredVendors.length > 0 ? (
          <>
            <VendorTable
              vendors={paginatedVendors}
              onViewVendor={handleViewVendor}
              onDelete={handleDelete}
              startIndex={startIndex}
            />

            {totalPages > 1 && (

              <div className="vendors-pagination">

                <button
                  onClick={() =>
                    setCurrentPage(prev => prev - 1)
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage(prev => prev + 1)
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>

              </div>

            )}
          </>
        ) : (
          <div className="vendors-empty">
            No vendors found
          </div>
        )}
        <VendorDetailsModal
          vendor={selectedVendor}
          onClose={() => setSelectedVendor(null)}
        />
      </div>
    </AdminLayout>
  );
}

export default Vendors;
