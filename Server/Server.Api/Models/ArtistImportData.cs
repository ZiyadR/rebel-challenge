using System.Text.Json.Serialization;

namespace Server.Api.Models;

public class ArtistImport
{
    [JsonPropertyName("artist")]
    public string? Artist { get; set; }
    [JsonPropertyName("rate")]
    public decimal Rate { get; set; }
    [JsonPropertyName("streams")]
    public long Streams { get; set; }
}

public class ArtistImportData
{
    [JsonPropertyName("data")]
    public ArtistImport[] Data { get; set; } = Array.Empty<ArtistImport>();
}