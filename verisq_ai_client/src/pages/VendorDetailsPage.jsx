import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardHeader from "../components/dashboard/Header";

import VendorDetailsSkeleton from "../components/vendor-details/VendorDetailsSkeleton";
import VendorHeader from "../components/vendor-details/VendorHeader";
import AssessmentCards from "../components/vendor-details/AssessmentCards";
import AssessmentTimeline from "../components/vendor-details/AssessmentTimeline";
import AssessmentIntelligenceTabs from "../components/vendor-details/AssessmentIntelligenceTabs";

import { apiRequest, getAssessmentDetails } from "../services/api";
import API_BASE_URL from "../services/api";

export default function VendorDetailsPage() {
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [selectedAssessment, setSelectedAssessment] =
        useState(null);
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
            setSelectedAssessment(response.assessment);
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

    const questionnaire =
        selectedAssessment?.questionnaire;

    const scorecard =
        selectedAssessment?.scorecard;

    const findings =
        selectedAssessment?.findings || [];

    const responses =
        selectedAssessment?.responses || [];

    const handleAssessmentSelect =
        async (historyItem) => {

            try {

                const assessmentDetails =
                    await getAssessmentDetails(
                        historyItem.scorecardId
                    );

                setSelectedAssessment(
                    assessmentDetails
                );

            } catch (error) {

                console.error(
                    "Failed to load assessment:",
                    error
                );
            }
        };

    const handleRefresh = async () => {
        await fetchVendor();
    };

    const handleSendQuestionnaire =
        async () => {

            try {

                await apiRequest(
                    `/api/dashboard/send-questionnaire/${data.vendor.id}`,
                    "POST",
                    {
                        email: data.vendor.email
                    }
                );

                await fetchVendor();

            }
            catch (err) {

                console.error(
                    "Failed to send questionnaire",
                    err
                );

                alert(
                    "Failed to send questionnaire."
                );
            }
        };

    const handleDownloadReport = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const res = await fetch(
                `${API_BASE_URL}/api/dashboard/download-report/${data.vendor.id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            if (!res.ok) {

                const text =
                    await res.text();

                throw new Error(text);
            }

            const blob =
                await res.blob();

            const url =
                window.URL.createObjectURL(blob);

            const a =
                document.createElement("a");

            a.href = url;

            a.download =
                `${data.vendor.name}_report.pdf`;

            document.body.appendChild(a);

            a.click();

            a.remove();

        }
        catch (err) {

            console.error(
                "Failed to download report",
                err
            );

            alert(
                "Failed to download report."
            );
        }
    };

    const canSendQuestionnaire =
        questionnaire?.status === "Completed";

    return (
        <>
            <DashboardHeader />

            <main className="dashboard-main">

                <VendorHeader
                    vendor={data.vendor}
                    scorecard={scorecard}

                    onRefresh={handleRefresh}

                    canSendQuestionnaire={
                        canSendQuestionnaire
                    }

                    onSendQuestionnaire={
                        handleSendQuestionnaire
                    }

                    onDownloadReport={
                        handleDownloadReport
                    }
                />

                <div className="vd-details-layout">

                    <div className="vd-details-layout__sidebar">
                        <AssessmentTimeline
                            assessments={data.assessments}
                            selectedAssessment={selectedAssessment}
                            onSelectAssessment={
                                handleAssessmentSelect
                            }
                        />
                    </div>

                    <div className="vd-details-layout__content">

                        <AssessmentCards
                            scorecard={scorecard}
                            findings={findings}
                            questionnaire={questionnaire}
                        />

                        <AssessmentIntelligenceTabs
                            scorecard={scorecard}
                            findings={findings}
                            responses={responses}
                        />

                    </div>
                </div>



            </main>
        </>
    );
}