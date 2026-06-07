using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VerisqAI.API.Data;

namespace VerisqAI.API.Controllers
{
    [ApiController]
    [Route("api/admin/ai-monitoring")]
    public class AdminAiMonitoringController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminAiMonitoringController(
            ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // DASHBOARD STATS
        // ==========================================
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var totalRequests =
                await _context.AiExecutionAudits
                    .CountAsync();

            var successfulRequests =
                await _context.AiExecutionAudits
                    .CountAsync(
                        x => x.Success);

            var failedRequests =
                await _context.AiExecutionAudits
                    .CountAsync(
                        x => !x.Success);

            var averageResponseTime =
     (
         await _context.AiExecutionAudits
             .AverageAsync(
                 x => (double?)x.DurationMs)
         ?? 0
     ) / 1000;

            var successRate =
                totalRequests == 0
                ? 0
                : Math.Round(
                    (double)successfulRequests /
                    totalRequests * 100,
                    2);

            return Ok(new
            {
                totalRequests,
                successfulRequests,
                failedRequests,
                successRate,
                averageConfidence = 100,
                averageResponseTime
            });
        }

        // ==========================================
        // RECENT ACTIVITY
        // ==========================================
        [HttpGet("activity")]
        public async Task<IActionResult> GetActivity()
        {
            var result =
                await _context.AiExecutionAudits
                .OrderByDescending(
                    x => x.ExecutedAt)
                .Take(100)
                .Select(x => new
                {
                    id = x.Id,
                    operation = x.OperationType,
                    modelName = x.ModelName,
                    totalTokens = x.TotalTokens,
                    responseTimeSeconds =
                        Math.Round(
                            x.DurationMs / 1000.0,
                            2),
                    status =
                        x.Success
                        ? "Success"
                        : "Failed",
                    createdAt =
                        x.ExecutedAt
                })
                .ToListAsync();

            return Ok(result);
        }

        // ==========================================
        // MODEL USAGE
        // ==========================================
        [HttpGet("model-usage")]
        public async Task<IActionResult>
            GetModelUsage()
        {
            var result =
                await _context.AiExecutionAudits
                .GroupBy(
                    x => x.ModelName)
                .Select(g => new
                {
                    model = g.Key,
                    count = g.Count()
                })
                .ToListAsync();

            return Ok(result);
        }

        // ==========================================
        // PROCESSING VOLUME
        // ==========================================
        [HttpGet("processing-volume")]
        public async Task<IActionResult>
            GetProcessingVolume()
        {
            var result =
                await _context.AiExecutionAudits
                .GroupBy(
                    x => x.ExecutedAt.Date)
                .Select(g => new
                {
                    date = g.Key,
                    requests = g.Count()
                })
                .OrderBy(
                    x => x.date)
                .ToListAsync();

            return Ok(result);
        }

        // ==========================================
        // FAILED REQUESTS
        // ==========================================
        [HttpGet("failed-requests")]
        public async Task<IActionResult>
            GetFailedRequests()
        {
            var result =
                await _context.AiExecutionAudits
                .Where(
                    x => !x.Success)
                .OrderByDescending(
                    x => x.ExecutedAt)
                .Select(x => new
                {
                    id = x.Id,
                    operation = x.OperationType,
                    modelName = x.ModelName,
                    errorMessage = x.ErrorMessage,
                    createdAt = x.ExecutedAt
                })
                .Take(50)
                .ToListAsync();

            return Ok(result);
        }
    }
}