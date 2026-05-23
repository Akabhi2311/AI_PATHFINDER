````md id="n3g5rx"
# 🚀 AI Pathfinder — AI Powered Career Intelligence Platform

AI Pathfinder is a modern full-stack AI-powered career intelligence platform designed to help students, developers, and professionals accelerate their career growth using artificial intelligence.

The platform provides:
- AI Resume Analysis
- ATS Score Evaluation
- Skill Gap Analysis
- AI Career Roadmaps
- Weekly Learning Planners
- Mock Interview Preparation
- AI Career Chat Assistant
- Dashboard Analytics
- Persistent History Tracking

Built with a production-grade architecture using Next.js 15, Clerk Authentication, Neon PostgreSQL, Drizzle ORM, and Ollama Local LLMs.

---

# ✨ Features

## 🧠 AI Resume Analyzer
- Upload resume PDFs
- AI-powered ATS analysis
- ATS score calculation
- Resume improvement suggestions
- Skill extraction
- Career recommendations
- Resume history tracking

---

## 📊 Skill Gap Analyzer
- Analyze missing skills for target roles
- Enter skills manually OR upload resume
- AI-generated roadmap suggestions
- Learning recommendations
- Skill gap history tracking

---

## 🗺️ AI Roadmap Generator
- Personalized learning roadmaps
- Role-based AI career planning
- Structured phases and milestones
- Practical project suggestions
- Real-world resources and technologies

---

## 📅 Weekly Planner Generator
- Converts roadmaps into weekly schedules
- Day-wise AI learning plans
- Coding + revision + projects + interview prep
- Productivity-focused learning structure
- Weekly planner history tracking

---

## 🎤 AI Mock Interview
- AI-generated interview preparation guides
- Technical interview questions
- DSA preparation
- HR interview rounds
- System design preparation
- Interview tips & common mistakes
- Interview history tracking

---

## 💬 AI Career Chat
- Interactive AI career mentor
- Persistent chat architecture
- Career guidance conversations
- Future-ready streaming support

---

## 📈 Dashboard Analytics
- Resume analysis counts
- Roadmap generation analytics
- Weekly planner statistics
- Skill gap report tracking
- Mock interview analytics
- User activity insights

---

## 🌙 Modern SaaS UI
- Responsive dashboard
- Mobile-friendly layout
- Dark mode support
- Animated modern UI
- Sticky sidebar navigation
- Timeline components
- Professional card layouts

---

# 🛠️ Tech Stack

## Frontend
- Next.js 15 App Router
- React
- TypeScript
- Tailwind CSS
- Lucide React Icons

## Backend
- Next.js API Routes
- Node.js Runtime

## Database
- Neon PostgreSQL
- Drizzle ORM

## Authentication
- Clerk Authentication

## AI/LLM
- Ollama
- phi3:mini
- tinyllama
- gemma:2b

## Utilities
- Axios
- PDFReader
- html2pdf.js

---

# 🧱 Project Architecture

```bash
src/
 ├── app/
 │   ├── (auth)
 │   ├── (dashboard)
 │   │   ├── dashboard
 │   │   ├── resume-analyzer
 │   │   ├── skill-gap
 │   │   ├── roadmap-generator
 │   │   ├── weekly-planner
 │   │   ├── mock-interview
 │   │   ├── ai-tools/ai-chat
 │   │   ├── settings
 │   │   ├── layout.tsx
 │   │
 │   ├── api/
 │   │   ├── roadmap-generator
 │   │   ├── weekly-planner
 │   │   ├── dashboard-stats
 │   │   ├── ai-chat
 │   │   ├── mock-interview
 │   │   ├── resume-history
 │   │   ├── skill-gap-history
 │   │   ├── weekly-planner-history
 │   │   ├── mock-interview-history
 │
 ├── components/
 │   ├── dashboard/sidebar.tsx
 │   ├── resume/
 │   ├── skill-gap/
 │   ├── weekly-planner/
 │   ├── roadmap/
 │   ├── mock-interview/
````

---

# ⚡ Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/AI-Pathfinder.git
```

---

## 2. Move Into Project

```bash
cd AI-Pathfinder
```

---

## 3. Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

---

# 🤖 Ollama Setup

## Install Ollama

[https://ollama.com](https://ollama.com)

---

## Pull Models

```bash
ollama pull phi3:mini
```

Optional:

```bash
ollama pull tinyllama
ollama pull gemma:2b
```

---

## Start Ollama

```bash
ollama serve
```

---

# 🗄️ Database Setup

## Push Drizzle Schema

```bash
npx drizzle-kit push
```

OR

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

---

# ▶️ Run Project

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

# 📸 Core Modules

| Module             | Description                         |
| ------------------ | ----------------------------------- |
| Resume Analyzer    | AI ATS analysis & recommendations   |
| Skill Gap Analyzer | Missing skills + roadmap generation |
| Roadmap Generator  | AI learning roadmap creation        |
| Weekly Planner     | Weekly learning schedule generation |
| Mock Interview     | AI interview preparation            |
| AI Chat            | Career mentor chatbot               |
| Dashboard          | Analytics & activity insights       |

---

# 🧠 AI Features

* Resume parsing
* Skill extraction
* ATS optimization
* Career intelligence
* Interview preparation
* Personalized learning paths
* AI-powered planning
* AI-generated guidance

---

# 🧩 Database Tables

```bash
users
resume_analysis
roadmaps
ai_chats
skill_gap_reports
mock_interviews
weekly_planners
```

---

# 🔒 Authentication

Implemented using Clerk:

* Sign Up
* Login
* Protected Routes
* User Session Management

---

# 🎨 UI Features

* Dark Mode
* Responsive Layout
* Sticky Sidebar
* Timeline Visualizations
* Professional SaaS Design
* Mobile Optimization

---

# 📦 Current Production Status

## ✅ Completed

* Authentication
* Resume Analyzer
* Skill Gap Analyzer
* Weekly Planner
* Mock Interview
* AI Chat
* Dashboard Analytics
* History Systems
* PDF Export
* Responsive UI
* Dark Mode

---

# 🚀 Future Improvements

* AI Voice Interviews
* Resume Builder
* AI Cover Letter Generator
* LinkedIn Optimizer
* Job Recommendation Engine
* AI Coding Mentor
* Streaming AI Responses
* Advanced Analytics
* Charts & Graphs
* SaaS Billing System

---

# ⚠️ Deployment Notes

Current version uses local Ollama inference.

For cloud deployment:

* OpenAI API
* Groq API
* Gemini API

are recommended replacements.

Frontend can be deployed on:

* Vercel
* Netlify

---

# 🧪 Common Fixes

## "self is not defined"

→ SSR import issue

## "module not found"

→ Wrong import path

## "page not found"

→ Route folder mismatch

## "createdBy does not exist"

→ Database schema mismatch

## Ollama timeout

→ Large prompts or heavy models

---

# 👨‍💻 Author

Developed by Abhishek Singh

---

# ⭐ If You Like This Project

Give it a star ⭐ on GitHub.

---

```
```
