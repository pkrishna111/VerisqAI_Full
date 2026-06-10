namespace VerisqAI.API.DTOs.Questionnaire
{
    public class DeclineQuestionnaireDto
    {
        public string Reason { get; set; } = "";

        public string? AdditionalComments { get; set; }
    }
}