using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VerisqAI.API.Data;
using VerisqAI.API.DTOs;
using VerisqAI.API.Models;
using VerisqAI.API.Services;

namespace VerisqAI.API.Controllers
{
    [ApiController]
    [Route("api/questionnaire")]
    public class QuestionnaireController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuestionnaireController(ApplicationDbContext context)
        {
            _context = context;
        }

        // get questions
        [HttpGet("{token}")]
        public async Task<IActionResult> GetQuestions(string token)
        {
            var questionnaire = await _context.Questionnaires
                .FirstOrDefaultAsync(q => q.Token == token);

            if (questionnaire == null)
                return NotFound();

            var questions = new[]
            {
                "Do you use HTTPS?",
                "Do you encrypt sensitive data?",
                "Do you have firewall protection?",
                "Do you perform regular backups?",
                "Do you use multi-factor authentication?",
                "Do you update software regularly?",
                "Do you monitor system logs?",
                "Do you have access control policies?",
                "Describe your security policy",
                "Any known vulnerabilities?"
            };

            return Ok(new { questionnaireId = questionnaire.Id, questions });
        }

        // submit responses
        [HttpPost("submit")]
        public async Task<IActionResult> Submit([FromBody] List<SubmitQuestionnaireDto> responses)
        {
            if (responses == null || !responses.Any())
                return BadRequest();

            var questionnaireId = responses.First().QuestionnaireId;

            var questionnaire = await _context.Questionnaires
                .FirstOrDefaultAsync(q => q.Id == questionnaireId);

            if (questionnaire == null)
                return NotFound();

            // map DTO to entityt
            var entities = responses.Select(r => new QuestionnaireResponse
            {
                QuestionnaireId = r.QuestionnaireId,
                Question = r.Question,
                Answer = r.Answer
            }).ToList();

            _context.QuestionnaireResponses.AddRange(entities);

            questionnaire.Status = "Completed";
            questionnaire.CompletedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // get responses for scoring
            var savedResponses = await _context.QuestionnaireResponses
                .Where(r => r.QuestionnaireId == questionnaireId)
                .ToListAsync();

            // Calculate score
            var scoringService = new ScoringService();
            var result = scoringService.Calculate(savedResponses);

            // Create Scorecard
            var scorecard = new Scorecard
            {
                VendorId = questionnaire.VendorId,
                Score = result.Score,
                RiskScore = result.RiskScore,
                RiskTier = result.RiskTier,
                Status = "Complete"
            };

            _context.Scorecards.Add(scorecard);
            await _context.SaveChangesAsync(); // needed to get ScorecardId

            // attach Findings
            foreach (var finding in result.Findings)
            {
                finding.ScorecardId = scorecard.Id;
            }

            _context.Findings.AddRange(result.Findings);

            // save Findings
            await _context.SaveChangesAsync();

            return Ok(new { message = "Submitted successfully" });
        }
    }
}