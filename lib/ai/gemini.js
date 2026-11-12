import { GoogleGenerativeAI } from "@google/generative-ai";
import { SKILL_CATEGORIES } from "@/lib/data/occupations";

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function textContainsSkill(lowerText, skillName) {
  const target = skillName.toLowerCase();
  if (target === "c") {
    return /(?:^|[\s,(;/])c(?=[\s,);/]|$)/.test(lowerText);
  }
  const escaped = escapeRegExp(target);
  return new RegExp(`(?<![a-z0-9_])${escaped}(?![a-z0-9_])`, "i").test(lowerText);
}

const REDUNDANT_ALIAS_PARENTS = {
  React: "React.js",
  Express: "Express.js",
  HTML: "HTML5",
  CSS: "CSS3",
  "CI/CD": "CI/CD Pipelines",
  "REST APIs": "RESTful APIs"
};

function extractCategory(knownList, lowerText) {
  const result = [];
  for (const item of knownList) {
    const parent = REDUNDANT_ALIAS_PARENTS[item];
    if (parent && result.includes(parent)) {
      continue;
    }
    if (textContainsSkill(lowerText, item)) {
      result.push(item);
    }
  }
  return result;
}

/**
 * Intelligent deterministic fallback parser when Gemini API key is missing or offline
 */
function fallbackExtraction(resumeText) {
  const safeText = typeof resumeText === "string" ? resumeText : "";
  const lower = safeText.toLowerCase();

  const knownLanguages = [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "C", "PHP",
    "Ruby", "Go", "Rust", "Swift", "Kotlin", "HTML5", "HTML", "CSS3", "CSS", "SQL"
  ];
  const knownFrameworks = [
    "React.js", "React", "Next.js", "Node.js", "Express.js", "Express", "Angular",
    "Vue.js", "Django", "Flask", "Spring Boot", "Tailwind CSS", "Bootstrap",
    "Pandas", "NumPy", "Matplotlib", "Scikit-Learn", "TensorFlow", "Keras", "PyTorch",
    "RESTful APIs", "REST APIs", "GraphQL", "Data Visualization", "Data Cleaning",
    "Exploratory Data Analysis", "Machine Learning", "Statistics", "Network Security"
  ];
  const knownDatabases = [
    "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Oracle", "Cassandra", "Firebase"
  ];
  const knownTools = [
    "Git", "GitHub", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Linux",
    "Postman", "VS Code", "Jira", "Figma", "Power BI", "Tableau", "Excel",
    "Wireshark", "Jenkins", "CI/CD Pipelines", "CI/CD", "Terraform"
  ];
  const knownSoft = [
    "Problem Solving", "Team Collaboration", "Communication", "Leadership",
    "Critical Thinking", "Analytical Thinking", "Agile", "Time Management", "Adaptability"
  ];

  const extractedLanguages = extractCategory(knownLanguages, lower);
  const extractedFrameworks = extractCategory(knownFrameworks, lower);
  const extractedDatabases = extractCategory(knownDatabases, lower);
  const extractedTools = extractCategory(knownTools, lower);
  const extractedSoftSkills = extractCategory(knownSoft, lower);

  // Extract rough education degrees
  const degrees = [];
  if (lower.includes("b.tech") || lower.includes("bachelor of technology")) {
    degrees.push({ degree: "B.Tech in Computer Science / Engineering", institution: "Engineering University", year: "2023 - 2027" });
  } else if (lower.includes("b.e.") || lower.includes("bachelor of engineering")) {
    degrees.push({ degree: "B.E. in Information Technology / CS", institution: "Engineering Institute", year: "2023 - 2027" });
  } else if (lower.includes("bca") || lower.includes("bachelor of computer applications")) {
    degrees.push({ degree: "BCA", institution: "University", year: "2023 - 2026" });
  } else if (lower.includes("diploma")) {
    degrees.push({ degree: "Diploma in Engineering", institution: "Polytechnic Institute", year: "Completed" });
  }

  // Combine technical skills
  const allTechnicalSkills = Array.from(
    new Set([
      ...extractedLanguages,
      ...extractedFrameworks,
      ...extractedDatabases,
      ...extractedTools
    ])
  );

  // Extract a clean project summary only if project terms appear in the resume
  const projects = [];
  if (lower.includes("project")) {
    projects.push({
      title: "Extracted Resume Technical Project",
      description: "Technical implementation detected in candidate resume using the verified extracted stack.",
      technologies: allTechnicalSkills.slice(0, 4)
    });
  }

  return {
    technicalSkills: allTechnicalSkills,
    programmingLanguages: extractedLanguages,
    frameworks: extractedFrameworks,
    databases: extractedDatabases,
    toolsAndTechnologies: extractedTools,
    softSkills: extractedSoftSkills,
    educationalQualifications: degrees,
    projects,
    experience: [],
    extractedVia: "Deterministic Heuristic Parser (Offline Mode)"
  };
}

/**
 * Calls Gemini Generative AI to extract structured resume profile
 */
export async function analyzeResumeWithGemini(resumeText) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your-gemini-api-key-here" || apiKey.trim() === "") {
    console.warn("GEMINI_API_KEY not configured. Using deterministic fallback parser.");
    return {
      success: true,
      data: fallbackExtraction(resumeText),
      isFallback: true
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-1.5-flash or gemini-2.0-flash
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1
      }
    });

    const prompt = `
You are an expert technical recruiter and resume intelligence parser for CareerPath AI.
Analyze the following student resume text and extract their actual qualifications, skills, and projects.

CRITICAL RULES:
1. ONLY extract skills, technologies, and facts explicitly mentioned or clearly evidenced in the text.
2. DO NOT hallucinate, infer, or invent skills absent from the resume.
3. Return ONLY a valid JSON object matching this exact schema:

{
  "technicalSkills": ["string"],
  "programmingLanguages": ["string"],
  "frameworks": ["string"],
  "databases": ["string"],
  "toolsAndTechnologies": ["string"],
  "softSkills": ["string"],
  "educationalQualifications": [
    {
      "degree": "string",
      "institution": "string",
      "year": "string",
      "gradeOrCgpa": "string"
    }
  ],
  "projects": [
    {
      "title": "string",
      "description": "string",
      "technologies": ["string"]
    }
  ],
  "experience": [
    {
      "role": "string",
      "companyOrOrg": "string",
      "duration": "string",
      "description": "string"
    }
  ]
}

RESUME TEXT:
${resumeText}
    `.trim();

    const result = await model.generateContent(prompt);
    const rawResponseText = result.response.text() || "{}";
    const cleanedJsonText = rawResponseText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsedJson = JSON.parse(cleanedJsonText);

    // Ensure all technical skills are consolidated
    const consolidatedSkills = Array.from(
      new Set([
        ...(parsedJson.technicalSkills || []),
        ...(parsedJson.programmingLanguages || []),
        ...(parsedJson.frameworks || []),
        ...(parsedJson.databases || []),
        ...(parsedJson.toolsAndTechnologies || [])
      ])
    );

    return {
      success: true,
      data: {
        ...parsedJson,
        technicalSkills: consolidatedSkills,
        extractedVia: "Google Gemini 1.5 Flash"
      },
      isFallback: false
    };
  } catch (err) {
    console.error("Gemini API Analysis Error:", err);
    // Graceful fallback to heuristic parser
    return {
      success: true,
      data: fallbackExtraction(resumeText),
      isFallback: true,
      errorNotice: err.message
    };
  }
}

