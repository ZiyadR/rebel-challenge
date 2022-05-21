using Server.Api.Models;
using Server.Data.Entities;

namespace Server.Api.Services;

public class ArtistMapper : IArtistMapper
{
    private readonly IPayoutCalculator _calculator;
    public ArtistMapper(IPayoutCalculator calculator)
    {
        _calculator = calculator;
    }

    public ArtistDTO Map(Artist artist)
    {
        var artistDTO =  new ArtistDTO
        {
            Id = artist.Id,
            Name = artist.Name,
            Rate = artist.Rate,
            Streams = artist.Streams,
            Paid = artist.Paid,
            CareerStart = artist.CareerStart
        };

        artistDTO.Payout = _calculator.GetTotalPayout(artistDTO);
        artistDTO.PayoutPerMonth = _calculator.GetMonthlyPayout(artistDTO, DateTime.UtcNow);

        return artistDTO;
    }

    public Artist Map(ArtistDTO artistDTO)
    {
        return new()
        {
            Name = artistDTO.Name,
            Rate = artistDTO.Rate,
            Streams = artistDTO.Streams,
            Paid = artistDTO.Paid,
            CareerStart = artistDTO.CareerStart
        };
    }
}