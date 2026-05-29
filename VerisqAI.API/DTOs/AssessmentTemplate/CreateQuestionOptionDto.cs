namespace VerisqAI.API.DTOs.AssessmentTemplate
{
    public class CreateQuestionOptionDto
    {
        public int QuestionId { get; set; }

        public string OptionText { get; set; }
            = string.Empty;

        public int DisplayOrder { get; set; }

        public int ScoreModifier { get; set; }

        public bool IsPreferredAnswer
        { get; set; }
    }
}