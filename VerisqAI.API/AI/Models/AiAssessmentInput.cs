namespace VerisqAI.API.AI.Models
{
    public class AiAssessmentInput
    {
        public string VendorName { get; set; } =
            string.Empty;

        public int? RiskScore { get; set; }

        public int? RiskTier { get; set; }

        public int? SecurityScore { get; set; }

        public List<string> Findings { get; set; } =
            new();

        public Dictionary<string, string> Responses
        { get; set; } = new();
    }
}