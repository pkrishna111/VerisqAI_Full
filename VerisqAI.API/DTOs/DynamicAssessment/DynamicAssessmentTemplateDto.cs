using System.Collections.Generic;

namespace VerisqAI.API.DTOs.DynamicAssessment
{
    public class DynamicAssessmentTemplateDto
    {
        public int TemplateId { get; set; }

        public string TemplateName { get; set; } = string.Empty;

        public string Version { get; set; } = string.Empty;

        public List<DynamicSectionDto> Sections { get; set; }
            = new();
    }
}