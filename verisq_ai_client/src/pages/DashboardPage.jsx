import { useState } from "react";
import DashboardHeader from "../components/dashboard/Header";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import "../styles/dashboardStyle.css"
import KpiGrid from "../components/dashboard/KpiGrid";
import Insights from "../components/dashboard/Insights";
import VendorTable from "../components/dashboard/VendorTable";
import BottomCards from "../components/dashboard/BottomCards";
import AddVendorModal from "../components/dashboard/AddVendorModal";
import FindingsModal from "../components/dashboard/FindingsModal";
import EmailModal from "../components/dashboard/EmailModal";
import { useEffect } from "react";
import { apiRequest } from "../services/api";

function DashboardPage() {
  const [usedVendors, setUsedVendors] = useState(0);
  const [vendors, setVendors] = useState([]);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [findingsData, setFindingsData] = useState([]);
  const [isFindingsOpen, setIsFindingsOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pendingVendorData, setPendingVendorData] = useState(null);
  const maxVendors = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);

  //to handle token
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const vendorRes = await apiRequest("/api/dashboard/vendors");
      setVendors(vendorRes);
      setUsedVendors(vendorRes.length);

      const statsRes = await apiRequest("/api/dashboard/stats");
      setStats(statsRes);

    } catch (err) {
      console.error("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  //to prevent back navigation by user 
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // ✅ Close modal
  const handleCloseModal = async (refresh = false) => {
    setIsModalOpen(false);

    if (refresh) {
      try {
        const res = await apiRequest("/api/dashboard/vendors");
        setVendors(res);
        setUsedVendors(res.length);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // ✅ Open modal (instead of prompt)
  const handleAddVendor = () => {
    setIsModalOpen(true);
  };

  const handleViewFindings = async (vendorId) => {
    try {
      const data = await apiRequest(`/api/dashboard/vendor/${vendorId}/findings`);
      setFindingsData(data);
      setIsFindingsOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DashboardHeader />

      <main className="dashboard-main">
        <WelcomeBanner
          usedVendors={usedVendors}
          maxVendors={maxVendors}
          onAddVendor={handleAddVendor}
        />
        <Insights
          vendors={vendors}
          onViewFindings={handleViewFindings}
        />
        <KpiGrid stats={stats} />
        <VendorTable
          vendors={vendors}
          onSendSuccess={(vendorId) => {
            setVendors((prev) =>
              prev.map((v) =>
                v.id === vendorId
                  ? { ...v, questionnaire: "Pending" }
                  : v
              )
            );
          }}
          onViewFindings={handleViewFindings}
          onSendClick={(vendorId) => {
            setSelectedVendorId(vendorId);
            setIsEmailOpen(true);
          }}
          onRefresh={fetchDashboardData}
          loading={loading}
        />

        <BottomCards stats={stats} />
      </main>

      <AddVendorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onRequireEmail={(data) => {
          setPendingVendorData(data);
          setIsModalOpen(false);
          setIsEmailOpen(true);
        }}
      />

      <FindingsModal
        isOpen={isFindingsOpen}
        onClose={() => setIsFindingsOpen(false)}
        findings={findingsData}
      />

      <EmailModal
        isOpen={isEmailOpen}
        onClose={() => setIsEmailOpen(false)}
        onSubmit={async (email) => {
          try {
            // 🔥 CASE 1: From Add Vendor
            if (pendingVendorData) {
              await apiRequest(
                "/api/dashboard/add-vendor",
                "POST",
                {
                  ...pendingVendorData,
                  email: email
                }
              );

              setPendingVendorData(null);

              const res = await apiRequest("/api/dashboard/vendors");
              setVendors(res);
              setUsedVendors(res.length);
            }
            // 🔥 CASE 2: From Send Button
            else {
              await apiRequest(
                `/api/dashboard/send-questionnaire/${selectedVendorId}`,
                "POST",
                { email }
              );

              setVendors((prev) =>
                prev.map((v) =>
                  v.id === selectedVendorId
                    ? { ...v, questionnaire: "Pending" }
                    : v
                )
              );
            }

            setIsEmailOpen(false);

          } catch (err) {
            console.error(err.message);
          }
        }}
      />
    </>
  );
}

export default DashboardPage;
