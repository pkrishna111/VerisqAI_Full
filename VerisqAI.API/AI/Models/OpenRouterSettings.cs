namespace VerisqAI.API.AI.Models
{
    public class OpenRouterSettings
    {
        public string ApiKey { get; set; } =
            string.Empty;

        public string Model { get; set; } =
            "openrouter/free";

        public string BaseUrl { get; set; } =
            "https://openrouter.ai/api/v1";

        public decimal Temperature { get; set; } =
            0.2m;
    }
}