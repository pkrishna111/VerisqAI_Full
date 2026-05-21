namespace VerisqAI.API.AI.Models
{
    public class OpenAiSettings
    {
        public string ApiKey { get; set; } =
            string.Empty;

        public string Model { get; set; } =
            "gpt-4.1-mini";

        public decimal Temperature { get; set; } =
            0.2m;
    }
}