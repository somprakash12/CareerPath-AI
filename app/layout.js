import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import AmbientBackground from "@/components/layout/AmbientBackground";

export const metadata = {
  title: "CareerPath AI - AI-Powered Career Guidance & PMKVY Recommendation Platform",
  description:
    "Empowering engineering and vocational students with AI resume skill gap analysis, direct mapping to PMKVY 4.0 courses, certified training centres, and government skill initiatives.",
  keywords: [
    "CareerPath AI",
    "PMKVY",
    "Skill India",
    "Skill Gap Analysis",
    "Resume AI Analyzer",
    "NSDC",
    "Next.js App Router"
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-[#030712] text-slate-100 antialiased scroll-smooth dark">
      <body className="min-h-full flex flex-col font-sans bg-[#030712] text-slate-100 selection:bg-indigo-600 selection:text-white relative">
        <ToastProvider>
          <AmbientBackground />
          <div className="relative z-10 flex min-h-full flex-col">
            {children}
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
