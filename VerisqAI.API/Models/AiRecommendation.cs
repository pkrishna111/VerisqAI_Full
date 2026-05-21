using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VerisqAI.API.Models
{
    public class AiRecommendation
    {
        public int Id { get; set; }

        [Required]
        public int ScorecardId { get; set; }

        [ForeignKey(nameof(ScorecardId))]
        public Scorecard Scorecard { get; set; } = null!;

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(3000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Priority { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [Required]
        [MaxLength(3000)]
        public string Rationale { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } =
            DateTime.UtcNow;
    }
}