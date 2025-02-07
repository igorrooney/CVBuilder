using CVBuilder.Models;
using CVBuilder.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Load configuration from appsettings.json and Secret Manager
builder.Configuration.AddUserSecrets<Program>();

builder.Services.AddTransient<PdfService>();

builder.Services.AddSwaggerGen();

// Configure Email Sender
builder.Services.AddTransient<ICustomEmailSender, EmailSender>();

// Add services to the container.
builder.Services.AddControllersWithViews();

// Configure Database (Render uses environment variables)
var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");

Console.WriteLine($"🔍 DATABASE_CONNECTION_STRING: {databaseUrl}");

if (string.IsNullOrEmpty(databaseUrl))
{
    throw new InvalidOperationException("❌ DATABASE_CONNECTION_STRING is not set.");
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(databaseUrl));


Console.WriteLine($"🔍 DATABASE_CONNECTION_STRING: {databaseUrl}");

// Configure Identity
builder.Services.AddDefaultIdentity<ApplicationUser>(options =>
{
    options.SignIn.RequireConfirmedAccount = true;
})
.AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // ✅ Change to your frontend URL
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
    options.JsonSerializerOptions.WriteIndented = true;
});

var app = builder.Build();

app.UseCors("AllowFrontend");

// Apply database migrations on startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();
    context.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsStaging())  // Ensure Swagger runs in dev & staging
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "CV Builder API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapRazorPages(); // Required for Identity Razor Pages

app.MapControllers();

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080"; // Default to 8080 if PORT is not set
app.Urls.Add($"http://*:{port}");


app.Run();
