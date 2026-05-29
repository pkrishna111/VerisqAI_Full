namespace VerisqAI.API.DTOs.AssessmentTemplate
{
    public class CreateSectionDto
    {
        public int TemplateId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public int DisplayOrder { get; set; }
    }
}