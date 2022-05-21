using Server.Data.Interfaces;

namespace Server.Data.Entities;

public class Artist: IBaseEntity, IModifiable
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public decimal Rate { get; set; }
    public long Streams { get; set; }
    public DateTime? CareerStart { get; set; }
    public bool Paid { get; set; }

    public DateTime Created { get; set; }
    public DateTime? LastModified { get; set; }
    public bool Deleted { get; set; }
}