using Microsoft.EntityFrameworkCore;

internal class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // Define your DbSets here, e.g.:
    // public DbSet<YourEntity> YourEntities { get; set; }
}