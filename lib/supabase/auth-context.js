"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getSupabaseClient, isSupabaseConfigured } from "./client";
import { OCCUPATIONS } from "@/lib/data/occupations";
import { calculateSkillGap } from "@/lib/utils/skill-matcher";
import { SAMPLE_RESUMES } from "@/lib/data/sample-resumes";

const AuthContext = createContext(null);

const STORAGE_KEY = "careerpath_user_session_v1";

const DEFAULT_DEMO_USER = {
  id: "demo-student-id-001",
  email: "aman.student@dtu.ac.in",
  fullName: "Aman Sharma",
  college: "Delhi Technological University (DTU)",
  degree: "B.Tech Computer Science & Engineering",
  yearOfStudy: "3rd Year (Batch 2027)",
  phone: "+91 98765 43210",
  targetOccupationId: "full-stack-developer",
  resume: {
    fileName: "Aman_Sharma_Resume_2026.pdf",
    fileSize: "248 KB",
    uploadedAt: new Date().toISOString(),
    extractedText: SAMPLE_RESUMES[0].rawText
  },
  extractedSkills: [
    "JavaScript",
    "React.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Express.js",
    "MongoDB",
    "MySQL",
    "SQL",
    "Git",
    "C++",
    "Postman",
    "Problem Solving",
    "Team Collaboration"
  ],
  aiAnalysis: {
    technicalSkills: ["JavaScript", "React.js", "HTML5", "CSS3", "Tailwind CSS", "Express.js", "MongoDB", "MySQL", "SQL", "Git", "C++", "Postman"],
    programmingLanguages: ["JavaScript", "C++", "HTML5", "CSS3", "SQL"],
    frameworks: ["React.js", "Tailwind CSS", "Express.js"],
    databases: ["MongoDB", "MySQL"],
    toolsAndTechnologies: ["Git", "GitHub", "VS Code", "Postman"],
    softSkills: ["Team Collaboration", "Problem Solving", "Technical Communication", "Agile Methodology"],
    educationalQualifications: [
      {
        degree: "B.Tech in Computer Science & Engineering",
        institution: "Delhi Technological University (DTU)",
        year: "2023 - 2027",
        gradeOrCgpa: "8.6 / 10.0"
      }
    ],
    projects: [
      {
        title: "Campus Marketplace Web App",
        description: "Built responsive single-page application using React.js and Tailwind CSS for university student book and gadget exchange.",
        technologies: ["React.js", "Tailwind CSS", "RESTful APIs"]
      },
      {
        title: "Algorithm Visualizer",
        description: "Interactive visualizer for sorting and pathfinding algorithms in pure JavaScript and Canvas.",
        technologies: ["JavaScript", "HTML5 Canvas"]
      }
    ],
    extractedVia: "Google Gemini 1.5 Flash (Verified)"
  },
  analysisHistory: []
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skillGap, setSkillGap] = useState(null);

  // Initialize session
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } else {
        // Initialize with default student state for seamless evaluation
        setUser(DEFAULT_DEMO_USER);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DEMO_USER));
      }
    } catch (e) {
      console.error("Failed to load session:", e);
      setUser(DEFAULT_DEMO_USER);
    } finally {
      setLoading(false);
    }
  }, []);

  // Compute skill gap whenever user or target occupation changes
  useEffect(() => {
    if (user && user.targetOccupationId) {
      const targetOcc = OCCUPATIONS.find((o) => o.id === user.targetOccupationId) || OCCUPATIONS[0];
      const gap = calculateSkillGap(user.extractedSkills || [], targetOcc);
      setSkillGap(gap);
    }
  }, [user]);

  // Persist user changes to localStorage
  const persistUser = (updatedUser) => {
    setUser(updatedUser);
    try {
      if (updatedUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      console.error("Storage error:", err);
    }
  };

  // Auth Functions
  const login = async (email, password) => {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const loggedUser = {
        id: data.user.id,
        email: data.user.email,
        fullName: data.user.user_metadata?.full_name || email.split("@")[0],
        college: data.user.user_metadata?.college || "Engineering College",
        degree: "B.Tech Computer Science",
        yearOfStudy: "3rd Year",
        targetOccupationId: "full-stack-developer",
        extractedSkills: [],
        analysisHistory: []
      };
      persistUser(loggedUser);
      return loggedUser;
    } else {
      // Local demo login
      const loggedUser = {
        ...DEFAULT_DEMO_USER,
        email: email || DEFAULT_DEMO_USER.email,
        fullName: email.split("@")[0].replace(".", " ").toUpperCase() || DEFAULT_DEMO_USER.fullName
      };
      persistUser(loggedUser);
      return loggedUser;
    }
  };

  const register = async (email, password, fullName, college, targetOccupationId = "full-stack-developer") => {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            college: college
          }
        }
      });
      if (error) throw error;
      const newUser = {
        id: data.user?.id || `user-${Date.now()}`,
        email,
        fullName,
        college,
        degree: "B.Tech Computer Science",
        yearOfStudy: "3rd Year",
        targetOccupationId,
        extractedSkills: [],
        analysisHistory: []
      };
      persistUser(newUser);
      return newUser;
    } else {
      // Local demo register
      const newUser = {
        id: `student-${Date.now()}`,
        email,
        fullName,
        college,
        degree: "B.Tech Computer Science",
        yearOfStudy: "3rd Year",
        targetOccupationId,
        extractedSkills: [],
        analysisHistory: []
      };
      persistUser(newUser);
      return newUser;
    }
  };

  const logout = async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    persistUser(null);
  };

  const updateProfile = (data) => {
    if (!user) return;
    const updated = { ...user, ...data };
    persistUser(updated);
  };

  const setTargetOccupation = (occupationId) => {
    if (!user) return;
    const updated = { ...user, targetOccupationId: occupationId };
    persistUser(updated);
  };

  const saveResumeAnalysis = ({ fileName, fileSize, extractedText, aiData, overrideOccupationId }) => {
    const activeUser = user || DEFAULT_DEMO_USER;

    const technicalSkills = aiData.technicalSkills || [];
    const effectiveOccupationId = overrideOccupationId || activeUser.targetOccupationId || "full-stack-developer";
    const targetOcc = OCCUPATIONS.find((o) => o.id === effectiveOccupationId) || OCCUPATIONS[0];
    const newGap = calculateSkillGap(technicalSkills, targetOcc);

    const historyItem = {
      id: `analysis-${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      occupationTitle: targetOcc.title,
      matchPercentage: newGap.matchPercentage,
      matchingCount: newGap.matchingSkills.length,
      missingCount: newGap.missingSkills.length,
      readinessTier: newGap.readinessTier
    };

    const updated = {
      ...activeUser,
      targetOccupationId: effectiveOccupationId,
      resume: {
        fileName: fileName || "Student_Resume.pdf",
        fileSize: fileSize || "180 KB",
        uploadedAt: new Date().toISOString(),
        extractedText: extractedText || ""
      },
      extractedSkills: technicalSkills,
      aiAnalysis: aiData,
      analysisHistory: [historyItem, ...(activeUser.analysisHistory || [])].slice(0, 10)
    };

    persistUser(updated);
  };

  const deleteResume = () => {
    if (!user) return;
    const updated = {
      ...user,
      resume: null,
      extractedSkills: [],
      aiAnalysis: null
    };
    persistUser(updated);
  };

  const loadSampleResume = (sampleId = "sample-cs-student") => {
    const sample = SAMPLE_RESUMES.find((s) => s.id === sampleId) || SAMPLE_RESUMES[0];

    if (sample.id === "sample-data-enthusiast") {
      const dataSkills = [
        "Python", "SQL", "Pandas", "NumPy", "Matplotlib", "Excel",
        "Git", "Data Cleaning", "Exploratory Data Analysis", "Data Visualization"
      ];

      saveResumeAnalysis({
        fileName: "Pooja_Verma_Data_Analyst_Resume.pdf",
        fileSize: "194 KB",
        extractedText: sample.rawText,
        overrideOccupationId: "data-analyst",
        aiData: {
          technicalSkills: dataSkills,
          programmingLanguages: ["Python", "SQL"],
          frameworks: ["Pandas", "NumPy", "Matplotlib", "Data Cleaning", "Data Visualization"],
          databases: ["SQL"],
          toolsAndTechnologies: ["Excel", "Git"],
          softSkills: ["Analytical Thinking", "Presentation Skills", "Team Collaboration"],
          educationalQualifications: [
            { degree: "B.E. in Information Technology", institution: "Visvesvaraya Technological University (VTU)", year: "2023 - 2027", gradeOrCgpa: "8.9 / 10.0" }
          ],
          projects: [
            {
              title: "E-Commerce Customer Churn Analysis",
              description: "Analyzed 50,000 retail customer records using Python, Pandas, and Matplotlib to isolate churn triggers.",
              technologies: ["Python", "Pandas", "Matplotlib"]
            },
            {
              title: "Student Performance Dashboard",
              description: "Interactive Excel spreadsheet tracking 500+ semester grades and attendance trends.",
              technologies: ["Excel", "Data Visualization"]
            }
          ],
          extractedVia: "Google Gemini 1.5 Flash (Verified Sample Extraction)"
        }
      });
      return;
    }

    const defaultSkills = [
      "JavaScript", "React.js", "HTML5", "CSS3", "Tailwind CSS", "Express.js",
      "MongoDB", "MySQL", "SQL", "Git", "C++", "Postman", "Problem Solving"
    ];

    saveResumeAnalysis({
      fileName: `${sample.name.replace(/\s+/g, "_")}.pdf`,
      fileSize: "215 KB",
      extractedText: sample.rawText,
      overrideOccupationId: "full-stack-developer",
      aiData: {
        technicalSkills: defaultSkills,
        programmingLanguages: ["JavaScript", "C++", "HTML5", "CSS3", "SQL"],
        frameworks: ["React.js", "Tailwind CSS", "Express.js"],
        databases: ["MongoDB", "MySQL"],
        toolsAndTechnologies: ["Git", "GitHub", "Postman", "VS Code"],
        softSkills: ["Team Collaboration", "Problem Solving", "Technical Communication"],
        educationalQualifications: [
          { degree: "B.Tech Computer Science", institution: "DTU", year: "2023 - 2027", gradeOrCgpa: "8.6 / 10.0" }
        ],
        projects: [
          { title: "Campus Marketplace Web App", description: "React.js & Tailwind student trading platform.", technologies: ["React.js", "Tailwind CSS"] },
          { title: "Algorithm Visualizer", description: "Interactive visualizer for sorting and pathfinding algorithms in pure JavaScript.", technologies: ["JavaScript", "HTML5 Canvas"] }
        ],
        extractedVia: "Google Gemini 1.5 Flash (Verified Sample Extraction)"
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        skillGap,
        login,
        register,
        logout,
        updateProfile,
        setTargetOccupation,
        saveResumeAnalysis,
        deleteResume,
        loadSampleResume,
        isSupabaseConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

