export interface PackageFeature {
  title: string;
  description: string;
  isFree?: boolean;
}

export interface PackageDetail {
  slug: string;
  name: string;
  badge: string;
  popular?: boolean;
  tagline: string;
  description: string;
  price: string;
  suffix: string;
  turnaround: string;
  freeHighlights: string[];
  deliverables: {
    category: string;
    items: string[];
  }[];
  techStack: {
    name: string;
    role: string;
  }[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  guarantee: string;
  faqs: {
    q: string;
    a: string;
  }[];
}

export const packagesData: Record<string, PackageDetail> = {
  "desktop-software": {
    slug: "desktop-software",
    name: "Custom Desktop Software",
    badge: "Offline & Native Systems",
    popular: false,
    tagline: "High-performance offline software engineered for inventory, billing, POS, and local data operations.",
    description: "Designed for businesses that demand 100% offline reliability, instant local response times, and zero monthly cloud hosting fees. Built with native performance and rock-solid database integrity.",
    price: "$150+",
    suffix: "USD (one-time)",
    turnaround: "5 – 7 Business Days",
    freeHighlights: [
      "FREE 1 Hour Post-Launch Support & Training",
      "ZERO Recurring Server or Cloud License Fees Forever",
      "FREE Local SQLite Database Setup & Schema Design",
      "30-Day Bug-Free Guarantee & Code Warranty",
    ],
    deliverables: [
      {
        category: "Software & Core Architecture",
        items: [
          "Stand-alone native desktop application (.exe installer or portable executable)",
          "Embedded local SQLite or encrypted JSON database storage",
          "Custom-tailored business workflows (inventory, invoicing, barcoding, or order tracking)",
          "Single-user workstation authorization and access control",
        ],
      },
      {
        category: "Data Management & Export",
        items: [
          "One-click CSV & Microsoft Excel data export and import",
          "Automated local database backup routine",
          "Instant search, filtering, and reporting tables",
          "Offline receipt / printable summary generator",
        ],
      },
      {
        category: "Support & Handover",
        items: [
          "Complete source code repository and ownership handover",
          "1 hour live video handover and operational training",
          "30-day comprehensive bug-fix guarantee",
          "Setup instructions and offline troubleshooting documentation",
        ],
      },
    ],
    techStack: [
      { name: "Electron / Python PyQt / C#", role: "Native desktop runtime & responsive UI" },
      { name: "SQLite / Embedded DB", role: "Zero-latency offline data persistence" },
      { name: "Node.js / Python Engine", role: "Local business logic and batch processing" },
      { name: "SheetJS / ExcelJS", role: "High-speed spreadsheet and CSV parsing" },
    ],
    process: [
      { step: "01", title: "Workflow Discovery", description: "We map your inventory fields, billing logic, and UI requirements." },
      { step: "02", title: "Database & UI Build", description: "Engineered with native UI components and schema optimizations." },
      { step: "03", title: "Offline Stress Testing", description: "Tested with 50,000+ local records to ensure zero lag or corruption." },
      { step: "04", title: "Delivery & Setup", description: "Installer delivery, staff handover, and 30-day warranty activation." },
    ],
    guarantee: "30-Day Bug-Free Guarantee: If any bug or workflow defect appears within 30 days of delivery, we fix it at zero cost.",
    faqs: [
      {
        q: "Does this software require any internet connection?",
        a: "No. The software is 100% offline and standalone. Your data never leaves your computer, ensuring absolute privacy and speed.",
      },
      {
        q: "Are there any recurring monthly or annual license fees?",
        a: "None. You pay once for the development, and you own the compiled software with lifetime offline use.",
      },
      {
        q: "Can I run this on multiple computers in my office?",
        a: "The standard tier is optimized for single-workstation use. For multi-computer synchronization over local LAN or cloud, we provide an optional multi-user database upgrade.",
      },
      {
        q: "Can I export data to Excel or Accounting software?",
        a: "Yes! Every build includes 1-click CSV/Excel export formatted for quick import into tools like QuickBooks or Excel.",
      },
    ],
  },

  "starter-landing-page": {
    slug: "starter-landing-page",
    name: "Starter Landing Page",
    badge: "Most Popular • High-Speed Web",
    popular: true,
    tagline: "Sub-second Next.js 14 single-page website with Lifetime Free Netlify cloud hosting.",
    description: "Built for modern businesses, startups, and agencies that require world-class speed, 99+ Google PageSpeed mobile scores, and zero recurring server costs. Deployed on Netlify's global edge network.",
    price: "$100+",
    suffix: "USD (one-time)",
    turnaround: "3 – 5 Business Days",
    freeHighlights: [
      "🔥 LIFETIME FREE Netlify Cloud Hosting ($0/mo Forever)",
      "FREE Custom Domain Registration Included (1st Year)",
      "FREE Let's Encrypt Global Wildcard SSL Certificate",
      "100% Money-Back Satisfaction Guarantee",
    ],
    deliverables: [
      {
        category: "Design & Development",
        items: [
          "1-Page custom Next.js 14 & React application with Tailwind CSS",
          "Conversion-engineered Hero section, Service cards, Social proof & FAQ",
          "Fluid mobile-first responsive layout (smartphones, tablets, and 4K displays)",
          "Interactive micro-animations powered by Framer Motion",
        ],
      },
      {
        category: "Cloud Infrastructure & Hosting",
        items: [
          "Lifetime Free deployment on Netlify Global Edge CDN (300+ edge locations worldwide)",
          "Automated HTTPS SSL encryption and DNS security records",
          "Automated continuous deployment from GitHub",
          "Zero monthly server maintenance fees",
        ],
      },
      {
        category: "SEO & Growth Readiness",
        items: [
          "100/100 Core Web Vitals optimization (LCP, CLS, FID/INP)",
          "Complete OpenGraph & Twitter social preview cards",
          "JSON-LD Schema structured data for Google Rich Snippets",
          "Functional lead capture contact form connected to email/Slack",
        ],
      },
    ],
    techStack: [
      { name: "Next.js 14 (App Router)", role: "Server-side rendering & optimized static output" },
      { name: "Tailwind CSS", role: "High-speed zero-runtime utility styling" },
      { name: "Framer Motion", role: "Silky 60 FPS hardware-accelerated animations" },
      { name: "Netlify Edge Network", role: "Sub-second global edge distribution & instant SSL" },
    ],
    process: [
      { step: "01", title: "Content & Strategy", description: "Review your brand assets, copy, headlines, and call-to-action strategy." },
      { step: "02", title: "Next.js Engineering", description: "We code your pixel-perfect responsive site with zero boilerplate bloat." },
      { step: "03", title: "Performance & SEO Audit", description: "Audit to guarantee 95+ PageSpeed scores and verified mobile responsiveness." },
      { step: "04", title: "Live Netlify Launch", description: "Domain connection, SSL provisioning, and live deployment in under 5 days." },
    ],
    guarantee: "100% Money-Back Guarantee: If your landing page does not achieve a 90+ mobile performance rating or you are unsatisfied with the revisions, receive a full refund.",
    faqs: [
      {
        q: "Why is hosting lifetime free? Are there hidden catches?",
        a: "No catches. We engineer your site using Next.js static asset optimization and deploy on Netlify's high-tier starter tier, which provides 100 GB/month bandwidth and global CDN for $0/mo forever for standard business traffic.",
      },
      {
        q: "Can I expand to multiple pages or a blog in the future?",
        a: "Absolutely. The site is structured on Next.js 14 App Router, allowing seamless addition of blog posts, CMS integrations, and extra service pages whenever you are ready.",
      },
      {
        q: "What do I need to provide to start?",
        a: "Simply your logo, brand colors, text content, and preferred domain name. If you don't have copy ready, we provide prompt guidelines and copywriting assistance.",
      },
      {
        q: "Are revisions included?",
        a: "Yes! A full round of design and copy adjustments is included to ensure every element looks and functions to your standards.",
      },
    ],
  },

  "managed-infrastructure": {
    slug: "managed-infrastructure",
    name: "Managed Infrastructure",
    badge: "Cloud, cPanel & VPS",
    popular: false,
    tagline: "Worry-free domain registration, cloud hosting, and professional business email setup.",
    description: "Complete hands-off infrastructure management for businesses that want their domains, hosting, SSL certificates, and corporate email systems maintained 24/7 with 99.9% uptime reliability.",
    price: "$50",
    suffix: "USD / year",
    turnaround: "24 – 48 Hours",
    freeHighlights: [
      "FREE Custom Domain Registration Included (1st Year)",
      "FREE Full Site & Email Migration from Your Old Host",
      "FREE Let's Encrypt Auto-Renewing SSL Certificate",
      "99.9% Cloud Uptime SLA Guarantee",
    ],
    deliverables: [
      {
        category: "Domain & DNS Architecture",
        items: [
          "Custom top-level domain registration (.com, .cc, .net, or .org)",
          "Enterprise Cloudflare DNS routing with DDoS edge mitigation",
          "Automated domain renewal safeguards and ownership locking",
        ],
      },
      {
        category: "Multi-Platform Cloud Hosting",
        items: [
          "Fast cPanel hosting with SSD storage or configured Cloud VPS setup",
          "Support for PHP, Node.js, Next.js, WordPress, or Static architectures",
          "Automated weekly full-site and database backups",
          "Automated security patch updates and server firewall monitoring",
        ],
      },
      {
        category: "Corporate Business Email",
        items: [
          "Professional custom business email accounts (e.g. hello@yourdomain.com)",
          "Full DKIM, SPF, and DMARC DNS verification for 99%+ email inbox delivery",
          "Webmail portal and simple smartphone IMAP/SMTP setup instructions",
          "Anti-spam filtering and phishing protection",
        ],
      },
    ],
    techStack: [
      { name: "cPanel / Cloud VPS", role: "High-speed SSD hosting and file management" },
      { name: "Cloudflare Anycast DNS", role: "Sub-10ms global DNS resolution & DDoS protection" },
      { name: "Let's Encrypt", role: "Auto-renewing 256-bit TLS/SSL encryption" },
      { name: "Postfix / Dovecot", role: "Secure corporate business email routing" },
    ],
    process: [
      { step: "01", title: "Domain & Host Provisioning", description: "Register domain and provision your server environment." },
      { step: "02", title: "DNS & Email Configuration", description: "Configure SPF/DKIM/DMARC records for spam-free inbox delivery." },
      { step: "03", title: "Zero-Downtime Migration", description: "If migrating from an old host, we transfer files and mailboxes seamlessly." },
      { step: "04", title: "Handover & Active Monitoring", description: "Credentials delivered with 24/7 automated uptime watchdog." },
    ],
    guarantee: "99.9% Cloud Uptime Guarantee: We monitor your website and email availability around the clock with automated alerts.",
    faqs: [
      {
        q: "What hosting types do you support under this plan?",
        a: "We support shared cPanel hosting, Ubuntu Cloud VPS, Next.js/Node.js application hosting, and static CDN deployments. We tailor the configuration to what your application requires.",
      },
      {
        q: "Can you migrate my existing website and email accounts?",
        a: "Yes! Full zero-downtime migration of your website files, databases, and existing email mailboxes is included free of charge.",
      },
      {
        q: "Can I create multiple email addresses (@mycompany.com)?",
        a: "Yes, you can create multiple email accounts (such as info@, sales@, support@) with webmail access and forwarding to your personal email.",
      },
      {
        q: "Who owns the domain name?",
        a: "You do. The domain is registered under your contact details and you maintain 100% legal ownership.",
      },
    ],
  },

  "ai-assistant": {
    slug: "ai-assistant",
    name: "Basic AI Assistant",
    badge: "AI Automation & Chatbots",
    popular: false,
    tagline: "Custom-trained AI chatbot for your website and WhatsApp to handle client inquiries 24/7.",
    description: "Trained on your business documentation, service menus, pricing, and FAQs to answer customer questions in seconds, capture qualified leads, and smoothly transfer complex chats to your human team.",
    price: "$150+",
    suffix: "USD (one-time)",
    turnaround: "4 – 6 Business Days",
    freeHighlights: [
      "FREE Multi-Platform Setup (Web Chat Widget & WhatsApp Connection)",
      "FREE Document Ingestion & Custom Prompt Engineering",
      "FREE Human Handoff Routing Configuration",
      "14-Day Performance & Accuracy Guarantee",
    ],
    deliverables: [
      {
        category: "Chatbot Training & Model Logic",
        items: [
          "Custom AI model tuned on up to 10 pages of your business FAQs and manuals",
          "Strict RAG guardrails to prevent hallucinations and false claims",
          "Personalized brand persona, tone, and multi-language response capability",
          "Lead capture workflow (collects user email, phone, and inquiry details)",
        ],
      },
      {
        category: "Multi-Channel Deployment",
        items: [
          "Interactive embeddable website chat widget matching your brand colors",
          "Official WhatsApp Business Cloud API integration or webhook setup",
          "Mobile-friendly, responsive chat window with instant typing indicators",
        ],
      },
      {
        category: "Human Operator Handoff",
        items: [
          "Automatic routing to WhatsApp or email when a customer requests a real human",
          "Complete conversation transcript logging",
          "Admin management dashboard to update FAQs and responses",
        ],
      },
    ],
    techStack: [
      { name: "OpenAI GPT-4o / Claude 3.5", role: "State-of-the-art language comprehension & reasoning" },
      { name: "Vector Database (RAG)", role: "Hallucination-free document knowledge retrieval" },
      { name: "WhatsApp Cloud API", role: "Direct customer communication channel" },
      { name: "Next.js / Tailwind Widget", role: "Lightweight, non-blocking website embed" },
    ],
    process: [
      { step: "01", title: "Knowledge Ingestion", description: "Gather your FAQs, pricing sheets, and policies for AI training." },
      { step: "02", title: "Prompt & Guardrail Engineering", description: "Program the assistant's persona, boundaries, and lead capture questions." },
      { step: "03", title: "Integration & Testing", description: "Embed on your website and connect WhatsApp webhooks with QA simulations." },
      { step: "04", title: "Live Launch & Handover", description: "Activate live, train your staff on human handoff, and monitor first conversations." },
    ],
    guarantee: "14-Day Performance Guarantee: We continuously refine the chatbot's prompts during the first 14 days to ensure 95%+ accurate answers to your common questions.",
    faqs: [
      {
        q: "Will the AI make things up (hallucinate)?",
        a: "No. We implement Retrieval-Augmented Generation (RAG) with strict system instructions that command the AI to only answer from your verified documents. If asked something outside its knowledge base, it politely offers to connect with your human team.",
      },
      {
        q: "Can it work on both my website and WhatsApp?",
        a: "Yes! The assistant can be deployed as an interactive popup widget on your website, connected to your official WhatsApp Business number, or both.",
      },
      {
        q: "What happens when a customer needs human assistance?",
        a: "The assistant detects when a query requires human intervention and automatically forwards the user's inquiry, contact info, and chat transcript to your team via email or WhatsApp.",
      },
      {
        q: "Can I update the information it knows in the future?",
        a: "Yes. You can easily add new FAQ documents or update your pricing sheets at any time.",
      },
    ],
  },
};
