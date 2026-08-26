'use client';

import React, { useState } from 'react';
import { Upload, FileText, Sparkles, Loader2, Database, ArrowRight } from 'lucide-react';

interface CustomAnalysisTabProps {
  onAnalyzeCustom: (payload: { title?: string; customComments?: string[]; customText?: string }) => void;
  isLoading: boolean;
}

export const CustomAnalysisTab: React.FC<CustomAnalysisTabProps> = ({ onAnalyzeCustom, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const [datasetTitle, setDatasetTitle] = useState('');

  const sampleDatasets = [
    {
      title: 'E-Commerce Product Reviews',
      category: 'Amazon / Flipkart',
      data: [
        'The build quality is exceptional, very sturdy and premium finish! 🔥',
        'Battery drains within 4 hours of heavy usage, very disappointing.',
        'Customer support solved my replacement issue in less than 24 hours. Great service!',
        'Is this compatible with the 2024 model? No manual was included.',
        'Overpriced for what it offers. Found a better alternative at half the price.',
        'Looks fantastic in person and fits perfectly in my pocket. Highly recommended! ❤️',
        'Audio starts crackling at max volume. Could be improved in next update.'
      ]
    },
    {
      title: 'App Store User Feedback',
      category: 'SaaS Mobile App',
      data: [
        'Love the new dark mode redesign! Makes working at night so much easier 🌙✨',
        'App keeps crashing every time I try to export PDF reports. Please fix ASAP! 😡',
        'Would love to see Google Calendar two-way sync added in the next update 💡',
        'Cleanest UI in this category. Replaced 3 other tools with this one 🐐',
        'Why did you move the settings button to the bottom right? It was better before.',
        'Super fast loading speeds and zero latency. 10/10 experience!'
      ]
    }
  ];

  const handleLoadSample = (sample: typeof sampleDatasets[0]) => {
    setDatasetTitle(sample.title);
    setInputText(sample.data.join('\n\n'));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDatasetTitle(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        // Parse CSV or plain text lines
        const lines = content
          .split('\n')
          .map(l => l.trim().replace(/^["']|["']$/g, ''))
          .filter(l => l.length > 5);
        setInputText(lines.join('\n\n'));
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const lines = inputText
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 3);

    onAnalyzeCustom({
      title: datasetTitle.trim() || 'Custom Feedback Analysis',
      customComments: lines
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-4 space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-medium mb-3">
          <Database className="w-3.5 h-3.5 text-brand-400" />
          <span>Universal Feedback & Review Intelligence</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Analyze Any Customer Reviews, CSV, or Text
        </h2>
        <p className="text-xs sm:text-sm text-dark-muted mt-2 max-w-xl mx-auto">
          Paste customer reviews, survey responses, or upload a CSV file to generate instant sentiment breakdown and AI insights.
        </p>
      </div>

      {/* Preset Samples */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-dark-muted font-medium mr-1">Load Sample:</span>
        {sampleDatasets.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleLoadSample(sample)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-card hover:bg-dark-border/80 border border-dark-border text-xs font-medium text-white transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-brand-400" />
            <span>{sample.title}</span>
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="bg-dark-surface border border-dark-border rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Dataset / Project Name (Optional)
          </label>
          <input
            type="text"
            value={datasetTitle}
            onChange={(e) => setDatasetTitle(e.target.value)}
            placeholder="e.g. Q3 Customer Satisfaction Feedback, E-commerce Reviews"
            className="w-full bg-dark-card border border-dark-border rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-dark-muted focus:outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-gray-300">
              Reviews / Feedback Text (Separate each review with a new line)
            </label>
            <label className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 cursor-pointer font-medium">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload CSV / TXT</span>
              <input
                type="file"
                accept=".csv,.txt,.json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          <textarea
            rows={8}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste multiple reviews here (e.g. one review per line)...&#10;&#10;The product is amazing and delivery was super fast! 🔥&#10;Battery life could have been better, lasts only a few hours.&#10;Is this compatible with iPhone 16? Great design overall."
            className="w-full bg-dark-card border border-dark-border rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-dark-muted/60 focus:outline-none focus:border-brand-500 font-mono leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-brand-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing AI Analytics...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run Sentiment Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
