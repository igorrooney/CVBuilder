using CVBuilder.Models;
using Microsoft.EntityFrameworkCore;

namespace CVBuilder.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<CV> CVs { get; set; }
        public DbSet<WorkExperience> WorkExperiences { get; set; }
        public DbSet<Education> Educations { get; set; }
        // Add other DbSets as needed
    }
}
