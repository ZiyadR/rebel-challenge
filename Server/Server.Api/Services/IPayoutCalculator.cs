using Server.Api.Models;

namespace Server.Api.Services
{
    public interface IPayoutCalculator
    {
        decimal GetTotalPayout(ArtistDTO artist);
        decimal GetMonthlyPayout(ArtistDTO artist, DateTime now);
    }
}
