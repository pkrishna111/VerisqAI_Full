namespace VerisqAI.API.DTOs
{
    public class SubmitQuestionnaireDto
    {
        public int QuestionnaireId { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}