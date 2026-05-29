namespace VerisqAI.API.DTOs.DynamicAssessment
{
    public class DynamicQuestionAnswerDto
    {
        public int QuestionId { get; set; }

        public string QuestionKey { get; set; } = string.Empty;

        public string Answer { get; set; } = string.Empty;
    }
}