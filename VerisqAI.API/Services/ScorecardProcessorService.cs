using Microsoft.EntityFrameworkCore;
using VerisqAI.API.Data;
using VerisqAI.API.Models;

namespace VerisqAI.API.Services
{
    public class ScorecardProcessorService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public ScorecardProcessorService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using var scope = _scopeFactory.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                // get queued scorecards
                var queued = await context.Scorecards
                    .Where(s => s.Status == "Queued")
                    .ToListAsync(stoppingToken);

                foreach (var scorecard in queued)
                {
                    // mark as processing
                    scorecard.Status = "Processing";
                    await context.SaveChangesAsync(stoppingToken);

                    // simulate processing delay
                    await Task.Delay(3000, stoppingToken);

                    // generate fake logic (temporary)
                    var random = new Random();

                    //  generate findings FIRST
                    var findingsCount = random.Next(1, 5);

                    for (int i = 0; i < findingsCount; i++)
                    {
                        int severityValue;

                        var roll = random.Next(1, 101);

                        if (roll <= 40) severityValue = 1;
                        else if (roll <= 70) severityValue = 2;
                        else if (roll <= 90) severityValue = 3;
                        else severityValue = 4;

                        var findingTemplates = new[]
                        {
                            new { Title = "Weak SSL Configuration", Desc = "TLS version is outdated or weak cipher suites detected." },
                            new { Title = "Open Port Detected", Desc = "Unnecessary open ports increase attack surface." },
                            new { Title = "Missing Security Headers", Desc = "Important HTTP security headers are not configured." },
                            new { Title = "Outdated Software Version", Desc = "Vendor is using outdated software with known vulnerabilities." },
                            new { Title = "Improper Data Encryption", Desc = "Sensitive data is not encrypted properly at rest or transit." },
                            new { Title = "Exposed API Endpoint", Desc = "Public API endpoint exposed without proper authentication." },
                            new { Title = "Weak Password Policy", Desc = "Password requirements do not meet security standards." }
                        };

                        // pick random template
                        var template = findingTemplates[random.Next(findingTemplates.Length)];

                        var finding = new Finding
                        {
                            ScorecardId = scorecard.Id,
                            Title = template.Title,
                            Description = template.Desc,
                            Severity = (Models.Enums.FindingSeverity)severityValue
                        };

                        context.Findings.Add(finding);
                    }

                    //  save finding
                    await context.SaveChangesAsync(stoppingToken);

                    // calculate score based on findings
                    var findings = await context.Findings
                        .Where(f => f.ScorecardId == scorecard.Id)
                        .ToListAsync(stoppingToken);

                    int totalImpact = 0;

                    foreach (var f in findings)
                    {
                        switch (f.Severity)
                        {
                            case Models.Enums.FindingSeverity.Low:
                                totalImpact += 2;
                                break;
                            case Models.Enums.FindingSeverity.Medium:
                                totalImpact += 5;
                                break;
                            case Models.Enums.FindingSeverity.High:
                                totalImpact += 10;
                                break;
                            case Models.Enums.FindingSeverity.Critical:
                                totalImpact += 20;
                                break;
                        }
                    }

                    // calculate score
                    var score = 100 - totalImpact;
                    score = Math.Max(0, score);

                    scorecard.Score = score;
                    scorecard.RiskScore = 100 - score;

                    // assign tier
                    if (score >= 80) scorecard.RiskTier = 1;
                    else if (score >= 65) scorecard.RiskTier = 2;
                    else if (score >= 50) scorecard.RiskTier = 3;
                    else scorecard.RiskTier = 4;

                    // now mark complete
                    scorecard.Status = "Complete";

                    await context.SaveChangesAsync(stoppingToken);
                }

                //  wait before next cycle
                await Task.Delay(5000, stoppingToken);
            }
        }
    }
}