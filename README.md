# 🚀 TubePulse AI (v3.0 Pro SaaS)

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-success?style=for-the-badge&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

### **Multi-Layered NLP & Video Sentiment Intelligence SaaS Platform**
Decode what viewers really think and feel with aspect-based metrics, emotion vectors, AI voice briefings, and creator monetization intelligence.

[**🌐 Live Demo Website**](https://tubepulse-nine.vercel.app) • [**📑 Presentation & Viva Guide**](./PRESENTATION_GUIDE.md) • [**📄 Executive PDF Report**](./TubePulse_Presentation_Report.html)

</div>

---

## 🌟 Key Super Modules

| Module | Description |
|---|---|
| 🔒 **Strict Auth Gate** | Instagram/Snapchat style full-screen access gate with **1-Click Instant Demo Login**. |
| 🎙️ **AI Voice Audio Briefing** | 60-second podcast-style hands-free audio summary powered by Web Speech API with animated soundwaves. |
| 🤖 **PulseAgent AI Copilot** | Interactive real-time conversational AI bot answering retention queries, pacing fixes, and script outlines. |
| 📊 **Aspect-Based Sentiment (ABSA)** | 5-dimension breakdown: BGM/Audio, Visuals/CGI, Explanation Clarity, Delivery, and Value. |
| ⚔️ **Side-by-Side Battle Arena** | Compare two videos head-to-head with delta satisfaction scoring and winner trophies. |
| 🏆 **Channel Competitor Spy** | Benchmark any YouTuber (`@MrBeast`, `@mkbhd`) with a 5-video ranked performance leaderboard. |
| 🎯 **Viral Title & CTR Generator** | 5 high-converting titles across psychological triggers + 3 thumbnail text overlay stickers. |
| 💸 **Creator Sponsor Valuation** | Calculates commercial brand sponsorship rates in INR (₹) and USD ($) with a 1-click Media Kit pitch. |
| 🌍 **Geo-Sentiment Breakdown** | Maps viewer reactions across India 🇮🇳, USA 🇺🇸, UK 🇬🇧, and Global regions with cultural notes. |
| 💬 **1-Click AI Smart Replies** | Generates replies across 4 creator tones (*Grateful, Witty, Professional, Helpful*) with 1-click copy. |

---

## 🏗️ System Architecture

```
[ User Input: YouTube Video URL / Channel Handle / CSV Feedback ]
                             │
                             ▼
     [ Serverless REST API Layer: POST /api/analyze (Node.js) ]
                             │
     ┌───────────────────────┼────────────────────────┐
     ▼                       ▼                        ▼
[ YouTube Data API v3 ]  [ NLP & Lexicon Engine ] [ Aspect ABSA Engine ]
     │                       │                        │
     ▼                       ▼                        ▼
[ Emotion Classifier ]   [ Toxicity Shield ]      [ Virality & Time Drift ]
     │                       │                        │
     └───────────────────────┼────────────────────────┘
                             ▼
         [ PulseAgent AI Copilot & Voice Synthesizer ]
                             │
                             ▼
[ Deployment: Vercel Global Edge CDN (https://tubepulse-nine.vercel.app) ]
```

---

## 🚀 Quick Start (Local Setup)

### 1. Clone the repository:
```bash
git clone https://github.com/priyabonde23/TubePulse.git
cd TubePulse
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 14 App Router, React 18, Tailwind CSS, Lucide Icons, Recharts, Framer Motion
* **Backend:** Next.js Serverless API Routes (Node.js)
* **NLP Intelligence:** Custom weighted Hinglish & Gen-Z Lexicon NLP, 6-Axis Emotion Vector, Aspect Breakdown Engine
* **Deployment:** Vercel Global Edge CDN

---

## 📄 License
MIT License © 2026 TubePulse AI
