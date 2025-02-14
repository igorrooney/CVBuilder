using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CVBuilder.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        [StringLength(50, ErrorMessage = "First name cannot exceed 50 characters.")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Last name cannot exceed 50 characters.")]
        public string LastName { get; set; }

        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";

        public string? ProfilePictureUrl { get; set; }

        [DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }

        // Ensures that navigation properties do not cause circular references in JSON serialization
        [JsonIgnore]
        public virtual ICollection<CV>? CVs { get; set; } = new List<CV>();

        // Override Email with [ProtectedPersonalData] to comply with privacy standards
        [ProtectedPersonalData]
        public override string Email { get; set; }

        [StringLength(200, ErrorMessage = "Address cannot exceed 200 characters.")]
        public string? Address { get; set; }

        // Optional: Add PhoneNumber with validation if needed
        [Phone]
        [StringLength(15, ErrorMessage = "Phone number cannot exceed 15 characters.")]
        public override string? PhoneNumber { get; set; }
    }
}
