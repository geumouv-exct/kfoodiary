import React from 'react';
import { createRoot } from 'react-dom/client';
import Stack from './Stack.jsx';

function DayPhotoCard({ record, index, count }) {
  const recordDate = new Date(record.date);
  const time = Number.isFinite(recordDate.getTime())
    ? recordDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
    : '';
  const details = [record.dishKr, record.restaurant || 'Unknown restaurant', time]
    .filter(Boolean)
    .join(' · ');
  const notes = typeof record.notes === 'string' ? record.notes.trim() : '';

  return (
    <article className="day-photo-card" role="group" aria-label={`Photo ${index + 1} of ${count}`}>
      {record.original ? (
        <img
          src={record.original}
          alt={`Original food photo ${index + 1}`}
          draggable={false}
          decoding="async"
        />
      ) : (
        <div className="day-photo-placeholder">No photo saved for this entry</div>
      )}
      <div className="day-photo-details">
        <b>{record.dishName || 'Food photo'}</b>
        <small>{details}</small>
        {notes ? <small className="day-photo-notes">Notes: {notes}</small> : null}
      </div>
    </article>
  );
}

window.mountDayPhotoStack = (container, records, onChange) => {
  const cards = records.map((record, index) => (
    <DayPhotoCard
      key={record.id || `${record.date}-${record.originalHash || index}`}
      record={record}
      index={index}
      count={records.length}
    />
  ));
  const root = createRoot(container);
  root.render(
    <Stack
      cards={cards}
      layout="fan"
      visible={Math.min(3, records.length)}
      spread={0.48}
      depth={0.42}
      radius={20}
      frame={0}
      tilt={16}
      threshold={80}
      sendToBackOnClick
      onChange={onChange}
      className="day-photo-react-stack"
    />
  );
  return () => root.unmount();
};
