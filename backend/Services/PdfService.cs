using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using System.IO;
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
                    .SetFontSize(22)
                    .SetBold()
                    .SetTextAlignment(TextAlignment.CENTER)
                    .SetMarginBottom(20));

                // Personal Details
                document.Add(new Paragraph("Personal Details")
                    .SetFontSize(16)
                    .SetBold()
                    .SetMarginBottom(10));
                document.Add(new Paragraph($"{cv.FirstName} {cv.LastName}")
                    .SetFontSize(12));
                document.Add(new Paragraph($"Email: {cv.Email}")
                    .SetFontSize(12));
                document.Add(new Paragraph($"Phone: {cv.PhoneNumber}")
                    .SetFontSize(12));
                document.Add(new Paragraph($"Address: {cv.Address}")
                    .SetFontSize(12));
                document.Add(new Paragraph($"Summary:\n{cv.Summary}")
                    .SetFontSize(12).SetMarginBottom(15));

                // Work Experience
                document.Add(new Paragraph("Work Experience")
                    .SetFontSize(16)
                    .SetBold()
                    .SetMarginBottom(10));
                foreach (var work in cv.WorkExperiences)
                {
                    document.Add(new Paragraph($"{work.JobTitle} at {work.Company}")
                        .SetFontSize(12)
                        .SetBold());
                    document.Add(new Paragraph($"{work.StartDate:MMM yyyy} - {(work.EndDate.HasValue ? work.EndDate.Value.ToString("MMM yyyy") : "Present")}")
                        .SetFontSize(12));
                    document.Add(new Paragraph("Responsibilities:")
                        .SetBold().SetFontSize(12));
                    document.Add(new Paragraph(work.Responsibilities)
                        .SetFontSize(12));
                    document.Add(new Paragraph("Achievements:")
                        .SetBold().SetFontSize(12));
                    document.Add(new Paragraph(work.Achievements ?? "N/A")
                        .SetFontSize(12).SetMarginBottom(10));
                }

                // Education
                document.Add(new Paragraph("Education")
                    .SetFontSize(16)
                    .SetBold()
                    .SetMarginBottom(10));
                foreach (var edu in cv.Educations)
                {
                    document.Add(new Paragraph($"{edu.Degree} at {edu.Institution}")
                        .SetFontSize(12)
                        .SetBold());
                    document.Add(new Paragraph($"Graduation Year: {edu.GraduationYear}")
                        .SetFontSize(12).SetMarginBottom(10));
                }

                // Skills
                document.Add(new Paragraph("Skills")
                    .SetFontSize(16)
                    .SetBold()
                    .SetMarginBottom(10));
                document.Add(new Paragraph(cv.Skills ?? "N/A")
                    .SetFontSize(12).SetMarginBottom(10));

                // Certifications
                if (cv.Certifications.Any())
                {
                    document.Add(new Paragraph("Certifications")
                        .SetFontSize(16)
                        .SetBold()
                        .SetMarginBottom(10));
                    foreach (var cert in cv.Certifications)
                    {
                        document.Add(new Paragraph($"{cert.CertificationName} - {cert.IssuedBy}")
                            .SetFontSize(12).SetMarginBottom(5));
                    }
                }

                // Hobbies
                document.Add(new Paragraph("Hobbies & Interests")
                    .SetFontSize(16)
                    .SetBold()
                    .SetMarginBottom(10));
                document.Add(new Paragraph(cv.Hobbies ?? "N/A")
                    .SetFontSize(12));

                document.Close();
                return stream.ToArray();
            }
        }
    }
}
