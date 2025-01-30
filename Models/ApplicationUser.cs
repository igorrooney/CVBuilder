using Microsoft.AspNetCore.Identity;

namespace CVBuilder.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}";
        public string? ProfilePictureUrl { get; set; }
        public DateTime? DateOfBirth { get; set; }
    }
}
