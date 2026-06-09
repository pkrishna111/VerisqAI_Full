using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VerisqAI.API.Data;
using VerisqAI.API.Models;

namespace VerisqAI.API.Controllers
{
    [ApiController]
    [Route("api/admin/vendors")]
    public class AdminVendorsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


    public AdminVendorsController(
        ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // GET ALL VENDORS
        // ==========================================
        [HttpGet]
        public async Task<IActionResult> GetVendors()
        {
            var vendors = await _context.Vendors
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.Domain,
                    x.Email,
                    x.Status,
                    x.Score,
                    x.RiskScore,
                    x.RiskTier,
                    x.Findings,
                    x.QuestionnaireStatus,
                    x.CreatedAt,

                    QuestionnaireCount =
                        x.Questionnaires.Count(),

                    ScorecardCount =
                        x.Scorecards.Count(),

                    OwnerName =
                        x.User.FullName,

                    OwnerEmail =
                        x.User.Email
                })
                .OrderByDescending(
                    x => x.CreatedAt)
                .ToListAsync();

            return Ok(vendors);
        }

        // ==========================================
        // GET VENDOR BY ID
        // ==========================================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVendor(
            int id)
        {
            var vendor = await _context.Vendors
                .Where(x => x.Id == id)
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.Domain,
                    x.Email,
                    x.Status,
                    x.Score,
                    x.RiskScore,
                    x.RiskTier,
                    x.Findings,
                    x.QuestionnaireStatus,
                    x.CreatedAt,

                    QuestionnaireCount =
                        x.Questionnaires.Count(),

                    ScorecardCount =
                        x.Scorecards.Count(),

                    OwnerName =
                        x.User.FullName,

                    OwnerEmail =
                        x.User.Email
                })
                .FirstOrDefaultAsync();

            if (vendor == null)
            {
                return NotFound(new
                {
                    message =
                        "Vendor not found"
                });
            }

            return Ok(vendor);
        }

        // ==========================================
        // DELETE VENDOR
        // ==========================================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVendor(
 int id)
        {
            var vendor = await _context.Vendors
            .FirstOrDefaultAsync(
            x => x.Id == id);


if (vendor == null)
            {
                return NotFound(new
                {
                    message =
                        "Vendor not found"
                });
            }

            var vendorName =
                vendor.Name;

            var vendorId =
                vendor.Id;

            _context.Vendors.Remove(
                vendor);

            await _context.SaveChangesAsync();

            _context.AuditLogs.Add(
                new AuditLog
                {
                    EventType =
                        "Vendor Management",

                    Title =
                        "Vendor Deleted",

                    Description =
                        $"Vendor {vendorName} deleted by administrator",

                    EntityType =
                        "Vendor",

                    EntityId =
                        vendorId.ToString(),

                    Severity =
                        "Delete",

                    Source =
                        "Admin"
                });

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message =
                    "Vendor deleted successfully"
            });


}


        // ==========================================
        // VENDOR STATS
        // ==========================================
        [HttpGet("stats")]
        public async Task<IActionResult> GetVendorStats()
        {
            var totalVendors =
                await _context.Vendors.CountAsync();

            var completedVendors =
                await _context.Vendors.CountAsync(
                    x => x.Status == "Complete");

            var pendingVendors =
                await _context.Vendors.CountAsync(
                    x => x.Status == "Queued");

            var highRiskVendors =
                await _context.Vendors.CountAsync(
                    x => x.RiskTier >= 3);

            var questionnaires =
                await _context.Questionnaires
                    .CountAsync();

            var completedQuestionnaires =
                await _context.Questionnaires
                    .CountAsync(
                        x => x.Status == "Completed");

            var scorecards =
                await _context.Scorecards
                    .CountAsync();

            return Ok(new
            {
                totalVendors,
                completedVendors,
                pendingVendors,
                highRiskVendors,
                questionnaires,
                completedQuestionnaires,
                scorecards
            });
        }
    }


}
