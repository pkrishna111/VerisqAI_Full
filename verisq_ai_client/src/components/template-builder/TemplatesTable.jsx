import { ClipboardList } from "lucide-react";

import { useNavigate } from "react-router-dom";

function TemplatesTable({
    templates,
    loading,
    error
}) {

    const navigate = useNavigate();

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
                                    className="tb-clickable-row"
                                    onClick={() =>
                                        navigate(
                                            `/templates/${template.id}`
                                        )
                                    }
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
                                        {template.version || "v1"}
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
                                                    : "Inactive"
                                            }
                                        </span>

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