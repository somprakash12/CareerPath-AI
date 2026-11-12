"use client";

import React, { useState } from "react";
import ProgramCard from "@/components/training/ProgramCard";
import { PMKVY_PROGRAMS } from "@/lib/data/pmkvy-programs";
import { useAuth } from "@/lib/supabase/auth-context";
import { Award, ShieldCheck, Filter, Search, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function TrainingProgramsPage() {
  const { skillGap } = useAuth();
  const [filterMode, setFilterMode] = useState("mapped");
  const [searchTerm, setSearchTerm] = useState("");

  const recommendedList = skillGap?.recommendedPrograms || [];

  const displayList =
    filterMode === "mapped"
      ? recommendedList.length > 0
        ? recommendedList
        : PMKVY_PROGRAMS
      : PMKVY_PROGRAMS;

  const filteredPrograms = displayList.filter((p) => {
    const q = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.sector.toLowerCase().includes(q) ||
      p.qpCode.toLowerCase().includes(q) ||
      p.skillsCovered.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Title Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            PMKVY 4.0 Training Recommendations
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Government-funded Short Term Training (STT) programs mapped directly to address your identified skill gaps.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-center shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Free Govt. Sponsored</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search programs, QP codes, or skills covered..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 shadow-inner"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterMode("mapped")}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              filterMode === "mapped"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${filterMode === "mapped" ? "text-white" : "text-indigo-400"}`} />
            <span>Mapped to Missing Gaps ({recommendedList.length})</span>
          </button>
          <button
            onClick={() => setFilterMode("all")}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              filterMode === "all"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span>All Courses ({PMKVY_PROGRAMS.length})</span>
          </button>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPrograms.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            highlighted={Boolean(program.coveredMissingSkills?.length)}
          />
        ))}
      </div>
    </div>
  );
}
