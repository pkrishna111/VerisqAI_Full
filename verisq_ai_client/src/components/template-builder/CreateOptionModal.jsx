import {
    useEffect,
    useState
} from "react";

import {
    X,
    Plus
} from "lucide-react";

import {
    createAssessmentQuestionOption,
    updateAssessmentQuestionOption
} from "../../services/api";

function CreateOptionModal({
    open,
    onClose,
    questionId,
    onCreated,
    hasPreferredAnswer,
    questionType,
    mode = "create",
    editingOption = null
}) {

    const defaultFormState = {
        optionText: "",
        isPreferredAnswer: false
    };

    useEffect(() => {

        if (
            mode === "edit" &&
            editingOption
        ) {

            setFormData({
                optionText:
                    editingOption.optionText || "",

                isPreferredAnswer:
                    editingOption.isPreferredAnswer || false
            });

        } else {

            setFormData(defaultFormState);
        }

    }, [
        mode,
        editingOption,
        open
    ]);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState(defaultFormState);

    if (!open) return null;

    const supportsOptions = [
        "YesNo",
        "SingleSelect",
        "MultiSelect"
    ].includes(questionType);

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        // PREFERRED ANSWER VALIDATION
        const allowsMultiplePreferred =
            questionType === "MultiSelect";

        if (
            name === "isPreferredAnswer" &&
            checked &&
            hasPreferredAnswer &&
            !allowsMultiplePreferred
        ) {

            alert(
                "Only one preferred answer is allowed for this question type."
            );

            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    };

    const handleSubmit = async () => {

        if (!formData.optionText.trim()) {
            return;
        }

        try {

            setLoading(true);

            const autoModifier =
                formData.isPreferredAnswer
                    ? 10
                    : -10;

            const createPayload = {
                questionId:
                    Number(questionId),

                optionText:
                    formData.optionText,

                displayOrder: 1,

                scoreModifier:
                    autoModifier,

                isPreferredAnswer:
                    formData.isPreferredAnswer
            };

            const updatePayload = {
                optionText:
                    formData.optionText,

                isPreferredAnswer:
                    formData.isPreferredAnswer
            };

            if (mode === "edit") {

                await updateAssessmentQuestionOption(
                    editingOption.id,
                    updatePayload
                );

            } else {

                await createAssessmentQuestionOption(
                    createPayload
                );
            }

            onCreated();

            onClose();

            setFormData({
                optionText: "",
                isPreferredAnswer: false
            });

        } catch (err) {

            console.error(err);

            alert(
                "Failed to create option."
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
                                ? "Edit Option"
                                : "Create Option"
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

                    {
                        !supportsOptions && (
                            <div className="tb-empty-inner">
                                This question type does not support options.
                            </div>
                        )
                    }

                    {
                        supportsOptions && (
                            <>
                                <div className="avm-field">

                                    <label className="avm-label">
                                        Option Text
                                    </label>

                                    <input
                                        type="text"
                                        name="optionText"
                                        className="avm-input"
                                        placeholder="Yes"
                                        value={formData.optionText}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="avm-checkbox-group">

                                    <input
                                        type="checkbox"
                                        name="isPreferredAnswer"
                                        className="avm-checkbox"
                                        checked={formData.isPreferredAnswer}
                                        onChange={handleChange}
                                    />

                                    <label className="avm-checkbox-label">
                                        Preferred Answer
                                    </label>

                                </div>
                            </>
                        )
                    }

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
                                        ? "Update Option"
                                        : "Create Option"
                                )
                        }
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CreateOptionModal;