import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vishal More | Full-Stack & Flutter Developer",
  description:
    "Portfolio of Vishal More, a Full-Stack & Flutter Developer specializing in mobile applications, web platforms, admin dashboards and custom business software.",
  keywords: [
    "Vishal More",
    "Flutter Developer",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Mobile App Developer",
    "Pune",
    "India",
  ],
  authors: [{ name: "Vishal More" }],
  creator: "Vishal More",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saurabhganjale.dev",
    title: "Vishal More | Full-Stack & Flutter Developer",
    description:
      "Portfolio of Vishal More, a Full-Stack & Flutter Developer specializing in mobile applications, web platforms, admin dashboards and custom business software.",
    siteName: "Vishal More Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishal More | Full-Stack & Flutter Developer",
    description:
      "Full-Stack & Flutter Developer specializing in mobile applications, web platforms and custom business software.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
