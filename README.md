# CareerPath AI - AI-Powered Career Guidance & PMKVY Recommendation Platform

**Course Project:** INT 257 - Next.js Development (CA 2 Submission)  
**Architecture:** Next.js 15 App Router • React 19 • JavaScript • Tailwind CSS • Supabase • Google Gemini API • Recharts • Lucide React

---

## 🌟 Executive Overview

**CareerPath AI** is an enterprise-grade career intelligence and vocational upskilling platform developed for engineering, polytechnic, and undergraduate students across India.

The platform bridges academic education with the Government of India's flagship skilling initiatives under the **Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)** and **Skill India Digital Hub**. Students upload their academic PDF resumes, select their desired technology occupation, and the system executes real-time AI skill extraction and transparent mathematical gap analysis to map them directly to government-subsidized qualification packs (QPs) and accredited training centres.

---

## 🛠️ Mandatory Tech Stack

- **Framework:** Next.js 15 (App Router with JavaScript)
- **Frontend:** React 19 & Tailwind CSS
- **Database & Storage:** Supabase PostgreSQL Database with Row Level Security (RLS) & Private Storage
- **Authentication:** Supabase Auth & Local Session Management
- **AI Intelligence:** Google Gemini Generative AI (`gemini-1.5-flash`)
- **PDF Extraction:** Server-side `pdf-parse` buffer processor
- **Data Visualizations:** Recharts (Radar Chart & Competency Metrics)
- **Iconography:** Lucide React

---

## 🚀 Core Functional Modules

### 1. Resume Upload & PDF Parsing (`/dashboard/resume`)
- Validates file type (`application/pdf`) and size limit (max 5MB).
- Extracts raw textual content using private server-side buffer decoders.
- Handles corrupted, empty, or scanned documents gracefully with appropriate alerts.
- Provides immediate text preview and sample resume loading for instant testing.

### 2. Google Gemini AI Resume Analysis (`/api/ai/analyze-resume`)
- Calls Google Gemini 1.5 Flash using strict JSON schema constraints.
- Categorizes resume data into:
  - Technical Skills & Tools
  - Programming Languages
  - Frameworks & Libraries
  - Databases & Storage
  - Soft Skills & Leadership
  - Educational Degrees & Institutions
  - Projects with Technologies Used
- Guaranteed anti-hallucination guardrails with integrated deterministic heuristic fallback parser.

### 3. Target Occupation Benchmarking (`/dashboard/career`)
- Features 10+ industry-standard tech occupations benchmarked against IT-ITeS Sector Skill Council qualification standards:
  1. Full Stack Developer (`SSC/Q0509`, NSQF Level 6)
  2. Frontend Developer (`SSC/Q0503`, NSQF Level 5)
  3. Backend Developer (`SSC/Q0508`, NSQF Level 6)
  4. Software Developer (`SSC/Q0508`, NSQF Level 5)
  5. Data Analyst (`SSC/Q0401`, NSQF Level 5)
  6. Data Scientist (`SSC/Q8115`, NSQF Level 7)
  7. Cybersecurity Analyst (`SSC/Q0901`, NSQF Level 5)
  8. Cloud Engineer (`SSC/Q8104`, NSQF Level 6)
  9. Database Administrator (`SSC/Q0110`, NSQF Level 5)
  10. Network Administrator (`SSC/Q0903`, NSQF Level 4)
- Searchable by title, category, salary range, and required skills.

### 4. Deterministic Skill Gap Analysis (`/dashboard/analysis`)
- Strictly implements the required mathematical formula in JavaScript:
  $$\text{Skill Match Percentage} = \left(\frac{\text{Number of Matching Required Skills}}{\text{Total Required Skills}}\right) \times 100$$
- Displays live step-by-step arithmetic for academic evaluation (e.g. $(8 / 12) \times 100 = 66.67\% \rightarrow 67\%$).
- Categorizes competencies into:
  - **Matching Required Skills** (Verified on resume)
  - **Missing Skills to Bridge** (Target gaps)
  - **Additional Skills** (Bonus competencies)
- Multi-dimensional competency radar chart and personalized 3-step action roadmap.

