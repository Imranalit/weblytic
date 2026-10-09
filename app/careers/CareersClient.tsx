"use client";

import { useState } from "react";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Briefcase, MapPin, DollarSign, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CareersClient() {
  const [showForm, setShowForm] = useState(false);
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-32 pb-20">
          <div className="container mx-auto px-6 max-w-4xl">
            
            {/* Header */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
                <Briefcase className="w-3.5 h-3.5" />
                <span>We are hiring</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Join <span className="text-transparent bg-clip-text bg-primary-gradient">Weblytic</span>
              </h1>
              <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
                Help us build, host, and scale the digital infrastructure of modern businesses. 
                Check out our open roles below.
              </p>
            </m.div>

            {/* Job Posting */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-elevated border border-white/10 rounded-3xl p-8 md:p-12"
            >
              <div className="border-b border-white/10 pb-8 mb-8">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                  Business Development Executive <br/>
                  <span className="text-primary text-xl md:text-2xl">(Lead Conversion Specialist)</span>
                </h2>
                
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2 text-sm text-text-muted bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span>Remote</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <Clock className="w-4 h-4 text-success" />
                    <span>Full-time or Part-time</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <DollarSign className="w-4 h-4 text-warning" />
                    <span>Up to 30% Commission / Deal</span>
                  </div>
                </div>
              </div>

              <div className="space-y-10 text-text-muted leading-relaxed">
                
                {/* About Role */}
                <section>
                  <h3 className="text-xl font-bold text-white mb-4">About the Role</h3>
                  <p>
                    As a Lead Conversion Specialist, your primary responsibility is to convert qualified leads into paying clients. You will handle inbound and outbound conversations, understand client needs, present the right solutions, overcome objections, and close deals. This is a pure performance role — the more clients you convert, the higher you earn (up to 30% commission).
                  </p>
                </section>

                {/* About Weblytic */}
                <section>
                  <h3 className="text-xl font-bold text-white mb-4">About Weblytic</h3>
                  <p>
                    Weblytic is a fast-growing digital solutions company based in Pakistan. We help businesses build, host, and scale with custom offline POS & ERP software, high-performance websites, local cPanel hosting, and AI-powered chatbots. We deliver end-to-end solutions with transparent pricing and rapid turnaround. We are looking for hungry, results-driven individuals who can turn warm leads into paying clients.
                  </p>
                </section>

                {/* Responsibilities */}
                <section>
                  <h3 className="text-xl font-bold text-white mb-4">Key Responsibilities</h3>
                  <ul className="space-y-3">
                    {[
                      "Follow up on leads generated through our website, WhatsApp, social media, and other channels.",
                      "Qualify leads and understand their business needs (websites, POS software, hosting, AI bots, etc.).",
                      "Present Weblytic’s services clearly and persuasively.",
                      "Handle objections and close deals via call, WhatsApp, or meeting.",
                      "Maintain accurate records of conversations and deal progress.",
                      "Coordinate with the technical team after a deal is closed.",
                      "Consistently hit or exceed conversion targets."
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Requirements */}
                <section>
                  <h3 className="text-xl font-bold text-white mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    {[
                      "Strong communication skills in Urdu and English (WhatsApp + phone).",
                      "Proven ability to sell or close deals (experience in digital services, software, or agency sales is a plus).",
                      "Self-motivated and comfortable working on pure commission.",
                      "Basic understanding of websites, software, or digital services is preferred (training will be provided).",
                      "Reliable internet and smartphone/laptop.",
                      "Hungry mindset and strong work ethic."
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* What We Offer */}
                <section>
                  <h3 className="text-xl font-bold text-white mb-4">What We Offer</h3>
                  <ul className="space-y-3">
                    {[
                      "Up to 30% commission on every successfully converted client.",
                      "Unlimited earning potential — your income is directly tied to your performance.",
                      "Flexible working hours and remote-friendly setup.",
                      "Training on our products and sales process.",
                      "Opportunity to grow with a rapidly expanding company.",
                      "Direct support from the founder and team."
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Apply CTA */}
                <div className="pt-8 border-t border-white/10 mt-10">
                  <h3 className="text-xl font-bold text-white mb-4">Ready to Apply?</h3>
                  
                  {!showForm ? (
                    <>
                      <p className="mb-6">
                        If you are driven, confident, and ready to close deals, we want to hear from you. 
                        Click below to fill out our quick online application.
                      </p>
                      <button 
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-end text-white font-semibold rounded-xl transition-colors"
                      >
                        Apply Online
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl"
                    >
                      <h4 className="text-lg font-bold text-white mb-6">Application Form</h4>
                      <form 
                        name="job_application" 
                        data-netlify="true" 
                        netlify-honeypot="bot-field"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const form = e.target as HTMLFormElement;
                          const formData = new FormData(form);
                          const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                          submitBtn.disabled = true;
                          submitBtn.textContent = "Submitting...";
                          
                          try {
                            const response = await fetch("/", {
                              method: "POST",
                              headers: { "Content-Type": "application/x-www-form-urlencoded" },
                              body: new URLSearchParams(formData as any).toString(),
                            });
                            
                            if (response.ok) {
                              form.innerHTML = "<div class='text-center py-8 text-success'><p class='text-xl font-bold mb-2'>Application Submitted!</p><p class='text-text-muted'>Thank you for applying. We will review your profile and get back to you soon.</p></div>";
                            } else {
                              throw new Error("Failed");
                            }
                          } catch (error) {
                            submitBtn.disabled = false;
                            submitBtn.textContent = "Error! Try Again";
                          }
                        }}
                        className="space-y-4"
                      >
                        <input type="hidden" name="form-name" value="job_application" />
                        <input type="hidden" name="role" value="Lead Conversion Specialist" />
                        
                        <p className="hidden">
                          <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-sm text-text-muted">Full Name *</label>
                            <input required type="text" name="name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-sm text-text-muted">Email Address *</label>
                            <input required type="email" name="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-sm text-text-muted">WhatsApp / Phone Number *</label>
                            <input required type="tel" name="phone" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors" placeholder="+92 XXX XXXXXXX" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-sm text-text-muted">LinkedIn Profile or Portfolio Link</label>
                            <input type="url" name="linkedin" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors" placeholder="https://linkedin.com/in/..." />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-sm text-text-muted">Why are you a good fit for this role? *</label>
                          <textarea required name="cover_letter" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Tell us about your sales experience..."></textarea>
                        </div>

                        <button 
                          type="submit"
                          className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-end text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                        >
                          Submit Application
                        </button>
                      </form>
                    </m.div>
                  )}
                </div>

              </div>
            </m.div>

          </div>
        </main>
        
        <Footer />
      </div>
    </LazyMotion>
  );
}
