namespace CVBuilder.Services
{
    public interface ICustomEmailSender
    {
        Task SendEmailAsync(string email, string subject, string htmlMessage);
    }
}
