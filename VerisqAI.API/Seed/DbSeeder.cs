using Microsoft.AspNetCore.Identity;
using VerisqAI.API.Models;

namespace VerisqAI.API.Seed
{
    public static class DbSeeder
    {
        public static async Task SeedRolesAndAdminAsync(
                IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            string[] roles = { "Admin", "User", "Vendor" };

            //for roles
            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(
                        new IdentityRole(role));
                }
            }

            //for default admin
            var adminEmail = "admin@verisq.com";
            var existingAdmin = await userManager
                .FindByEmailAsync(adminEmail);

            if (existingAdmin == null)
            {
                var adminUser = new ApplicationUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    FullName = "System Administrator",
                    CompanyName = "Verisq AI",
                    CompanyDomain = "verisq.com",
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(
                    adminUser,
                    "Admin@123" // temp password
                );

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(
                        adminUser,
                        "Admin"
                    );
                }
            }
        }
    }
}
