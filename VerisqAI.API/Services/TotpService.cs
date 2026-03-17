using System.Collections.Concurrent;

namespace VerisqAI.API.Services
{
    public class TotpService : ITotpService
    {
        private static readonly ConcurrentDictionary<string, string> _codes = new();

        public string GenerateCode(string email)
        {
            var code = new Random().Next(100000,999999).ToString();
            _codes[email] = code;
            return code;
        }

        public bool VerifyCode(string email, string code)
        {
            if(_codes.TryGetValue(email,out var stored))
            {
                if(stored == code)
                {
                    _codes.TryRemove(email, out _);
                    return true;
                }
            }
            return false;
        }
    }
}
