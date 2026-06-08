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

            var existingTemplateCount =
                await _context.AssessmentTemplates
                    .CountAsync(t =>
                        t.UserId == userId);

            if (existingTemplateCount >= 5)
            {
                return BadRequest(
                    "Free Trial allows maximum 5 templates."
                );
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

        [HttpPut("{templateId}")]
        public async Task<IActionResult> UpdateTemplate(
        int templateId,
        [FromBody] AssessmentTemplate dto)
        {
            var userId =
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier
                );

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }


            var template =
                await _context.AssessmentTemplates
                    .FirstOrDefaultAsync(t =>
                        t.Id == templateId &&
                        t.UserId == userId);

            if (template == null)
            {
                return NotFound("Template not found.");
            }

            if (!template.IsActive)
            {
                return BadRequest(
                    "Inactive templates cannot be edited."
                );
            }

            template.Name =
                dto.Name;

            template.Description =
                dto.Description;

            template.Version =
                dto.Version;

            template.IsActive =
                dto.IsActive;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message =
                    "Template updated successfully"
            });
        }

        [HttpDelete("{templateId}")]
        public async Task<IActionResult> DeleteTemplate(
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

            var template =
                await _context.AssessmentTemplates
                    .FirstOrDefaultAsync(t =>
                        t.Id == templateId &&
                        t.UserId == userId);

            if (template == null)
            {
                return NotFound("Template not found.");
            }

            var hasQuestionnaires =
                await _context.Questionnaires
                    .AnyAsync(q =>
                        q.AssessmentTemplateId ==
                        templateId);

            if (hasQuestionnaires)
            {
                template.IsActive = false;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    action = "deactivated",
                    message =
                        "Template has assessment history and was deactivated."
                });
            }

            _context.AssessmentTemplates
                .Remove(template);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                action = "deleted",
                message =
                    "Template deleted successfully."
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

            var existingQuestions =
                await _context.AssessmentQuestions
                    .Where(q =>
                        q.AssessmentSectionId == dto.SectionId)
                    .ToListAsync();

            foreach (var existingQuestion in existingQuestions)
            {
                existingQuestion.DisplayOrder++;
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

                DisplayOrder = 1,

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

        [HttpPost("question/{questionId}/duplicate")]
        public async Task<IActionResult> DuplicateQuestion(
    int questionId)
        {
            var originalQuestion =
                await _context.AssessmentQuestions
                    .Include(q => q.Options)
                    .FirstOrDefaultAsync(q =>
                        q.Id == questionId);

            if (originalQuestion == null)
            {
                return NotFound("Question not found.");
            }

            var sectionQuestions =
                await _context.AssessmentQuestions
                    .Where(q =>
                        q.AssessmentSectionId ==
                        originalQuestion.AssessmentSectionId)
                    .ToListAsync();

            foreach (var question in sectionQuestions)
            {
                question.DisplayOrder++;
            }

            string originalKey =
                originalQuestion.QuestionKey;

            if (originalKey.Length > 130)
            {
                originalKey =
                    originalKey.Substring(0, 130);
            }

            string baseKey =
                $"{originalKey}_copy";

            string newKey = baseKey;

            string newQuestionText =
                $"{originalQuestion.QuestionText} (Copy)";

            int counter = 1;

            while (
                await _context.AssessmentQuestions
                    .AnyAsync(q => q.QuestionKey == newKey)
            )
            {
                newKey =
                    $"{baseKey}{counter}";

                newQuestionText =
                    $"{originalQuestion.QuestionText} (Copy {counter})";

                counter++;
            }
            var duplicatedQuestion =
                new AssessmentQuestion
                {
                    AssessmentSectionId =
                        originalQuestion.AssessmentSectionId,

                    QuestionKey = newKey,

                    QuestionText = newQuestionText,

                    QuestionType =
                        originalQuestion.QuestionType,

                    Category =
                        originalQuestion.Category,

                    Weight =
                        originalQuestion.Weight,

                    Severity =
                        originalQuestion.Severity,

                    IsRequired =
                        originalQuestion.IsRequired,

                    IsActive =
                        originalQuestion.IsActive,

                    DependsOnQuestionKey =
                        originalQuestion.DependsOnQuestionKey,

                    DependsOnValue =
                        originalQuestion.DependsOnValue,

                    DisplayOrder = 1
                };

            _context.AssessmentQuestions
                .Add(duplicatedQuestion);

            await _context.SaveChangesAsync();

            foreach (var option in originalQuestion.Options)
            {
                _context.AssessmentQuestionOptions.Add(
                    new AssessmentQuestionOption
                    {
                        AssessmentQuestionId =
                            duplicatedQuestion.Id,

                        OptionText =
                            option.OptionText,

                        DisplayOrder =
                            option.DisplayOrder,

                        ScoreModifier =
                            option.ScoreModifier,

                        IsPreferredAnswer =
                            option.IsPreferredAnswer
                    });
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message =
                    "Question duplicated successfully",
                questionId =
                    duplicatedQuestion.Id
            });
        }

        [HttpPost("section/{sectionId}/duplicate")]
        public async Task<IActionResult> DuplicateSection(
    int sectionId)
        {
            var originalSection =
                await _context.AssessmentSections
                    .Include(s => s.Questions)
                        .ThenInclude(q => q.Options)
                    .FirstOrDefaultAsync(
                        s => s.Id == sectionId);

            if (originalSection == null)
            {
                return NotFound("Section not found.");
            }

            var templateSections =
                await _context.AssessmentSections
                    .Where(s =>
                        s.AssessmentTemplateId ==
                        originalSection.AssessmentTemplateId)
                    .ToListAsync();

            foreach (var section in templateSections)
            {
                section.DisplayOrder++;
            }

            string newSectionTitle =
                $"{originalSection.Title} (Copy)";

            int sectionCounter = 1;

            while (
                await _context.AssessmentSections
                    .AnyAsync(s =>
                        s.AssessmentTemplateId ==
                        originalSection.AssessmentTemplateId
                        &&
                        s.Title == newSectionTitle)
            )
            {
                newSectionTitle =
                    $"{originalSection.Title} (Copy {sectionCounter})";

                sectionCounter++;
            }

            var duplicatedSection =
                new AssessmentSection
                {
                    AssessmentTemplateId =
                        originalSection.AssessmentTemplateId,

                    Title = newSectionTitle,

                    Description =
                        originalSection.Description,

                    DisplayOrder = 1
                };

            _context.AssessmentSections
                .Add(duplicatedSection);

            await _context.SaveChangesAsync();

            foreach (
                var originalQuestion
                in originalSection.Questions
            )
            {
                string originalKey =
                    originalQuestion.QuestionKey;

                if (originalKey.Length > 130)
                {
                    originalKey =
                        originalKey.Substring(0, 130);
                }

                string baseKey =
                    $"{originalKey}_copy";

                string newKey = baseKey;

                int counter = 1;

                while (
                    await _context.AssessmentQuestions
                        .AnyAsync(q =>
                            q.QuestionKey == newKey)
                )
                {
                    newKey =
                        $"{baseKey}{counter}";

                    counter++;
                }

                var duplicatedQuestion =
                    new AssessmentQuestion
                    {
                        AssessmentSectionId =
                            duplicatedSection.Id,

                        QuestionKey = newKey,

                        QuestionText =
                            originalQuestion.QuestionText,

                        QuestionType =
                            originalQuestion.QuestionType,

                        Category =
                            originalQuestion.Category,

                        Weight =
                            originalQuestion.Weight,

                        Severity =
                            originalQuestion.Severity,

                        IsRequired =
                            originalQuestion.IsRequired,

                        IsActive =
                            originalQuestion.IsActive,

                        DisplayOrder =
                            originalQuestion.DisplayOrder,

                        DependsOnQuestionKey =
                            originalQuestion.DependsOnQuestionKey,

                        DependsOnValue =
                            originalQuestion.DependsOnValue
                    };

                _context.AssessmentQuestions
                    .Add(duplicatedQuestion);

                await _context.SaveChangesAsync();

                foreach (
                    var option
                    in originalQuestion.Options
                )
                {
                    _context.AssessmentQuestionOptions
                        .Add(
                            new AssessmentQuestionOption
                            {
                                AssessmentQuestionId =
                                    duplicatedQuestion.Id,

                                OptionText =
                                    option.OptionText,

                                DisplayOrder =
                                    option.DisplayOrder,

                                ScoreModifier =
                                    option.ScoreModifier,

                                IsPreferredAnswer =
                                    option.IsPreferredAnswer
                            });
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message =
                    "Section duplicated successfully"
            });
        }

        [HttpPost("{templateId}/duplicate")]
        public async Task<IActionResult> DuplicateTemplate(
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

            var templateCount =
                await _context.AssessmentTemplates
                    .CountAsync(t =>
            t.UserId == userId);

            if (templateCount >= 5)
            {
                return BadRequest(
                    "Free Trial allows maximum 5 templates."
                );
            }

            var originalTemplate =
                await _context.AssessmentTemplates
                    .Include(t => t.Sections)
                        .ThenInclude(s => s.Questions)
                            .ThenInclude(q => q.Options)
                    .FirstOrDefaultAsync(t =>
                        t.Id == templateId &&
                        t.UserId == userId);

            if (originalTemplate == null)
            {
                return NotFound("Template not found.");
            }

            string newTemplateName =
                $"{originalTemplate.Name} (Copy)";

            int templateCounter = 1;

            while (
                await _context.AssessmentTemplates
                    .AnyAsync(t =>
                        t.UserId == userId &&
                        t.Name == newTemplateName)
            )
            {
                newTemplateName =
                    $"{originalTemplate.Name} (Copy {templateCounter})";

                templateCounter++;
            }

            var duplicatedTemplate =
                new AssessmentTemplate
                {
                    Name = newTemplateName,

                    Description =
                        originalTemplate.Description,

                    Version =
                        originalTemplate.Version,

                    IsActive =
                        true,

                    UserId = userId,

                    CreatedAt =
                        DateTime.UtcNow
                };

            _context.AssessmentTemplates
                .Add(duplicatedTemplate);

            await _context.SaveChangesAsync();

            foreach (var originalSection in originalTemplate.Sections)
            {
                var duplicatedSection =
                    new AssessmentSection
                    {
                        AssessmentTemplateId =
                            duplicatedTemplate.Id,

                        Title =
                            originalSection.Title,

                        Description =
                            originalSection.Description,

                        DisplayOrder =
                            originalSection.DisplayOrder
                    };

                _context.AssessmentSections
                    .Add(duplicatedSection);

                await _context.SaveChangesAsync();

                foreach (var originalQuestion in originalSection.Questions)
                {
                    string originalKey =
                        originalQuestion.QuestionKey;

                    if (originalKey.Length > 130)
                    {
                        originalKey =
                            originalKey.Substring(0, 130);
                    }

                    string baseKey =
                        $"{originalKey}_copy";

                    string newKey = baseKey;

                    int counter = 1;

                    while (
                        await _context.AssessmentQuestions
                            .AnyAsync(q =>
                                q.QuestionKey == newKey)
                    )
                    {
                        newKey =
                            $"{baseKey}{counter}";

                        counter++;
                    }

                    var duplicatedQuestion =
                        new AssessmentQuestion
                        {
                            AssessmentSectionId =
                                duplicatedSection.Id,

                            QuestionKey = newKey,

                            QuestionText =
                                originalQuestion.QuestionText,

                            QuestionType =
                                originalQuestion.QuestionType,

                            Category =
                                originalQuestion.Category,

                            Weight =
                                originalQuestion.Weight,

                            Severity =
                                originalQuestion.Severity,

                            IsRequired =
                                originalQuestion.IsRequired,

                            IsActive =
                                originalQuestion.IsActive,

                            DisplayOrder =
                                originalQuestion.DisplayOrder,

                            DependsOnQuestionKey =
                                originalQuestion.DependsOnQuestionKey,

                            DependsOnValue =
                                originalQuestion.DependsOnValue
                        };

                    _context.AssessmentQuestions
                        .Add(duplicatedQuestion);

                    await _context.SaveChangesAsync();

                    foreach (var option in originalQuestion.Options)
                    {
                        _context.AssessmentQuestionOptions
                            .Add(
                                new AssessmentQuestionOption
                                {
                                    AssessmentQuestionId =
                                        duplicatedQuestion.Id,

                                    OptionText =
                                        option.OptionText,

                                    DisplayOrder =
                                        option.DisplayOrder,

                                    ScoreModifier =
                                        option.ScoreModifier,

                                    IsPreferredAnswer =
                                        option.IsPreferredAnswer
                                });
                    }

                    await _context.SaveChangesAsync();
                }
            }

            return Ok(new
            {
                message =
                    "Template duplicated successfully"
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

            if (!template.IsActive)
            {
                return BadRequest(
                    "This template has been deactivated. Create a copy to continue using it."
                );
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
                    .Include(t => t.Sections)
                    .ThenInclude(s => s.Questions)
                    .Where(t => t.UserId == userId)
                    .OrderByDescending(t => t.CreatedAt)
                    .ToListAsync();

            return Ok(templates);
        }
    }
}