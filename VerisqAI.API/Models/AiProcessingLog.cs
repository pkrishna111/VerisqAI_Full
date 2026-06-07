using System.ComponentModel.DataAnnotations;

namespace VerisqAI.API.Models
{
    public class AiProcessingLog
    {
        public int Id { get; set; }

        [MaxLength(200)]
        public string UserName { get; set; } = string.Empty;

        [MaxLength(200)]
        public string VendorName { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Operation { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string ModelName { get; set; } = string.Empty;

        public decimal ConfidenceScore { get; set; }

        public double ResponseTimeSeconds { get; set; }

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "Success";

        public DateTime CreatedAt { get; set; }
            = DateTime.UtcNow;
    }
}