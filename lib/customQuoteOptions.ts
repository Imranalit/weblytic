export const primaryIntentOptions = [
  { value: "website", label: "A website / landing page" },
  { value: "web-app", label: "A web application (SaaS, dashboard, portal)" },
  { value: "desktop", label: "Desktop / offline software" },
  { value: "ai-assistant", label: "An AI assistant / chatbot" },
  { value: "infrastructure", label: "Hosting & infrastructure only" },
  { value: "mix", label: "A mix of the above (specify below)" },
] as const;

export const addonOptions = [
  { value: "auth", label: "User accounts / authentication", band: [150, 400] },
  { value: "payments", label: "Payments / subscriptions", band: [200, 500] },
  { value: "admin", label: "Admin dashboard", band: [250, 600] },
  { value: "database", label: "Database / data import", band: [100, 300] },
  { value: "api", label: "Third-party API integration", band: [150, 350] },
  { value: "cms", label: "CMS / blog", band: [100, 250] },
  { value: "i18n", label: "Multi-language", band: [100, 250] },
  { value: "mobile", label: "Mobile app companion", band: [400, 900] },
] as const;

export const timelineOptions = [
  { value: "asap", label: "ASAP (1–2 weeks)" },
  { value: "2-4w", label: "2–4 weeks" },
  { value: "1-2m", label: "1–2 months" },
  { value: "flexible", label: "Flexible" },
] as const;

export const budgetOptions = [
  { value: "under-500", label: "Under $500" },
  { value: "500-1500", label: "$500 – $1,500" },
  { value: "1500-5000", label: "$1,500 – $5,000" },
  { value: "5000-plus", label: "$5,000+" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

// Package checkbox values map 1:1 to PackageDetail.slug from pricingData.ts.
// The page derives prices from packagesData so there is no duplication.
export const packageCheckboxSlugs = [
  "desktop-software",
  "starter-landing-page",
  "managed-infrastructure",
  "ai-assistant",
] as const;
