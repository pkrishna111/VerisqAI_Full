import {
    useEffect,
    useState
} from "react";

import { X, Plus } from "lucide-react";

import {
    createAssessmentSection,
    updateAssessmentSection
} from "../../services/api";

function CreateSectionModal({
    open,
    onClose,
    templateId,
    onCreated,
    existingSections = [],
    mode = "create",
    editingSection = null
}) {

    const [loading, setLoading] =
        useState(false);

    const defaultFormState = {
        title: "",
        description: ""
    };

    const [formData, setFormData] =
        useState(defaultFormState);

    useEffect(() => {

        if (
            mode === "edit" &&
            editingSection
        ) {

            setFormData({
                title:
                    editingSection.title || "",

                description:
                    editingSection.description || ""
            });

        } else {

            setFormData(defaultFormState);
        }

    }, [
        mode,
        editingSection,
        open
    ]);

    if (!open) return null;

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {

        if (!formData.title.trim()) {
            return;
        }

        try {

            setLoading(true);

            const payload = {
                templateId:
                    Number(templateId),

                title:
                    formData.title,

                description:
                    formData.description,

                displayOrder:
                    existingSections.length + 1
            };

            if (mode === "edit") {

                await updateAssessmentSection(
                    editingSection.id,
                    payload
                );

            } else {

                await createAssessmentSection(
                    payload
                );
            }

            onCreated();

            onClose();

            setFormData({
                title: "",
                description: "",
                displayOrder: 1
            });

        } catch (err) {

            console.error(err);

            alert(
                "Failed to create section."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="avm-overlay">

            <div className="avm-container">

                {/* HEADER */}
                <div className="avm-header">

                    <h2 className="avm-title">
                        {
                            mode === "edit"
                                ? "Edit Section"
                                : "Create Section"
                        }
                    </h2>

                    <button
                        className="avm-close-btn"
                        onClick={onClose}
                    >
                        <X size={18} />
                    </button>

                </div>

                <div className="avm-header-divider"></div>

                {/* BODY */}
                <div className="avm-body">

                    <div className="avm-field">

                        <label className="avm-label">
                            Section Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            className="avm-input"
                            placeholder="Security Controls"
                            value={formData.title}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="avm-field">

                        <label className="avm-label">
                            Description
                        </label>

                        <textarea
                            name="description"
                            className="avm-input"
                            rows={4}
                            placeholder="Questions related to security controls..."
                            value={formData.description}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="avm-footer-divider"></div>

                {/* FOOTER */}
                <div className="avm-footer">

                    <button
                        className="avm-cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="avm-submit-btn"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        <Plus size={16} />

                        {
                            loading
                                ? (
                                    mode === "edit"
                                        ? "Updating..."
                                        : "Creating..."
                                )
                                : (
                                    mode === "edit"
                                        ? "Update Section"
                                        : "Create Section"
                                )
                        }
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CreateSectionModal;