"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram, Facebook, ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData();
    formData.append("form-name", "newsletter");
    formData.append("email", email);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-background pt-20 pb-10 z-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <a href="/" className="flex items-center gap-2 group">
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                Weblytic
              </span>
              <span className="w-2 h-2 rounded-full bg-primary-gradient mt-1 animate-heartbeat" />
            </a>
            <p className="text-text-muted text-sm leading-relaxed">
              End-to-end digital solutions for modern businesses. We build, host, and scale your digital infrastructure from Khairpur Mirs', Sindh to the world.
            </p>
            <div className="text-xs text-text-muted space-y-1">
              <p>📍 Khairpur Mirs', Sindh, Pakistan</p>
              <p>✉️ <a href="mailto:weblytic.cc@gmail.com" className="hover:text-primary transition-colors">weblytic.cc@gmail.com</a></p>
              <p>📱 <a href="https://wa.me/923131398796" className="hover:text-primary transition-colors">+92 313 1398796</a></p>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Weblytic on Twitter"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Weblytic on LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com/weblytic.cc" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Weblytic on Facebook"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com/weblytic.cc" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Weblytic on Instagram"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="/#services" className="text-sm text-text-muted hover:text-primary transition-colors">Custom Software</a></li>
              <li><a href="/#services" className="text-sm text-text-muted hover:text-primary transition-colors">Web Development</a></li>
              <li><a href="/#services" className="text-sm text-text-muted hover:text-primary transition-colors">Domains & Hosting</a></li>
              <li><a href="/#services" className="text-sm text-text-muted hover:text-primary transition-colors">Local cPanel Setup</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="/about" className="text-sm text-text-muted hover:text-white transition-colors">About Us</a></li>
              <li><a href="/careers" className="text-sm text-text-muted hover:text-white transition-colors">Careers <span className="ml-1 text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">We're Hiring</span></a></li>
              <li><a href="/#portfolio" className="text-sm text-text-muted hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="/#pricing" className="text-sm text-text-muted hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/faq" className="text-sm text-text-muted hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/#contact" className="text-sm text-text-muted hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">Stay Updated</h4>
            <p className="text-sm text-text-muted mb-4">
              Subscribe to our newsletter for the latest tech news and agency updates.
            </p>
            <form 
              name="newsletter"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubscribe} 
              className="relative"
            >
              {/* Hidden inputs for Netlify */}
              <input type="hidden" name="form-name" value="newsletter" />
              <div className="hidden">
                <label htmlFor="bot-field">Don’t fill this out:</label>
                <input id="bot-field" name="bot-field" />
              </div>

              <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={status === "success" ? "Thanks for subscribing!" : "Enter your email"}
                required
                disabled={status === "loading" || status === "success"}
                className={`w-full bg-white/5 border rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50 ${
                  status === "error" ? "border-red-500/50" : "border-white/10"
                }`}
              />
              <button 
                type="submit"
                disabled={status === "loading" || status === "success"}
                aria-label="Submit newsletter subscription"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white hover:bg-primary-end transition-colors disabled:opacity-50 disabled:hover:bg-primary"
              >
                {status === "loading" ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>
            {status === "error" && (
              <p className="text-red-400 text-xs mt-2 absolute">Oops! Something went wrong. Try again.</p>
            )}
          </div>
          
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-text-muted">
            © {new Date().getFullYear()} Weblytic. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href="/privacy" className="text-sm text-text-muted hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-sm text-text-muted hover:text-white transition-colors">Terms of Service</a>
            <a href="/refund-policy" className="text-sm text-text-muted hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
