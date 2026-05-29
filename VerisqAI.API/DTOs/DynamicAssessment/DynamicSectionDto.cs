using System.Collections.Generic;

namespace VerisqAI.API.DTOs.DynamicAssessment
{
    public class DynamicSectionDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public int DisplayOrder { get; set; }

        public List<DynamicQuestionDto> Questions { get; set; }
            = new();
    }
}