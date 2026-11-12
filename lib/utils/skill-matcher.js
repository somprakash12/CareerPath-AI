import { OCCUPATIONS } from "@/lib/data/occupations";
import { PMKVY_PROGRAMS } from "@/lib/data/pmkvy-programs";

/**
 * Normalizes a skill string for fuzzy/alias comparison
 */
function normalizeSkill(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/[.\-_/\s]/g, "")
    .trim();
}

/**
 * Checks if two skill names represent the same technology
 */
export function skillsMatch(candidateSkill, targetSkill) {
  const normCand = normalizeSkill(candidateSkill);
  const normTarget = normalizeSkill(targetSkill);

  if (normCand === normTarget) return true;

  // Specific common aliases
  const aliasMap = {
    react: ["reactjs", "react"],
    reactjs: ["react", "reactjs"],
    node: ["nodejs", "node"],
    nodejs: ["node", "nodejs"],
    express: ["expressjs", "express"],
    expressjs: ["express", "expressjs"],
    tailwind: ["tailwindcss", "tailwind"],
    tailwindcss: ["tailwind", "tailwindcss"],
    mongo: ["mongodb", "mongo"],
    mongodb: ["mongo", "mongodb"],
    postgres: ["postgresql", "postgres"],
    postgresql: ["postgres", "postgresql"],
    next: ["nextjs", "next"],
    nextjs: ["next", "nextjs"],
    ts: ["typescript", "ts"],
    typescript: ["ts", "typescript"],
    js: ["javascript", "js"],
    javascript: ["js", "javascript"],
    restapi: ["restfulapis", "restapi", "restapis"],
    restapis: ["restfulapis", "restapi", "restapis"],
    restfulapis: ["restapis", "restapi", "restfulapis"],
    docker: ["docker", "containerization"],
    git: ["git", "github", "versioncontrol"],
    aws: ["amazonwebservices", "aws", "cloud"],
    oop: ["objectorientedprogramming", "oop", "oops"]
  };

  if (aliasMap[normCand] && aliasMap[normCand].includes(normTarget)) {
    return true;
  }
  if (aliasMap[normTarget] && aliasMap[normTarget].includes(normCand)) {
    return true;
  }

  // Substring match for compound names (e.g. "React.js" contains "React")
  if (normCand.length > 3 && normTarget.includes(normCand)) return true;
  if (normTarget.length > 3 && normCand.includes(normTarget)) return true;

  return false;
}

/**
 * Pure JavaScript Skill Gap Analysis
 * Formula: Skill Match Percentage = (Matching Required Skills / Total Required Skills) * 100
 */
export function calculateSkillGap(resumeSkills = [], occupationIdOrObj) {
  const occupation =
    typeof occupationIdOrObj === "string"
      ? OCCUPATIONS.find((o) => o.id === occupationIdOrObj) || OCCUPATIONS[0]
      : occupationIdOrObj || OCCUPATIONS[0];

  const requiredSkills = occupation.requiredSkills || [];
  const candidateSkillsList = Array.isArray(resumeSkills) ? resumeSkills : [];

  const matchingSkills = [];
  const missingSkills = [];

  requiredSkills.forEach((reqSkill) => {
    const isMatched = candidateSkillsList.some((candSkill) =>
      skillsMatch(candSkill, reqSkill)
    );
    if (isMatched) {
      matchingSkills.push(reqSkill);
    } else {
      missingSkills.push(reqSkill);
    }
  });

  const totalRequired = requiredSkills.length;
  const matchPercentage =
    totalRequired > 0
      ? Math.round((matchingSkills.length / totalRequired) * 100)
      : 0;

  // Additional skills candidate possesses that are not in the required list
  const additionalSkills = candidateSkillsList.filter((candSkill) => {
    return !requiredSkills.some((reqSkill) => skillsMatch(candSkill, reqSkill));
  });

  // Determine readiness level
  let readinessTier = "Foundational";
  let readinessDescription =
    "Significant skill gap detected. Recommended to enroll in PMKVY Short Term Training (STT) to build core foundational qualifications.";
  let badgeColor = "bg-amber-950/80 text-amber-300 border-amber-800";

  if (matchPercentage >= 80) {
    readinessTier = "Industry Ready";
    readinessDescription =
      "Excellent skill alignment! Candidate satisfies most industry requirements. Recommended for advanced PMKVY Level 6/7 certifications or immediate apprenticeship.";
    badgeColor = "bg-emerald-950/80 text-emerald-300 border-emerald-800";
  } else if (matchPercentage >= 50) {
    readinessTier = "Intermediate Upskilling";
    readinessDescription =
      "Good foundational base. Bridging a few high-impact missing skills via targeted PMKVY modules will make the candidate fully job-ready.";
    badgeColor = "bg-indigo-950/80 text-indigo-300 border-indigo-800";
  }

  // Recommended PMKVY courses based on missing skills & occupation
  const recommendedPrograms = PMKVY_PROGRAMS.map((program) => {
    const coversMissing = program.skillsCovered.filter((progSkill) =>
      missingSkills.some((missing) => skillsMatch(progSkill, missing))
    );
    const matchesOccupation = program.relevantOccupations.some((role) =>
      role.toLowerCase().includes(occupation.title.toLowerCase())
    );

    let relevanceScore = coversMissing.length * 20;
    if (matchesOccupation) relevanceScore += 30;

    return {
      ...program,
      coveredMissingSkills: coversMissing,
      relevanceScore: Math.min(100, relevanceScore)
    };
  })
    .filter((prog) => prog.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);

  return {
    occupation: {
      id: occupation.id,
      title: occupation.title,
      category: occupation.category,
      qpCode: occupation.qpCode,
      nsqfLevel: occupation.nsqfLevel,
      averageSalary: occupation.averageSalary
    },
    totalRequiredSkills: totalRequired,
    matchingSkills,
    missingSkills,
    additionalSkills,
    matchPercentage,
    readinessTier,
    readinessDescription,
    badgeColor,
    recommendedPrograms
  };
}

