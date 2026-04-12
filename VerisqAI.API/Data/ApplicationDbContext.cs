    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using VerisqAI.API.Models;

    namespace VerisqAI.API.Data
    {
        public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
        {
            public ApplicationDbContext
                (DbContextOptions<ApplicationDbContext> options) 
                : base(options) { }

            public DbSet<OtpToken> OtpTokens { get; set; }

            public DbSet<Vendor> Vendors { get; set; }

            public DbSet<Scorecard> Scorecards { get; set; }

            public DbSet<Finding> Findings { get; set; }
            public DbSet<Questionnaire> Questionnaires { get; set; }
            public DbSet<QuestionnaireResponse> QuestionnaireResponses { get; set; }
        }
    }
