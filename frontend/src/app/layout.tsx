import "./globals.css";
import React from 'react';
import ClientProviders from '@/components/ClientProviders'; // adjust the path as needed

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
