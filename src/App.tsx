import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  insertGuestbookEntry,
  listGuestbookEntries,
} from "./services/guestbookService";
import {
  getSession,
  onAuthChange,
  signOut,
} from "./services/authService";
import type {
  GuestbookEntry,
  GuestbookInsertPayload,
} from "./types/guestbook";
import GuestbookForm from "./components/GuestbookForm";
import GuestbookList from "./components/GuestbookList";
import Login from "./components/Login";
import "./App.css";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSession().then((s) => {
      setSession(s);
      setAuthReady(true);
    });
    return onAuthChange(setSession);
  }, []);

  useEffect(() => {
    if (!session) {
      setEntries([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    listGuestbookEntries()
      .then((data) => {
        if (!cancelled) setEntries(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [session]);

  const handleAdd = useCallback(
    async (payload: GuestbookInsertPayload) => {
      const entry = await insertGuestbookEntry(payload);
      setEntries((prev) => [entry, ...prev]);
    },
    []
  );

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">방명록</h1>
        <p className="app__subtitle">이름과 한마디를 남겨 주세요.</p>
        {session && (
          <button
            className="app__signout"
            type="button"
            onClick={() => void signOut()}
          >
            {session.user.email} · 로그아웃
          </button>
        )}
      </header>

      <main className="app__main">
        {!authReady ? null : session ? (
          <>
            <GuestbookForm onSubmit={handleAdd} />
            <GuestbookList entries={entries} loading={loading} />
          </>
        ) : (
          <Login />
        )}
      </main>
    </div>
  );
}
