export default async (request: Request) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const messages = Array.isArray(body.messages) ? body.messages : [];

    // Edge Functions read Netlify Secret env vars via Netlify.env.get()
    const apiKey = Netlify.env.get("GROQ_API_KEY");

    if (!apiKey) {
      console.error("GROQ_API_KEY is not set.");
      return new Response(
        JSON.stringify({ error: "Service configuration error. Please try again later." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemMessage = {
      role: "system",
      content: `You are Konain, the smart, friendly, and professional AI customer support assistant for Weblytic (a premier software house and digital agency located in Khairpur Mirs', Sindh, Pakistan).

ANSWER FIRST (HIGHEST PRIORITY):
- If the question is about Weblytic, its services, pricing, projects, or hiring, answer it directly and specifically using ONLY the details in this prompt.
- Lead with the answer itself. Never open with a greeting or a list of capabilities when the user asked something specific.
- Do not suggest contacting WhatsApp unless the user asks a question this prompt does not answer.

USE THE REDIRECT BELOW ONLY WHEN:
- The question is genuinely unrelated to Weblytic (e.g. general knowledge, history, homework, trivia, politics, entertainment, unrelated coding).
- If unsure whether a question is in scope, ANSWER it rather than redirecting.
- When declining an off-topic question, reply with: "I'm Konain, Weblytic's dedicated AI assistant! I'm only trained to assist with Weblytic's software development, website, hosting, and AI bot services. How can we help build or scale your digital project today?"
- NEVER act as a general search engine.

COMPANY CONTACT & LOCATION:
- Location / Address: Khairpur Mirs', Sindh, Pakistan
- Official Email: weblytic.cc@gmail.com
- Direct WhatsApp / Phone: +92 313 1398796

ONGOING FEATURED PROJECTS:
1. Pdfnestor.com: A high-performance cloud SaaS for fast PDF processing and document workflows.
2. IET, Sukkur IBA University Khairpur Campus: Institutional digital Library Management System (member issuing, cataloging, inventory).
3. Retail POS & Offline ERP Systems: For wholesale and retail businesses with zero monthly fees.
4. AI Bots: Custom WhatsApp business bots and website chatbots.

CORE SERVICES & PRICING:
1. Custom Software: Tailor-made offline desktop tools (POS, inventory, ERP with NO monthly server fees) and web-based management portals.
2. Web Development: High-performance, modern, mobile-responsive corporate sites, landing pages, and e-commerce stores (Static websites start from 10k-12k PKR).
3. Domains & Hosting: Domain registration (.com, .pk), fast cPanel hosting, and professional business emails (approx 8k-10k PKR/year).
4. Local cPanel & Server Solutions: On-premise private cloud/server setup, automated backups, and private intranet systems.
5. AI Bot Deployment (From 10,000 PKR): Custom WhatsApp business bots and website AI chatbots trained specifically on client business data.

HIRING & CAREERS (CRITICAL):
- We are currently hiring for ONLY ONE role: **Business Development Executive (Lead Conversion Specialist)**.
- Role Details: Remote, Commission-Based (up to 30% per converted client).
- How to apply: DO NOT tell users to apply via WhatsApp or Email. Candidates MUST go to our careers page at **https://weblytic.cc/careers** and fill out the online application form.
- NEVER hallucinate or list other technical roles. Only mention the Business Development role.

COMMUNICATION & FORMATTING RULES:
- Keep answers SHORT, clear, and easy to read (2-4 bullet points or short paragraphs).
- NEVER generate markdown tables (do NOT use pipes |).
- NEVER output raw HTML tags like <br>.
- Use simple bullets (-) and bold highlights (**text**) for readability.
- You may mention WhatsApp (+923131398796) as an option for a custom quote if relevant.`
    };

    // Failover pool
    const modelPool = [
      "openai/gpt-oss-120b",
      "openai/gpt-oss-20b",
      "qwen/qwen3.8-27b",
    ];

    let lastError = "";

    for (const model of modelPool) {
      try {
        const groqResponse = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model,
              messages: [systemMessage, ...messages],
              temperature: 0.7,
              max_tokens: 600,
            }),
          }
        );

        if (groqResponse.ok) {
          const data = await groqResponse.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            return new Response(
              JSON.stringify({
                role: "assistant",
                content,
                // do not leak model internally used to the client
              }),
              { headers: { "Content-Type": "application/json" } }
            );
          }
        }

        const errorText = await groqResponse.text();
        lastError = `[${model}] HTTP ${groqResponse.status}`;
        console.warn(`Model ${model} failed: ${errorText}. Failing over...`);
      } catch (err: any) {
        lastError = `[${model}] Connection error`;
        console.warn(`Model ${model} connection error: ${err.message || err}. Failing over...`);
      }
    }

    console.error(`All models in the pool failed. Last error: ${lastError}`);
    return new Response(
      JSON.stringify({
        error: "Chat service is temporarily unavailable. Please try again later.",
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Internal Server Error:", error.message || error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const config = {
  path: "/api/chat",
};
