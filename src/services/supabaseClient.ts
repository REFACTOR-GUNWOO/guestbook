import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "VITE_SUPABASE_URL과 VITE_SUPABASE_PUBLISHABLE_KEY 환경 변수를 설정해 주세요."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
