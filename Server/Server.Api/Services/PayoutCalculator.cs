using Server.Api.Models;

namespace Server.Api.Services;

public class PayoutCalculator : IPayoutCalculator
{
    private readonly DateTime STREAMING_START = new(2006, 4, 1);

    public decimal GetTotalPayout(ArtistDTO artist)
    {
        return artist.Rate * artist.Streams;
    }

    public decimal GetMonthlyPayout(ArtistDTO artist, DateTime now)
    {
        var totalPayout = artist.Payout > 0 ? artist.Payout : GetTotalPayout(artist);
        return totalPayout / GetCareerMonths(artist.CareerStart, now);
    }

    private int GetCareerMonths(DateTime? careerStart, DateTime now)
    {
        var start = careerStart > STREAMING_START ? careerStart.Value : STREAMING_START;

        return (now.Year - start.Year) * 12 + now.Month - start.Month;
    }
}