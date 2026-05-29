using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VerisqAI.API.Models
{
    public class QuestionnaireResponse
    {
        public int Id { get; set; }

        // relation with Questionnaire
        [Required]
        public int QuestionnaireId { get; set; }

        [ForeignKey("QuestionnaireId")]
        public Questionnaire Questionnaire { get; set; }

        // simple question - answer
        [Required]
        public string Question { get; set; } = "";

        [Required]
        public string Answer { get; set; } = "";

        // Dynamic engine support
        public int? AssessmentQuestionId { get; set; }

        [MaxLength(150)]
        public string? QuestionKey { get; set; }

        [MaxLength(50)]
        public string? QuestionType { get; set; }

        [MaxLength(100)]
        public string? Category { get; set; }

        [MaxLength(50)]
        public string? Severity { get; set; }
    }
}