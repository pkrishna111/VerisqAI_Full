using System.ComponentModel.DataAnnotations;

namespace VerisqAI.API.Models
{
    public class OtpToken
    {
        public int Id { get; set; }

        [Required]
        public string Email { get; set; } = "";

        [Required]
        public string HashedCode { get; set; } = "";

        public DateTime ExpiresAt { get; set; }

        public bool IsUsed { get; set; } = false;

        public int AttemptCount { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? LockoutUntil { get; set; }
    }
}
