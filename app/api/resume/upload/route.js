import { NextResponse } from "next/server";
import { extractTextFromPdfBuffer } from "@/lib/resume/pdf-parser";
import { getServerSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded. Please select a PDF resume." },
        { status: 400 }
      );
    }

    // Validate mime type
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { success: false, error: "Invalid file format. Only PDF resumes are accepted." },
        { status: 400 }
      );
    }

    // Validate size limit (5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "File size exceeds the 5MB limit. Please upload a smaller PDF." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse PDF text safely
    const parseResult = await extractTextFromPdfBuffer(buffer);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: parseResult.error || "Failed to extract text from the uploaded PDF document."
        },
        { status: 422 }
      );
    }

    let storagePath = null;
    const supabase = getServerSupabase();
    if (supabase) {
      try {
        const uniqueFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
        const { data, error } = await supabase.storage
          .from("resumes")
          .upload(uniqueFileName, buffer, {
            contentType: "application/pdf",
            upsert: false
          });

        if (!error && data) {
          storagePath = data.path;
        }
      } catch (storageErr) {
        console.warn("Supabase storage upload skipped/failed:", storageErr.message);
      }
    }

    // Format file size string (e.g. "320 KB")
    const formattedSize =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileSize: formattedSize,
      pageCount: parseResult.pageCount,
      extractedText: parseResult.text,
      storagePath
    });
  } catch (error) {
    console.error("Resume Upload API Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during resume processing." },
      { status: 500 }
    );
  }
}

