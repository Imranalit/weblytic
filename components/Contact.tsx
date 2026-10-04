"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, MapPin, Phone, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/Button";
import { fadeUp, slideInRight } from "@/lib/motion";

type FormData = {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  "bot-field"?: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("form-name", "contact");
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString()
      });

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Form submission error", error);
    } finally {
      setIsSubmitting(false);
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
              Ready to scale your business? Tell us about your project, and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-text-muted">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Email Us</div>
                  <div>hello@weblytic.cc</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-text-muted">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Call / WhatsApp</div>
                  <div>+1 (555) 123-4567</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-text-muted">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-success">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-white">Headquarters</div>
                  <div>120 Innovation Drive, Tech City</div>
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
              {isSuccess ? (
                <m.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center h-full min-h-[400px]"
                >
                  <CheckCircle2 className="w-20 h-20 text-success mb-6" />
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-text-muted mb-8">We've received your request and will be in touch shortly.</p>
                  <Button onClick={() => setIsSuccess(false)}>Send Another Message</Button>
                </m.div>
              ) : (
                <form 
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  name="contact"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don’t fill this out if you’re human: <input {...register("bot-field")} />
                    </label>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Full Name</label>
                      <input
                        {...register("name", { required: true })}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                        placeholder="John Doe"
                      />
                      {errors.name && <span className="text-xs text-red-400">Name is required</span>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Email Address</label>
                      <input
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
                      <label className="text-sm font-medium text-white">Service Needed</label>
                      <select
                        {...register("service")}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                      >
                        <option value="custom-software">Custom Software</option>
                        <option value="web-dev">Web Development</option>
                        <option value="hosting">Domains & Hosting</option>
                        <option value="cpanel">Local cPanel Setup</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Budget Range</label>
                      <select
                        {...register("budget")}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                      >
                        <option value="<1k">Less than $1,000</option>
                        <option value="1k-5k">$1,000 - $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value=">10k">$10,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Project Details</label>
                    <textarea
                      {...register("message", { required: true })}
                      rows={4}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us about your goals, timeline, and any specific requirements..."
                    />
                    {errors.message && <span className="text-xs text-red-400">Message is required</span>}
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <MessageSquare className="w-5 h-5" />
                        Send Request
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
