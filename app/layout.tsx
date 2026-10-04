import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "Weblytic — Custom Software, Websites, Hosting & cPanel Solutions",
  description: "Build, host, and scale with Weblytic. Custom software, high-performance websites, domains, hosting, and local cPanel solutions.",
  openGraph: {
    title: "Weblytic — Custom Software, Websites, Hosting & cPanel Solutions",
    description: "Build, host, and scale with Weblytic. Custom software, high-performance websites, domains, hosting, and local cPanel solutions.",
    images: ["/og-image.png"],
  },
};

import Chatbot from "@/components/Chatbot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased selection:bg-primary/30 selection:text-white`}>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
