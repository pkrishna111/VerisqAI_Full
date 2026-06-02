using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VerisqAI.API.Models
{
    public class Questionnaire
    {
        public int Id { get; set; }

        // id of vendor from table
        [Required]
        public int VendorId { get; set; }

        [ForeignKey("VendorId")]
        public Vendor Vendor { get; set; }

        [Required]
        public int AssessmentTemplateId { get; set; }

        [ForeignKey("AssessmentTemplateId")]
        public AssessmentTemplate AssessmentTemplate { get; set; } = null!;

        [Required]
        public string ContactEmail { get; set; } = "";

        // status (Sent, Pending, Completed)
        [Required]
        public string Status { get; set; } = "Sent";

        // public token
        [Required]
        public string Token { get; set; } = Guid.NewGuid().ToString();

        // tracking
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        public DateTime? CompletedAt { get; set; }

        public ICollection<QuestionnaireResponse> Responses { get; set; } = new List<QuestionnaireResponse>();
    }
}