namespace VerisqAI.DTOs.Admin
{
    public class SystemHealthDto
    {
        public bool ApiStatus { get; set; }
        public bool DatabaseStatus { get; set; }
        public bool AiStatus { get; set; }
    }
}