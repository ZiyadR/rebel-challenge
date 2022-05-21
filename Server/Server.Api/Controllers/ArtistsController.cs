using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Api.Models;
using Server.Api.Services;
using Server.Data;
using Server.Data.Entities;

namespace Server.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArtistsController : ControllerBase
{

    private readonly StreamingContext _context;
    private readonly IArtistMapper _mapper;

    public ArtistsController(StreamingContext context, IArtistMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ArtistDTO>>> GetArtists()
    {
        return await _context.Artists
            .Select(a => _mapper.Map(a))
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<ArtistDTO>> AddArtist(ArtistDTO artistDTO)
    {
        var artist = new Artist
        {
            Name = artistDTO.Name,
            Rate = artistDTO.Rate,
            Streams = artistDTO.Streams,
            Paid = artistDTO.Paid,
            CareerStart = artistDTO.CareerStart
        };

        _context.Artists.Add(artist);
        await _context.SaveChangesAsync();


        return _mapper.Map(artist);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateArtist(int id, ArtistDTO artistDTO)
    {
        if (id != artistDTO.Id) return BadRequest();

        var artist = await _context.Artists.FindAsync(id);

        if (artist == null) return BadRequest();

        artist.Name = artistDTO.Name;
        artist.Rate = artistDTO.Rate;
        artist.Streams = artistDTO.Streams;
        artist.Paid = artistDTO.Paid;
        artist.CareerStart = artistDTO.CareerStart;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ArtistExists(id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    private bool ArtistExists(int id)
    {
        return _context.Artists.Any(e => e.Id == id);
    }

    [HttpPost("paid")]
    public async Task<IActionResult> UpdatePayment([FromBody] PaymentStatus status)
    {
        var artist = await _context.Artists.FindAsync(status.Id);

        if (artist == null) return BadRequest("Artist not found.");

        artist.Paid = status.Paid;

        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteArtist(int id)
    {
        var artist = await _context.Artists.FindAsync(id);
        if (artist == null)
        {
            return NotFound();
        }

        artist.Deleted = true;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = int.MaxValue)]
    [DisableRequestSizeLimit]
    [HttpPost("import")]
    public async Task<IActionResult> ImportArtists([FromForm] IFormFile? file)
    {
        if (file == null)
            return BadRequest("Please select a file.");

        var extension = Path.GetExtension(file.FileName);
        if (extension.ToLower() != ".json")
            return BadRequest("The attached file is not a JSON file.");

        ArtistImportData? artistDTOs;
        try
        {
            string fileContent;
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                fileContent = await reader.ReadToEndAsync();
            }
            artistDTOs = JsonSerializer.Deserialize<ArtistImportData>(fileContent);
        }
        catch (Exception)
        {
            return BadRequest("Error processing file. Please check the file format.");
        }

        if (artistDTOs == null || artistDTOs.Data.Length == 0)
            return BadRequest("The file doesn't contain any artist data.");

        var artists = artistDTOs.Data.Select(a => new Artist
        {
            Name = a.Artist,
            Rate = a.Rate,
            Streams = a.Streams
        }).ToList();

        _context.Artists.AddRange(artists);
        await _context.SaveChangesAsync();

        return Ok($"{artists.Count} artists were imported successfully.");
    }
}