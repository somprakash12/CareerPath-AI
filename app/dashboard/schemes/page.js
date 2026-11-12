"use client";

import React from "react";
import SchemeCard from "@/components/training/SchemeCard";
import { GOVERNMENT_SCHEMES } from "@/lib/data/government-schemes";
import { Landmark, ShieldCheck, ExternalLink } from "lucide-react";
import Button from "@/components/ui/Button";

export default function DashboardSchemesPage() {
  return (
    <div className="space-y-6">
      {/* Title Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Landmark className="w-5 h-5 text-indigo-400" />
            Government Skilling Schemes & Incentives
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Authoritative guidelines for PMKVY 4.0, Skill India Digital Hub, NAPS stipend allowances, and FutureSkills PRIME.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-center shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>MSDE & MeitY Guidelines</span>
        </div>
      </div>

      {/* Schemes List */}
      <div className="space-y-6">
        {GOVERNMENT_SCHEMES.map((scheme) => (
          <SchemeCard key={scheme.id} scheme={scheme} />
        ))}
      </div>
    </div>
  );
}
