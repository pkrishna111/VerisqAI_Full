using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using VerisqAI.API.Data;
using VerisqAI.API.Models;

namespace VerisqAI.API.Seed
{
    public static class DynamicAssessmentSeeder
    {
        public static async Task SeedAsync(
            ApplicationDbContext context,
            IServiceProvider services)
        {
            if (context.AssessmentTemplates.Any())
                return;

            var userManager =
                services.GetRequiredService<
                    UserManager<ApplicationUser>>();

            var adminUser =
                await userManager.Users
                    .FirstOrDefaultAsync();

            if (adminUser == null)
            {
                return;
            }

            var template = new AssessmentTemplate
            {
                Name = "Core Security Assessment",
                Description = "Default Verisq AI security questionnaire",
                Version = 1,
                UserId = adminUser.Id
            };

            var identitySection = new AssessmentSection
            {
                Title = "Identity Security",
                Description = "Identity and access management controls",
                DisplayOrder = 1
            };

            identitySection.Questions.Add(new AssessmentQuestion
            {
                QuestionKey = "mfa_enabled",
                QuestionText = "Do you enforce MFA for all employees?",
                QuestionType = "YesNo",
                Category = "Identity Security",
                Severity = "Critical",
                Weight = 20,
                DisplayOrder = 1
            });

            identitySection.Questions.Add(new AssessmentQuestion
            {
                QuestionKey = "sso_enabled",
                QuestionText = "Do you use Single Sign-On (SSO)?",
                QuestionType = "YesNo",
                Category = "Identity Security",
                Severity = "Medium",
                Weight = 10,
                DisplayOrder = 2
            });

            var networkSection = new AssessmentSection
            {
                Title = "Network Security",
                Description = "Network protection controls",
                DisplayOrder = 2
            };

            networkSection.Questions.Add(new AssessmentQuestion
            {
                QuestionKey = "firewall_enabled",
                QuestionText = "Do you maintain enterprise firewalls?",
                QuestionType = "YesNo",
                Category = "Network Security",
                Severity = "High",
                Weight = 15,
                DisplayOrder = 1
            });

            networkSection.Questions.Add(new AssessmentQuestion
            {
                QuestionKey = "encryption_enabled",
                QuestionText = "Is sensitive data encrypted at rest?",
                QuestionType = "YesNo",
                Category = "Data Protection",
                Severity = "Critical",
                Weight = 20,
                DisplayOrder = 2
            });

            networkSection.Questions.Add(new AssessmentQuestion
            {
                QuestionKey = "endpoint_protection",

                QuestionText = "Which endpoint protection solution do you use?",

                QuestionType = "SingleSelect",

                Category = "Endpoint Security",

                Severity = "High",

                Weight = 15,

                DisplayOrder = 3,

                Options = new List<AssessmentQuestionOption>
                {
                    new AssessmentQuestionOption
                    {
                        OptionText = "Microsoft Defender",
                        DisplayOrder = 1,
                        IsPreferredAnswer = true
                    },

                    new AssessmentQuestionOption
                    {
                        OptionText = "CrowdStrike",
                        DisplayOrder = 2,
                        IsPreferredAnswer = true
                    },

                    new AssessmentQuestionOption
                    {
                        OptionText = "SentinelOne",
                        DisplayOrder = 3,
                        IsPreferredAnswer = true
                    },

                    new AssessmentQuestionOption
                    {
                        OptionText = "No Endpoint Protection",
                        DisplayOrder = 4,
                        ScoreModifier = 20
                    }
                }
            });

            var complianceSection = new AssessmentSection
            {
                Title = "Compliance",
                Description = "Regulatory and compliance controls",
                DisplayOrder = 3
            };

            complianceSection.Questions.Add(new AssessmentQuestion
            {
                QuestionKey = "compliance_framework",
                QuestionText = "Which compliance frameworks do you follow?",
                QuestionType = "Text",
                Category = "Compliance",
                Severity = "Medium",
                Weight = 5,
                DisplayOrder = 1
            });

            template.Sections.Add(identitySection);
            template.Sections.Add(networkSection);
            template.Sections.Add(complianceSection);

            context.AssessmentTemplates.Add(template);

            await context.SaveChangesAsync();
        }
    }
}