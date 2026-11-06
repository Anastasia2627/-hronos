import React, { useState } from 'react';
import { CalendarDays, Check, ChevronLeft, ChevronRight, Circle, Flag, Milestone } from 'lucide-react';
import { STAGES, parseDate, formatShort } from '../data.js';
import { TimelineNotes } from './TimelineNotes.jsx';

function monthStart(date) { return new Date(date.getFullYear(),date.getMonth(),1); }

export function TaskTimeline({ tasks, onOpen }) {
  const [shown, setShown] = useState(() => monthStart(new Date()));
  const year = shown.getFullYear();
  const monthly = tasks.filter(t => {const date=parseDate(t.date);return date.getFullYear()===year && date.getMonth()===shown.getMonth();}).sort((a,b)=>a.date.localeCompare(b.date));
  const done = monthly.filter(t => t.stage==='done').length;
  const complete = monthly.length ? (done / monthly.length) * 100 : 0;
  const days = new Date(year,shown.getMonth()+1,0).getDate();
  return <div className="milestone-layout"><div className="milestone-surface"><div className="milestone-header"><div><span className="eyebrow">PROJECT ROADMAP</span><h2>Milestones</h2><p>{done} of {monthly.length} milestones complete this month</p></div><div className="milestone-month"><button aria-label="Previous month" onClick={()=>setShown(d=>new Date(d.getFullYear(),d.getMonth()-1,1))}><ChevronLeft size={18}/></button><strong>{shown.toLocaleDateString('en-US',{month:'long',year:'numeric'})}</strong><button aria-label="Next month" onClick={()=>setShown(d=>new Date(d.getFullYear(),d.getMonth()+1,1))}><ChevronRight size={18}/></button></div></div>
    <div className="timeline-road" aria-label={`${Math.round(complete)} percent of this month's milestones complete`}><div className="timeline-progress" style={{width:`${complete}%`}} />{monthly.map((t,i)=>{const day=parseDate(t.date).getDate();return <button key={t.id} style={{left:`${3+(day-1)/(Math.max(1,days-1))*94}%`}} className={`timeline-pin ${t.stage==='done'?'timeline-pin-done':''}`} onClick={()=>onOpen({...t})} title={`${t.title}, ${formatShort(parseDate(t.date))}`}><span>{t.stage==='done'?<Check size={15}/>:<Flag size={15}/>}</span><small>{day}</small></button>;})}</div>
    <div className="milestone-labels"><span>1 {shown.toLocaleString('en-US',{month:'short'})}</span><span>{days} {shown.toLocaleString('en-US',{month:'short'})}</span></div>
    <div className="milestone-list-header"><h3>Upcoming milestones</h3><span>{monthly.length} total</span></div><div className="milestone-list">{monthly.map(t=>{const stage=STAGES.find(x=>x.id===t.stage)||STAGES[0];return <button key={t.id} className="milestone-item" onClick={()=>onOpen({...t})}><span className={`milestone-item-icon status-${stage.tone}`}>{t.stage==='done'?<Check size={17}/>:<Milestone size={17}/>}</span><span className="milestone-item-name"><strong>{t.title}</strong><small>{t.description}</small></span><span className={`work-status status-${stage.tone}`}>{stage.name}</span><span className="table-date"><CalendarDays size={15}/>{formatShort(parseDate(t.date))}</span></button>;})}{!monthly.length && <div className="work-empty"><Circle size={25}/><strong>No milestones this month</strong><p>Use the arrows to explore other months, or add a task with a due date.</p></div>}</div>
  </div><TimelineNotes /></div>;
}
