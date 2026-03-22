import { useState } from "react";
import DashboardHeader from "../components/dashboard/Header";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import "../styles/dashboardStyle.css"
import KpiGrid from "../components/dashboard/KpiGrid";
import Insights from "../components/dashboard/Insights";
import VendorTable from "../components/dashboard/VendorTable";
import BottomCards from "../components/dashboard/BottomCards";
import { useEffect } from "react";
import { apiRequest } from "../services/api";

function DashboardPage() {
  const [usedVendors, setUsedVendors] = useState(2);
  const maxVendors = 5;

  //to handle token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const res = await apiRequest("/api/dashboard/vendors");
      } catch (err) {
        console.error("ERROR:", err);
      }
    };
    fetchData();
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


  const handleAddVendor = () => {
    // modal will come later
    console.log("Add Vendor clicked");
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
        <Insights />
        <KpiGrid />
        <VendorTable />

        <BottomCards />
      </main>


    </>
  );
}

export default DashboardPage;
