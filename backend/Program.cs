using CVBuilder.Models;
using CVBuilder.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add controllers to the container
builder.Services.AddControllers();

builder.Services.AddRazorPages();

// Configure Kestrel to use a dynamically assigned port (useful for cloud environments)
var port = Environment.GetEnvironmentVariable("PORT") ?? "7165"; // Default to 7165 locally
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(int.Parse(port));
});

// Load configuration from appsettings.json and User Secrets
builder.Configuration.AddUserSecrets<Program>();

// Register PDF Service
builder.Services.AddTransient<PdfService>();

// Add Swagger for API documentation
builder.Services.AddSwaggerGen();

// Configure Email Sender Service
builder.Services.AddTransient<ICustomEmailSender, EmailSender>();

// Add MVC support with views
builder.Services.AddControllersWithViews();

// Configure Database (MySQL)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 4, 3)) // Ensure your MySQL version is specified here
    ));

// Configure Identity for Authentication and Authorization
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
    options.SignIn.RequireConfirmedAccount = false;
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier; // Map NameIdentifier to User ID
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Name; // Map Name to UserName
    options.ClaimsIdentity.EmailClaimType = ClaimTypes.Email; // Map Email claim
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
// Configure JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var jwtKey = Environment.GetEnvironmentVariable("JwtSecretKey")
             ?? builder.Configuration["JwtSettings:Key"]; // Fallback to appsettings.json
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.MapInboundClaims = false;
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        NameClaimType = ClaimTypes.NameIdentifier
    };
});

// Enable CORS to allow frontend communication
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000", 
            "https://cv-builder-git-test-igors-projects-baae4c6f.vercel.app",
            "https://cv-builder-teal.vercel.app") // Replace with your frontend's URL
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Configure JSON options for controllers
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles; // Handle cycles without $id
    options.JsonSerializerOptions.WriteIndented = true; // Pretty print JSON for better readability
    options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull; // Optional: Ignore null properties
});

var app = builder.Build();

// Enable the configured CORS policy
app.UseCors("AllowFrontend");

// Apply database migrations automatically on startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();
    context.Database.Migrate(); // Automatically apply any pending migrations
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment() || app.Environment.IsStaging() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "CV Builder API v1");
        c.RoutePrefix = "swagger"; // Swagger UI will be available at /swagger
    });
}

app.UseHttpsRedirection(); // Redirect HTTP to HTTPS for secure connections
app.UseStaticFiles(); // Serve static files like CSS, JS, and images

app.UseRouting(); // Enable routing middleware

app.UseAuthentication(); // Enable authentication middleware
app.UseAuthorization(); // Enable authorization middleware

// Map default controller routes
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Map Razor Pages (required for Identity)
app.MapRazorPages();

// Map API controllers
app.MapControllers();

app.Run();
