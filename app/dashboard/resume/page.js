"use client";

import React from "react";
import ResumeUploader from "@/components/resume/ResumeUploader";
import ExtractedSkillsViewer from "@/components/resume/ExtractedSkillsViewer";
import { useAuth } from "@/lib/supabase/auth-context";
import { FileText, Sparkles, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function ResumePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Title Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            Resume Upload & AI Intelligence Parser
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Upload your PDF resume to extract technical competencies, frameworks, databases, and projects using Google Gemini API.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-center shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Private PDF Extraction</span>
        </div>
      </div>

      {/* Upload Component */}
      <ResumeUploader />

      {/* Extracted Skills and Attributes View */}
      <div className="pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              AI Extracted Resume Intelligence
            </h3>
          </div>
          {user?.aiAnalysis && (
            <span className="text-xs text-indigo-300 bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-800 font-semibold shadow-2xs">
              Extracted via {user.aiAnalysis.extractedVia || "AI Engine"}
            </span>
          )}
        </div>

        <ExtractedSkillsViewer
          aiAnalysis={user?.aiAnalysis}
          rawText={user?.resume?.extractedText}
        />
      </div>
    </div>
  );
}
