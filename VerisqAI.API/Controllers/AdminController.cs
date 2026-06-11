using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using VerisqAI.API.Models;
using VerisqAI.API.Models.Enums;
using VerisqAI.API.Services;

namespace VerisqAI.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/admin")]

    // in future we have to add authentication for admin only
    // [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailService _emailService;

        public AdminController(UserManager<ApplicationUser> userManager, IEmailService emailService)
        {
            _userManager = userManager;
            _emailService = emailService;
        }

        // to get all pending users
        [HttpGet("pending-users")]
        public IActionResult GetPendingUsers()
        {
            var users = _userManager.Users
                .Where(u => u.Status == UserStatus.Pending)
                .Select(u => new
                {
                    u.Email,
                    u.FullName,
                    u.CompanyName,
                    u.Status
                })
                .ToList();

            return Ok(users);
        }

        //to approve users
        [HttpPost("approve-user")]
        public async Task<IActionResult> ApproveUser([FromBody] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                return BadRequest("User not found.");

            if (user.Status == UserStatus.Approved)
                return BadRequest("User already approved.");

            user.Status = UserStatus.Approved;
            await _userManager.UpdateAsync(user);

            // to send email after approval 
            var loginUrl = $"http://localhost:5173/send-code?email={email}";

            var body = $@"
<h2>Your Verisq AI Trial is Approved 🎉</h2>
<p>You can now login using the link below:</p>
<a href='{loginUrl}'>Login to your dashboard</a>
";

            await _emailService.SendEmailAsync(
                email,
                "Your Verisq AI Trial is Approved",
                body
            );

            return Ok("User approved and email sent.");
        }
    }
}
