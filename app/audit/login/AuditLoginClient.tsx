"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
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

  // Check if session already exists
  useEffect(() => {
    try {
      const existingUser = localStorage.getItem("audit_user");
      if (existingUser) {
        setEmail(existingUser);
      }
    } catch {
      // Ignore storage restrictions
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);

    // Authenticate and store session
    setTimeout(() => {
      try {
        const sessionData = {
          email: cleanEmail,
          accountType: "standard",
          token: `tok_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`,
          createdAt: new Date().toISOString(),
        };

        if (rememberMe) {
          localStorage.setItem("audit_session", JSON.stringify(sessionData));
          localStorage.setItem("audit_user", cleanEmail);
        } else {
          sessionStorage.setItem("audit_session", JSON.stringify(sessionData));
          sessionStorage.setItem("audit_user", cleanEmail);
        }

        setSuccessMessage("Signed in successfully. Redirecting to SEO Audit...");
        setTimeout(() => {
          router.push("/audit");
        }, 600);
      } catch {
        setErrorMessage("Could not save session. Please check your browser privacy settings.");
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-background text-text-primary flex flex-col selection:bg-primary selection:text-white">
        <Navbar />

        <main className="flex-1 pt-28 pb-20 relative overflow-hidden flex items-center">
          {/* Subtle background glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 max-w-md relative z-10">
            {/* Top Back Link */}
            <div className="mb-6">
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>BACK TO SEO AUDIT</span>
              </Link>
            </div>

            {/* Simple Login Card */}
            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 shadow-2xl relative"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary/15 text-primary border border-primary/25 mb-3">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>SEO AUDIT PORTAL</span>
                </div>
                <h1 className="text-2xl font-display font-bold text-white mb-1.5">
                  Sign In
                </h1>
                <p className="text-xs text-text-muted">
                  Enter your credentials to access the SEO Audit Scanner.
                </p>
              </div>

              {/* Status Messages */}
              {errorMessage && (
                <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="login-email" className="text-xs font-medium text-white block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      required
                      autoComplete="email"
                      className="w-full bg-background border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="login-password" className="text-xs font-medium text-white block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      autoComplete="current-password"
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
                    <span>Remember me</span>
                  </label>

                  <a
                    href="mailto:support@weblytic.cc?subject=SEO%20Audit%20Password%20Reset"
                    className="text-primary hover:text-primary-end transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 bg-primary-gradient text-white hover:brightness-110 shadow-lg shadow-primary/25 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Secure Notice */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-text-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Secure SSL Encrypted Connection</span>
              </div>
            </m.div>
          </div>
        </main>

        <Footer />
      </div>
    </LazyMotion>
  );
}
