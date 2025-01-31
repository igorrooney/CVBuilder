using CVBuilder.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Authorize]
public class CVController : Controller
{
    private readonly AppDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public CVController(AppDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    // GET: CV/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: CV/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(CV cv)
    {
        if (ModelState.IsValid)
        {
            var user = await _userManager.GetUserAsync(User); // Get logged-in user
            cv.UserId = user.Id; // Assign the user's ID to the CV
            _context.CVs.Add(cv);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        return View(cv);
    }

    // GET: CV/Index (show only the user's CVs)
    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return RedirectToPage("/Identity/Account/Login");
        }
        var cvs = _context.CVs
            .Where(c => c.UserId == user.Id) // Filter by the current user
            .Include(c => c.WorkExperiences)
            .Include(c => c.Educations)
            .ToList();
        return View(cvs);
    }
}