import { NextResponse } from "next/server";
import { PMKVY_PROGRAMS } from "@/lib/data/pmkvy-programs";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sector = searchParams.get("sector");
  const occupation = searchParams.get("occupation");

  let filtered = [...PMKVY_PROGRAMS];

  if (sector) {
    filtered = filtered.filter((p) =>
      p.sector.toLowerCase().includes(sector.toLowerCase())
    );
  }

  if (occupation) {
    filtered = filtered.filter((p) =>
      p.relevantOccupations.some((o) =>
        o.toLowerCase().includes(occupation.toLowerCase())
      )
    );
  }

  return NextResponse.json({
    success: true,
    programs: filtered
  });
}

