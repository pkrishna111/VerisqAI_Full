using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VerisqAI.API.Models
{
    public class Vendor
    {
        public int Id { get; set; }

        // relation with user table
        [Required]
        public string UserId { get; set; } = "";

        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = "";

        [Required]
        [MaxLength(150)]
        public string Domain { get; set; } = "";

        [MaxLength(200)]
        public string Email { get; set; } = "";

        // status (Queued, Processing, Complete, Failed)
        [Required]
        public string Status { get; set; } = "Queued";

        // scorecard Data ( score according to vendor response )
        public int? Score { get; set; }
        public int? RiskScore { get; set; }
        public int? Findings { get; set; }

        // risk Tier (1–4 in DB)
        public int? RiskTier { get; set; }

        // questionnaire check
        public string QuestionnaireStatus { get; set; } = "Send";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // scorecards log - history
        public ICollection<Scorecard> Scorecards { get; set; } = new List<Scorecard>();

        // questionnaires list
        public ICollection<Questionnaire> Questionnaires { get; set; } = new List<Questionnaire>();
    }
}
