import React, { useEffect, useState } from 'react';
import {
  CalendarDays,
  ListTodo,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Clock3,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
  ListChecks,
  CalendarCheck,
  ArrowUpRight
} from 'lucide-react';
import { TODAY, sameDay, formatMonth, formatTime, monthCells } from '../data.js';
import { WEEKDAYS, TYPES, getOccurrences } from '../lib/shared.jsx';
import { TaskBoard } from './TaskBoard.jsx';

export function Overview({ date, name, events, tasks, calendars, upcomingCount, colorFor, onNewEvent, onOpenEvent, onOpenTask, onPage, onAddTask, onJumpDate }) {
  const done = tasks.filter(t => t.stage === 'done').length;
  const coming = tasks.filter(t => t.stage !== 'done').length;
  const firstName = (name || 'there').split(' ')[0];
  const todayLabel = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  return <div className="overview-page">
    <div className="overview-greeting"><div><span className="eyebrow">{todayLabel.toUpperCase()}</span><h1>Good {date.getHours() < 12 ? 'morning' : date.getHours() < 17 ? 'afternoon' : 'evening'}, {firstName}<span className="hello-period">.</span></h1><p>Here's what's happening in your world today.</p></div><button className="btn btn-primary" onClick={onNewEvent}><Plus size={18} /> New event</button></div>
    <div className="stat-grid">
      <div className="stat-card"><span className="stat-icon stat-blue"><CalendarDays size={20} /></span><div><span className="stat-label">Today's events</span><strong>{events.length.toString().padStart(2, '0')}</strong><small>On your schedule</small></div><ArrowUpRight className="stat-arrow" size={17} /></div>
      <div className="stat-card"><span className="stat-icon stat-orange"><ListChecks size={20} /></span><div><span className="stat-label">Active tasks</span><strong>{coming.toString().padStart(2, '0')}</strong><small>Things in motion</small></div><ArrowUpRight className="stat-arrow" size={17} /></div>
      <div className="stat-card"><span className="stat-icon stat-green"><CheckCircle2 size={20} /></span><div><span className="stat-label">Completed</span><strong>{done.toString().padStart(2, '0')}</strong><small>Little wins add up</small></div><ArrowUpRight className="stat-arrow" size={17} /></div>
    </div>
    <div className="overview-middle">
      <section className="surface today-card"><div className="section-header"><div><h2>Today's schedule <Info size={14} className="info-icon" /></h2><p>Your day, at a glance</p></div><button className="icon-button button-bordered" title="Open schedule" onClick={() => onPage('schedule')}><MoreHorizontal size={20} /></button></div><div className="timeline-list">{events.length ? events.map((event, i) => { const TypeIcon = TYPES[event.type]?.icon || CalendarDays; return <button className="timeline-item" key={`${event.id}-${i}`} onClick={() => onOpenEvent(event)}><span className="timeline-time">{formatTime(event.start)}</span><span className="timeline-track"><span className="timeline-dot" style={{ background: colorFor(event.calendarId) }} /></span><span className="timeline-type" style={{ '--accent': colorFor(event.calendarId) }}><TypeIcon size={17} /></span><span className="timeline-description"><strong>{event.title}</strong><small>{event.location || TYPES[event.type]?.label || 'Event'}</small></span><span className={`status-pill ${i === 0 ? 'tone-green' : i === 1 ? 'tone-blue' : i === 2 ? 'tone-yellow' : 'tone-gray'}`}>{i === 0 ? 'Ready' : i === 1 ? 'In progress' : i === 2 ? 'Upcoming' : 'Planned'}</span></button> }) : <div className="empty-schedule"><CalendarCheck size={27} /><strong>Room to breathe</strong><p>There are no events scheduled for today.</p></div>}</div><button className="insight-strip" onClick={() => onPage('tasks')}><Sparkles size={18} /><span><strong>{coming} things on your list</strong> — keep the momentum going</span><ArrowRight size={16} /></button></section>
      <div className="overview-side"><section className="surface mini-calendar-card"><div className="section-header"><div><h2>Calendar</h2><p>Plan ahead with ease</p></div><button className="icon-button" title="View calendar" onClick={() => onPage('calendar')}><ArrowUpRight size={18} /></button></div><MiniCalendar date={date} events={events} colorFor={colorFor} onDay={onJumpDate} /></section><section className="surface quick-card"><div className="section-header"><div><h2>Quick access</h2><p>Just a click away</p></div></div><div className="quick-links"><button onClick={() => onPage('calendar')}><span className="quick-icon quick-blue"><CalendarDays size={19} /></span><strong>Calendar</strong><ArrowRight size={15} /></button><button onClick={() => onPage('tasks')}><span className="quick-icon quick-violet"><ListTodo size={19} /></span><strong>Task board</strong><ArrowRight size={15} /></button><button onClick={() => onPage('schedule')}><span className="quick-icon quick-orange"><Clock3 size={19} /></span><strong>Schedule</strong><ArrowRight size={15} /></button></div></section></div>
    </div>
    <section className="overview-tasks"><div className="section-header board-heading"><div><h2>My task board</h2><p>See your progress, one card at a time</p></div><button className="text-button" onClick={() => onPage('tasks')}>View all tasks <ArrowRight size={16} /></button></div><TaskBoard compact tasks={tasks} onOpen={onOpenTask} onMove={() => onPage('tasks')} onAdd={onAddTask} /></section>
  </div>;
}

export function MiniCalendar({ date, events = [], colorFor, onDay }) { const [shown, setShown] = useState(new Date(date.getFullYear(), date.getMonth(), 1)); useEffect(() => setShown(new Date(date.getFullYear(), date.getMonth(), 1)), [date]); return <div className="mini-calendar"><div className="mini-month"><strong>{formatMonth(shown)}</strong><span><button aria-label="Previous month" onClick={() => setShown(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}><ChevronLeft size={16} /></button><button aria-label="Next month" onClick={() => setShown(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}><ChevronRight size={16} /></button></span></div><div className="mini-grid">{WEEKDAYS.map(d => <span className="mini-weekday" key={d}>{d.slice(0, 1)}</span>)}{monthCells(shown).slice(0, 42).map((day, i) => { const entries = getOccurrences(events, day); return <button key={i} className={`mini-day ${day.getMonth() !== shown.getMonth() ? 'mini-outside' : ''} ${sameDay(day, TODAY) ? 'mini-today' : ''}`} onClick={() => onDay(day)}><span>{day.getDate()}</span>{entries.length > 0 && <i style={{ background: colorFor(entries[0].calendarId) }} />}</button>; })}</div></div>; }
