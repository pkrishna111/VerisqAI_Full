using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VerisqAI.API.Models
{
    public class Scorecard
    {
        public int Id { get; set; }

        // relation with vendor table
        [Required]
        public int VendorId { get; set; }

        [ForeignKey("VendorId")]
        public Vendor Vendor { get; set; }

       
        public int? QuestionnaireId { get; set; }

        [ForeignKey("QuestionnaireId")]
        public Questionnaire Questionnaire { get; set; }

        // score Data
        public int? Score { get; set; }
        public int? RiskScore { get; set; }
        public int? RiskTier { get; set; }

        // status (Queued, Processing, Complete, Failed)
        [Required]
        public string Status { get; set; } = "Queued";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // findings as per scorecard
        public ICollection<Finding> Findings { get; set; } = new List<Finding>();

        public AiAssessmentInsight? AiAssessmentInsight { get; set; }

        public ICollection<AiRecommendation>
            AiRecommendations
        { get; set; }
            = new List<AiRecommendation>();
    }
}