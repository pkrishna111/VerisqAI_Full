namespace VerisqAI.API.DTOs.AssessmentTemplate
{
    public class TemplateLibraryItemDto
    {
        public string Key { get; set; } = "";

        public string Name { get; set; } = "";

        public string Description { get; set; } = "";

        public int SectionCount { get; set; }

        public int QuestionCount { get; set; }
    }
}