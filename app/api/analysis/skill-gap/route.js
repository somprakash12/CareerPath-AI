import { NextResponse } from "next/server";
import { calculateSkillGap } from "@/lib/utils/skill-matcher";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    const { resumeSkills = [], occupationId = "full-stack-developer" } = body;

    const analysis = calculateSkillGap(resumeSkills, occupationId);

    return NextResponse.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error("Skill Gap API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to calculate skill gap analysis." },
      { status: 500 }
    );
  }
}

