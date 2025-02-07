using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CVBuilder.Models
{
    public class CV
    {
        [Key]
        public int Id { get; set; }

        [BindProperty]
        public string UserId { get; set; } = string.Empty; // Ensure it's never null
        public ApplicationUser? User { get; set; }

        // Personal Details
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, Phone]
        public string PhoneNumber { get; set; } 

        public string? Address { get; set; }

        // Professional Summary
        [Required]
        [StringLength(500, ErrorMessage = "Summary cannot exceed 500 characters.")]
        public string Summary { get; set; }

        // Work Experience
        public List<WorkExperience> WorkExperiences { get; set; } = new List<WorkExperience>();

        // Education
        public List<Education> Educations { get; set; } = new List<Education>();

        // Skills
        public string? Skills { get; set; }

        // Certifications
        public List<Certification> Certifications { get; set; } = new List<Certification>();

        // Hobbies
        public string? Hobbies { get; set; }
    }
}
