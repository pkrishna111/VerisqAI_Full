namespace VerisqAI.API.AI.Models
{
    public class GeminiSettings
    {
        public string ApiKey { get; set; } =
            string.Empty;

        public string Model { get; set; } =
            "gemini-2.5-flash";

        public decimal Temperature { get; set; } =
            0.2m;
    }
}