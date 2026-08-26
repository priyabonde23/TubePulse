'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, Check, ShieldCheck, Sparkles, Youtube } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [youtubeApiKey, setYoutubeApiKey] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedYt = localStorage.getItem('tubepulse_yt_key') || '';
      const storedGemini = localStorage.getItem('tubepulse_gemini_key') || '';
      setYoutubeApiKey(storedYt);
      setGeminiApiKey(storedGemini);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tubepulse_yt_key', youtubeApiKey.trim());
      localStorage.setItem('tubepulse_gemini_key', geminiApiKey.trim());
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-dark-surface border border-dark-border rounded-2xl p-6 shadow-2xl space-y-5 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-dark-muted hover:text-white rounded-lg hover:bg-dark-card transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">API Configuration & Settings</h3>
            <p className="text-xs text-dark-muted">Optional API keys for live YouTube fetching & LLM models</p>
          </div>
        </div>

        {/* Note */}
        <div className="p-3 bg-brand-500/10 border border-brand-500/20 rounded-xl flex items-start gap-2.5 text-xs text-brand-200">
          <ShieldCheck className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
          <span>
            API keys are optional. TubePulse includes high-fidelity live simulations & pre-loaded datasets out-of-the-box. Your keys remain stored locally in your browser.
          </span>
        </div>

        {/* YouTube API Key Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
            <Youtube className="w-3.5 h-3.5 text-red-400" />
            YouTube Data API v3 Key
          </label>
          <input
            type="password"
            value={youtubeApiKey}
            onChange={(e) => setYoutubeApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-dark-card border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white placeholder-dark-muted focus:outline-none focus:border-brand-500 font-mono"
          />
        </div>

        {/* Gemini API Key Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            Google Gemini API Key (Optional LLM booster)
          </label>
          <input
            type="password"
            value={geminiApiKey}
            onChange={(e) => setGeminiApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-dark-card border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white placeholder-dark-muted focus:outline-none focus:border-brand-500 font-mono"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-dark-border/60">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-dark-muted hover:text-white transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-md transition-all"
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Configuration</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
