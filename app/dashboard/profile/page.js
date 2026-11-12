"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/supabase/auth-context";
import { OCCUPATIONS } from "@/lib/data/occupations";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  User,
  GraduationCap,
  FileText,
  Target,
  Sparkles,
  Save,
  CheckCircle2,
  RotateCcw,
  History
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function ProfilePage() {
  const { user, updateProfile, setTargetOccupation, loadSampleResume, skillGap } = useAuth();
  const { addToast } = useToast();

  const [fullName, setFullName] = useState(user?.fullName || "Aman Sharma");
  const [email, setEmail] = useState(user?.email || "aman.student@dtu.ac.in");
  const [college, setCollege] = useState(user?.college || "Delhi Technological University (DTU)");
  const [degree, setDegree] = useState(user?.degree || "B.Tech Computer Science & Engineering");
  const [yearOfStudy, setYearOfStudy] = useState(user?.yearOfStudy || "3rd Year (Batch 2027)");
  const [phone, setPhone] = useState(user?.phone || "+91 98765 43210");
  const [targetOccId, setTargetOccId] = useState(user?.targetOccupationId || "full-stack-developer");

  const [savedMessage, setSavedMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setCollege(user.college || "");
      setDegree(user.degree || "");
      setYearOfStudy(user.yearOfStudy || "");
      setPhone(user.phone || "");
      setTargetOccId(user.targetOccupationId || "full-stack-developer");
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      fullName,
      email,
      college,
      degree,
      yearOfStudy,
      phone,
      targetOccupationId: targetOccId
    });
    setSavedMessage("Student profile updated successfully!");
    addToast("Student profile updated successfully!");
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const handleResetDemo = () => {
    loadSampleResume("sample-cs-student");
    setSavedMessage("Reset to verified sample student data!");
    addToast("Reset to sample student data!");
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const occOptions = OCCUPATIONS.map((o) => ({
    value: o.id,
    label: `${o.title} (${o.category})`
  }));

  return (
    <div className="space-y-6">
      {/* Title Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-400" />
            Student Profile & Academic Records
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your personal academic records, target career track, and reviewed AI analysis logs.
          </p>
        </div>

        <button
          onClick={handleResetDemo}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 hover:scale-105 active:scale-95 transition-all shadow-md self-start sm:self-center cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {savedMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{savedMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Editable Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-slate-800">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              Edit Personal & Academic Details
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="College / University"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  required
                />
                <Input
                  label="Degree Program"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Year of Study"
                  value={yearOfStudy}
                  onChange={(e) => setYearOfStudy(e.target.value)}
                  placeholder="e.g. 3rd Year"
                />
                <Input
                  label="Contact Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                />
              </div>

              <Select
                label="Target Tech Occupation Track"
                options={occOptions}
                value={targetOccId}
                onChange={(e) => setTargetOccId(e.target.value)}
              />

              <div className="pt-2">
                <Button type="submit" variant="primary" size="md" icon={Save}>
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </Card>

          {/* Analysis History */}
          <Card className="p-6 border-slate-800">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-400" />
              Historical Audit Progression
            </h3>
            {user?.analysisHistory && user.analysisHistory.length > 0 ? (
              <div className="space-y-2">
                {user.analysisHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-white">{item.occupationTitle}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                        {item.matchPercentage}%
                      </span>
                      <span className="text-slate-300 font-medium">{item.readinessTier}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No historical audits found.</p>
            )}
          </Card>
        </div>

        {/* Right Column: Status Overview */}
        <div className="space-y-6">
          {/* Active Target Card */}
          <Card className="p-5 border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Active Target Role
            </span>
            <h4 className="text-base font-bold text-white">
              {skillGap?.occupation?.title || "Full Stack Developer"}
            </h4>
            <div className="mt-2 text-xs text-slate-300 space-y-1">
              <p>
                <strong>QP Code:</strong> {skillGap?.occupation?.qpCode}
              </p>
              <p>
                <strong>NSQF:</strong> {skillGap?.occupation?.nsqfLevel}
              </p>
              <p>
                <strong>Average Salary:</strong> {skillGap?.occupation?.averageSalary}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Current Match:</span>
              <span className="text-base font-extrabold text-indigo-400">
                {skillGap?.matchPercentage}%
              </span>
            </div>
          </Card>

          {/* Active Resume Card */}
          <Card className="p-5 border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Attached Resume
            </span>
            {user?.resume ? (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-rose-400 shrink-0" />
                  <p className="text-xs font-semibold text-slate-200 truncate">
                    {user.resume.fileName}
                  </p>
                </div>
                <p className="text-[11px] text-slate-400">Size: {user.resume.fileSize}</p>
                <div className="pt-2">
                  <Link href="/dashboard/resume">
                    <Button variant="secondary" size="sm" className="w-full">
                      Manage Resume
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs text-slate-400 italic mb-3">No resume uploaded.</p>
                <Link href="/dashboard/resume">
                  <Button variant="primary" size="sm" className="w-full">
                    Upload Resume
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          {/* Extracted Skills Summary */}
          <Card className="p-5 border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              Extracted Skills ({user?.extractedSkills?.length || 0})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(user?.extractedSkills || []).slice(0, 10).map((skill) => (
                <Badge key={skill} variant="default" size="sm">
                  {skill}
                </Badge>
              ))}
              {(user?.extractedSkills?.length || 0) > 10 && (
                <span className="text-[10px] text-slate-400 self-center">
                  +{(user?.extractedSkills?.length || 0) - 10} more
                </span>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
