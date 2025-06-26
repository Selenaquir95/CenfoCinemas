using DTOs;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreApp
{
    public class EmailManager : BaseManager
    {
        public async Task SendEmailUser(User user)
        {
            var apiKey = "";
            var client = new SendGridClient(apiKey);
            var from_email = new EmailAddress("squiross@ucenfotec.ac.cr", "Example User");
            var subject = "Sending with Twilio SendGrid is Fun";
            var to_email = new EmailAddress("squiross@ucenfotec.ac.cr", "Example User");
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from_email, to_email, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
        }

        public async Task SendEmailMovie(Movie movie)
        {
            var apiKey = "";

            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("squiross@ucenfotec.ac.cr", "Cenfo Cinema");
            var subject = "Registro de Película";
            var to = new EmailAddress("squiross@ucenfotec.ac.cr", "Registro");
            var plainTextContent = "Película agregada a Cenfo Cinema";
            var htmlContent = "<strong>Hola! </strong> Gracias por registrar la película en Cenfo Cinema";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = client.SendEmailAsync(msg).Result;
        }
    }
}
