using VerisqAI.API.Models;

namespace VerisqAI.API.Services
{
    public interface ITokenService
    {
        Task<string> CreateTokenAsync(ApplicationUser user);
    }
}
