using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using VerisqAI.API.Data;
using VerisqAI.API.DTOs.Vendor;
using VerisqAI.API.Models;
using VerisqAI.API.Services;

namespace VerisqAI.API.Controllers
{
    [Authorize(Roles = "User")]
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly Services.PdfService _pdfService;
        private readonly IEmailService _emailService;

        public DashboardController(ApplicationDbContext context, Services.PdfService pdfService, IEmailService emailService)
        {
            _context = context;
            _pdfService = pdfService;
            _emailService = emailService;
        }

        [HttpGet("vendors")]
        public async Task<IActionResult> GetVendors()
        {
            // Get logged-in user ID
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized("User not found.");

            // Step 1: get vendors
            var vendors = await _context.Vendors
                .Where(v => v.UserId == userId)
                .OrderByDescending(v => v.CreatedAt)
                .ToListAsync();

            // Step 2: get scorecards separately
            var vendorIds = vendors.Select(v => v.Id).ToList();

            var scorecards = await _context.Scorecards
                .Where(s => vendorIds.Contains(s.VendorId))
                .Include(s => s.Findings)
                .ToListAsync();

            // Step 2.1: get questionnaires
            var questionnaires = await _context.Questionnaires
                .Where(q => vendorIds.Contains(q.VendorId))
                .ToListAsync();

            // Step 3: map latest scorecard per vendor
            var result = vendors.Select(v =>
            {
                var latestScorecard = scorecards
                    .Where(s => s.VendorId == v.Id)
                    .OrderByDescending(s => s.CreatedAt)
                    .FirstOrDefault();

                // get latest questionnaire
                var latestQuestionnaire = questionnaires
                    .Where(q => q.VendorId == v.Id)
                    .OrderByDescending(q => q.SentAt)
                    .FirstOrDefault();

                string questionnaireStatus;

                if (latestQuestionnaire == null)
                {
                    questionnaireStatus = "Send";
                }
                else if (latestQuestionnaire.Status == "Completed")
                {
                    questionnaireStatus = "Completed";
                }
                else
                {
                    questionnaireStatus = "Pending";
                }

                return new
                {
                    id = v.Id,
                    name = v.Name,
                    domain = v.Domain,

                    status = latestScorecard != null ? latestScorecard.Status : "Queued",

                    score = latestScorecard?.Score,
                    riskScore = latestScorecard?.RiskScore,
                    criticalFindings = latestScorecard != null
                        ? latestScorecard.Findings.Count(f => f.Severity == VerisqAI.API.Models.Enums.FindingSeverity.Critical)
                        : 0,

                    highFindings = latestScorecard != null
                        ? latestScorecard.Findings.Count(f => f.Severity == VerisqAI.API.Models.Enums.FindingSeverity.High)
                        : 0,

                    mediumFindings = latestScorecard != null
                        ? latestScorecard.Findings.Count(f => f.Severity == VerisqAI.API.Models.Enums.FindingSeverity.Medium)
                        : 0,
                    tier = latestScorecard?.RiskTier != null
                        ? $"Tier {latestScorecard.RiskTier}"
                        : null,

                    questionnaire = questionnaireStatus
                };
            }).ToList();

            return Ok(result);
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
                Email = dto.Email,

                Status = "Queued",
                //QuestionnaireStatus = dto.SendQuestionnaire ? "Pending" : "Send"
            };

            _context.Vendors.Add(vendor);
            await _context.SaveChangesAsync();

            // 🔥 AUTO SEND QUESTIONNAIRE IF CHECKED
            if (dto.SendQuestionnaire)
            {
                if (!string.IsNullOrEmpty(dto.Email))
                {
                    var questionnaire = new Questionnaire
                    {
                        VendorId = vendor.Id,
                        ContactEmail = dto.Email,
                        Status = "Pending"
                    };

                    _context.Questionnaires.Add(questionnaire);
                    await _context.SaveChangesAsync();

                    var link = $"http://localhost:5173/questionnaire/{questionnaire.Token}";

                    await _emailService.SendQuestionnaireEmail(
                        dto.Email,
                        vendor.Name,
                        link
                    );
                }
            }

