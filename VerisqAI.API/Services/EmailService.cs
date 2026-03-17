
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using VerisqAI.API.Configurations;

namespace VerisqAI.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _settings;

        public EmailService(IOptions<EmailSettings> settings)
        {
            _settings = settings.Value;
        }

        public async Task SendEmailAsync(
            string toEmail,
            string subject,
            string htmlBody)
        {
            var smtpClient = new SmtpClient(
                _settings.SmtpServer,
                _settings.Port)
            {
                Credentials = new NetworkCredential(
                    _settings.Username,
                    _settings.Password),
                EnableSsl = _settings.EnableSSL
            };

            var message = new MailMessage
            {
                From = new MailAddress(
                    _settings.SenderEmail,
                    _settings.SenderName),
                Subject = subject,
                Body = htmlBody,
                IsBodyHtml = true
            };

            message.To.Add(toEmail);

            await smtpClient.SendMailAsync(message);
        }
    }
}
