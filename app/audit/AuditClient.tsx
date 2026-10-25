"use client";

import React, { useState, useEffect } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ShieldCheck, Search, Globe, Building2, Palette, Upload, Mail, CheckCircle2, AlertCircle, Loader2, Sparkles, Server } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AuditClient() {
  const [apiUrl, setApiUrl] = useState("https://weblytic-engine.onrender.com");
  const [targetUrl, setTargetUrl] = useState("");
  const [agencyName, setAgencyName] = useState("Weblytic Agency");
  const [agencyUrl, setAgencyUrl] = useState("weblytic.cc");
  const [primaryColor, setPrimaryColor] = useState("#1E3A8A");
  const [alertEmail, setAlertEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [engineAwake, setEngineAwake] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Wake up the backend engine on mount
  useEffect(() => {
    let isMounted = true;
    fetch(`${apiUrl}/health`)
      .then((res) => {
        if (isMounted) setEngineAwake(res.ok);
      })
      .catch(() => {
        if (isMounted) setEngineAwake(false);
      });
    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);
    setStatusMessage("Crawling target website & inspecting tags (10-15s)...");

    // Capture raw FormData from the form element — browser sets boundary automatically
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(`${apiUrl}/api/instant-audit`, {
        method: "POST",
        body: formData,
        // DO NOT set Content-Type header manually; browser provides multipart boundary
      });

      if (!response.ok) {
        let errDetail = `HTTP ${response.status}`;
        try {
          const errJson = await response.json();
          if (errJson.error) {
            errDetail = `${errJson.error}: ${errJson.traceback || ""}`;
          } else if (errJson.detail) {
            errDetail = typeof errJson.detail === "string" ? errJson.detail : JSON.stringify(errJson.detail);
          }
        } catch {
          const text = await response.text();
          if (text) errDetail = text;
        }
        throw new Error(errDetail);
      }

      setStatusMessage("Generating unbranded white-label PDF report...");
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = downloadUrl;

      const safeName = agencyName.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "audit";
      a.download = `SEO_Audit_${safeName}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);

      setSuccessMessage("Audit generated successfully! Your PDF download has started.");
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : "Error generating audit. Ensure target URL is valid.";
      setErrorMessage(errorStr);
      console.error("Audit error:", err);
    } finally {
      setIsLoading(false);
      setStatusMessage("");
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-background flex flex-col text-text-primary">
        <Navbar />

        <main className="flex-1 pt-32 pb-24">
          <div className="container mx-auto px-6 max-w-4xl">
            {/* Local Sandbox Testing Badge */}
            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-300"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="font-semibold uppercase tracking-wider">Local Testing Mode Active</span>
                <span className="text-amber-400/70">| Connected Engine:</span>
                <code className="px-2 py-0.5 rounded bg-black/40 font-mono text-white text-[11px]">{apiUrl}</code>
              </div>

              <div className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-400/80">Switch Engine:</span>
                <button
                  type="button"
                  onClick={() => setApiUrl("https://weblytic-engine.onrender.com")}
                  className={`px-2 py-1 rounded transition-colors text-[11px] ${
                    apiUrl.includes("onrender.com")
                      ? "bg-amber-500 text-black font-bold"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Render Live
                </button>
                <button
                  type="button"
                  onClick={() => setApiUrl("http://localhost:10000")}
                  className={`px-2 py-1 rounded transition-colors text-[11px] ${
                    apiUrl.includes("localhost")
                      ? "bg-amber-500 text-black font-bold"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Local Port 10000
                </button>
              </div>
            </m.div>

            {/* Header Section */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Automated White-Label Engine
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                Generate Client <span className="text-transparent bg-clip-text bg-primary-gradient">SEO Audits</span>
              </h1>
              <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Scan target websites for missing tags, broken links, noindex directives, and generate an unbranded, custom-branded PDF report in seconds.
              </p>
            </m.div>

            {/* Status alerts */}
            {errorMessage && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
                <div>
                  <h4 className="font-semibold text-sm">Audit Request Failed</h4>
                  <p className="text-xs text-red-300/80 mt-1 whitespace-pre-wrap font-mono">{errorMessage}</p>
                </div>
              </m.div>
            )}

            {successMessage && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-400" />
                <div>
                  <h4 className="font-semibold text-sm">Report Generated</h4>
                  <p className="text-xs text-emerald-300/80 mt-1">{successMessage}</p>
                </div>
              </m.div>
            )}

            {/* Audit Form Card */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-elevated/80 backdrop-blur border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Engine Status Dot */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Report Configuration</h2>
                    <p className="text-xs text-text-muted">Set agency branding & target scanning parameters</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      engineAwake === true
                        ? "bg-emerald-400 shadow-[0_0_8px_#10B981]"
                        : engineAwake === false
                        ? "bg-amber-400 animate-pulse"
                        : "bg-gray-500"
                    }`}
                  />
                  <span className="text-text-muted hidden sm:inline">
                    {engineAwake === true
                      ? "Engine Ready"
                      : engineAwake === false
                      ? "Waking up Engine..."
                      : "Checking Engine..."}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Target URL */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" /> Target Website URL <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name="target_url"
                      required
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder="https://client-site.com"
                      className="w-full bg-background/80 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-text-muted/60 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                    />
                    <Search className="w-4 h-4 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <p className="text-[11px] text-text-muted mt-1.5">
                    Must start with <code className="text-primary font-mono">https://</code> or <code className="text-primary font-mono">http://</code>
                  </p>
                </div>

                {/* Agency Name & Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" /> Agency Name
                    </label>
                    <input
                      type="text"
                      name="agency_name"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      placeholder="Weblytic Agency"
                      className="w-full bg-background/80 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" /> Agency Website
                    </label>
                    <input
                      type="text"
                      name="agency_url"
                      value={agencyUrl}
                      onChange={(e) => setAgencyUrl(e.target.value)}
                      placeholder="weblytic.cc"
                      className="w-full bg-background/80 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                {/* Brand Color & Logo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <Palette className="w-4 h-4 text-primary" /> Report Brand Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        name="primary_color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-12 h-11 bg-transparent border border-white/15 rounded-lg cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-full bg-background/80 border border-white/15 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-primary" /> Agency Logo (Optional)
                    </label>
                    <input
                      type="file"
                      name="logo"
                      accept="image/png, image/jpeg"
                      className="w-full text-xs text-text-muted file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 file:cursor-pointer cursor-pointer bg-background/80 border border-white/15 rounded-xl p-1"
                    />
                  </div>
                </div>

                {/* Weekly Alert Email */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" /> Weekly Alert Email (Optional Silent Watchdog)
                  </label>
                  <p className="text-xs text-text-muted mb-2">
                    Leave blank for a one-time audit. Enter an email to enable automated weekly regression monitoring via cron watchdog.
                  </p>
                  <input
                    type="email"
                    name="alert_email"
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    placeholder="alerts@agency.com"
                    className="w-full bg-background/80 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-text-muted/60 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg ${
                      isLoading
                        ? "bg-white/10 text-white/50 cursor-not-allowed"
                        : "bg-primary-gradient hover:opacity-95 text-white shadow-primary/25 hover:shadow-primary/40 cursor-pointer"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating PDF Report...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        Run Audit & Download PDF
                      </>
                    )}
                  </button>

                  {isLoading && (
                    <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-xs text-secondary animate-pulse">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{statusMessage}</span>
                    </div>
                  )}
                </div>
              </form>
            </m.div>
          </div>
        </main>

        <Footer />
      </div>
    </LazyMotion>
  );
}
