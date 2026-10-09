import { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers | Weblytic",
  description: "Join Weblytic. We are looking for a Business Development Executive (Lead Conversion Specialist).",
  alternates: {
    canonical: "https://weblytic.cc/careers",
  },
  openGraph: {
    title: "Careers | Weblytic",
    description: "Join Weblytic. We are looking for a Business Development Executive (Lead Conversion Specialist).",
    url: "https://weblytic.cc/careers",
    siteName: "Weblytic",
    locale: "en_US",
    type: "website",
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
