import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import QuestionnaireForm
    from "../components/questionnaire/QuestionnaireForm";

import { apiRequest }
    from "../services/api";

export default function QuestionnairePage() {

    const { token } = useParams();

    const [template, setTemplate] = useState(null);
    const [vendorId, setVendorId] = useState(null);
    const [questionnaireId, setQuestionnaireId] = useState(null);

    useEffect(() => {

        const fetchQuestionnaire = async () => {

            try {

                const res = await apiRequest(
                    `/api/questionnaire/${token}`
                );

                setQuestionnaireId(res.questionnaireId);
                setTemplate(res.template);
                setVendorId(res.vendorId);

            } catch (err) {

                console.error(err);
            }
        };

        fetchQuestionnaire();

    }, [token]);

    if (!template)
        return <div>Loading...</div>;

    return (
        <div style={{ padding: "40px" }}>

            <QuestionnaireForm
                template={template}
                vendorId={vendorId}
                questionnaireId={questionnaireId}
            />

        </div>
    );
}