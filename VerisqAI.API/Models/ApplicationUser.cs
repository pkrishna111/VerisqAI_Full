using Microsoft.AspNetCore.Identity;
using VerisqAI.API.Models.Enums;

namespace VerisqAI.API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FullName { get; set; }

        public string? CompanyName { get; set; }

        public string? CompanyDomain { get; set; }

        public string? MobilePhone { get; set; }

        public UserStatus Status { get; set; }
            = UserStatus.Pending;

        public DateTime CreatedAt { get; set; }
            = DateTime.UtcNow;
    }
}