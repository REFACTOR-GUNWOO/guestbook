import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL?.trim() ?? "";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? "";

export const supabase: SupabaseClient | null =
  url.length > 0 && anonKey.length > 0 ? createClient(url, anonKey) : null;
