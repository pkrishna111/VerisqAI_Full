import { Plus } from "lucide-react";

function TemplateBuilderHero({
    onCreateClick
}) {

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

            <button
                className="btn-add-vendor"
                onClick={onCreateClick}
            >
                <Plus size={18} />
                Create Template
            </button>

        </div>
    );
}

export default TemplateBuilderHero;