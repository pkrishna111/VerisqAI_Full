using System.Collections.Concurrent;

namespace VerisqAI.API.Services
{
    public class TotpService : ITotpService
    {
        private static readonly ConcurrentDictionary<string, (string Code, DateTime Expiry)> _codes = new();

        public string GenerateCode(string email)
        {
            if (_codes.TryGetValue(email, out var existing))
            {
                if (existing.Expiry > DateTime.UtcNow)
                {
                    return existing.Code; // reuse existing OTP
                }
            }

            var code = new Random().Next(100000, 999999).ToString();

            _codes[email] = (code, DateTime.UtcNow.AddMinutes(5));

            return code;
        }

        public bool VerifyCode(string email, string code)
        {
            if (_codes.TryGetValue(email, out var stored))
            {
                if (stored.Code == code && stored.Expiry > DateTime.UtcNow)
                {
                    _codes.TryRemove(email, out _);
                    return true;
                }
            }
            return false;
        }
    }
}
