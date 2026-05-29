using Microsoft.Extensions.Options;
using VerisqAI.API.AI.Models;

namespace VerisqAI.API.AI.Services
{
    public class OpenRouterService
    {
        private readonly HttpClient _httpClient;
        private readonly OpenRouterSettings _settings;

        public OpenRouterService(
            HttpClient httpClient,
            IOptions<OpenRouterSettings> options)
        {
            _httpClient = httpClient;
            _settings = options.Value;
        }

        public async Task<string> GenerateAsync(string prompt)
        {
            _httpClient.DefaultRequestHeaders.Clear();

            _httpClient.DefaultRequestHeaders.Add(
                "Authorization",
                $"Bearer {_settings.ApiKey}");

            _httpClient.DefaultRequestHeaders.Add(
                "HTTP-Referer",
                "http://localhost:5000");

            _httpClient.DefaultRequestHeaders.Add(
                "X-Title",
                "Verisq AI");

            var request = new
            {
                model = _settings.Model,
                messages = new[]
                {
                new
                {
                    role = "user",
                    content = prompt
                }
            }
            };

            var response = await _httpClient.PostAsJsonAsync(
                $"{_settings.BaseUrl}/chat/completions",
                request);

            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();

            return json;
        }
    }
}
