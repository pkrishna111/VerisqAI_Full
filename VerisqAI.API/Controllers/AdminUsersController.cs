using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VerisqAI.API.Data;
using VerisqAI.API.Models.Enums;
using VerisqAI.API.Services;
using VerisqAI.API.Models;

namespace VerisqAI.API.Controllers
{
    [ApiController]
    [Route("api/admin/users")]
    public class AdminUsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;

        public AdminUsersController(
            ApplicationDbContext context,
            IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // ==========================================
        // GET ALL USERS
        // ==========================================
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users
                .Select(x => new
                {
                    x.Id,
                    x.FullName,
                    x.Email,
                    x.CompanyName,
                    x.CompanyDomain,
                    x.MobilePhone,
                    x.Status
                })
                .OrderBy(x => x.FullName)
                .ToListAsync();

            return Ok(users);
        }

        // ==========================================
        // GET USER BY ID
        // ==========================================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(
            string id)
        {
            var user = await _context.Users
                .Where(x => x.Id == id)
                .Select(x => new
                {
                    x.Id,
                    x.FullName,
                    x.Email,
                    x.CompanyName,
                    x.CompanyDomain,
                    x.MobilePhone,
                    x.Status
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound(new
                {
                    message = "User not found"
                });
            }

            return Ok(user);
        }

        // ==========================================
        // APPROVE USER
        // ==========================================
        [HttpPost("{id}/approve")]
        public async Task<IActionResult> ApproveUser(
     string id)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(
                    x => x.Id == id);

            if (user == null)
            {
                return NotFound(new
                {
                    message = "User not found"
                });
            }

            if (user.Status ==
                UserStatus.Approved)
            {
                return BadRequest(new
                {
                    message = "User already approved"
                });
            }

            user.Status =
                UserStatus.Approved;

            _context.AuditLogs.Add(
                new AuditLog
                {
                    EventType = "User Management",
                    Title = "User Approved",
                    Description =
                        $"User {user.Email} approved by administrator",
                    UserEmail = user.Email!,
                    EntityType = "User",
                    EntityId = user.Id,
                    Severity = "Success",
                    Source = "Admin"
                });

            await _context.SaveChangesAsync();

            var loginUrl =
                $"http://localhost:5173/send-code?email={user.Email}";

            var body = $@"
<h2>Your Verisq AI Trial is Approved 🎉</h2>
<p>Your account has been approved by the administrator.</p>
<p>You can login using the link below:</p>
<a href='{loginUrl}'>Login To Verisq AI</a>
";

            _ = Task.Run(async () =>
            {
                try
                {
                    await _emailService.SendEmailAsync(
                        user.Email!,
                        "Your Verisq AI Trial is Approved",
                        body
                    );
                }
                catch
                {
                    // Log email failure if needed
                }
            });

            return Ok(new
            {
                message =
                    "User approved successfully"
            });
        }

        // ==========================================
        // REJECT USER
        // ==========================================
        [HttpPost("{id}/reject")]
        public async Task<IActionResult> RejectUser(
    string id)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(
                    x => x.Id == id);

            if (user == null)
            {
                return NotFound(new
                {
                    message = "User not found"
                });
            }

            user.Status =
                UserStatus.Rejected;

            _context.AuditLogs.Add(
                new AuditLog
                {
                    EventType = "User Management",
                    Title = "User Rejected",
                    Description =
                        $"User {user.Email} rejected by administrator",
                    UserEmail = user.Email!,
                    EntityType = "User",
                    EntityId = user.Id,
                    Severity = "Warning",
                    Source = "Admin"
                });

            await _context.SaveChangesAsync();

            var body = $@"
<h2>Trial Request Rejected</h2>
<p>Your Verisq AI trial request has been reviewed.</p>
<p>Unfortunately, your request was not approved at this time.</p>
";

            _ = Task.Run(async () =>
            {
                try
                {
                    await _emailService.SendEmailAsync(
                        user.Email!,
                        "Verisq AI Trial Request Update",
                        body
                    );
                }
                catch
                {
                    // Log email failure if needed
                }
            });

            return Ok(new
            {
                message =
                    "User rejected successfully"
            });
        }

        // ==========================================
        // UPDATE USER
        // ==========================================
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(
            string id,
            [FromBody] UpdateUserRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(
                    x => x.Id == id);

            if (user == null)
            {
                return NotFound(new
                {
                    message = "User not found"
                });
            }

            user.FullName =
                request.FullName;

            user.CompanyName =
                request.CompanyName;

            user.CompanyDomain =
                request.CompanyDomain;

            user.MobilePhone =
                request.MobilePhone;

            await _context.SaveChangesAsync();

            _context.AuditLogs.Add(
    new AuditLog
    {
        EventType = "User Management",
        Title = "User Updated",
        Description =
            $"User {user.Email} updated by administrator",
        UserEmail = user.Email!,
        EntityType = "User",
        EntityId = user.Id,
        Severity = "Info",
        Source = "Admin"
    });

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "User updated successfully"
            });
        }

        // ==========================================
        // DELETE USER
        // ==========================================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(
            string id)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(
                    x => x.Id == id);

            if (user == null)
            {
                return NotFound(new
                {
                    message = "User not found"
                });
            }

            _context.Users.Remove(user);

            var email = user.Email;
            var userId = user.Id;

            await _context.SaveChangesAsync();

            _context.AuditLogs.Add(
    new AuditLog
    {
        EventType = "User Management",
        Title = "User Deleted",
        Description =
            $"User {email} deleted by administrator",
        UserEmail = email!,
        EntityType = "User",
        EntityId = userId,
        Severity = "Error",
        Source = "Admin"
    });

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "User deleted successfully"
            });
        }

        // ==========================================
        // USER STATS
        // ==========================================
        [HttpGet("stats")]
        public async Task<IActionResult> GetUserStats()
        {
            var totalUsers =
                await _context.Users.CountAsync();

            var approvedUsers =
                await _context.Users.CountAsync(
                    x => x.Status ==
                    UserStatus.Approved);

            var pendingUsers =
                await _context.Users.CountAsync(
                    x => x.Status ==
                    UserStatus.Pending);

            var rejectedUsers =
                await _context.Users.CountAsync(
                    x => x.Status ==
                    UserStatus.Rejected);

            return Ok(new
            {
                totalUsers,
                approvedUsers,
                pendingUsers,
                rejectedUsers
            });
        }
    }

    // ==========================================
    // DTO
    // ==========================================
    public class UpdateUserRequest
    {
        public string? FullName { get; set; }

        public string? CompanyName { get; set; }

        public string? CompanyDomain { get; set; }

        public string? MobilePhone { get; set; }
    }
}