'use client';

import React, { useState } from 'react';
import { X, Download, Copy, Check, FileJson, FileSpreadsheet, FileText, Printer } from 'lucide-react';
import { VideoAnalysisResult, CustomAnalysisResult } from '@/types';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: VideoAnalysisResult | CustomAnalysisResult | null;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !data) return null;

  const isVideo = 'video' in data;
  const title = isVideo ? (data as VideoAnalysisResult).video.title : (data as CustomAnalysisResult).title;

  // Print to PDF
  const handlePrintPDF = () => {
    window.print();
  };

  // Export to JSON
  const handleExportJSON = () => {
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonStr);
    downloadAnchor.setAttribute('download', `tubepulse-analysis-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export to CSV
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,Author,Comment,Sentiment,SentimentScore,Emotion,Likes\n';
    data.comments.forEach((c) => {
      const cleanAuthor = `"${c.author.replace(/"/g, '""')}"`;
      const cleanText = `"${c.text.replace(/"/g, '""').replace(/\n/g, ' ')}"`;
      csvContent += `${cleanAuthor},${cleanText},${c.sentiment},${c.sentimentScore},${c.emotion},${c.likes}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tubepulse-comments-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Copy Markdown Summary
  const handleCopySummary = () => {
    const md = `# TubePulse Sentiment & Intelligence Report
**Title:** ${title}
**Overall Score:** ${data.sentiment.overallScore}/100 (${data.sentiment.verdict})
**Sentiment Breakdown:** ${data.sentiment.positive}% Positive | ${data.sentiment.neutral}% Neutral | ${data.sentiment.negative}% Negative
**Community Safety Score:** ${data.health.communityHealthScore}/100 (${data.health.safetyStatus})

## Executive Summary
${data.summary.executiveSummary}

## What Viewers Loved
${data.summary.topPraises.map(p => `- ${p}`).join('\n')}

## Criticisms & Pain Points
${data.summary.topCriticisms.map(c => `- ${c}`).join('\n')}

## Common Questions
${data.summary.commonQuestions.map(q => `- ${q}`).join('\n')}

## Creator Action Plan
${data.summary.creatorActionItems.map(a => `- ${a}`).join('\n')}
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in print:hidden">
      <div className="w-full max-w-lg bg-dark-surface border border-dark-border rounded-2xl p-6 shadow-2xl space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-dark-muted hover:text-white rounded-lg hover:bg-dark-card transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Export & Share Intelligence Report</h3>
            <p className="text-xs text-dark-muted truncate max-w-xs">{title}</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {/* Print / Save as PDF */}
          <button
            onClick={handlePrintPDF}
            className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-brand-600/20 to-indigo-600/20 hover:from-brand-600/30 hover:to-indigo-600/30 border border-brand-500/40 rounded-xl transition-all group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-500/20 text-brand-300 border border-brand-500/30">
                <Printer className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Print / Save Visual PDF Report</span>
                <span className="text-[11px] text-brand-200">High-resolution printable dashboard presentation</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-brand-400 group-hover:text-white" />
          </button>

          {/* JSON Export */}
          <button
            onClick={handleExportJSON}
            className="w-full flex items-center justify-between p-3.5 bg-dark-card hover:bg-dark-border/80 border border-dark-border rounded-xl transition-all group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <FileJson className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Download Raw JSON Dataset</span>
                <span className="text-[11px] text-dark-muted">Complete metrics, radar scores, and parsed tokens</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-dark-muted group-hover:text-white" />
          </button>

          {/* CSV Export */}
          <button
            onClick={handleExportCSV}
            className="w-full flex items-center justify-between p-3.5 bg-dark-card hover:bg-dark-border/80 border border-dark-border rounded-xl transition-all group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Download Comments CSV Sheet</span>
                <span className="text-[11px] text-dark-muted">Excel/Sheets compatible with sentiment & emotion columns</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-dark-muted group-hover:text-white" />
          </button>

          {/* Copy Markdown Summary */}
          <button
            onClick={handleCopySummary}
            className="w-full flex items-center justify-between p-3.5 bg-dark-card hover:bg-dark-border/80 border border-dark-border rounded-xl transition-all group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Copy Formatted Markdown Summary</span>
                <span className="text-[11px] text-dark-muted">Ideal for Notion, Slack, Obsidian or team notes</span>
              </div>
            </div>
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-dark-muted group-hover:text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
