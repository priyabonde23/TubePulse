'use client';

import React from 'react';
import { SentimentBreakdown } from '@/types';
import { Smile, Meh, Frown, TrendingUp, Award, ShieldAlert, AlertTriangle } from 'lucide-react';

interface SentimentGaugeProps {
  sentiment: SentimentBreakdown;
}

export const SentimentGauge: React.FC<SentimentGaugeProps> = ({ sentiment }) => {
  const { overallScore, positive, neutral, negative, verdict } = sentiment;

  // Determine colors based on score
  const getTheme = () => {
    if (overallScore >= 70) {
      return {
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        glow: 'from-emerald-500/20 to-teal-500/0',
        ring: '#10b981',
        icon: TrendingUp,
      };
    }
    if (overallScore >= 50) {
      return {
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        glow: 'from-amber-500/20 to-orange-500/0',
        ring: '#f59e0b',
        icon: AlertTriangle,
      };
    }
    return {
      text: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      glow: 'from-rose-500/20 to-red-500/0',
      ring: '#f43f5e',
      icon: ShieldAlert,
    };
  };

  const theme = getTheme();
  const Icon = theme.icon;

  // SVG Gauge calculations (Semi-circle meter)
  const radius = 70;
  const circumference = Math.PI * radius; // 180 degrees arc
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="w-full bg-dark-surface border border-dark-border rounded-2xl p-5 shadow-xl relative flex flex-col justify-between overflow-hidden">
      {/* Background Accent */}
      <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${theme.glow} blur-3xl pointer-events-none`} />

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-dark-muted flex items-center gap-1.5">
            <Award className="w-4 h-4 text-brand-400" />
            Overall Sentiment Index
          </span>
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${theme.bg} ${theme.text} ${theme.border}`}>
            <Icon className="w-3 h-3" />
            {verdict}
          </span>
        </div>

        {/* Speedometer Meter */}
        <div className="flex flex-col items-center justify-center my-3 relative">
          <svg className="w-48 h-28" viewBox="0 0 160 90">
            {/* Background Arc */}
            <path
              d="M 15 80 A 65 65 0 0 1 145 80"
              fill="none"
              stroke="#2A364F"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Foreground Progress Arc */}
            <path
              d="M 15 80 A 65 65 0 0 1 145 80"
              fill="none"
              stroke={theme.ring}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={Math.PI * 65}
              strokeDashoffset={Math.PI * 65 - (overallScore / 100) * (Math.PI * 65)}
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Score */}
          <div className="absolute bottom-0 flex flex-col items-center">
            <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme.text}`}>
              {overallScore}
              <span className="text-sm font-semibold text-dark-muted">/100</span>
            </span>
            <span className="text-[10px] text-dark-muted uppercase tracking-wider font-semibold -mt-1">
              Net Score
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bars for Breakdown */}
      <div className="mt-4 space-y-2.5 pt-3 border-t border-dark-border/60">
        {/* Positive */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Smile className="w-3.5 h-3.5" /> Positive
            </span>
            <span className="text-white font-bold">{positive}%</span>
          </div>
          <div className="w-full h-2 bg-dark-card rounded-full overflow-hidden border border-dark-border/40">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${positive}%` }}
            />
          </div>
        </div>

        {/* Neutral */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Meh className="w-3.5 h-3.5" /> Neutral / Mixed
            </span>
            <span className="text-white font-bold">{neutral}%</span>
          </div>
          <div className="w-full h-2 bg-dark-card rounded-full overflow-hidden border border-dark-border/40">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-700"
              style={{ width: `${neutral}%` }}
            />
          </div>
        </div>

        {/* Negative */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-rose-400 font-medium">
              <Frown className="w-3.5 h-3.5" /> Negative / Critical
            </span>
            <span className="text-white font-bold">{negative}%</span>
          </div>
          <div className="w-full h-2 bg-dark-card rounded-full overflow-hidden border border-dark-border/40">
            <div
              className="h-full bg-rose-500 rounded-full transition-all duration-700"
              style={{ width: `${negative}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
