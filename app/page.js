"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Target,
  BarChart3,
  Award,
  Building2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers,
  GraduationCap,
  Calculator,
  ChevronDown,
  Check,
  Star,
  Users,
  Compass
} from "lucide-react";
import { OCCUPATIONS } from "@/lib/data/occupations";
import { PMKVY_PROGRAMS } from "@/lib/data/pmkvy-programs";
import { AuthProvider, useAuth } from "@/lib/supabase/auth-context";

const DEMO_PREVIEWS = {
  "full-stack": {
    title: "Full Stack Developer",
    qpCode: "SSC/Q0509",
    nsqf: "Level 6",
    matchPercentage: 67,
    formulaText: "(8 / 12) × 100 = 66.7% → 67%",
    readiness: "Intermediate Upskilling Ready",
    matchedSkills: ["JavaScript", "React.js", "HTML5", "CSS3", "Tailwind CSS", "Express.js", "MongoDB", "Git"],
    missingSkills: ["Docker", "SQL Query Tuning", "System Architecture", "RESTful Security"],
    recommendedCourse: "Full Stack Developer Specialization (STT)",
    courseDetails: "400 Hours • 100% Free PMKVY 4.0 Grant • NCVET Certificate"
  },
  "data-analyst": {
    title: "Data Analyst",
    qpCode: "SSC/Q0401",
    nsqf: "Level 5",
    matchPercentage: 78,
    formulaText: "(7 / 9) × 100 = 77.8% → 78%",
    readiness: "High Industry Readiness",
    matchedSkills: ["Python", "SQL", "Excel", "Pandas", "Data Cleaning", "Data Visualization", "Git"],
    missingSkills: ["Power BI Advanced DAX", "Tableau Server"],
    recommendedCourse: "Associate - Data Analytics (STT)",
    courseDetails: "320 Hours • NSDC Accredited • Placement Support"
  },
  "cloud-engineer": {
    title: "Cloud Engineer",
    qpCode: "SSC/Q8104",
    nsqf: "Level 6",
    matchPercentage: 56,
    formulaText: "(5 / 9) × 100 = 55.6% → 56%",
    readiness: "Foundational Upskilling Stage",
    matchedSkills: ["Linux", "Git", "Bash Scripting", "Docker", "Basic AWS"],
    missingSkills: ["Kubernetes Cluster Ops", "Terraform IaC", "CI/CD Pipelines", "Cloud VPC Networking"],
    recommendedCourse: "Cloud Application Developer",
    courseDetails: "380 Hours • Virtual Cloud Lab Access • Industry 4.0 Focus"
  },
  "cybersecurity": {
    title: "Cybersecurity Analyst",
    qpCode: "SSC/Q0901",
    nsqf: "Level 5",
    matchPercentage: 62,
    formulaText: "(5 / 8) × 100 = 62.5% → 63%",
    readiness: "Intermediate SOC Ready",
    matchedSkills: ["Linux", "Network Security", "Cryptography", "Firewalls", "Wireshark"],
    missingSkills: ["SIEM Splunk Incident Response", "Vulnerability Assessment", "Ethical Hacking Penetration"],
    recommendedCourse: "Cyber Security Associate / SOC Analyst",
    courseDetails: "350 Hours • Cyber Range Lab Simulation • MeitY Funded"
  }
};

const FAQS = [
  {
    q: "How does the AI extract skills from my resume?",
    a: "When you upload a PDF resume, our server parses raw textual buffers securely. The text is passed to Google Gemini 1.5 Flash with strict JSON schema constraints. The AI isolates technical languages, frameworks, databases, and projects explicitly mentioned in your document without inventing missing skills."
  },
  {
    q: "How is the Skill Match Percentage calculated?",
    a: "Unlike platforms that generate arbitrary scores, CareerPath AI uses a deterministic mathematical formula: (Number of Matching Required Skills / Total Required Skills) × 100. For example, if a Full Stack role requires 12 skills and your resume demonstrates 8, your verified match score is exactly 67%."
  },
  {
    q: "Are the PMKVY training courses really 100% free?",
    a: "Yes. Under the Ministry of Skill Development and Entrepreneurship's PMKVY 4.0 Short Term Training (STT) scheme, course fees and assessment costs are 100% government sponsored for eligible Indian youth and college students. Successful candidates also receive NCVET-aligned certifications."
  },
  {
    q: "Can I test the application without uploading a real resume?",
    a: "Yes! On the login page and resume upload screen, we provide a 'One-Click Examiner Demo Login' and 'Load Sample Student Resume' button that automatically populates verified engineering student data for instant testing."
  }
];

