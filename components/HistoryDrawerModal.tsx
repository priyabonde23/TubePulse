'use client';

import React from 'react';
import { SavedAnalysis } from '@/types';
import { X, History, Trash2, ArrowRight, Video, FileText, Swords, Calendar } from 'lucide-react';

interface HistoryDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: SavedAnalysis[];
  onSelectHistory: (item: SavedAnalysis) => void;
  onDeleteHistory: (id: string) => void;
}

export const HistoryDrawerModal: React.FC<HistoryDrawerModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistory,
  onDeleteHistory,
}) => {
  if (!isOpen) return null;

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md h-full bg-dark-surface border-l border-dark-border p-6 shadow-2xl flex flex-col justify-between space-y-4 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-dark-border/60">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Saved Analyses History</h3>
                <p className="text-xs text-dark-muted">{history.length} saved projects in your account</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-dark-muted hover:text-white rounded-lg hover:bg-dark-card transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List of History Items */}
          <div className="mt-4 space-y-3 max-h-[75vh] overflow-y-auto pr-1">
            {history.length === 0 ? (
              <div className="py-16 text-center text-dark-muted space-y-2">
                <History className="w-10 h-10 mx-auto opacity-30" />
                <p className="text-sm font-semibold">No saved analyses yet.</p>
                <p className="text-xs">Any video or dataset you analyze will automatically appear here!</p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-dark-card/80 hover:bg-dark-card border border-dark-border/70 hover:border-dark-border transition-all flex flex-col justify-between space-y-2 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-white line-clamp-1 block group-hover:text-brand-300">
                        {item.title}
                      </span>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-dark-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(item.analyzedAt)}
                        </span>
                        <span>•</span>
                        <span className="uppercase font-semibold text-brand-400">{item.mode}</span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
                        {item.overallScore}/100
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-dark-border/40 text-xs">
                    <button
                      onClick={() => onDeleteHistory(item.id)}
                      className="text-dark-muted hover:text-rose-400 p-1 rounded-md transition-colors"
                      title="Delete from history"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        onSelectHistory(item);
                        onClose();
                      }}
                      className="flex items-center gap-1 text-xs font-semibold text-brand-300 hover:text-brand-200"
                    >
                      <span>Reload Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-dark-border/60 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-dark-card hover:bg-dark-border text-white text-xs font-semibold rounded-xl border border-dark-border transition-all"
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
};
