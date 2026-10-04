import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Weblytic",
  description: "Terms of Service for Weblytic software development, web design, hosting, and AI chatbot services.",
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
              <span>Legal Agreement</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Terms of <span className="text-gradient">Service</span>
            </h1>
            <p className="text-text-muted text-sm font-medium">
              Last updated: October 4, 2026
            </p>
          </div>

          {/* Terms Content Body */}
          <div className="glass-card p-8 md:p-12 space-y-10 border border-white/10 text-white/90 text-sm leading-relaxed">
            
            {/* Preamble */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-text-muted leading-relaxed">
              These Terms of Service ("Terms") govern your use of <strong className="text-white">weblytic.cc</strong> (the "Website") and any services provided by Weblytic ("Weblytic", "we", "us", "our"), based in Khairpur Mirs', Sindh, Pakistan. By requesting a quote, paying for a service, or using the Website, you ("Client", "you") agree to these Terms. If you do not agree, please do not use our services.
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">1.</span> Services
              </h2>
              <p className="text-text-muted">
                Weblytic provides custom offline and online software, website design and development, domain and hosting setup, local (on-premise) cPanel/WHM solutions, and AI chatbot deployment (including WhatsApp and website bots). The exact scope, features, timeline and price of each project are agreed in writing (by email, WhatsApp or a signed quotation) before work begins. Anything not listed in the agreed scope is out of scope and may be quoted separately.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">2.</span> Quotes, Pricing and Payment
              </h2>
              <p className="text-text-muted">
                Prices shown on the Website are starting prices in Pakistani Rupees (PKR) and are indicative only. The final price is the one in your confirmed quotation. Unless otherwise agreed in writing:
              </p>
              <ul className="space-y-2 text-text-muted pl-4 list-disc">
                <li>Work begins after we receive an advance payment, which will be stated in your quotation.</li>
                <li>The remaining balance is due on delivery or before final handover, deployment, or release of source files and credentials.</li>
                <li>Late payment may pause work, delay delivery or suspend hosted services until the account is settled.</li>
                <li>Payments are accepted by the methods we communicate to you at the time of quotation (such as bank transfer or mobile wallet). Any transfer fees are the Client's responsibility.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">3.</span> Third-Party Costs
              </h2>
              <p className="text-text-muted">
                Some services depend on external providers such as domain registrars, hosting companies (for example Hostinger, Namecheap, GoDaddy), Netlify, WhatsApp Business API, and AI model providers. Their prices and terms are set by them, not by Weblytic, and can change. Domain, hosting, SSL, email, and API usage fees are billed at cost or as stated in your quotation. For AI bots, the setup fee does not include recurring API usage charges, which are paid by the Client.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">4.</span> Client Responsibilities
              </h2>
              <p className="text-text-muted">
                You agree to provide accurate information, content, images, logos, access credentials and timely feedback. Delays in providing these may extend the delivery timeline. You confirm that all materials you give us are yours to use or that you have permission to use them, and that they do not infringe anyone's rights or break any law.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">5.</span> Timelines
              </h2>
              <p className="text-text-muted">
                Delivery estimates (for example 2 to 4 weeks for a standard website, or longer for complex applications) are good-faith estimates, not guarantees. Timelines depend on prompt client feedback, content availability, and the scope remaining unchanged.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">6.</span> Revisions and Changes
              </h2>
              <p className="text-text-muted">
                Your quotation will state how many rounds of revisions are included. Additional revisions, new features, or changes after final approval or deployment (including maintenance) are charged separately. Requests that significantly change the original scope may require a new quote and timeline.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">7.</span> Delivery and Acceptance
              </h2>
              <p className="text-text-muted">
                A project is considered delivered when the agreed work is deployed or handed over to you. Please review it promptly. If we do not hear about material defects within 7 days of delivery, the work is considered accepted. We will fix defects (bugs where the work does not match the agreed scope) at no extra charge during a reasonable period after delivery, which is 14 days unless your quotation says otherwise.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">8.</span> Intellectual Property
              </h2>
              <p className="text-text-muted">
                Upon full payment, you own the final deliverables created specifically for you (such as your custom website design and the code written for your project), except for third-party components, frameworks, libraries, fonts, stock assets and open-source software, which remain under their own licenses. Until full payment is received, all rights remain with Weblytic. We keep the right to reuse general know-how, tools and non-confidential code snippets, and, unless you ask us not to in writing, to display your name, the name of your project, screenshots of the finished work, and a link to the live website in our portfolio. Any personal data visible in screenshots is blurred or removed first. We never publish other project details, such as internal data, documents or credentials, or your contact information.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">9.</span> Confidentiality and Data
              </h2>
              <p className="text-text-muted">
                We treat your business information, credentials and data as confidential and use them only to deliver the agreed services. We do not sell your data. For on-premise or offline systems, you are responsible for the security and backup of your own machines and data unless we have agreed to manage backups as part of the service. Our Privacy Policy explains how we handle personal information collected through the Website.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">10.</span> Hosting, Uptime and Support
              </h2>
              <p className="text-text-muted">
                Where we provide or manage hosting, we aim for high availability but cannot guarantee uninterrupted service, since hosting depends on third-party infrastructure, networks, and events outside our control. Ongoing support and maintenance are available as agreed in your quotation or a separate maintenance arrangement.
              </p>
            </section>

            {/* Section 11 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">11.</span> AI Bots
              </h2>
              <p className="text-text-muted">
                AI chatbots generate responses using machine-learning models and may occasionally produce inaccurate or incomplete answers. You are responsible for reviewing the bot's behavior, for the data you provide to train it, and for complying with the policies of platforms such as WhatsApp. We are not liable for decisions made on the basis of a bot's responses.
              </p>
            </section>

            {/* Section 12 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">12.</span> Prohibited Use
              </h2>
              <p className="text-text-muted">
                You may not use our services for unlawful, fraudulent, abusive, or harmful purposes, including illegal content, spam, malware, or infringement of others' rights. We may suspend or end services immediately if these Terms are breached.
              </p>
            </section>

            {/* Section 13 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">13.</span> Warranty Disclaimer
              </h2>
              <p className="text-text-muted">
                Our services are provided on an "as is" and "as available" basis. We work carefully to deliver quality results, but we do not promise that software or websites will be error-free, uninterrupted, or achieve particular business, search ranking or revenue results.
              </p>
            </section>

            {/* Section 14 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">14.</span> Limitation of Liability
              </h2>
              <p className="text-text-muted">
                To the fullest extent allowed by law, Weblytic is not liable for indirect, incidental, special or consequential damages, including lost profits, lost data or loss of business. Our total liability for any claim relating to a service is limited to the amount you paid us for that specific service.
              </p>
            </section>

            {/* Section 15 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">15.</span> Termination
              </h2>
              <p className="text-text-muted">
                Either party may end a project by written notice. If you cancel, you remain responsible for payment for work completed up to the date of cancellation, as described in our Refund Policy. We may end or suspend services for non-payment, breach of these Terms, or abusive behavior.
              </p>
            </section>

            {/* Section 16 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">16.</span> Governing Law
              </h2>
              <p className="text-text-muted">
                These Terms are governed by the laws of Pakistan. Any dispute that cannot be settled through good-faith discussion will be subject to the jurisdiction of the courts of Sindh, Pakistan.
              </p>
            </section>

            {/* Section 17 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">17.</span> Changes to These Terms
              </h2>
              <p className="text-text-muted">
                We may update these Terms from time to time. The updated version will be posted on this page with a new "Last updated" date. Continued use of our services after changes means you accept them. Changes do not alter the terms of an already-confirmed quotation.
              </p>
            </section>

            {/* Section 18 */}
            <section className="pt-6 border-t border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">18.</span> Contact
              </h2>
              <p className="text-text-muted">
                For questions regarding these Terms of Service or your project agreement, reach out to us:
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
