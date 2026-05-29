using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VerisqAI.API.Models
{
    public class AssessmentQuestionOption
    {
        public int Id { get; set; }

        [Required]
        public int AssessmentQuestionId { get; set; }

        [ForeignKey(nameof(AssessmentQuestionId))]
        public AssessmentQuestion AssessmentQuestion { get; set; }

        [Required]
        [MaxLength(500)]
        public string OptionText { get; set; } = string.Empty;

        public int DisplayOrder { get; set; }

        // Optional scoring impact
        public int ScoreModifier { get; set; } = 0;

        public bool IsPreferredAnswer { get; set; } = false;
    }
}