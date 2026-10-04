export default async (request: Request) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { messages } = await request.json();

    // Edge Functions read Netlify Secret env vars via Netlify.env.get()
    const apiKey = Netlify.env.get("GROQ_API_KEY");

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GROQ_API_KEY is not set in environment variables." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemMessage = {
      role: "system",
      content:
        "You are Konain, the helpful AI assistant for Weblytic. You help users understand Weblytic's services including Custom Software (offline POS/ERP tools, desktop and web apps), Web Development, Domains & Hosting, Local cPanel Solutions, and AI Bot Deployment (WhatsApp business bots & website chatbots starting from 10k PKR). You are friendly, professional, concise, and encourage users to contact the team via WhatsApp (+923000219721)."
    };

    // Failover pool: If a model hits rate limits (429), maintenance, or errors out,
    // the system automatically falls over to the next available model in real time!
    const modelPool = [
      "openai/gpt-oss-120b", // Flagship 120B model - top tier responses (~500 t/s)
      "openai/gpt-oss-20b",  // Ultra-fast 20B model (~1,000 t/s) - instant backup
      "qwen/qwen3.8-27b",    // Strong 27B model - reliable third tier backup
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
              max_tokens: 500,
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
                modelUsed: model,
              }),
              { headers: { "Content-Type": "application/json" } }
            );
          }
        }

        const errorText = await groqResponse.text();
        lastError = `[${model}] HTTP ${groqResponse.status}: ${errorText}`;
        console.warn(`Model ${model} failed: ${lastError}. Failing over to next model...`);
      } catch (err: any) {
        lastError = `[${model}] Connection error: ${err.message || err}`;
        console.warn(`Model ${model} connection error. Failing over to next model...`);
      }
    }

    return new Response(
      JSON.stringify({
        error: `All models in the pool are temporarily unavailable. Last error: ${lastError}`,
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: `Internal Server Error: ${error.message || error}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const config = {
  path: "/api/chat",
};
