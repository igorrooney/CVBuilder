using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using CVBuilder.Models;
using CVBuilder.Services;

namespace CVBuilder.Controllers
{
    [Authorize] // Ensure only logged-in users can access
    public class CVController : Controller
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

        // GET: CV/Index (Show all CVs for logged-in user)
        public async Task<IActionResult> Index()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return RedirectToPage("/Identity/Account/Login");
            }

            var cvs = await _context.CVs
                .Where(c => c.UserId == user.Id)
                .Include(c => c.WorkExperiences)
                .Include(c => c.Educations)
                .ToListAsync(); // Use async database call

            return View(cvs);
        }

        // GET: CV/Create
        public async Task<IActionResult> CreateAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            ViewBag.User = user; // Send user details to the form

            return View();
        }

        // POST: CV/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CV cv)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return RedirectToPage("/Identity/Account/Login");
            }

            cv.UserId = user.Id;
            cv.User = user;

            // Ensure Educations are added explicitly
            if (cv.Educations != null)
            {
                foreach (var edu in cv.Educations)
                {
                    edu.CVId = cv.Id;  // Ensure foreign key assignment
                    _context.Educations.Add(edu);
                }
            }

            ModelState.Remove("UserId");
            ModelState.Remove("User");

            if (!ModelState.IsValid)
            {

                return View(cv);
            }

            _context.CVs.Add(cv);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }



        // GET: CV/Edit/{id}
        public async Task<IActionResult> Edit(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return RedirectToPage("/Identity/Account/Login");
            }

            var cv = await _context.CVs
                .Include(c => c.WorkExperiences)
                .Include(c => c.Educations)
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == user.Id);

            if (cv == null)
            {
                return NotFound();
            }

            return View(cv);
        }

        // POST: CV/Edit/{id}
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, CV cv)
        {
            if (id != cv.Id)
            {
                return NotFound();
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null || cv.UserId != user.Id)
            {
                return Forbid();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(cv);
                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error updating CV: {ex.Message}");
                    ModelState.AddModelError("", "An error occurred while updating the CV. Please try again.");
                }
            }

            return View(cv);
        }

        // GET: CV/Delete/{id}
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return RedirectToPage("/Identity/Account/Login");
            }

            var cv = await _context.CVs
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == user.Id);

            if (cv == null)
            {
                return NotFound();
            }

            return View(cv);
        }

        // POST: CV/Delete/{id}
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return RedirectToPage("/Identity/Account/Login");
            }

            var cv = await _context.CVs.FindAsync(id);
            if (cv == null || cv.UserId != user.Id)
            {
                return Forbid();
            }

            try
            {
                _context.CVs.Remove(cv);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting CV: {ex.Message}");
                ModelState.AddModelError("", "An error occurred while deleting the CV. Please try again.");
                return View(cv);
            }

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> DownloadPdf(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToPage("/Identity/Account/Login");

            var cv = await _context.CVs
                .Include(c => c.WorkExperiences)
                .Include(c => c.Educations)
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == user.Id);

            if (cv == null) return NotFound();

            var pdfBytes = _pdfService.GenerateCvPdf(cv);

            return File(pdfBytes, "application/pdf", $"{cv.FirstName}_{cv.LastName}_CV.pdf");
        }

        // GET: CV/Details/{id}
        public async Task<IActionResult> Details(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return RedirectToPage("/Identity/Account/Login");
            }

            var cv = await _context.CVs
                .Include(c => c.WorkExperiences)
                .Include(c => c.Educations)
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == user.Id);

            if (cv == null)
            {
                return NotFound();
            }

            return View(cv);
        }

    }
}
