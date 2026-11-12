"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, Sparkles, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { useAuth, AuthProvider } from "@/lib/supabase/auth-context";
import { OCCUPATIONS } from "@/lib/data/occupations";

function RegisterInner() {
  const router = useRouter();
  const { register } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [password, setPassword] = useState("");
  const [targetOccupationId, setTargetOccupationId] = useState("full-stack-developer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register(email, password, fullName, college, targetOccupationId);
      router.push("/dashboard");
    } catch (err) {
      console.warn("Registration attempt failed:", err?.message || err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const occupationOptions = OCCUPATIONS.map((o) => ({
    value: o.id,
    label: `${o.title} (${o.category})`
  }));

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-transparent text-slate-100 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg space-y-6 relative">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">CareerPath AI</span>
          </Link>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Create Student Account</h2>
          <p className="text-xs text-slate-400">
            Sign up to benchmark your resume skills against national qualification standards
          </p>
        </div>

        {/* Register Card */}
        <Card className="p-6 sm:p-8 border-slate-800 bg-slate-900/90 shadow-2xl shadow-black/60">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Full Name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Aman Sharma"
              />
              <Input
                label="College / University"
                type="text"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. DTU / Lovely Professional Univ"
              />
            </div>

            <Input
              label="Student Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@college.edu.in"
            />

            <Input
              label="Password (min 6 characters)"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <Select
              label="Target Tech Occupation"
              options={occupationOptions}
              value={targetOccupationId}
              onChange={(e) => setTargetOccupationId(e.target.value)}
              helperText="You can change your target occupation anytime in your dashboard."
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="w-full mt-2 shadow-lg shadow-indigo-600/30"
            >
              Complete Registration & Enter Dashboard
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline">
              Sign In
            </Link>
          </div>
        </Card>

        {/* Back Link */}
        <div className="text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← Back to CareerPath AI Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <AuthProvider>
      <RegisterInner />
    </AuthProvider>
  );
}

