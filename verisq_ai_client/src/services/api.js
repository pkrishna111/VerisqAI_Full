const API_BASE_URL = "https://localhost:7183";

export default API_BASE_URL;

//for registration of user through token
export const registerUser = async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
    }

    return response.json();
};

//for authentication request to protect dashboard
export const apiRequest = async (endpoint, method = "GET", body = null) => {

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
        },
        body: body ? JSON.stringify(body) : null
    });

    //this will auto logout if token is invalid
    if (res.status === 401) {
        console.error("Unauthorized - token invalid");
        localStorage.removeItem("token");
        window.location.href = "/";
        return;
    }

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }

    return res.json();
};

//for assesment history manangement
export const getAssessmentDetails =
    async (scorecardId) => {

        return apiRequest(
            `/api/dashboard/assessment/${scorecardId}`
        );
    };

// =============================
// Assessment Template APIs
// =============================

// Get all templates
export const getAssessmentTemplates = async () => {
    return apiRequest("/api/AssessmentTemplate");
};

// Get single template
export const getAssessmentTemplateById = async (templateId) => {
    return apiRequest(`/api/AssessmentTemplate/${templateId}`);
};

// Create template
export const createAssessmentTemplate = async (data) => {
    return apiRequest(
        "/api/AssessmentTemplate",
        "POST",
        data
    );
};

// Create section
export const createAssessmentSection = async (data) => {
    return apiRequest(
        "/api/AssessmentTemplate/section",
        "POST",
        data
    );
};

export const updateAssessmentSection =
    async (sectionId, data) => {

    return apiRequest(
        `/api/AssessmentTemplate/section/${sectionId}`,
        "PUT",
        data
    );
};

export const deleteAssessmentSection =
    async (sectionId) => {

    return apiRequest(
        `/api/AssessmentTemplate/section/${sectionId}`,
        "DELETE"
    );
};

export const reorderSections =
    async (templateId, sectionIds) => {

    return apiRequest(
        `/api/AssessmentTemplate/${templateId}/reorder-sections`,
        "PUT",
        {
            sectionIds
        }
    );
};

// Create question
export const createAssessmentQuestion = async (data) => {
    return apiRequest(
        "/api/AssessmentTemplate/question",
        "POST",
        data
    );
};

export const updateAssessmentQuestionOption =
    async (optionId, data) => {

    return apiRequest(
        `/api/AssessmentTemplate/question-option/${optionId}`,
        "PUT",
        data
    );
};

export const deleteAssessmentQuestion =
    async (questionId) => {

    return apiRequest(
        `/api/AssessmentTemplate/question/${questionId}`,
        "DELETE"
    );
};

export const reorderQuestions =
    async (sectionId, questionIds) => {

    return apiRequest(
        `/api/AssessmentTemplate/section/${sectionId}/reorder-questions`,
        "PUT",
        {
            questionIds
        }
    );
};

export const deleteAssessmentQuestionOption =
    async (optionId) => {

    return apiRequest(
        `/api/AssessmentTemplate/question-option/${optionId}`,
        "DELETE"
    );
};

export const updateAssessmentQuestion = async (
    questionId,
    data
) => {
    return apiRequest(
        `/api/AssessmentTemplate/question/${questionId}`,
        "PUT",
        data
    );
};

// Create question option
export const createAssessmentQuestionOption = async (data) => {
    return apiRequest(
        "/api/AssessmentTemplate/question-option",
        "POST",
        data
    );
};