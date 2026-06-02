using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
using VerisqAI.API.AI.Contracts;
using VerisqAI.API.AI.Models;
using VerisqAI.API.AI.Providers;
using VerisqAI.API.AI.Services;
using VerisqAI.API.Configurations;
using VerisqAI.API.Data;
using VerisqAI.API.Models;
using VerisqAI.API.Seed;
using VerisqAI.API.Services;

var builder = WebApplication.CreateBuilder(args);

//for scorecard background service
//builder.Services.AddHostedService<VerisqAI.API.Services.ScorecardProcessorService>();

//pdf generation service
QuestPDF.Settings.License = QuestPDF.Infrastructure.LicenseType.Community;
builder.Services.AddScoped<VerisqAI.API.Services.PdfService>();

// Controllers
builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler =
            ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DB Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnection")
    ));

// Identity
builder.Services
    .AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

//builder.Services.AddAuthorization();
builder.Services.AddAuthorization(options =>   //creating own auth
{
    options.DefaultPolicy = new Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder()
        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser()
        .Build();
});

// Token Service
builder.Services.AddScoped<ITokenService, TokenService>();

// JWT SETTINGS
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("JwtSettings"));

var jwtSettings = builder.Configuration
    .GetSection("JwtSettings")
    .Get<JwtSettings>();

var key = Encoding.UTF8.GetBytes(jwtSettings!.Secret);

//TOTP Service 
builder.Services.AddScoped<ITotpService, TotpService>();

//Email Service
builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection("EmailSettings"));

builder.Services.AddScoped<IEmailService, EmailService>();

//AI contract and provider
builder.Services.AddHttpClient();


//openrouter service registration
builder.Services.AddScoped<
    IAiProvider,
    OpenRouterProvider>();

builder.Services.Configure<OpenRouterSettings>(
    builder.Configuration.GetSection("OpenRouter"));

//AI Service
builder.Services.AddScoped<
    AiAssessmentService>();

// JWT Authentication
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme =
            JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme =
            JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;

        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer = jwtSettings.Issuer,
                ValidAudience = jwtSettings.Audience,
                IssuerSigningKey =
                    new SymmetricSecurityKey(key),

                ClockSkew = TimeSpan.Zero,

                //to set role properly
                RoleClaimType = ClaimTypes.Role
            };
    });

//For connecting Frontend to Api
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins(
                    "http://localhost:5173",
                    "https://verisq-ai.vercel.app"
                )
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var dbContext = services
        .GetRequiredService<ApplicationDbContext>();

    await DbSeeder.SeedRolesAndAdminAsync(services);

    await DynamicAssessmentSeeder
    .SeedAsync(
        dbContext,
        services
    );
}

// Middleware pipeline - enable for development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();   

//to enable CORS
app.UseCors("AllowFrontend");

//for jwt authentication
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();