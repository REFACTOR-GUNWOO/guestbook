import "./GuestbookCard.css";

/**
 * @param {{ entry: { id: string; name: string; message: string; createdAt: number } }} props
 */
export default function GuestbookCard({ entry }) {
  const timeLabel = new Date(entry.createdAt).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="guestbook-card">
      <header className="guestbook-card__header">
        <h3 className="guestbook-card__name">{entry.name}</h3>
        <time
          className="guestbook-card__time"
          dateTime={new Date(entry.createdAt).toISOString()}
        >
          {timeLabel}
        </time>
      </header>
      <p className="guestbook-card__message">{entry.message}</p>
    </article>
  );
}
