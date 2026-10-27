import { Metadata } from "next";
import AuditClient from "./AuditClient";

export const metadata: Metadata = {
  title: "SEO Audit — Technical Website Health Scanner & PDF Reports",
  description: "Run deep technical SEO audits, inspect Core Web Vitals, discover broken links and missing meta tags, and generate white-label PDF audit reports with Weblytic SEO Audit.",
  alternates: {
    canonical: "https://weblytic.cc/audit",
  },
  openGraph: {
    title: "SEO Audit & Health Scanner | Weblytic",
    description: "Run deep technical SEO audits, broken link detection, and unbranded PDF reports for digital agencies and businesses.",
    url: "https://weblytic.cc/audit",
    siteName: "Weblytic",
    locale: "en_US",
    type: "website",
  },
};

export default function AuditPage() {
  return <AuditClient />;
}
