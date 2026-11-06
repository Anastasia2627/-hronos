import React, { useEffect, useState } from 'react';
import { CalendarDays, ListTodo, Plus, ChevronLeft, ChevronRight, ArrowRight, CalendarCheck } from 'lucide-react';
import { TODAY, sameDay, formatMonth, formatTime, monthCells, parseDate, formatShort } from '../data.js';
import { WEEKDAYS, TYPES, getOccurrences } from '../lib/shared.jsx';

export function Overview({ date, name, events, allEvents, tasks, colorFor, onNewEvent, onOpenEvent, onOpenTask, onPage, onAddTask, onJumpDate }) {
  const active = tasks.filter(task => task.stage !== 'done');
  const nextTasks = [...active].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
  const dateLabel = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  return <div className="overview-page simple-overview">
    <div className="overview-greeting"><div><span className="overview-date">{dateLabel}</span><h1>Hi, {(name || 'there').split(' ')[0]} <span className="hello-period">✳</span></h1>
      <p>{events.length} {events.length === 1 ? 'event' : 'events'} today · {active.length} open {active.length === 1 ? 'task' : 'tasks'}</p></div>
      <button className="btn btn-primary" onClick={onNewEvent}><Plus size={18}/> New event</button></div>
    <div className="overview-middle">
      <section className="surface today-card"><div className="section-header"><h2>Today's schedule</h2><button className="text-button" onClick={() => onPage('schedule')}>See day <ArrowRight size={16}/></button></div>
        <div className="timeline-list">{events.length ? events.map((event, i) => {const Icon = TYPES[event.type]?.icon || CalendarDays;return <button key={`${event.id}-${i}`} className="timeline-item" onClick={() => onOpenEvent(event)}>
          <span className="timeline-time">{formatTime(event.start)}</span><span className="timeline-track"><span className="timeline-dot" style={{background:colorFor(event.calendarId)}}/></span>
          <span className="timeline-type" style={{'--accent':colorFor(event.calendarId)}}><Icon size={17}/></span>
          <span className="timeline-description"><strong>{event.title}</strong><small>{event.location || TYPES[event.type]?.label || 'Event'}</small></span>
        </button>}) : <div className="empty-schedule"><CalendarCheck size={28}/><strong>No events today</strong><p>Choose a time to add one.</p></div>}</div>
      </section>
      <section className="surface mini-calendar-card"><div className="section-header"><h2>Calendar</h2><button className="text-button" onClick={() => onPage('calendar')}>Open <ArrowRight size={16}/></button></div>
        <MiniCalendar date={date} events={allEvents} colorFor={colorFor} onDay={onJumpDate}/></section>
    </div>
    <section className="surface overview-task-preview"><div className="section-header"><h2>Upcoming tasks</h2><div className="overview-actions"><button className="text-button" onClick={onAddTask}><Plus size={16}/> Add task</button><button className="text-button" onClick={() => onPage('tasks')}>View all <ArrowRight size={16}/></button></div></div>
      {nextTasks.length ? <div className="overview-task-list">{nextTasks.map(task => <button key={task.id} className="overview-task-row" onClick={() => onOpenTask(task)}><span className="overview-task-dot" style={{background:task.color}}/><span className="overview-task-title">{task.title}</span><span className="overview-task-date">{formatShort(parseDate(task.date))}</span><ArrowRight size={16}/></button>)}</div> : <p className="overview-empty">No open tasks. You're all set.</p>}
    </section>
  </div>;
}

export function MiniCalendar({ date, events = [], colorFor, onDay }) {
  const [shown, setShown] = useState(new Date(date.getFullYear(),date.getMonth(),1));
  useEffect(() => setShown(new Date(date.getFullYear(),date.getMonth(),1)),[date]);
  return <div className="mini-calendar"><div className="mini-month"><strong>{formatMonth(shown)}</strong><span>
    <button aria-label="Previous month" onClick={() => setShown(d => new Date(d.getFullYear(),d.getMonth()-1,1))}><ChevronLeft size={17}/></button>
    <button aria-label="Next month" onClick={() => setShown(d => new Date(d.getFullYear(),d.getMonth()+1,1))}><ChevronRight size={17}/></button></span></div>
    <div className="mini-grid">{WEEKDAYS.map(d => <span key={d} className="mini-weekday">{d.slice(0,1)}</span>)}
      {monthCells(shown).map((day,i) => {const items=getOccurrences(events,day);return <button key={i} className={`mini-day ${day.getMonth()!==shown.getMonth()?'mini-outside':''} ${sameDay(day,TODAY)?'mini-today':''}`} onClick={() => onDay(day)} aria-label={`Open ${day.toDateString()}`}><span>{day.getDate()}</span>{items.length > 0 && <i style={{background:colorFor(items[0].calendarId)}}/>}</button>})}</div>
  </div>;
}
