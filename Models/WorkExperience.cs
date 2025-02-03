using System;
using System.ComponentModel.DataAnnotations;

namespace CVBuilder.Models
{
    public class WorkExperience
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CVId { get; set; }
        public CV? CV { get; set; }

        [Required]
        public string JobTitle { get; set; }

        [Required]
        public string Company { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; } // Nullable for current jobs

        [StringLength(1000)]
        public string? Responsibilities { get; set; }

        [StringLength(1000)]
        public string? Achievements { get; set; }
    }
}
