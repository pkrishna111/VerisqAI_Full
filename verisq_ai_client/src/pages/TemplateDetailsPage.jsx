import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import DashboardHeader
    from "../components/dashboard/Header";

import {
    Layers3,
    Plus,
    Copy,
    Pencil,
    Trash2,
    HelpCircle
} from "lucide-react";

import {
    getAssessmentTemplateById,
    deleteAssessmentQuestionOption,
    deleteAssessmentQuestion,
    deleteAssessmentSection,
    reorderQuestions,
    reorderSections,
    duplicateAssessmentQuestion,
    duplicateAssessmentSection,
    updateAssessmentSection
} from "../services/api";

import CreateSectionModal
    from "../components/template-builder/CreateSectionModal";

import {
    ChevronDown,
    ChevronUp,
    FileText
} from "lucide-react";

import CreateQuestionModal
    from "../components/template-builder/CreateQuestionModal";

import CreateOptionModal
    from "../components/template-builder/CreateOptionModal";

import { updateAssessmentQuestion } from "../services/api";

function TemplateDetailsPage() {

    const { id } = useParams();

    const [template, setTemplate] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [showSectionModal, setShowSectionModal] =
        useState(false);

    const [selectedSectionId, setSelectedSectionId] =
        useState(null);

    const [showQuestionModal, setShowQuestionModal] =
        useState(false);

    const [showOptionModal, setShowOptionModal] =
        useState(false);

    const [selectedQuestionId, setSelectedQuestionId] =
        useState(null);

    const [activeSectionId, setActiveSectionId] =
        useState(null);

    const [editingQuestion, setEditingQuestion] =
        useState(null);

    const [showEditQuestionModal, setShowEditQuestionModal] =
        useState(false);

    const [editingOption, setEditingOption] =
        useState(null);

    const [showEditOptionModal, setShowEditOptionModal] =
        useState(false);

    const [draggedQuestionId, setDraggedQuestionId] =
        useState(null);

    const [dragOverQuestionId, setDragOverQuestionId] =
        useState(null);

    const [draggedSectionId, setDraggedSectionId] =
        useState(null);

    const [dragOverSectionId, setDragOverSectionId] =
        useState(null);

    const [editingSection, setEditingSection] =
        useState(null);

    const [showEditSectionModal, setShowEditSectionModal] =
        useState(false);

    const handleDuplicateQuestion = async (
        question
    ) => {

        try {

            await duplicateAssessmentQuestion(
                question.id
            );

            await fetchTemplate();

        } catch (err) {

            console.error(err);

            alert(
                "Failed to duplicate question."
            );
        }
    };

    const handleDuplicateSection = async (
        section
    ) => {

        try {

            await duplicateAssessmentSection(
                section.id
            );

            await fetchTemplate();

        } catch (err) {

            console.error(err);

            alert(
                "Failed to duplicate section."
            );
        }
    };

    const handleEditQuestion = (question) => {

        setEditingQuestion(question);

        setShowEditQuestionModal(true);
    };

    const handleDragStart = (
        questionId
    ) => {

        setDraggedQuestionId(questionId);
    };

    const handleDragOver = (
        e,
        questionId
    ) => {

        e.preventDefault();

        setDragOverQuestionId(questionId);
    };

    const handleDrop = async (
        targetQuestionId
    ) => {

        if (
            !draggedQuestionId ||
            draggedQuestionId === targetQuestionId
        ) {
            return;
        }

        try {

            const questions =
                [...activeSection.questions];

            const draggedIndex =
                questions.findIndex(
                    q => q.id === draggedQuestionId
                );

            const targetIndex =
                questions.findIndex(
                    q => q.id === targetQuestionId
                );

            const [draggedQuestion] =
                questions.splice(draggedIndex, 1);

            questions.splice(
                targetIndex,
                0,
                draggedQuestion
            );

            const orderedIds =
                questions.map(q => q.id);

            await reorderQuestions(
                activeSection.id,
                orderedIds
            );

            await fetchTemplate();

        } catch (err) {

            console.error(err);

            alert(
                "Failed to reorder questions."
            );

        } finally {

            setDraggedQuestionId(null);

            setDragOverQuestionId(null);
        }
    };

    const handleDeleteQuestion =
        async (question) => {

            const confirmed = window.confirm(
                `Delete "${question.questionText}" ?`
            );

            if (!confirmed) {
                return;
            }

            try {

                await deleteAssessmentQuestion(
                    question.id
                );

                fetchTemplate();

            } catch (err) {

                console.error(err);

                alert(
                    "Failed to delete question."
                );
            }
        };

    const handleEditOption = (
        option,
        question
    ) => {

        setSelectedQuestionId(question.id);

        setEditingOption(option);

        setShowEditOptionModal(true);
    };

    const handleDeleteOption = async (
        optionId
    ) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this option?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteAssessmentQuestionOption(
                optionId
            );

            fetchTemplate();

        } catch (err) {

            console.error(err);

            alert(
                "Failed to delete option."
            );
        }
    };

    const handleEditSection = (
        section
    ) => {

        setEditingSection(section);

        setShowEditSectionModal(true);
    };

    const handleDeleteSection =
        async (section) => {

            const confirmed =
                window.confirm(
                    `Delete section "${section.title}" ?`
                );

            if (!confirmed) {
                return;
            }

            try {

                await deleteAssessmentSection(
                    section.id
                );

                const remainingSections =
                    template.sections.filter(
                        s => s.id !== section.id
                    );

                if (
                    activeSectionId === section.id
                ) {

                    setActiveSectionId(
                        remainingSections.length > 0
                            ? remainingSections[0].id
                            : null
                    );
                }

                await fetchTemplate();

            } catch (err) {

                console.error(err);

                alert(
                    "Failed to delete section."
                );
            }
        };

    const handleSectionDragStart =
        (sectionId) => {

            setDraggedSectionId(sectionId);
        };

    const handleSectionDragOver =
        (e, sectionId) => {

            e.preventDefault();

            setDragOverSectionId(sectionId);
        };

    const handleSectionDrop =
        async (targetSectionId) => {

            if (
                !draggedSectionId ||
                draggedSectionId === targetSectionId
            ) {
                return;
            }

            try {

                const sections =
                    [...template.sections];

                const draggedIndex =
                    sections.findIndex(
                        s => s.id === draggedSectionId
                    );

                const targetIndex =
                    sections.findIndex(
                        s => s.id === targetSectionId
                    );

                const [draggedSection] =
                    sections.splice(
                        draggedIndex,
                        1
                    );

                sections.splice(
                    targetIndex,
                    0,
                    draggedSection
                );

                const orderedIds =
                    sections.map(
                        s => s.id
                    );

                await reorderSections(
                    template.id,
                    orderedIds
                );

                await fetchTemplate();

            } catch (err) {

                console.error(err);

                alert(
                    "Failed to reorder sections."
                );

            } finally {

                setDraggedSectionId(null);

                setDragOverSectionId(null);
            }
        };

    const fetchTemplate = async () => {

        try {

            setLoading(true);

            const response =
                await getAssessmentTemplateById(id);

            setTemplate(response);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);
        }
    };
    useEffect(() => {

        fetchTemplate();

    }, [id]);

    useEffect(() => {

        if (
            template?.sections?.length > 0 &&
            !activeSectionId
        ) {

            setActiveSectionId(
                template.sections[0].id
            );
        }

    }, [template]);

    if (loading) {

        return (
            <>
                <DashboardHeader />

                <main className="dashboard-main">
                    Loading template...
                </main>
            </>
        );
    }

    if (!template) {

        return (
            <>
                <DashboardHeader />

                <main className="dashboard-main">
                    Template not found.
                </main>
            </>
        );
    }

    const activeSection =
        template.sections?.find(
            section =>
                section.id === activeSectionId
        );

    return (
        <>
            <DashboardHeader />

            <main className="dashboard-main">

                {/* HERO */}
                <div className="welcome-banner">

                    <div className="welcome-content">

                        <h2>
                            {template.name}
                        </h2>

                        <p>
                            {
                                template.description ||
                                "No description"
                            }
                        </p>

                    </div>

                    <button
                        className="btn-add-vendor"
                        onClick={() =>
                            setShowSectionModal(true)
                        }
                    >
                        <Plus size={18} />
                        Add Section
                    </button>

                </div>

                <div className="tb-builder-layout">

                    {/* SIDEBAR */}
                    <div className="tb-sidebar">

                        <div className="tb-sidebar-header">

                            <div>

                                <h3 className="table-title">
                                    Sections
                                </h3>

                                <p className="table-subtitle">
                                    Select section to manage questions
                                </p>

                            </div>

                            <button
                                className="tb-sidebar-add-btn"
                                onClick={() => {

                                    if (
                                        template.sections?.length >= 5
                                    ) {

                                        alert(
                                            "Maximum 5 sections allowed."
                                        );

                                        return;
                                    }

                                    setShowSectionModal(true);
                                }}
                            >
                                <Plus size={15} />
                            </button>

                        </div>

                        <div className="tb-sidebar-list">

                            {
                                template.sections?.map(
                                    (section) => {

                                        const isActive =
                                            activeSectionId === section.id;

                                        return (
                                            <div
                                                key={section.id}
                                                draggable
                                                className={
                                                    `tb-sidebar-item
        ${isActive ? "active" : ""}
        ${dragOverSectionId === section.id
                                                        ? "drag-over"
                                                        : ""}`
                                                }
                                                onDragStart={() =>
                                                    handleSectionDragStart(
                                                        section.id
                                                    )
                                                }
                                                onDragOver={(e) =>
                                                    handleSectionDragOver(
                                                        e,
                                                        section.id
                                                    )
                                                }
                                                onDrop={() =>
                                                    handleSectionDrop(
                                                        section.id
                                                    )
                                                }
                                                onDragEnd={() => {

                                                    setDraggedSectionId(null);

                                                    setDragOverSectionId(null);
                                                }}
                                                onClick={() =>
                                                    setActiveSectionId(
                                                        section.id
                                                    )
                                                }
                                            >

                                                <div className="tb-sidebar-item-top">

                                                    <div className="tb-sidebar-item-main">

                                                        <div className="tb-section-icon">
                                                            <Layers3 size={16} />
                                                        </div>

                                                        <div>

                                                            <div className="tb-sidebar-title">
                                                                {section.title}
                                                            </div>

                                                            <div className="tb-sidebar-count">
                                                                {
                                                                    section.questions?.length || 0
                                                                }
                                                                {" "}
                                                                Questions
                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className="tb-sidebar-actions">

                                                        <button
                                                            className="tb-sidebar-action-btn"
                                                            onClick={(e) => {

                                                                e.stopPropagation();

                                                                handleEditSection(section);
                                                            }}
                                                        >
                                                            <Pencil size={13} />
                                                        </button>

                                                        <button
                                                            className="tb-sidebar-action-btn"
                                                            onClick={(e) => {

                                                                e.stopPropagation();

                                                                handleDuplicateSection(
                                                                    section
                                                                );
                                                            }}
                                                        >
                                                            <Copy size={13} />
                                                        </button>

                                                        <button
                                                            className="tb-sidebar-action-btn danger"
                                                            onClick={(e) => {

                                                                e.stopPropagation();

                                                                handleDeleteSection(section);
                                                            }}
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>
                                        );
                                    }
                                )
                            }

                        </div>

                    </div>

                    {/* WORKSPACE */}
                    <div className="tb-workspace">

                        {
                            !activeSection
                                ? (
                                    <div className="table-card">

                                        <div className="tb-empty-state">
                                            Select a section to continue.
                                        </div>

                                    </div>
                                )
                                : (
                                    <div className="table-card">

                                        {/* HEADER */}
                                        <div className="table-header">

                                            <div>

                                                <h3 className="table-title">
                                                    {activeSection.title}
                                                </h3>

                                                <p className="table-subtitle">
                                                    {
                                                        activeSection.description ||
                                                        "No description"
                                                    }
                                                </p>

                                            </div>

                                            <button
                                                className="btn-add-vendor"
                                                onClick={() => {

                                                    if (
                                                        activeSection.questions?.length >= 10
                                                    ) {

                                                        alert(
                                                            "Maximum 10 questions allowed."
                                                        );

                                                        return;
                                                    }

                                                    setSelectedSectionId(
                                                        activeSection.id
                                                    );

                                                    setShowQuestionModal(true);
                                                }}
                                            >
                                                <Plus size={16} />
                                                Add Question
                                            </button>

                                        </div>

                                        {/* QUESTIONS */}
                                        {
                                            activeSection.questions?.length === 0
                                                ? (
                                                    <div className="tb-empty-state">
                                                        No questions added yet.
                                                    </div>
                                                )
                                                : (
                                                    <div className="tb-workspace-questions">

                                                        {
                                                            activeSection.questions.map(
                                                                (question) => (
                                                                    <div
                                                                        key={question.id}
                                                                        className={`tb-question-card workspace ${dragOverQuestionId === question.id
                                                                            ? "drag-over"
                                                                            : ""
                                                                            }`}
                                                                        draggable
                                                                        onDragStart={() =>
                                                                            handleDragStart(question.id)
                                                                        }
                                                                        onDragOver={(e) =>
                                                                            handleDragOver(
                                                                                e,
                                                                                question.id
                                                                            )
                                                                        }
                                                                        onDrop={() =>
                                                                            handleDrop(question.id)
                                                                        }
                                                                    >

                                                                        <div className="tb-question-header">
                                                                            <div className="tb-question-header-main">
                                                                                <div className="tb-question-text">
                                                                                    {question.questionText}
                                                                                </div>
                                                                            </div>

                                                                            <div className="tb-question-toolbar-actions">
                                                                                <button
                                                                                    className="tb-question-action-btn info"
                                                                                    type="button"
                                                                                    title={question.questionType}
                                                                                >
                                                                                    <HelpCircle size={15} />
                                                                                </button>

                                                                                <button
                                                                                    className="tb-question-action-btn"
                                                                                    type="button"
                                                                                    title="Duplicate Question"
                                                                                    onClick={() => handleDuplicateQuestion(question)}
                                                                                >
                                                                                    <Copy size={16} />
                                                                                </button>

                                                                                <button
                                                                                    className="tb-question-action-btn"
                                                                                    type="button"
                                                                                    title="Edit Question"
                                                                                    onClick={() => handleEditQuestion(question)}
                                                                                >                                                                                    <Pencil size={16} />
                                                                                </button>

                                                                                <button
                                                                                    className="tb-question-action-btn danger"
                                                                                    type="button"
                                                                                    title="Delete Question"
                                                                                    onClick={() => handleDeleteQuestion(question)}
                                                                                >
                                                                                    <Trash2 size={16} />
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                        {
                                                                            (
                                                                                question.questionType === "SingleSelect" ||
                                                                                question.questionType === "MultiSelect" ||
                                                                                question.questionType === "YesNo"
                                                                            ) && (
                                                                                <div className="tb-question-options-section">

                                                                                    <div className="tb-option-header">

                                                                                        <h4 className="tb-option-title">
                                                                                            Options
                                                                                        </h4>

                                                                                        <button
                                                                                            className="tb-option-btn"
                                                                                            onClick={() => {

                                                                                                if (
                                                                                                    question.questionType === "YesNo" &&
                                                                                                    question.options?.length >= 2
                                                                                                ) {

                                                                                                    alert(
                                                                                                        "Yes/No questions allow only 2 options."
                                                                                                    );

                                                                                                    return;
                                                                                                }

                                                                                                setSelectedQuestionId(
                                                                                                    question.id
                                                                                                );

                                                                                                setShowOptionModal(true);
                                                                                            }}
                                                                                        >
                                                                                            <Plus size={14} />
                                                                                            Add Option
                                                                                        </button>

                                                                                    </div>

                                                                                    <div className="tb-options-list">

                                                                                        {
                                                                                            question.options?.map(
                                                                                                (option) => (
                                                                                                    <div
                                                                                                        key={option.id}
                                                                                                        className="tb-option-chip"
                                                                                                    >

                                                                                                        <div className="tb-option-chip-left">

                                                                                                            <span>
                                                                                                                {option.optionText}
                                                                                                            </span>

                                                                                                            {
                                                                                                                option.isPreferredAnswer && (
                                                                                                                    <span className="tb-preferred-badge">
                                                                                                                        Preferred
                                                                                                                    </span>
                                                                                                                )
                                                                                                            }

                                                                                                        </div>

                                                                                                        <div className="tb-option-chip-actions">

                                                                                                            <button
                                                                                                                className="tb-option-action-btn"
                                                                                                                onClick={() =>
                                                                                                                    handleEditOption(
                                                                                                                        option,
                                                                                                                        question
                                                                                                                    )
                                                                                                                }
                                                                                                            >
                                                                                                                <Pencil size={13} />
                                                                                                            </button>

                                                                                                            <button
                                                                                                                className="tb-option-action-btn danger"
                                                                                                                onClick={() =>
                                                                                                                    handleDeleteOption(
                                                                                                                        option.id
                                                                                                                    )
                                                                                                                }
                                                                                                            >
                                                                                                                <Trash2 size={13} />
                                                                                                            </button>

                                                                                                        </div>

                                                                                                    </div>
                                                                                                )
                                                                                            )
                                                                                        }

                                                                                    </div>

                                                                                </div>
                                                                            )
                                                                        }

                                                                        <div className="tb-question-footer">

                                                                            <div className="tb-question-footer-item">
                                                                                <strong>Type</strong>
                                                                                <span>{question.questionType}</span>
                                                                            </div>

                                                                            <div className="tb-question-footer-item">
                                                                                <strong>Category</strong>
                                                                                <span>{question.category}</span>
                                                                            </div>

                                                                            <div className="tb-question-footer-item">
                                                                                <span className={`tb-severity-dot ${question.severity?.toLowerCase()}`}></span>
                                                                                <strong>Severity</strong>
                                                                                <span>{question.severity}</span>
                                                                            </div>

                                                                            <div className="tb-question-footer-item">
                                                                                <strong>Weight</strong>
                                                                                <span>{question.weight}</span>
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                )
                                                            )
                                                        }

                                                    </div>
                                                )
                                        }

                                    </div>
                                )
                        }

                    </div>

                </div>

                {/* create section modal */}
                <CreateSectionModal
                    open={showSectionModal}
                    onClose={() =>
                        setShowSectionModal(false)
                    }
                    templateId={id}
                    onCreated={fetchTemplate}
                />

                {/* edit section modal */}
                <CreateSectionModal
                    open={showEditSectionModal}
                    onClose={() => {

                        setShowEditSectionModal(false);

                        setEditingSection(null);
                    }}
                    templateId={template.id}
                    existingSections={
                        template.sections || []
                    }
                    onCreated={() => {

                        fetchTemplate();

                        setShowEditSectionModal(false);

                        setEditingSection(null);
                    }}
                    mode="edit"
                    editingSection={editingSection}
                />

                {/* Create Question */}
                <CreateQuestionModal
                    open={showQuestionModal}
                    onClose={() =>
                        setShowQuestionModal(false)
                    }
                    sectionId={selectedSectionId}
                    onCreated={fetchTemplate}
                    existingQuestions={
                        template.sections?.flatMap(
                            section => section.questions || []
                        ) || []
                    }
                />

                {/* Edit Question and Details */}
                <CreateQuestionModal
                    open={showEditQuestionModal}
                    onClose={() => {

                        setShowEditQuestionModal(false);

                        setEditingQuestion(null);
                    }}
                    sectionId={
                        activeSection?.id
                    }
                    onCreated={() => {

                        fetchTemplate();

                        setShowEditQuestionModal(false);

                        setEditingQuestion(null);
                    }}
                    existingQuestions={
                        activeSection?.questions || []
                    }
                    mode="edit"
                    editingQuestion={editingQuestion}
                />

                {/* create option modal */}
                <CreateOptionModal
                    open={showOptionModal}
                    onClose={() =>
                        setShowOptionModal(false)
                    }
                    questionId={selectedQuestionId}
                    questionType={
                        activeSection?.questions?.find(
                            q => q.id === selectedQuestionId
                        )?.questionType || ""
                    }
                    onCreated={fetchTemplate}
                    hasPreferredAnswer={
                        activeSection?.questions
                            ?.find(
                                q => q.id === selectedQuestionId
                            )
                            ?.options?.some(
                                option =>
                                    option.isPreferredAnswer
                            ) || false
                    }
                />

                {/* edit option modal */}
                <CreateOptionModal
                    open={showEditOptionModal}
                    onClose={() => {

                        setShowEditOptionModal(false);

                        setEditingOption(null);
                    }}
                    questionId={selectedQuestionId}
                    questionType={
                        activeSection?.questions?.find(
                            q => q.id === selectedQuestionId
                        )?.questionType || ""
                    }
                    onCreated={() => {

                        fetchTemplate();

                        setShowEditOptionModal(false);

                        setEditingOption(null);
                    }}
                    hasPreferredAnswer={
                        activeSection?.questions
                            ?.find(
                                q => q.id === selectedQuestionId
                            )
                            ?.options?.some(
                                option =>
                                    option.isPreferredAnswer &&
                                    option.id !== editingOption?.id
                            ) || false
                    }
                    mode="edit"
                    editingOption={editingOption}
                />

            </main>
        </>
    );
}

export default TemplateDetailsPage;