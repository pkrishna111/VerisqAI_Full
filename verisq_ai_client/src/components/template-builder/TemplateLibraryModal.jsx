import { useEffect, useState } from "react";

import { X } from "lucide-react";

import {
    getTemplateLibrary,
    createTemplateFromLibrary
} from "../../services/api";

function TemplateLibraryModal({
    open,
    onClose,
    onCreated
}) {

    const [templates, setTemplates] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        if (!open) return;

        loadLibrary();

    }, [open]);

    const loadLibrary = async () => {

        try {

            const data =
                await getTemplateLibrary();

            setTemplates(data);

        } catch (err) {

            console.error(err);

            alert(
                "Failed to load template library."
            );
        }
    };

    const handleUseTemplate =
        async (templateKey) => {

            try {

                setLoading(true);

                await createTemplateFromLibrary(
                    templateKey
                );

                onCreated();

                onClose();

            } catch (err) {

                console.error(err);

                alert(
                    err.message ||
                    "Failed to create template."
                );

            } finally {

                setLoading(false);
            }
        };

    if (!open) return null;

    return (
        <div className="avm-overlay">

            <div className="avm-container">

                <div className="avm-header">

                    <h2 className="avm-title">
                        Ready-Made Templates
                    </h2>

                    <button
                        className="avm-close-btn"
                        onClick={onClose}
                    >
                        <X size={18} />
                    </button>

                </div>

                <div className="avm-header-divider"></div>

                <div className="avm-body">

                    {
                        templates.map(template => (

                            <div
                                key={template.key}
                                className="tb-library-card"
                            >

                                <h3>
                                    {template.name}
                                </h3>

                                <p>
                                    {template.description}
                                </p>

                                <div>
                                    {template.sectionCount}
                                    {" "}Sections
                                    {" • "}
                                    {template.questionCount}
                                    {" "}Questions
                                </div>

                                <button
                                    className="avm-submit-btn"
                                    disabled={loading}
                                    onClick={() =>
                                        handleUseTemplate(
                                            template.key
                                        )
                                    }
                                >
                                    Use Template
                                </button>

                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
    );
}

export default TemplateLibraryModal;