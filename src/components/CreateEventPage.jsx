import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { PageHeading } from './Common.jsx';
import { EventForm } from './forms/EventForm.jsx';

export function CreateEventPage({ eventDraft, calendars, saveEvent, closeEvent, setConfirmDelete }) {
  return (
    <div className="create-page">
      <button className="back-link" onClick={closeEvent}><ChevronLeft size={17} /> Back to calendar</button>
      <PageHeading eyebrow="MAKE A MOMENT" title={eventDraft.id ? 'Edit event' : 'Create an event'} subtitle="Give your plans a place to live." />
      <div className="create-card">
        <EventForm key={eventDraft.id || `${eventDraft.date}-${eventDraft.start}`} draft={eventDraft} calendars={calendars} onSave={saveEvent} onCancel={closeEvent} onDelete={eventDraft.id ? () => setConfirmDelete({ kind: 'event', id: eventDraft.id, label: eventDraft.title }) : null} isPage />
      </div>
    </div>
  );
}
