"use client";

import React, { useState, useEffect, useMemo } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Search, Globe, Building2, Palette, Upload, Mail, CheckCircle2,
  AlertCircle, Loader2, Sparkles, Server, Download, ChevronDown, ChevronUp,
  FileText, ExternalLink, RefreshCw, AlertTriangle, Layers, CheckCircle, Tag
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface AuditIssue {
  url: string;
  type: string;
  code: number;
}

interface AuditResult {
  target_url: string;
  score: number;
  pages_crawled: number;
  issues: AuditIssue[];
  checked_at: string;
  status: string;
}

export default function AuditClient() {
  const [apiUrl, setApiUrl] = useState("https://weblytic-engine.onrender.com");
  const [targetUrl, setTargetUrl] = useState("");
  const [showAgencyOptions, setShowAgencyOptions] = useState(false);

  // Agency branding fields (hidden under "Custom Report")
  const [agencyName, setAgencyName] = useState("Weblytic Agency");
  const [agencyUrl, setAgencyUrl] = useState("weblytic.cc");
  const [primaryColor, setPrimaryColor] = useState("#1E3A8A");
  const [alertEmail, setAlertEmail] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // Scanning & Dashboard States
  const [isScanning, setIsScanning] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [engineAwake, setEngineAwake] = useState<boolean | null>(null);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Table filtering & search
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Handle Scan Website (returns JSON for dashboard)
  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl) return;

    setErrorMessage(null);
    setAuditResult(null);
    setIsScanning(true);
    setScanStep(1);

    const stepTimer1 = setTimeout(() => setScanStep(2), 2500);
    const stepTimer2 = setTimeout(() => setScanStep(3), 6000);

    const formData = new FormData();
    formData.append("target_url", targetUrl);
    if (alertEmail) formData.append("alert_email", alertEmail);
    formData.append("agency_name", agencyName);
    formData.append("agency_url", agencyUrl);
    formData.append("primary_color", primaryColor);

    try {
      const response = await fetch(`${apiUrl}/api/scan`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errDetail = `HTTP ${response.status}`;
        try {
          const errJson = await response.json();
          if (errJson.error) errDetail = errJson.error;
          else if (errJson.detail) errDetail = typeof errJson.detail === "string" ? errJson.detail : JSON.stringify(errJson.detail);
        } catch {
          const text = await response.text();
          if (text) errDetail = text;
        }
        throw new Error(errDetail);
      }

      const data: AuditResult = await response.json();
      setAuditResult(data);
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : "Error crawling website. Ensure target URL is valid.";
      setErrorMessage(errorStr);
      console.error("Scan error:", err);
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setIsScanning(false);
      setScanStep(0);
    }
  };

  // Handle On-Demand PDF Download from the Dashboard
  const handleDownloadPdf = async () => {
    if (!auditResult) return;
    setIsDownloadingPdf(true);

    try {
      const formData = new FormData();
      formData.append("target_url", auditResult.target_url);
      formData.append("agency_name", agencyName);
      formData.append("agency_url", agencyUrl);
      formData.append("primary_color", primaryColor);
      formData.append("checked_at", auditResult.checked_at);
      formData.append("score", String(auditResult.score));
      formData.append("pages_crawled", String(auditResult.pages_crawled));
      formData.append("issues_json", JSON.stringify(auditResult.issues));
      if (logoFile) {
        formData.append("logo", logoFile);
      }

      const response = await fetch(`${apiUrl}/api/generate-pdf`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to generate PDF (HTTP ${response.status})`);
      }

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
    } catch (err) {
      console.error("PDF download error:", err);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Filtered issues for the dashboard table
  const filteredIssues = useMemo(() => {
    if (!auditResult?.issues) return [];
    return auditResult.issues.filter((issue) => {
      const matchesSearch =
        issue.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.type.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (filterType === "all") return true;
      if (filterType === "title-h1") return issue.type.includes("Title") || issue.type.includes("<h1>");
      if (filterType === "meta") return issue.type.includes("Meta") || issue.type.includes("Canonical");
      if (filterType === "content-img") return issue.type.includes("Alt Text") || issue.type.includes("Thin Content");
      if (filterType === "http") return issue.code >= 400 || issue.type.includes("Broken") || issue.type.includes("Timeout");
      return true;
    });
  }, [auditResult, filterType, searchQuery]);

  // Health Score Color & Badge
  const getScoreColor = (score: number) => {
    if (score >= 90) return { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", label: "Excellent Health" };
    if (score >= 70) return { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", label: "Needs Optimization" };
    return { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", label: "Critical Issues Detected" };
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-background flex flex-col text-text-primary">
        <Navbar />

        <main className="flex-1 pt-32 pb-24">
          <div className="container mx-auto px-6 max-w-6xl">
            {/* Local Sandbox Testing Badge */}
            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-300"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="font-semibold uppercase tracking-wider">Local Testing Mode Active</span>
                <span className="text-amber-400/70">| Engine:</span>
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                SEO Health Scanner 2.0
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                Website Audit &amp; <span className="text-transparent bg-clip-text bg-primary-gradient">Health Explorer</span>
              </h1>
              <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Scan any website in real-time. Inspect technical SEO metrics, missing tags, heading hierarchies, canonical directives, and download clean reports.
              </p>
            </m.div>

            {/* Error Banner */}
            {errorMessage && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
                <div>
                  <h4 className="font-semibold text-sm">Crawl Failed</h4>
                  <p className="text-xs text-red-300/80 mt-1 font-mono">{errorMessage}</p>
                </div>
              </m.div>
            )}

            {/* Search & Audit Bar */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-elevated/90 backdrop-blur border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl mb-10"
            >
              <form onSubmit={handleScan} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" /> Target Website URL
                    </span>
                    <span className="text-xs text-text-muted">Crawls up to 15 internal pages</span>
                  </label>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <input
                        type="url"
                        name="target_url"
                        required
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full bg-background/80 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-text-muted/60 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                      />
                      <Search className="w-4 h-4 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <button
                      type="submit"
                      disabled={isScanning}
                      className={`py-3.5 px-8 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg sm:w-auto w-full ${
                        isScanning
                          ? "bg-white/10 text-white/50 cursor-not-allowed"
                          : "bg-primary-gradient hover:opacity-95 text-white shadow-primary/25 hover:shadow-primary/40 cursor-pointer"
                      }`}
                    >
                      {isScanning ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Crawling...
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          Scan Website
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Custom Report (White-Label Agency) Toggle Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAgencyOptions(!showAgencyOptions)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-white transition-colors py-1 px-2.5 rounded-lg hover:bg-white/5"
                  >
                    <Palette className="w-3.5 h-3.5 text-primary" />
                    <span>Custom Report (Agency White-Label Options)</span>
                    {showAgencyOptions ? (
                      <ChevronUp className="w-3.5 h-3.5 text-text-muted" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
                    )}
                  </button>
                </div>

                {/* Collapsible Agency Customization Panel */}
                <AnimatePresence>
                  {showAgencyOptions && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pt-4 border-t border-white/10"
                    >
                      <div className="p-5 rounded-xl bg-black/30 border border-white/10 space-y-5 text-sm">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-white flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-primary" /> White-Label Report Settings
                          </h4>
                          <span className="text-xs text-text-muted">Applied when exporting PDF</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-text-muted mb-1.5">Agency Name</label>
                            <input
                              type="text"
                              value={agencyName}
                              onChange={(e) => setAgencyName(e.target.value)}
                              placeholder="Weblytic Agency"
                              className="w-full bg-background/80 border border-white/15 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-text-muted mb-1.5">Agency Website</label>
                            <input
                              type="text"
                              value={agencyUrl}
                              onChange={(e) => setAgencyUrl(e.target.value)}
                              placeholder="weblytic.cc"
                              className="w-full bg-background/80 border border-white/15 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-text-muted mb-1.5">Report Accent Color</label>
                            <div className="flex items-center gap-3">
                              <input
                                type="color"
                                value={primaryColor}
                                onChange={(e) => setPrimaryColor(e.target.value)}
                                className="w-10 h-9 bg-transparent border border-white/15 rounded-lg cursor-pointer p-0.5"
                              />
                              <input
                                type="text"
                                value={primaryColor}
                                onChange={(e) => setPrimaryColor(e.target.value)}
                                className="w-full bg-background/80 border border-white/15 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-primary"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-text-muted mb-1.5">Agency Logo (Optional)</label>
                            <input
                              type="file"
                              accept="image/png, image/jpeg"
                              onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                              className="w-full text-xs text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 file:cursor-pointer cursor-pointer bg-background/80 border border-white/15 rounded-lg p-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-text-muted mb-1">Weekly Watchdog Alert Email (Optional)</label>
                          <p className="text-[11px] text-text-muted/80 mb-2">
                            Enter your email to save this site into Turso for automated weekly regression watchdog alerts.
                          </p>
                          <input
                            type="email"
                            value={alertEmail}
                            onChange={(e) => setAlertEmail(e.target.value)}
                            placeholder="alerts@agency.com"
                            className="w-full bg-background/80 border border-white/15 rounded-lg px-3 py-2 text-white placeholder-text-muted/60 text-xs focus:outline-none focus:border-primary font-mono"
                          />
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </form>
            </m.div>

            {/* Scanning Progress HUD */}
            {isScanning && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-2xl bg-elevated border border-primary/20 shadow-2xl mb-10 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 mx-auto flex items-center justify-center text-primary mb-4 animate-spin">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Scanning Target Website...</h3>
                <p className="text-sm text-text-muted max-w-md mx-auto mb-6">
                  {scanStep === 1 && "Connecting to server & verifying HTTP response codes..."}
                  {scanStep === 2 && "Crawling internal links & parsing HTML headings and meta tags..."}
                  {scanStep === 3 && "Analyzing image alt attributes, canonicals & calculating word density..."}
                </p>

                <div className="w-full max-w-md mx-auto bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-primary-gradient transition-all duration-700"
                    style={{ width: scanStep === 1 ? "30%" : scanStep === 2 ? "65%" : "90%" }}
                  />
                </div>
              </m.div>
            )}

            {/* AUDIT RESULTS DASHBOARD */}
            {auditResult && (
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Hero Results Banner */}
                <div className="p-6 md:p-8 rounded-2xl bg-elevated/90 border border-white/15 shadow-2xl">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-5">
                      {/* Health Score Gauge */}
                      <div
                        className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-2 ${
                          getScoreColor(auditResult.score).bg
                        } ${getScoreColor(auditResult.score).border}`}
                      >
                        <span className={`text-3xl font-display font-bold ${getScoreColor(auditResult.score).text}`}>
                          {auditResult.score}
                        </span>
                        <span className="text-[10px] uppercase font-semibold text-text-muted tracking-wider">Health</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl md:text-2xl font-bold text-white">{auditResult.target_url}</h2>
                          <a
                            href={auditResult.target_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-text-muted">
                          <span>Audited: {auditResult.checked_at}</span>
                          <span>•</span>
                          <span className={`font-semibold ${getScoreColor(auditResult.score).text}`}>
                            {getScoreColor(auditResult.score).label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Download PDF Button (Rendered directly from Dashboard) */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <button
                        type="button"
                        onClick={handleDownloadPdf}
                        disabled={isDownloadingPdf}
                        className={`w-full md:w-auto py-3 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                          isDownloadingPdf
                            ? "bg-white/10 text-white/50 cursor-not-allowed"
                            : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20 cursor-pointer"
                        }`}
                      >
                        {isDownloadingPdf ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Rendering PDF...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            Download Audit PDF
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-xs text-text-muted block mb-1">Pages Crawled</span>
                      <span className="text-2xl font-bold text-white">{auditResult.pages_crawled}</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-xs text-text-muted block mb-1">Issues Detected</span>
                      <span className="text-2xl font-bold text-rose-400">{auditResult.issues.length}</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-xs text-text-muted block mb-1">Technical Score</span>
                      <span className="text-2xl font-bold text-cyan-400">{auditResult.score} / 100</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-xs text-text-muted block mb-1">Scan Status</span>
                      <span className="text-sm font-semibold text-white truncate block mt-1">{auditResult.status}</span>
                    </div>
                  </div>
                </div>

                {/* Audit Findings Explorer */}
                <div className="p-6 md:p-8 rounded-2xl bg-elevated/90 border border-white/15 shadow-2xl">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Layers className="w-5 h-5 text-primary" /> Audit Findings ({auditResult.issues.length})
                      </h3>
                      <p className="text-xs text-text-muted mt-0.5">Filter by category or search by URL</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                      <input
                        type="text"
                        placeholder="Search findings..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-background/80 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white placeholder-text-muted/60 focus:outline-none focus:border-primary md:w-48 w-full"
                      />
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap gap-2 pb-5 border-b border-white/10 mb-6">
                    {[
                      { id: "all", label: `All Issues (${auditResult.issues.length})` },
                      { id: "title-h1", label: "Title & H1s" },
                      { id: "meta", label: "Meta & Canonical" },
                      { id: "content-img", label: "Images & Content" },
                      { id: "http", label: "HTTP & Broken Links" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setFilterType(tab.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg transition-colors font-medium ${
                          filterType === tab.id
                            ? "bg-primary text-white"
                            : "bg-white/5 text-text-muted hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Findings Table / Zero State */}
                  {filteredIssues.length === 0 ? (
                    <div className="text-center py-12 px-4 rounded-xl bg-white/5 border border-white/5">
                      <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                      <h4 className="text-base font-bold text-white mb-1">
                        {auditResult.issues.length === 0
                          ? "Zero Issues Detected!"
                          : "No issues match this filter"}
                      </h4>
                      <p className="text-xs text-text-muted max-w-sm mx-auto">
                        {auditResult.issues.length === 0
                          ? "All scanned pages returned 200 OK with valid Title, H1, Meta Description, Canonical, and Alt tags."
                          : "Try switching to 'All Issues' to view other detected findings."}
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-text-muted uppercase tracking-wider text-[11px]">
                            <th className="py-3 px-4 font-semibold">Page URL</th>
                            <th className="py-3 px-4 font-semibold">Detected Issue</th>
                            <th className="py-3 px-4 font-semibold w-24">HTTP Code</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredIssues.map((issue, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors group">
                              <td className="py-3 px-4 text-white font-mono max-w-md truncate">
                                <a
                                  href={issue.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-primary transition-colors inline-flex items-center gap-1.5 truncate"
                                  title={issue.url}
                                >
                                  <span className="truncate">{issue.url}</span>
                                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                </a>
                              </td>
                              <td className="py-3 px-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-rose-500/10 border border-rose-500/20 text-rose-300">
                                  <AlertTriangle className="w-3 h-3 text-rose-400 flex-shrink-0" />
                                  {issue.type}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-mono font-semibold">
                                <span
                                  className={`px-2 py-0.5 rounded text-[11px] ${
                                    issue.code >= 400 ? "bg-red-500/20 text-red-300" : "bg-emerald-500/20 text-emerald-300"
                                  }`}
                                >
                                  {issue.code}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </m.div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </LazyMotion>
  );
}
