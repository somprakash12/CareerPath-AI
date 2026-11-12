import { NextResponse } from "next/server";
import { OCCUPATIONS } from "@/lib/data/occupations";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    success: true,
    occupations: OCCUPATIONS
  });
}

