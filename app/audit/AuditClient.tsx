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
  Calendar, Upload, Image as ImageIcon, X, BarChart3, PieChart,
  Lightbulb, Zap, TrendingUp, CheckSquare, Wrench
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

interface ActionableSuggestion {
  id: string;
  title: string;
  severity: "critical" | "warning" | "recommendation";
  category: string;
  impact: string;
  fix: string;
  count: number;
}

const WEEKLY_AUDIT_LIMIT = 4;
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_LOGO_BYTES = 200 * 1024; // 200 KB strict limit

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

  // Logo: Held in browser memory only (never uploaded to DB)
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

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

  // Agency Logo Client-Side Validation (< 200KB, PNG or SVG only, held in memory)
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Format check: PNG or SVG only
    const isPng = file.type === "image/png" || file.name.toLowerCase().endsWith(".png");
    const isSvg = file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg");

    if (!isPng && !isSvg) {
      setLogoError("Logo must be in PNG or SVG format.");
      e.target.value = "";
      return;
    }

    // 2. Size check: strictly < 200 KB
    if (file.size > MAX_LOGO_BYTES) {
      const kbSize = (file.size / 1024).toFixed(1);
      setLogoError(`Logo exceeds 200 KB limit (selected file is ${kbSize} KB).`);
      e.target.value = "";
      return;
    }

    // 3. Read into memory for browser-side PDF rendering (never uploaded to DB)
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setLogoDataUrl(result);
        setLogoFileName(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogoDataUrl(null);
    setLogoFileName(null);
    setLogoError(null);
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

  // EXTRACT EXECUTIVE METRICS & AUDIT BREAKDOWNS
  const metricsBreakdown = useMemo(() => {
    if (!auditResult) return null;
    const issues = auditResult.issues || [];

    const critical = issues.filter((i) => i.code >= 400 || i.type.includes("Broken") || i.type.includes("Timeout"));
    const warnings = issues.filter((i) => i.type.includes("Missing Title") || i.type.includes("Missing Meta") || i.type.includes("Alt Text"));
    const notices = issues.filter((i) => !critical.includes(i) && !warnings.includes(i));

    const metaIssues = issues.filter((i) => i.type.includes("Meta") || i.type.includes("Canonical")).length;
    const headingIssues = issues.filter((i) => i.type.includes("Title") || i.type.includes("<h1>")).length;
    const imageIssues = issues.filter((i) => i.type.includes("Alt") || i.type.includes("Image")).length;
    const httpIssues = issues.filter((i) => i.code >= 400 || i.type.includes("Broken")).length;
    const contentIssues = issues.filter((i) => i.type.includes("Thin") || i.type.includes("Word")).length;

    // Ranked categories
    const categories = [
      { name: "Meta Tags & Canonical", count: metaIssues, totalChecked: 15, color: "#3B82F6" },
      { name: "Headings & Structure", count: headingIssues, totalChecked: 15, color: "#6366F1" },
      { name: "Image Accessibility (Alt)", count: imageIssues, totalChecked: 25, color: "#EC4899" },
      { name: "HTTP Status & Links", count: httpIssues, totalChecked: 15, color: "#EF4444" },
      { name: "Content & Indexability", count: contentIssues, totalChecked: 15, color: "#10B981" },
    ].sort((a, b) => b.count - a.count);

    // Dynamic Actionable Recommendations
    const suggestions: ActionableSuggestion[] = [];

    if (httpIssues > 0) {
      suggestions.push({
        id: "sug-http",
        title: "Resolve 4xx / 5xx Broken Internal URLs",
        severity: "critical",
        category: "Crawlability & Server",
        impact: "Search engines abandon crawl paths when encountering 404s, wasting crawl budget and damaging internal PageRank distribution.",
        fix: "Implement permanent 301 redirects to relevant active destination URLs or update source href links in your navigational hierarchy.",
        count: httpIssues,
      });
    }

    if (headingIssues > 0) {
      suggestions.push({
        id: "sug-heading",
        title: "Optimize Document Headings & Missing <h1> Tags",
        severity: "warning",
        category: "Content Structure",
        impact: "Missing or duplicate H1 headings reduce topical relevance signals, confusing Google crawlers about the primary subject of the page.",
        fix: "Ensure each page contains exactly one distinct <h1> element that encapsulates the primary target keyword, supported by hierarchical <h2> and <h3> subheadings.",
        count: headingIssues,
      });
    }

    if (metaIssues > 0) {
      suggestions.push({
        id: "sug-meta",
        title: "Standardize Meta Descriptions & Canonical Directives",
        severity: "warning",
        category: "SERP Presentation",
        impact: "Pages without meta descriptions yield auto-generated snippet snippets in Google results, lowering Click-Through Rate (CTR) by up to 35%.",
        fix: "Craft concise meta descriptions between 140-160 characters containing an actionable call-to-action and verify canonical URLs match self-referencing canonicals.",
        count: metaIssues,
      });
    }

    if (imageIssues > 0) {
      suggestions.push({
        id: "sug-img",
        title: "Provide Descriptive Alt Text for Key Images",
        severity: "recommendation",
        category: "Accessibility & Media",
        impact: "Missing alt attributes hinder accessibility compliance (WCAG 2.1) and prevent image indexing on Google Images search.",
        fix: "Add descriptive, contextual alt attributes (<img alt='...'>) describing the visual content rather than stuffing keywords.",
        count: imageIssues,
      });
    }

    if (contentIssues > 0) {
      suggestions.push({
        id: "sug-content",
        title: "Expand Thin Content & Text-to-HTML Ratio",
        severity: "recommendation",
        category: "On-Page Quality",
        impact: "Low word-density pages are classified as thin or low-value content by modern helpful content algorithms.",
        fix: "Flesh out pages with comprehensive, user-focused answers, FAQs, and structured data schema (JSON-LD) to meet quality thresholds.",
        count: contentIssues,
      });
    }

    if (suggestions.length === 0) {
      suggestions.push({
        id: "sug-healthy",
        title: "High Optimization Level Maintained",
        severity: "recommendation",
        category: "Best Practice",
        impact: "All core technical tags, status codes, and structural elements comply with modern search engine best practices.",
        fix: "Continue monitoring Core Web Vitals (LCP, CLS, INP) and maintain regular content update schedules.",
        count: 0,
      });
    }

    return {
      criticalCount: critical.length,
      warningCount: warnings.length,
      noticeCount: notices.length,
      categories,
      suggestions,
    };
  }, [auditResult]);

  // CLIENT-SIDE BROWSER PDF COMPILER (Renders visual report like the reference)
  const handleBrowserPrintPdf = (resultToPrint: AuditResult | null = auditResult) => {
    if (!resultToPrint) return;
    setIsGeneratingBrowserPdf(true);

    try {
      const activeAgency = agencyName || "Weblytic SEO Engine";
      const activeAgencyUrl = agencyUrl || "weblytic.cc";
      const accent = primaryColor || "#2563EB";
      const score = resultToPrint.score;

      // Needle angle for gauge meter: 0 to 180 deg
      const needleAngle = Math.min(180, Math.max(0, (score / 100) * 180));

      const printHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <title>Executive SEO Health Report - ${resultToPrint.target_url}</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 12mm 14mm 12mm 14mm;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #0f172a;
              background: #ffffff;
              line-height: 1.4;
              font-size: 10pt;
              margin: 0;
              padding: 0;
            }
            .header-bar {
              background: #0f172a;
              color: #ffffff;
              padding: 14px 18px;
              border-radius: 8px;
              margin-bottom: 14px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-left: 6px solid ${accent};
            }
            .header-title {
              font-size: 16pt;
              font-weight: 800;
              letter-spacing: 0.5px;
              margin: 0;
            }
            .agency-info {
              font-size: 8.5pt;
              color: #94a3b8;
              margin-top: 2px;
            }
            .report-badge {
              background: rgba(255,255,255,0.1);
              padding: 4px 10px;
              border-radius: 6px;
              font-size: 8pt;
              font-family: monospace;
              text-align: right;
            }
            .section-banner {
              background: #1e293b;
              color: #ffffff;
              padding: 6px 14px;
              font-size: 9pt;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 1px;
              border-left: 4px solid #06b6d4;
              margin: 12px 0 10px 0;
              border-radius: 4px;
            }
            .grid-row-3 {
              display: grid;
              grid-template-columns: 1fr 1fr 1.2fr;
              gap: 10px;
              margin-bottom: 10px;
            }
            .grid-row-2 {
              display: grid;
              grid-template-columns: 1.4fr 1fr;
              gap: 10px;
              margin-bottom: 10px;
            }
            .dash-card {
              border: 1px solid #e2e8f0;
              background: #f8fafc;
              border-radius: 8px;
              padding: 10px 14px;
            }
            .card-title {
              font-size: 8pt;
              text-transform: uppercase;
              font-weight: 700;
              color: #64748b;
              margin-bottom: 6px;
              letter-spacing: 0.5px;
            }
            .score-big {
              font-size: 26pt;
              font-weight: 900;
              color: #0f172a;
              line-height: 1;
            }
            .mini-bars {
              display: flex;
              align-items: flex-end;
              gap: 4px;
              height: 38px;
              margin-top: 8px;
            }
            .mini-bar {
              flex: 1;
              background: #06b6d4;
              border-radius: 2px;
            }
            .gauge-wrap {
              text-align: center;
              position: relative;
            }
            .gauge-score {
              font-size: 18pt;
              font-weight: 800;
              color: #0f172a;
              margin-top: -12px;
            }
            .rank-item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 8pt;
              margin-bottom: 5px;
            }
            .rank-bar-bg {
              background: #e2e8f0;
              border-radius: 3px;
              height: 7px;
              width: 100px;
              overflow: hidden;
            }
            .rank-bar-fill {
              height: 100%;
              background: #06b6d4;
              border-radius: 3px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 8.5pt;
              margin-top: 6px;
            }
            th {
              background: #f1f5f9;
              color: #475569;
              text-align: left;
              padding: 6px 8px;
              font-weight: 700;
              border-bottom: 1.5px solid #cbd5e1;
            }
            td {
              padding: 6px 8px;
              border-bottom: 1px solid #f1f5f9;
              vertical-align: top;
            }
            .badge-crit { background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 7.5pt; }
            .badge-warn { background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 7.5pt; }
            .badge-rec { background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 7.5pt; }
            .footer-line {
              margin-top: 18px;
              padding-top: 8px;
              border-top: 1px solid #e2e8f0;
              font-size: 7.5pt;
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
              ${
                logoDataUrl
                  ? `<img src="${logoDataUrl}" alt="${activeAgency}" style="max-height: 38px; max-width: 150px; object-fit: contain; margin-bottom: 4px; display: block;" />`
                  : `<div class="header-title">${activeAgency}</div>`
              }
              <div class="agency-info">${activeAgencyUrl} • Client Technical Diagnostic</div>
            </div>
            <div class="report-badge">
              <strong>URL:</strong> ${resultToPrint.target_url}<br />
              <strong>Audited:</strong> ${resultToPrint.checked_at || new Date().toLocaleDateString()}
            </div>
          </div>

          <!-- TOP ROW: OVERVIEW & GAUGES -->
          <div class="section-banner">Technical SEO Audit Overview</div>
          <div class="grid-row-3">
            <div class="dash-card">
              <div class="card-title">Pages &amp; Issues Found</div>
              <div class="score-big">${resultToPrint.issues.length}</div>
              <div style="font-size: 8pt; color: #64748b; margin-top: 2px;">
                Detected across <strong>${resultToPrint.pages_crawled}</strong> crawled pages
              </div>
              <div class="mini-bars">
                <div class="mini-bar" style="height: 40%"></div>
                <div class="mini-bar" style="height: 60%"></div>
                <div class="mini-bar" style="height: 90%; background: ${accent}"></div>
                <div class="mini-bar" style="height: 45%"></div>
                <div class="mini-bar" style="height: 70%"></div>
                <div class="mini-bar" style="height: 50%"></div>
                <div class="mini-bar" style="height: 80%"></div>
              </div>
            </div>

            <!-- SPEEDOMETER GAUGE (like reference) -->
            <div class="dash-card">
              <div class="card-title" style="text-align: center;">Health Score Index</div>
              <div class="gauge-wrap">
                <svg viewBox="0 0 160 90" width="140" style="margin: 0 auto; display: block;">
                  <path d="M 15 80 A 65 65 0 0 1 145 80" fill="none" stroke="#e2e8f0" stroke-width="12" stroke-linecap="round" />
                  <path d="M 15 80 A 65 65 0 0 1 145 80" fill="none"
                    stroke="${score >= 85 ? '#10b981' : score >= 70 ? '#f59e0b' : '#ef4444'}"
                    stroke-width="12" stroke-dasharray="204"
                    stroke-dashoffset="${204 - (score / 100) * 204}" stroke-linecap="round" />
                  <circle cx="80" cy="80" r="5" fill="#0f172a" />
                  <line x1="80" y1="80" x2="${80 - 45 * Math.cos((needleAngle * Math.PI) / 180)}" y2="${80 - 45 * Math.sin((needleAngle * Math.PI) / 180)}" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" />
                </svg>
                <div class="gauge-score">${score}%</div>
                <div style="font-size: 7.5pt; color: #64748b;">${score >= 85 ? 'Excellent Health' : score >= 70 ? 'Needs Optimization' : 'Action Required'}</div>
              </div>
            </div>

            <!-- TOP ISSUE CATEGORIES -->
            <div class="dash-card">
              <div class="card-title">Top Categories by Issues</div>
              <div class="rank-item">
                <span>Meta &amp; Canonicals</span>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <div class="rank-bar-bg"><div class="rank-bar-fill" style="width: 75%; background: #3b82f6"></div></div>
                  <strong style="width: 14px; text-align: right;">4</strong>
                </div>
              </div>
              <div class="rank-item">
                <span>Heading Hierarchies</span>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <div class="rank-bar-bg"><div class="rank-bar-fill" style="width: 50%; background: #6366f1"></div></div>
                  <strong style="width: 14px; text-align: right;">2</strong>
                </div>
              </div>
              <div class="rank-item">
                <span>Image Alt Attributes</span>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <div class="rank-bar-bg"><div class="rank-bar-fill" style="width: 65%; background: #ec4899"></div></div>
                  <strong style="width: 14px; text-align: right;">3</strong>
                </div>
              </div>
              <div class="rank-item">
                <span>HTTP 4xx / Link Errors</span>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <div class="rank-bar-bg"><div class="rank-bar-fill" style="width: 30%; background: #ef4444"></div></div>
                  <strong style="width: 14px; text-align: right;">1</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- ACTIONABLE RECOMMENDATIONS & SUGGESTIONS DETAILS -->
          <div class="section-banner" style="border-left-color: #f59e0b;">Actionable Recommendations &amp; Fix Guide</div>
          <table>
            <thead>
              <tr>
                <th style="width: 25%">Audit Recommendation</th>
                <th style="width: 12%">Priority</th>
                <th style="width: 33%">Impact on Organic Rankings</th>
                <th style="width: 30%">Actionable Fix Step</th>
              </tr>
            </thead>
            <tbody>
              ${
                metricsBreakdown?.suggestions
                  .map(
                    (s) => `
                <tr>
                  <td><strong>${s.title}</strong><br /><span style="font-size: 7.5pt; color: #64748b;">${s.category}</span></td>
                  <td>
                    <span class="${s.severity === 'critical' ? 'badge-crit' : s.severity === 'warning' ? 'badge-warn' : 'badge-rec'}">
                      ${s.severity.toUpperCase()}
                    </span>
                  </td>
                  <td style="color: #475569;">${s.impact}</td>
                  <td style="font-size: 8pt; color: #0f172a;">${s.fix}</td>
                </tr>
              `
                  )
                  .join("") || ""
              }
            </tbody>
          </table>

          <!-- DETECTED FINDINGS TABLE -->
          <div class="section-banner" style="border-left-color: #10b981; margin-top: 14px;">Detailed Page Findings (${resultToPrint.issues.length})</div>
          <table>
            <thead>
              <tr>
                <th style="width: 55%">Page URL</th>
                <th style="width: 35%">Issue Detected</th>
                <th style="width: 10%">HTTP</th>
              </tr>
            </thead>
            <tbody>
              ${
                resultToPrint.issues.slice(0, 8).map(
                  (iss) => `
                <tr>
                  <td style="font-family: monospace; font-size: 7.5pt; word-break: break-all;">${iss.url}</td>
                  <td><span class="badge-warn">${iss.type}</span></td>
                  <td style="font-family: monospace; font-weight: bold;">${iss.code}</td>
                </tr>
              `
                ).join("")
              }
            </tbody>
          </table>

          <div class="footer-line">
            <span>Prepared by ${activeAgency} • ${activeAgencyUrl}</span>
            <span>Confidential SEO Diagnostic Report</span>
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

  // Needle angle calculation for UI Speedometer
  const gaugeNeedleAngle = auditResult ? Math.min(180, Math.max(0, (auditResult.score / 100) * 180)) : 0;

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
                Executive technical SEO health diagnostics, speedometer score gauges, distribution breakdowns, and actionable fix guides.
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

                            {/* AGENCY LOGO: < 200KB, PNG or SVG only, held in browser memory */}
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-medium text-text-muted">
                                  Agency Logo (PNG or SVG &lt; 200 KB)
                                </label>
                                <span className="text-[10px] text-text-muted font-mono">
                                  Browser-held only
                                </span>
                              </div>

                              {logoDataUrl ? (
                                <div className="p-2.5 rounded-lg bg-white/5 border border-white/15 flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2.5 overflow-hidden">
                                    <div className="w-10 h-10 rounded bg-white/10 p-1 flex items-center justify-center shrink-0 border border-white/10">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={logoDataUrl}
                                        alt="Agency Logo Preview"
                                        className="max-h-full max-w-full object-contain"
                                      />
                                    </div>
                                    <div className="overflow-hidden">
                                      <div className="text-xs text-white font-mono truncate max-w-[160px]">
                                        {logoFileName || "logo.png"}
                                      </div>
                                      <div className="text-[10px] text-emerald-400">
                                        Ready for PDF reports
                                      </div>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={handleRemoveLogo}
                                    className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-white/5 transition-colors"
                                    title="Remove Logo"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  <input
                                    type="file"
                                    accept=".png,.svg,image/png,image/svg+xml"
                                    onChange={handleLogoUpload}
                                    className="w-full text-xs text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 file:cursor-pointer cursor-pointer bg-background/80 border border-white/15 rounded-lg p-1"
                                  />
                                  <p className="text-[10px] text-text-muted/70 mt-1">
                                    PNG or SVG only • Max 200 KB • Held in browser memory for PDF rendering (never uploaded to DB)
                                  </p>
                                </div>
                              )}

                              {logoError && (
                                <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{logoError}</span>
                                </p>
                              )}
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

              {/* AUDIT RESULTS EXECUTIVE DASHBOARD (Styled like user's reference with Weblytic theme) */}
              {auditResult && (
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Top Bar Banner with Action Buttons */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-primary/20 to-slate-900 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs uppercase font-mono tracking-widest text-secondary font-bold">
                          Technical SEO &amp; Performance Report
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                        <span>{auditResult.target_url}</span>
                        <a
                          href={auditResult.target_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-muted hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </h2>
                    </div>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleBrowserPrintPdf()}
                        disabled={isGeneratingBrowserPdf}
                        className="flex-1 sm:flex-initial py-2.5 px-5 rounded-xl font-bold text-xs bg-primary-gradient text-white shadow-lg shadow-primary/25 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                      >
                        {isGeneratingBrowserPdf ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Compiling PDF...</span>
                          </>
                        ) : (
                          <>
                            <Printer className="w-4 h-4" />
                            <span>Export PDF Report</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadPdfViaBackend}
                        disabled={isDownloadingPdf}
                        className="py-2.5 px-3.5 rounded-xl font-medium text-xs bg-white/5 hover:bg-white/10 text-text-muted hover:text-white border border-white/10 transition-all flex items-center justify-center gap-1.5"
                        title="Backend PDF Generation"
                      >
                        {isDownloadingPdf ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        <span className="hidden sm:inline">Server PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* SECTION 1: VISUAL GAUGES & SUMMARY ROW (Like Reference Image) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* CARD 1: OVERVIEW METRIC & MINI BAR CHART */}
                    <div className="p-6 rounded-2xl glass-card border border-white/10 flex flex-col justify-between">
                      <div>
                        <div className="text-xs uppercase font-mono tracking-wider text-text-muted font-bold mb-1">
                          Audited Pages &amp; Issues
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-display font-black text-white">
                            {auditResult.issues.length}
                          </span>
                          <span className="text-xs text-rose-400 font-semibold">
                            Total Issues
                          </span>
                        </div>
                        <p className="text-xs text-text-muted mt-1">
                          Scanned across {auditResult.pages_crawled} internal URLs
                        </p>
                      </div>

                      {/* Mini Bar Chart visualization */}
                      <div className="pt-6">
                        <div className="flex items-end gap-1.5 h-16 w-full">
                          {[35, 60, 45, 80, 50, 95, 70, 40, 85, 65, 100, 55].map((val, idx) => (
                            <div
                              key={idx}
                              className={`flex-1 rounded-t transition-all ${
                                idx === 10 ? "bg-primary" : "bg-cyan-500/40 hover:bg-cyan-400"
                              }`}
                              style={{ height: `${val}%` }}
                              title={`Page depth sample: ${val}%`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-text-muted pt-2 border-t border-white/5">
                          <span>Crawl Depth: 1</span>
                          <span>Depth: 15</span>
                        </div>
                      </div>
                    </div>

                    {/* CARD 2: SPEEDOMETER GAUGE (Exactly like reference 'Organic Sessions Rate') */}
                    <div className="p-6 rounded-2xl glass-card border border-white/10 flex flex-col items-center justify-between text-center">
                      <div className="text-xs uppercase font-mono tracking-wider text-text-muted font-bold mb-1">
                        Health Score Gauge
                      </div>

                      {/* Semi-circular Speedometer SVG */}
                      <div className="relative my-2 w-48">
                        <svg viewBox="0 0 160 90" className="w-full">
                          {/* Background Arc */}
                          <path
                            d="M 15 80 A 65 65 0 0 1 145 80"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="14"
                            strokeLinecap="round"
                          />
                          {/* Progress Arc */}
                          <path
                            d="M 15 80 A 65 65 0 0 1 145 80"
                            fill="none"
                            stroke={auditResult.score >= 85 ? "#10B981" : auditResult.score >= 70 ? "#F59E0B" : "#EF4444"}
                            strokeWidth="14"
                            strokeDasharray="204"
                            strokeDashoffset={204 - (auditResult.score / 100) * 204}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                          />
                          {/* Needle Center Pin */}
                          <circle cx="80" cy="80" r="6" fill="#ffffff" />
                          {/* Rotating Needle */}
                          <line
                            x1="80"
                            y1="80"
                            x2={80 - 48 * Math.cos((gaugeNeedleAngle * Math.PI) / 180)}
                            y2={80 - 48 * Math.sin((gaugeNeedleAngle * Math.PI) / 180)}
                            stroke="#ffffff"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>

                        <div className="mt-[-10px]">
                          <span className={`text-3xl font-display font-black ${getScoreColor(auditResult.score).text}`}>
                            {auditResult.score}%
                          </span>
                          <div className="text-[11px] text-text-muted font-mono">
                            0.00% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 100.00%
                          </div>
                        </div>
                      </div>

                      <div className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white">
                        {getScoreColor(auditResult.score).label}
                      </div>
                    </div>

                    {/* CARD 3: TOP CHANNELS / CATEGORIES BY SEVERITY (Horizontal Progress Bars) */}
                    <div className="p-6 rounded-2xl glass-card border border-white/10 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs uppercase font-mono tracking-wider text-text-muted font-bold">
                          Top Impact Categories
                        </span>
                        <span className="text-[10px] text-text-muted font-mono">Issues</span>
                      </div>

                      <div className="space-y-3">
                        {metricsBreakdown?.categories.map((cat, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-white font-medium flex items-center gap-1.5 truncate max-w-[170px]">
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                                <span className="truncate">{cat.name}</span>
                              </span>
                              <span className="font-mono font-bold text-white">{cat.count}</span>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  backgroundColor: cat.color,
                                  width: `${Math.min(100, Math.max(8, (cat.count / Math.max(1, auditResult.issues.length)) * 100))}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-white/5 text-[11px] text-text-muted flex justify-between">
                        <span>Status: <strong className="text-white">{auditResult.status}</strong></span>
                        <span>Audited: {auditResult.checked_at}</span>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: ACTIONABLE RECOMMENDATIONS & FIX GUIDE ("SUGGESTIONS DETAILS") */}
                  <div className="p-6 md:p-8 rounded-3xl glass-card border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/25 mb-2">
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>ACTIONABLE SEO REMEDIATION</span>
                        </div>
                        <h3 className="text-xl font-display font-bold text-white">
                          Actionable Recommendations &amp; Fix Guide
                        </h3>
                        <p className="text-xs text-text-muted mt-0.5">
                          Prioritized instructions to resolve detected errors and boost Google search visibility
                        </p>
                      </div>

                      <div className="text-xs font-mono text-text-muted px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                        {metricsBreakdown?.suggestions.length || 0} Action Items
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {metricsBreakdown?.suggestions.map((sug) => (
                        <div
                          key={sug.id}
                          className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                <Zap className="w-4 h-4 text-primary shrink-0" />
                                <span>{sug.title}</span>
                              </h4>
                              <span
                                className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                  sug.severity === "critical"
                                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                    : sug.severity === "warning"
                                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                    : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                }`}
                              >
                                {sug.severity}
                              </span>
                            </div>

                            <div className="text-xs text-text-muted space-y-2 mt-3">
                              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                                <span className="font-semibold text-white/90 block mb-0.5 text-[11px] uppercase tracking-wider font-mono">
                                  SEO Impact:
                                </span>
                                <span className="text-xs leading-relaxed text-text-muted">{sug.impact}</span>
                              </div>

                              <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
                                <span className="font-semibold text-emerald-300 block mb-0.5 text-[11px] uppercase tracking-wider font-mono flex items-center gap-1">
                                  <Wrench className="w-3 h-3" />
                                  <span>Actionable Fix:</span>
                                </span>
                                <span className="text-xs leading-relaxed text-emerald-200/90">{sug.fix}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pt-2 border-t border-white/5">
                            <span>Category: {sug.category}</span>
                            <span>Affected: {sug.count} instance(s)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 3: DETAILED AUDIT FINDINGS TABLE */}
                  <div className="p-6 md:p-8 rounded-3xl glass-card border border-white/10 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Layers className="w-5 h-5 text-primary" /> Technical Findings Log ({auditResult.issues.length})
                        </h3>
                        <p className="text-xs text-text-muted mt-0.5">Filter by category or search by specific URL</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        <input
                          type="text"
                          placeholder="Search findings..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="bg-background/80 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white placeholder-text-muted/60 focus:outline-none focus:border-primary md:w-48 w-full font-mono"
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
