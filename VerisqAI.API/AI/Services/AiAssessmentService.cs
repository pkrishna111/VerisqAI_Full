using System.Text.Json;
using VerisqAI.API.AI.Contracts;
using VerisqAI.API.AI.Models;
using VerisqAI.API.Data;
using VerisqAI.API.Models;

namespace VerisqAI.API.AI.Services
{
    public class AiAssessmentService
    {
        private readonly IAiProvider _aiProvider;
        private readonly ApplicationDbContext _context;

        public AiAssessmentService(
            IAiProvider aiProvider,
            ApplicationDbContext context)
        {
            _aiProvider = aiProvider;
            _context = context;
        }

        public async Task GenerateAndSaveInsightsAsync(
            Vendor vendor,
            Scorecard scorecard,
            List<Finding> findings,
            List<QuestionnaireResponse> responses)
        {
            var input =
                BuildAssessmentInput(
                    vendor,
                    scorecard,
                    findings,
                    responses);

            var aiResult =
                await _aiProvider
                    .GenerateAssessmentInsightsAsync(
                        input);

            await SaveInsightsAsync(
                scorecard,
                aiResult);
        }

        private AiAssessmentInput BuildAssessmentInput(
            Vendor vendor,
            Scorecard scorecard,
            List<Finding> findings,
            List<QuestionnaireResponse> responses)
        {
            return new AiAssessmentInput
            {
                VendorName =
                    vendor.Name,

                RiskScore =
    scorecard.RiskScore,

                RiskTier =
    scorecard.RiskTier,

                SecurityScore =
    scorecard.Score,

                Findings =
                    findings
                        .Select(f =>
                            $"{f.Title}: {f.Description}")
                        .ToList(),

                Responses =
                    responses.ToDictionary(
                        r => r.Question,
                        r => r.Answer)
            };
        }

        private async Task SaveInsightsAsync(
            Scorecard scorecard,
            AiAssessmentResult result)
        {
            var insight =
                new AiAssessmentInsight
                {
                    ScorecardId =
                        scorecard.Id,

                    ExecutiveSummary =
                        result.ExecutiveSummary,

                    RiskDriversJson =
                        JsonSerializer.Serialize(
                            result.RiskDrivers),

                    ConfidenceScore =
                        result.ConfidenceScore,

                    ModelName =
                        result.ModelName,

                    PromptVersion =
                        result.PromptVersion
                };

            _context.AiAssessmentInsights
                .Add(insight);

            var recommendations =
                result.Recommendations
                    .Select(r =>
                        new AiRecommendation
                        {
                            ScorecardId =
                                scorecard.Id,

                            Title =
                                r.Title,

                            Description =
                                r.Description,

                            Priority =
                                r.Priority,

                            Category =
                                r.Category,

                            Rationale =
                                r.Rationale
                        });

            _context.AiRecommendations
                .AddRange(recommendations);

            await _context.SaveChangesAsync();
        }
    }
}