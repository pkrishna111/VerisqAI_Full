using System.ComponentModel.DataAnnotations;

namespace VerisqAI.API.DTOs.Auth
{
    public class RegisterRequestDto
    {
        [Required]
        public string FullName { get; set; } = "";

        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";

        [Required]
        public string CompanyName { get; set; } = "";

        [Required]
        public string CompanyDomain { get; set; } = "";

        [Required]
        public string MobilePhone { get; set; } = "";
    }
}
