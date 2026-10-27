import { Metadata } from "next";
import AuditLoginClient from "./AuditLoginClient";

export const metadata: Metadata = {
  title: "Agency Sign In — SEO Audit Console | Weblytic",
  description: "Sign in to your Weblytic SEO Audit account to manage agency scans, white-label branding, and PDF exports.",
  alternates: {
    canonical: "https://weblytic.cc/audit/login",
  },
  openGraph: {
    title: "Agency Sign In — SEO Audit Console | Weblytic",
    description: "Sign in to access advanced website crawling, client white-label branding, and PDF exports.",
    url: "https://weblytic.cc/audit/login",
    siteName: "Weblytic",
    locale: "en_US",
    type: "website",
  },
};

export default function AuditLoginPage() {
  return <AuditLoginClient />;
}
