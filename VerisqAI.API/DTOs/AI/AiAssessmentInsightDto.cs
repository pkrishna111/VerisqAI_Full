namespace VerisqAI.API.DTOs.AI
{
    public class AiAssessmentInsightDto
    {
        public string ExecutiveSummary { get; set; }

        public decimal ConfidenceScore { get; set; }

        public List<string> RiskDrivers { get; set; } = new();

        public string ModelName { get; set; }

        public DateTime GeneratedAt { get; set; }
    }
}