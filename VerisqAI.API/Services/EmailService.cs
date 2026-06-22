using Microsoft.Extensions.Options;
using Resend;
using VerisqAI.API.Configurations;

namespace VerisqAI.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IResend _resend;
        private readonly ResendSettings _settings;

        public EmailService(
            IResend resend,
            IOptions<ResendSettings> settings)
        {
            _resend = resend;
            _settings = settings.Value;
        }

        public async Task SendEmailAsync(
            string toEmail,
            string subject,
            string htmlBody)
        {
            var message = new EmailMessage
            {
                From = $"{_settings.FromName} <{_settings.FromEmail}>",
                Subject = subject,
                HtmlBody = htmlBody
            };

            message.To.Add(toEmail);

            var result =
                await _resend.EmailSendAsync(message);

            if (!result.Success)
            {
                throw new Exception("Resend Email Failed");
            }
        }

        public async Task SendQuestionnaireEmail(
            string toEmail,
            string vendorName,
            string link)
        {
            var subject =
                "Vendor Security Assessment Request - Verisq AI";

            var body = $@"
            <div style='font-family:Arial,sans-serif'>
                <h2>Verisq AI Security Assessment</h2>

                <p>Hello,</p>

                <p>
                    You have been requested to complete
                    a vendor security questionnaire for
                    <strong>{vendorName}</strong>.
                </p>

                <p>
                    <a href='{link}'
                       style='background:#6366f1;
                              color:white;
                              padding:10px 15px;
                              border-radius:6px;
                              text-decoration:none;'>
                        Start Questionnaire
                    </a>
                </p>

                <p>— Verisq AI Team</p>
            </div>";

            await SendEmailAsync(
                toEmail,
                subject,
                body);
        }
    }
}