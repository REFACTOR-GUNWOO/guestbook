import type {
  GuestbookEntry,
  GuestbookInsertPayload,
} from "../types/guestbook";

const memory: GuestbookEntry[] = [];

export async function listGuestbookEntries(): Promise<GuestbookEntry[]> {
  return Promise.resolve([...memory]);
}

export async function insertGuestbookEntry(
  payload: GuestbookInsertPayload
): Promise<GuestbookEntry> {
  const entry: GuestbookEntry = {
    id: crypto.randomUUID(),
    name: payload.name,
    message: payload.message,
    createdAt: Date.now(),
  };
  memory.unshift(entry);
  return Promise.resolve(entry);
}
