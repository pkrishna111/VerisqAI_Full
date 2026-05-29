namespace VerisqAI.API.DTOs.AssessmentTemplate
{
    public class CreateQuestionDto
    {
        public int SectionId { get; set; }

        public string QuestionKey { get; set; }
            = string.Empty;

        public string QuestionText { get; set; }
            = string.Empty;

        public string QuestionType { get; set; }
            = "YesNo";

        public string? Category { get; set; }

        public string Severity { get; set; }
            = "Medium";

        public int Weight { get; set; } = 10;

        public bool IsRequired { get; set; } = true;

        public int DisplayOrder { get; set; }

        public string? DependsOnQuestionKey
        { get; set; }

        public string? DependsOnValue
        { get; set; }
    }
}