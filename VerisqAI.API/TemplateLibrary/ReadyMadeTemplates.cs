
using System.Collections.Generic;
using System.Linq;

namespace VerisqAI.API.TemplateLibrary
{
    public static class ReadyMadeTemplates
    {
        public static List<TemplateDefinition> Templates => new()
        {
            VendorSecurityTemplate.Build(),
            Soc2LiteTemplate.Build(),
            Iso27001LiteTemplate.Build(),
            CloudSecurityTemplate.Build(),
            PrivacyTemplate.Build()
        };

        public static TemplateDefinition? Get(
            string key)
        {
            return Templates
                .FirstOrDefault(t =>
                    t.Key.ToLower() ==
                    key.ToLower());
        }

        private static TemplateDefinition VendorSecurityAssessment()
        {
            return new TemplateDefinition
            {
                Key = "vendor-security",

                Name = "Vendor Security Assessment",

                Description =
                    "Standard vendor security assessment template.",

                Version = 1,

                Sections = new()
                {
                    new SectionDefinition
                    {
                        Title = "Access Control",

                        Description =
                            "Identity and access management controls.",

                        Questions = new()
                        {
                            new QuestionDefinition
                            {
                                QuestionText =
                                    "Do you enforce multi-factor authentication for all users?",

                                QuestionType = "YesNo",

                                Category =
                                    "Identity & Access",

                                Severity = "High",

                                Weight = 7,

                                Options = new()
                                {
                                    new OptionDefinition
                                    {
                                        OptionText = "Yes",
                                        IsPreferredAnswer = true
                                    },
                                    new OptionDefinition
                                    {
                                        OptionText = "No"
                                    }
                                }
                            },

                            new QuestionDefinition
                            {
                                QuestionText =
                                    "Do you review privileged access regularly?",

                                QuestionType = "YesNo",

                                Category =
                                    "Identity & Access",

                                Severity = "High",

                                Weight = 7,

                                Options = new()
                                {
                                    new OptionDefinition
                                    {
                                        OptionText = "Yes",
                                        IsPreferredAnswer = true
                                    },
                                    new OptionDefinition
                                    {
                                        OptionText = "No"
                                    }
                                }
                            }
                        }
                    }
                }
            };
        }
    }
}
