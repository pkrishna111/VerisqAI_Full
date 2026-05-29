using System.ComponentModel.DataAnnotations;

namespace VerisqAI.API.Models
{
    public class AssessmentTemplate
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? Description { get; set; }

        [Required]
        [MaxLength(100)]
        public string Version { get; set; } = "v1";

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public ICollection<AssessmentSection> Sections { get; set; }
            = new List<AssessmentSection>();
    }
}