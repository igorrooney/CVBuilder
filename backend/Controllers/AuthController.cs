using CVBuilder.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly IHostEnvironment _hostEnvironment;
    private readonly AppDbContext _context;

    public AuthController(
        UserManager<ApplicationUser> userManager, 
        SignInManager<ApplicationUser> signInManager, 
        IConfiguration configuration, 
        IHostEnvironment hostEnvironment,
        AppDbContext context
        )
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _hostEnvironment = hostEnvironment;
        _context = context;
        Console.WriteLine($"EnvironmentName: {hostEnvironment.EnvironmentName}");

    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = new ApplicationUser
        {
            UserName = model.Email,
            Email = model.Email,
            FirstName = model.FirstName, 
            LastName = model.LastName 
        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(new { message = "User registered successfully." });
    }



    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
            return Unauthorized(new { message = "Invalid credentials" });

        var result = await _signInManager.PasswordSignInAsync(user.UserName, model.Password, false, false);
        if (!result.Succeeded)
            return Unauthorized(new { message = "Invalid credentials" });

        // Generate the short-lived access token
        var accessToken = GenerateJwtToken(user);

        // Generate a longer-lived refresh token, store in DB
        var refreshToken = await GenerateRefreshTokenAsync(user, HttpContext.Connection.RemoteIpAddress?.ToString());

       // Check if environment is Development
        var isDevelopment = _hostEnvironment.IsDevelopment();

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true, // Prevent JavaScript access
            Secure = !isDevelopment, // In Development, set Secure=false
            SameSite = isDevelopment ? SameSiteMode.Lax : SameSiteMode.None,
            Path = "/",
            Expires = DateTime.UtcNow.AddHours(1)
        };

        //Response.Cookies.Append("jwt", token, cookieOptions);

        return Ok(new { message = "Login successful!", accessToken, refreshToken });
    }


    private string GenerateJwtToken(ApplicationUser user)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // Add claims, including NameIdentifier
        var claims = new[]
        {
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // Token ID
        new Claim(ClaimTypes.NameIdentifier, user.Id), // Add user ID as NameIdentifier
        new Claim(ClaimTypes.Email, user.Email), // Add email as Email claim
        new Claim(ClaimTypes.Name, user.UserName) // Add username as Name claim
    };

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(1),
            //expires: DateTime.UtcNow.AddHours(12),
            //expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["TokenExpiryInMinutes"])),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        // Check if environment is Development
        var isDevelopment = _hostEnvironment.IsDevelopment();
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = !isDevelopment, // In Development, set Secure=false
            SameSite = isDevelopment ? SameSiteMode.Lax : SameSiteMode.None,
            Path = "/",
            Expires = DateTime.UtcNow.AddDays(-1)
        };
        Response.Cookies.Delete("jwt", cookieOptions);

        return Ok(new { message = "Logged out successfully" });
    }


    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var token = Request.Cookies["accessToken"];
        if (string.IsNullOrEmpty(token))
        {
            return Unauthorized(new { message = "User is not authenticated" });
        }

        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(token);
        var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized(new { message = "User is not authenticated" });
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return Unauthorized(new { message = "User not found" });
        }

        return Ok(new
        {
            id = user.Id,
            email = user.Email,
            firstName = user.FirstName,
            lastName = user.LastName
        });
    }

    private async Task<string> GenerateRefreshTokenAsync(ApplicationUser user, string? ipAddress = null)
    {
        // Create a secure random token (64 bytes)
        var randomNumber = new byte[64];
        using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomNumber);
        }
        var refreshTokenString = Convert.ToBase64String(randomNumber);

        var refreshToken = new RefreshToken
        {
            Token = refreshTokenString,
            UserId = user.Id,
            Expires = DateTime.UtcNow.AddDays(7), // 7-day refresh token
            IsRevoked = false,
            CreatedAt = DateTime.UtcNow,
            CreatedByIp = ipAddress
        };

        _context.RefreshTokens.Add(refreshToken);
        await _context.SaveChangesAsync();

        // Cleanup old refresh tokens for this user
        await CleanupOldRefreshTokensAsync(user.Id);

        return refreshTokenString;
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshRequestModel model)
    {
        // Lookup the refresh token in the DB
        var storedToken = await _context.RefreshTokens
            .FirstOrDefaultAsync(r => r.Token == model.RefreshToken);

        if (storedToken == null)
            return Unauthorized(new { message = "Invalid refresh token." });

        // Check if it's expired or revoked
        if (storedToken.IsRevoked || storedToken.Expires < DateTime.UtcNow)
            return Unauthorized(new { message = "Refresh token is no longer valid." });

        // Revoke the old token so it can't be reused
        storedToken.IsRevoked = true;
        _context.RefreshTokens.Update(storedToken);
        await _context.SaveChangesAsync();

        // Generate a new Access Token
        var user = await _userManager.FindByIdAsync(storedToken.UserId);
        if (user == null)
            return Unauthorized(new { message = "User not found." });

        var newAccessToken = GenerateJwtToken(user);

        // Also generate a brand-new refresh token
        var newRefreshToken = await GenerateRefreshTokenAsync(user);

        return Ok(new
        {
            accessToken = newAccessToken,
            refreshToken = newRefreshToken
        });
    }
    private async Task CleanupOldRefreshTokensAsync(string userId)
    {
        var userTokens = await _context.RefreshTokens
            .Where(rt => rt.UserId == userId)
            .OrderByDescending(rt => rt.CreatedAt)
            .ToListAsync();

        if (userTokens.Count > 1)
        {
            // Keep only the latest valid token, remove others
            var latestToken = userTokens.First();
            var tokensToRemove = userTokens.Skip(1); // All but the latest

            _context.RefreshTokens.RemoveRange(tokensToRemove);
            await _context.SaveChangesAsync();
        }

        // Remove expired tokens
        var expiredTokens = await _context.RefreshTokens
            .Where(rt => rt.Expires < DateTime.UtcNow)
            .ToListAsync();

        if (expiredTokens.Any())
        {
            _context.RefreshTokens.RemoveRange(expiredTokens);
            await _context.SaveChangesAsync();
        }
    }



}

