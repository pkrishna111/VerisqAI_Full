namespace VerisqAI.API.DTOs.AssessmentTemplate
{
    public class UpdateQuestionDto
    {
        public string QuestionText { get; set; }

        public string QuestionKey { get; set; }

        public string QuestionType { get; set; }

        public string Category { get; set; }

        public int Weight { get; set; }

        public string Severity { get; set; }

        public bool IsRequired { get; set; }

        public string? DependsOnQuestionKey { get; set; }

        public string? DependsOnValue { get; set; }
    }
}