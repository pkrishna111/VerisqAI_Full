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
  const [usedVendors, setUsedVendors] = useState(0);
  const [vendors, setVendors] = useState([]);
  const maxVendors = 5;

  //to handle token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const res = await apiRequest("/api/dashboard/vendors");

        setVendors(res);
        setUsedVendors(res.length);

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


  const handleAddVendor = async () => {
    const name = prompt("Enter Vendor Name:");
    if (!name) return;

    const domain = prompt("Enter Vendor Domain:");
    if (!domain) return;

    try {
      await apiRequest("/api/dashboard/add-vendor", "POST", {
        name,
        domain
      });

      // refresh vendors
      const res = await apiRequest("/api/dashboard/vendors");
      setVendors(res);
      setUsedVendors(res.length);

    } catch (err) {
      alert(err.message);
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
        <Insights />
        <KpiGrid />
        <VendorTable vendors={vendors} />

        <BottomCards />
      </main>


    </>
  );
}

export default DashboardPage;
