using Server.Api.Models;
using Server.Api.Services;

namespace Server.Api.Tests.Services
{
    public class PayoutCalculatorTests
    {
        private readonly IPayoutCalculator _calculator;
        public PayoutCalculatorTests()
        {
            _calculator = new PayoutCalculator();
        }


        [Fact]
        public void GetTotalPayout()
        {
            var artist = new ArtistDTO
            {
                Name = "Nirvana",
                Rate = 0.00001m,
                Streams = 50000000
            };

            var expected = 500m;

            Assert.Equal(_calculator.GetTotalPayout(artist), expected);
        }

        [Fact]
        public void GetMonthlyPayout_NoCareerStart()
        {
            var artist = new ArtistDTO
            {
                Name = "Nirvana",
                Rate = 0.0001m,
                Streams = 1900000000
            };

            var now = new DateTime(2022, 2, 1);
            var expected = 1000m;

            Assert.Equal(_calculator.GetMonthlyPayout(artist, now), expected);
        }

        [Fact]
        public void GetMonthlyPayout_CareerStart()
        {
            var artist = new ArtistDTO
            {
                Name = "Nirvana",
                Rate = 0.0001m,
                Streams = 1900000000,
                CareerStart = new DateTime(2014,3,1)
            };

            var now = new DateTime(2022, 2, 1);
            var expected = 2000m;

            Assert.Equal(_calculator.GetMonthlyPayout(artist, now), expected);
        }
    }
}