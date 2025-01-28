namespace CVBuilder.Models
{
    public class Education
    {
        public int Id { get; set; }
        public string Institution { get; set; }
        public string Degree { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }  // Nullable for ongoing education
        public int CVId { get; set; }  // Foreign key
        public CV CV { get; set; }     // Navigation property
    }
}
