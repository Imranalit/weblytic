"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, MapPin, Phone, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "./ui/Button";
import { fadeUp, slideInRight } from "@/lib/motion";

type FormData = {
  name: string;
  email: string;
  organization: string;
  teamSize: string;
  package: string;
  message: string;
  "bot-field"?: string;
};

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (data: FormData, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    setStatus("sending");
    
    try {
      const formData = new URLSearchParams();
      formData.append("form-name", "quote");
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (!res.ok) throw new Error(`Netlify form POST failed: ${res.status}`);

      setStatus("sent");
      
      const phoneNumber = "923131398796";
      const text = `*New Quote Request!*\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Organization:* ${data.organization || "N/A"}\n*Team Size:* ${data.teamSize}\n*Package:* ${data.package}\n\n*Message:*\n${data.message}`;
      
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
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
              Ready to scale your business? Fill out the details below and chat with our team directly on WhatsApp to get an instant quote.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-text-muted">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Email Us</div>
                  <a href="mailto:weblytic.cc@gmail.com" className="hover:text-primary transition-colors">
                    weblytic.cc@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-text-muted">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Call / WhatsApp</div>
                  <a href="https://wa.me/923131398796" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                    +92 313 1398796
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-text-muted">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-success">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Headquarters</div>
                  <div>Khairpur Mirs', Sindh, Pakistan</div>
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
            <div className="glass-card p-8 md:p-10 relative">
              <form name="quote" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <input type="hidden" name="form-name" value="quote" />
                <p className="hidden">
                  <label htmlFor="quote-bot-field">Don’t fill this out if you're human:</label>
                  <input id="quote-bot-field" {...register("bot-field")} />
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="quote-name" className="text-sm font-medium text-white">Full Name</label>
                    <input
                      id="quote-name"
                      {...register("name", { required: true })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && <span className="text-xs text-red-400">Name is required</span>}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="quote-email" className="text-sm font-medium text-white">Email Address</label>
                    <input
                      id="quote-email"
                      type="email"
                      {...register("email", { required: true })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="john@example.com"
                    />
                    {errors.email && <span className="text-xs text-red-400">Email is required</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="quote-organization" className="text-sm font-medium text-white">Organization Name</label>
                    <input
                      id="quote-organization"
                      {...register("organization")}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your Company LLC"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="quote-teamSize" className="text-sm font-medium text-white">Working Team Size</label>
                    <select
                      id="quote-teamSize"
                      {...register("teamSize")}
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
                    {...register("package")}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="Offline Software">Offline Software</option>
                    <option value="Server-Based Software">Server-Based Software</option>
                    <option value="Website with Free Hosting">Website with Free Hosting</option>
                    <option value="Website with Hosting & Domain">Website with Hosting & Domain</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="quote-message" className="text-sm font-medium text-white">Project Details / Message</label>
                  <textarea
                    id="quote-message"
                    {...register("message", { required: true })}
                    rows={4}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your goals, specific requirements, and any questions..."
                  />
                  {errors.message && <span className="text-xs text-red-400">Message is required</span>}
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={status === "sending" || status === "sent"}
                  className="w-full gap-2 bg-success hover:bg-success/80 text-white disabled:opacity-50"
                >
                  {status === "sending" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <MessageSquare className="w-5 h-5" />
                  )}
                  {status === "sending" ? "Processing..." : status === "sent" ? "Opening WhatsApp..." : "Chat on WhatsApp"}
                </Button>
                
                {status === "error" && (
                  <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p>There was an error saving your request. Please try again or contact us directly.</p>
                  </div>
                )}
              </form>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
