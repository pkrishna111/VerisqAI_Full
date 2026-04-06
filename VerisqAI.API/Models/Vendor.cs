using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VerisqAI.API.Models
{
    public class Vendor
    {
        public int Id { get; set; }

        // Relation with User
        [Required]
        public string UserId { get; set; } = "";

        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        // Basic Info
        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = "";

        [Required]
        [MaxLength(150)]
        public string Domain { get; set; } = "";

        // Status (Queued, Processing, Complete, Failed)
        [Required]
        public string Status { get; set; } = "Queued";

        // Scorecard Data (manual for now)
        public int? Score { get; set; }
        public int? RiskScore { get; set; }
        public int? Findings { get; set; }

        // Risk Tier (1–4 in DB)
        public int? RiskTier { get; set; }

        // Questionnaire
        public string QuestionnaireStatus { get; set; } = "Send";

        // Tracking
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
