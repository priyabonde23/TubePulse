'use client';

import React, { useState } from 'react';
import { TimestampPoint } from '@/types';
import { Clock, Play, ThumbsUp, Sparkles, Flame, Laugh, HelpCircle, AlertCircle } from 'lucide-react';

interface TimestampHeatmapProps {
  timestamps: TimestampPoint[];
}

export const TimestampHeatmap: React.FC<TimestampHeatmapProps> = ({ timestamps }) => {
  const [selectedPoint, setSelectedPoint] = useState<TimestampPoint | null>(
    timestamps.length > 0 ? timestamps[0] : null
  );

  if (!timestamps || timestamps.length === 0) return null;

  const maxSeconds = Math.max(...timestamps.map(t => t.seconds), 300);

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'joy': return '😂';
      case 'hype': return '🔥';
      case 'confusion': return '🤔';
      case 'disappointment': return '😡';
      case 'constructive': return '💡';
      default: return '⏱️';
    }
  };

  return (
    <div className="w-full bg-dark-surface border border-dark-border rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-400" />
          <h3 className="text-sm font-bold text-white">Video Timestamp & Scene Reaction Heatmap</h3>
        </div>
        <span className="text-xs text-dark-muted">
          {timestamps.length} key scene reactions detected
        </span>
      </div>

      {/* Visual Timeline Scrubber Bar */}
      <div className="relative pt-6 pb-4">
        {/* Track Line */}
        <div className="w-full h-3 bg-dark-card border border-dark-border/80 rounded-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-600/30 via-indigo-500/40 to-rose-500/30" />
        </div>

        {/* Timestamp Pins on Track */}
        <div className="relative -mt-3.5 h-6">
          {timestamps.map((pt, idx) => {
            const leftPercent = Math.min(95, Math.max(3, (pt.seconds / maxSeconds) * 100));
            const isSelected = selectedPoint?.timestamp === pt.timestamp;

            return (
              <button
                key={idx}
                onClick={() => setSelectedPoint(pt)}
                style={{ left: `${leftPercent}%` }}
                className={`absolute -translate-x-1/2 -top-1.5 flex flex-col items-center group transition-all z-20 ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                }`}
                title={`Scene at ${pt.timestamp}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-lg border-2 transition-all ${
                    isSelected
                      ? 'bg-brand-600 border-white text-white ring-4 ring-brand-500/40'
                      : 'bg-dark-card border-brand-400 text-gray-200 hover:border-white'
                  }`}
                >
                  {getEmotionIcon(pt.emotion)}
                </div>
                <span className="text-[10px] font-mono text-brand-300 font-bold mt-1 bg-dark-base/90 px-1 rounded shadow">
                  {pt.timestamp}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Timestamp Scene Detail Card */}
      {selectedPoint && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-dark-card via-dark-card/90 to-brand-950/20 border border-brand-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-brand-600 text-white font-mono text-xs font-bold">
                ⏱️ {selectedPoint.timestamp}
              </span>
              <span className="text-xs text-dark-muted font-medium">Reaction by {selectedPoint.author}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-200 italic leading-relaxed">
              &quot;{selectedPoint.text}&quot;
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-1 text-xs text-brand-400 bg-dark-base px-2.5 py-1 rounded-lg border border-dark-border">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{selectedPoint.likes.toLocaleString()} likes</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
