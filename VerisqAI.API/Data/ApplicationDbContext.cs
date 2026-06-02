using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using VerisqAI.API.Models;

namespace VerisqAI.API.Data
{
    public class ApplicationDbContext
        : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<OtpToken> OtpTokens { get; set; }

        public DbSet<Vendor> Vendors { get; set; }

        public DbSet<Scorecard> Scorecards { get; set; }

        public DbSet<Finding> Findings { get; set; }

        public DbSet<Questionnaire> Questionnaires { get; set; }

        public DbSet<QuestionnaireResponse> QuestionnaireResponses { get; set; }

        public DbSet<AiAssessmentInsight> AiAssessmentInsights { get; set; }

        public DbSet<AiRecommendation> AiRecommendations { get; set; }

        public DbSet<AiExecutionAudit> AiExecutionAudits { get; set; }

        public DbSet<AssessmentTemplate> AssessmentTemplates { get; set; }

        public DbSet<AssessmentSection> AssessmentSections { get; set; }

        public DbSet<AssessmentQuestion> AssessmentQuestions { get; set; }

        public DbSet<AssessmentQuestionOption> AssessmentQuestionOptions { get; set; }

        protected override void OnModelCreating(
            ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AiAssessmentInsight>()
                .HasOne(a => a.Scorecard)
                .WithOne(s => s.AiAssessmentInsight)
                .HasForeignKey<AiAssessmentInsight>(
                    a => a.ScorecardId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AiRecommendation>()
                .HasOne(a => a.Scorecard)
                .WithMany(s => s.AiRecommendations)
                .HasForeignKey(a => a.ScorecardId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AiAssessmentInsight>()
                .Property(a => a.ConfidenceScore)
                .HasPrecision(5, 4);

            modelBuilder.Entity<AiExecutionAudit>()
                .Property(a => a.Temperature)
                .HasPrecision(3, 2);

            modelBuilder.Entity<AssessmentTemplate>()
                .HasOne(t => t.User)
                .WithMany()
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AssessmentTemplate>()
                .HasMany(t => t.Sections)
                .WithOne(s => s.AssessmentTemplate)
                .HasForeignKey(s => s.AssessmentTemplateId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AssessmentSection>()
                .HasMany(s => s.Questions)
                .WithOne(q => q.AssessmentSection)
                .HasForeignKey(q => q.AssessmentSectionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AssessmentQuestion>()
                .HasIndex(q => q.QuestionKey);

            modelBuilder.Entity<AssessmentQuestion>()
                .Property(q => q.QuestionType)
                .HasMaxLength(50);

            modelBuilder.Entity<AssessmentQuestion>()
                .Property(q => q.Severity)
                .HasMaxLength(50);

            modelBuilder.Entity<AssessmentQuestion>()
                .HasMany(q => q.Options)
                .WithOne(o => o.AssessmentQuestion)
                .HasForeignKey(o => o.AssessmentQuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Questionnaire>()
                .HasOne(q => q.AssessmentTemplate)
                .WithMany()
                .HasForeignKey(q => q.AssessmentTemplateId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}