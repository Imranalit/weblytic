import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us & Why Choose Us | Weblytic",
  description: "Learn more about Weblytic. We provide cutting-edge web development, custom software, and infrastructure solutions from Khairpur Mirs', Sindh.",
  alternates: {
    canonical: "https://weblytic.cc/about",
  },
  openGraph: {
    title: "About Us & Why Choose Us | Weblytic",
    description: "Learn more about Weblytic. We provide cutting-edge web development, custom software, and infrastructure solutions.",
    url: "https://weblytic.cc/about",
    siteName: "Weblytic",
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
