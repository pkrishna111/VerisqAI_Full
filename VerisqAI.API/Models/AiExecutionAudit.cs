using System.ComponentModel.DataAnnotations;

namespace VerisqAI.API.Models
{
    public class AiExecutionAudit
    {
        public int Id { get; set; }

        public int? ScorecardId { get; set; }

        [MaxLength(100)]
        public string ModelName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string OperationType { get; set; } = string.Empty;

        [MaxLength(100)]
        public string PromptVersion { get; set; } = string.Empty;

        public int PromptTokens { get; set; }

        public int CompletionTokens { get; set; }

        public int TotalTokens { get; set; }

        public decimal Temperature { get; set; }

        public bool Success { get; set; }

        [MaxLength(4000)]
        public string? ErrorMessage { get; set; }

        public long DurationMs { get; set; }

        public DateTime ExecutedAt { get; set; } =
            DateTime.UtcNow;
    }
}