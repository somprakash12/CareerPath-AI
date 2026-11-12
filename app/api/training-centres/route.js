import { NextResponse } from "next/server";
import { TRAINING_CENTRES } from "@/lib/data/training-centres";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");
  const query = searchParams.get("query");
  const programId = searchParams.get("programId");

  let filtered = [...TRAINING_CENTRES];

  if (state && state !== "all") {
    filtered = filtered.filter((c) =>
      c.state.toLowerCase() === state.toLowerCase()
    );
  }

  if (programId && programId !== "all") {
    filtered = filtered.filter((c) =>
      c.activePrograms.includes(programId)
    );
  }

  if (query && query.trim() !== "") {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    centres: filtered
  });
}

