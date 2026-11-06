import React from 'react';
import { CalendarDays, ChevronRight, Eye, EyeOff, Plus } from 'lucide-react';

export function ProfileCalendars({ calendars, onEditCal, onNewCal, onToggleCal }) {
  return <div className="ps-detail-sections">
    <section className="ps-detail-section">
      <div className="ps-section-row"><div>
        <h3 className="ps-section-heading"><CalendarDays size={18} /> My calendars</h3>
        <p className="ps-section-desc">Give each part of your life its own color.</p>
      </div><button type="button" className="ps-add-button" onClick={onNewCal}><Plus size={17} /> Add calendar</button></div>
      <div className="ps-calendar-items">{calendars.map(cal => <div key={cal.id} className="ps-calendar-item">
        <span className="ps-calendar-color" style={{ background: cal.color }} />
        <button type="button" className="ps-calendar-open" onClick={() => onEditCal({ ...cal })}>
          <strong>{cal.name}</strong><small>{cal.description || 'No description'}</small>
        </button>
        <span className={`ps-small-pill ${cal.readOnly ? 'ps-pill-blue' : 'ps-pill-peach'}`}>{cal.readOnly ? 'Built-in' : 'Custom'}</span>
        <button type="button" className="ps-mini-action" onClick={() => onToggleCal(cal.id)} aria-label={`${cal.visible ? 'Hide' : 'Show'} ${cal.name}`} title={cal.visible ? 'Hide calendar' : 'Show calendar'}>
          {cal.visible ? <Eye size={17} /> : <EyeOff size={17} />}
        </button>
        <button type="button" className="ps-mini-action" aria-label={`Edit ${cal.name}`} title="Edit calendar" onClick={() => onEditCal({ ...cal })}><ChevronRight size={18} /></button>
      </div>)}</div>
    </section>
    <p className="ps-hint">The main calendar is yours by default. Shared calendar invitations will become available when the backend is connected.</p>
  </div>;
}
