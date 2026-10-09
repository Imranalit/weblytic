import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy & Client Data Protection",
  description: "Official Privacy Policy for Weblytic. Explains how client data, project credentials, and WhatsApp AI bot information are securely protected and handled.",
  alternates: {
    canonical: "https://weblytic.cc/privacy",
  },
  openGraph: {
    title: "Privacy Policy & Client Data Protection — Weblytic",
    description: "Official Privacy Policy for Weblytic. Explains how client data, project credentials, and WhatsApp bot data are protected.",
    url: "https://weblytic.cc/privacy",
    siteName: "Weblytic",
    images: [{ url: "/og-image.jpg" }],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 selection:text-white">
      {/* Top Bar Navigation */}
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-xl sticky top-0 z-50 py-4">
        <div className="container mx-auto px-6 max-w-5xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-2xl tracking-tight text-white">
              Weblytic
            </span>
            <span className="w-2 h-2 rounded-full bg-primary-gradient mt-1 animate-heartbeat" />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Data Protection & Privacy</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-text-muted text-sm font-medium">
              Last updated: October 4, 2026
            </p>
          </div>

          {/* Policy Content Body */}
          <div className="glass-card p-8 md:p-12 space-y-10 border border-white/10 text-white/90 text-sm leading-relaxed">
            
            {/* Preamble */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-text-muted leading-relaxed">
              This Privacy Policy explains how Weblytic ("Weblytic", "we", "us", "our"), based in Khairpur Mirs', Sindh, Pakistan, collects, uses and protects information when you visit <strong className="text-white">weblytic.cc</strong> (the "Website"), contact us, or use our services. For the purposes of the General Data Protection Regulation (GDPR) and the UK GDPR, Weblytic acts as the <strong>Data Controller</strong> for the personal data collected through this Website. By using the Website, you agree to the practices described here.
            </div>

            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">1.</span> Information We Collect
              </h2>
              
              <div className="space-y-3 text-text-muted">
                <p>
                  <strong className="text-white">Information you give us.</strong> When you fill in the contact form, request a quote, message us on WhatsApp or email, or chat with us through the Website, we may collect your name, organization name, email address, phone number, the package you are interested in, your team size, and any details you write in your message. If you subscribe to our newsletter, we collect your email address. If you become a client, we also collect the project information, content, and access credentials you share so we can deliver the work, along with billing and payment details such as transfer references.
                </p>
                <p>
                  <strong className="text-white">Information collected automatically.</strong> Like most websites, our hosting provider may automatically record basic technical data in server logs, such as your IP address, browser type, and the pages requested. This is used only to keep the Website secure and running properly, and we do not use it to track or profile you.
                </p>
                <p>
                  <strong className="text-white">Cookies.</strong> Weblytic does not use cookies on the Website, and we do not plan to. We do not use cookies or similar tracking technologies to follow you around the Website or the internet.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">2.</span> How We Use Your Information & Lawful Basis
              </h2>
              <p className="text-text-muted">
                Under the GDPR, we must have a lawful basis for processing your data. We rely on the following bases:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-text-muted">
                <li><strong>Contractual Necessity:</strong> To respond to your enquiries, prepare quotes, provide and manage services, and process payments.</li>
                <li><strong>Legitimate Interests:</strong> To protect the Website against misuse, keep business records, and improve our services.</li>
                <li><strong>Consent:</strong> To send newsletters (if you subscribed). You can withdraw this consent at any time.</li>
              </ul>
              <p className="text-text-muted">
                Client data is used strictly to execute the project. We do not sell your personal information or use it for unrelated marketing.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">3.</span> Third-Party Services
              </h2>
              <p className="text-text-muted">
                We rely on trusted third parties to run our business, acting as Data Processors. These include Netlify (hosting), WhatsApp (messaging), email providers, domain registrars, and Groq (AI provider for chatbots). We share only what is strictly necessary. We have executed Data Processing Agreements (DPAs) or rely on standard contractual clauses where applicable to ensure they protect your data. Weblytic does not control external links or third-party client project sites.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">4.</span> Client Data and AI Bots
              </h2>
              <p className="text-text-muted">
                When we build software or AI chatbots for you, the data you provide is used solely to deliver the project. You are responsible for securing the right to share that data with us, acting as the Data Controller for your end-users. Conversations with our Website AI chatbot are processed securely by Groq. Please avoid entering highly sensitive personal data into the chatbot.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">5.</span> When We Share Information
              </h2>
              <p className="text-text-muted">
                Apart from service providers, we may disclose information if required by law, court order, or to protect our legal rights. Client names and project screenshots may be used in our portfolio only with implied or explicit consent. Any personal data in screenshots is blurred before publication. We never share credentials or contact information publicly.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">6.</span> Data Retention
              </h2>
              <p className="text-text-muted">
                We retain personal data only for as long as necessary. Specifically:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-text-muted">
                <li><strong>Enquiries:</strong> Deleted 12 months after the last communication if no project is initiated.</li>
                <li><strong>Client Records & Billing:</strong> Kept for up to 7 years to comply with tax and accounting laws.</li>
                <li><strong>Newsletters:</strong> Kept until you unsubscribe, at which point your email is permanently deleted from the active list.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">7.</span> Data Security
              </h2>
              <p className="text-text-muted">
                We implement strict technical and organizational measures to protect your data, including TLS/SSL encryption in transit, strict access controls, and secure credentials management. While we strive for absolute security, no internet transmission is 100% secure.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">8.</span> Your Rights (GDPR & UK GDPR)
              </h2>
              <p className="text-text-muted">
                If you are located in the EEA or the UK, you have the right to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-text-muted">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate data.</li>
                <li><strong>Erasure:</strong> Request deletion of your data (the "right to be forgotten").</li>
                <li><strong>Restriction & Objection:</strong> Restrict or object to our processing of your data.</li>
                <li><strong>Portability:</strong> Request transfer of your data to another organization.</li>
              </ul>
              <p className="text-text-muted">
                To exercise these rights, contact us at weblytic.cc@gmail.com. You also have the right to lodge a complaint with your local supervisory authority.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">9.</span> International Data Transfers
              </h2>
              <p className="text-text-muted">
                Weblytic operates in Pakistan. When you interact with our Website, your data is processed outside the EEA/UK. We ensure that such transfers are protected by appropriate safeguards, including standard contractual clauses (SCCs) with our hosting and AI infrastructure partners located in the US and EU, guaranteeing a level of protection equivalent to the GDPR.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">10.</span> Changes to This Policy
              </h2>
              <p className="text-text-muted">
                We may update this Privacy Policy from time to time. The latest version will always be posted on this page with an updated "Last updated" date.
              </p>
            </section>

            {/* Section 11 */}
            <section className="pt-6 border-t border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">11.</span> Contact Us
              </h2>
              <p className="text-text-muted">
                If you have questions about this Privacy Policy or how your information is handled, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs break-all">weblytic.cc@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Phone className="w-4 h-4 text-secondary shrink-0" />
                  <span className="text-xs">+92 313 1398796</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <MapPin className="w-4 h-4 text-success shrink-0" />
                  <span className="text-xs">Khairpur Mirs', Sindh, Pakistan</span>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
