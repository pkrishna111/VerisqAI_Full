namespace VerisqAI.API.DTOs.DynamicAssessment
{
    public class SubmitDynamicAssessmentDto
    {
        public int QuestionnaireId { get; set; }
        public int VendorId { get; set; }

        public int TemplateId { get; set; }

        public List<DynamicQuestionAnswerDto> Answers { get; set; }
            = new();
    }
}