using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VerisqAI.API.Models
{
    public class AiAssessmentInsight
    {
        public int Id { get; set; }

        [Required]
        public int ScorecardId { get; set; }

        [ForeignKey(nameof(ScorecardId))]
        public Scorecard Scorecard { get; set; } = null!;

        [Required]
        [MaxLength(5000)]
        public string ExecutiveSummary { get; set; } = string.Empty;

        [Required]
        [MaxLength(3000)]
        public string RiskDriversJson { get; set; } = string.Empty;

        [Required]
        public decimal ConfidenceScore { get; set; }

        [Required]
        [MaxLength(100)]
        public string ModelName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string PromptVersion { get; set; } = "v1";

        public DateTime GeneratedAt { get; set; } =
            DateTime.UtcNow;
    }
}