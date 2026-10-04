import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Weblytic",
  description: "Official Privacy Policy for Weblytic. Explains how we collect, use, and protect your information when using weblytic.cc and our services.",
  alternates: {
    canonical: "https://weblytic.cc/privacy",
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
              This Privacy Policy explains how Weblytic ("Weblytic", "we", "us", "our"), based in Khairpur Mirs', Sindh, Pakistan, collects, uses and protects information when you visit <strong className="text-white">weblytic.cc</strong> (the "Website"), contact us, or use our services. By using the Website, you agree to the practices described here.
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
                <p>
                  We do not knowingly collect personal information from children under 13, and our services are intended for businesses and adults.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">2.</span> How We Use Your Information
              </h2>
              <p className="text-text-muted">
                We use your information to respond to your enquiries and prepare quotes, to provide and manage the services you request, to process payments and keep business records, to communicate with you about your project, support and updates, to send newsletters if you subscribed (you can unsubscribe at any time), and to protect the Website against misuse. Client data is used only to work on the client's project. We do not use any information for personal purposes or for anything unrelated to the work, and we do not sell your personal information.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">3.</span> Third-Party Services
              </h2>
              <p className="text-text-muted">
                We rely on trusted third parties to run our business, and they may process your information on our behalf or under their own policies. These can include Netlify, which hosts this Website, messaging platforms (WhatsApp), email providers, domain registrars and hosting companies (for example Hostinger, Namecheap, GoDaddy) when we set up services for you, and Groq, the AI provider we use to power AI chatbots. Netlify may collect technical data about visitors to the Website, such as IP addresses and request logs, and Groq may collect and process the messages and data sent to the AI models. We share only what is reasonably necessary for these providers to perform their function, and their collection and handling of data is governed by their own privacy policies, which we encourage you to read. Weblytic does not control how they handle that data. The Website may also link to external sites, such as client project sites, which we do not control and are not responsible for.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">4.</span> Client Data and AI Bots
              </h2>
              <p className="text-text-muted">
                If we build software, websites, or AI chatbots for you, the data you provide for the project (such as business documents used to train a bot) is used only to deliver and support that project. You are responsible for having the right to share that data with us, and for the privacy practices of the final product you operate, including notifying your own users where required. Conversations with an AI chatbot are processed by our AI provider, Groq, which may collect that data under its own policies, so please avoid putting highly sensitive information into a chatbot.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">5.</span> When We Share Information
              </h2>
              <p className="text-text-muted">
                Apart from the service providers above, we may disclose information if required by law, court order, or a lawful request from authorities, to protect our rights, safety or property or those of others, or in connection with a sale or transfer of the business. We will not share your information for third-party marketing.
              </p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h3 className="font-semibold text-white">Client names and portfolio</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Client information is kept private. What we may choose to show publicly in our portfolio is limited to the name of a client, the name of their project, screenshots of the finished work, and a link to the live website, and we may or may not do so depending on the project and the client's wishes. Any personal data that appears in a screenshot is blurred or removed before it is published. We never publish any other project details, such as internal data, documents or credentials, and we never share a client's contact information.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">6.</span> Data Retention
              </h2>
              <p className="text-text-muted">
                We keep personal information only as long as needed for the purposes described here, including to deliver services, resolve disputes, and meet legal, accounting and record-keeping obligations. Enquiry details are generally kept for as long as the conversation or project is active and for a reasonable period afterwards. Newsletter data is kept until you unsubscribe.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">7.</span> Data Security
              </h2>
              <p className="text-text-muted">
                We use reasonable technical and organizational measures to protect your information, such as access controls and trusted providers. No method of transmission or storage over the internet is completely secure, so we cannot guarantee absolute security. Please avoid sending sensitive passwords or financial details through open channels when a safer method is available, and let us know how we can help share them securely.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">8.</span> Your Choices and Rights
              </h2>
              <p className="text-text-muted">
                You may ask us to access the personal information we hold about you, to correct it, or to delete it, subject to any legal or record-keeping obligations we must follow. You can unsubscribe from our newsletter at any time using the link in the email or by contacting us. To make a request, contact us using the details below, and we will respond within a reasonable time.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">9.</span> International Visitors
              </h2>
              <p className="text-text-muted">
                Our business operates from Pakistan, and information may be processed in other countries where our service providers operate. By using the Website, you understand your information may be transferred and stored outside your own country.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary font-mono text-base">10.</span> Changes to This Policy
              </h2>
              <p className="text-text-muted">
                We may update this Privacy Policy from time to time. The latest version will always be posted on this page with an updated "Last updated" date. Continuing to use the Website after changes means you accept the updated policy.
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
