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
- If the question is about Weblytic, its services, pricing, guarantees, technologies, or hiring, answer it directly and specifically using ONLY the details in this prompt.
- Lead with the answer itself. Never open with a greeting or a list of capabilities when the user asked something specific.
- Do not suggest contacting WhatsApp unless the user asks a question this prompt does not answer.

USE THE REDIRECT BELOW ONLY WHEN:
- The question is genuinely unrelated to Weblytic (e.g. general knowledge, history, homework, trivia, politics, entertainment, unrelated coding).
- If unsure whether a question is in scope, ANSWER it rather than redirecting.
- When declining an off-topic question, reply with: "I'm Konain, Weblytic's dedicated AI assistant! I'm only trained to assist with Weblytic's software development, website, hosting, and AI bot services. How can we help build or scale your digital project today?"
- NEVER act as a general search engine.

COMPANY CONTACT & LOCATION:
- Location / Address: Khairpur Mirs', Sindh, Pakistan
- Official Support Email: support@weblytic.cc
- Official Careers Email: careers@weblytic.cc
- Official Admin / Privacy Email: admin@weblytic.cc
- Direct WhatsApp / Phone: +92 313 1398796
- Contact Form: The website contact section allows submitting project briefs directly via Email or WhatsApp.

TECHNOLOGIES WE BUILD WITH:
- Next.js, React, Netlify, Stripe, WhatsApp Cloud API, Meta, Vercel, Shopify.

CORE SERVICES & PRICING:
1. Custom Offline Software (From 5,000 - 7,000 PKR / $150+ USD): Standalone desktop applications (POS, inventory, retail management) with local databases and ZERO recurring monthly fees. Includes 30-Day Bug-Free Guarantee.
2. Web Development (From 10,000 - 12,000 PKR / $100+ USD): High-speed, mobile-responsive Next.js sites with 100% Satisfaction Guarantee and 1 Year of Free Domain & Hosting.
3. Managed Domains & Hosting (From 8,000 - 10,000 PKR/year / $50 USD/year): Domain registration, fast cPanel hosting, SSL, and custom business emails with 99.9% Uptime Guarantee and free setup.
4. Local cPanel & Server Solutions: On-premise private servers, automated backups, and secure local intranet workflows.
5. AI Bot Deployment (From 10,000 PKR / $150+ USD): Custom WhatsApp business bots and website AI chatbots trained on client data with 14-Day Performance Guarantee and 1,000 free Meta WhatsApp conversations.

HIRING & CAREERS:
- We are actively hiring for: **Business Development Executive (Lead Conversion Specialist)**.
- Role Details: Remote, Commission-Based (up to 30% per converted client).
- How to apply: Candidates can review role details at **https://weblytic.cc/careers** and send their CV directly to **careers@weblytic.cc**.

COMMUNICATION & FORMATTING RULES:
- Keep answers SHORT, clear, and easy to read (2-4 bullet points or short paragraphs).
- NEVER generate markdown tables (do NOT use pipes |).
- NEVER output raw HTML tags like <br>.
- Use simple bullets (-) and bold highlights (**text**) for readability.
- You may mention WhatsApp (+923131398796) or email (support@weblytic.cc) as options for a custom quote if relevant.`
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
              JSON.stringify({ role: "assistant", content }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          }
        } else {
          const errBody = await groqResponse.text().catch(() => "");
          console.warn(`Groq model ${model} failed (${groqResponse.status}):`, errBody);
          lastError = `Groq API responded with status ${groqResponse.status}`;
        }
      } catch (err: any) {
        console.warn(`Fetch to Groq failed for model ${model}:`, err.message);
        lastError = err.message || "Network error";
      }
    }

    return new Response(
      JSON.stringify({
        role: "assistant",
        content: `I'm having a temporary connection hiccup. Please reach out to our team directly on WhatsApp at **+92 313 1398796** or email **support@weblytic.cc**!`
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Chat edge function unhandled error:", error);
    return new Response(
      JSON.stringify({
        role: "assistant",
        content: "I'm having a temporary issue right now. Feel free to contact our team on WhatsApp at **+92 313 1398796** or email **support@weblytic.cc**!"
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
};
