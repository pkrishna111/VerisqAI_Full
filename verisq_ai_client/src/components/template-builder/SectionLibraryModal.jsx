import { useEffect, useState } from "react";

import { X } from "lucide-react";

import {
    getSectionLibrary,
    createSectionFromLibrary
} from "../../services/api";

function SectionLibraryModal({
    open,
    onClose,
    templateId,
    onCreated
}) {

    const [sections, setSections] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        if (!open) return;

        loadSections();

    }, [open]);

    const loadSections = async () => {

        try {

            const data =
                await getSectionLibrary();

            setSections(data);

        } catch (err) {

            console.error(err);

            alert(
                "Failed to load section library."
            );
        }
    };

    const handleAddSection =
        async (sectionKey) => {

            try {

                setLoading(true);

                await createSectionFromLibrary(
                    sectionKey,
                    templateId
                );

                onCreated();

                onClose();

            } catch (err) {

                console.error(err);

                alert(
                    err.message ||
                    "Failed to add section."
                );

            } finally {

                setLoading(false);
            }
        };

    if (!open) return null;

    return (
        <div className="avm-overlay">

            <div
                className="avm-container section-library-modal"
            >

                <div className="avm-header">

                    <h2 className="avm-title">
                        Ready-Made Sections
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

                    <div
                        className="section-library-grid"
                    >

                        {
                            sections.map(section => (

                                <div
                                    key={section.key}
                                    className="section-library-card"
                                >

                                    <div
                                        className="section-library-top"
                                    >

                                        <div>

                                            <h3>
                                                {
                                                    section.title
                                                }
                                            </h3>

                                            <p>
                                                {
                                                    section.description
                                                }
                                            </p>

                                        </div>

                                        <span
                                            className="section-library-badge"
                                        >
                                            {
                                                section.category
                                            }
                                        </span>

                                    </div>

                                    <div
                                        className="section-library-meta"
                                    >

                                        <span>
                                            ❓
                                            {
                                                section.questionCount
                                            }
                                            {" "}
                                            Questions
                                        </span>

                                    </div>

                                    <button
                                        className="section-library-btn"
                                        disabled={loading}
                                        onClick={() =>
                                            handleAddSection(
                                                section.key
                                            )
                                        }
                                    >
                                        Add Section
                                    </button>

                                </div>

                            ))
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default SectionLibraryModal;