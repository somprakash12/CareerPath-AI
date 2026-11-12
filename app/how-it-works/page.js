"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  FileText,
  Cpu,
  Calculator,
  Award,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { AuthProvider } from "@/lib/supabase/auth-context";

function HowItWorksContent() {
  const steps = [
    {
      step: "01",
      title: "PDF Resume Parsing & Ingestion",
      icon: FileText,
      description:
        "Students upload their standard PDF resume. The application securely handles the raw file via Next.js Route Handlers, validates MIME types, checks size constraints (max 5MB), and parses textual content using server-side buffer decoders without exposing private documents.",
      tech: "Next.js Route Handlers • Buffer Processing • Private Storage"
    },
    {
      step: "02",
      title: "Google Gemini AI Skill Extraction",
      icon: Cpu,
      description:
        "The extracted text is analyzed by Google Gemini Generative AI (gemini-1.5-flash) using strict prompt engineering and JSON schema constraints. The AI isolates programming languages, frameworks, databases, developer tools, soft skills, educational credentials, and projects without hallucination.",
      tech: "Google Gemini 1.5 Flash • Strict JSON Schema • Fallback Heuristic Parser"
    },
    {
      step: "03",
      title: "Occupation Benchmarking",
      icon: Award,
      description:
        "Students choose from 10+ standardized tech occupations (Full Stack Developer, Data Scientist, Cybersecurity Analyst, etc.). Each occupation is mapped to official National Occupational Standards (NOS), Qualification Pack (QP) codes, and National Skills Qualifications Framework (NSQF) levels.",
      tech: "IT-ITeS SSC Qualification Packs • NSQF Level 4 - 7 Standards"
    },
    {
      step: "04",
      title: "Deterministic Skill Gap Formula",
      icon: Calculator,
      description:
        "Rather than relying on arbitrary AI scores, the platform calculates skill alignment using a transparent JavaScript formula: Skill Match % = (Matching Required Skills / Total Required Skills) × 100. It separates possessed skills, deficit gaps, and bonus competencies.",
      tech: "Pure JavaScript Math • Punctuation-Resilient Matching • Recharts Radar"
    },
    {
      step: "05",
      title: "PMKVY Course & Training Centre Mapping",
      icon: Building2,
      description:
        "The system identifies verified PMKVY 4.0 Short Term Training (STT) courses that specifically cover the candidate's missing competencies. It directs the student to accredited Pradhan Mantri Kaushal Kendras (PMKK) with exact addresses, contact information, and registration steps.",
      tech: "Skill India Digital Hub Linkage • PMKK Directory • DBT Incentives"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Technical Architecture & Methodology
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            How The CareerPath AI Engine Works
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            A step-by-step breakdown of how your resume is parsed, benchmarked against national occupation qualifications, and mapped to government training programs.
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} hover className="p-6 border-slate-800 bg-slate-900/90">
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  <div className="flex items-center gap-3 md:flex-col md:items-center">
                    <span className="font-mono text-2xl font-extrabold text-indigo-400">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-700 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Icon className="w-6 h-6 text-indigo-400" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="pt-2">
                      <span className="inline-block px-3 py-1 rounded-lg bg-slate-950 text-[11px] font-mono text-slate-300 border border-slate-800">
                        {item.tech}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-indigo-500/30 text-center space-y-4 shadow-xl">
          <h3 className="text-xl font-bold text-white">Experience the Engine Live</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Test the pipeline with your own resume or use our instant student sample data.
          </p>
          <Link href="/dashboard/resume">
            <Button variant="primary" size="md" icon={Sparkles}>
              Launch Resume Analyzer
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <AuthProvider>
      <HowItWorksContent />
    </AuthProvider>
  );
}
