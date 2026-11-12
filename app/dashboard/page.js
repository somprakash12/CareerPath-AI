"use client";

import React from "react";
import Link from "next/link";
import StatsGrid from "@/components/dashboard/StatsGrid";
import SkillRadarChart from "@/components/dashboard/SkillRadarChart";
import SkillComparisonCard from "@/components/dashboard/SkillComparisonCard";
import ProgramCard from "@/components/training/ProgramCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  FileText,
  Target,
  Sparkles,
  ArrowRight,
  Award,
  History,
  Building2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/lib/supabase/auth-context";

export default function DashboardOverviewPage() {
  const { user, skillGap } = useAuth();

  const history = user?.analysisHistory || [];
  const topRecommended = (skillGap?.recommendedPrograms || []).slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 relative">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold">
              Student Career Intelligence
            </span>
            <span className="text-slate-400 text-xs">Batch: {user?.yearOfStudy || "3rd Year"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Welcome back, {user?.fullName || "Student Candidate"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {user?.college || "Engineering College"} • Target Role:{" "}
            <strong className="text-indigo-400">{skillGap?.occupation?.title || "Full Stack Developer"}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-center relative">
          <Link href="/dashboard/career">
            <Button variant="outline" size="sm" icon={Target}>
              Switch Role
            </Button>
          </Link>
          <Link href="/dashboard/resume">
            <Button variant="primary" size="sm" icon={FileText}>
              Manage Resume
            </Button>
          </Link>
        </div>
      </div>

      {/* 4-Column Key Metrics Stats Grid */}
      <StatsGrid skillGap={skillGap} />

      {/* Visual Analytics Row: Radar Chart & Skill Gap Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillRadarChart skillGap={skillGap} />
        <SkillComparisonCard skillGap={skillGap} />
      </div>

      {/* Recommended PMKVY Training Courses */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              Top Recommended PMKVY 4.0 Programs
            </h3>
            <p className="text-xs text-slate-400">
              Government-subsidized courses mapped to resolve your specific skill deficits
            </p>
          </div>
          <Link href="/dashboard/training-programs">
            <Button variant="ghost" size="sm" icon={ArrowRight}>
              View All Courses
            </Button>
          </Link>
        </div>

        {topRecommended.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topRecommended.map((program) => (
              <ProgramCard key={program.id} program={program} highlighted />
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-xs text-slate-400">
            No specific course recommendations found for current selection.
          </Card>
        )}
      </div>

      {/* Recent Analysis History Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-400" />
              <CardTitle>Recent Skill Analysis History</CardTitle>
            </div>
            <CardDescription>
              Track your skill progression across resume revisions and occupation targets
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3">Audit Date</th>
                  <th className="px-5 py-3">Target Occupation</th>
                  <th className="px-5 py-3">Match Percentage</th>
                  <th className="px-5 py-3">Matching Skills</th>
                  <th className="px-5 py-3">Missing Gaps</th>
                  <th className="px-5 py-3 text-right">Readiness Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {history.length > 0 ? (
                  history.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-3 text-slate-300 font-medium">{item.date}</td>
                      <td className="px-5 py-3 font-bold text-white">{item.occupationTitle}</td>
                      <td className="px-5 py-3">
                        <span className="font-extrabold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                          {item.matchPercentage}%
                        </span>
                      </td>
                      <td className="px-5 py-3 text-emerald-400 font-semibold">
                        {item.matchingCount} verified
                      </td>
                      <td className="px-5 py-3 text-amber-400 font-semibold">
                        {item.missingCount} deficits
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                          {item.readinessTier}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-6 text-center text-slate-400 italic">
                      No previous audit history. Upload a resume to create your first baseline record.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
