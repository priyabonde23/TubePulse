'use client';

import React, { useState, useMemo } from 'react';
import { CommentItem, SentimentType, EmotionType } from '@/types';
import { generateSmartReplies, translateComment } from '@/lib/smartReplyEngine';
import { Search, ThumbsUp, Filter, ArrowUpDown, MessageSquare, Smile, Meh, Frown, Sparkles, HelpCircle, Copy, Check, Globe, Languages } from 'lucide-react';

interface CommentExplorerProps {
  comments: CommentItem[];
  selectedTopic: string | null;
}

export const CommentExplorer: React.FC<CommentExplorerProps> = ({ comments, selectedTopic }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState<'all' | SentimentType>('all');
  const [emotionFilter, setEmotionFilter] = useState<'all' | EmotionType>('all');
  const [sortBy, setSortBy] = useState<'likes' | 'highestScore' | 'lowestScore' | 'default'>('likes');
  const [displayCount, setDisplayCount] = useState(12);

  // Active AI Reply Modal / Drawer State
  const [activeReplyComment, setActiveReplyComment] = useState<CommentItem | null>(null);
  const [copiedTone, setCopiedTone] = useState<string | null>(null);

  // Translated Comments State
  const [translatedMap, setTranslatedMap] = useState<Record<string, string>>({});

  // Filter & Sort Logic
  const filteredComments = useMemo(() => {
    return comments
      .filter((comment) => {
        if (selectedTopic && !comment.text.toLowerCase().includes(selectedTopic.toLowerCase())) {
          return false;
        }
        if (searchQuery.trim() && !comment.text.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        if (sentimentFilter !== 'all' && comment.sentiment !== sentimentFilter) {
          return false;
        }
        if (emotionFilter !== 'all' && comment.emotion !== emotionFilter) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'likes') return b.likes - a.likes;
        if (sortBy === 'highestScore') return b.sentimentScore - a.sentimentScore;
        if (sortBy === 'lowestScore') return a.sentimentScore - b.sentimentScore;
        return 0;
      });
  }, [comments, selectedTopic, searchQuery, sentimentFilter, emotionFilter, sortBy]);

  const visibleComments = filteredComments.slice(0, displayCount);

  const handleCopyReply = (tone: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTone(tone);
    setTimeout(() => setCopiedTone(null), 2000);
  };

  const handleToggleTranslate = (comment: CommentItem) => {
    if (translatedMap[comment.id]) {
      const next = { ...translatedMap };
      delete next[comment.id];
      setTranslatedMap(next);
    } else {
      const translated = translateComment(comment.text);
      setTranslatedMap(prev => ({ ...prev, [comment.id]: translated }));
    }
  };

  const getSentimentBadge = (sentiment: SentimentType, score: number) => {
    switch (sentiment) {
      case 'positive':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-md">
            <Smile className="w-3 h-3" />
            <span>+{Math.round(score * 100)}%</span>
          </span>
        );
      case 'negative':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded-md">
            <Frown className="w-3 h-3" />
            <span>{Math.round(score * 100)}%</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md">
            <Meh className="w-3 h-3" />
            <span>Neutral</span>
          </span>
        );
    }
  };

  const getEmotionBadge = (emotion: EmotionType) => {
    const map: Record<EmotionType, { label: string; icon: string; style: string }> = {
      joy: { label: 'Joy', icon: '😂', style: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20' },
      hype: { label: 'Hype', icon: '🔥', style: 'text-amber-300 bg-amber-500/10 border-amber-500/20' },
      confusion: { label: 'Question', icon: '🤔', style: 'text-blue-300 bg-blue-500/10 border-blue-500/20' },
      disappointment: { label: 'Criticism', icon: '😡', style: 'text-rose-300 bg-rose-500/10 border-rose-500/20' },
      constructive: { label: 'Idea', icon: '💡', style: 'text-purple-300 bg-purple-500/10 border-purple-500/20' },
      neutral: { label: 'Neutral', icon: '⚖️', style: 'text-gray-300 bg-gray-500/10 border-gray-500/20' },
    };

    const e = map[emotion] || map.neutral;
    return (
      <span className={`inline-flex items-center gap-1 text-[10px] font-medium border px-1.5 py-0.5 rounded-md ${e.style}`}>
        <span>{e.icon}</span>
        <span>{e.label}</span>
      </span>
    );
  };

  return (
    <div className="w-full bg-dark-surface border border-dark-border rounded-2xl p-5 sm:p-6 shadow-xl space-y-5 relative">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand-400" />
          <h3 className="text-base font-bold text-white">
            Audience Comment Explorer
            <span className="ml-2 text-xs font-normal text-dark-muted">({filteredComments.length} matched)</span>
          </h3>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-dark-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search comments..."
            className="w-full pl-9 pr-3 py-1.5 bg-dark-card border border-dark-border rounded-xl text-xs text-white placeholder-dark-muted focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Filter Tabs & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-dark-border/60">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-dark-muted font-medium mr-1">Sentiment:</span>
          {(['all', 'positive', 'neutral', 'negative'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSentimentFilter(s)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                sentimentFilter === s
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-dark-card text-dark-muted hover:text-white border border-dark-border/60'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-dark-muted" />
            <select
              value={emotionFilter}
              onChange={(e) => setEmotionFilter(e.target.value as any)}
              className="bg-dark-card text-xs text-white border border-dark-border rounded-lg px-2.5 py-1 focus:outline-none focus:border-brand-500"
            >
              <option value="all">All Emotions</option>
              <option value="hype">🔥 Hype / Excitement</option>
              <option value="joy">😂 Joy / Humor</option>
              <option value="confusion">🤔 Questions / Confusion</option>
              <option value="disappointment">😡 Criticism</option>
              <option value="constructive">💡 Suggestions</option>
            </select>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-dark-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-dark-card text-xs text-white border border-dark-border rounded-lg px-2.5 py-1 focus:outline-none focus:border-brand-500"
            >
              <option value="likes">Most Liked</option>
              <option value="highestScore">Most Positive</option>
              <option value="lowestScore">Most Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
        {visibleComments.length === 0 ? (
          <div className="col-span-full py-12 text-center text-dark-muted">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">No comments match the selected filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSentimentFilter('all');
                setEmotionFilter('all');
              }}
              className="mt-2 text-xs text-brand-400 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          visibleComments.map((comment) => {
            const isTranslated = !!translatedMap[comment.id];
            const currentText = isTranslated ? translatedMap[comment.id] : comment.text;

            return (
              <div
                key={comment.id}
                className="bg-dark-card/80 hover:bg-dark-card border border-dark-border/70 hover:border-dark-border rounded-xl p-4 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                        {comment.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block leading-tight">
                          {comment.author}
                        </span>
                        <span className="text-[10px] text-dark-muted">{comment.publishedAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {getEmotionBadge(comment.emotion)}
                      {getSentimentBadge(comment.sentiment, comment.sentimentScore)}
                    </div>
                  </div>

                  <p className="text-xs text-gray-200 leading-relaxed break-words">
                    {currentText}
                  </p>
                </div>

                {/* Footer Controls: Likes + Translate + AI Reply button */}
                <div className="flex items-center justify-between text-[11px] text-dark-muted pt-2 border-t border-dark-border/40">
                  <div className="flex items-center gap-1 text-dark-muted group-hover:text-gray-300 transition-colors">
                    <ThumbsUp className="w-3 h-3 text-brand-400" />
                    <span>{comment.likes.toLocaleString()} likes</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Translate Button */}
                    <button
                      onClick={() => handleToggleTranslate(comment)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] transition-all ${
                        isTranslated
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          : 'bg-dark-base text-dark-muted hover:text-white border-dark-border'
                      }`}
                      title="Auto Translate"
                    >
                      <Globe className="w-3 h-3" />
                      <span>{isTranslated ? 'Original' : 'Translate'}</span>
                    </button>

                    {/* AI Smart Reply Button */}
                    <button
                      onClick={() => setActiveReplyComment(comment)}
                      className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[10px] font-semibold transition-all shadow-sm"
                    >
                      <Sparkles className="w-3 h-3 text-brand-400" />
                      <span>AI Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Load More Button */}
      {filteredComments.length > displayCount && (
        <div className="text-center pt-2">
          <button
            onClick={() => setDisplayCount((prev) => prev + 12)}
            className="px-5 py-2 text-xs font-semibold bg-dark-card hover:bg-dark-border text-white border border-dark-border rounded-xl transition-all shadow-sm"
          >
            Load More Comments ({filteredComments.length - displayCount} remaining)
          </button>
        </div>
      )}

      {/* AI Smart Reply Drawer Modal */}
      {activeReplyComment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-dark-surface border border-dark-border rounded-2xl p-6 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setActiveReplyComment(null)}
              className="absolute top-4 right-4 text-dark-muted hover:text-white text-xs font-bold p-1"
            >
              ✕
            </button>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">AI Creator Reply Generator</h4>
                <p className="text-[11px] text-dark-muted">Replying to &quot;{activeReplyComment.author}&quot;</p>
              </div>
            </div>

            {/* Comment snippet */}
            <div className="p-3 bg-dark-card rounded-xl border border-dark-border/60 text-xs text-gray-300 italic">
              &quot;{activeReplyComment.text}&quot;
            </div>

            {/* 4 Smart Reply Tones */}
            <div className="space-y-2.5 pt-1">
              {(() => {
                const replies = generateSmartReplies(activeReplyComment);
                const tones = [
                  { key: 'grateful', label: '💖 Grateful & Warm', text: replies.grateful },
                  { key: 'professional', label: '🤝 Professional & Balanced', text: replies.professional },
                  { key: 'witty', label: '🔥 Witty & Energetic', text: replies.witty },
                  { key: 'helpful', label: '💡 Helpful & Direct', text: replies.helpful },
                ];

                return tones.map((tone) => {
                  const isCopied = copiedTone === tone.key;
                  return (
                    <div
                      key={tone.key}
                      className="p-3 rounded-xl bg-dark-card/60 hover:bg-dark-card border border-dark-border/70 flex items-start justify-between gap-3 transition-all"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-brand-400 block">
                          {tone.label}
                        </span>
                        <p className="text-xs text-gray-200 leading-snug">{tone.text}</p>
                      </div>

                      <button
                        onClick={() => handleCopyReply(tone.key, tone.text)}
                        className="flex-shrink-0 p-2 rounded-lg bg-dark-base hover:bg-brand-600 text-dark-muted hover:text-white border border-dark-border transition-all"
                        title="Copy Reply"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
