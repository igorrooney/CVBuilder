using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace CVBuilder.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";
        public string? ProfilePictureUrl { get; set; }
        public DateTime? DateOfBirth { get; set; }

        [NotMapped]
        public ICollection<CV>? CVs { get; set; }


        [ProtectedPersonalData]
        public override string Email { get; set; }
        public string? Address { get; set; }
    }
}
