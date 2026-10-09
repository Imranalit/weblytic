import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Mail, Phone, MapPin } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Refund & Project Cancellation Policy",
  description: "Weblytic's official refund and cancellation policy for custom offline software, milestone website projects, domain registrations, and WhatsApp chatbot setups.",
  alternates: {
    canonical: "https://weblytic.cc/refund-policy",
  },
  openGraph: {
    title: "Refund & Project Cancellation Policy — Weblytic",
    description: "Weblytic's official refund policy for custom software, website design, domains, and AI chatbot setups.",
    url: "https://weblytic.cc/refund-policy",
    siteName: "Weblytic",
    images: [{ url: "/og-image.jpg" }],
  },
};

export default function RefundPolicyPage() {
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
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Assurance & Transparency</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Refund <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-text-muted text-sm font-medium">
              Last updated: October 4, 2026
            </p>
          </div>

          {/* Policy Content Body */}
          <div className="glass-card p-8 md:p-12 space-y-10 border border-white/10 text-white/90 text-sm leading-relaxed">
            
            {/* Preamble */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-text-muted leading-relaxed">
              We want you to be happy with your project, and we also have to protect the time and resources spent on custom work. This policy explains when refunds are and are not available.
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">1.</span> Before Work Begins
              </h2>
              <p className="text-text-muted">
                If you cancel before we have started work, you will receive a full refund of any advance payment, minus any non-recoverable third-party costs already paid on your behalf (such as domain registration).
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">2.</span> After Work Has Started
              </h2>
              <p className="text-text-muted">
                Because our services are custom-built, refunds are based on the progress made. If you cancel after work has started, we will keep an amount proportional to the work completed and the time spent, and refund the remainder of what you paid, if any. We will share a short summary of completed work with you when calculating this. The advance payment is non-refundable once substantial design or development work has begun.
              </p>
            </section>

            {/* Section 2a */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">2a.</span> Delivered Projects
              </h2>
              <p className="text-text-muted">
                Once a project has been delivered and accepted (see Section 7 of the Terms), payments are non-refundable. If the delivered work does not match the agreed scope, we will first fix the issue at no extra cost. A refund is considered only if we are unable to correct a material failure to deliver the agreed scope within a reasonable time, and then only for the portion of the work affected.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">3.</span> Non-Refundable Items
              </h2>
              <p className="text-text-muted">
                The following are not refundable once purchased or processed:
              </p>
              <ul className="space-y-2 text-text-muted pl-4 list-disc">
                <li>Domain registrations and renewals</li>
                <li>Hosting, SSL and business email plans purchased from third-party providers</li>
                <li>WhatsApp Business API, AI model and other usage or subscription fees</li>
                <li>Third-party licenses, themes, plugins or stock assets bought for your project</li>
                <li>Maintenance, support or change requests that have already been carried out</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">4.</span> Hosting and Recurring Services
              </h2>
              <p className="text-text-muted">
                Any service we purchase from a third party on your behalf (including domains, hosting, SSL, business email, and API or platform subscriptions) cannot be refunded by Weblytic once it has been bought, because those fees are paid to the provider and are governed by the provider's own refund terms. Recurring services can be cancelled at any time to stop future renewals, but fees already paid for the current term are non-refundable.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">5.</span> Client-Caused Delays or Abandonment
              </h2>
              <p className="text-text-muted">
                If a project is paused for more than 30 days because of missing content, feedback or payment, or if the Client stops responding, we may treat the project as cancelled. Payments made will be treated under Section 2.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">6.</span> Our Right to Decline
              </h2>
              <p className="text-text-muted">
                We do not offer refunds for a change of mind after delivery, for dissatisfaction with subjective design preferences that were approved during the process, or for results we did not guarantee (such as traffic, sales, or search rankings).
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">7.</span> How to Request a Refund
              </h2>
              <p className="text-text-muted">
                Email <strong>weblytic.cc@gmail.com</strong> or message us on WhatsApp at <strong>+92 313 1398796</strong> with your name, project details, payment proof and the reason for your request. We will review it and respond within 7 business days. Approved refunds are returned using the original payment method where possible, within 7 to 14 business days of approval. Bank or wallet transfer charges may be deducted.
              </p>
            </section>

            {/* Section 8 */}
            <section className="pt-6 border-t border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">8.</span> Contact
              </h2>
              <p className="text-text-muted">
                For questions regarding cancellations, invoices, or refund inquiries, please contact us:
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
