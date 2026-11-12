"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, Sparkles, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useAuth, AuthProvider } from "@/lib/supabase/auth-context";

function LoginInner() {
  const router = useRouter();
  const { login, isSupabaseConfigured } = useAuth();

  const [email, setEmail] = useState("aman.student@dtu.ac.in");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      console.warn("Login attempt failed:", err?.message || err);
      setError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setError(null);
    setLoading(true);
    try {
      await login("aman.student@dtu.ac.in", "demo123");
      router.push("/dashboard");
    } catch (err) {
      setError("Demo login error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-transparent text-slate-100 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">CareerPath AI</span>
          </Link>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Student Portal Login</h2>
          <p className="text-xs text-slate-400">
            Sign in to access your resume analysis, skill matrix, and PMKVY programs
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-6 sm:p-8 border-slate-800 bg-slate-900/90 shadow-2xl shadow-black/60">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <Input
              label="Student Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. yourname@college.edu.in"
            />

            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="w-full shadow-lg shadow-indigo-600/30"
            >
              Sign In to Dashboard
            </Button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400 mb-2.5 font-medium">Evaluating this project?</p>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon={Sparkles}
              className="w-full text-indigo-300 bg-indigo-950/40 hover:bg-indigo-900/60 border-indigo-800/80"
              onClick={handleQuickDemo}
              disabled={loading}
            >
              One-Click Examiner Demo Login
            </Button>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">
            Don't have a student account?{" "}
            <Link href="/register" className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline">
              Create an account
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

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginInner />
    </AuthProvider>
  );
}
