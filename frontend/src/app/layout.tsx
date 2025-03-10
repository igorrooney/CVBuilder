import ClientProviders from "@/components/ClientProviders";
import React from "react";
import "./globals.css";
import { Metadata } from "next";
import Navbar from "@/components/UI/Navbar";

export const metadata: Metadata = {
  title: {
    default: "CV Builder",
    template: "%s | CV Builder",
  },
  description: "Build professional CVs and cover letters with ease.",
  keywords: ["CV Builder", "Resumes", "Cover Letters", "Professional"],
  openGraph: {
    title: "CV Builder",
    description: "Create professional resumes and cover letters quickly.",
    siteName: "CV Builder",
    locale: "en_US",
    type: "website",
    /*
    // If you want to specify an OG image:
    images: [
      {
        url: "https://www.yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    // If you want a canonical base URL:
    url: "https://www.yourdomain.com",
    */
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Builder",
    description: "Create professional resumes and cover letters quickly.",
    // images: ["https://www.yourdomain.com/og-image.jpg"],
  },
  /*
  // If you want a global canonical URL for the entire site:
  metadataBase: new URL("https://www.yourdomain.com"),
  */
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head />
      <body>
        <ClientProviders>
          <Navbar />
          <main role="main">{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
