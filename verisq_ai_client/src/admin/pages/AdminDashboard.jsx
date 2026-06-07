import { useEffect, useState } from "react";

import "../styles/AdminDashboard.css";

import StatCard from "../components/StatCard";

import { getDashboard } from "../services/adminApi";

import AdminLayout from "../layouts/AdminLayout";

import DashboardOverview from "../components/DashboardOverview";

import UserGrowthChart from "../components/UserGrowthChart";

import DashboardCharts from "../components/DashboardCharts";

import VendorRiskChart from "../components/VendorRiskChart";

import RecentActivity from "../components/RecentActivity";

function AdminDashboard() {
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const data = await getDashboard();

            setDashboard(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!dashboard) {
        return (
            <div className="admindashboard-loading">
                Loading Dashboard...
            </div>
        );
    }

    return (
        <AdminLayout>

            <div className="admindashboard">

                <div className="admindashboard-header">
                    <div>
                        <h1 className="admindashboard-title">
                            Admin Dashboard
                        </h1>

                        <p className="admindashboard-subtitle">
                            Overview of platform activity
                        </p>
                    </div>
                </div>

                <div className="admindashboard-stats-grid">

                    <StatCard title="Total Users" value={dashboard.totalUsers} />
                    <StatCard title="Approved Users" value={dashboard.approvedUsers} />
                    <StatCard title="Pending Users" value={dashboard.pendingUsers} />
                    <StatCard title="Total Vendors" value={dashboard.totalVendors} />
                    <StatCard title="Questionnaires" value={dashboard.totalQuestionnaires} />
                    <StatCard title="Completed Questionnaires" value={dashboard.completedQuestionnaires} />
                    <StatCard title="Scorecards" value={dashboard.totalScorecards} />
                    <StatCard title="Critical Findings" value={dashboard.criticalFindings} />

                </div>

                <DashboardOverview />

                <DashboardCharts />

                {/* <RecentActivity /> */}

            </div>

        </AdminLayout>
    );
}

export default AdminDashboard;