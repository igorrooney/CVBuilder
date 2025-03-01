using CVBuilder.Models;
using System.ComponentModel.DataAnnotations;

public class RefreshToken
{
    [Key]
    public int Id { get; set; }

    public string Token { get; set; } = string.Empty;

    // The user to whom this refresh token belongs
    public string UserId { get; set; } = string.Empty;
    public ApplicationUser User { get; set; } // if using Identity's ApplicationUser

    // When the token expires
    public DateTime Expires { get; set; }

    // Whether the token has been used/invalidated
    public bool IsRevoked { get; set; } = false;

    // (Optional) track creation time, IP address, etc. for extra security checks
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string? CreatedByIp { get; set; }
}
