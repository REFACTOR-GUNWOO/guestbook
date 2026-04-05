import { useCallback, useEffect, useState } from "react";
import {
  insertGuestbookEntry,
  listGuestbookEntries,
} from "./services/guestbookService.js";
import GuestbookForm from "./components/GuestbookForm.jsx";
import GuestbookList from "./components/GuestbookList.jsx";
import "./App.css";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
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
  }, []);

  const handleAdd = useCallback(async ({ name, message }) => {
    const entry = await insertGuestbookEntry({ name, message });
    setEntries((prev) => [entry, ...prev]);
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">방명록</h1>
        <p className="app__subtitle">이름과 한마디를 남겨 주세요.</p>
      </header>

      <main className="app__main">
        <GuestbookForm onSubmit={handleAdd} />
        <GuestbookList entries={entries} loading={loading} />
      </main>
    </div>
  );
}
