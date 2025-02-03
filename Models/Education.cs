﻿using System;
using System.ComponentModel.DataAnnotations;

namespace CVBuilder.Models
{
    public class Education
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CVId { get; set; }
        public CV? CV { get; set; }

        [Required]
        public string Degree { get; set; }

        [Required]
        public string Institution { get; set; }

        [Required]
        public int GraduationYear { get; set; }
    }
}
