# 🚀 TubePulse AI (v3.0 Pro SaaS)

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

### **Multi-Layered AI & Video Audience Sentiment Intelligence Platform**

[🌐 **Live Production App**](https://tubepulse-nine.vercel.app) • [🎙️ **Presentation Guide**](./PRESENTATION_GUIDE.md)

</div>

---

## 📖 Overview

**TubePulse AI** is an enterprise-grade AI SaaS platform engineered to decode audience emotions, video reception, and creator growth metrics in real-time. By transforming thousands of unstructured YouTube comments into structured intelligence, TubePulse helps content creators, marketing agencies, and brand managers optimize retention, draft viral title hooks, calculate sponsorship valuations, and benchmark competitors.

---

## ✨ Key Features & Modules

- 🔒 **Strict Instagram/Snapchat Style Auth Gate:** Full-screen access security with 1-Click Instant Demo VIP Login.
- 🎙️ **AI Voice Audio Briefing (Podcast Mode):** Synthesizes a 60-second spoken audio recap with animated soundwaves powered by the native Web Speech API.
- 🤖 **PulseAgent (Interactive AI Video Copilot):** Real-time conversational AI assistant answering creator retention questions, script outlines, and viral hooks.
- 📊 **Aspect-Based Sentiment Matrix (ABSA):** 5-dimension breakdown across *BGM & Audio*, *Visuals/CGI*, *Content Clarity*, *Acting & Delivery*, and *Value & Pricing*.
- ⚔️ **Side-by-Side Video Battle Arena:** Head-to-head dual video comparison with delta scoring and winner trophies.
- 🏆 **Channel Competitor Spy Mode:** Rank any creator's last 5 videos (@MrBeast, @mkbhd) from best-received to worst-received with audience praise & friction points.
- 🎯 **Viral Title & Thumbnail CTR Generator:** Produces 5 high-CTR YouTube video titles with psychological triggers (*Curiosity, Controversy, Value, Story*) and 3 thumbnail text overlay stickers.
- 💸 **Creator Sponsor Valuation & Media Kit:** Calculates estimated commercial sponsorship rates in **INR (₹)** and **USD ($)** with a 1-click ready-to-send brand pitch snippet.
- 🌍 **Geo-Sentiment Regional Breakdown:** Maps viewer reactions across India 🇮🇳, USA 🇺🇸, UK 🇬🇧, and Global regions with cultural notes.
- 💬 **1-Click AI Smart Replies & Multilingual Translator:** Generates creator responses in 4 distinct tones (*Grateful, Professional, Witty, Helpful*) with 1-click clipboard copying.

---

## 🏗️ Architecture & Tech Stack

```
[ Frontend: Next.js 14 App Router + Tailwind CSS + Recharts + Framer Motion ]
                                     │
                                     ▼
             [ Serverless API Layer: POST /api/analyze (Node.js) ]
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
      [ Live Global Edge Deployment: https://tubepulse-nine.vercel.app ]
```

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/priyabonde23/TubePulse.git
cd TubePulse
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🌐 Live Production Deployment

The application is deployed on Vercel's global edge network:  
👉 **[https://tubepulse-nine.vercel.app](https://tubepulse-nine.vercel.app)**

---

## 📄 License
This project is licensed under the MIT License.
