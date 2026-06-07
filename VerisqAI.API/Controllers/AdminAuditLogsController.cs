using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VerisqAI.API.Data;

namespace VerisqAI.API.Controllers
{
    [ApiController]
    [Route("api/admin/audit-logs")]
    public class AdminAuditLogsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminAuditLogsController(
            ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // GET ALL LOGS
        // ==========================================
        [HttpGet]
        public async Task<IActionResult> GetLogs()
        {
            var logs =
                await _context.AuditLogs
                .OrderByDescending(
                    x => x.CreatedAt)
                .ToListAsync();

            return Ok(logs);
        }

        // ==========================================
        // RECENT LOGS
        // ==========================================
        [HttpGet("recent")]
        public async Task<IActionResult>
            GetRecentLogs()
        {
            var logs =
                await _context.AuditLogs
                .OrderByDescending(
                    x => x.CreatedAt)
                .Take(20)
                .ToListAsync();

            return Ok(logs);
        }

        // ==========================================
        // DASHBOARD STATS
        // ==========================================
        [HttpGet("stats")]
        public async Task<IActionResult>
            GetStats()
        {
            var totalLogs =
                await _context.AuditLogs
                .CountAsync();

            var todayLogs =
                await _context.AuditLogs
                .CountAsync(
                    x =>
                    x.CreatedAt.Date ==
                    DateTime.UtcNow.Date);

            var userActions =
                await _context.AuditLogs
                .CountAsync(
                    x =>
                    x.EventType ==
                    "User Management");

            var aiActions =
                await _context.AuditLogs
                .CountAsync(
                    x =>
                    x.EventType ==
                    "AI Analysis");

            return Ok(new
            {
                totalLogs,
                todayLogs,
                userActions,
                aiActions
            });
        }

        // ==========================================
        // FILTER BY EVENT TYPE
        // ==========================================
        [HttpGet("event/{eventType}")]
        public async Task<IActionResult>
            GetByEventType(
                string eventType)
        {
            var logs =
                await _context.AuditLogs
                .Where(
                    x =>
                    x.EventType ==
                    eventType)
                .OrderByDescending(
                    x => x.CreatedAt)
                .ToListAsync();

            return Ok(logs);
        }

        // ==========================================
        // SEARCH
        // ==========================================
        [HttpGet("search")]
        public async Task<IActionResult>
            SearchLogs(
                [FromQuery] string query)
        {
            var logs =
                await _context.AuditLogs
                .Where(x =>
                    x.Title.Contains(query) ||
                    x.Description.Contains(query) ||
                    x.UserEmail.Contains(query))
                .OrderByDescending(
                    x => x.CreatedAt)
                .ToListAsync();

            return Ok(logs);
        }
    }
}