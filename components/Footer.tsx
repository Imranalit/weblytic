"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    alert("Subscribed successfully!");
  };

  return (
    <footer className="relative border-t border-white/10 bg-background pt-20 pb-10 z-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <a href="#" className="flex items-center gap-2">
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                Weblytic
              </span>
              <span className="w-2 h-2 rounded-full bg-primary-gradient mt-1" />
            </a>
            <p className="text-text-muted text-sm leading-relaxed">
              End-to-end digital solutions for modern businesses. We build, host, and scale your digital infrastructure from Khairpur Mirs', Sindh to the world.
            </p>
            <div className="text-xs text-text-muted space-y-1">
              <p>📍 Khairpur Mirs', Sindh, Pakistan</p>
              <p>✉️ <a href="mailto:imranalit.freelance@gmail.com" className="hover:text-primary transition-colors">imranalit.freelance@gmail.com</a></p>
              <p>📱 <a href="https://wa.me/923000219721" className="hover:text-primary transition-colors">+92 300 0219721</a></p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Custom Software</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Web Development</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Domains & Hosting</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Local cPanel Setup</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-text-muted hover:text-white transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="text-sm text-text-muted hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#pricing" className="text-sm text-text-muted hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#contact" className="text-sm text-text-muted hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">Stay Updated</h4>
            <p className="text-sm text-text-muted mb-4">
              Subscribe to our newsletter for the latest tech news and agency updates.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white hover:bg-primary-end transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
          
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-text-muted">
            © {new Date().getFullYear()} Weblytic. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-text-muted hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-text-muted hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
