namespace CVBuilder.Models
{
    public class WorkExperience
    {
        public int Id { get; set; }
        public string Company { get; set; }
        public string Position { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }  // Nullable for ongoing jobs
        public string Description { get; set; }
        public int CVId { get; set; }  // Foreign key
        public CV CV { get; set; }     // Navigation property
    }
}
