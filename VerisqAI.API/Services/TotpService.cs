using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text;
using VerisqAI.API.Data;
using VerisqAI.API.Models;

namespace VerisqAI.API.Services
{
    public class TotpService : ITotpService
    {
        //in memory otp removed and db code is applied
        //private static readonly ConcurrentDictionary<string, (string Code, DateTime Expiry)> _codes = new();
        private readonly ApplicationDbContext _context;

        public TotpService(ApplicationDbContext context)
        {
            _context = context;
        }

        private string HashCode(string code)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(code);
            var hash = sha.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        public string GenerateCode(string email)
        {
            //this was coded if we want to reuse old code as per its existing time limit so no new code is to be created
            //if (_codes.TryGetValue(email, out var existing))
            //{
            //    if (existing.Expiry > DateTime.UtcNow)
            //    {
            //        return existing.Code; // reuse existing OTP
            //    }
            //}

            var code = new Random().Next(100000, 999999).ToString();
            var expiry = DateTime.UtcNow.AddMinutes(3);

            //this is to create new otp every time and invalidate old otps
            var existingOtps = _context.OtpTokens
                .Where(x => x.Email == email && !x.IsUsed)
                .ToList();

            foreach (var item in existingOtps)
            {
                item.IsUsed = true; // invalidate old OTPs
            }

            // SAVE TO DB
            var hashed = HashCode(code);

            var otp = new OtpToken
            {
                Email = email,
                HashedCode = hashed,
                ExpiresAt = expiry,
                CreatedAt = DateTime.UtcNow,
                IsUsed = false,
                AttemptCount = 0
            };

            _context.OtpTokens.Add(otp);
            _context.SaveChanges();

            // KEEP OLD MEMORY FLOW (safety) -  removed to use db code
            //_codes[email] = (code, expiry);

            return code;
        }

        //public bool VerifyCode(string email, string code)
        //{
        //    if (_codes.TryGetValue(email, out var stored))
        //    {
        //        if (stored.Code == code && stored.Expiry > DateTime.UtcNow)
        //        {
        //            _codes.TryRemove(email, out _);
        //            return true;
        //        }
        //    }
        //    return false;
        //}

        public bool VerifyCode(string email, string code)
        {
            var hashed = HashCode(code);

            var otp = _context.OtpTokens
                .Where(x => x.Email == email && !x.IsUsed)
                .OrderByDescending(x => x.CreatedAt)
                .FirstOrDefault();

            if (otp == null)
                return false;

            // Check lockout
            if (otp.LockoutUntil != null && otp.LockoutUntil > DateTime.UtcNow)
                return false;

            // Expiry check
            if (otp.ExpiresAt < DateTime.UtcNow)
                return false;

            // Wrong code
            if (otp.HashedCode != hashed)
            {
                otp.AttemptCount++;

                // lock after 5 attempts
                if (otp.AttemptCount >= 5)
                {
                    otp.LockoutUntil = DateTime.UtcNow.AddMinutes(5);
                }

                _context.SaveChanges();
                return false;
            }

            //Correct code
            otp.IsUsed = true;
            _context.SaveChanges();

            return true;
        }
    }
}
