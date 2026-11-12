"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SchemeCard from "@/components/training/SchemeCard";
import { GOVERNMENT_SCHEMES } from "@/lib/data/government-schemes";
import { Landmark, ShieldCheck, CheckCircle2, ExternalLink, HelpCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { AuthProvider } from "@/lib/supabase/auth-context";

function PmkvyContent() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs font-bold shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official Government of India Schemes Repository</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Everything engineering and vocational students need to know about PMKVY 4.0, Skill India Digital Hub, NAPS corporate apprenticeships, and government-subsidized tech upskilling.
          </p>
        </div>

        {/* Quick Facts Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shadow-lg">
            <p className="text-3xl font-extrabold text-indigo-400">100% Free</p>
            <p className="text-xs font-medium text-slate-300 mt-1">Full Course & Assessment Grant</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shadow-lg">
            <p className="text-3xl font-extrabold text-indigo-400">NCVET Aligned</p>
            <p className="text-xs font-medium text-slate-300 mt-1">National Skills Qualifications (NSQF)</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shadow-lg">
            <p className="text-3xl font-extrabold text-indigo-400">DBT Stipends</p>
            <p className="text-xs font-medium text-slate-300 mt-1">Direct Benefit Transfer to Bank</p>
          </div>
        </div>

        {/* Schemes List */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Active Central Government Skilling Schemes
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              Verified Official Data
            </span>
          </div>

          <div className="space-y-6">
            {GOVERNMENT_SCHEMES.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </div>

        {/* Official External Link Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <h3 className="text-base font-bold">Have Questions About Skill India Registration?</h3>
            <p className="text-xs text-slate-400 mt-1">
              Visit the unified Skill India Digital platform or call the national candidate helpline at 1800-123-9626.
            </p>
          </div>
          <a
            href="https://www.skillindiadigital.gov.in"
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
            <Button variant="primary" size="md" icon={ExternalLink}>
              Visit skillindiadigital.gov.in
            </Button>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PmkvyPage() {
  return (
    <AuthProvider>
      <PmkvyContent />
    </AuthProvider>
  );
}
