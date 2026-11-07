import React, { useState } from 'react';
import { Clock3, Plus, UsersRound, X, Pencil } from 'lucide-react';
import { MiniMonth } from './ui/MiniMonth.jsx';
import { formatTime, parseDate } from '../data.js';
import { getOccurrences, initials } from '../lib/shared.jsx';

export function CalendarSidebar({ date, events, colorForEvent, onDate, onEvent, onCreate, calendar, onAddMember, onRemoveMember, onEditCalendar }) {
  const [email, setEmail] = useState('');
  const dayEvents = getOccurrences(events, date);
  const marked = events.filter(e => e.repeat === 'none').map(e => e.date);
  const writable = calendar && !calendar.readOnly;
  const addMember = (event) => {
    event.preventDefault();
    if (writable && onAddMember(calendar.id,email)) setEmail('');
  };

  return <aside className="calendar-aside">
    <div className="calendar-aside-month"><div className="calendar-aside-title"><strong>Jump to a date</strong></div><MiniMonth value={date} marked={marked} onSelect={key => onDate(parseDate(key))}/></div>
    <div className="calendar-aside-agenda"><div className="calendar-aside-title"><strong>{date.toLocaleDateString('en-US',{month:'short',day:'numeric'})} · Agenda</strong><button onClick={onCreate} title="New event" aria-label="New event"><Plus size={18}/></button></div>
      {dayEvents.length ? dayEvents.slice(0,5).map(event => <button key={event.id} className="calendar-agenda-item" onClick={() => onEvent(event)}><span className="calendar-agenda-line" style={{background:colorForEvent(event)}}/><span><strong>{event.title}</strong><small><Clock3 size={13}/>{formatTime(event.start)} – {formatTime(event.end)}</small></span></button>) : <p className="calendar-agenda-empty">Nothing planned yet.</p>}
    </div>
    <div className="calendar-aside-people"><div className="calendar-aside-title"><strong><UsersRound size={17}/> People with access</strong>{writable && <button title="Calendar settings" aria-label="Calendar settings" onClick={() => onEditCalendar({ ...calendar })}><Pencil size={15}/></button>}</div>
      {calendar ? <><p className="calendar-aside-description">{calendar.name} · {calendar.readOnly ? 'Built-in calendar' : 'Local preview'}</p>
        <div className="calendar-member-list">{(calendar.members || []).length ? calendar.members.map(address => <div className="calendar-member" key={address}><span className="calendar-member-avatar">{initials(address)}</span><span title={address}>{address}</span>{writable && <button title={`Remove ${address}`} aria-label={`Remove ${address}`} onClick={() => onRemoveMember(calendar.id,address)}><X size={15}/></button>}</div>) : <p>Only you have access.</p>}</div>
        {writable && <form onSubmit={addMember} className="calendar-member-form"><input type="email" aria-label="Person's email" required placeholder="Add email address" value={email} onChange={e => setEmail(e.target.value)}/><button type="submit" aria-label="Add person" title="Add person"><Plus size={18}/></button></form>}
        {writable && <small className="calendar-local-note">Stored locally. Email invitations will work after backend integration.</small>}
      </> : <p className="calendar-aside-description">Choose one calendar in the sidebar to manage its people.</p>}
    </div>
  </aside>;
}
