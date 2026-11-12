import pdf from "pdf-parse";

/**
 * Extracts raw text safely from a PDF ArrayBuffer or Buffer
 */
export async function extractTextFromPdfBuffer(buffer) {
  try {
    if (!buffer || buffer.length === 0) {
      throw new Error("Empty PDF buffer provided.");
    }

    const nodeBuffer = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    // Pass a standalone Uint8Array copy so Node's pooled Buffer slab offset doesn't break pdf.js xref reading
    const isolatedBytes = new Uint8Array(nodeBuffer);
    const data = await pdf(isolatedBytes);

    if (!data || !data.text || !data.text.trim()) {
      throw new Error("Unable to extract readable text from PDF. The document may be scanned or image-only.");
    }

    // Clean and normalize whitespace
    const cleanedText = data.text
      .replace(/\r\n/g, "\n")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    return {
      success: true,
      text: cleanedText,
      pageCount: data.numpages || 1,
      info: data.info || {}
    };
  } catch (err) {
    console.error("PDF Parsing Error:", err);
    return {
      success: false,
      error: err.message || "Failed to parse PDF document."
    };
  }
}