### 5. PMKVY Training Recommendations (`/dashboard/training-programs`)
- Maps the candidate's exact missing skills to verified Short Term Training (STT) programs.
- Displays official Sector Skill Council, Qualification Pack (QP) code, NSQF level, duration (in hours and months), eligibility criteria, and 100% government subsidy status.
- Direct links to the unified Skill India Digital portal.

### 6. Accredited Training Centre Directory (`/dashboard/training-centres` & `/training-centres`)
- Comprehensive directory of verified **Pradhan Mantri Kaushal Kendras (PMKK)** across major tech clusters:
  - New Delhi (Okhla Industrial Area)
  - Bengaluru (Electronic City)
  - Hyderabad (Cyberabad / Madhapur)
  - Pune (Hinjawadi IT Park)
  - Noida (Sector 62 Institutional Area)
  - Chennai (Guindy)
  - Kolkata (Salt Lake Sector V)
  - Jaipur (Sitapura Industrial Area)
- Search by centre name, city, address, or state. Filter by available PMKVY courses.
- Modal inspection showing verified physical addresses, phone numbers, email, and laboratory equipment.

### 7. Government Schemes Repository (`/dashboard/schemes` & `/pmkvy`)
- Comprehensive guides for:
  - **PMKVY 4.0** (Short Term Training, RPL, Special Projects)
  - **Skill India Digital Hub (SIDH)**
  - **National Apprenticeship Promotion Scheme (NAPS)** with Direct Benefit Transfer (DBT) stipends
  - **FutureSkills PRIME** (MeitY & NASSCOM emerging technology incentives)

### 8. Student Profile & Audit History (`/dashboard/profile`)
- View and edit student personal records (Name, College, Degree, Year of Study, Contact number).
- Change target career track with live re-computation.
- Track historical audit progression over time.

---

## 🗄️ Database Architecture & Supabase Setup

The application includes a complete PostgreSQL schema in [`lib/supabase/schema.sql`](file:///d:/CA1%20PROJECT%20INT%20257/lib/supabase/schema.sql).

### Tables Created:
1. `profiles` - Student academic profiles linked to `auth.users`
2. `resumes` - Uploaded resume metadata, file sizes, and extracted text
3. `occupations` - 10+ standard occupations with salary and QP codes
4. `skills` - Master repository of technical and soft skills
5. `resume_skills` - Junction table of skills extracted per resume
6. `occupation_skills` - Junction table of required skills per occupation
7. `skill_gap_analyses` - Historical calculation results, percentages, and readiness tiers
8. `training_programs` - Verified PMKVY 4.0 courses with NSQF alignments
9. `training_centres` - Accredited PMKK training centres and lab facilities
10. `recommendations` - Tailored training programs mapped per analysis

### How to Apply SQL in Supabase:
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open **SQL Editor** $\rightarrow$ **New Query**.
3. Copy the entire contents of [`lib/supabase/schema.sql`](file:///d:/CA1%20PROJECT%20INT%20257/lib/supabase/schema.sql) and paste it into the editor.
4. Click **Run**.
5. In the **Storage** section, create a private bucket named `resumes`.

---

## ⚡ Quick Start & Local Execution

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
GEMINI_API_KEY=your-gemini-api-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
*(Note: If left blank, CareerPath AI seamlessly falls back to its built-in offline session store and deterministic heuristic parser, allowing 100% full testing even without external API keys!)*

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build and Run for Production
```bash
npm run build
npm run start
```

---

## 🧪 Testing Checklist

- [x] Student registration & login (`/login` and `/register`)
- [x] One-click Examiner Demo Login on login page
- [x] PDF resume upload with file size & type validation (`/dashboard/resume`)
- [x] Real-time PDF text parsing via server route handlers
- [x] Gemini AI skill extraction with structured JSON output
- [x] Occupation selection across 10+ standard roles (`/dashboard/career`)
- [x] Deterministic calculation formula: `(Matching / Required) * 100` (`/dashboard/analysis`)
- [x] Recharts competency radar visualization (`/dashboard`)
- [x] PMKVY 4.0 training recommendations mapped to missing skills (`/dashboard/training-programs`)
- [x] Training centre directory with state, program, and keyword filters (`/training-centres`)
- [x] Verified Government schemes repository with application workflows (`/pmkvy`)
- [x] Responsive design tested across desktop, tablet, and mobile viewports
- [x] Zero build warnings or errors across all 19 static/dynamic pages
