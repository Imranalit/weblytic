export default async (request: Request) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { messages } = await request.json();

    // Edge Functions can read Netlify Secret env vars via Netlify.env.get()
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
        "You are Konain, the helpful AI assistant for Weblytic. You help users understand Weblytic's services including Custom Software, Web Development, Domains & Hosting, Local cPanel Solutions, and AI Bot Deployment. AI Bot Deployment includes WhatsApp business bots and Website AI chatbots starting from 10k PKR. You are friendly, professional, and concise. You encourage users to contact the team via WhatsApp.",
    };

    // Auto-select: fetch available models and pick the first chat-capable one
    const modelsRes = await fetch("https://api.groq.com/openai/v1/models", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    let model = "llama-3.3-70b-versatile"; // safe fallback
    if (modelsRes.ok) {
      const modelsData = await modelsRes.json();
      const chatModel = modelsData.data?.find(
        (m: any) =>
          m.active !== false &&
          !m.id.includes("whisper") &&
          !m.id.includes("guard") &&
          !m.id.includes("tts") &&
          !m.id.includes("vision") &&
          !m.id.includes("embed")
      );
      if (chatModel) model = chatModel.id;
    }

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

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      return new Response(
        JSON.stringify({ error: `Groq API Error: ${groqResponse.status} - ${errorText}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await groqResponse.json();

    return new Response(
      JSON.stringify({
        role: "assistant",
        content: data.choices[0].message.content,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: `Internal Server Error: ${error.message || error}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const config: Config = {
  path: "/api/chat",
};
