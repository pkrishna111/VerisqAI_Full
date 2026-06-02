namespace VerisqAI.API.DTOs.DynamicAssessment
{
    public class DynamicQuestionOptionDto
    {
        public int Id { get; set; }

        public string OptionText { get; set; } = string.Empty;

        public int DisplayOrder { get; set; }

        public int ScoreModifier { get; set; }

        public bool IsPreferredAnswer { get; set; }
    }
}