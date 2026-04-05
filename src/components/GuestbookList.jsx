import GuestbookCard from "./GuestbookCard.jsx";
import "./GuestbookList.css";

/**
 * @param {{
 *   entries: { id: string; name: string; message: string; createdAt: number }[];
 *   loading?: boolean;
 * }} props
 */
export default function GuestbookList({ entries, loading }) {
  return (
    <section className="guestbook-list" aria-labelledby="guestbook-list-heading">
      <h2 className="guestbook-list__heading" id="guestbook-list-heading">
        남긴 글
      </h2>

      {loading ? (
        <p className="guestbook-list__status">불러오는 중…</p>
      ) : entries.length === 0 ? (
        <p className="guestbook-list__empty">아직 등록된 글이 없습니다.</p>
      ) : (
        <ul className="guestbook-list__items">
          {entries.map((entry) => (
            <li key={entry.id} className="guestbook-list__item">
              <GuestbookCard entry={entry} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
