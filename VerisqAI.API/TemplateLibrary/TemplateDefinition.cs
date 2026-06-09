namespace VerisqAI.API.TemplateLibrary
{
    public class TemplateDefinition
    {
        public string Key { get; set; } = "";

        public string Name { get; set; } = "";

        public string Description { get; set; } = "";

        public string Version { get; set; } = "1";

        public List<SectionDefinition> Sections { get; set; }
            = new();
    }

    public class SectionDefinition
    {
        public string Title { get; set; } = "";

        public string Description { get; set; } = "";

        public List<QuestionDefinition> Questions { get; set; }
            = new();
    }

    public class QuestionDefinition
    {
        public string QuestionText { get; set; } = "";

        public string QuestionType { get; set; } = "YesNo";

        public string Category { get; set; } = "";

        public string Severity { get; set; } = "Medium";

        public int Weight { get; set; } = 3;

        public bool IsRequired { get; set; } = true;

        public List<OptionDefinition> Options { get; set; }
            = new();
    }

    public class OptionDefinition
    {
        public string OptionText { get; set; } = "";

        public bool IsPreferredAnswer { get; set; }
    }
}
