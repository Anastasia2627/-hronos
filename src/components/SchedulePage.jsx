import React from 'react';
import {
  CalendarDays,
  Bell,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Sparkles,
  Calendar,
  CalendarCheck,
  ArrowUpRight
} from 'lucide-react';
import { dateKey, offsetDate, startOfWeek, sameDay, formatDay, formatTime } from '../data.js';
import { TYPES, getOccurrences } from '../lib/shared.jsx';
import { PageHeading } from './Common.jsx';

export function SchedulePage({ events, date, onDate, colorFor, onEvent, onNew }) { const days = Array.from({ length: 7 }, (_, i) => offsetDate(startOfWeek(date), i)); const todays = getOccurrences(events, date); return <div className="schedule-page"><PageHeading title="Daily schedule" right={<button className="btn btn-primary" onClick={onNew}><Plus size={18} /> Add event</button>} /><div className="schedule-layout"><div className="surface schedule-main"><div className="schedule-main-header"><div><h2>{formatDay(date)}</h2><p>{todays.length} {todays.length === 1 ? 'event' : 'events'} on your schedule</p></div><div className="schedule-nav"><button className="icon-button button-bordered" onClick={() => onDate(offsetDate(date, -1))}><ChevronLeft size={19} /></button><button className="btn btn-today" onClick={() => onDate(new Date())}>Today</button><button className="icon-button button-bordered" onClick={() => onDate(offsetDate(date, 1))}><ChevronRight size={19} /></button></div></div><div className="schedule-days">{days.map(d => <button key={dateKey(d)} className={sameDay(d, date) ? 'schedule-day-selected' : ''} onClick={() => onDate(d)}><span>{d.toLocaleDateString('en-US', { weekday: 'short' })}</span><strong>{d.getDate()}</strong>{getOccurrences(events, d).length > 0 && <i />}</button>)}</div>{todays.length > 0 ? <div className="schedule-event-list">{todays.map((e, i) => { const Icon = TYPES[e.type]?.icon || Calendar; return <button key={`${e.id}-${i}`} className="schedule-event-row" onClick={() => onEvent(e)}><div className="schedule-event-time"><strong>{formatTime(e.start)}</strong><small>{formatTime(e.end)}</small></div><div className="schedule-event-indicator" style={{ background: (e.color || colorFor(e.calendarId)) }} /><span className="schedule-event-icon" style={{ '--accent': (e.color || colorFor(e.calendarId)) }}><Icon size={19} /></span><div className="schedule-event-copy"><strong>{e.title}</strong><small>{e.location || TYPES[e.type]?.label}</small></div><span className="schedule-event-arrow"><ArrowUpRight size={18} /></span></button> })}</div> : <div className="empty-schedule large"><CalendarCheck size={32} /><strong>Your day is all yours</strong><p>Choose a date or create something new.</p></div>}</div></div></div>; }
