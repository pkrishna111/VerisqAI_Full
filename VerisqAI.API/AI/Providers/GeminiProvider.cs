using System.Diagnostics;
using System.Text;
using System.Text.Json;
using VerisqAI.API.AI.Contracts;
using VerisqAI.API.AI.Models;
using VerisqAI.API.AI.Prompts;
using VerisqAI.API.Data;
using VerisqAI.API.Models;

namespace VerisqAI.API.AI.Providers
{
    public class GeminiProvider : IAiProvider
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        private readonly HttpClient _httpClient;

        public GeminiProvider(
            IConfiguration configuration,
            ApplicationDbContext context,
            HttpClient httpClient)
        {
            _configuration = configuration;
            _context = context;
            _httpClient = httpClient;
            _httpClient.Timeout = TimeSpan.FromSeconds(45);
        }

        public async Task<AiAssessmentResult> GenerateAssessmentInsightsAsync(AiAssessmentInput input)
        {
            var stopwatch = Stopwatch.StartNew();

            var settings =
                _configuration
                    .GetSection("Gemini")
                    .Get<GeminiSettings>();

            if (settings == null ||
                string.IsNullOrWhiteSpace(
                    settings.ApiKey))
            {
                throw new Exception(
                    "Gemini configuration missing.");
            }

            try
            {
                var inputJson =
                    JsonSerializer.Serialize(
                        input,
                        new JsonSerializerOptions
                        {
                            WriteIndented = true
                        });

                var prompt =
                    AiPromptTemplates
                        .AssessmentInsightsPrompt
                        .Replace(
                            "{{INPUT}}",
                            inputJson);

                var requestBody = new
                {
                    contents = new[]
                    {
                        new
                        {
                            parts = new[]
                            {
                                new
                                {
                                    text = prompt
                                }
                            }
                        }
                    },
                    generationConfig = new
                    {
                        temperature =
                            settings.Temperature,
                        responseMimeType =
                            "application/json"
                    }
                };

                var requestJson =
                    JsonSerializer.Serialize(
                        requestBody);

                var response =
                    await ExecuteWithRetryAsync(
                        () => _httpClient.PostAsync(
                            $"https://generativelanguage.googleapis.com/v1beta/models/{settings.Model}:generateContent?key={settings.ApiKey}",
                            new StringContent(
                                requestJson,
                                Encoding.UTF8,
                                "application/json")));

                var responseContent =
                    await response.Content
                        .ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    var errorBody =
                        await response.Content
                            .ReadAsStringAsync();

                    throw new Exception(
                        $"Gemini API Error: " +
                        $"{response.StatusCode} - " +
                        $"{errorBody}");
                }

                using var document =
                    JsonDocument.Parse(
                        responseContent);

                var text =
                    document
                        .RootElement
                        .GetProperty("candidates")[0]
                        .GetProperty("content")
                        .GetProperty("parts")[0]
                        .GetProperty("text")
                        .GetString();

                if (string.IsNullOrWhiteSpace(text))
                {
                    throw new Exception(
                        "Gemini returned empty response.");
                }

                var sanitizedJson =
    SanitizeJsonResponse(text);

                AiAssessmentResult? result = null;

                try
                {
                    result =
                        JsonSerializer.Deserialize<
                            AiAssessmentResult>(
                                sanitizedJson,
                                new JsonSerializerOptions
                                {
                                    PropertyNameCaseInsensitive = true
                                });
                }
                catch (Exception ex)
                {
                    throw new Exception(
                        $"AI response parsing failed. " +
                        $"Sanitized response: {sanitizedJson}. " +
                        $"Error: {ex.Message}");
                }

                if (result == null)
                {
                    throw new Exception(
                        "Failed to parse Gemini response.");
                }

                if (string.IsNullOrWhiteSpace(
        result.ExecutiveSummary))
                {
                    throw new Exception(
                        "AI response missing executive summary.");
                }

                if (result.Recommendations == null)
                {
                    result.Recommendations =
                        new List<AiRecommendationItem>();
                }

                if (result.RiskDrivers == null)
                {
                    result.RiskDrivers =
                        new List<string>();
                }

                stopwatch.Stop();

                await SaveAuditAsync(
                    settings,
                    true,
                    null,
                    stopwatch.ElapsedMilliseconds);

                result.ModelName =
                    settings.Model;

                result.PromptVersion = "v1";

                return result;
            }
            catch (Exception ex)
            {
                stopwatch.Stop();

                await SaveAuditFailureAsync(
                    settings?.Model ?? "unknown",
                    ex.Message,
                    stopwatch.ElapsedMilliseconds);

                throw;
            }
        }

        private string SanitizeJsonResponse(
    string response)
        {
            if (string.IsNullOrWhiteSpace(response))
            {
                return string.Empty;
            }

            response = response.Trim();

            // remove markdown fences
            response = response
                .Replace("```json", "")
                .Replace("```", "")
                .Trim();

            // find first JSON object
            var firstBrace = response.IndexOf('{');

            var lastBrace = response.LastIndexOf('}');

            if (firstBrace >= 0 &&
                lastBrace > firstBrace)
            {
                response = response.Substring(
                    firstBrace,
                    lastBrace - firstBrace + 1
                );
            }

            if (!response.StartsWith("{") ||
    !response.EndsWith("}"))
            {
                throw new Exception(
                    "AI response does not contain valid JSON object.");
            }

            return response.Trim();
        }

        private async Task<HttpResponseMessage>
    ExecuteWithRetryAsync(
        Func<Task<HttpResponseMessage>> operation)
        {
            const int maxRetries = 3;

            for (int attempt = 1;
                 attempt <= maxRetries;
                 attempt++)
            {
                try
                {
                    var response = await operation();

                    // retry only transient failures
                    if ((int)response.StatusCode >= 500 ||
                        response.StatusCode ==
                        System.Net.HttpStatusCode.TooManyRequests)
                    {
                        if (attempt == maxRetries)
                        {
                            return response;
                        }

                        await Task.Delay(
                            TimeSpan.FromSeconds(
                                Math.Pow(2, attempt)));

                        continue;
                    }

                    return response;
                }
                catch (HttpRequestException)
                {
                    if (attempt == maxRetries)
                    {
                        throw;
                    }

                    await Task.Delay(
                        TimeSpan.FromSeconds(
                            Math.Pow(2, attempt)));
                }
                catch (TaskCanceledException)
                {
                    if (attempt == maxRetries)
                    {
                        throw new Exception(
                            "Gemini request timed out.");
                    }

                    await Task.Delay(
                        TimeSpan.FromSeconds(
                            Math.Pow(2, attempt)));
                }
            }

            throw new Exception(
                "Gemini retry execution failed.");
        }

        private async Task SaveAuditAsync(
            GeminiSettings settings,
            bool success,
            string? error,
            long durationMs)
        {
            var audit =
                new AiExecutionAudit
                {
                    ModelName =
                        settings.Model,

                    OperationType =
                        "AssessmentInsights",

                    PromptVersion =
                        "v1",

                    Temperature =
                        settings.Temperature,

                    Success =
                        success,

                    ErrorMessage =
                        error,

                    DurationMs =
                        durationMs
                };

            _context.AiExecutionAudits.Add(audit);

            await _context.SaveChangesAsync();
        }

        private async Task SaveAuditFailureAsync(
            string model,
            string error,
            long durationMs)
        {
            var audit =
                new AiExecutionAudit
                {
                    ModelName = model,
                    OperationType =
                        "AssessmentInsights",
                    PromptVersion = "v1",
                    Success = false,
                    ErrorMessage = error,
                    DurationMs = durationMs
                };

            _context.AiExecutionAudits.Add(audit);

            await _context.SaveChangesAsync();
        }
    }
}