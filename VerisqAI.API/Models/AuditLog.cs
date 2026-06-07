using System.ComponentModel.DataAnnotations;

namespace VerisqAI.API.Models
{
    public class AuditLog
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string EventType { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        [MaxLength(200)]
        public string UserEmail { get; set; } = string.Empty;

        [MaxLength(200)]
        public string EntityType { get; set; } = string.Empty;

        [MaxLength(200)]
        public string EntityId { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Severity { get; set; } = "Info";

        [MaxLength(100)]
        public string Source { get; set; } = "System";

        public DateTime CreatedAt { get; set; }
            = DateTime.UtcNow;
    }
}