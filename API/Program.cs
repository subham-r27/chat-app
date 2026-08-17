using System.Text;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(x => x.UseSqlite("Data Source=chat.db"));
builder.Services.AddIdentityCore<AppUser>().AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.Run();
