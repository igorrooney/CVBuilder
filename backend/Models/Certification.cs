using System;
using System.ComponentModel.DataAnnotations;

namespace CVBuilder.Models
{
    public class Certification
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CVId { get; set; }
        public CV? CV { get; set; }

        [Required]
        public string CertificationName { get; set; }

        public string IssuedBy { get; set; }

        public DateTime? IssueDate { get; set; }
    }
}