            return Ok(new
            {
                message = "Vendor added successfully"
            });
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetDashboardStats()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized("User not found.");

            // Step 1: get vendors
            var vendors = await _context.Vendors
                .Where(v => v.UserId == userId)
                .ToListAsync();

            var vendorIds = vendors.Select(v => v.Id).ToList();

            // Step 2: get scorecards
            var scorecards = await _context.Scorecards
                .Where(s => vendorIds.Contains(s.VendorId))
                .Include(s => s.Findings)
                .ToListAsync();

            // Step 3: calculations
            var totalVendors = vendors.Count;

            // count completed scorecards
            var scorecardsComplete = scorecards.Count(s => s.Status == "Complete");

            // ✅ Get latest scorecard per vendor
            var latestScorecards = vendors.Select(v =>
                scorecards
                    .Where(s => s.VendorId == v.Id)
                    .OrderByDescending(s => s.CreatedAt)
                    .FirstOrDefault()
            ).Where(s => s != null).ToList();

            var tierCounts = new
            {
                tier1 = latestScorecards.Count(s => s.RiskTier != null && s.RiskTier == 1),
                tier2 = latestScorecards.Count(s => s.RiskTier != null && s.RiskTier == 2),
                tier3 = latestScorecards.Count(s => s.RiskTier != null && s.RiskTier == 3),
                tier4 = latestScorecards.Count(s => s.RiskTier != null && s.RiskTier == 4)
            };

            // count high + critical only from latest
            var highFindings = latestScorecards
                .SelectMany(s => s.Findings)
                .Count(f => f.Severity == Models.Enums.FindingSeverity.High
                         || f.Severity == Models.Enums.FindingSeverity.Critical);
            
            // latest questionnaire per vendor
            var questionnaires = await _context.Questionnaires
                .Where(q => vendorIds.Contains(q.VendorId))
                .ToListAsync();

            var questionnairesPending = vendors.Count(v =>
            {
                var latest = questionnaires
                    .Where(q => q.VendorId == v.Id)
                    .OrderByDescending(q => q.SentAt)
                    .FirstOrDefault();

                return latest != null && latest.Status == "Pending";
            });

