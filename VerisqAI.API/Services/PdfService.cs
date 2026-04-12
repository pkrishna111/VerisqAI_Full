using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using VerisqAI.API.Models;

namespace VerisqAI.API.Services
{
    public class PdfService
    {
        public byte[] GenerateVendorReport(Vendor vendor, Scorecard scorecard, List<Finding> findings)
        {
            return Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(40);

                    // ================= HEADER =================
                    page.Header().Column(col =>
                    {
                        col.Item().Text("VERISQ AI REPORT")
                            .FontSize(20)
                            .Bold()
                            .FontColor(Colors.Blue.Darken2);

                        col.Item().Text("Vendor Risk Assessment")
                            .FontSize(11)
                            .FontColor(Colors.Grey.Darken1);

                        col.Item().PaddingTop(5)
                            .LineHorizontal(1)
                            .LineColor(Colors.Grey.Lighten2);
                    });

                    // ================= CONTENT =================
                    page.Content().Column(col =>
                    {
                        col.Spacing(18);

                        // ===== Vendor Information =====
                        col.Item().Column(c =>
                        {
                            c.Item().Text("Vendor Information")
                                .Bold()
                                .FontSize(14);

                            c.Item().PaddingTop(5).Row(row =>
                            {
                                row.ConstantItem(110).Text("Name:")
                                    .FontColor(Colors.Grey.Darken1);

                                row.RelativeItem().Text(vendor.Name);
                            });

                            c.Item().Row(row =>
                            {
                                row.ConstantItem(110).Text("Domain:")
                                    .FontColor(Colors.Grey.Darken1);

                                row.RelativeItem().Text(vendor.Domain);
                            });
                        });

                        // ===== Risk Summary =====
                        col.Item().Column(c =>
                        {
                            c.Item().Text("Risk Summary")
                                .Bold()
                                .FontSize(14);

                            c.Item().PaddingTop(5).Row(row =>
                            {
                                row.ConstantItem(110).Text("Score:")
                                    .FontColor(Colors.Grey.Darken1);

                                row.RelativeItem().Text(scorecard.Score.ToString());
                            });

                            c.Item().Row(row =>
                            {
                                row.ConstantItem(110).Text("Risk Score:")
                                    .FontColor(Colors.Grey.Darken1);

                                row.RelativeItem().Text(scorecard.RiskScore.ToString());
                            });

                            c.Item().Row(row =>
                            {
                                row.ConstantItem(110).Text("Risk Tier:")
                                    .FontColor(Colors.Grey.Darken1);

                                row.RelativeItem().Text($"Tier {scorecard.RiskTier}");
                            });
                        });

                        // ===== Findings =====
                        col.Item().Column(c =>
                        {
                            c.Item().Text("Findings")
                                .Bold()
                                .FontSize(16);

                            c.Item().PaddingTop(5)
                                .LineHorizontal(1)
                                .LineColor(Colors.Grey.Lighten2);
                        });

                        var critical = findings
                            .Where(f => f.Severity == Models.Enums.FindingSeverity.Critical)
                            .ToList();

                        var high = findings
                            .Where(f => f.Severity == Models.Enums.FindingSeverity.High)
                            .ToList();

                        var medium = findings
                            .Where(f => f.Severity == Models.Enums.FindingSeverity.Medium)
                            .ToList();

                        void AddSection(string title, List<Finding> list, string color)
                        {
                            if (!list.Any()) return;

                            col.Item().PaddingTop(10).Text(title)
                                .Bold()
                                .FontSize(13)
                                .FontColor(color);

                            foreach (var f in list)
                            {
                                col.Item().PaddingTop(6).Column(c =>
                                {
                                    c.Item().Text($"• {f.Title}")
                                        .Bold()
                                        .FontSize(12);

                                    c.Item().PaddingLeft(10)
                                        .Text(f.Description ?? "No description available")
                                        .FontSize(11)
                                        .FontColor(Colors.Grey.Darken1);
                                });
                            }
                        }

                        // ===== Sections =====
                        AddSection("Critical", critical, Colors.Red.Darken2);
                        AddSection("High", high, Colors.Orange.Darken2);
                        AddSection("Medium", medium, Colors.Yellow.Darken3);

                        if (!findings.Any())
                        {
                            col.Item().PaddingTop(10)
                                .Text("No findings 🎉")
                                .FontColor(Colors.Green.Darken2);
                        }
                    });

                    // ================= FOOTER =================
                    page.Footer().AlignCenter().Text(x =>
                    {
                        x.Span("Generated by Verisq AI | Confidential Report")
                            .FontSize(10)
                            .FontColor(Colors.Grey.Darken1);
                    });
                });
            }).GeneratePdf();
        }
    }
}