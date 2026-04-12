import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionnaireForm from "../components/questionnaire/QuestionnaireForm";
import { apiRequest } from "../services/api";

export default function QuestionnairePage() {
    const { token } = useParams();
    const [questions, setQuestions] = useState([]);
    const [questionnaireId, setQuestionnaireId] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await apiRequest(`/api/questionnaire/${token}`);
                setQuestions(res.questions);
                setQuestionnaireId(res.questionnaireId);
            } catch (err) {
                console.error(err);
            }
        };

        fetchQuestions();
    }, [token]);

    if (!questions || questions.length === 0)
        return <div>Loading...</div>;

    return (
        <div style={{ padding: "40px" }}>
            <h2>Vendor Security Questionnaire</h2>

            <QuestionnaireForm
                questions={questions}
                questionnaireId={questionnaireId}
            />
        </div>
    );
}