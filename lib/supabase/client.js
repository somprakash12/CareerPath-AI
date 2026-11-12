import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("your-project")
);

let browserClient = null;

export function getSupabaseClient() {
  if (typeof window === "undefined") {
    return null;
  }

  if (isSupabaseConfigured) {
    if (!browserClient) {
      browserClient = createClient(supabaseUrl, supabaseAnonKey);
    }
    return browserClient;
  }

  return null;
}

