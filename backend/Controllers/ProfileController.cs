using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using CVBuilder.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace CVBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Ensure authentication is required
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // GET: api/Profile/ViewProfile
        [HttpGet("ViewProfile")]
        public async Task<IActionResult> ViewProfile()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User not found. Please log in.");
            }

            return Ok(user);
        }

        // GET: api/Profile/Edit
        [HttpGet("Edit")]
        public async Task<IActionResult> Edit()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User not found. Please log in.");
            }
            return Ok(user);
        }

        // POST: api/Profile/Edit
        [HttpPost("Edit")]
        public async Task<IActionResult> Edit([FromBody] ApplicationUser model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User not found. Please log in.");
            }

            if (user.Id != model.Id)
            {
                return Forbid();
            }

            // Update user details
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.PhoneNumber = model.PhoneNumber;
            user.Address = model.Address;

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return Ok(new { message = "Profile updated successfully." });
            }

            return BadRequest(result.Errors);
        }
    }
}
