using Microsoft.EntityFrameworkCore;
using Server.Api.Services;
using Server.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(options => options.AddPolicy("AllowAnyOrigin",
    b => b
        .SetIsOriginAllowed(_ => true)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()));


var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
if (connectionString != null)
    builder.Services.AddDbContext<StreamingContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddSingleton<IPayoutCalculator, PayoutCalculator>();
builder.Services.AddSingleton<IArtistMapper, ArtistMapper>();

// Configure the HTTP request pipeline

var app = builder.Build();

if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseCors("AllowAnyOrigin");

app.UseAuthorization();

app.MapControllers();

app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();
