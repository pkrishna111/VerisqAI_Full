using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Verisq.API.DTOs.AssessmentTemplate;
using VerisqAI.API.Data;
using VerisqAI.API.DTOs.AssessmentTemplate;
using VerisqAI.API.Models;

namespace VerisqAI.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class AssessmentTemplateController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AssessmentTemplateController(
            ApplicationDbContext context)
        {
            _context = context;
        }

        // Create new template
        [HttpPost]
        public async Task<IActionResult> CreateTemplate(
            [FromBody] AssessmentTemplate template)
        {
            if (string.IsNullOrWhiteSpace(template.Name))
            {
                return BadRequest(
                    "Template name is required."
                );
            }

            var userId =
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier
                );

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            template.CreatedAt = DateTime.UtcNow;

            template.UserId = userId;

            _context.AssessmentTemplates.Add(template);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Template created successfully",
                templateId = template.Id
            });
        }

        // Create section
        [HttpPost("section")]
        public async Task<IActionResult> CreateSection(
            [FromBody] CreateSectionDto dto)
        {
            var template = await _context.AssessmentTemplates
                .FindAsync(dto.TemplateId);

            if (template == null)
            {
                return NotFound("Template not found.");
            }

            var section = new AssessmentSection
            {
                AssessmentTemplateId = dto.TemplateId,

                Title = dto.Title,

                Description = dto.Description,

                DisplayOrder = dto.DisplayOrder
            };

            _context.AssessmentSections.Add(section);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Section created successfully",
                sectionId = section.Id
            });
        }

        // Update section
        [HttpPut("section/{sectionId}")]
        public async Task<IActionResult> UpdateSection(
            int sectionId,
            [FromBody] CreateSectionDto dto)
        {
            var section =
                await _context.AssessmentSections
                    .FirstOrDefaultAsync(s =>
                        s.Id == sectionId);

            if (section == null)
            {
                return NotFound("Section not found.");
            }

            section.Title = dto.Title;

            section.Description =
                dto.Description;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message =
                    "Section updated successfully"
            });
        }

        // Delete section
        [HttpDelete("section/{sectionId}")]
        public async Task<IActionResult> DeleteSection(
            int sectionId)
        {
            var section =
                await _context.AssessmentSections
                    .Include(s => s.Questions)
                        .ThenInclude(q => q.Options)
                    .FirstOrDefaultAsync(s =>
                        s.Id == sectionId);

            if (section == null)
            {
                return NotFound("Section not found.");
            }

            _context.AssessmentSections
                .Remove(section);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Section deleted successfully"
            });
        }

        // Create question
        [HttpPost("question")]
        public async Task<IActionResult> CreateQuestion(
            [FromBody] CreateQuestionDto dto)
        {
            var section = await _context.AssessmentSections
                .FindAsync(dto.SectionId);

            if (section == null)
            {
                return NotFound("Section not found.");
            }

            var existingKey =
                await _context.AssessmentQuestions
                    .AnyAsync(q =>
                        q.QuestionKey == dto.QuestionKey);

            if (existingKey)
            {
                return BadRequest(
                    "Question key already exists."
                );
            }

            var question = new AssessmentQuestion
            {
                AssessmentSectionId = dto.SectionId,

                QuestionKey = dto.QuestionKey,

                QuestionText = dto.QuestionText,

                QuestionType = dto.QuestionType,

                Category = dto.Category,

                Severity = dto.Severity,

                Weight = dto.Weight,

                IsRequired = dto.IsRequired,

                DisplayOrder = dto.DisplayOrder,

                DependsOnQuestionKey =
                    dto.DependsOnQuestionKey,

                DependsOnValue =
                    dto.DependsOnValue
            };

            _context.AssessmentQuestions.Add(question);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Question created successfully",
                questionId = question.Id
            });
        }

        // Update question
        [HttpPut("question/{questionId}")]
        public async Task<IActionResult> UpdateQuestion(
            int questionId,
            [FromBody] UpdateQuestionDto dto)
        {
            var question = await _context.AssessmentQuestions
                .FirstOrDefaultAsync(q => q.Id == questionId);

            if (question == null)
            {
                return NotFound("Question not found.");
            }

            question.QuestionText = dto.QuestionText;

            question.QuestionKey = dto.QuestionKey;

            question.QuestionType = dto.QuestionType;

            question.Category = dto.Category;

            question.Weight = dto.Weight;

            question.Severity = dto.Severity;

            question.IsRequired = dto.IsRequired;

            question.DependsOnQuestionKey =
                dto.DependsOnQuestionKey;

            question.DependsOnValue =
                dto.DependsOnValue;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Question updated successfully"
            });
        }

        // Create question option
        [HttpPost("question-option")]
        public async Task<IActionResult> CreateQuestionOption(
            [FromBody] CreateQuestionOptionDto dto)
        {
            var question =
                await _context.AssessmentQuestions
                    .FindAsync(dto.QuestionId);

            if (question == null)
            {
                return NotFound("Question not found.");
            }

            var option = new AssessmentQuestionOption
            {
                AssessmentQuestionId = dto.QuestionId,

                OptionText = dto.OptionText,

                DisplayOrder = dto.DisplayOrder,

                ScoreModifier = dto.ScoreModifier,

                IsPreferredAnswer =
                    dto.IsPreferredAnswer
            };

            _context.AssessmentQuestionOptions
                .Add(option);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Option created successfully",
                optionId = option.Id
            });
        }

        // Update question option
        [HttpPut("question-option/{optionId}")]
        public async Task<IActionResult> UpdateQuestionOption(
            int optionId,
            [FromBody] UpdateQuestionOptionDto dto)
        {
            var option =
                await _context.AssessmentQuestionOptions
                    .Include(o => o.AssessmentQuestion)
                    .Include(o => o.AssessmentQuestion.Options)
                    .FirstOrDefaultAsync(o => o.Id == optionId);

            if (option == null)
            {
                return NotFound("Option not found.");
            }

            var questionType =
                option.AssessmentQuestion.QuestionType;

            var allowsMultiplePreferred =
                questionType == "MultiSelect";

            if (
                dto.IsPreferredAnswer &&
                !allowsMultiplePreferred
            )
            {

                var existingPreferred =
                    option.AssessmentQuestion.Options
                        .Any(o =>
                            o.Id != optionId &&
                            o.IsPreferredAnswer
                        );

                if (existingPreferred)
                {
                    return BadRequest(
                        "Only one preferred answer is allowed for this question type."
                    );
                }
            }

            option.OptionText = dto.OptionText;

            option.IsPreferredAnswer =
                dto.IsPreferredAnswer;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Option updated successfully"
            });
        }

        // Delete question
        [HttpDelete("question/{questionId}")]
        public async Task<IActionResult> DeleteQuestion(
            int questionId)
        {
            var question =
                await _context.AssessmentQuestions
                    .FirstOrDefaultAsync(q => q.Id == questionId);

            if (question == null)
            {
                return NotFound("Question not found.");
            }

            _context.AssessmentQuestions
                .Remove(question);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Question deleted successfully"
            });
        }

        // Delete question option
        [HttpDelete("question-option/{optionId}")]
        public async Task<IActionResult> DeleteQuestionOption(
            int optionId)
        {
            var option =
                await _context.AssessmentQuestionOptions
                    .FirstOrDefaultAsync(o => o.Id == optionId);

            if (option == null)
            {
                return NotFound("Option not found.");
            }

            _context.AssessmentQuestionOptions
                .Remove(option);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Option deleted successfully"
            });
        }

        // Reorder sections
        [HttpPut("{templateId}/reorder-sections")]
        public async Task<IActionResult> ReorderSections(
            int templateId,
            [FromBody] ReorderSectionsDto dto)
        {
            var sections =
                await _context.AssessmentSections
                    .Where(s =>
                        s.AssessmentTemplateId == templateId)
                    .ToListAsync();

            if (!sections.Any())
            {
                return NotFound(
                    "No sections found for this template."
                );
            }

            for (int i = 0; i < dto.SectionIds.Count; i++)
            {
                var section =
                    sections.FirstOrDefault(s =>
                        s.Id == dto.SectionIds[i]);

                if (section != null)
                {
                    section.DisplayOrder = i + 1;
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Sections reordered successfully"
            });
        }
        // Reorder questions
        [HttpPut("section/{sectionId}/reorder-questions")]
        public async Task<IActionResult> ReorderQuestions(
            int sectionId,
            [FromBody] ReorderQuestionsDto dto)
        {
            var questions =
                await _context.AssessmentQuestions
                    .Where(q =>
                        q.AssessmentSectionId == sectionId)
                    .ToListAsync();

            if (!questions.Any())
            {
                return NotFound(
                    "No questions found for this section."
                );
            }

            for (int i = 0; i < dto.QuestionIds.Count; i++)
            {
                var question =
                    questions.FirstOrDefault(q =>
                        q.Id == dto.QuestionIds[i]);

                if (question != null)
                {
                    question.DisplayOrder = i + 1;
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message =
                    "Questions reordered successfully"
            });
        }

        // Get full template
        [HttpGet("{templateId}")]
        public async Task<IActionResult> GetTemplate(
    int templateId)
        {
            var userId =
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier
                );

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var template = await _context.AssessmentTemplates

                .Include(t => t.Sections
                    .OrderBy(s => s.DisplayOrder))

                    .ThenInclude(s => s.Questions
                        .OrderBy(q => q.DisplayOrder))

                        .ThenInclude(q => q.Options
                            .OrderBy(o => o.DisplayOrder))

                .FirstOrDefaultAsync(t =>
                    t.Id == templateId &&
                    t.UserId == userId);

            if (template == null)
            {
                return NotFound("Template not found.");
            }

            return Ok(template);
        }

        // Get all templates
        [HttpGet]
        public async Task<IActionResult> GetTemplates()
        {
            var userId =
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier
                );

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var templates =
                await _context.AssessmentTemplates
                    .Where(t => t.UserId == userId)
                    .OrderByDescending(t => t.CreatedAt)
                    .ToListAsync();

            return Ok(templates);
        }
    }
}