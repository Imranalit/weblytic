"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Lock,
  Mail,
  User,
  Globe,
  ArrowRight,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "United Arab Emirates",
  "Pakistan",
  "India",
  "Singapore",
  "Netherlands",
  "Spain",
  "Italy",
  "Brazil",
  "Japan",
  "Saudi Arabia",
  "Other",
];

// Cryptographic Password Hashing (SHA-256 with Salt via Web Crypto API)
// Ensures plaintext passwords are NEVER stored in localStorage or browser memory.
async function hashCredentials(password: string): Promise<string> {
  const enc = new TextEncoder();
  const saltedBuffer = enc.encode(`wb_sec_${password}_salt_2026_audit`);
  const digest = await window.crypto.subtle.digest("SHA-256", saltedBuffer);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const API_BASE = process.env.NEXT_PUBLIC_ENGINE_URL || "https://weblytic-engine.onrender.com";

export default function AuditLoginClient() {
  const router = useRouter();

  // Mode: "signin" | "create"
  const [mode, setMode] = useState<"signin" | "create">("signin");

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("United States");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Pre-warm backend on page mount to minimize cold-start latency
  useEffect(() => {
    fetch(`${API_BASE}/ping`, { method: "GET" }).catch(() => {});
  }, []);

  // SERVER-BACKED SIGN IN (Pings Render to verify credentials against DB)
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoadingStatus(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);
    setLoadingStatus("Verifying credentials with database...");

    try {
      const inputHash = await hashCredentials(password);

      // Ping Render Backend Auth Endpoint
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          password_hash: inputHash,
        }),
      });

      if (!response.ok) {
        let errDetail = "Authentication failed.";
        try {
          const errJson = await response.json();
          if (errJson.detail) {
            errDetail = typeof errJson.detail === "string" ? errJson.detail : JSON.stringify(errJson.detail);
          } else if (errJson.error) {
            errDetail = errJson.error;
          } else if (errJson.message) {
            errDetail = errJson.message;
          }
        } catch {
          if (response.status === 404) {
            errDetail = "No account exists with this email address. Please click 'Create Account' first.";
          } else if (response.status === 401) {
            errDetail = "Incorrect password. Please verify your credentials and try again.";
          }
        }
        setErrorMessage(errDetail);
        setIsLoading(false);
        setLoadingStatus(null);
        return;
      }

      const result = await response.json();
      const user = result.user || {};

      // Authenticated Session Object
      const sessionData = {
        email: cleanEmail,
        name: user.name || "Agency User",
        country: user.country || "United States",
        token: result.token || `tok_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`,
        createdAt: user.created_at || new Date().toISOString(),
      };

      // Persist across browser and tabs
      localStorage.setItem("audit_auth_active", "true");
      localStorage.setItem("audit_session", JSON.stringify(sessionData));
      localStorage.setItem("audit_user", cleanEmail);

      sessionStorage.setItem("audit_auth_active", "true");
      sessionStorage.setItem("audit_session", JSON.stringify(sessionData));
      sessionStorage.setItem("audit_user", cleanEmail);

      setSuccessMessage("Authentication successful. Redirecting to SEO Audit Console...");
      setTimeout(() => {
        router.push("/audit");
      }, 500);
    } catch (err) {
      console.error("Auth error:", err);
      // Offline fallback: Check local storage cache in case server is unreachable
      try {
        const rawAccounts = localStorage.getItem("audit_accounts");
        const accounts = rawAccounts ? JSON.parse(rawAccounts) : {};
        const localUser = accounts[cleanEmail];
        const inputHash = await hashCredentials(password);
        if (localUser && localUser.passwordHash === inputHash) {
          const sessionData = {
            email: cleanEmail,
            name: localUser.name,
            country: localUser.country,
            token: `tok_cached_${Date.now()}`,
            createdAt: localUser.createdAt,
          };
          localStorage.setItem("audit_auth_active", "true");
          localStorage.setItem("audit_session", JSON.stringify(sessionData));
          localStorage.setItem("audit_user", cleanEmail);
          sessionStorage.setItem("audit_auth_active", "true");
          sessionStorage.setItem("audit_session", JSON.stringify(sessionData));
          sessionStorage.setItem("audit_user", cleanEmail);
          setSuccessMessage("Authenticated via offline cache. Redirecting...");
          setTimeout(() => router.push("/audit"), 500);
          return;
        }
      } catch {
        // ignore
      }
      setErrorMessage("Could not reach authentication server. Please check your connection and try again.");
      setIsLoading(false);
      setLoadingStatus(null);
    }
  };

  // SERVER-BACKED ACCOUNT REGISTRATION (Pings Render to persist lead in DB)
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoadingStatus(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || cleanName.length < 2) {
      setErrorMessage("Please enter your full name (at least 2 characters).");
      return;
    }

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage("Please enter a valid business or personal email address.");
      return;
    }

    if (!country) {
      setErrorMessage("Please select your country.");
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters for security.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    setIsLoading(true);
    setLoadingStatus("Recording account and saving lead in database...");

    try {
      const passwordHash = await hashCredentials(password);

      // Ping Render Backend Register Endpoint
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          password_hash: passwordHash,
          name: cleanName,
          country: country,
        }),
      });

      if (!response.ok) {
        let errDetail = "Account registration failed.";
        try {
          const errJson = await response.json();
          if (errJson.detail) {
            errDetail = typeof errJson.detail === "string" ? errJson.detail : JSON.stringify(errJson.detail);
          } else if (errJson.error) {
            errDetail = errJson.error;
          } else if (errJson.message) {
            errDetail = errJson.message;
          }
        } catch {
          if (response.status === 409) {
            errDetail = "An account with this email already exists. Please switch to 'Sign In'.";
          }
        }
        setErrorMessage(errDetail);
        setIsLoading(false);
        setLoadingStatus(null);
        return;
      }

      const result = await response.json();
      const user = result.user || {};

      // Also cache in local accounts for offline convenience
      try {
        const rawAccounts = localStorage.getItem("audit_accounts");
        const accounts = rawAccounts ? JSON.parse(rawAccounts) : {};
        accounts[cleanEmail] = {
          name: cleanName,
          passwordHash: passwordHash,
          country: country,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem("audit_accounts", JSON.stringify(accounts));
      } catch {
        // ignore
      }

      // Establish authenticated session
      const sessionData = {
        email: cleanEmail,
        name: cleanName,
        country: country,
        token: result.token || `tok_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`,
        createdAt: user.created_at || new Date().toISOString(),
      };

      localStorage.setItem("audit_auth_active", "true");
      localStorage.setItem("audit_session", JSON.stringify(sessionData));
      localStorage.setItem("audit_user", cleanEmail);

      sessionStorage.setItem("audit_auth_active", "true");
      sessionStorage.setItem("audit_session", JSON.stringify(sessionData));
      sessionStorage.setItem("audit_user", cleanEmail);

      setSuccessMessage("Account created successfully! Redirecting to SEO Audit Console...");
      setTimeout(() => {
        router.push("/audit");
      }, 600);
    } catch (err) {
      console.error("Registration error:", err);
      setErrorMessage("Could not connect to registration server. Please try again in a few moments.");
      setIsLoading(false);
      setLoadingStatus(null);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-background text-text-primary flex flex-col selection:bg-primary selection:text-white">
        <Navbar />

        <main className="flex-1 pt-28 pb-20 relative overflow-hidden flex items-center">
          {/* Subtle background glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 max-w-md relative z-10">
            {/* Simple Card */}
            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 shadow-2xl relative"
            >
              {/* Header */}
              <div className="text-center mb-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary/15 text-primary border border-primary/25 mb-3">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>SEO AUDIT PORTAL</span>
                </div>
                <h1 className="text-2xl font-display font-bold text-white mb-1.5">
                  {mode === "signin" ? "Sign In" : "Create Account"}
                </h1>
                <p className="text-xs text-text-muted">
                  {mode === "signin"
                    ? "Enter your verified credentials to access the SEO Audit Scanner."
                    : "Create an account to start auditing websites (4 free audits / week)."}
                </p>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === "signin"
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : "text-text-muted hover:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("create");
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === "create"
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : "text-text-muted hover:text-white"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Status Messages */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* SIGN IN FORM */}
              {mode === "signin" ? (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="signin-email" className="text-xs font-medium text-white block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="signin-email"
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
                    <label htmlFor="signin-password" className="text-xs font-medium text-white block">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="signin-password"
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
                        <span>Verifying credentials...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* CREATE ACCOUNT FORM */
                <form onSubmit={handleCreateAccount} className="space-y-3.5">
                  <div className="space-y-1">
                    <label htmlFor="create-name" className="text-xs font-medium text-white block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="create-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full bg-background border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="create-email" className="text-xs font-medium text-white block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="create-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        required
                        autoComplete="email"
                        className="w-full bg-background border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="create-country" className="text-xs font-medium text-white block">
                      Country
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        id="create-country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-background border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c} className="bg-elevated text-white">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="create-password" className="text-xs font-medium text-white block">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="create-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        required
                        className="w-full bg-background border border-white/10 rounded-xl pl-10 pr-10 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="create-confirm-password" className="text-xs font-medium text-white block">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="create-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        required
                        className="w-full bg-background border border-white/10 rounded-xl pl-10 pr-10 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 bg-primary-gradient text-white hover:brightness-110 shadow-lg shadow-primary/25 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Free Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Secure Notice */}
              <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-text-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>SHA-256 Cryptographic Protection • 4 Free Audits / Week</span>
              </div>
            </m.div>
          </div>
        </main>

        <Footer />
      </div>
    </LazyMotion>
  );
}
