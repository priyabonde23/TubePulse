'use client';

import React from 'react';
import { Globe, TrendingUp, Sparkles, MessageCircle } from 'lucide-react';
import { GeoSentimentItem } from '@/types';

interface GeoSentimentMapProps {
  geoData: GeoSentimentItem[];
}

export const GeoSentimentMap: React.FC<GeoSentimentMapProps> = ({ geoData }) => {
  return (
    <div className="w-full bg-dark-surface/90 border border-dark-border/80 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">Geo-Sentiment & Regional Audience Breakdown</h3>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold uppercase">
                Global Reception
              </span>
            </div>
            <p className="text-xs text-dark-muted">Audience sentiment & cultural discussion trends mapped across global regions</p>
          </div>
        </div>
      </div>

      {/* Country Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {geoData.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl bg-dark-card/80 border border-dark-border/80 hover:border-cyan-500/40 transition-all space-y-3 flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Flag & Country */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{item.flag}</span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.country}</h4>
                    <span className="text-[10px] text-dark-muted">{item.sharePercentage}% Audience Share</span>
                  </div>
                </div>

                <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  {item.positiveRatio}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-dark-base h-2 rounded-full overflow-hidden mt-3 border border-dark-border/60">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.positiveRatio}%` }}
                />
              </div>

              {/* Regional Buzzword */}
              <div className="mt-3 p-2 rounded-xl bg-dark-base/80 border border-dark-border/60 text-[11px] text-cyan-300 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate font-semibold">{item.topBuzzword}</span>
              </div>
            </div>

            {/* Cultural Note */}
            <p className="text-[10px] text-dark-muted leading-relaxed pt-2 border-t border-dark-border/40">
              {item.culturalNote}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
