import { Metadata } from "next";
import AuditClient from "./AuditClient";

export const metadata: Metadata = {
  title: "White-Label SEO Audit & Health Scanner",
  description: "Generate comprehensive white-label website health audits, broken link detection, and unbranded PDF reports for your clients with Weblytic.",
  alternates: {
    canonical: "https://weblytic.cc/audit",
  },
  openGraph: {
    title: "White-Label SEO Audit & Health Scanner | Weblytic",
    description: "Generate comprehensive white-label website health audits and unbranded PDF reports.",
    url: "https://weblytic.cc/audit",
    siteName: "Weblytic",
    locale: "en_US",
    type: "website",
  },
};

export default function AuditPage() {
  return <AuditClient />;
}
