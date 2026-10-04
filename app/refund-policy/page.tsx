import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, RefreshCw, ShieldAlert, CheckCircle2, Mail, Phone, MapPin, AlertCircle } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Refund Policy — Weblytic",
  description: "Official refund and cancellation policy for Weblytic software development, web design, hosting, and AI chatbot services.",
  alternates: {
    canonical: "https://weblytic.cc/refund-policy",
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
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Customer Satisfaction & Assurance</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Refund & Cancellation <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-text-muted text-sm">
              Last updated: October 2026 • Transparent guidelines for client deposits, project milestones, and guarantees
            </p>
          </div>

          {/* Refund Content Body */}
          <div className="glass-card p-8 md:p-12 space-y-10 border border-white/10 text-white/90 text-sm leading-relaxed">
            
            {/* Overview */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">01.</span> Our Philosophy
              </h2>
              <p className="text-text-muted">
                At Weblytic, we believe in building long-term, trustworthy partnerships with business owners, retail shops, and organizations across Pakistan and abroad. Because software engineering, custom website creation, and AI model configurations require substantial technical investment and allocated engineering hours, our refund policy is designed to be fair, structured, and completely transparent.
              </p>
            </section>

            {/* Custom Software & Web Development */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">02.</span> Custom Software & Web Development Projects
              </h2>
              <div className="space-y-3 text-text-muted">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" /> Pre-Commencement Phase (100% Refundable)
                  </h3>
                  <p className="text-xs">
                    If you submit an advance deposit but choose to cancel your project within <strong>48 hours</strong>, prior to the commencement of wireframing, architecture planning, or repository creation, you will receive a full <strong>100% refund</strong> of your deposit with no questions asked.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Active Development Phase (Prorated Refund)
                  </h3>
                  <p className="text-xs">
                    If a project is halted mid-development by the Client, you are only liable for milestones completed and approved up to that date. Any unspent balance or unstarted milestone prepayments will be promptly refunded to you.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-text-muted" /> Completed & Deployed Work (Non-Refundable)
                  </h3>
                  <p className="text-xs">
                    Once the project reaches final client acceptance, source code is handed over, or software is deployed to your live server / local store computer, payments become strictly non-refundable. At that stage, our 30-day technical warranty takes effect to correct any defects free of charge.
                  </p>
                </div>
              </div>
            </section>

            {/* Third-Party Expenses */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">03.</span> Domains & Third-Party Registry Costs
              </h2>
              <p className="text-text-muted">
                Domain registrations (.com, .pk, .org, .net), cPanel server license fees, and third-party API vouchers are provisioned instantly through international registries (ICANN, PKNIC) and cannot be un-registered or returned. Therefore, fees paid directly for domain acquisitions and non-recoverable third-party licenses are strictly <strong>non-refundable</strong>.
              </p>
            </section>

            {/* WhatsApp AI Bots */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">04.</span> WhatsApp AI Chatbot Deployments
              </h2>
              <ul className="space-y-2 text-text-muted pl-4 list-disc">
                <li>Weblytic's bot configuration fee is 100% refundable if requested before your business WhatsApp number is bound to the Meta Cloud API and model fine-tuning has started.</li>
                <li>Once the AI bot is trained on your catalog and deployed live on your WhatsApp Business number, the setup fee is considered delivered and non-refundable.</li>
                <li>Meta's own per-conversation charges (after their 1,000 free monthly tier) are billed directly by Meta and fall outside Weblytic's control.</li>
              </ul>
            </section>

            {/* 30-Day Defect Guarantee */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">05.</span> 30-Day Technical Defect Guarantee
              </h2>
              <p className="text-text-muted">
                We stand behind our code. Every custom application, offline POS tool, and website built by Weblytic is backed by a <strong>30-day post-launch warranty</strong>. If you identify a reproducible defect, database anomaly, or functional breakdown that contradicts the agreed specification:
              </p>
              <ul className="space-y-2 text-text-muted pl-4 list-disc">
                <li>We will inspect, debug, and patch the issue free of charge as our highest priority.</li>
                <li>In the unlikely event that Weblytic is technically unable to deliver a fundamental core feature as contracted in the written project scope, an appropriate partial or full refund for that specific feature milestone will be issued immediately.</li>
              </ul>
            </section>

            {/* Refund Process */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">06.</span> How to Request a Refund
              </h2>
              <p className="text-text-muted">
                To submit a cancellation or refund inquiry:
              </p>
              <ol className="space-y-2 text-text-muted pl-4 list-decimal">
                <li>Email us at <strong>imranalit.freelance@gmail.com</strong> or message our support team on WhatsApp at <strong>+92 300 0219721</strong>.</li>
                <li>Include your Invoice Number, Organization Name, and a brief description of your request.</li>
                <li>Our management will review the project status and process approved refunds within <strong>5 to 7 business days</strong> via original payment method (Bank Transfer, Raast ID, JazzCash, or EasyPaisa).</li>
              </ol>
            </section>

            {/* Contact */}
            <section className="pt-6 border-t border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-white">Direct Support & Inquiries</h2>
              <p className="text-text-muted">
                Have questions or need assistance with an invoice? We are here to help:
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
