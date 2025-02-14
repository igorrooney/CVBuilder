using CVBuilder.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<CV> CVs { get; set; }
    public DbSet<WorkExperience> WorkExperiences { get; set; }
    public DbSet<Education> Educations { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Configure CV and ApplicationUser relationship
        builder.Entity<CV>()
            .HasOne(c => c.User)
            .WithMany(u => u.CVs)
            .HasForeignKey(c => c.UserId);

        // Configure WorkExperience and CV relationship
        builder.Entity<WorkExperience>()
            .HasOne(w => w.CV)
            .WithMany(c => c.WorkExperiences)
            .HasForeignKey(w => w.CVId);

        // Configure Education and CV relationship
        builder.Entity<Education>()
            .HasOne(e => e.CV)
            .WithMany(c => c.Educations)
            .HasForeignKey(e => e.CVId);
    }
}
