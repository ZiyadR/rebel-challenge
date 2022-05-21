namespace Server.Api.Models;

public class ArtistDTO
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public decimal Rate { get; set; }
    public decimal Payout { get; set; }
    public decimal PayoutPerMonth { get; set; }
    public long Streams { get; set; }
    public bool Paid { get; set; }
    public DateTime? CareerStart { get; set; }
}