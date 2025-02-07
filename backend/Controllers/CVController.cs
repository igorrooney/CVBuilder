using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using CVBuilder.Models;
using CVBuilder.Services;

namespace CVBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CVController : ControllerBase  // Change to ControllerBase for API-only actions
    {
        private readonly AppDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly PdfService _pdfService;

        public CVController(AppDbContext context, UserManager<ApplicationUser> userManager, PdfService pdfService)
        {
            _context = context;
            _userManager = userManager;
            _pdfService = pdfService;
        }

        // ✅ GET: api/cv - Get all CVs for the logged-in user
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var cvs = await _context.CVs
                .Where(c => c.UserId == user.Id)
                .Include(c => c.WorkExperiences)
                .Include(c => c.Educations)
                .ToListAsync();

            return Ok(cvs);
        }

        // ✅ GET: api/cv/{id} - Get CV by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var cv = await _context.CVs
                .Include(c => c.WorkExperiences)
                .Include(c => c.Educations)
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == user.Id);

            if (cv == null) return NotFound();

            return Ok(cv);
        }

        // ✅ POST: api/cv - Create a new CV
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CV cv)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            cv.UserId = user.Id;
            ModelState.Remove("UserId"); // Prevent validation error

            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.CVs.Add(cv);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = cv.Id }, cv);
        }

        // ✅ PUT: api/cv/{id} - Update an existing CV
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CV cv)
        {
            if (id != cv.Id) return BadRequest("Mismatched CV ID");

            var user = await _userManager.GetUserAsync(User);
            if (user == null || cv.UserId != user.Id) return Forbid();

            var existingCv = await _context.CVs
                .Include(c => c.WorkExperiences)
                .Include(c => c.Educations)
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == user.Id);

            if (existingCv == null) return NotFound();

            // Remove existing data before updating
            _context.WorkExperiences.RemoveRange(existingCv.WorkExperiences);
            _context.Educations.RemoveRange(existingCv.Educations);
            await _context.SaveChangesAsync();

            // Update CV details
            existingCv.FirstName = cv.FirstName;
            existingCv.LastName = cv.LastName;
            existingCv.PhoneNumber = cv.PhoneNumber;
            existingCv.Email = cv.Email;
            existingCv.Summary = cv.Summary;
            existingCv.WorkExperiences = cv.WorkExperiences ?? new List<WorkExperience>();
            existingCv.Educations = cv.Educations ?? new List<Education>();

            _context.Update(existingCv);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ✅ DELETE: api/cv/{id} - Delete a CV
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var cv = await _context.CVs.FindAsync(id);
            if (cv == null || cv.UserId != user.Id) return NotFound();

            _context.CVs.Remove(cv);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ✅ GET: api/cv/download/{id} - Download CV as PDF
        [HttpGet("download/{id}")]
        public async Task<IActionResult> DownloadPdf(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var cv = await _context.CVs
                .Include(c => c.WorkExperiences)
                .Include(c => c.Educations)
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == user.Id);

            if (cv == null) return NotFound();

            var pdfBytes = _pdfService.GenerateCvPdf(cv);

            return File(pdfBytes, "application/pdf", $"{cv.FirstName}_{cv.LastName}_CV.pdf");
        }
    }
}
