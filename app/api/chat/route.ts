import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not set in environment variables." },
        { status: 500 }
      );
    }

    // Prepend a system message to guide the chatbot's behavior
    const systemMessage = {
      role: 'system',
      content: `You are Konain, the official AI assistant for Weblytic (weblytic.cc). 
      Weblytic is a digital agency that builds custom offline software, static websites, handles domain/cPanel hosting, and offers AI Bot Deployment for WhatsApp and Websites. 
      Tone: Professional, helpful, concise, and modern. 
      Pricing context: Offline software (5k-7k PKR), Static sites (10k-12k PKR), Hosting setups (8k-10k PKR), WhatsApp/Website AI Bot Deployment (starts at 10k PKR). 
      If users want a quote or complex request, encourage them to use the Contact form to WhatsApp us.`
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // Fast and capable model on Groq
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API Error:", errorText);
      return NextResponse.json({ error: `Groq API Error: ${response.status} - ${errorText}` }, { status: 500 });
    }

    const data = await response.json();
    
    return NextResponse.json({
      role: "assistant",
      content: data.choices[0].message.content,
    });
    
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message || error}` },
      { status: 500 }
    );
  }
}
