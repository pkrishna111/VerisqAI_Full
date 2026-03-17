namespace VerisqAI.API.Services
{
    public interface ITotpService
    {
        string GenerateCode (string email);
        bool VerifyCode (string email, string code);
    }
}
