# EcoSphere — AI-Powered ESG Intelligence Platform

EcoSphere is a production-grade Enterprise SaaS dashboard designed for organizations to track, report, and optimize their Environmental, Social, and Governance (ESG) footprints. Modeled after design systems like Stripe, Linear, and Vercel, the platform provides clear carbon tracking, real-time activity streams, interactive relationship mapping, and an integrated AI Copilot to deliver actionable intelligence.

---

## 🌟 Key Features

### 1. **Environmental Intelligence Hub**
* **GHG Protocol Scope Tracking:** Monitor Scope 1 (Direct), Scope 2 (Indirect Energy), and Scope 3 (Value Chain) greenhouse gas emissions.
* **Carbon Budgeting:** Real-time visual progress monitoring of carbon limits with dynamic hazard states.
* **Granular Disclosures:** Track top emission sources, department metrics, and historical events.

### 2. **Social & Engagement Center**
* **CSR Performance:** Keep track of employee volunteer hours, CSR event attendance, and community impact.
* **Interactive Leaderboards:** Gamified contributor tracking with badges and XP incentives.
* **Workforce Diversity:** Visual breakdowns of gender, age distribution, and department demographics.

### 3. **Governance & Risk Center**
* **Audit & Deadlines:** Monitor regulatory calendars, pending actions, and policy acceptance rates.
* **Risk Heatmap:** Cross-reference operational, financial, and reputational risks against specific departments.
* **Compliance Alerts:** Urgency-coded cards for pending frameworks like GRI, TCFD, CSRD, and SASB.

### 4. **AI Copilot & Advanced Analytics**
* **EcoSphere Intelligence Engine:** Ask complex regulatory queries, forecast ESG targets, and discover supply chain vulnerabilities.
* **Visual Relationship Explorer:** Fully interactive React Flow Knowledge Graph mapping entities, departments, and audit trails.

---

## 🛠️ Technology Stack

### **Frontend**
* **Framework:** React 19 + TypeScript + Vite
* **Styling:** Tailwind CSS v4
* **State Management:** Zustand (placeholder store structures ready for consumption)
* **Routing:** React Router v7
* **Charts:** Recharts (responsive line, stacked bar, horizontal bar, pie, and radar configurations)
* **Graphing:** `@xyflow/react` (React Flow)
* **Animations:** Framer Motion (hover lift effects)

### **Backend**
* **Framework:** FastAPI
* **Database ORM:** SQLAlchemy
* **Database Driver:** Psycopg2 (PostgreSQL support with local SQLite database failover)
* **Validation:** Pydantic v2
* **Server:** Uvicorn

---

## 🚀 Getting Started

Ensure you have **Python 3.10+** and **Node.js 18+** installed.

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
python -m uvicorn main:app --reload --port 8001
```
* **API root:** `http://127.0.0.1:8001`
* **Swagger Documentation:** `http://127.0.0.1:8001/docs`

> **Note:** The backend automatically detects if a local PostgreSQL instance is unavailable and seamlessly falls back to a pre-seeded local SQLite file (`ecosphere.db`) to guarantee a functional developer environment.

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
* **Local app url:** `http://localhost:5173` (or the port printed in the terminal output if `5173` is occupied).

---

## 📂 Project Architecture

```
EcoSphere/
├── backend/
│   ├── ai/                # AI copilot reasoning models
│   ├── api/               # API endpoints & Pydantic validation schemas
│   ├── models/            # SQLAlchemy database declarations
│   ├── services/          # Seed scripts and helper functions
│   ├── config.py          # Application configuration loaders
│   ├── database.py        # ORM engines (SQLite fallback handler)
│   └── main.py            # FastAPI application entrypoint
└── frontend/
    ├── src/
    │   ├── components/    # Reusable widgets (StatCard, AIInsight, etc.)
    │   ├── features/      # Domain modules (social, environment, graph)
    │   ├── layouts/       # Screen container layouts (DashboardLayout)
    │   ├── pages/         # Core application pages (Dashboard, Analytics)
    │   ├── routes/        # App router definitions
    │   └── theme/         # Common spacing, color & typography tokens
```
