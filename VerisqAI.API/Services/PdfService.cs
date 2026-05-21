using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System.Text.Json;
using VerisqAI.API.Models;
using VerisqAI.API.Models.Enums;

namespace VerisqAI.API.Services
{
    public class PdfService
    {
        // ─── Brand Colors ────────────────────────────────────────────────────────
        private const string PrimaryBlue = "#4F46E5";
        private const string PrimaryPurple = "#7C3AED";
        private const string AccentGold = "#F59E0B";
        private const string DangerRed = "#DC2626";
        private const string WarningOrange = "#EA580C";
        private const string CautionYellow = "#D97706";
        private const string SuccessGreen = "#16A34A";
        private const string Slate900 = "#0F172A";
        private const string Slate700 = "#334155";
        private const string Slate500 = "#64748B";
        private const string Slate200 = "#E2E8F0";
        private const string Slate100 = "#F1F5F9";
        private const string White = "#FFFFFF";

        private void AddAiRiskIntelligenceSection(
    ColumnDescriptor column,
    AiAssessmentInsight? aiInsight,
    List<AiRecommendation> aiRecommendations
)
        {
            // no AI available
            if (aiInsight == null)
                return;

            aiRecommendations ??= new List<AiRecommendation>();

            column.Item().PaddingTop(25).Column(aiColumn =>
            {
                // section title
                aiColumn.Item()
                    .Text("AI RISK INTELLIGENCE")
                    .FontSize(18)
                    .Bold()
                    .FontColor("#1d4ed8");

                aiColumn.Item().PaddingTop(10);

                // executive summary
                aiColumn.Item()
                    .Background("#f8fafc")
                    .Border(1)
                    .BorderColor("#e2e8f0")
                    .Padding(16)
                    .Column(summaryCol =>
                    {
                        summaryCol.Item()
                            .Text("Executive Summary")
                            .Bold()
                            .FontSize(14);

                        summaryCol.Item()
                            .PaddingTop(8)
                            .Text(aiInsight.ExecutiveSummary)
                            .FontSize(11)
                            .LineHeight(1.5f);

                        summaryCol.Item()
                            .PaddingTop(12)
                            .Row(row =>
                            {
                                row.RelativeItem()
                                    .Text(
                                        $"Model: {aiInsight.ModelName}"
                                    )
                                    .FontSize(9)
                                    .FontColor("#64748b");

                                row.RelativeItem()
                                    .AlignRight()
                                    .Text(
                                        $"Confidence: {Math.Round(aiInsight.ConfidenceScore * 100)}%"
                                    )
                                    .FontSize(9)
                                    .Bold()
                                    .FontColor("#2563eb");
                            });
                    });

                // risk drivers
                if (!string.IsNullOrWhiteSpace(aiInsight.RiskDriversJson))
                {
                    var riskDrivers =
                        JsonSerializer.Deserialize<List<string>>(
                            aiInsight.RiskDriversJson
                        ) ?? new List<string>();

                    aiColumn.Item().PaddingTop(18);

                    aiColumn.Item()
                        .Text("Key Risk Drivers")
                        .Bold()
                        .FontSize(14);

                    foreach (var driver in riskDrivers)
                    {
                        aiColumn.Item()
                            .PaddingTop(6)
                            .Row(row =>
                            {
                                row.ConstantItem(10)
                                    .Text("•")
                                    .FontColor("#dc2626")
                                    .Bold();

                                row.RelativeItem()
                                    .Text(driver)
                                    .FontSize(10)
                                    .LineHeight(1.4f);
                            });
                    }
                }

                // recommendations
                if (aiRecommendations.Any())
                {
                    aiColumn.Item().PaddingTop(20);

                    aiColumn.Item()
                        .Text("AI Recommendations")
                        .Bold()
                        .FontSize(14);

                    foreach (var recommendation in aiRecommendations)
                    {
                        aiColumn.Item()
                            .PaddingTop(10)
                            .Background("#f8fafc")
                            .Border(1)
                            .BorderColor("#e2e8f0")
                            .Padding(14)
                            .Column(recCol =>
                            {
                                recCol.Item()
                                    .Row(row =>
                                    {
                                        row.RelativeItem()
                                            .Text(recommendation.Title)
                                            .Bold()
                                            .FontSize(12);

                                        row.ConstantItem(80)
                                            .AlignRight()
                                            .Text(recommendation.Priority)
                                            .FontSize(9)
                                            .Bold()
                                            .FontColor("#dc2626");
                                    });

                                recCol.Item()
                                    .PaddingTop(6)
                                    .Text(recommendation.Description)
                                    .FontSize(10)
                                    .LineHeight(1.4f);

                                recCol.Item()
                                    .PaddingTop(6)
                                    .Text(
                                        $"Category: {recommendation.Category}"
                                    )
                                    .FontSize(9)
                                    .FontColor("#2563eb");

                                recCol.Item()
                                    .PaddingTop(8)
                                    .Text(recommendation.Rationale)
                                    .FontSize(9)
                                    .Italic()
                                    .FontColor("#64748b");
                            });
                    }
                }
            });
        }

