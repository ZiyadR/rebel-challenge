using Server.Api.Models;
using Server.Data.Entities;

namespace Server.Api.Services;

public interface IArtistMapper
{
    ArtistDTO Map(Artist artist);
    Artist Map(ArtistDTO artistDTO);
}