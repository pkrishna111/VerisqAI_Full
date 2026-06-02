using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VerisqAI.API.AI.Services;
using VerisqAI.API.Data;
using VerisqAI.API.DTOs;
using VerisqAI.API.DTOs.DynamicAssessment;
using VerisqAI.API.Models;
using VerisqAI.API.Services;

namespace VerisqAI.API.Controllers
{
    [ApiController]
    [Route("api/questionnaire")]
    public class QuestionnaireController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly AiAssessmentService
            _aiAssessmentService;

        public QuestionnaireController(
            ApplicationDbContext context,
            AiAssessmentService aiAssessmentService)
        {
            _context = context;
            _aiAssessmentService =
                aiAssessmentService;
        }
        // get dynamic questionnaire
        [HttpGet("{token}")]
        public async Task<IActionResult> GetQuestions(string token)
        {
            var questionnaire = await _context.Questionnaires
                .FirstOrDefaultAsync(q => q.Token == token);

            if (questionnaire == null)
                return NotFound();

            if (questionnaire.AssessmentTemplateId <= 0)
            {
                return BadRequest(
                    "Questionnaire is not linked to a template.");
            }

            var template = await _context.AssessmentTemplates
                .Include(t => t.Sections)
                    .ThenInclude(s => s.Questions)
                        .ThenInclude(q => q.Options)
                .FirstOrDefaultAsync(t =>
                    t.Id == questionnaire.AssessmentTemplateId);

            if (template == null)
            {
                return NotFound("No active template found.");
            }

            var result = new DynamicAssessmentTemplateDto
            {
                TemplateId = template.Id,
                TemplateName = template.Name,
                Version = template.Version,

                Sections = template.Sections
                    .OrderBy(s => s.DisplayOrder)
                    .Select(section => new DynamicSectionDto
                    {
                        Id = section.Id,
                        Title = section.Title,
                        Description = section.Description,
                        DisplayOrder = section.DisplayOrder,

                        Questions = section.Questions
                            .Where(q => q.IsActive)
                            .OrderBy(q => q.DisplayOrder)
                            .Select(question => new DynamicQuestionDto
                            {
                                Id = question.Id,
                                QuestionKey = question.QuestionKey,
                                QuestionText = question.QuestionText,
                                QuestionType = question.QuestionType,
                                Category = question.Category,
                                Severity = question.Severity,
                                IsRequired = question.IsRequired,
                                DisplayOrder = question.DisplayOrder,
                                DependsOnQuestionKey =
                                    question.DependsOnQuestionKey,
                                DependsOnValue =
                                    question.DependsOnValue,
                                Options = question.Options
                                    .OrderBy(o => o.DisplayOrder)
                                    .Select(option => new DynamicQuestionOptionDto
                                    {
                                        Id = option.Id,
                                        OptionText = option.OptionText,
                                        DisplayOrder = option.DisplayOrder
                                    })
                                    .ToList()
                            })
                            .ToList()
                    })
                    .ToList()
            };

            return Ok(new
            {
                questionnaireId = questionnaire.Id,
                vendorId = questionnaire.VendorId,
                template = result
            });
        }

        [HttpGet("dynamic-template")]
        public async Task<ActionResult<DynamicAssessmentTemplateDto>> GetDynamicTemplate()
        {
            var template = await _context.AssessmentTemplates
                .Include(t => t.Sections)
                    .ThenInclude(s => s.Questions)
                        .ThenInclude(q => q.Options)
                .Where(t => t.IsActive)
                .OrderByDescending(t => t.CreatedAt)
                .FirstOrDefaultAsync();

            if (template == null)
            {
                return NotFound("No active assessment template found.");
            }

            var result = new DynamicAssessmentTemplateDto
            {
                TemplateId = template.Id,
                TemplateName = template.Name,
                Version = template.Version,
                Sections = template.Sections
                    .OrderBy(s => s.DisplayOrder)
                    .Select(section => new DynamicSectionDto
                    {
                        Id = section.Id,
                        Title = section.Title,
                        Description = section.Description,
                        DisplayOrder = section.DisplayOrder,

                        Questions = section.Questions
                            .Where(q => q.IsActive)
                            .OrderBy(q => q.DisplayOrder)
                            .Select(question => new DynamicQuestionDto
                            {
                                Id = question.Id,
                                QuestionKey = question.QuestionKey,
                                QuestionText = question.QuestionText,
                                QuestionType = question.QuestionType,
                                Category = question.Category,
                                Severity = question.Severity,
                                Weight = question.Weight,
                                IsRequired = question.IsRequired,
                                DisplayOrder = question.DisplayOrder,
                                DependsOnQuestionKey = question.DependsOnQuestionKey,
                                DependsOnValue = question.DependsOnValue,
                                Options = question.Options
                                    .OrderBy(o => o.DisplayOrder)
                                    .Select(option => new DynamicQuestionOptionDto
                                    {
                                        Id = option.Id,
                                        OptionText = option.OptionText,
                                        DisplayOrder = option.DisplayOrder,
                                        ScoreModifier = option.ScoreModifier,
                                        IsPreferredAnswer = option.IsPreferredAnswer
                                    })
                                    .ToList()
                            })
                            .ToList()
                    })
                    .ToList()
            };

            return Ok(result);
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
                QuestionnaireId = questionnaire.Id,

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

            var vendor = await _context.Vendors
                .FirstOrDefaultAsync(v =>
                    v.Id == questionnaire.VendorId);

            if (vendor != null)
            {
                try
                {
                    await _aiAssessmentService
                        .GenerateAndSaveInsightsAsync(
                            vendor,
                            scorecard,
                            result.Findings,
                            savedResponses);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(
                        $"AI insight generation failed: {ex.Message}");
                }
            }

            return Ok(new { message = "Submitted successfully" });
        }

