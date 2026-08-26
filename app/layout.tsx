import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TubePulse | AI YouTube Sentiment & Audience Intelligence Hub',
  description: 'Instant multi-dimensional sentiment analysis, emotion radars, topic clouds, and actionable AI summaries for YouTube videos & customer reviews.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-base text-gray-100 min-h-screen antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
