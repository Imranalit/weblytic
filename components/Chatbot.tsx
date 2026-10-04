"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Settings } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const KonainAvatar = ({ size = 18 }: { size?: number }) => (
  <div className="relative flex items-center justify-center">
    <Settings size={size} className="animate-[spin_4s_linear_infinite] text-primary" />
    <m.span 
      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="absolute"
      style={{ fontSize: size * 0.55 }}
    >
      👋
    </m.span>
  </div>
);

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Konain, the Weblytic AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

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
        content: `Error: ${error.message}. Please check your API key and Netlify logs.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-28 right-6 md:right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-0 w-[350px] sm:w-[400px] h-[500px] bg-elevated/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <KonainAvatar size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Konain</h3>
                  <p className="text-[10px] text-success">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <KonainAvatar size={12} />
                    </div>
                  )}
                  
                  <div 
                    className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-primary text-white rounded-tr-sm" 
                        : "bg-white/10 text-white rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <KonainAvatar size={12} />
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-white/10 text-white rounded-tl-sm flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-white/5">
              <form onSubmit={sendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Konain..."
                  className="flex-1 bg-background border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <Send size={16} className="ml-1" />
                </button>
              </form>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <m.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary-gradient shadow-lg shadow-primary/30 flex items-center justify-center text-white focus:outline-none relative"
      >
        {isOpen ? <X size={24} /> : (
          <>
            <Settings size={26} className="absolute opacity-20 animate-[spin_4s_linear_infinite]" />
            <MessageSquare size={24} className="z-10 relative" />
          </>
        )}
      </m.button>
    </div>
  );
}
