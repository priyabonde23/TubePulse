'use client';

import React from 'react';
import { X, Sparkles, Brain, Activity, MessageSquare, Target } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl bg-dark-surface border border-dark-border rounded-2xl p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-dark-muted hover:text-white rounded-lg hover:bg-dark-card transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">How TubePulse AI Works</h3>
            <p className="text-xs text-dark-muted">Behind the scenes of our sentiment intelligence engine</p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs text-gray-300">
          <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border/80 flex items-start gap-3">
            <Brain className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white mb-1">1. Context-Aware NLP Engine</h4>
              <p className="text-dark-muted leading-relaxed">
                Evaluates sentiment by analyzing internet slang, emojis (🔥, 💀, 🤮), negation rules (&quot;not bad&quot; vs &quot;not good&quot;), intensifiers (&quot;insanely good&quot;), and all-caps emphasis.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border/80 flex items-start gap-3">
            <Activity className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white mb-1">2. 6-Axis Emotion Vector</h4>
              <p className="text-dark-muted leading-relaxed">
                Classifies audience response into 6 dimensions: Joy 😂, Hype 🔥, Confusion 🤔, Criticism 😡, Suggestions 💡, and Neutrality ⚖️.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border/80 flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white mb-1">3. Topic & Aspect Extraction</h4>
              <p className="text-dark-muted leading-relaxed">
                Discovers dominant discussion keywords, timestamps, and entities with their corresponding net positive or negative sentiment.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border/80 flex items-start gap-3">
            <Target className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white mb-1">4. Executive Summary & Next Steps</h4>
              <p className="text-dark-muted leading-relaxed">
                Synthesizes praise vs criticisms into clear bullet points with direct recommendations for video creators, marketers, or product teams.
              </p>
            </div>
          </div>
        </div>

        <div className="text-right pt-2 border-t border-dark-border/60">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl text-xs transition-all"
          >
            Got it, Let&apos;s Analyze!
          </button>
        </div>
      </div>
    </div>
  );
};