            return Ok(new
            {
                totalVendors,
                scorecardsComplete,
                highFindings,
                questionnairesPending,
                tierCounts
            });
        }

        [HttpPost("send-questionnaire/{vendorId}")]
        public async Task<IActionResult> SendQuestionnaire(int vendorId, [FromBody] SendQuestionnaireDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized();

            var vendor = await _context.Vendors
                .FirstOrDefaultAsync(v => v.Id == vendorId && v.UserId == userId);

            if (vendor == null)
                return NotFound();

            // get email from frontend
            string email = dto.Email;

            if (string.IsNullOrEmpty(email))
                return BadRequest("Email is required");

            // optionally store email
            vendor.Email = email;

            // check if already pending questionnaire exists
            var existingPending = await _context.Questionnaires
                .Where(q => q.VendorId == vendorId && q.Status == "Pending")
                .OrderByDescending(q => q.SentAt)
                .FirstOrDefaultAsync();

            if (existingPending != null)
            {
                return BadRequest("Questionnaire already pending for this vendor.");
            }

            var questionnaire = new Questionnaire
            {
                VendorId = vendorId,
                ContactEmail = email,
                Status = "Pending"
            };

            _context.Questionnaires.Add(questionnaire);

            await _context.SaveChangesAsync();

            var link = $"http://localhost:5173/questionnaire/{questionnaire.Token}";

            await _emailService.SendQuestionnaireEmail(
                email,
                vendor.Name,
                link
            );

            return Ok(new { message = "Questionnaire sent" });
        }

        [HttpGet("download-report/{vendorId}")]
        public async Task<IActionResult> DownloadReport(int vendorId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized("User not found.");

            var vendor = await _context.Vendors
                .FirstOrDefaultAsync(v => v.Id == vendorId && v.UserId == userId);

            if (vendor == null)
                return NotFound("Vendor not found.");

            // get latest scorecard
            var scorecard = await _context.Scorecards
                .Where(s => s.VendorId == vendorId)
                .OrderByDescending(s => s.CreatedAt)
                .FirstOrDefaultAsync();

            if (scorecard == null)
                return BadRequest("No scorecard found.");

            var findings = await _context.Findings
                .Where(f => f.ScorecardId == scorecard.Id)
                .ToListAsync();

            var pdfBytes = _pdfService.GenerateVendorReport(vendor, scorecard, findings);

            return File(pdfBytes, "application/pdf", $"{vendor.Name}_report.pdf");
        }

        [HttpGet("vendor/{id}")]
        public async Task<IActionResult> GetVendorDetails(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized();

            // vendor validation
            var vendor = await _context.Vendors
                .FirstOrDefaultAsync(v => v.Id == id && v.UserId == userId);

            if (vendor == null)
                return NotFound("Vendor not found.");

            // latest questionnaire
            var questionnaire = await _context.Questionnaires
                .Where(q => q.VendorId == id)
                .OrderByDescending(q => q.SentAt)
                .FirstOrDefaultAsync();

            // latest scorecard
            var scorecard = await _context.Scorecards
                .Where(s => s.VendorId == id)
                .OrderByDescending(s => s.CreatedAt)
                .FirstOrDefaultAsync();

            // findings
            var findings = new List<Finding>();

            if (scorecard != null)
            {
                findings = await _context.Findings
                    .Where(f => f.ScorecardId == scorecard.Id)
                    .ToListAsync();
            }

            // responses
            var responses = new List<QuestionnaireResponse>();

            if (questionnaire != null)
            {
                responses = await _context.QuestionnaireResponses
                    .Where(r => r.QuestionnaireId == questionnaire.Id)
                    .ToListAsync();
            }

            var result = new VendorDetailsDto
            {
                Vendor = new VendorInfoDto
                {
                    Id = vendor.Id,
                    Name = vendor.Name,
                    Domain = vendor.Domain,
                    Email = vendor.Email,
                    Status = scorecard?.Status ?? "Queued"
                },

                Assessment = questionnaire == null && scorecard == null
                    ? null
                    : new AssessmentDto
                    {
                        Questionnaire = questionnaire == null
                            ? null
                            : new QuestionnaireDto
                            {
                                Id = questionnaire.Id,
                                Status = questionnaire.Status,
                                SentAt = questionnaire.SentAt,
                                CompletedAt = questionnaire.CompletedAt
                            },

                        Scorecard = scorecard == null
                            ? null
                            : new ScorecardDto
                            {
                                Id = scorecard.Id,
                                Score = scorecard.Score,
                                RiskScore = scorecard.RiskScore,
                                RiskTier = scorecard.RiskTier,
                                CreatedAt = scorecard.CreatedAt
                            },

                        Findings = findings.Select(f => new FindingDto
                        {
                            Id = f.Id,
                            Title = f.Title,
                            Description = f.Description,
                            Severity = f.Severity.ToString()
                        }).ToList(),

                        Responses = responses.Select(r => new ResponseDto
                        {
                            Question = r.Question,
                            Answer = r.Answer
                        }).ToList()
                    }
            };

            return Ok(result);
        }

        [HttpGet("vendor/{vendorId}/findings")]
        public async Task<IActionResult> GetVendorFindings(int vendorId)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized();

            var vendor = await _context.Vendors
                .FirstOrDefaultAsync(v => v.Id == vendorId && v.UserId == userId);

            if (vendor == null)
                return NotFound();

            // get latest scorecard
            var scorecard = await _context.Scorecards
                .Where(s => s.VendorId == vendorId)
                .OrderByDescending(s => s.CreatedAt)
                .FirstOrDefaultAsync();

            if (scorecard == null)
                return Ok(new List<object>());

            // always fetch findings directly (like pdf)
            var findings = await _context.Findings
                .Where(f => f.ScorecardId == scorecard.Id)
                .Select(f => new
                {
                    f.Title,
                    f.Description,
                    f.Severity
                })
                .ToListAsync();

            return Ok(findings);
        }
    }
}
