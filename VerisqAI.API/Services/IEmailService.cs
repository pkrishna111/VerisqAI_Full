namespace VerisqAI.API.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(
            string toEmail,
            string subject,
            string htmlBody);

        Task SendQuestionnaireEmail(string toEmail, string vendorName, string link);
    }
}
