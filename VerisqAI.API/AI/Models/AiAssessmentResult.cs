namespace VerisqAI.API.AI.Models
{
    public class AiAssessmentResult
    {
        public string ExecutiveSummary { get; set; } =
            string.Empty;

        public List<string> RiskDrivers { get; set; } =
            new();

        public List<AiRecommendationItem>
            Recommendations
        { get; set; } = new();

        public decimal ConfidenceScore { get; set; }

        public string ModelName { get; set; } =
            string.Empty;

        public string PromptVersion { get; set; } =
            "v1";
    }
}