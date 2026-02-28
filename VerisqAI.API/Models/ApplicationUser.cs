using Microsoft.AspNetCore.Identity;

namespace VerisqAI.API.Models
{
    public class ApplicationUser:IdentityUser
    {
        public string? FullName { get; set; }
        //public string Email {  get; set; }
        public string? CompanyName { get; set; }
        public string? CompanyDomain { get; set; }
        public string? MobilePhone { get; set; }
    }
}
