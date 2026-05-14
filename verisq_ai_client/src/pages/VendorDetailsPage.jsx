import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardHeader from "../components/dashboard/Header";

import VendorDetailsSkeleton from "../components/vendor-details/VendorDetailsSkeleton";
import VendorHeader from "../components/vendor-details/VendorHeader";
import AssessmentCards from "../components/vendor-details/AssessmentCards";
import FindingsWorkspace from "../components/vendor-details/FindingsWorkspace";
import AnalyticsSection from "../components/vendor-details/AnalyticsSection";
import ResponsesTable from "../components/vendor-details/ResponsesTable";

import { apiRequest } from "../services/api";

export default function VendorDetailsPage() {
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchVendor();
    }, [id]);

    const fetchVendor = async () => {
        try {
            setLoading(true);

            const startTime = Date.now();

            const response = await apiRequest(
                `/api/dashboard/vendor/${id}`
            );

            // minimum skeleton duration
            const elapsed = Date.now() - startTime;

            const minimumLoadTime = 900;

            if (elapsed < minimumLoadTime) {
                await new Promise((resolve) =>
                    setTimeout(
                        resolve,
                        minimumLoadTime - elapsed
                    )
                );
            }

            setData(response);
        }
        catch (err) {
            console.error(err);

            setError(
                err.message || "Failed to load vendor details"
            );
        }
        finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <DashboardHeader />

                <main className="dashboard-main">
                    <VendorDetailsSkeleton />
                </main>
            </>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>No vendor data found.</div>;
    }

    return (
        <>
            <DashboardHeader />

            <main className="dashboard-main">

                <VendorHeader
                    vendor={data.vendor}
                    scorecard={data.assessment?.scorecard}
                />

                <AssessmentCards
                    scorecard={data.assessment?.scorecard}
                    findings={data.assessment?.findings}
                    questionnaire={data.assessment?.questionnaire}
                />

                <AnalyticsSection
                    findings={data.assessment?.findings}
                    scorecard={data.assessment?.scorecard}
                />

                <FindingsWorkspace
                    findings={data.assessment?.findings}
                />

                <ResponsesTable
                    responses={data.assessment?.responses}
                />

            </main>
        </>
    );
}