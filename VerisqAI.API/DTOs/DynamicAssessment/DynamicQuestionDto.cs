namespace VerisqAI.API.DTOs.DynamicAssessment
{
    public class DynamicQuestionDto
    {
        public int Id { get; set; }

        public string QuestionKey { get; set; } = string.Empty;

        public string QuestionText { get; set; } = string.Empty;

        public string QuestionType { get; set; } = string.Empty;

        public string? Category { get; set; }

        public string Severity { get; set; } = string.Empty;

        public int Weight { get; set; }

        public bool IsRequired { get; set; }

        public int DisplayOrder { get; set; }

        public string? DependsOnQuestionKey { get; set; }

        public string? DependsOnValue { get; set; }

        public List<DynamicQuestionOptionDto> Options
        { get; set; } = new();
    }
}