"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import { Mail, MapPin, Phone, MessageSquare, Send } from "lucide-react";
import { fadeUp, slideInRight } from "@/lib/motion";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [teamSize, setTeamSize] = useState("1-10");
  const [packageNeeded, setPackageNeeded] = useState("Starter Landing Page ($100+)");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; message?: string }>({});

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

  const submitToNetlify = () => {
    try {
      const formData = new URLSearchParams();
      formData.append("form-name", "quote");
      formData.append("fullName", fullName);
      formData.append("email", email);
      if (organization) formData.append("organization", organization);
      formData.append("teamSize", teamSize);
      formData.append("packageNeeded", packageNeeded);
      formData.append("message", message);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      }).catch(() => {});
    } catch {
      // Ignore background submission failures
    }
  };

  const handleEmailSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) return;

    submitToNetlify();

    const subject = `New Project Inquiry: ${packageNeeded} - ${fullName}`;
    const body = `Name: ${fullName}
Email: ${email}
Organization: ${organization || "N/A"}
Team Size: ${teamSize}
Package: ${packageNeeded}

Project Details:
${message}`;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:hello@weblytic.cc?subject=${encodedSubject}&body=${encodedBody}`;
  };

  const handleWhatsAppSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) return;

    submitToNetlify();

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
              Let's build something <span className="text-gradient">amazing</span>
            </h2>
            <p className="text-lg text-text-muted mb-12 max-w-md">
              Ready to scale your business? Fill out the details below to send us your project brief via email or chat with our team directly on WhatsApp.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-text-muted">Direct Email</div>
                  <a href="mailto:hello@weblytic.cc" className="font-semibold text-white hover:text-primary transition-colors">
                    hello@weblytic.cc
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-text-muted">Location</div>
                  <div className="font-semibold text-white">Khairpur Mirs', Sindh, Pakistan</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-text-muted">WhatsApp / Phone</div>
                  <a href="https://wa.me/923131398796" className="font-semibold text-white hover:text-primary transition-colors">
                    +92 313 1398796
                  </a>
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
                name="quote"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={(e) => e.preventDefault()}
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="quote" />
                <p className="hidden">
                  <label htmlFor="quote-bot-field">Don’t fill this out if you're human:</label>
                  <input id="quote-bot-field" name="bot-field" />
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="quote-name" className="text-sm font-medium text-white">Full Name</label>
                    <input
                      id="quote-name"
                      name="fullName"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                      className={`w-full bg-background border ${errors.fullName ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                      placeholder="John Doe"
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
                    name="packageNeeded"
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
                  />
                  {errors.message && <span className="text-xs text-red-400">{errors.message}</span>}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleEmailSubmit}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-primary-gradient hover:opacity-95 shadow-lg shadow-primary/25 transition-all duration-200 cursor-pointer text-sm sm:text-base"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send via Email</span>
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
