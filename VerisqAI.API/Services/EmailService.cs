
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

        public async Task SendQuestionnaireEmail(string toEmail, string vendorName, string link)
        {
            var subject = "Vendor Security Assessment Request - Verisq AI";

            var body = $@"
        <div style='font-family: Arial, sans-serif;'>
            <h2>Verisq AI Security Assessment</h2>

            <p>Hello,</p>

            <p>You have been requested to complete a vendor security questionnaire for <strong>{vendorName}</strong>.</p>

            <p>Please click the link below to complete the assessment:</p>

            <p>
                <a href='{link}' style='background:#6366f1;color:white;padding:10px 15px;border-radius:6px;text-decoration:none;'>
                    Start Questionnaire
                </a>
            </p>

            <p>This will only take a few minutes.</p>

            <br/>

            <p>— Verisq AI Team</p>
        </div>
    ";

            await SendEmailAsync(toEmail, subject, body);
        }
    }
}
