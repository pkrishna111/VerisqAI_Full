namespace Verisq.API.DTOs.Vendor
{
    public class AssessmentHistoryDto
    {
        public int Id { get; set; }

        public int? QuestionnaireId { get; set; }

        public string QuestionnaireStatus { get; set; }

        public int ScorecardId { get; set; }

        public int Score { get; set; }

        public int RiskScore { get; set; }

        public int RiskTier { get; set; }

        public int FindingsCount { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? CompletedAt { get; set; }

        public DateTime? SentAt { get; set; }

        public DateTime? StartedAt { get; set; }

        public DateTime? DeclinedAt { get; set; }

        public DateTime? CancelledAt { get; set; }

        public DateTime? ExpiresAt { get; set; }

        public string? DeclineReason { get; set; }
    }
}