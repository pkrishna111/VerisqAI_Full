using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VerisqAI.API.Data;
using VerisqAI.API.DTOs.Auth;
using VerisqAI.API.Models;
using VerisqAI.API.Models.Enums;
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
        private readonly ApplicationDbContext _context;

        public AuthController(
            UserManager<ApplicationUser> userManager,
            ITokenService tokenService,
            ITotpService totpService,
            IEmailService emailService,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _totpService = totpService;
            _emailService = emailService;
            _context = context;
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
                EmailConfirmed = true, //this is to be changed false as confirm email is to be done later
                Status = UserStatus.Pending
            };

            var result =
                await _userManager.CreateAsync(user);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await _userManager.AddToRoleAsync(user, "User");

            return Ok(new
            {
                message = "Registration successful. Awaiting approval."
            });
        }

        // CONFIRM EMAIL
        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string email, string token)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                return BadRequest("Invalid user.");

            var result = await _userManager.ConfirmEmailAsync(user, token);

            if (!result.Succeeded)
                return BadRequest("Email confirmation failed.");

            return Ok(new
            {
                message = "Email verified successfully. Awaiting admin approval."
            });
        }

        // VERIFY OTP
        [HttpPost("verify-totp")]
        public async Task<IActionResult> VerifyTotp(
            VerifyTotpDto dto)
        {

            var user = await _userManager.FindByEmailAsync(dto.Email);

            if (user == null)
                return Unauthorized("User not found.");

            // get latest OTP from DB
            var otp = _context.OtpTokens
                .Where(x => x.Email == dto.Email && !x.IsUsed)
                .OrderByDescending(x => x.CreatedAt)
                .FirstOrDefault();

            if (otp == null)
                return Unauthorized("No OTP found. Please request a new one.");

            // lockout check
            if (otp.LockoutUntil != null && otp.LockoutUntil > DateTime.UtcNow)
                return Unauthorized("Too many attempts. Try again later.");

            // expiry check
            if (otp.ExpiresAt < DateTime.UtcNow)
                return Unauthorized("OTP expired. Please request a new one.");

            // verify
            var valid = _totpService.VerifyCode(dto.Email, dto.Code);

            if (!valid)
                return Unauthorized("Incorrect OTP.");

            var token = await _tokenService.CreateTokenAsync(user);

            return Ok(new { token });
        }

        //api for send otp
        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                return BadRequest("User not found.");

            if (!user.EmailConfirmed)
                return BadRequest("Please verify your email first.");

            if (user.Status != UserStatus.Approved)
                return BadRequest("Your account is not approved yet.");

            var latestOtp = _context.OtpTokens
    .Where(x => x.Email == email && !x.IsUsed)
    .OrderByDescending(x => x.CreatedAt)
    .FirstOrDefault();

            if (latestOtp != null)
            {
                // Lock check
                if (latestOtp.LockoutUntil != null &&
                    latestOtp.LockoutUntil > DateTime.UtcNow)
                {
                    return BadRequest("Too many attempts. Try again after 10 minutes.");
                }

                // Allow resend after 1 minute
                var resendAllowedAt = latestOtp.CreatedAt.AddMinutes(1);

                if (DateTime.UtcNow < resendAllowedAt)
                {
                    return BadRequest("Please wait 1 minute before requesting a new code.");
                }
            }

            var code = _totpService.GenerateCode(email);

            var body = $@"
<h2>Your Verisq AI Login Code</h2>
<p>Your verification code is:</p>
<h1>{code}</h1>
<p>This code expires in 5 minutes.</p>";

            await _emailService.SendEmailAsync(
                email,
                "Your Verisq AI verification code",
                body);

            return Ok(new
            {
                message = "OTP sent successfully"
            });
        }


        //temporary for admin approval
        [HttpPost("debug-approve")]
        public async Task<IActionResult> DebugApprove([FromBody] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                return BadRequest("User not found.");

            user.Status = UserStatus.Approved;

            var loginUrl = $"http://localhost:5173/send-code?email={email}";

            await _emailService.SendEmailAsync(
                email,
                "Your Verisq AI trial is approved",
                $@"Click below to login:<br><a href='{loginUrl}'>Login</a>"
            );

            await _userManager.UpdateAsync(user);

            return Ok("User approved successfully.");
        }
    }
}
