import { NextResponse } from "next/server";
import { analyzeResumeWithGemini } from "@/lib/ai/gemini";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    const { resumeText } = body;

    if (!resumeText || typeof resumeText !== "string" || resumeText.trim().length < 20) {
      return NextResponse.json(
        {
          success: false,
          error: "Resume text is too brief or empty. Please upload a detailed resume."
        },
        { status: 400 }
      );
    }

    const result = await analyzeResumeWithGemini(resumeText);

    return NextResponse.json({
      success: true,
      analysis: result.data,
      isFallback: result.isFallback,
      errorNotice: result.errorNotice || null
    });
  } catch (error) {
    console.error("AI Analysis API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to perform AI resume analysis." },
      { status: 500 }
    );
  }
}

