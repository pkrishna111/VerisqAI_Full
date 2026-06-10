import { Plus } from "lucide-react";

function TemplateBuilderHero({
    onCreateClick,
    onLibraryClick,
    usedTemplates,
    maxTemplates
}) {

    const isLimitReached =
        usedTemplates >= maxTemplates;

    return (
        <div className="welcome-banner">

            <div className="welcome-content">

                <h2>
                    📋 Assessment Template Builder
                </h2>

                <p>
                    Create reusable security assessment
                    questionnaires dynamically.
                </p>

            </div>

            <div className="vendor-counter">

                <div className="counter-display">

                    <div className="counter-numbers">
                        {usedTemplates} / {maxTemplates}
                    </div>

                    <div className="counter-label">
                        Templates Used
                    </div>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "12px"
                    }}
                >

                    <button
                        className="btn-secondary-template"
                        onClick={onLibraryClick}
                        disabled={isLimitReached}
                    >
                        📚 Template Library
                    </button>

                    <button
                        className="btn-add-vendor"
                        onClick={onCreateClick}
                        disabled={isLimitReached}
                    >
                        <Plus size={18} />

                        {
                            isLimitReached
                                ? "Limit Reached"
                                : "Create Template"
                        }
                    </button>

                </div>

            </div>

        </div>
    );
}

export default TemplateBuilderHero;