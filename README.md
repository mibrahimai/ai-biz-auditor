# 🤖 AI Business Process Auditor

> Answer 8 questions about your business → Get a free AI-powered automation audit report with your top 3 automation opportunities, time savings, recommended tools, and a downloadable PDF.

**Built with:** Next.js 15 · TypeScript · Gemini 1.5 Flash (free tier) · jsPDF  
**Live demo:** [ai-biz-auditor.vercel.app](https://ai-biz-auditor.vercel.app) *(coming soon)*

![screenshot](docs/screenshot.png)

---

## What It Does

Most businesses waste 5–15 hours/week on manual tasks they don't realize can be automated. This tool acts as an **AI automation consultant** — it analyzes your workflows and produces a structured report identifying:

- ✅ **Top 3 automation opportunities** ranked by priority
- ⏱ **Time saved per week** for each opportunity  
- 🛠 **Exact tools to use** (n8n, Zapier, Supabase, etc.)
- 💰 **ROI statement** for each automation
- ⚡ **3 quick wins** you can do today for free
- 🏗 **Recommended tech stack** for your business size
- 📄 **Downloadable PDF report** to share with your team

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/mikkh/ai-biz-auditor.git
cd ai-biz-auditor
npm install
```

### 2. Get a free Gemini API key

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with Google (free, no credit card)
3. Click **Get API Key** → Create API key
4. Copy the key

### 3. Set up environment

```bash
cp .env.local.example .env.local
```

Open `.env.local` and paste your key:

```
GEMINI_API_KEY=AIza...your_key_here
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — fill the form and get your report.

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 15 App Router, TypeScript |
| Styling | Vanilla CSS (dark glassmorphism) |
| AI | Google Gemini 1.5 Flash (free) |
| PDF | jsPDF |
| Deploy | Vercel (free tier) |

---

## Deploy to Vercel (free)

```bash
npm i -g vercel
vercel --prod
```

Add `GEMINI_API_KEY` to your Vercel project environment variables.

---

## Why I Built This

I kept seeing Upwork clients post "AI automation consultant needed" jobs where the first thing they needed was someone to *identify* what to automate before building anything. This tool is that discovery phase — free and instant.

---

## License

MIT
