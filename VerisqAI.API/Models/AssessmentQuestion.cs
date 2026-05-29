using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VerisqAI.API.Models
{
    public class AssessmentQuestion
    {
        public int Id { get; set; }

        [Required]
        public int AssessmentSectionId { get; set; }

        [ForeignKey(nameof(AssessmentSectionId))]
        public AssessmentSection AssessmentSection { get; set; }

        // Stable key used internally
        [Required]
        [MaxLength(150)]
        public string QuestionKey { get; set; } = string.Empty;

        [Required]
        [MaxLength(2000)]
        public string QuestionText { get; set; } = string.Empty;

        // YesNo, Text, MultiSelect, Dropdown, Number
        [Required]
        [MaxLength(50)]
        public string QuestionType { get; set; } = "YesNo";

        // Security category
        [MaxLength(100)]
        public string? Category { get; set; }

        // Weight for scoring engine
        public int Weight { get; set; } = 10;

        // Low / Medium / High / Critical
        [MaxLength(50)]
        public string Severity { get; set; } = "Medium";

        public bool IsRequired { get; set; } = true;

        public bool IsActive { get; set; } = true;

        public int DisplayOrder { get; set; }

        // Optional future conditional logic
        public string? DependsOnQuestionKey { get; set; }

        public string? DependsOnValue { get; set; }

        public ICollection<AssessmentQuestionOption> Options
        { get; set; } = new List<AssessmentQuestionOption>();
    }
}