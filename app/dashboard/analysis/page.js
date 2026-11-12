"use client";

import React from "react";
import SkillGapMatrix from "@/components/analysis/SkillGapMatrix";
import { useAuth } from "@/lib/supabase/auth-context";
import { BarChart3, Calculator, Award } from "lucide-react";

export default function AnalysisPage() {
  const { skillGap } = useAuth();

  return (
    <div className="space-y-6">
      {/* Title Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            Skill Gap Matrix & Evaluation
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Transparent mathematical audit comparing your resume skills with required competencies of{" "}
            <strong className="text-white">{skillGap?.occupation?.title || "Target Occupation"}</strong>.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-center shadow-xs">
          <Calculator className="w-4 h-4 text-indigo-400" />
          <span>Formula: (Matched / Required) × 100</span>
        </div>
      </div>

      {/* Main Matrix Component */}
      <SkillGapMatrix skillGap={skillGap} />
    </div>
  );
}
