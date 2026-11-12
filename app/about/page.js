"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Compass, ShieldCheck, Target, Award, Users, BookOpen, Layers } from "lucide-react";
import { AuthProvider } from "@/lib/supabase/auth-context";

function AboutContent() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            About The Initiative
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            About CareerPath AI
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            AI-Powered Career Guidance and PMKVY Training Recommendation Platform designed to bridge academic education with national vocational qualifications.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-slate-800 bg-slate-900/90">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-indigo-600/30">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Our Core Mission</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Every year, thousands of engineering and polytechnic students graduate with substantial theoretical knowledge but lack specific industry skills required by employers. Our mission is to provide every student with an accurate, deterministic audit of their competencies and immediately connect them to verified, government-funded PMKVY training programs.
            </p>
          </Card>

          <Card className="p-6 border-slate-800 bg-slate-900/90">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-white flex items-center justify-center mb-4 shadow-md">
              <Award className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Aligning with Skill India</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              We align our occupational benchmarks strictly with the National Skill Development Corporation (NSDC) and Sector Skill Councils (IT-ITeS SSC / NASSCOM). By utilizing official Qualification Pack (QP) codes and National Skills Qualifications Framework (NSQF) levels, we ensure students pursue recognized, verifiable credentials.
            </p>
          </Card>
        </div>

        {/* Academic Context */}
        <Card className="p-8 border-slate-800 bg-slate-900/90">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            Academic Foundation & Architecture
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              CareerPath AI was designed and developed as a complete full-stack web application for the <strong>INT 257 (Next.js) CA 2 project</strong>. It addresses a real-world socio-economic need: accelerating vocational skilling and youth employability under the Government of India’s flagship <em>Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)</em>.
            </p>
            <p>
              The platform utilizes modern architectural principles: Next.js App Router for server-rendered efficiency, Supabase PostgreSQL with Row Level Security for secure multi-tenant data isolation, Google Gemini Generative AI for structured resume intelligence, and deterministic JavaScript algorithms for transparent, audit-ready skill gap computations.
            </p>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

export default function AboutPage() {
  return (
    <AuthProvider>
      <AboutContent />
    </AuthProvider>
  );
}
