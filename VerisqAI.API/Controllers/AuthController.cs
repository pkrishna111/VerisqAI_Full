using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using VerisqAI.API.DTOs.Auth;
using VerisqAI.API.Models;
using VerisqAI.API.Services;

namespace VerisqAI.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly ITotpService _totpService;
        private readonly IEmailService _emailService;

        public AuthController(
            UserManager<ApplicationUser> userManager,
            ITokenService tokenService,
            ITotpService totpService,
            IEmailService emailService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _totpService = totpService;
            _emailService = emailService;
        }

        // REGISTER
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto dto)
        {
            var existingUser =
                await _userManager.FindByEmailAsync(dto.Email);

            if (existingUser != null)
                return BadRequest("User already exists.");

            var user = new ApplicationUser
            {
                UserName = dto.Email,
                Email = dto.Email,
                FullName = dto.FullName,
                CompanyName = dto.CompanyName,
                CompanyDomain = dto.CompanyDomain,
                MobilePhone = dto.MobilePhone,
                EmailConfirmed = false
            };

            var result =
                await _userManager.CreateAsync(user);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await _userManager.AddToRoleAsync(user, "User");

            var token =
                await _userManager
                .GenerateEmailConfirmationTokenAsync(user);

            var confirmUrl =
                $"https://app.verisq.ai/mini-dashboard?email={dto.Email}&token={Uri.EscapeDataString(token)}";

            // Email sending code
            var body = $@"
<h2>Welcome to Verisq AI</h2>
<p>Click the link below to activate your trial dashboard:</p>
<a href='{confirmUrl}'>Access Dashboard</a>
<p>This link will verify your email and send your login code.</p>";

            await _emailService.SendEmailAsync(
                dto.Email,
                "Verify your Verisq AI account",
                body);

            //registration done
            return Ok(new
            {
                message = "Registration successful. Check email.",
                confirmUrl
            });
        }

        // CONFIRM EMAIL
        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(
            string email,
            string token)
        {
            var user =
                await _userManager.FindByEmailAsync(email);

            if (user == null)
                return BadRequest("Invalid user.");

            var result =
                await _userManager
                .ConfirmEmailAsync(user, token);

            if (!result.Succeeded)
                return BadRequest("Email confirmation failed.");

            var code = _totpService.GenerateCode(email);

            // send OTP email
            var body = $@"
<h2>Your Verisq AI Login Code</h2>
<p>Your verification code is:</p>
<h1>{code}</h1>
<p>This code expires shortly.</p>";

            await _emailService.SendEmailAsync(
                email,
                "Your Verisq AI verification code",
                body);

            return Ok("OTP sent to email.");
        }

        // VERIFY OTP
        [HttpPost("verify-totp")]
        public async Task<IActionResult> VerifyTotp(
            VerifyTotpDto dto)
        {
            var user =
                await _userManager.FindByEmailAsync(dto.Email);

            if (user == null)
                return Unauthorized();

            var valid =
                _totpService.VerifyCode(dto.Email, dto.Code);

            if (!valid)
                return Unauthorized("Invalid code.");

            var token =
                await _tokenService.CreateTokenAsync(user);

            return Ok(new
            {
                token
            });
        }
    }
}
