'use client';

import React from 'react';
import { VideoMetadata } from '@/types';
import { Eye, ThumbsUp, MessageSquare, ExternalLink, Calendar, CheckCircle2, Download, Share2 } from 'lucide-react';

interface VideoInfoCardProps {
  video: VideoMetadata;
  totalAnalyzed: number;
  onExport: () => void;
}

export const VideoInfoCard: React.FC<VideoInfoCardProps> = ({ video, totalAnalyzed, onExport }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full bg-dark-surface border border-dark-border rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between relative z-10">
        {/* Left: Thumbnail & Info */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center max-w-3xl">
          <div className="relative group w-full sm:w-48 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-dark-card border border-dark-border shadow-md">
            {video.thumbnail ? (
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-dark-card text-dark-muted">
                No Preview
              </div>
            )}
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold gap-1.5"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-0.5 rounded-full">
                {video.channelTitle}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-dark-muted">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(video.publishedAt)}</span>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug line-clamp-2">
              {video.title}
            </h2>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-3 text-xs text-dark-muted">
              <div className="flex items-center gap-1.5 bg-dark-card px-2.5 py-1 rounded-lg border border-dark-border/60">
                <Eye className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-white font-medium">{formatNumber(video.viewCount)}</span>
                <span className="text-[11px]">views</span>
              </div>

              <div className="flex items-center gap-1.5 bg-dark-card px-2.5 py-1 rounded-lg border border-dark-border/60">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-white font-medium">{formatNumber(video.likeCount)}</span>
                <span className="text-[11px]">likes</span>
              </div>

              <div className="flex items-center gap-1.5 bg-dark-card px-2.5 py-1 rounded-lg border border-dark-border/60">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-white font-medium">{totalAnalyzed}</span>
                <span className="text-[11px]">comments analyzed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-dark-border/50">
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-dark-card hover:bg-dark-border/80 text-white border border-dark-border rounded-xl transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-brand-400" />
            <span>Export Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