        public byte[] GenerateVendorReport(
            Vendor vendor,
            Scorecard scorecard,
            List<Finding> findings,
            AiAssessmentInsight? aiInsight,
            List<AiRecommendation> aiRecommendations
        )
        {
            QuestPDF.Settings.License = LicenseType.Community;

            // ── Safely unwrap nullable model values ──────────────────────────────
            int score = scorecard.Score ?? 0;
            int riskScore = scorecard.RiskScore ?? 0;
            int riskTier = scorecard.RiskTier ?? 4;

            var critical = findings.Where(f => f.Severity == FindingSeverity.Critical).ToList();
            var high = findings.Where(f => f.Severity == FindingSeverity.High).ToList();
            var medium = findings.Where(f => f.Severity == FindingSeverity.Medium).ToList();
            var low = findings.Where(f => f.Severity == FindingSeverity.Low).ToList();
            int critHighCount = critical.Count + high.Count;

            return Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.MarginTop(0);
                    page.MarginBottom(0);
                    page.MarginLeft(0);
                    page.MarginRight(0);
                    page.DefaultTextStyle(t => t
                        .FontFamily(Fonts.Arial)
                        .FontColor(Slate900)
                        .FontSize(10));

                    // ══════════════════════════════════════════
                    //  HEADER
                    // ══════════════════════════════════════════
                    page.Header().Height(100).Row(headerRow =>
                    {
                        // Gold accent stripe
                        headerRow.ConstantItem(6).Background(AccentGold);

                        // Blue main banner
                        headerRow.RelativeItem()
                            .Background(PrimaryBlue)
                            .PaddingHorizontal(36)
                            .PaddingVertical(22)
                            .Row(innerRow =>
                            {
                                innerRow.RelativeItem().Column(col =>
                                {
                                    col.Item()
                                        .Text("VERISQ AI")
                                        .FontSize(24).Bold().FontColor(White);

                                    col.Item().PaddingTop(3)
                                        .Text("Vendor Risk Intelligence Platform")
                                        .FontSize(9).FontColor("#C7D2FE");
                                });

                                innerRow.ConstantItem(200).Column(col =>
                                {
                                    col.Item().AlignRight()
                                        .Text("SECURITY REPORT")
                                        .FontSize(10).Bold().FontColor(White);

                                    col.Item().PaddingTop(4).AlignRight()
                                        .Text(DateTime.UtcNow.ToString("MMMM dd, yyyy"))
                                        .FontSize(9).FontColor("#A5B4FC");

                                    col.Item().PaddingTop(2).AlignRight()
                                        .Text("Confidential")
                                        .FontSize(9).Italic().FontColor("#C7D2FE");
                                });
                            });
                    });

                    // ══════════════════════════════════════════
                    //  CONTENT
                    // ══════════════════════════════════════════
                    page.Content().PaddingHorizontal(36).Column(mainCol =>
                    {
                        mainCol.Spacing(0);

                        // ── Vendor Title ──────────────────────────────────
                        mainCol.Item().PaddingTop(22).Row(row =>
                        {
                            row.RelativeItem().Column(col =>
                            {
                                col.Item()
                                    .Text("VENDOR RISK ASSESSMENT")
                                    .FontSize(8).Bold().FontColor(PrimaryBlue);

                                col.Item().PaddingTop(4)
                                    .Text(vendor.Name ?? "Unknown Vendor")
                                    .FontSize(20).Bold().FontColor(Slate900);

                                col.Item().PaddingTop(2)
                                    .Text(vendor.Domain ?? "-")
                                    .FontSize(10).FontColor(Slate500);
                            });

                            row.ConstantItem(160).Column(col =>
                            {
                                col.Item().AlignRight()
                                    .Background(Slate100)
                                    .Border(1).BorderColor(Slate200)
                                    .Padding(10).Column(inner =>
                                    {
                                        inner.Item().AlignCenter()
                                            .Text("Report Reference")
                                            .FontSize(8).FontColor(Slate500);

                                        inner.Item().PaddingTop(2).AlignCenter()
                                            .Text($"VRA-{DateTime.UtcNow:yyyyMMdd}")
                                            .FontSize(9).Bold().FontColor(Slate700);
                                    });
                            });
                        });

                        // ── Divider ───────────────────────────────────────
                        mainCol.Item().PaddingTop(16)
                            .LineHorizontal(1).LineColor(Slate200);

                        // ── Four KPI Cards ────────────────────────────────
                        mainCol.Item().PaddingTop(16).Row(row =>
                        {
                            // Card 1 – Security Score
                            string scoreColor = GetScoreColor(score);
                            row.RelativeItem()
                                .Border(1).BorderColor(Slate200)
                                .Background(White).Padding(14).Column(col =>
                                {
                                    col.Item()
                                        .Text("SECURITY SCORE")
                                        .FontSize(7).Bold().FontColor(Slate500);

                                    col.Item().PaddingTop(6)
                                        .Text(score.ToString())
                                        .FontSize(28).Bold().FontColor(scoreColor);

                                    col.Item()
                                        .Text("out of 100")
                                        .FontSize(8).FontColor(Slate500);

                                    col.Item().PaddingTop(8).Height(4)
                                        .Background(scoreColor);
                                });

                            row.ConstantItem(12);

                            // Card 2 – Risk Score
                            string riskColor = GetRiskColor(riskScore);
                            row.RelativeItem()
                                .Border(1).BorderColor(Slate200)
                                .Background(White).Padding(14).Column(col =>
                                {
                                    col.Item()
                                        .Text("RISK SCORE")
                                        .FontSize(7).Bold().FontColor(Slate500);

                                    col.Item().PaddingTop(6)
                                        .Text(riskScore.ToString())
                                        .FontSize(28).Bold().FontColor(riskColor);

                                    col.Item()
                                        .Text("risk points")
                                        .FontSize(8).FontColor(Slate500);

                                    col.Item().PaddingTop(8).Height(4)
                                        .Background(riskColor);
                                });

                            row.ConstantItem(12);

                            // Card 3 – Risk Tier
                            string tierColor = GetTierColor(riskTier);
                            string tierBg = GetTierBg(riskTier);
                            string tierLabel = GetTierLabel(riskTier);
                            row.RelativeItem()
                                .Border(1).BorderColor(Slate200)
                                .Background(White).Padding(14).Column(col =>
                                {
                                    col.Item()
                                        .Text("RISK TIER")
                                        .FontSize(7).Bold().FontColor(Slate500);

                                    col.Item().PaddingTop(6)
                                        .Background(tierBg).Border(1).BorderColor(tierColor)
                                        .Padding(6).AlignCenter()
                                        .Text($"Tier {riskTier}")
                                        .FontSize(18).Bold().FontColor(tierColor);

                                    col.Item().PaddingTop(2).AlignCenter()
                                        .Text(tierLabel)
                                        .FontSize(8).FontColor(tierColor);

                                    col.Item().PaddingTop(8).Height(4)
                                        .Background(tierColor);
                                });

                            row.ConstantItem(12);

                            // Card 4 – High+ Findings
                            string findColor = critHighCount > 0 ? DangerRed : SuccessGreen;
                            row.RelativeItem()
                                .Border(1).BorderColor(Slate200)
                                .Background(White).Padding(14).Column(col =>
                                {
                                    col.Item()
                                        .Text("HIGH+ FINDINGS")
                                        .FontSize(7).Bold().FontColor(Slate500);

                                    col.Item().PaddingTop(6)
                                        .Text(critHighCount.ToString())
                                        .FontSize(28).Bold().FontColor(findColor);

                                    col.Item()
                                        .Text("require attention")
                                        .FontSize(8).FontColor(Slate500);

                                    col.Item().PaddingTop(8).Height(4)
                                        .Background(findColor);
                                });
                        });

                        // ── Vendor Information ────────────────────────────
                        mainCol.Item().PaddingTop(22)
                            .Element(BuildSectionHeader("VENDOR INFORMATION", PrimaryBlue));

                        mainCol.Item().PaddingTop(12)
                            .Border(1).BorderColor(Slate200)
                            .Background(White).Padding(16).Column(col =>
                            {
                                BuildInfoRow(col, "Vendor Name", vendor.Name ?? "-");
                                BuildInfoDivider(col);
                                BuildInfoRow(col, "Domain", vendor.Domain ?? "-");
                                BuildInfoDivider(col);
                                BuildInfoRow(col, "Risk Tier", $"Tier {riskTier} — {GetTierLabel(riskTier)}");
                                BuildInfoDivider(col);
                                BuildInfoRow(col, "Assessment Date", DateTime.UtcNow.ToString("dd MMMM yyyy, HH:mm UTC"));
                                BuildInfoDivider(col);
                                BuildInfoRow(col, "Report Type", "Automated Security Posture Assessment");
                                BuildInfoDivider(col);
                                BuildInfoRow(col, "Total Findings", findings.Count.ToString());
                            });

                        // ── Risk Summary ──────────────────────────────────
                        mainCol.Item().PaddingTop(22)
                            .Element(BuildSectionHeader("RISK SUMMARY", PrimaryPurple));

                        mainCol.Item().PaddingTop(12).Row(row =>
                        {
                            // Left: score breakdown + progress bar
                            row.RelativeItem(3)
                                .Border(1).BorderColor(Slate200)
                                .Background(White).Padding(16).Column(col =>
                                {
                                    col.Item()
                                        .Text("Score Breakdown")
                                        .FontSize(11).Bold().FontColor(Slate700);

                                    col.Item().PaddingTop(12).Row(r =>
                                    {
                                        r.RelativeItem().Column(c =>
                                        {
                                            c.Item().Text("Security Score")
                                                .FontSize(8).FontColor(Slate500);

                                            c.Item().PaddingTop(4)
                                                .Text(score.ToString())
                                                .FontSize(26).Bold()
                                                .FontColor(GetScoreColor(score));

                                            c.Item().Text("out of 100")
                                                .FontSize(8).FontColor(Slate500);
                                        });

                                        r.ConstantItem(1).Background(Slate200);

                                        r.RelativeItem().PaddingLeft(14).Column(c =>
                                        {
                                            c.Item().Text("Risk Score")
                                                .FontSize(8).FontColor(Slate500);

                                            c.Item().PaddingTop(4)
                                                .Text(riskScore.ToString())
                                                .FontSize(26).Bold()
                                                .FontColor(GetRiskColor(riskScore));

                                            c.Item().Text("risk points")
                                                .FontSize(8).FontColor(Slate500);
                                        });
                                    });

                                    // Progress bar using Row split
                                    col.Item().PaddingTop(14)
                                        .Text("Score Progress")
                                        .FontSize(8).FontColor(Slate500);

                                    int safeScore = Math.Clamp(score, 0, 100);
                                    int remaining = 100 - safeScore;

                                    col.Item().PaddingTop(4).Height(10).Row(r =>
                                    {
                                        if (safeScore > 0)
                                            r.RelativeItem(safeScore)
                                                .Background(GetScoreColor(score));

                                        if (remaining > 0)
                                            r.RelativeItem(remaining)
                                                .Background(Slate200);
                                    });

                                    col.Item().PaddingTop(3).Row(r =>
                                    {
                                        r.AutoItem().Text("0").FontSize(8).FontColor(Slate500);
                                        r.RelativeItem();
                                        r.AutoItem().Text("100").FontSize(8).FontColor(Slate500);
                                    });
                                });

                            row.ConstantItem(12);

                            // Right: tier details card
                            row.RelativeItem(2)
                                .Border(1).BorderColor(Slate200)
                                .Background(White).Padding(16).Column(col =>
                                {
                                    col.Item()
                                        .Text("Risk Tier Details")
                                        .FontSize(11).Bold().FontColor(Slate700);

                                    col.Item().PaddingTop(10)
                                        .Background(GetTierBg(riskTier))
                                        .Border(1).BorderColor(GetTierColor(riskTier))
                                        .Padding(10).AlignCenter()
                                        .Text($"Tier {riskTier}  ·  {GetTierLabel(riskTier)}")
                                        .FontSize(12).Bold().FontColor(GetTierColor(riskTier));

                                    col.Item().PaddingTop(10)
                                        .Text(GetTierDescription(riskTier))
                                        .FontSize(9).FontColor(Slate700).LineHeight(1.5f);

                                    col.Item().PaddingTop(8)
                                        .Text("Recommended Action")
                                        .FontSize(8).Bold().FontColor(Slate500);

                                    col.Item().PaddingTop(3)
                                        .Text(GetTierAction(riskTier))
                                        .FontSize(9).FontColor(GetTierColor(riskTier)).LineHeight(1.4f);
                                });
                        });

                        // ── AI Risk Intelligence Section ──────────────────────────────

                        AddAiRiskIntelligenceSection(
                            mainCol,
                            aiInsight,
                            aiRecommendations
                        );

                        // ── Findings Section ──────────────────────────────
                        mainCol.Item().PaddingTop(22)
                            .Element(BuildSectionHeader("SECURITY FINDINGS", DangerRed));

                        // Findings summary pills
                        mainCol.Item().PaddingTop(12).Row(row =>
                        {
                            BuildSummaryPill(row, "Critical", critical.Count, DangerRed, "#FEF2F2");
                            row.ConstantItem(10);
                            BuildSummaryPill(row, "High", high.Count, WarningOrange, "#FFF7ED");
                            row.ConstantItem(10);
                            BuildSummaryPill(row, "Medium", medium.Count, CautionYellow, "#FFFBEB");
                            row.ConstantItem(10);
                            BuildSummaryPill(row, "Low", low.Count, SuccessGreen, "#F0FDF4");
                        });

                        if (!findings.Any())
                        {
                            mainCol.Item().PaddingTop(16)
                                .Border(1).BorderColor(Slate200)
                                .Background("#F0FDF4").Padding(24).Column(col =>
                                {
                                    col.Item().AlignCenter()
                                        .Text("No Findings Detected")
                                        .FontSize(14).Bold().FontColor(SuccessGreen);

                                    col.Item().PaddingTop(6).AlignCenter()
                                        .Text("This vendor passed all security checks with no identified risks.")
                                        .FontSize(10).FontColor(Slate500);
                                });
                        }
                        else
                        {
                            BuildFindingsGroup(mainCol, "Critical Severity", critical,
                                DangerRed, "#FEF2F2", "#FECACA");
                            BuildFindingsGroup(mainCol, "High Severity", high,
                                WarningOrange, "#FFF7ED", "#FED7AA");
                            BuildFindingsGroup(mainCol, "Medium Severity", medium,
                                CautionYellow, "#FFFBEB", "#FDE68A");
                            BuildFindingsGroup(mainCol, "Low Severity", low,
                                SuccessGreen, "#F0FDF4", "#BBF7D0");
                        }

                        // ── Bottom Note ───────────────────────────────────
                        mainCol.Item().PaddingTop(24).PaddingBottom(16)
                            .LineHorizontal(1).LineColor(Slate200);

                        mainCol.Item().PaddingBottom(24).Row(row =>
                        {
                            row.RelativeItem()
                                .Text("This report was generated automatically by the Verisq AI threat intelligence engine.")
                                .FontSize(8).Italic().FontColor(Slate500);

                            row.ConstantItem(140).AlignRight()
                                .Text("Confidential & Proprietary")
                                .FontSize(8).Italic().FontColor(Slate500);
                        });
                    });

                    // ══════════════════════════════════════════
                    //  FOOTER
                    // ══════════════════════════════════════════
                    page.Footer()
                        .Height(36)
                        .Background(Slate100)
                        .PaddingHorizontal(36)
                        .Row(footerRow =>
                        {
                            footerRow.RelativeItem().AlignMiddle().Text(x =>
                            {
                                x.Span("Verisq AI")
                                    .Bold().FontSize(9).FontColor(PrimaryBlue);
                                x.Span("  |  Vendor Risk Assessment  |  ")
                                    .FontSize(9).FontColor(Slate500);
                                x.Span(vendor.Name ?? "")
                                    .FontSize(9).FontColor(Slate500);
                            });

                            footerRow.ConstantItem(100).AlignRight().AlignMiddle().Text(x =>
                            {
                                x.Span("Page ").FontSize(9).FontColor(Slate500);
                                x.CurrentPageNumber().FontSize(9).Bold().FontColor(PrimaryBlue);
                                x.Span(" of ").FontSize(9).FontColor(Slate500);
                                x.TotalPages().FontSize(9).Bold().FontColor(PrimaryBlue);
                            });
                        });
                });
            }).GeneratePdf();
        }

        // ═════════════════════════════════════════════════════════════════
        //  SECTION HEADER
        // ═════════════════════════════════════════════════════════════════
        private Action<IContainer> BuildSectionHeader(string title, string color)
        {
            return container =>
            {
                container.Row(row =>
                {
                    row.ConstantItem(4).Background(color);
                    row.ConstantItem(10);
                    row.AutoItem().AlignMiddle()
                        .Text(title)
                        .FontSize(9).Bold().FontColor(color);
                    row.ConstantItem(10);
                    row.RelativeItem().AlignMiddle()
                        .LineHorizontal(1).LineColor(Slate200);
                });
            };
        }

        // ═════════════════════════════════════════════════════════════════
        //  INFO ROW + DIVIDER
        // ═════════════════════════════════════════════════════════════════
        private static void BuildInfoRow(ColumnDescriptor col, string label, string value)
        {
            col.Item().Row(row =>
            {
                row.ConstantItem(150)
                    .Text(label)
                    .FontSize(10).FontColor(Slate500);

                row.RelativeItem()
                    .Text(value)
                    .FontSize(10).Bold().FontColor(Slate900);
            });
        }

        private static void BuildInfoDivider(ColumnDescriptor col)
        {
            col.Item().PaddingVertical(8)
                .LineHorizontal(1).LineColor(Slate200);
        }

        // ═════════════════════════════════════════════════════════════════
        //  SUMMARY PILL
        // ═════════════════════════════════════════════════════════════════
        private static void BuildSummaryPill(
            RowDescriptor row,
            string label,
            int count,
            string textColor,
            string bgColor)
        {
            row.RelativeItem()
                .Background(bgColor)
                .Border(1).BorderColor(textColor)
                .Padding(10).Column(col =>
                {
                    col.Item().AlignCenter()
                        .Text(count.ToString())
                        .FontSize(20).Bold().FontColor(textColor);

                    col.Item().PaddingTop(2).AlignCenter()
                        .Text(label)
                        .FontSize(9).Bold().FontColor(textColor);
                });
        }

        // ═════════════════════════════════════════════════════════════════
        //  FINDINGS GROUP
        // ═════════════════════════════════════════════════════════════════
        private static void BuildFindingsGroup(
            ColumnDescriptor mainCol,
            string groupTitle,
            List<Finding> list,
            string textColor,
            string bgColor,
            string borderColor)
        {
            if (list.Count == 0) return;

            mainCol.Item().PaddingTop(18).Row(row =>
            {
                row.ConstantItem(4).Background(textColor);
                row.ConstantItem(8);
                row.AutoItem().AlignMiddle()
                    .Text(groupTitle)
                    .FontSize(11).Bold().FontColor(textColor);
                row.AutoItem().PaddingLeft(8).AlignMiddle()
                    .Text($"({list.Count} finding{(list.Count > 1 ? "s" : "")})")
                    .FontSize(9).FontColor(Slate500);
            });

            for (int i = 0; i < list.Count; i++)
            {
                Finding f = list[i];
                int num = i + 1;

                mainCol.Item().PaddingTop(8)
                    .Border(1).BorderColor(borderColor)
                    .Background(bgColor)
                    .Padding(14).Column(col =>
                    {
                        // Title row: number badge + title + severity tag
                        col.Item().Row(row =>
                        {
                            row.ConstantItem(22).Height(22)
                                .Background(textColor)
                                .AlignCenter().AlignMiddle()
                                .Text(num.ToString())
                                .FontSize(9).Bold().FontColor(White);

                            row.ConstantItem(10);

                            row.RelativeItem().AlignMiddle()
                                .Text(f.Title ?? "Untitled Finding")
                                .FontSize(11).Bold().FontColor(Slate900);

                            row.AutoItem().AlignMiddle()
                                .Background(textColor)
                                .PaddingHorizontal(8).PaddingVertical(3)
                                .Text(f.Severity.ToString())
                                .FontSize(8).Bold().FontColor(White);
                        });

                        // Divider
                        col.Item().PaddingTop(10).PaddingBottom(10)
                            .LineHorizontal(1).LineColor(borderColor);

                        // Description
                        col.Item()
                            .Text(f.Description ?? "No description available.")
                            .FontSize(10).FontColor(Slate700).LineHeight(1.5f);
                    });
            }
        }

        // ═════════════════════════════════════════════════════════════════
        //  COLOR HELPERS  (all take plain int — nullable unwrapped above)
        // ═════════════════════════════════════════════════════════════════
        private static string GetScoreColor(int score)
        {
            if (score >= 80) return SuccessGreen;
            if (score >= 60) return CautionYellow;
            if (score >= 40) return WarningOrange;
            return DangerRed;
        }

        private static string GetRiskColor(int risk)
        {
            if (risk <= 20) return SuccessGreen;
            if (risk <= 40) return CautionYellow;
            if (risk <= 60) return WarningOrange;
            return DangerRed;
        }

        private static string GetTierColor(int tier)
        {
            return tier switch
            {
                1 => DangerRed,
                2 => WarningOrange,
                3 => CautionYellow,
                _ => SuccessGreen
            };
        }

        private static string GetTierBg(int tier)
        {
            return tier switch
            {
                1 => "#FEF2F2",
                2 => "#FFF7ED",
                3 => "#FFFBEB",
                _ => "#F0FDF4"
            };
        }

        private static string GetTierLabel(int tier)
        {
            return tier switch
            {
                1 => "Critical Risk",
                2 => "High Risk",
                3 => "Medium Risk",
                _ => "Low Risk"
            };
        }

        private static string GetTierDescription(int tier)
        {
            return tier switch
            {
                1 => "This vendor presents critical security risks. Immediate escalation and remediation are required before continuing business operations.",
                2 => "This vendor has significant security gaps. Review all findings and engage the vendor on remediation timelines.",
                3 => "This vendor has moderate security concerns. Monitor compliance and request remediation plans for open findings.",
                _ => "This vendor demonstrates a strong security posture. Continue routine monitoring."
            };
        }

        private static string GetTierAction(int tier)
        {
            return tier switch
            {
                1 => "Escalate immediately · Suspend onboarding · Require emergency remediation plan",
                2 => "Schedule remediation review · Increase monitoring · Require 30-day action plan",
                3 => "Request remediation plan · Quarterly review · Track progress milestones",
                _ => "Continue annual assessment · Maintain standard monitoring cadence"
            };
        }
    }
}