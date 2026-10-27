"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Search, Globe, Building2, Palette, Mail, CheckCircle2,
  AlertCircle, Loader2, Sparkles, Download, ChevronDown, ChevronUp,
  ExternalLink, RefreshCw, AlertTriangle, Layers, CheckCircle,
  User, History, Printer, LogOut, ArrowRight, Clock, Trash2, Lock,
  Calendar
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export interface AuditSession {
  email: string;
  name?: string;
  country?: string;
  token?: string;
  createdAt?: string;
}

export interface AuditIssue {
  url: string;
  type: string;
  code: number;
}

export interface AuditResult {
  id?: string;
  target_url: string;
  score: number;
  pages_crawled: number;
  issues: AuditIssue[];
  checked_at: string;
  status: string;
}

const WEEKLY_AUDIT_LIMIT = 4;
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export default function AuditClient() {
  const router = useRouter();

  const [apiUrl, setApiUrl] = useState("https://weblytic-engine.onrender.com");
  const [targetUrl, setTargetUrl] = useState("");
  const [showAgencyOptions, setShowAgencyOptions] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Authentication & Loading States
  const [session, setSession] = useState<AuditSession | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Weekly Audit Usage Timestamps
  const [auditTimestamps, setAuditTimestamps] = useState<number[]>([]);

  // Agency branding fields
  const [agencyName, setAgencyName] = useState("Weblytic Agency");
  const [agencyUrl, setAgencyUrl] = useState("weblytic.cc");
  const [primaryColor, setPrimaryColor] = useState("#2563EB");
  const [alertEmail, setAlertEmail] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // Scanning & Dashboard States
  const [isScanning, setIsScanning] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isGeneratingBrowserPdf, setIsGeneratingBrowserPdf] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Audit History state (persisted per account in localStorage)
  const [history, setHistory] = useState<AuditResult[]>([]);

  // Table filtering & search
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // STRICT AUTHENTICATION GUARD & QUOTA LOAD
  useEffect(() => {
    try {
      const isAuthActive = localStorage.getItem("audit_auth_active") === "true";
      const rawSession = localStorage.getItem("audit_session");

      if (isAuthActive && rawSession) {
        const parsed: AuditSession = JSON.parse(rawSession);
        // Ensure real authenticated session and reject old demo leftovers
        if (parsed.email && parsed.email !== "agency@weblytic.cc" && parsed.email !== "auditor@weblytic.cc") {
          setSession(parsed);
          setAlertEmail(parsed.email);

          // Load account history
          const rawHistory = localStorage.getItem(`audit_history_${parsed.email}`);
          if (rawHistory) {
            setHistory(JSON.parse(rawHistory));
          }

          // Load weekly audit timestamps
          const rawTimestamps = localStorage.getItem(`audit_timestamps_${parsed.email}`);
          if (rawTimestamps) {
            const parsedTimes: number[] = JSON.parse(rawTimestamps);
            // Filter timestamps strictly to last 7 days
            const valid = parsedTimes.filter((t) => Date.now() - t < ONE_WEEK_MS);
            setAuditTimestamps(valid);
          }

          setIsCheckingAuth(false);
          return;
        }
      }

      // Not authenticated: clear any residual state and redirect to login
      localStorage.removeItem("audit_session");
      localStorage.removeItem("audit_auth_active");
      localStorage.removeItem("audit_user");
      sessionStorage.removeItem("audit_session");
      sessionStorage.removeItem("audit_user");
      setSession(null);
      setIsCheckingAuth(false);
      router.replace("/audit/login");
    } catch {
      setIsCheckingAuth(false);
      router.replace("/audit/login");
    }
  }, [router]);

  // Compute Weekly Audit Quota (4 audits per week per user)
  const activeWeekScans = useMemo(() => {
    return auditTimestamps.filter((t) => Date.now() - t < ONE_WEEK_MS);
  }, [auditTimestamps]);

  const usedAuditsThisWeek = activeWeekScans.length;
  const remainingAudits = Math.max(0, WEEKLY_AUDIT_LIMIT - usedAuditsThisWeek);
  const isWeeklyLimitReached = remainingAudits <= 0;

  // Calculate days until oldest weekly scan expires
  const daysUntilQuotaReset = useMemo(() => {
    if (activeWeekScans.length === 0) return 7;
    const oldest = Math.min(...activeWeekScans);
    const resetTime = oldest + ONE_WEEK_MS;
    const diffDays = Math.ceil((resetTime - Date.now()) / (24 * 60 * 60 * 1000));
    return Math.max(1, diffDays);
  }, [activeWeekScans]);

  const handleSignOut = () => {
    try {
      localStorage.removeItem("audit_session");
      localStorage.removeItem("audit_auth_active");
      localStorage.removeItem("audit_user");
      sessionStorage.clear();
    } catch {
      // Ignore
    }
    setSession(null);
    setAuditResult(null);
    router.push("/audit/login");
  };

  // Save audit to history list
  const saveAuditToHistory = (newResult: AuditResult) => {
    const updated = [newResult, ...history.filter((h) => h.target_url !== newResult.target_url || h.checked_at !== newResult.checked_at)].slice(0, 15);
    setHistory(updated);
    if (session?.email) {
      try {
        localStorage.setItem(`audit_history_${session.email}`, JSON.stringify(updated));
      } catch {
        // Ignore
      }
    }
  };

  const clearHistory = () => {
    setHistory([]);
    if (session?.email) {
      try {
        localStorage.removeItem(`audit_history_${session.email}`);
      } catch {
        // Ignore
      }
    }
  };

  // Run Scan Website
  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl || isWeeklyLimitReached) return;

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
    if (session?.email) formData.append("user_id", session.email);

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
      data.id = `audit_${Date.now()}`;
      setAuditResult(data);
      saveAuditToHistory(data);

      // Record quota usage timestamp
      const newTimestamps = [...activeWeekScans, Date.now()];
      setAuditTimestamps(newTimestamps);
      if (session?.email) {
        try {
          localStorage.setItem(`audit_timestamps_${session.email}`, JSON.stringify(newTimestamps));
        } catch {
          // Ignore
        }
      }
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

  // CLIENT-SIDE BROWSER PDF COMPILER
  const handleBrowserPrintPdf = (resultToPrint: AuditResult | null = auditResult) => {
    if (!resultToPrint) return;
    setIsGeneratingBrowserPdf(true);

    try {
      const activeAgency = agencyName || "Weblytic SEO Engine";
      const activeAgencyUrl = agencyUrl || "weblytic.cc";
      const accent = primaryColor || "#2563EB";

      const printHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <title>SEO Audit Report - ${resultToPrint.target_url}</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 14mm 16mm 14mm 16mm;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #0f172a;
              background: #ffffff;
              line-height: 1.45;
              font-size: 11pt;
              margin: 0;
              padding: 0;
            }
            .header-bar {
              border-bottom: 3px solid ${accent};
              padding-bottom: 12px;
              margin-bottom: 18px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            }
            .agency-title {
              font-size: 18pt;
              font-weight: 800;
              color: ${accent};
              margin: 0;
            }
            .agency-url {
              font-size: 9.5pt;
              color: #64748b;
              margin-top: 2px;
            }
            .report-meta {
              text-align: right;
              font-size: 9pt;
              color: #475569;
            }
            .hero-card {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 16px 20px;
              margin-bottom: 20px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .score-circle {
              width: 75px;
              height: 75px;
              border-radius: 50%;
              background: ${resultToPrint.score >= 85 ? "#ecfdf5" : resultToPrint.score >= 70 ? "#fffbeb" : "#fef2f2"};
              border: 3px solid ${resultToPrint.score >= 85 ? "#10b981" : resultToPrint.score >= 70 ? "#f59e0b" : "#ef4444"};
              color: ${resultToPrint.score >= 85 ? "#065f46" : resultToPrint.score >= 70 ? "#92400e" : "#991b1b"};
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-weight: 800;
              font-size: 22pt;
              line-height: 1;
            }
            .score-label {
              font-size: 7.5pt;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-top: 3px;
            }
            .hero-info {
              flex: 1;
              margin-left: 20px;
            }
            .target-url {
              font-size: 14pt;
              font-weight: 700;
              color: #0f172a;
              word-break: break-all;
            }
            .metric-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 12px;
              margin-bottom: 22px;
            }
            .metric-box {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 10px 14px;
            }
            .metric-box-title {
              font-size: 8pt;
              text-transform: uppercase;
              color: #64748b;
              font-weight: 600;
            }
            .metric-box-val {
              font-size: 16pt;
              font-weight: 800;
              color: #0f172a;
              margin-top: 3px;
            }
            .section-title {
              font-size: 12pt;
              font-weight: 700;
              color: #1e293b;
              margin: 18px 0 10px 0;
              padding-bottom: 6px;
              border-bottom: 1px solid #e2e8f0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 9pt;
            }
            th {
              background: #f1f5f9;
              color: #475569;
              text-align: left;
              padding: 8px 10px;
              font-weight: 700;
              border-bottom: 2px solid #cbd5e1;
            }
            td {
              padding: 7px 10px;
              border-bottom: 1px solid #f1f5f9;
              vertical-align: top;
            }
            tr:nth-child(even) {
              background: #f8fafc;
            }
            .badge-issue {
              display: inline-block;
              background: #fee2e2;
              color: #991b1b;
              padding: 2px 7px;
              border-radius: 4px;
              font-weight: 600;
              font-size: 8pt;
            }
            .footer-notice {
              margin-top: 30px;
              padding-top: 12px;
              border-top: 1px solid #e2e8f0;
              font-size: 8pt;
              color: #94a3b8;
              display: flex;
              justify-content: space-between;
            }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="header-bar">
            <div>
              <div class="agency-title">${activeAgency}</div>
              <div class="agency-url">${activeAgencyUrl}</div>
            </div>
            <div class="report-meta">
              <strong>Technical SEO Health Audit</strong><br />
              Generated: ${resultToPrint.checked_at || new Date().toLocaleString()}
            </div>
          </div>

          <div class="hero-card">
            <div class="score-circle">
              ${resultToPrint.score}
              <span class="score-label">Score</span>
            </div>
            <div class="hero-info">
              <div class="target-url">${resultToPrint.target_url}</div>
              <div style="font-size: 9.5pt; color: #64748b; margin-top: 4px;">
                Status: <strong>${resultToPrint.status}</strong> • Crawled: <strong>${resultToPrint.pages_crawled} page(s)</strong> • Issues Found: <strong>${resultToPrint.issues.length}</strong>
              </div>
            </div>
          </div>

          <div class="metric-grid">
            <div class="metric-box">
              <div class="metric-box-title">Pages Crawled</div>
              <div class="metric-box-val">${resultToPrint.pages_crawled}</div>
            </div>
            <div class="metric-box">
              <div class="metric-box-title">Issues Detected</div>
              <div class="metric-box-val" style="color: ${resultToPrint.issues.length === 0 ? '#10b981' : '#ef4444'}">
                ${resultToPrint.issues.length}
              </div>
            </div>
            <div class="metric-box">
              <div class="metric-box-title">Health Score</div>
              <div class="metric-box-val" style="color: ${accent}">${resultToPrint.score} / 100</div>
            </div>
            <div class="metric-box">
              <div class="metric-box-title">Engine Check</div>
              <div class="metric-box-val" style="font-size: 11pt; margin-top: 7px; color: #10b981">Verified 200 OK</div>
            </div>
          </div>

          <div class="section-title">Technical Findings &amp; Optimizations (${resultToPrint.issues.length})</div>

          ${
            resultToPrint.issues.length === 0
              ? `<div style="padding: 20px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; color: #065f46; font-size: 9.5pt;">
                   <strong>Clean Audit:</strong> Zero critical SEO or structural errors were detected across all scanned pages.
                 </div>`
              : `<table>
                   <thead>
                     <tr>
                       <th style="width: 55%">Page URL</th>
                       <th style="width: 35%">Issue Description</th>
                       <th style="width: 10%">HTTP</th>
                     </tr>
                   </thead>
                   <tbody>
                     ${resultToPrint.issues
                       .map(
                         (iss) => `
                       <tr>
                         <td style="font-family: monospace; word-break: break-all;">${iss.url}</td>
                         <td><span class="badge-issue">${iss.type}</span></td>
                         <td style="font-family: monospace; font-weight: bold;">${iss.code}</td>
                       </tr>
                     `
                       )
                       .join("")}
                   </tbody>
                 </table>`
          }

          <div class="footer-notice">
            <span>Confidential SEO Audit Report • Prepared by ${activeAgency}</span>
          </div>
        </body>
        </html>
      `;

      const printFrame = document.createElement("iframe");
      printFrame.style.position = "fixed";
      printFrame.style.right = "0";
      printFrame.style.bottom = "0";
      printFrame.style.width = "0";
      printFrame.style.height = "0";
      printFrame.style.border = "0";
      document.body.appendChild(printFrame);

      const frameDoc = printFrame.contentWindow?.document;
      if (frameDoc) {
        frameDoc.open();
        frameDoc.write(printHtml);
        frameDoc.close();

        setTimeout(() => {
          printFrame.contentWindow?.focus();
          printFrame.contentWindow?.print();
          setTimeout(() => {
            document.body.removeChild(printFrame);
            setIsGeneratingBrowserPdf(false);
          }, 1000);
        }, 500);
      } else {
        setIsGeneratingBrowserPdf(false);
      }
    } catch (err) {
      console.error("Browser PDF print error:", err);
      setIsGeneratingBrowserPdf(false);
      alert("Error printing PDF in browser.");
    }
  };

  // Fallback Backend PDF Generation
  const handleDownloadPdfViaBackend = async () => {
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
      alert("Error generating PDF via backend.");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Filtered issues
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", label: "Excellent Health" };
    if (score >= 70) return { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", label: "Needs Optimization" };
    return { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", label: "Critical Issues Detected" };
  };

  // While checking auth, show clean loading state (or redirecting to login)
  if (isCheckingAuth || !session) {
    return (
      <LazyMotion features={domAnimation}>
        <div className="min-h-screen bg-background flex flex-col text-text-primary selection:bg-primary selection:text-white">
          <Navbar />
          <main className="flex-1 pt-32 pb-24 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto p-8 rounded-3xl glass-card border border-white/10 text-center shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 mx-auto flex items-center justify-center text-primary mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-display font-bold text-white mb-2">
                Sign In Required
              </h2>
              <p className="text-xs text-text-muted mb-6 leading-relaxed">
                You must be signed in to access the SEO Audit Scanner. Redirecting to login portal...
              </p>
              <Link
                href="/audit/login"
                className="w-full py-2.5 px-6 rounded-xl font-semibold text-xs tracking-wide bg-primary-gradient text-white hover:brightness-110 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Go to Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-background flex flex-col text-text-primary selection:bg-primary selection:text-white">
        <Navbar />

        <main className="flex-1 pt-28 pb-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

            {/* HEADER SECTION */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                SEO Audit Engine
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">
                SEO Audit &amp; <span className="text-transparent bg-clip-text bg-primary-gradient">Health Scanner</span>
              </h1>
              <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                Scan any website in real-time. Inspect technical SEO health, Core Web Vitals, and generate vector PDF reports.
              </p>
            </m.div>

            {/* AUTHENTICATED AUDIT ENGINE & DASHBOARD */}
            <>
              {/* ACCOUNT STATUS & QUOTA BAR */}
              <div className="mb-6 p-3.5 rounded-2xl glass-card border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/20 text-primary border border-primary/30 font-semibold font-mono">
                    <User className="w-3.5 h-3.5" />
                    <span>{session.name ? `${session.name} (${session.email})` : session.email}</span>
                  </span>

                  {/* WEEKLY QUOTA BADGE (4 audits/week cap) */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono font-medium text-[11px] bg-white/5 border-white/10">
                    <Calendar className="w-3 h-3 text-text-muted" />
                    <span className="text-text-muted">Weekly Audits:</span>
                    <span
                      className={`font-bold ${
                        remainingAudits > 1
                          ? "text-emerald-400"
                          : remainingAudits === 1
                          ? "text-amber-400"
                          : "text-rose-400"
                      }`}
                    >
                      {remainingAudits} / {WEEKLY_AUDIT_LIMIT} remaining
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowHistory(!showHistory)}
                    className={`px-3 py-1.5 rounded-xl font-medium transition-colors flex items-center gap-1.5 ${
                      showHistory ? "bg-primary text-white" : "bg-white/5 hover:bg-white/10 text-white"
                    }`}
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>History ({history.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="px-3 py-1.5 rounded-xl font-medium bg-white/5 hover:bg-red-500/20 hover:text-red-300 text-text-muted transition-colors flex items-center gap-1.5"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* AUDIT HISTORY DRAWER */}
              <AnimatePresence>
                {showHistory && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 p-5 rounded-2xl glass-card border border-white/10 overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <History className="w-4 h-4 text-primary" />
                        <h3 className="font-bold text-white text-sm">Saved Scans ({history.length})</h3>
                      </div>
                      {history.length > 0 && (
                        <button
                          type="button"
                          onClick={clearHistory}
                          className="text-text-muted hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Clear History</span>
                        </button>
                      )}
                    </div>

                    {history.length === 0 ? (
                      <div className="py-6 text-center text-text-muted text-xs">
                        No audits saved yet. Run an audit below to save results.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {history.map((item, idx) => (
                          <div
                            key={item.id || idx}
                            className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <span className="font-mono text-xs text-white font-semibold truncate max-w-[180px]">
                                  {item.target_url}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    getScoreColor(item.score).bg
                                  } ${getScoreColor(item.score).text}`}
                                >
                                  {item.score}/100
                                </span>
                              </div>
                              <div className="text-[11px] text-text-muted flex items-center gap-2 mb-3">
                                <Clock className="w-3 h-3" />
                                <span>{item.checked_at || "Recent scan"}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                              <button
                                type="button"
                                onClick={() => {
                                  setAuditResult(item);
                                  setTargetUrl(item.target_url);
                                }}
                                className="flex-1 py-1 px-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary text-[11px] font-semibold transition-colors"
                              >
                                Load Report
                              </button>
                              <button
                                type="button"
                                onClick={() => handleBrowserPrintPdf(item)}
                                className="py-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[11px] font-medium transition-colors flex items-center gap-1"
                                title="Print PDF"
                              >
                                <Printer className="w-3 h-3" />
                                <span>PDF</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </m.div>
                )}
              </AnimatePresence>

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

              {/* WEEKLY LIMIT REACHED NOTICE BANNER */}
              {isWeeklyLimitReached && (
                <m.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" />
                  <div>
                    <h4 className="font-semibold text-sm">Weekly Audit Limit Reached (4/4 Used)</h4>
                    <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
                      You have used your 4 free audits for this 7-day period. Your next audit will become available in approximately {daysUntilQuotaReset} day(s).
                    </p>
                  </div>
                </m.div>
              )}

              {/* SEARCH & AUDIT BAR */}
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
                      <span className="text-xs text-text-muted">
                        {isWeeklyLimitReached ? "Weekly limit reached" : `${remainingAudits} of 4 audits remaining this week`}
                      </span>
                    </label>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <input
                          type="url"
                          name="target_url"
                          required
                          disabled={isWeeklyLimitReached || isScanning}
                          value={targetUrl}
                          onChange={(e) => setTargetUrl(e.target.value)}
                          placeholder={
                            isWeeklyLimitReached
                              ? `Weekly limit reached (4/4 audits used). Resets in ${daysUntilQuotaReset} days.`
                              : "https://example.com"
                          }
                          className="w-full bg-background/80 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-text-muted/60 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <Search className="w-4 h-4 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      <button
                        type="submit"
                        disabled={isScanning || isWeeklyLimitReached}
                        className={`py-3.5 px-8 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg sm:w-auto w-full ${
                          isScanning || isWeeklyLimitReached
                            ? "bg-white/10 text-white/50 cursor-not-allowed shadow-none"
                            : "bg-primary-gradient hover:opacity-95 text-white shadow-primary/25 hover:shadow-primary/40 cursor-pointer"
                        }`}
                      >
                        {isScanning ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Crawling...
                          </>
                        ) : isWeeklyLimitReached ? (
                          <>
                            <Lock className="w-4 h-4" />
                            Limit Reached (4/4)
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

                  {/* Customization Toggle */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAgencyOptions(!showAgencyOptions)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-white transition-colors py-1 px-2.5 rounded-lg hover:bg-white/5"
                    >
                      <Palette className="w-3.5 h-3.5 text-primary" />
                      <span>Report Branding Settings</span>
                      {showAgencyOptions ? (
                        <ChevronUp className="w-3.5 h-3.5 text-text-muted" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
                      )}
                    </button>
                  </div>

                  {/* Collapsible Customization Panel */}
                  <AnimatePresence>
                    {showAgencyOptions && (
                      <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pt-4 border-t border-white/10"
                      >
                        <div className="p-5 rounded-xl bg-black/30 border border-white/10 space-y-4 text-sm">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-text-muted mb-1.5">Agency / Company Name</label>
                              <input
                                type="text"
                                value={agencyName}
                                onChange={(e) => setAgencyName(e.target.value)}
                                placeholder="Weblytic Agency"
                                className="w-full bg-background/80 border border-white/15 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-text-muted mb-1.5">Website</label>
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
                              <label className="block text-xs font-medium text-text-muted mb-1.5">Accent Color</label>
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
                              <label className="block text-xs font-medium text-text-muted mb-1.5">Logo (Optional)</label>
                              <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                                className="w-full text-xs text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 file:cursor-pointer cursor-pointer bg-background/80 border border-white/15 rounded-lg p-1"
                              />
                            </div>
                          </div>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </form>
              </m.div>

              {/* SCANNING PROGRESS HUD */}
              {isScanning && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 rounded-2xl bg-elevated border border-primary/20 shadow-2xl mb-10 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 mx-auto flex items-center justify-center text-primary mb-4 animate-spin">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Analyzing Target Website...</h3>
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

                      {/* PDF Export Actions */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
                        <button
                          type="button"
                          onClick={() => handleBrowserPrintPdf()}
                          disabled={isGeneratingBrowserPdf}
                          className="py-3 px-5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 bg-primary-gradient text-white shadow-lg shadow-primary/25 hover:brightness-110 cursor-pointer"
                        >
                          {isGeneratingBrowserPdf ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Compiling PDF...</span>
                            </>
                          ) : (
                            <>
                              <Printer className="w-4 h-4" />
                              <span>Download PDF</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleDownloadPdfViaBackend}
                          disabled={isDownloadingPdf}
                          className="py-3 px-4 rounded-xl font-medium text-xs bg-white/5 hover:bg-white/10 text-text-muted hover:text-white border border-white/10 transition-all flex items-center justify-center gap-1.5"
                          title="Backend PDF Generation"
                        >
                          {isDownloadingPdf ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Download className="w-3.5 h-3.5" />
                          )}
                          <span>Server PDF</span>
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

                    {/* Findings Table */}
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
            </>
          </div>
        </main>

        <Footer />
      </div>
    </LazyMotion>
  );
}
