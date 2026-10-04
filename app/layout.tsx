import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://weblytic.cc"),
  title: "Weblytic — Custom Software, Websites, Hosting & cPanel Solutions",
  description: "Build, host, and scale with Weblytic. Custom offline software, high-performance websites, domains, hosting, local cPanel solutions, and AI bots.",
  openGraph: {
    title: "Weblytic — Custom Software, Websites, Hosting & cPanel Solutions",
    description: "Build, host, and scale with Weblytic. Custom offline software, high-performance websites, domains, hosting, local cPanel solutions, and AI bots.",
    url: "https://weblytic.cc",
    siteName: "Weblytic",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Weblytic - Digital Solutions Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weblytic — Custom Software, Websites, Hosting & cPanel Solutions",
    description: "Build, host, and scale with Weblytic. Custom offline software, high-performance websites, domains, hosting, local cPanel solutions, and AI bots.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased selection:bg-primary/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
