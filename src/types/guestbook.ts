export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: number;
}

export interface GuestbookInsertPayload {
  name: string;
  message: string;
}
