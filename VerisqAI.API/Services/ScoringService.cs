using VerisqAI.API.Models;
using VerisqAI.API.Models.Enums;

namespace VerisqAI.API.Services
{
    public class ScoringResult
    {
        public int Score { get; set; }
        public int RiskScore { get; set; }
        public int RiskTier { get; set; }
        public List<Finding> Findings { get; set; } = new();
    }

    public class QuestionRule
    {
        public string Question { get; set; }
        public string? QuestionKey { get; set; }
        public string ExpectedAnswer { get; set; }
        public int Weight { get; set; }

        public string FindingTitle { get; set; }
        public string FindingDescription { get; set; }
        public FindingSeverity Severity { get; set; }
    }

    public class ScoringService
    {
        private readonly List<QuestionRule> _rules = new()
        {
            new QuestionRule {
                Question = "Do you use HTTPS?",
                QuestionKey = "sso_enabled",
                ExpectedAnswer = "Yes",
                Weight = 10,
                FindingTitle = "No HTTPS",
                FindingDescription = "Data transmission is not secure.",
                Severity = FindingSeverity.High
            },
            new QuestionRule {
                Question = "Do you encrypt sensitive data?",
                QuestionKey = "encryption_enabled",
                ExpectedAnswer = "Yes",
                Weight = 10,
                FindingTitle = "No Data Encryption",
                FindingDescription = "Sensitive data is not encrypted.",
                Severity = FindingSeverity.Critical
            },
            new QuestionRule {
                Question = "Do you have firewall protection?",
                QuestionKey = "firewall_enabled",
                ExpectedAnswer = "Yes",
                Weight = 10,
                FindingTitle = "No Firewall",
                FindingDescription = "Network is exposed without firewall.",
                Severity = FindingSeverity.High
            },
            new QuestionRule {
                Question = "Do you perform regular backups?",
                QuestionKey = "firewall_enabled",
                ExpectedAnswer = "Yes",
                Weight = 10,
                FindingTitle = "No Backup Strategy",
                FindingDescription = "Risk of permanent data loss.",
                Severity = FindingSeverity.High
            },
            new QuestionRule {
                Question = "Do you use multi-factor authentication?",
                QuestionKey = "mfa_enabled",
                ExpectedAnswer = "Yes",
                Weight = 15,
                FindingTitle = "No MFA",
                FindingDescription = "Accounts are vulnerable to compromise.",
                Severity = FindingSeverity.Critical
            },
            new QuestionRule {
                Question = "Do you update software regularly?",
                QuestionKey = "mfa_enabled",
                ExpectedAnswer = "Yes",
                Weight = 10,
                FindingTitle = "Outdated Software",
                FindingDescription = "Systems may have known vulnerabilities.",
                Severity = FindingSeverity.High
            },
            new QuestionRule {
                Question = "Do you monitor system logs?",
                QuestionKey = "encryption_enabled",
                ExpectedAnswer = "Yes",
                Weight = 5,
                FindingTitle = "No Monitoring",
                FindingDescription = "Threat detection is weak.",
                Severity = FindingSeverity.Medium
            },
            new QuestionRule {
                Question = "Do you have access control policies?",
                QuestionKey = "sso_enabled",
                ExpectedAnswer = "Yes",
                Weight = 10,
                FindingTitle = "Weak Access Control",
                FindingDescription = "Unauthorized access risk.",
                Severity = FindingSeverity.High
            }
        };

        public ScoringResult Calculate(List<QuestionnaireResponse> responses)
        {
            int totalWeight = _rules.Sum(r => r.Weight);
            int riskScore = 0;
            int safeScore = 0;

            var findings = new List<Finding>();

            foreach (var rule in _rules)
            {
                var response = responses.FirstOrDefault(r =>

                    (!string.IsNullOrWhiteSpace(rule.QuestionKey) &&
                     r.QuestionKey == rule.QuestionKey)

                    ||

                    r.Question == rule.Question
                );

                if (response == null)
                    continue;

                if (response.Answer != rule.ExpectedAnswer)
                {
                    riskScore += rule.Weight;

                    findings.Add(new Finding
                    {
                        Title = rule.FindingTitle,
                        Description = rule.FindingDescription,
                        Severity = rule.Severity
                    });
                }
                else
                {
                    safeScore += rule.Weight;
                }
            }

            int score = (int)((double)safeScore / totalWeight * 100);

            int tier = score switch
            {
                >= 80 => 1,
                >= 60 => 2,
                >= 40 => 3,
                _ => 4
            };

            return new ScoringResult
            {
                Score = score,
                RiskScore = riskScore,
                RiskTier = tier,
                Findings = findings
            };
        }
    }
}