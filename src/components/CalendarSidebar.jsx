import React from 'react';
import { CalendarDays, Clock3, Plus } from 'lucide-react';
import { MiniMonth } from './ui/MiniMonth.jsx';
import { dateKey, formatTime, parseDate } from '../data.js';
import { getOccurrences } from '../lib/shared.jsx';

export function CalendarSidebar({ date, events, colorFor, onDate, onEvent, onCreate }) {
  const dayEvents = getOccurrences(events, date);
  const marked = events.filter(e => e.repeat === 'none').map(e => e.date);
  return <aside className="calendar-aside">
    <div className="calendar-aside-month"><div className="calendar-aside-title"><strong>Quick calendar</strong><CalendarDays size={18}/></div><MiniMonth value={date} marked={marked} onSelect={key => onDate(parseDate(key))}/></div>
    <div className="calendar-aside-agenda"><div className="calendar-aside-title"><strong>{date.toLocaleDateString('en-US',{month:'short',day:'numeric'})} · Agenda</strong><button onClick={onCreate} aria-label="Create event"><Plus size={18}/></button></div>
      {dayEvents.length ? dayEvents.slice(0,5).map(event => <button key={event.id} className="calendar-agenda-item" onClick={() => onEvent(event)}><span className="calendar-agenda-line" style={{background:colorFor(event.calendarId)}}/><span><strong>{event.title}</strong><small><Clock3 size={13}/>{formatTime(event.start)} – {formatTime(event.end)}</small></span></button>) : <p className="calendar-agenda-empty">Nothing planned yet. Enjoy the open space.</p>}
      {dayEvents.length > 5 && <span className="calendar-agenda-more">+{dayEvents.length - 5} more events</span>}
    </div>
  </aside>;
}
