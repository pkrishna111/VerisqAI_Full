using VerisqAI.API.Models;
using VerisqAI.API.Models.Enums;

namespace VerisqAI.API.Services
{
    public class DynamicScoringService
    {
        public ScoringResult Calculate(
            List<QuestionnaireResponse> responses,
            List<AssessmentQuestion> questions)
        {
            double earnedWeight = 0;
            double totalWeight = 0;

            var findings = new List<Finding>();

            foreach (var question in questions)
            {
                bool isScoredQuestion =
                    question.QuestionType == "YesNo" ||
                    question.QuestionType == "SingleSelect" ||
                    question.QuestionType == "MultiSelect";

                if (!isScoredQuestion)
                    continue;

                totalWeight += question.Weight;

                var response = responses.FirstOrDefault(r =>
                    r.AssessmentQuestionId == question.Id);

                if (response == null)
                    continue;

                var preferredOptions = question.Options
                    .Where(o => o.IsPreferredAnswer)
                    .Select(o => o.OptionText.Trim())
                    .ToList();

                if (!preferredOptions.Any())
                    continue;

                bool passed = false;

                // YES / NO + SINGLE SELECT
                if (
                    question.QuestionType == "YesNo" ||
                    question.QuestionType == "SingleSelect"
                )
                {
                    passed = preferredOptions.Any(p =>
                        string.Equals(
                            p,
                            response.Answer?.Trim(),
                            StringComparison.OrdinalIgnoreCase
                        ));

                    if (passed)
                    {
                        earnedWeight += question.Weight;
                    }
                    else
                    {
                        findings.Add(new Finding
                        {
                            Title = question.QuestionText,

                            Description =
                                $"Vendor response '{response.Answer}' does not match the preferred answer.",

                            Severity = ParseSeverity(
                                question.Severity
                            )
                        });
                    }
                }

                // MULTI SELECT
                else if (
                    question.QuestionType == "MultiSelect"
                )
                {
                    var selectedAnswers =
                        (response.Answer ?? "")
                        .Split(',', StringSplitOptions.RemoveEmptyEntries)
                        .Select(a => a.Trim())
                        .ToList();

                    int matchedCount =
                        preferredOptions.Count(p =>
                            selectedAnswers.Any(a =>
                                string.Equals(
                                    a,
                                    p,
                                    StringComparison.OrdinalIgnoreCase)));

                    double ratio =
                        (double)matchedCount /
                        preferredOptions.Count;

                    earnedWeight +=
                        question.Weight * ratio;

                    if (ratio < 1)
                    {
                        var missingOptions =
                            preferredOptions
                            .Where(p =>
                                !selectedAnswers.Any(a =>
                                    string.Equals(
                                        a,
                                        p,
                                        StringComparison.OrdinalIgnoreCase)))
                            .ToList();

                        findings.Add(new Finding
                        {
                            Title = question.QuestionText,

                            Description =
                                $"Missing preferred controls: {string.Join(", ", missingOptions)}",

                            Severity = ParseSeverity(
                                question.Severity
                            )
                        });
                    }
                }
            }

            int score = totalWeight == 0
                ? 0
                : (int)Math.Round(
                    earnedWeight / totalWeight * 100);

            int riskScore = 100 - score;

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

        private static FindingSeverity ParseSeverity(
            string? severity)
        {
            return severity?.ToLower() switch
            {
                "critical" => FindingSeverity.Critical,
                "high" => FindingSeverity.High,
                "medium" => FindingSeverity.Medium,
                _ => FindingSeverity.Low
            };
        }
    }
}