import React from 'react';
import { ArrowRight, CalendarClock, ListTodo, CalendarDays } from 'lucide-react';
import { formatTime, formatShort, parseDate } from '../../data.js';
import { AdaptivePill } from '../ui/AdaptivePill.jsx';

export function HomeFocus({date,events,tasks,colorFor,onEvent,onTask,onPage}) {
  const pending = tasks.filter(t=>t.stage!=='done').sort((a,b)=>a.date.localeCompare(b.date)).slice(0,3);
  const todays = [...events].sort((a,b)=>a.start.localeCompare(b.start)).slice(0,3);
  return <section className="home-focus" aria-label="Today at a glance">
    <div className="home-section-heading"><h2>Today at a glance</h2><span>{date.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</span></div>
    <div className="home-focus-grid">
      <div className="home-focus-card">
        <header><span className="home-focus-heading"><CalendarClock size={20}/> Schedule</span><button onClick={()=>onPage('schedule')}>View day <ArrowRight size={16}/></button></header>
        {todays.length ? todays.map(event=><button key={event.id} className="home-focus-row" onClick={()=>onEvent(event)}><span className="home-focus-mark" style={{background:colorFor(event.calendarId)}}/><span className="home-focus-main"><strong>{event.title}</strong><small>{event.location||'Event'}</small></span><span className="home-focus-meta">{formatTime(event.start)}</span></button>) : <p className="home-focus-empty"><CalendarDays size={20}/> No events for today</p>}
      </div>
      <div className="home-focus-card">
        <header><span className="home-focus-heading"><ListTodo size={20}/> Next tasks</span><button onClick={()=>onPage('tasks')}>View tasks <ArrowRight size={16}/></button></header>
        {pending.length ? pending.map(task=><button key={task.id} className="home-focus-row" onClick={()=>onTask({...task})}><span className="home-focus-mark" style={{background:task.color}}/><span className="home-focus-main"><strong>{task.title}</strong><small>{formatShort(parseDate(task.date))}</small></span><AdaptivePill status={task.stage} compact /></button>) : <p className="home-focus-empty">All tasks are complete</p>}
      </div>
    </div>
  </section>;
}
