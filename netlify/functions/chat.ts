export default async (req: Request, context: any) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { messages } = await req.json();
    
    // Attempt standard process.env, fallback to Netlify specific env API
    const apiKey = process.env.GROQ_API_KEY || (globalThis as any).Netlify?.env?.get('GROQ_API_KEY');

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GROQ_API_KEY is not set in environment variables." }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const systemMessage = {
      role: "system",
      content: "You are Konain, the helpful AI assistant for Weblytic. You help users understand Weblytic's services including Custom Software, Web Development, Domains & Hosting, Local cPanel Solutions, and AI Bot Deployment. AI Bot Deployment includes WhatsApp business bots and Website AI chatbots starting from 10k PKR. You are friendly, professional, and concise. You encourage users to contact the team via WhatsApp."
    };

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      return new Response(JSON.stringify({ error: `Groq API Error: ${groqResponse.status} - ${errorText}` }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const data = await groqResponse.json();
    
    return new Response(JSON.stringify({
      role: "assistant",
      content: data.choices[0].message.content,
    }), {
      headers: { "Content-Type": "application/json" }
    });
    
  } catch (error: any) {
    return new Response(JSON.stringify({ error: `Internal Server Error: ${error.message || error}` }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
