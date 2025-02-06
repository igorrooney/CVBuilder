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

            ViewData["Breadcrumbs"] = new List<(string title, string url)>
            {
                ("Home", Url.Action("Index", "Home")),
                ("Your CVs", ""),
            };

            return View(cvs);
        }

        // GET: CV/Create (For creating a new CV)
        public async Task<IActionResult> Create()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return RedirectToPage("/Identity/Account/Login");
            }

            var cv = new CV
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber
            };

            ViewData["Breadcrumbs"] = new List<(string title, string url)>
        {
            ("Your CVs", Url.Action("Index", "CV")),
        };

            return View("Create", cv); // Pass a new CV instance with user data
        }

        // GET: CV/Edit/{id} (For editing an existing CV)
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

            ViewBag.User = user;

            ViewData["Breadcrumbs"] = new List<(string title, string url)>
            {
                ("Home", Url.Action("Index", "Home")),
                ("Your CVs", Url.Action("Index", "CV")),
                ("Edit Your CV", ""),
            };

            return View("Create", cv); // Reuse the Create.cshtml for editing
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CV cv)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return RedirectToPage("/Identity/Account/Login");
            }

            // Assign UserId before validation
            cv.UserId = user.Id;

            // Log for debugging
            Console.WriteLine($"Assigning UserId: {cv.UserId}");

            // Remove model state errors related to UserId
            ModelState.Remove("UserId");

            if (!ModelState.IsValid)
            {
                foreach (var error in ModelState)
                {
                    Console.WriteLine($"Field: {error.Key}, Errors: {string.Join(", ", error.Value.Errors.Select(e => e.ErrorMessage))}");
                }
                return View("Create", cv);
            }

            _context.CVs.Add(cv);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }


        // POST: CV/Edit/{id}
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, CV cv)
        {
            if (id != cv.Id)
            {
                return BadRequest();
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null || cv.UserId != user.Id)
            {
                return Forbid();
            }

            var existingCv = await _context.CVs
                .Include(c => c.WorkExperiences)
                .Include(c => c.Educations)
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == user.Id);

            if (existingCv == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return View("Create", cv);
            }

            try
            {
                // Clear existing Work Experiences and Educations before updating
                _context.WorkExperiences.RemoveRange(existingCv.WorkExperiences);
                _context.Educations.RemoveRange(existingCv.Educations);
                await _context.SaveChangesAsync(); // Commit removal before adding new ones

                // Update CV fields
                existingCv.FirstName = cv.FirstName;
                existingCv.LastName = cv.LastName;
                existingCv.PhoneNumber = cv.PhoneNumber;
                existingCv.Email = cv.Email;
                existingCv.Summary = cv.Summary;
                existingCv.WorkExperiences = cv.WorkExperiences ?? new List<WorkExperience>();
                existingCv.Educations = cv.Educations ?? new List<Education>();

                _context.Update(existingCv);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating CV: {ex.Message}");
                ModelState.AddModelError("", "An error occurred while updating the CV. Please try again.");
                return View("Create", cv);
            }

            return RedirectToAction(nameof(Index));
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

            ViewData["Breadcrumbs"] = new List<(string title, string url)>
            {
                ("Home", Url.Action("Index", "Home")),
                ("Your CVs", Url.Action("Index", "CV")),
                ("Delete CV", ""),
            };

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

            ViewData["Breadcrumbs"] = new List<(string title, string url)>
            {
                ("Home", Url.Action("Index", "Home")),
                ("Your CVs", Url.Action("Index", "CV")),
                ("CV Details", ""),
            };

            return View(cv);
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
    }
}
