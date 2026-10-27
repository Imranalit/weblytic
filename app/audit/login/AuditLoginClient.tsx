"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Building2,
  FileCheck2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AuditLoginClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Check if already authenticated on mount
  useEffect(() => {
    try {
      const existingUser = localStorage.getItem("audit_user");
      if (existingUser) {
        setEmail(existingUser);
      }
    } catch {
      // Ignore localStorage access restrictions
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid business email address.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Please enter your agency access key or password.");
      return;
    }

    setIsLoading(true);

    // Simulate authenticating against agency portal
    setTimeout(() => {
      try {
        if (rememberMe) {
          localStorage.setItem("audit_user", email.trim());
          localStorage.setItem("audit_auth_time", new Date().toISOString());
        } else {
          sessionStorage.setItem("audit_user", email.trim());
        }
        setSuccessMessage("Authentication successful. Redirecting to SEO Audit console...");
        setTimeout(() => {
          router.push("/audit");
        }, 800);
      } catch {
        setErrorMessage("Unable to save login session. Please check browser privacy settings.");
        setIsLoading(false);
      }
    }, 700);
  };

  const handleQuickDemoLogin = () => {
    setEmail("agency@weblytic.cc");
    setPassword("audit-demo-access-2026");
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      try {
        localStorage.setItem("audit_user", "agency@weblytic.cc");
        localStorage.setItem("audit_auth_time", new Date().toISOString());
        setSuccessMessage("Demo agency session initialized. Redirecting to SEO Audit...");
        setTimeout(() => {
          router.push("/audit");
        }, 700);
      } catch {
        router.push("/audit");
      }
    }, 500);
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-background text-text-primary flex flex-col selection:bg-primary selection:text-white">
        <Navbar />

        <main className="flex-1 pt-28 pb-20 relative overflow-hidden flex items-center">
          {/* Ambient background glow accents */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 max-w-lg relative z-10">
            {/* Top Back Link */}
            <div className="mb-6">
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>BACK TO SEO AUDIT SCANNER</span>
              </Link>
            </div>

            {/* Login Card */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 shadow-2xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary/15 text-primary border border-primary/25 mb-3">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>SEO AUDIT CONSOLE</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                  Agency <span className="text-transparent bg-clip-text bg-primary-gradient">Sign In</span>
                </h1>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  Sign in to your Weblytic account to access advanced crawling, client white-label branding, and PDF exports.
                </p>
              </div>

              {/* Status Messages */}
              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="audit-email" className="text-xs font-medium text-white flex items-center justify-between">
                    <span>Work Email</span>
                    <span className="text-[10px] text-text-muted">Agency / Client Address</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="audit-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="agency@company.com"
                      required
                      className="w-full bg-background border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="audit-password" className="text-xs font-medium text-white flex items-center justify-between">
                    <span>Access Key / Password</span>
                    <span className="text-[10px] text-text-muted">Account Key</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="audit-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full bg-background border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-text-muted hover:text-white select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-white/20 bg-background text-primary focus:ring-primary accent-primary"
                    />
                    <span>Remember this device</span>
                  </label>

                  <a
                    href="mailto:admin@weblytic.cc?subject=SEO%20Audit%20Access%20Key%20Reset"
                    className="text-primary hover:text-primary-end transition-colors"
                  >
                    Forgot access key?
                  </a>
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 bg-primary-gradient text-white hover:brightness-110 shadow-lg shadow-primary/25 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Audit Engine</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative py-2 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <span className="relative px-3 bg-elevated/95 text-[11px] font-mono uppercase tracking-wider text-text-muted">
                    Instant Demo
                  </span>
                </div>

                {/* Quick Demo Access Button */}
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all duration-200 flex items-center justify-center gap-2 text-text-primary/90"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>One-Click Demo Agency Sign In</span>
                </button>
              </form>

              {/* Bottom Feature Perks */}
              <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-3 text-[11px] text-text-muted">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Encrypted Sessions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>White-Label PDF Reports</span>
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
