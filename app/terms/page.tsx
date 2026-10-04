import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileText, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions — Weblytic",
  description: "Official terms and conditions for Weblytic software development, web design, hosting, and AI chatbot deployment services.",
  alternates: {
    canonical: "https://weblytic.cc/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 selection:text-white">
      {/* Top Bar Navigation */}
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-xl sticky top-0 z-50 py-4">
        <div className="container mx-auto px-6 max-w-5xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-2xl tracking-tight text-white">
              Weblytic
            </span>
            <span className="w-2 h-2 rounded-full bg-primary-gradient mt-1" />
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
              <span>Legal & Service Agreement</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Terms & <span className="text-gradient">Conditions</span>
            </h1>
            <p className="text-text-muted text-sm">
              Last updated: October 2026 • Effective for all Weblytic clients and digital projects
            </p>
          </div>

          {/* Terms Content Body */}
          <div className="glass-card p-8 md:p-12 space-y-10 border border-white/10 text-white/90 text-sm leading-relaxed">
            
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">01.</span> Acceptance of Terms
              </h2>
              <p className="text-text-muted">
                By engaging Weblytic ("we", "us", or "our"), initiating a project, submitting an order, or utilizing our services (including custom software development, website design, hosting, local cPanel installations, and AI chatbot integrations), you ("the Client") agree to be bound by these Terms and Conditions. If you are entering into this agreement on behalf of a company, educational institution, or retail business, you represent that you hold the legal authority to bind such entity.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">02.</span> Scope of Services
              </h2>
              <p className="text-text-muted">
                Weblytic provides specialized digital engineering services including:
              </p>
              <ul className="space-y-2 text-text-muted pl-4 list-disc">
                <li><strong>Custom Offline Software:</strong> Standalone desktop point-of-sale (POS), pharmacy billing, and inventory ERP systems operating locally without recurring monthly subscription fees.</li>
                <li><strong>Web Development:</strong> High-performance modern websites, single-page landing pages, e-commerce stores, and custom Next.js full-stack web applications.</li>
                <li><strong>Domain & Hosting Infrastructure:</strong> Top-level domain registration (.com, .pk), cPanel server setup, DNS records configuration, and enterprise email provisioning.</li>
                <li><strong>Local cPanel & Server Solutions:</strong> On-premise server deployment, private intranet architectures, and local automated network backup routines.</li>
                <li><strong>AI Bot Deployment:</strong> Meta Cloud API-compliant WhatsApp business bots and website AI customer support assistants trained on client data.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">03.</span> Intellectual Property & Code Ownership
              </h2>
              <p className="text-text-muted">
                Upon 100% full settlement of all project invoices and milestone balances:
              </p>
              <ul className="space-y-2 text-text-muted pl-4 list-disc">
                <li>The Client owns full rights to the specific custom source code, website assets, and deliverables developed uniquely for their project.</li>
                <li>Weblytic retains ownership of our pre-existing proprietary modules, reusable open-source component wrappers, boilerplates, and developer tooling.</li>
                <li>Weblytic reserves the right to showcase the completed work and project name in our public portfolio and case study archives unless a non-disclosure agreement (NDA) has been explicitly executed in writing.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">04.</span> Invoicing, Pricing & Payments
              </h2>
              <p className="text-text-muted">
                All pricing is quoted in Pakistani Rupees (PKR) or agreed international currencies:
              </p>
              <ul className="space-y-2 text-text-muted pl-4 list-disc">
                <li>Standard projects operate on a milestone deposit structure (typically 50% advance upon project kick-off, and 50% upon final acceptance and deployment).</li>
                <li>Payments may be executed via direct online bank transfer, State Bank Raast ID, JazzCash, EasyPaisa, or international wire.</li>
                <li>Late payment of milestone balances beyond 14 business days may result in temporary suspension of hosted services or staging servers until the account is reconciled.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">05.</span> Third-Party APIs & Cloud Providers
              </h2>
              <p className="text-text-muted">
                Certain services require integration with third-party providers (including Meta WhatsApp Business Cloud API, Groq AI inference, ICANN domain registries, PKNIC, and Cloudflare/Netlify):
              </p>
              <ul className="space-y-2 text-text-muted pl-4 list-disc">
                <li>Weblytic is not responsible for policy alterations, downtime, or rate-limit enforcement imposed by third-party upstream platforms.</li>
                <li>Clients agree to abide by Meta's WhatsApp Commerce and Business Messaging policies. Unofficial bulk spamming or unauthorized scrapers are strictly prohibited.</li>
                <li>Domain names are subject to the direct rules and annual renewal cycles of their respective national or international registries.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">06.</span> 30-Day Defect Warranty & Support
              </h2>
              <p className="text-text-muted">
                We take immense pride in our engineering quality. Every deployed custom website or offline software package includes a <strong>30-day post-launch warranty period</strong>. During this window, Weblytic will correct any reproducible functional bugs, layout breaks, or code discrepancies matching the original project scope free of charge. Ongoing feature additions or scope changes outside the signed scope will be billed under standard hourly or milestone rates.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">07.</span> Limitation of Liability
              </h2>
              <p className="text-text-muted">
                To the fullest extent permitted by applicable law, Weblytic shall not be liable for any indirect, incidental, punitive, or consequential damages, including loss of business profits, data corruption resulting from client hardware failures, or server disruptions beyond our reasonable control. Our total aggregate liability for any claim arising from a project shall not exceed the total fees paid by the Client to Weblytic for the specific service in question.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">08.</span> Governing Law & Jurisdiction
              </h2>
              <p className="text-text-muted">
                These Terms shall be governed by, and construed in accordance with, the laws of the Islamic Republic of Pakistan. Any legal dispute or controversy arising out of these terms shall be subject to the exclusive jurisdiction of the competent courts in Sindh, Pakistan.
              </p>
            </section>

            {/* Section 9 */}
            <section className="pt-6 border-t border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-white">Contact & Legal Inquiries</h2>
              <p className="text-text-muted">
                If you have questions regarding these Terms & Conditions or wish to formalize a custom enterprise agreement, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs break-all">imranalit.freelance@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Phone className="w-4 h-4 text-secondary shrink-0" />
                  <span className="text-xs">+92 300 0219721</span>
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
