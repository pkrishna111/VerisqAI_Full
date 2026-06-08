import {
    ClipboardList,
    Copy,
    Pencil,
    Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
    duplicateAssessmentTemplate,
    deleteAssessmentTemplate
} from "../../services/api";

function TemplatesTable({
    templates,
    loading,
    error,
    onEditTemplate,
    onRefresh
}) {

    const navigate = useNavigate();

    const handleDuplicateTemplate =
        async (e, templateId) => {

            e.stopPropagation();

            try {

                await duplicateAssessmentTemplate(
                    templateId
                );

                onRefresh();

            } catch (err) {

                console.error(err);

                alert(
                    "Failed to duplicate template."
                );
            }
        };

    return (
        <div className="table-card">

            <div className="table-header">

                <div>

                    <h3 className="table-title">
                        Assessment Templates
                    </h3>

                    <p className="table-subtitle">
                        Manage reusable assessment
                        questionnaire templates
                    </p>

                </div>

            </div>

            {loading ? (

                <div className="tb-empty-state">
                    Loading templates...
                </div>

            ) : error ? (

                <div className="tb-empty-state tb-error">
                    {error}
                </div>

            ) : templates.length === 0 ? (

                <div className="tb-empty-state">
                    No templates created yet.
                </div>

            ) : (

                <table className="vendor-table">

                    <thead>
                        <tr>
                            <th>Template</th>
                            <th>Version</th>
                            <th>Sections</th>
                            <th>Questions</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {templates.map((template) => {

                            const sectionCount =
                                template.sections?.length || 0;

                            const questionCount =
                                (
                                    template.sections || []
                                ).reduce(
                                    (acc, section) =>
                                        acc +
                                        (
                                            section.questions?.length || 0
                                        ),
                                    0
                                );

                            return (
                                <tr
                                    key={template.id}
                                    className={
                                        template.isActive
                                            ? "tb-clickable-row"
                                            : "tb-clickable-row tb-template-inactive"
                                    }
                                    onClick={() => {

                                        if (!template.isActive) {
                                            alert(
                                                "This template is inactive. Create a copy to continue using it."
                                            );

                                            return;
                                        }

                                        navigate(
                                            `/templates/${template.id}`
                                        );
                                    }}
                                >

                                    <td>

                                        <div className="vendor-cell">

                                            <div className="vendor-avatar blue">
                                                <ClipboardList size={18} />
                                            </div>

                                            <div className="vendor-info">

                                                <div className="vendor-name-text">
                                                    {template.name}
                                                </div>

                                                <div className="vendor-domain">
                                                    {
                                                        template.description ||
                                                        "No description"
                                                    }
                                                </div>

                                            </div>

                                        </div>

                                    </td>

                                    <td>
                                        Version {template.version || 1}
                                    </td>

                                    <td>
                                        {sectionCount}
                                    </td>

                                    <td>
                                        {questionCount}
                                    </td>

                                    <td>

                                        <span
                                            className={
                                                template.isActive
                                                    ? "status-badge status-complete"
                                                    : "status-badge status-failed"
                                            }
                                        >
                                            {
                                                template.isActive
                                                    ? "Active"
                                                    : "Archived"
                                            }
                                        </span>

                                    </td>

                                    <td>

                                        <div className="tb-template-actions">

                                            <button
                                                className="tb-template-action-btn"
                                                title="Copy Template"
                                                onClick={(e) =>
                                                    handleDuplicateTemplate(
                                                        e,
                                                        template.id
                                                    )
                                                }
                                            >
                                                <Copy size={15} />
                                            </button>

                                            {template.isActive && (
                                                <button
                                                    className="tb-template-action-btn"
                                                    title="Edit Template"
                                                    onClick={(e) => {

                                                        e.stopPropagation();

                                                        onEditTemplate(template);
                                                    }}
                                                >
                                                    <Pencil size={15} />
                                                </button>
                                            )}

                                            {template.isActive && (
                                                <button
                                                    className="tb-template-action-btn danger"
                                                    title="Delete Template"
                                                    onClick={async (e) => {

                                                        e.stopPropagation();

                                                        if (
                                                            !window.confirm(
                                                                "If this template has assessment history it will be deactivated instead of deleted.\n\nContinue?"
                                                            )
                                                        ) {
                                                            return;
                                                        }

                                                        try {

                                                            await deleteAssessmentTemplate(
                                                                template.id
                                                            );

                                                            window.location.reload();

                                                        } catch (err) {

                                                            console.error(err);

                                                            alert(
                                                                "Failed to delete template."
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            )}
                                        </div>

                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>

                </table>

            )}

        </div>
    );
}

export default TemplatesTable;