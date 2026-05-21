using VerisqAI.API.AI.Models;

namespace VerisqAI.API.AI.Contracts
{
    public interface IAiProvider
    {
        Task<AiAssessmentResult> GenerateAssessmentInsightsAsync(
            AiAssessmentInput input);
    }
}