        [HttpPost("dynamic-submit")]
        public async Task<IActionResult> SubmitDynamicAssessment(
    [FromBody] SubmitDynamicAssessmentDto dto)
        {
            if (dto == null || dto.Answers == null || !dto.Answers.Any())
            {
                return BadRequest("Assessment answers are required.");
            }

            var vendor = await _context.Vendors
                .FirstOrDefaultAsync(v => v.Id == dto.VendorId);

            if (vendor == null)
            {
                return NotFound("Vendor not found.");
            }

            // Complete existing questionnaire
            var questionnaire = await _context.Questionnaires
                .FirstOrDefaultAsync(q =>
                    q.Id == dto.QuestionnaireId);

            if (questionnaire == null)
            {
                return NotFound("Questionnaire not found.");
            }

            questionnaire.Status = "Completed";
            questionnaire.CompletedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // Load question definitions
            var questionIds = dto.Answers
                .Select(a => a.QuestionId)
                .ToList();

            var questions = await _context.AssessmentQuestions
                .Include(q => q.Options)
                .Where(q => questionIds.Contains(q.Id))
                .ToListAsync();

            // Create responses
            var responseEntities = dto.Answers.Select(answer =>
            {
                var question = questions
                    .FirstOrDefault(q => q.Id == answer.QuestionId);

                return new QuestionnaireResponse
                {
                    QuestionnaireId = questionnaire.Id,

                    // Legacy compatibility
                    Question = question?.QuestionText ?? "",
                    Answer = answer.Answer,

                    // Dynamic metadata
                    AssessmentQuestionId = question?.Id,
                    QuestionKey = question?.QuestionKey,
                    QuestionType = question?.QuestionType,
                    Category = question?.Category,
                    Severity = question?.Severity
                };
            }).ToList();

            _context.QuestionnaireResponses
                .AddRange(responseEntities);

            await _context.SaveChangesAsync();

            var scoringService =
                new DynamicScoringService();

            var scoringResult =
                scoringService.Calculate(
                    responseEntities,
                    questions
                );

            // Create scorecard
            var scorecard = new Scorecard
            {
                VendorId = vendor.Id,
                QuestionnaireId = questionnaire.Id,

                Score = scoringResult.Score,
                RiskScore = scoringResult.RiskScore,
                RiskTier = scoringResult.RiskTier,

                Status = "Complete"
            };

            _context.Scorecards.Add(scorecard);

            await _context.SaveChangesAsync();

            // Attach findings
            foreach (var finding in scoringResult.Findings)
            {
                finding.ScorecardId = scorecard.Id;
            }

            _context.Findings.AddRange(scoringResult.Findings);

            await _context.SaveChangesAsync();

            // AI generation
            try
            {
                await _aiAssessmentService
                    .GenerateAndSaveInsightsAsync(
                        vendor,
                        scorecard,
                        scoringResult.Findings,
                        responseEntities);
            }
            catch (Exception ex)
            {
                Console.WriteLine(
                    $"Dynamic AI generation failed: {ex.Message}");
            }

            return Ok(new
            {
                message = "Dynamic assessment submitted successfully",
                questionnaireId = questionnaire.Id,
                scorecardId = scorecard.Id
            });
        }
    }
}