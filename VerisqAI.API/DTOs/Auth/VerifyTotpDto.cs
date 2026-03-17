using System.ComponentModel.DataAnnotations;

namespace VerisqAI.API.DTOs.Auth
{
    public class VerifyTotpDto
    {
        [Required]
        public string Email { get; set; } = "";

        [Required]
        public string Code { get; set; } = "";
    }
}
