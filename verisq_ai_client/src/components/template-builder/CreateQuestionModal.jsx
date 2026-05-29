import {
    useEffect,
    useState
} from "react";

import {
    X,
    Plus
} from "lucide-react";

import {
    createAssessmentQuestion,
    updateAssessmentQuestion
} from "../../services/api";

function CreateQuestionModal({
    open,
    onClose,
    sectionId,
    onCreated,
    existingQuestions = [],
    mode = "create",
    editingQuestion = null
}) {

    const [loading, setLoading] =
        useState(false);

    const defaultFormState = {
        questionKey: "",
        questionText: "",
        questionType: "Text",
        category: "",
        severity: "Medium",
        weight: 3,
        isRequired: true,
        dependsOnQuestionKey: "",
        dependsOnValue: ""
    };

    const [formData, setFormData] =
        useState(defaultFormState);

    useEffect(() => {

        if (
            mode === "edit" &&
            editingQuestion
        ) {

            setFormData({
                questionKey:
                    editingQuestion.questionKey || "",

                questionText:
                    editingQuestion.questionText || "",

                questionType:
                    editingQuestion.questionType || "Text",

                category:
                    editingQuestion.category || "",

                severity:
                    editingQuestion.severity || "Medium",

                weight:
                    editingQuestion.weight || 3,

                isRequired:
                    editingQuestion.isRequired,

                dependsOnQuestionKey:
                    editingQuestion.dependsOnQuestionKey || "",

                dependsOnValue:
                    editingQuestion.dependsOnValue || ""
            });

        } else {

            setFormData(defaultFormState);
        }

    }, [
        mode,
        editingQuestion,
        open
    ]);

    if (!open) return null;

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        // AUTO WEIGHT MAPPING
        if (name === "severity") {

            const severityWeights = {
                Low: 1,
                Medium: 3,
                High: 7,
                Critical: 10
            };

            setFormData(prev => ({
                ...prev,
                severity: value,
                weight: severityWeights[value]
            }));

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

    const resetForm = () => {

        setFormData(defaultFormState);
    };

    const handleSubmit = async () => {

        if (
            !formData.questionText.trim()
        ) {
            return;
        }

        try {

            setLoading(true);

            const autoQuestionKey =
                mode === "edit"
                    ? formData.questionKey
                    : formData.questionText
                        .toLowerCase()
                        .replace(/[^a-z0-9\s]/g, "")
                        .trim()
                        .replace(/\s+/g, "_");

            const payload = {
                sectionId:
                    Number(sectionId),

                questionKey:
                    autoQuestionKey,

                questionText:
                    formData.questionText,

                questionType:
                    formData.questionType,

                category:
                    formData.category,

                severity:
                    formData.severity,

                weight:
                    Number(formData.weight),

                isRequired:
                    formData.isRequired,

                displayOrder:
                    existingQuestions.length + 1,

                dependsOnQuestionKey:
                    formData.dependsOnQuestionKey,

                dependsOnValue:
                    formData.dependsOnValue
            };

            if (mode === "edit") {

                await updateAssessmentQuestion(
                    editingQuestion.id,
                    payload
                );

            } else {

                await createAssessmentQuestion(
                    payload
                );
            }

            onCreated();

            onClose();

            resetForm();

        } catch (err) {

            console.error(err);

            alert(
                "Failed to create question."
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
                                ? "Edit Question"
                                : "Create Question"
                        }
                    </h2>

                    <button
                        className="avm-close-btn"
                        onClick={() => {
                            resetForm();
                            onClose();
                        }}
                    >
                        <X size={18} />
                    </button>

                </div>

                <div className="avm-header-divider"></div>

                {/* BODY */}
                <div className="avm-body">

                    <div className="avm-field">

                        <label className="avm-label">
                            Depends On Question
                        </label>

                        <select
                            name="dependsOnQuestionKey"
                            className="avm-select"
                            value={formData.dependsOnQuestionKey}
                            onChange={handleChange}
                        >

                            <option value="">
                                None
                            </option>

                            {
                                existingQuestions.map((question) => (
                                    <option
                                        key={question.id}
                                        value={question.questionKey}
                                    >
                                        {question.questionKey}
                                    </option>
                                ))
                            }

                        </select>

                    </div>

                    {
                        formData.dependsOnQuestionKey && (
                            <div className="avm-field">

                                <label className="avm-label">
                                    Depends On Value
                                </label>

                                <input
                                    type="text"
                                    name="dependsOnValue"
                                    className="avm-input"
                                    placeholder="Yes"
                                    value={formData.dependsOnValue}
                                    onChange={handleChange}
                                />

                            </div>
                        )
                    }

                    <div className="avm-field">

                        <label className="avm-label">
                            Question Text
                        </label>

                        <textarea
                            name="questionText"
                            className="avm-input"
                            rows={4}
                            placeholder="Does your organization enforce MFA?"
                            value={formData.questionText}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="avm-field">

                        <label className="avm-label">
                            Question Type
                        </label>

                        <select
                            name="questionType"
                            className="avm-select"
                            value={formData.questionType}
                            onChange={handleChange}
                        >
                            <option value="Text">
                                Text
                            </option>

                            <option value="Textarea">
                                Textarea
                            </option>

                            <option value="YesNo">
                                Yes / No
                            </option>

                            <option value="SingleSelect">
                                Single Select
                            </option>

                            <option value="MultiSelect">
                                Multi Select
                            </option>

                            <option value="Number">
                                Number
                            </option>
                        </select>

                    </div>

                    <div className="avm-field">

                        <label className="avm-label">
                            Category
                        </label>

                        <select
                            name="category"
                            className="avm-select"
                            value={formData.category}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Category
                            </option>

                            <option value="Security">
                                Security
                            </option>

                            <option value="Compliance">
                                Compliance
                            </option>

                            <option value="Infrastructure">
                                Infrastructure
                            </option>

                            <option value="Identity & Access">
                                Identity & Access
                            </option>

                            <option value="Data Protection">
                                Data Protection
                            </option>

                            <option value="Business Continuity">
                                Business Continuity
                            </option>

                            <option value="Third Party Risk">
                                Third Party Risk
                            </option>

                            <option value="Incident Response">
                                Incident Response
                            </option>

                        </select>

                    </div>

                    <div className="avm-field">

                        <label className="avm-label">
                            Severity
                        </label>

                        <select
                            name="severity"
                            className="avm-select"
                            value={formData.severity}
                            onChange={handleChange}
                        >
                            <option value="Low">
                                Low
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="High">
                                High
                            </option>

                            <option value="Critical">
                                Critical
                            </option>
                        </select>

                    </div>

                    <div className="avm-field">

                        <label className="avm-label">
                            Weight
                        </label>

                        <input
                            type="number"
                            name="weight"
                            className="avm-input"
                            value={formData.weight}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="avm-checkbox-group">

                        <input
                            type="checkbox"
                            name="isRequired"
                            className="avm-checkbox"
                            checked={formData.isRequired}
                            onChange={handleChange}
                        />

                        <div className="avm-checkbox-text">

                            <label className="avm-checkbox-label">
                                Required Question
                            </label>

                        </div>

                    </div>

                </div>

                <div className="avm-footer-divider"></div>

                {/* FOOTER */}
                <div className="avm-footer">

                    <button
                        className="avm-cancel-btn"
                        onClick={() => {
                            resetForm();
                            onClose();
                        }}
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
                                        ? "Update Question"
                                        : "Create Question"
                                )
                        }
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CreateQuestionModal;