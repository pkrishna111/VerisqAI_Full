using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using VerisqAI.API.Data;
using VerisqAI.API.Models.Enums;

namespace VerisqAI.API.Controllers
{
    [ApiController]
    [Route("api/admin/dashboard")]
    public class AdminDashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminDashboardController(
            ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            var totalUsers =
                await _context.Users.CountAsync();

            var approvedUsers =
                await _context.Users.CountAsync(
                    x => x.Status == UserStatus.Approved);

            var pendingUsers =
                await _context.Users.CountAsync(
                    x => x.Status == UserStatus.Pending);

            var totalVendors =
                await _context.Vendors.CountAsync();

            var totalQuestionnaires =
                await _context.Questionnaires.CountAsync();

            var completedQuestionnaires =
                await _context.Questionnaires.CountAsync(
                    x => x.Status == "Completed");

            var totalScorecards =
                await _context.Scorecards.CountAsync();

            var totalFindings =
                await _context.Findings.CountAsync();

            var criticalFindings =
                await _context.Findings.CountAsync(
                    x => x.Severity ==
                    FindingSeverity.Critical);

            return Ok(new
            {
                totalUsers,
                approvedUsers,
                pendingUsers,
                totalVendors,
                totalQuestionnaires,
                completedQuestionnaires,
                totalScorecards,
                totalFindings,
                criticalFindings
            });
        }

        [HttpGet("user-growth")]
        public async Task<IActionResult> GetUserGrowth()
        {
            var result = await _context.Users
                .GroupBy(x => x.CreatedAt.Month)
                .Select(g => new
                {
                    month = CultureInfo
                        .CurrentCulture
                        .DateTimeFormat
                        .GetAbbreviatedMonthName(g.Key),

                    users = g.Count()
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("vendor-risk")]
        public async Task<IActionResult> GetVendorRisk()
        {
            var lowRisk =
                await _context.Scorecards
                    .CountAsync(x => x.RiskTier == 1);

            var mediumRisk =
                await _context.Scorecards
                    .CountAsync(x => x.RiskTier == 2);

            var highRisk =
                await _context.Scorecards
                    .CountAsync(x => x.RiskTier == 3);

            return Ok(new[]
            {
                new
                {
                    name = "Low Risk",
                    value = lowRisk
                },
                new
                {
                    name = "Medium Risk",
                    value = mediumRisk
                },
                new
                {
                    name = "High Risk",
                    value = highRisk
                }
            });
        }

        [HttpGet("recent-activity")]
        public async Task<IActionResult> GetRecentActivity()
        {
            var activities =
                await _context.Scorecards
                    .OrderByDescending(x => x.CreatedAt)
                    .Take(10)
                    .Select(x => new
                    {
                        title = "Scorecard Generated",
                        description =
                            $"Vendor ID {x.VendorId}",
                        time = x.CreatedAt
                    })
                    .ToListAsync();

            return Ok(activities);
        }
    }
}