'use client';

import React from 'react';
import { TopicItem } from '@/types';
import { Hash, X } from 'lucide-react';

interface TopicCloudProps {
  topics: TopicItem[];
  selectedTopic: string | null;
  onSelectTopic: (topic: string | null) => void;
}

export const TopicCloud: React.FC<TopicCloudProps> = ({
  topics,
  selectedTopic,
  onSelectTopic,
}) => {
  if (!topics || topics.length === 0) return null;

  return (
    <div className="w-full bg-dark-surface border border-dark-border rounded-2xl p-5 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-brand-400" />
          <h3 className="text-sm font-bold text-white">Trending Themes & Keywords</h3>
        </div>
        {selectedTopic && (
          <button
            onClick={() => onSelectTopic(null)}
            className="flex items-center gap-1 text-xs text-brand-300 hover:text-brand-200 bg-brand-500/10 px-2 py-0.5 rounded-md border border-brand-500/30"
          >
            <span>Clear Filter ({selectedTopic})</span>
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {topics.map((topic, idx) => {
          const isSelected = selectedTopic === topic.keyword;

          const getTagStyle = () => {
            if (isSelected) {
              return 'bg-brand-600 text-white border-brand-400 ring-2 ring-brand-400/30 scale-105';
            }
            if (topic.sentiment === 'positive') {
              return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/20';
            }
            if (topic.sentiment === 'negative') {
              return 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:border-rose-400 hover:bg-rose-500/20';
            }
            return 'bg-dark-card text-gray-300 border-dark-border hover:border-dark-muted hover:bg-dark-card/80';
          };

          return (
            <button
              key={idx}
              onClick={() => onSelectTopic(isSelected ? null : topic.keyword)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${getTagStyle()}`}
            >
              <span>{topic.keyword}</span>
              <span className="px-1.5 py-0.2 text-[10px] rounded-md bg-dark-base/40 opacity-80 font-bold">
                {topic.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