function LandingContent() {
  const [activeTab, setActiveTab] = useState("full-stack");
  const [openFaq, setOpenFaq] = useState(0);
  const currentDemo = DEMO_PREVIEWS[activeTab];

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-100 selection:bg-indigo-600 selection:text-white">
      <Navbar />

      {/* Hero Section with Ambient Glows */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent border-b border-slate-800/80">
        {/* Ambient Blur Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/15 to-cyan-500/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-24 right-10 w-72 h-72 bg-indigo-500/10 blur-[90px] pointer-events-none rounded-full animate-ambient-blob" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-xs font-semibold text-indigo-300 shadow-lg shadow-indigo-950/50 hover:border-indigo-500 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
              <span>AI-Powered Career Guidance & PMKVY 4.0 Recommendation Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Bridge Your Resume Skills to{" "}
              <span className="shimmer-text">Government PMKVY</span>{" "}
              Opportunities.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              Upload your engineering resume, select your target tech occupation, and let AI calculate your exact skill gaps. Discover government-funded PMKVY courses and certified PMKK training centres.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <Link href="/dashboard/resume">
                <Button variant="primary" size="lg" icon={Sparkles} className="w-full sm:w-auto shadow-xl shadow-indigo-600/30">
                  Upload Resume for Free Analysis
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="secondary" size="lg" icon={ArrowRight} className="w-full sm:w-auto">
                  Launch Interactive Demo Dashboard
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Free Govt. Sponsored</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>NCVET NSQF Aligned</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Formula: (Matched / Required) × 100</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Demo Widget */}
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="rounded-2xl bg-slate-900/90 p-2 sm:p-3 shadow-2xl border border-indigo-500/30 shadow-indigo-500/10 backdrop-blur-md">
              <div className="bg-slate-950 rounded-xl p-5 sm:p-7 border border-slate-800 text-slate-200">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="ml-2 font-mono text-[11px] text-slate-400">
                      interactive-engine // live-matrix-simulator
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono text-emerald-400">
                      Try clicking occupations below:
                    </span>
                  </div>
                </div>

                {/* Interactive Occupation Selector Tabs */}
                <div className="flex flex-wrap gap-2 pt-4 pb-2">
                  {[
                    { id: "full-stack", label: "Full Stack Developer" },
                    { id: "data-analyst", label: "Data Analyst" },
                    { id: "cloud-engineer", label: "Cloud Engineer" },
                    { id: "cybersecurity", label: "Cybersecurity Analyst" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        activeTab === tab.id
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40 scale-105"
                          : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Dynamic Demo Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  {/* Card 1: Target Benchmarks */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-mono uppercase text-indigo-400 font-bold">
                        Target Benchmarks
                      </p>
                      <h4 className="text-base font-bold text-white mt-1">
                        {currentDemo.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1">
                        QP Code: {currentDemo.qpCode} • {currentDemo.nsqf}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800">
                      <span className="text-[11px] text-slate-400 block mb-1">
                        Verified Resume Skills:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {currentDemo.matchedSkills.slice(0, 4).map((s) => (
                          <span
                            key={s}
                            className="px-1.5 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-800 text-[10px] font-mono flex items-center gap-1"
                          >
                            <Check className="w-2.5 h-2.5" /> {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Deterministic Match Math */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                        Match Percentage Formula
                      </p>
                      <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                        {currentDemo.matchPercentage}%
                      </div>
                      <p className="text-[11px] font-mono text-slate-300 mt-1">
                        {currentDemo.formulaText}
                      </p>
                      <span className="inline-block mt-2 px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-semibold">
                        {currentDemo.readiness}
                      </span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800">
                      <span className="text-[11px] text-amber-400 block mb-1">
                        Missing Competencies:
                      </span>
                      <p className="text-[11px] text-slate-300 truncate">
                        {currentDemo.missingSkills.join(", ")}
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Mapped PMKVY Training Course */}
                  <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-900/60 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-mono uppercase text-indigo-300 font-bold">
                        Mapped PMKVY 4.0 Program
                      </p>
                      <h4 className="text-sm font-bold text-white mt-1 leading-snug">
                        {currentDemo.recommendedCourse}
                      </h4>
                      <p className="text-[11px] text-indigo-200/80 mt-1">
                        {currentDemo.courseDetails}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-indigo-900/60">
                      <Link href="/dashboard">
                        <Button
                          variant="primary"
                          size="sm"
                          icon={Sparkles}
                          className="w-full text-xs shadow-md"
                        >
                          Test In Full Dashboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Visual Workflow */}
      <section className="py-20 bg-[#030712]/40 backdrop-blur-xs border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Transparent Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              How CareerPath AI Operates
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Transforming your academic resume into verified government training pathways in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card hover className="p-6 border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-lg shadow-indigo-600/30">
                1
              </div>
              <h3 className="text-base font-bold text-white">Upload Student Resume</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Upload your PDF resume. Our private server extractor decodes text safely and Gemini AI extracts verified programming languages, tools, frameworks, and projects without hallucination.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-1.5 text-[11px] text-indigo-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Private PDF text buffer • Max 5MB</span>
              </div>
            </Card>

            {/* Step 2 */}
            <Card hover className="p-6 border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-lg shadow-indigo-600/30">
                2
              </div>
              <h3 className="text-base font-bold text-white">Deterministic Gap Analysis</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Select your target occupation. The system executes our pure JavaScript formula: <br />
                <code className="text-indigo-400 font-mono font-bold">(Matched / Total) × 100</code> to identify exact missing competencies.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-1.5 text-[11px] text-indigo-400 font-semibold">
                <Calculator className="w-3.5 h-3.5 text-indigo-400" />
                <span>Transparent math • Recharts Radar</span>
              </div>
            </Card>

            {/* Step 3 */}
            <Card hover className="p-6 border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-lg shadow-indigo-600/30">
                3
              </div>
              <h3 className="text-base font-bold text-white">PMKVY & Centre Mapping</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Discover government-funded PMKVY 4.0 courses that bridge your exact missing skills, complete with Qualification Pack (QP) codes and nearest accredited PMKK training centres.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-1.5 text-[11px] text-indigo-400 font-semibold">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                <span>Verified PMKK centres • Skill India link</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 10+ Standard Occupations Grid */}
      <section className="py-20 bg-[#030712]/50 backdrop-blur-xs border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Industry Alignment
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                10+ Industry Standard Tech Occupations
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Benchmarked against IT-ITeS Sector Skill Council qualification packs.
              </p>
            </div>
            <Link href="/dashboard/career" className="mt-4 md:mt-0">
              <Button variant="secondary" size="sm" icon={ChevronRight}>
                View All Occupations
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OCCUPATIONS.slice(0, 8).map((occ) => (
              <Card key={occ.id} hover className="p-5 border-slate-800">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>{occ.category}</span>
                  <span className="font-bold text-indigo-400">{occ.qpCode}</span>
                </div>
                <h4 className="text-base font-bold text-white">{occ.title}</h4>
                <p className="text-xs text-emerald-400 font-bold mt-1">{occ.averageSalary}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {occ.requiredSkills.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-mono"
                    >
                      {s}
                    </span>
                  ))}
                  <span className="text-[10px] text-slate-500 self-center">
                    +{occ.requiredSkills.length - 3}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-[#030712]/40 backdrop-blur-xs border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/60"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4 hover:bg-slate-800/60 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180 text-indigo-400" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-3 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Footer Banner */}
      <section className="py-16 bg-gradient-to-r from-slate-950/80 via-indigo-950/60 to-slate-950/80 backdrop-blur-md text-white border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Start Your Upskilling Journey Today
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Ready to Discover Your Skill Gaps and Map to PMKVY Programs?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Join thousands of engineering students discovering free government-funded skill certifications aligned with top tech careers.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register">
              <Button variant="primary" size="lg" icon={Sparkles} className="shadow-xl shadow-indigo-600/40">
                Create Free Student Account
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg" icon={ArrowRight}>
                Try Instant Demo Mode
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function LandingPage() {
  return (
    <AuthProvider>
      <LandingContent />
    </AuthProvider>
  );
}
