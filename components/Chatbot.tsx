"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";
import Image from "next/image";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const KonainAvatar = ({ size = 28, className = "" }: { size?: number; className?: string }) => (
  <div 
    className={`relative rounded-full overflow-hidden shrink-0 border border-primary/30 shadow-md ${className}`}
    style={{ width: size, height: size }}
  >
    <Image 
      src="/konain-avatar.jpg" 
      alt="Konain - Weblytic AI" 
      fill 
      className="object-cover" 
      sizes={`${size}px`}
      priority
    />
  </div>
);

const FormattedMessage = ({ content }: { content: string }) => {
  const sanitized = content.replace(/<br\s*\/?>/gi, "\n");
  const lines = sanitized.split("\n");

  return (
    <div className="space-y-1.5 whitespace-pre-wrap break-words">
      {lines.map((line, lIdx) => {
        if (!line.trim()) return <div key={lIdx} className="h-1" />;
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={lIdx} className="leading-relaxed">
            {parts.map((part, pIdx) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong key={pIdx} className="font-semibold text-white">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Konain, your Weblytic AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Smart auto-scroll:
  // When Konain sends a new reply, scroll so the TOP (head) of her reply
  // appears at the top of the chat area, so users don't have to scroll up to find the start!
  useEffect(() => {
    if (!isOpen) return;

    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.role === "assistant" && messages.length > 1) {
      const timer = setTimeout(() => {
        if (latestMessageRef.current) {
          latestMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 60);
      return () => clearTimeout(timer);
    } else {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status} Error`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, data]);
    } catch (error: any) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `Sorry, I ran into an issue: ${error.message}. Please reach out to our team on WhatsApp at +923131398796!` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button with Hijabi Avatar (Visible when closed) */}
      <AnimatePresence>
        {!isOpen && (
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 right-4 sm:right-6 md:right-8 z-50 flex items-center"
          >
            {/* Calling-out speech bubble (prompts visitor to chat) */}
            <m.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              onClick={() => setIsOpen(true)}
              className="hidden sm:flex items-center gap-2.5 bg-elevated/95 backdrop-blur-xl border border-primary/30 py-2 px-3.5 rounded-2xl shadow-xl shadow-primary/10 cursor-pointer whitespace-nowrap hover:scale-105 transition-all duration-200 group mr-3"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
              </span>
              <span className="text-xs font-medium text-white/90 group-hover:text-white flex items-center gap-1.5">
                👋 Have questions? <strong className="text-primary font-semibold">Chat with Konain</strong>
              </span>
            </m.div>

            {/* Floating Avatar Button */}
            <m.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsOpen(true)}
              aria-label="Open chat with Konain"
              className="relative w-14 h-14 rounded-full shadow-xl shadow-primary/30 focus:outline-none flex items-center justify-center transition-all p-0.5 bg-gradient-to-tr from-primary via-violet-500 to-cyan-400 animate-[pulse_3s_ease-in-out_infinite]"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-background">
                <Image 
                  src="/konain-avatar.jpg" 
                  alt="Konain Avatar" 
                  fill 
                  className="object-cover" 
                  sizes="56px"
                  priority
                />
              </div>
              {/* Online Green Indicator Dot */}
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-success border-2 border-background ring-2 ring-success/30" />
              
              {/* Floating Mini Sparkle Badge */}
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-white shadow-md">
                <Sparkles size={11} />
              </span>
            </m.button>
          </m.div>
        )}
      </AnimatePresence>

      {/* Chat Window: Anchored between navbar and bottom taskbar */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 sm:top-24 right-3 sm:right-6 md:right-8 bottom-4 sm:bottom-6 w-[calc(100vw-1.5rem)] sm:w-[450px] md:w-[470px] max-h-[calc(100dvh-6.5rem)] bg-elevated/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header with Konain Avatar & Single Clean Close Button */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <KonainAvatar size={36} className="ring-2 ring-primary/40" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-elevated" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Konain <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">AI Assistant</span>
                  </h3>
                  <p className="text-[11px] text-text-muted">Weblytic Support • Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area with Auto-Scroll & Head Alignment */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scroll-smooth min-h-0"
            >
              {messages.map((msg, idx) => {
                const isLatest = idx === messages.length - 1;
                return (
                  <div 
                    key={idx} 
                    ref={isLatest ? latestMessageRef : null}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2.5 scroll-mt-3`}
                  >
                    {msg.role === "assistant" && (
                      <KonainAvatar size={28} className="mt-0.5" />
                    )}
                    
                    <div 
                      className={`px-4 py-2.5 rounded-2xl max-w-[88%] text-sm leading-relaxed ${
                        msg.role === "user" 
                          ? "bg-primary text-white rounded-tr-sm shadow-sm" 
                          : "bg-white/10 text-white/95 rounded-tl-sm border border-white/5"
                      }`}
                    >
                      <FormattedMessage content={msg.content} />
                    </div>
                  </div>
                );
              })}
              
              {isLoading && (
                <div className="flex justify-start gap-2.5">
                  <KonainAvatar size={28} className="mt-0.5" />
                  <div className="px-4 py-3 rounded-2xl bg-white/10 text-white rounded-tl-sm border border-white/5 flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area: Guaranteed visible, never hidden behind taskbar! */}
            <div className="p-3 border-t border-white/10 bg-white/5 shrink-0">
              <form onSubmit={sendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Konain about software, pricing, web..."
                  className="flex-1 bg-background border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/60"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:opacity-90 shadow-md shadow-primary/25 shrink-0"
                  aria-label="Send message"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </form>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
