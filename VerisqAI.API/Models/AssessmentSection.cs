using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VerisqAI.API.Models
{
    public class AssessmentSection
    {
        public int Id { get; set; }

        [Required]
        public int AssessmentTemplateId { get; set; }

        [ForeignKey(nameof(AssessmentTemplateId))]
        public AssessmentTemplate AssessmentTemplate { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? Description { get; set; }

        public int DisplayOrder { get; set; }

        // Navigation
        public ICollection<AssessmentQuestion> Questions { get; set; }
            = new List<AssessmentQuestion>();
    }
}