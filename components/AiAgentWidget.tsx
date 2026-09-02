'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, X, Send, Copy, Check, MessageSquare, Zap, Lightbulb, TrendingUp, Layers, FileText, ChevronDown } from 'lucide-react';
import { generateAgentResponse, ChatMessage } from '@/lib/aiAgentEngine';
import { VideoAnalysisResult, CustomAnalysisResult } from '@/types';

interface AiAgentWidgetProps {
  analysisData: VideoAnalysisResult | CustomAnalysisResult | null;
}

export const AiAgentWidget: React.FC<AiAgentWidgetProps> = ({ analysisData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'agent',
      text: "👋 Hi! I'm **PulseAgent**, your real-time AI Video & Audience Copilot. Ask me anything about audience reception, viral strategies, script outlines, or pacing fixes for this video!",
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const reply = generateAgentResponse(query, analysisData);
      const agentMsg: ChatMessage = {
        id: `agent_${Date.now()}`,
        sender: 'agent',
        text: reply,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = [
    { label: '💡 Fix Pacing & Retention', query: 'Why did viewers complain about pacing and how do I fix retention?' },
    { label: '🚀 3 Viral Next Video Ideas', query: 'Suggest 3 viral content ideas based on this audience reaction' },
    { label: '📝 Optimized Script Blueprint', query: 'Generate an optimized 3-part script outline to maximize watch-time' },
    { label: '💼 Executive Brand Pitch', query: 'Draft an executive sponsorship brand pitch from these sentiment numbers' }
  ];

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-indigo-500 text-white rounded-2xl shadow-2xl shadow-brand-500/40 border border-brand-400/40 transition-all hover:scale-105 active:scale-95"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-black tracking-wide block leading-tight">PulseAgent</span>
            <span className="text-[10px] text-brand-200 font-medium flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" /> AI Video Copilot
            </span>
          </div>
        </button>
      </div>

      {/* Slide-Over Glassmorphism AI Chat Drawer */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-dark-surface/95 border-l border-dark-border/80 shadow-2xl backdrop-blur-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 print:hidden">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-dark-border/70 bg-gradient-to-r from-dark-card via-dark-card to-brand-950/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-500/25">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white">PulseAgent AI Copilot</h3>
                  <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold">
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-dark-muted">Real-time Video & Audience Strategy Assistant</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-dark-muted hover:text-white rounded-xl hover:bg-dark-card transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => {
              const isAgent = msg.sender === 'agent';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isAgent ? 'items-start' : 'items-end justify-end'}`}
                >
                  {isAgent && (
                    <div className="w-7 h-7 rounded-xl bg-brand-600/30 border border-brand-500/40 flex items-center justify-center text-brand-400 flex-shrink-0 mt-0.5 shadow">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed relative group ${
                      isAgent
                        ? 'bg-dark-card/90 border border-dark-border/80 text-gray-200 shadow-md'
                        : 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-brand-500/20 shadow-md'
                    }`}
                  >
                    <div className="whitespace-pre-line break-words text-xs">
                      {msg.text}
                    </div>

                    {isAgent && (
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded-md bg-dark-base/80 hover:bg-dark-base text-dark-muted hover:text-white border border-dark-border transition-all text-[10px] flex items-center gap-1"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-dark-muted text-xs p-2">
                <div className="w-6 h-6 rounded-lg bg-brand-600/20 flex items-center justify-center text-brand-400">
                  <Bot className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <span className="italic">PulseAgent is analyzing audience vectors...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Prompt Chips */}
          <div className="px-4 py-2 border-t border-dark-border/60 bg-dark-card/40 space-y-1.5">
            <span className="text-[10px] text-dark-muted font-bold uppercase tracking-wider block">
              ⚡ Quick Copilot Prompts:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.query)}
                  disabled={isTyping}
                  className="px-2.5 py-1 rounded-lg bg-dark-card hover:bg-brand-600/30 text-gray-300 hover:text-brand-300 border border-dark-border/80 text-[10px] font-medium transition-all text-left truncate max-w-full"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-4 border-t border-dark-border/70 bg-dark-surface flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask PulseAgent anything about this video..."
              className="flex-1 bg-dark-card border border-dark-border focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-dark-muted focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="p-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white rounded-xl shadow-md disabled:opacity-50 transition-all flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
