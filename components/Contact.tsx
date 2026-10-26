"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import { Mail, MapPin, Phone, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { fadeUp, slideInRight } from "@/lib/motion";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [teamSize, setTeamSize] = useState("1-10");
  const [packageNeeded, setPackageNeeded] = useState("Starter Landing Page ($100+)");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  useEffect(() => {
    const handleUrlPackage = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      let rawPkg: string | null = null;

      if (hash.includes("?")) {
        const queryPart = hash.substring(hash.indexOf("?"));
        rawPkg = new URLSearchParams(queryPart).get("package");
      }
      if (!rawPkg && search) {
        rawPkg = new URLSearchParams(search).get("package");
      }

      if (rawPkg) {
        const decoded = decodeURIComponent(rawPkg).trim().toLowerCase();
        const availableOptions = [
          "Starter Landing Page ($100+)",
          "Multi-Page Next.js / SaaS Web App ($400+)",
          "Custom Desktop / Offline POS Tool ($150+)",
          "Basic AI Assistant / WhatsApp Bot ($150+)",
          "Managed Infrastructure & Hosting ($50/yr)",
          "Custom Enterprise ERP / Full-Stack Scope",
        ];

        const matched = availableOptions.find(
          (opt) =>
            opt.toLowerCase() === decoded ||
            opt.toLowerCase().includes(decoded) ||
            decoded.includes(opt.toLowerCase().slice(0, 10))
        );

        if (matched) {
          setPackageNeeded(matched);
        }
      }
    };

    handleUrlPackage();
    window.addEventListener("hashchange", handleUrlPackage);
    return () => window.removeEventListener("hashchange", handleUrlPackage);
  }, []);

  const validate = () => {
    const newErrors: { fullName?: string; email?: string; message?: string } = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!message.trim()) newErrors.message = "Project details/message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitToWeb3Forms = async (): Promise<boolean> => {
    try {
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
        "fff0bc4d-a57c-430a-addb-1963e4534fc9";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: fullName,
          email: email,
          organization: organization || "N/A",
          teamSize: teamSize,
          package: packageNeeded,
          message: message,
          subject: `New Project Inquiry: ${packageNeeded} - ${fullName}`,
          from_name: "Weblytic Project Inquiry",
        }),
      });

      const result = await response.json();
      return Boolean(result.success);
    } catch {
      return false;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    const success = await submitToWeb3Forms();
    if (success) {
      setStatus("success");
      setResponseMsg("Thank you! Your project brief has been sent successfully. We will reply within 24 hours.");
      setFullName("");
      setEmail("");
      setOrganization("");
      setMessage("");
    } else {
      setStatus("error");
      setResponseMsg("Something went wrong with the automated submission. Please reach out to us directly via WhatsApp or email.");
    }
  };

  const handleWhatsAppSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) return;

    // Send submission to Web3Forms in background so lead is saved
    submitToWeb3Forms();

    const whatsAppText = `*New Project Inquiry!*\n\n*Name:* ${fullName}\n*Email:* ${email}\n*Organization:* ${organization || "N/A"}\n*Team Size:* ${teamSize}\n*Package:* ${packageNeeded}\n\n*Project Details:*\n${message}`;

    const encodedMessage = encodeURIComponent(whatsAppText);
    window.open(`https://wa.me/923131398796?text=${encodedMessage}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Let&apos;s build something <span className="text-gradient">amazing</span> together
            </h2>
            <p className="text-text-muted text-lg mb-8 leading-relaxed">
              Ready to scale your business? Fill out the details below to send us your project brief directly or chat with our team on WhatsApp.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-text-muted">Direct Email</div>
                  <a href="mailto:hello@weblytic.cc" className="font-semibold text-white hover:text-primary transition-colors">
                    hello@weblytic.cc
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-text-muted">Direct / WhatsApp</div>
                  <a href="https://wa.me/923131398796" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-primary transition-colors">
                    +92 313 1398796
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-text-muted">Headquarters</div>
                  <div className="font-semibold text-white">Sukkur, Sindh, Pakistan</div>
                </div>
              </div>
            </div>
          </m.div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="flex-1"
          >
            <div className="glass-panel p-8 md:p-10 rounded-2xl relative">
              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                onSubmit={handleFormSubmit}
                className="space-y-6"
              >
                <input
                  type="hidden"
                  name="access_key"
                  value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "fff0bc4d-a57c-430a-addb-1963e4534fc9"}
                />

                {status === "success" && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{responseMsg}</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                    {responseMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="quote-name" className="text-sm font-medium text-white">Full Name</label>
                    <input
                      id="quote-name"
                      name="name"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                      className={`w-full bg-background border ${errors.fullName ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                      placeholder="John Doe"
                      required
                    />
                    {errors.fullName && <span className="text-xs text-red-400">{errors.fullName}</span>}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="quote-email" className="text-sm font-medium text-white">Email Address</label>
                    <input
                      id="quote-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className={`w-full bg-background border ${errors.email ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                      placeholder="john@example.com"
                      required
                    />
                    {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="quote-organization" className="text-sm font-medium text-white">Organization Name</label>
                    <input
                      id="quote-organization"
                      name="organization"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your Company LLC"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="quote-teamSize" className="text-sm font-medium text-white">Working Team Size</label>
                    <select
                      id="quote-teamSize"
                      name="teamSize"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                    >
                      <option value="1-10">1 - 10</option>
                      <option value="10-20">10 - 20</option>
                      <option value="20-50">20 - 50</option>
                      <option value="50-100">50 - 100</option>
                      <option value="100+">100+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="quote-package" className="text-sm font-medium text-white">Package Needed</label>
                  <select
                    id="quote-package"
                    name="package"
                    value={packageNeeded}
                    onChange={(e) => setPackageNeeded(e.target.value)}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="Starter Landing Page ($100+)">Starter Landing Page ($100+)</option>
                    <option value="Multi-Page Next.js / SaaS Web App ($400+)">Multi-Page Next.js / SaaS Web App ($400+)</option>
                    <option value="Custom Desktop / Offline POS Tool ($150+)">Custom Desktop / Offline POS Tool ($150+)</option>
                    <option value="Basic AI Assistant / WhatsApp Bot ($150+)">Basic AI Assistant / WhatsApp Bot ($150+)</option>
                    <option value="Managed Infrastructure & Hosting ($50/yr)">Managed Infrastructure & Hosting ($50/yr)</option>
                    <option value="Custom Enterprise ERP / Full-Stack Scope">Custom Enterprise ERP / Full-Stack Scope</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="quote-message" className="text-sm font-medium text-white">Project Details / Message</label>
                  <textarea
                    id="quote-message"
                    name="message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    rows={4}
                    className={`w-full bg-background border ${errors.message ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none`}
                    placeholder="Tell us about your goals, specific requirements, and any questions..."
                    required
                  />
                  {errors.message && <span className="text-xs text-red-400">{errors.message}</span>}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-primary-gradient hover:opacity-95 shadow-lg shadow-primary/25 transition-all duration-200 cursor-pointer text-sm sm:text-base disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Inquiry</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-success hover:bg-success/90 shadow-lg shadow-success/20 transition-all duration-200 cursor-pointer text-sm sm:text-base"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>
              </form>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
