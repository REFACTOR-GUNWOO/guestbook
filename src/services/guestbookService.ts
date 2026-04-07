import type {
  GuestbookEntry,
  GuestbookInsertPayload,
} from "../types/guestbook";
import { supabase } from "../lib/supabaseClient";

type GuestbookRow = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase 환경변수가 설정되지 않았습니다. VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY를 확인하세요."
    );
  }
  return supabase;
}

function toEntry(row: GuestbookRow): GuestbookEntry {
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    createdAt: new Date(row.created_at).getTime(),
  };
}

export async function listGuestbookEntries(): Promise<GuestbookEntry[]> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("guestbook")
    .select("id,name,message,created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return ((data ?? []) as GuestbookRow[]).map((row: GuestbookRow) =>
    toEntry(row)
  );
}

export async function insertGuestbookEntry(
  payload: GuestbookInsertPayload
): Promise<GuestbookEntry> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("guestbook")
    .insert({ name: payload.name, message: payload.message })
    .select("id,name,message,created_at")
    .single();

  if (error) throw error;
  return toEntry(data as GuestbookRow);
}
