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
        }
    }
