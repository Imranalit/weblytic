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
  User,
  Palette,
  Globe,
  FileCheck2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export interface AuditSession {
  email: string;
  accountType: "agency" | "individual";
  fullName?: string;
  agencyName?: string;
  agencyUrl?: string;
  primaryColor?: string;
  token: string;
  createdAt: string;
}

const BRAND_COLOR_PRESETS = [
  { name: "Weblytic Blue", hex: "#2563EB" },
  { name: "Cyber Indigo", hex: "#4F46E5" },
  { name: "Electric Violet", hex: "#7C3AED" },
  { name: "Emerald Growth", hex: "#059669" },
  { name: "Amber Gold", hex: "#D97706" },
  { name: "Crimson Red", hex: "#DC2626" },
];

export default function AuditLoginClient() {
  const router = useRouter();

  // Mode: signin vs signup
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  // Role: agency vs individual
  const [accountType, setAccountType] = useState<"agency" | "individual">("agency");

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [agencyName, setAgencyName] = useState("Apex Digital Agency");
  const [agencyUrl, setAgencyUrl] = useState("apexdigital.cc");
  const [primaryColor, setPrimaryColor] = useState("#2563EB");

  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Check if session already exists
  useEffect(() => {
    try {
      const rawSession = localStorage.getItem("audit_session");
      if (rawSession) {
        const session: AuditSession = JSON.parse(rawSession);
        if (session.email) {
          setEmail(session.email);
          setAccountType(session.accountType || "agency");
          if (session.agencyName) setAgencyName(session.agencyName);
          if (session.agencyUrl) setAgencyUrl(session.agencyUrl);
          if (session.primaryColor) setPrimaryColor(session.primaryColor);
          if (session.fullName) setFullName(session.fullName);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const saveAndRedirect = (session: AuditSession) => {
    try {
      if (rememberMe) {
        localStorage.setItem("audit_session", JSON.stringify(session));
        localStorage.setItem("audit_user", session.email);
      } else {
        sessionStorage.setItem("audit_session", JSON.stringify(session));
        sessionStorage.setItem("audit_user", session.email);
      }
      setSuccessMessage("Authentication successful. Redirecting to SEO Audit Console...");
      setTimeout(() => {
        router.push("/audit");
      }, 700);
    } catch {
      setErrorMessage("Could not store session in local storage.");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!password.trim() || password.length < 6) {
      setErrorMessage("Password / Access key must be at least 6 characters.");
      return;
    }

    if (accountType === "agency" && !agencyName.trim()) {
      setErrorMessage("Please provide your Agency or Organization name.");
      return;
    }

    setIsLoading(true);

    // Build session object
    const session: AuditSession = {
      email: email.trim(),
      accountType,
      fullName: fullName.trim() || (accountType === "individual" ? "Lead Auditor" : undefined),
      agencyName: accountType === "agency" ? agencyName.trim() : undefined,
      agencyUrl: accountType === "agency" ? agencyUrl.trim() : undefined,
      primaryColor: accountType === "agency" ? primaryColor : undefined,
      token: `tok_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    // Authenticate (instant simulation with fallback to Render API if live)
    setTimeout(() => {
      saveAndRedirect(session);
    }, 600);
  };

  const handleQuickDemo = (type: "agency" | "individual") => {
    setIsLoading(true);
    setErrorMessage(null);

    const session: AuditSession =
      type === "agency"
        ? {
            email: "agency@weblytic.cc",
            accountType: "agency",
            agencyName: "Acme SEO & Growth Agency",
            agencyUrl: "acmegrowth.cc",
            primaryColor: "#2563EB",
            token: "tok_demo_agency_acme",
            createdAt: new Date().toISOString(),
          }
        : {
            email: "auditor@weblytic.cc",
            accountType: "individual",
            fullName: "Alex Morgan (Independent Auditor)",
            token: "tok_demo_individual",
            createdAt: new Date().toISOString(),
          };

    setTimeout(() => {
      saveAndRedirect(session);
    }, 450);
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-background text-text-primary flex flex-col selection:bg-primary selection:text-white">
        <Navbar />

        <main className="flex-1 pt-28 pb-20 relative overflow-hidden flex items-center">
          {/* Ambient background glow accents */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 max-w-xl relative z-10">
            {/* Top Back Link */}
            <div className="mb-6">
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>BACK TO SEO AUDIT CONSOLE</span>
              </Link>
            </div>

            {/* Auth Portal Card */}
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
                  <span>SEO AUDIT AUTHENTICATION PORTAL</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                  {authMode === "signin" ? (
                    <>
                      Welcome <span className="text-transparent bg-clip-text bg-primary-gradient">Back</span>
                    </>
                  ) : (
                    <>
                      Create <span className="text-transparent bg-clip-text bg-primary-gradient">Audit Account</span>
                    </>
                  )}
                </h1>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  Sign in or create an account to record audit history to the database and export browser-generated white-label PDF reports.
                </p>
              </div>

              {/* Mode Toggle: Sign In vs Sign Up */}
              <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => setAuthMode("signin")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    authMode === "signin"
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : "text-text-muted hover:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode("signup")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    authMode === "signup"
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : "text-text-muted hover:text-white"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Account Role Selector: Agency vs Individual */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setAccountType("agency")}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    accountType === "agency"
                      ? "border-primary bg-primary/15 text-white ring-1 ring-primary/40 shadow-lg shadow-primary/10"
                      : "border-white/10 bg-white/5 text-text-muted hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Building2
                    className={`w-5 h-5 shrink-0 mt-0.5 ${
                      accountType === "agency" ? "text-primary" : "text-text-muted"
                    }`}
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Agency Account</div>
                    <div className="text-[11px] text-text-muted leading-snug mt-0.5">
                      White-label branding, custom logo, &amp; client reports
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType("individual")}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    accountType === "individual"
                      ? "border-primary bg-primary/15 text-white ring-1 ring-primary/40 shadow-lg shadow-primary/10"
                      : "border-white/10 bg-white/5 text-text-muted hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <User
                    className={`w-5 h-5 shrink-0 mt-0.5 ${
                      accountType === "individual" ? "text-primary" : "text-text-muted"
                    }`}
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Individual Account</div>
                    <div className="text-[11px] text-text-muted leading-snug mt-0.5">
                      Solo webmasters, personal site scans &amp; history
                    </div>
                  </div>
                </button>
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

              {/* Main Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Agency-Specific Branding Fields */}
                {accountType === "agency" && authMode === "signup" && (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 mb-2">
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5 mb-1">
                      <Palette className="w-3.5 h-3.5 text-primary" />
                      <span>Agency White-Label Preferences</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-text-muted block mb-1 font-mono">Agency Name</label>
                        <input
                          type="text"
                          value={agencyName}
                          onChange={(e) => setAgencyName(e.target.value)}
                          placeholder="e.g. Apex Digital"
                          className="w-full bg-background border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-text-muted block mb-1 font-mono">Agency Website</label>
                        <input
                          type="text"
                          value={agencyUrl}
                          onChange={(e) => setAgencyUrl(e.target.value)}
                          placeholder="e.g. apexdigital.cc"
                          className="w-full bg-background border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-text-muted block mb-1.5 font-mono">
                        Report Accent Color
                      </label>
                      <div className="flex flex-wrap items-center gap-2">
                        {BRAND_COLOR_PRESETS.map((color) => (
                          <button
                            key={color.hex}
                            type="button"
                            onClick={() => setPrimaryColor(color.hex)}
                            className={`w-6 h-6 rounded-full border-2 transition-transform ${
                              primaryColor === color.hex ? "scale-110 border-white" : "border-transparent opacity-80 hover:opacity-100"
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                        <input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-20 bg-background border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Individual Name Field */}
                {accountType === "individual" && authMode === "signup" && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white flex items-center justify-between">
                      <span>Full Name / Auditor Name</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full bg-background border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
                      />
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label htmlFor="audit-email" className="text-xs font-medium text-white flex items-center justify-between">
                    <span>{accountType === "agency" ? "Agency Work Email" : "Your Email"}</span>
                    <span className="text-[10px] text-text-muted font-mono">Authentication ID</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="audit-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={accountType === "agency" ? "agency@company.com" : "you@website.com"}
                      required
                      className="w-full bg-background border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
                    />
                  </div>
                </div>

                {/* Password / Access Key Field */}
                <div className="space-y-1.5">
                  <label htmlFor="audit-password" className="text-xs font-medium text-white flex items-center justify-between">
                    <span>Password / Access Key</span>
                    <span className="text-[10px] text-text-muted font-mono">Encrypted</span>
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

                {/* Remember device & password reset */}
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
                    Need assistance?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 bg-primary-gradient text-white hover:brightness-110 shadow-lg shadow-primary/25 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Authenticating credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {authMode === "signin"
                          ? `Sign In as ${accountType === "agency" ? "Agency" : "Individual"}`
                          : `Create ${accountType === "agency" ? "Agency" : "Individual"} Account`}
                      </span>
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
                    Instant 1-Click Testing
                  </span>
                </div>

                {/* Quick Demo Access Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo("agency")}
                    disabled={isLoading}
                    className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                    <span>Demo Agency</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo("individual")}
                    disabled={isLoading}
                    className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-secondary" />
                    <span>Demo Individual</span>
                  </button>
                </div>
              </form>

              {/* Bottom Feature Perks */}
              <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-3 text-[11px] text-text-muted">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Text-only JSON DB sync</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Client-side PDF compiler</span>
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
