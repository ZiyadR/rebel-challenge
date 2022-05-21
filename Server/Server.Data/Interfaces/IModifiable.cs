namespace Server.Data.Interfaces;

public interface IModifiable
{
    public DateTime? LastModified { get; set; }
}