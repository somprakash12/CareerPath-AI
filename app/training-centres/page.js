"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CentreCard from "@/components/training/CentreCard";
import { TRAINING_CENTRES } from "@/lib/data/training-centres";
import { PMKVY_PROGRAMS } from "@/lib/data/pmkvy-programs";
import { Search, Building2, MapPin, Filter } from "lucide-react";
import { AuthProvider } from "@/lib/supabase/auth-context";

function TrainingCentresContent() {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState("all");

  const states = [
    "all",
    "Delhi",
    "Karnataka",
    "Telangana",
    "Maharashtra",
    "Uttar Pradesh",
    "Tamil Nadu",
    "West Bengal",
    "Rajasthan"
  ];

  const filteredCentres = TRAINING_CENTRES.filter((c) => {
    const matchesState = selectedState === "all" || c.state === selectedState;
    const matchesProgram =
      selectedProgram === "all" || (c.activePrograms && c.activePrograms.includes(selectedProgram));
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.state.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase());
    return matchesState && matchesProgram && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Verified Physical Infrastructure
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Accredited PMKK Training Centres
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Find official Pradhan Mantri Kaushal Kendra (PMKK) model training centres near your college or hometown with verified laboratory facilities and certified trainers.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-lg">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by centre name, city, address, or landmark..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 shadow-inner"
              />
            </div>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 shadow-inner"
            >
              <option value="all" className="bg-slate-900 text-white">All Indian States</option>
              {states.filter((s) => s !== "all").map((s) => (
                <option key={s} value={s} className="bg-slate-900 text-white">
                  {s}
                </option>
              ))}
            </select>

            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 shadow-inner"
            >
              <option value="all" className="bg-slate-900 text-white">All PMKVY Programs</option>
              {PMKVY_PROGRAMS.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>Showing {filteredCentres.length} of {TRAINING_CENTRES.length} accredited training centres</span>
            {(search || selectedState !== "all" || selectedProgram !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedState("all");
                  setSelectedProgram("all");
                }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Centres Grid */}
        {filteredCentres.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredCentres.map((centre) => (
              <CentreCard key={centre.id} centre={centre} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 bg-slate-900 rounded-2xl border border-slate-800">
            <Building2 className="w-10 h-10 mx-auto text-slate-500 mb-2" />
            <p className="text-sm font-bold text-white">No training centres found</p>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search criteria or resetting filters.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function TrainingCentresPage() {
  return (
    <AuthProvider>
      <TrainingCentresContent />
    </AuthProvider>
  );
}
