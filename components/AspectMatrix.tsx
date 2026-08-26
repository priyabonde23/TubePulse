'use client';

import React from 'react';
import { AspectBreakdownItem } from '@/types';
import { Layers, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';

interface AspectMatrixProps {
  aspects: AspectBreakdownItem[];
}

export const AspectMatrix: React.FC<AspectMatrixProps> = ({ aspects }) => {
  if (!aspects || aspects.length === 0) return null;

  return (
    <div className="w-full bg-dark-surface border border-dark-border rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-400" />
          <h3 className="text-sm font-bold text-white">Aspect-Based Sentiment Matrix (ABSA)</h3>
        </div>
        <span className="text-xs text-dark-muted font-medium">Dimension-by-Dimension Breakdown</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aspects.map((item, idx) => {
          const getStatusBadge = () => {
            if (item.status === 'Praise') {
              return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
            }
            if (item.status === 'Friction') {
              return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
            }
            return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
          };

          return (
            <div
              key={idx}
              className="bg-dark-card/80 border border-dark-border/80 hover:border-dark-border rounded-xl p-4 flex flex-col justify-between space-y-3 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{item.icon}</span>
                    <h4 className="text-xs font-bold text-white truncate max-w-[140px]">{item.aspect}</h4>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getStatusBadge()}`}>
                    {item.status} ({item.overallScore}%)
                  </span>
                </div>

                {/* Mini Multi-Bar */}
                <div className="w-full h-2 bg-dark-base rounded-full overflow-hidden flex my-2 border border-dark-border/40">
                  <div style={{ width: `${item.positiveRatio}%` }} className="bg-emerald-500 h-full" title={`Positive: ${item.positiveRatio}%`} />
                  <div style={{ width: `${item.neutralRatio}%` }} className="bg-amber-500 h-full" title={`Neutral: ${item.neutralRatio}%`} />
                  <div style={{ width: `${item.negativeRatio}%` }} className="bg-rose-500 h-full" title={`Negative: ${item.negativeRatio}%`} />
                </div>

                <div className="flex justify-between text-[10px] text-dark-muted font-medium mb-2">
                  <span className="text-emerald-400">+{item.positiveRatio}% Pos</span>
                  <span className="text-rose-400">-{item.negativeRatio}% Neg</span>
                </div>

                {/* Key Viewer Quote */}
                <p className="text-[11px] text-gray-300 italic line-clamp-2 bg-dark-base/50 p-2 rounded-lg border border-dark-border/40">
                  {item.keyQuote}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
