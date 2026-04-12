using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VerisqAI.API.Models.Enums;

namespace VerisqAI.API.Models
{
    public class Finding
    {
        public int Id { get; set; }

        // id of scorecard from scorecard table
        [Required]
        public int ScorecardId { get; set; }

        [ForeignKey("ScorecardId")]
        public Scorecard Scorecard { get; set; }

        // finding Details
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = "";

        public string? Description { get; set; }

        // severity
        [Required]
        public FindingSeverity Severity { get; set; }

        // date & time tracking
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}