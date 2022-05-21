using Microsoft.EntityFrameworkCore;
using Server.Data.Entities;
using Server.Data.Interfaces;

namespace Server.Data;

public class StreamingContext : DbContext
{
    public StreamingContext(DbContextOptions options) : base(options)
    {
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<decimal>().HavePrecision(18, 6);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Artist>().HasQueryFilter(a => !a.Deleted);
    }


    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new())
    {
        foreach (var entry in ChangeTracker.Entries<IBaseEntity>())
        {
            if (entry.State == EntityState.Added)
                entry.Entity.Created = DateTime.UtcNow;
        }

        foreach (var entry in ChangeTracker.Entries<IModifiable>())
        {
            if (entry.State == EntityState.Modified)
                entry.Entity.LastModified = DateTime.UtcNow;
        }

        return base.SaveChangesAsync(cancellationToken);
    }


    public DbSet<Artist> Artists => Set<Artist>();
}