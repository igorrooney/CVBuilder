using System;
using System.IO;
using System.Linq;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using CVBuilder.Models;

namespace CVBuilder.Services
{
    public class PdfService
    {
        public byte[] GenerateCvPdf(CV cv)
        {
            using (var stream = new MemoryStream())
            {
                PdfWriter writer = new PdfWriter(stream);
                PdfDocument pdf = new PdfDocument(writer);
                Document document = new Document(pdf);

                // Title
                document.Add(new Paragraph("Curriculum Vitae")
                    .SetBold()
                    .SetFontSize(20)
                    .SetTextAlignment(TextAlignment.CENTER)
                    .SetMarginBottom(20));

                // Personal Details
                document.Add(new Paragraph(cv.FirstName + " " + cv.LastName)
                    .SetBold()
                    .SetFontSize(16));
                document.Add(new Paragraph($"Email: {cv.Email}").SetFontSize(12));
                document.Add(new Paragraph($"Phone: {cv.PhoneNumber}").SetFontSize(12));
                if (!string.IsNullOrEmpty(cv.Address))
                    document.Add(new Paragraph($"Address: {cv.Address}").SetFontSize(12));
                document.Add(new Paragraph(" "));

                // Professional Summary
                if (!string.IsNullOrEmpty(cv.Summary))
                {
                    document.Add(new Paragraph("Professional Summary")
                        .SetBold()
                        .SetFontSize(14)
                        .SetUnderline());
                    document.Add(new Paragraph(cv.Summary).SetFontSize(12));
                    document.Add(new Paragraph(" "));
                }

                // Work Experience
                if (cv.WorkExperiences.Any())
                {
                    document.Add(new Paragraph("Work Experience")
                        .SetBold()
                        .SetFontSize(14)
                        .SetUnderline());

                    foreach (var work in cv.WorkExperiences.OrderByDescending(w => w.EndDate))
                    {
                        document.Add(new Paragraph($"{work.JobTitle} at {work.Company}")
                            .SetBold()
                            .SetFontSize(12));
                        document.Add(new Paragraph($"{work.StartDate:MMM yyyy} - {(work.EndDate.HasValue ? work.EndDate.Value.ToString("MMM yyyy") : "Present")}")
                            .SetFontSize(12));
                        document.Add(new Paragraph(work.Responsibilities).SetFontSize(12));
                        if (!string.IsNullOrEmpty(work.Achievements))
                            document.Add(new Paragraph($"Achievements: {work.Achievements}").SetFontSize(12));
                        document.Add(new Paragraph(" "));
                    }
                }

                // Education
                if (cv.Educations.Any())
                {
                    document.Add(new Paragraph("Education")
                        .SetBold()
                        .SetFontSize(14)
                        .SetUnderline());

                    foreach (var edu in cv.Educations.OrderByDescending(e => e.GraduationYear))
                    {
                        document.Add(new Paragraph($"{edu.Degree} at {edu.Institution}")
                            .SetBold()
                            .SetFontSize(12));
                        document.Add(new Paragraph($"Graduation: {edu.GraduationYear}").SetFontSize(12));
                        document.Add(new Paragraph(" "));
                    }
                }

                // Skills
                if (!string.IsNullOrEmpty(cv.Skills))
                {
                    document.Add(new Paragraph("Skills")
                        .SetBold()
                        .SetFontSize(14)
                        .SetUnderline());
                    document.Add(new Paragraph(cv.Skills).SetFontSize(12));
                    document.Add(new Paragraph(" "));
                }

                // Certifications
                if (cv.Certifications.Any())
                {
                    document.Add(new Paragraph("Certifications")
                        .SetBold()
                        .SetFontSize(14)
                        .SetUnderline());

                    foreach (var cert in cv.Certifications)
                    {
                        document.Add(new Paragraph($"{cert.CertificationName} (Issued by {cert.IssuedBy})")
                            .SetFontSize(12));
                    }
                    document.Add(new Paragraph(" "));
                }

                // Hobbies
                if (!string.IsNullOrEmpty(cv.Hobbies))
                {
                    document.Add(new Paragraph("Hobbies & Interests")
                        .SetBold()
                        .SetFontSize(14)
                        .SetUnderline());
                    document.Add(new Paragraph(cv.Hobbies).SetFontSize(12));
                }

                document.Close();
                return stream.ToArray();
            }
        }
    }
}
