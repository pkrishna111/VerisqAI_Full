using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using VerisqAI.API.Data;
using VerisqAI.API.DTOs.Vendor;
using VerisqAI.API.Models;

namespace VerisqAI.API.Controllers
{
    [Authorize(Roles = "User")]
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController:ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        //[HttpGet("vendors")]  //this method shows static dummy data/claims
        //public IActionResult GetVendors()
        //{
        //    var user = HttpContext.User.Identity?.Name;
        //    var claims = HttpContext.User.Claims;

        //    return Ok(new
        //    {
        //        message = "Protected Vendor Data",
        //        user,
        //        claims = claims.Select(c => new { c.Type, c.Value })
        //    });
        //    //return Ok("Protected Vendor Data");
        //}

        [HttpGet("vendors")]
        public async Task<IActionResult> GetVendors()
        {
            // Get logged-in user ID
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized("User not found.");

            // Fetch vendors for this user
            var vendors = await _context.Vendors
                .Where(v => v.UserId == userId)
                .OrderByDescending(v => v.CreatedAt)
                .Select(v => new
                {
                    id = v.Id,
                    name = v.Name,
                    domain = v.Domain,

                    // map status
                    status = v.Status,

                    // score data
                    score = v.Score,
                    riskScore = v.RiskScore,
                    findings = v.Findings,

                    // convert int → "Tier X"
                    tier = v.RiskTier != null ? $"Tier {v.RiskTier}" : null,

                    // questionnaire
                    questionnaire = v.QuestionnaireStatus
                })
                .ToListAsync();

            return Ok(vendors);
        }

        [HttpPost("add-vendor")]
        public async Task<IActionResult> AddVendor(AddVendorDto dto)
        {
            // Get logged-in user ID
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized("User not found.");

            // Check vendor limit (max 5)
            var vendorCount = await _context.Vendors
                .CountAsync(v => v.UserId == userId);

            if (vendorCount >= 5)
                return BadRequest("Vendor limit reached (max 5).");

            // Create vendor
            var vendor = new Vendor
            {
                UserId = userId,
                Name = dto.Name,
                Domain = dto.Domain,
                Status = "Queued",
                QuestionnaireStatus = "Send"
            };

            _context.Vendors.Add(vendor);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Vendor added successfully"
            });
        }
    }
}
