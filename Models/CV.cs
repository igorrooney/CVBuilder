namespace CVBuilder.Models
{
    public class CV
    {
        public int Id { get; set; }
        public string UserId { get; set; }  // Links to ASP.NET Identity User
        public ApplicationUser User { get; set; } // Navigation property
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public List<WorkExperience> WorkExperiences { get; set; } = new();
        public List<Education> Educations { get; set; } = new();
        // Add other sections (Skills, Projects, etc.)
    }
}
