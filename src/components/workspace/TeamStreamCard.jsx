import React from 'react';
import { CalendarDays, CheckCircle2, CircleDot, Ellipsis, Flag, MessageCircle, Paperclip } from 'lucide-react';
import { STAGES, formatShort, parseDate } from '../../data.js';

const tones = { todo:'gray', progress:'yellow', review:'blue', done:'green' };
const statusLabels = { todo:'PENDING', progress:'IN PROGRESS', review:'IN REVIEW', done:'DONE' };
export const LANES = [
  { id:'team', title:'Team tasks', subtitle:'Things to get done', icon:'✦' },
  { id:'ideas', title:'Ideas to explore', subtitle:'Upcoming inspiration', icon:'✳' },
  { id:'other', title:'Other stuff', subtitle:'For everything else', icon:'◌' },
];
export function getLane(task) {
  return task.workspaceLane || (task.initials === 'AK' ? 'team' : task.priority === 'Low' ? 'ideas' : 'other');
}
export function TeamStreamCard({ task, onOpen, onStatus }) {
  const next = {todo:'progress',progress:'review',review:'done',done:'todo'}[task.stage];
  const status = STAGES.find(s=>s.id===task.stage);
  return <div className="stream-entry" draggable onDragStart={e=>e.dataTransfer.setData('text/chronos-task',task.id)}>
    <span className="stream-person" style={{'--stream-person':task.color}}>{task.initials || 'ME'}</span>
    <button className="stream-task-card" onClick={()=>onOpen({...task})} style={{'--stream-accent':task.color}}>
      <span className="stream-card-top"><span>{task.priority==='High' ? <Flag size={14}/> : <CircleDot size={14}/>} {task.priority === 'High'?'High priority':'Workspace'}</span><Ellipsis size={18}/></span>
      <strong>{task.title}</strong><p>{task.description || 'Add some details to this task'}</p>
      <span className="stream-card-meta"><span><CalendarDays size={13}/>{formatShort(parseDate(task.date))}</span><span><MessageCircle size={13}/>0</span><span><Paperclip size={13}/>0</span></span>
    </button>
    <button className={`stream-status status-${tones[task.stage]}`} onClick={()=>onStatus(task.id,next)} title={`Change status to ${STAGES.find(s=>s.id===next)?.name}`} aria-label={`Status ${status?.name} for ${task.title}. Change to next status`}>{task.stage==='done'&&<CheckCircle2 size={13}/>} {statusLabels[task.stage]}</button>
  </div>;
}
