import { useEffect, useState } from "react";

import DashboardHeader from "../components/dashboard/Header";

import TemplateBuilderHero
    from "../components/template-builder/TemplateBuilderHero";

import TemplateBuilderKpis
    from "../components/template-builder/TemplateBuilderKpis";

import TemplatesTable
    from "../components/template-builder/TemplatesTable";

import { getAssessmentTemplates } from "../services/api";

import "../styles/template-builder/templateBuilder.css";

import CreateTemplateModal
    from "../components/template-builder/CreateTemplateModal";

import TemplateLibraryModal
    from "../components/template-builder/TemplateLibraryModal";

function TemplateBuilderPage() {

    const [templates, setTemplates] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [editingTemplate, setEditingTemplate] =
        useState(null);

    const [showLibraryModal,
        setShowLibraryModal] =
        useState(false);

    useEffect(() => {

        fetchTemplates();

    }, []);

    const fetchTemplates = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getAssessmentTemplates();

            setTemplates(response || []);

        } catch (err) {

            console.error(err);

            setError(
                "Failed to load assessment templates."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <>
            <DashboardHeader />

            <main className="dashboard-main">

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                    }}
                >

                    <TemplateBuilderHero
                        onCreateClick={() => {

                            if (
                                templates.length >= 5
                            ) {

                                alert(
                                    "Free Trial allows maximum 5 templates."
                                );

                                return;
                            }

                            setShowCreateModal(true);
                        }}

                        usedTemplates={
                            templates.length
                        }

                        maxTemplates={5}
                    />

                    <button
                        className="btn-add-vendor"
                        onClick={() => {

                            if (
                                templates.length >= 5
                            ) {

                                alert(
                                    "Free Trial allows maximum 5 templates."
                                );

                                return;
                            }

                            setShowLibraryModal(true);
                        }}
                    >
                        Use Ready-Made Template
                    </button>

                </div>

                <TemplateBuilderKpis
                    templates={templates}
                />

                <TemplatesTable
                    templates={templates}
                    loading={loading}
                    error={error}
                    onEditTemplate={setEditingTemplate}
                    onRefresh={fetchTemplates}
                />

                <CreateTemplateModal
                    open={
                        showCreateModal ||
                        editingTemplate !== null
                    }

                    mode={
                        editingTemplate
                            ? "edit"
                            : "create"
                    }

                    editingTemplate={
                        editingTemplate
                    }

                    onClose={() => {

                        setShowCreateModal(false);

                        setEditingTemplate(null);
                    }}

                    onCreated={fetchTemplates}
                />

                <TemplateLibraryModal
                    open={showLibraryModal}
                    onClose={() =>
                        setShowLibraryModal(false)
                    }
                    onCreated={fetchTemplates}
                />

            </main>
        </>
    );
}

export default TemplateBuilderPage;