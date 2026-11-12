"use client";

import React from "react";
import OccupationSelector from "@/components/career/OccupationSelector";
import { Target, Award, ShieldCheck } from "lucide-react";

export default function CareerPage() {
  return (
    <div className="space-y-6">
      {/* Title Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            Target Occupation Benchmarks
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Choose your target tech occupation. Each role is benchmarked against IT-ITeS Sector Skill Council qualification standards.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-center shadow-xs">
          <Award className="w-4 h-4 text-indigo-400" />
          <span>NSQF Level 4 - 7 Standards</span>
        </div>
      </div>

      {/* Searchable Occupation Selector */}
      <OccupationSelector />
    </div>
  );
}
