import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Business Process Auditor — Find What to Automate",
  description:
    "Answer 8 questions about your business and get a free AI-powered automation audit report. Discover which workflows to automate first and save hours every week.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
