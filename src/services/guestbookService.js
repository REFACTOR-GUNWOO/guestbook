/** @typedef {{ id: string; name: string; message: string; createdAt: number }} GuestbookEntry */

/** @type {GuestbookEntry[]} */
const memory = [];

/**
 * @returns {Promise<GuestbookEntry[]>}
 */
export async function listGuestbookEntries() {
  return Promise.resolve([...memory]);
}

/**
 * @param {{ name: string; message: string }} payload
 * @returns {Promise<GuestbookEntry>}
 */
export async function insertGuestbookEntry(payload) {
  const entry = {
    id: crypto.randomUUID(),
    name: payload.name,
    message: payload.message,
    createdAt: Date.now(),
  };
  memory.unshift(entry);
  return Promise.resolve(entry);
}
