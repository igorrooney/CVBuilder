namespace CVBuilder.Models
{
    public class Education
    {
        public int Id { get; set; }
        public string Company { get; set; }
        public string Position { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
        public int CVId { get; set; }  // Foreign key
    }
}
