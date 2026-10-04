export type FAQItem = {
  question: string;
  answer: string;
  category: "pos" | "whatsapp" | "cpanel" | "web" | "hosting";
};

export const allFaqs: FAQItem[] = [
  // Cluster 1: Offline POS & Desktop Software
  {
    category: "pos",
    question: "Can I run a POS system without an active internet connection?",
    answer: "Yes, 100%. Weblytic builds standalone offline desktop POS and inventory applications powered by local databases. Your barcode scanning, billing, thermal receipt printing, and stock tracking continue running seamlessly even during total internet or broadband outages."
  },
  {
    category: "pos",
    question: "Is there a retail POS software with a one-time fee and no monthly subscription?",
    answer: "Yes. Unlike overseas SaaS tools charging $50 to $100 every month in foreign currency, Weblytic provides custom offline desktop software for a transparent one-time setup fee (starting from Rs 5,000–7,000 for standard retail setups) with zero monthly fees."
  },
  {
    category: "pos",
    question: "What happens to my sales data if my store computer crashes?",
    answer: "Our software includes automated local and external backup routines. At closing time or on schedule, the system creates encrypted backup copies to an external USB flash drive or secondary hard disk, allowing complete restoration in minutes."
  },
  {
    category: "pos",
    question: "Cloud POS vs. Offline Desktop POS: Which is better for small retailers in Pakistan?",
    answer: "For most Pakistani retail shops, pharmacies, and marts, offline desktop software is far more reliable: it eliminates internet downtime delays, avoids recurring dollar subscription fees, keeps confidential financial records on-premise, and prints receipts instantly."
  },
  {
    category: "pos",
    question: "Can offline POS software generate sales tax receipts and barcode labels?",
    answer: "Yes. We format receipts for standard 58mm and 80mm thermal printers with custom tax breakdowns, logos, and QR codes, alongside automated barcode label generation for thermal sticker printers."
  },

  // Cluster 2: WhatsApp AI Chatbots & Customer Support
  {
    category: "whatsapp",
    question: "How much does a WhatsApp chatbot really cost for a small business?",
    answer: "Costs comprise two transparent parts: (1) Meta's official conversation usage (Meta provides 1,000 free service conversations every month) and (2) Weblytic's one-time development & AI configuration starting from Rs 10,000. There are zero hidden server markups."
  },
  {
    category: "whatsapp",
    question: "Can an AI chatbot reply to customer WhatsApp messages using my own price list and catalog?",
    answer: "Yes. We train custom AI bots (using high-speed LLM architectures) directly on your product lists, PDF brochures, pricing tiers, and store policies so the bot answers customer questions accurately 24/7."
  },
  {
    category: "whatsapp",
    question: "Will my WhatsApp business number get banned for using an automated bot?",
    answer: "No. Weblytic integrates exclusively through Meta's official Cloud API (WhatsApp Business Platform). Account bans only happen when businesses use risky unofficial Chrome extensions or scraper bots that violate Meta's terms."
  },
  {
    category: "whatsapp",
    question: "How do I automate customer booking or order confirmation on WhatsApp?",
    answer: "Our bot collects customer requirements (name, item, delivery address, phone) conversationally, confirms the order, and automatically dispatches immediate WhatsApp confirmation receipts while alerting your sales team."
  },
  {
    category: "whatsapp",
    question: "Website live chat vs. WhatsApp widget: Which converts more customers?",
    answer: "In Pakistan, WhatsApp conversion is up to 3x higher than standard web chat because the thread stays permanently saved on the customer's phone, allowing direct follow-ups and repeat sales even after they leave your site."
  },

  // Cluster 3: Local cPanel & On-Premise Solutions
  {
    category: "cpanel",
    question: "Can I install and run cPanel/WHM on a local office server without internet?",
    answer: "Yes. We set up private on-premise Linux servers with optimized hosting control environments accessible across your local office Wi-Fi and LAN, allowing complete staff access even when broadband internet is down."
  },
  {
    category: "cpanel",
    question: "Why should an educational institute or hospital keep an on-premise server instead of cloud hosting?",
    answer: "On-premise servers give you complete data sovereignty, gigabit local transfer speeds for heavy files, and permanent protection against dollar-denominated recurring monthly cloud bills from foreign providers."
  },
  {
    category: "cpanel",
    question: "How do I set up automated daily database backups across multiple local computers?",
    answer: "We configure automated network storage (NAS) and cron routines that dump your databases nightly and mirror them across designated local machines and secure external drives without manual effort."
  },
  {
    category: "cpanel",
    question: "What is the difference between a local intranet web app and a public website?",
    answer: "A public website is open to the entire internet. An intranet web app is private to your building or campus, making it immune to external internet slowdowns and completely isolated from outside cyber threats."
  },

  // Cluster 4: Web Development & Free Hosting (Static vs. WordPress)
  {
    category: "web",
    question: "How much does a professional business website cost in Pakistan in 2026?",
    answer: "A high-performance modern business website typically starts from Rs 10,000–12,000 for standard static showcases. Larger custom web apps, e-commerce stores, and dynamic portals range from Rs 30,000 to Rs 80,000+ depending on database complexity."
  },
  {
    category: "web",
    question: "Why are Next.js / static websites faster and safer than WordPress?",
    answer: "Static and Next.js sites compile into pre-rendered edge code with no exposed SQL database for hackers to attack, no broken plugin updates, and instant sub-second loading speeds worldwide."
  },
  {
    category: "web",
    question: "How can a business host a website for free without monthly server fees?",
    answer: "By deploying high-performance static websites through modern global edge networks (like Netlify or Cloudflare Pages), businesses enjoy enterprise-grade speed, free SSL certificates, and zero monthly server hosting bills."
  },
  {
    category: "web",
    question: "How long does it realistically take to design and launch a custom business website?",
    answer: "A standard corporate website is usually ready and live within 5 to 10 working days. Custom web apps and e-commerce platforms take 2 to 4 weeks depending on integrations."
  },
  {
    category: "web",
    question: "What is included in a website development package?",
    answer: "Every Weblytic website package includes custom responsive UI design, mobile optimization, search engine optimization (SEO) setup, high-speed hosting setup, free SSL certificate, contact forms connected to WhatsApp, and professional business email setup."
  },

  // Cluster 5: Hosting, Domains & Email Migrations
  {
    category: "hosting",
    question: "How do I transfer my domain and website from GoDaddy/Hostinger without downtime?",
    answer: "We perform seamless migrations by staging your files, databases, and emails on our servers first, testing everything thoroughly, and switching DNS records only when fully verified to guarantee zero downtime."
  },
  {
    category: "hosting",
    question: "Why are my business emails going to spam (and how to fix SPF, DKIM, and DMARC)?",
    answer: "Major providers (Gmail, Outlook) now reject unauthenticated business emails. We configure and cryptographically sign your SPF records, 2048-bit DKIM keys, and DMARC policies so your emails land directly in the inbox."
  },
  {
    category: "hosting",
    question: "What is the difference between shared hosting, VPS, and cloud hosting for a new business?",
    answer: "Shared hosting shares one server with hundreds of other sites (fine for hobby sites, but slow). A VPS grants dedicated CPU and RAM resources. Modern cloud/edge hosting distributes your site across global edge nodes for maximum uptime and instant speed."
  },
  {
    category: "hosting",
    question: "Can I connect a professional email (info@mycompany.com) without paying Google Workspace $6/month per user?",
    answer: "Yes. We configure custom business email servers that host your company addresses (e.g. info@yourcompany.com) directly on your hosting package with webmail and IMAP/SMTP access on your mobile phone, saving thousands in monthly per-user fees."
  }
];
