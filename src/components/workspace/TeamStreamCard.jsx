import React from 'react';
import { CalendarDays, CheckCircle2, Flag } from 'lucide-react';
import { STAGES, formatShort, parseDate } from '../../data.js';

const tones={todo:'gray',progress:'yellow',review:'blue',done:'green'};
export const LANES=[
  {id:'team',title:'Team tasks',subtitle:'Shared work',icon:'✦'},
  {id:'ideas',title:'Ideas',subtitle:'To explore',icon:'✳'},
  {id:'other',title:'Other',subtitle:'Everything else',icon:'◌'},
];
export const getLane=task=>task.workspaceLane||(task.initials==='AK'?'team':task.priority==='Low'?'ideas':'other');
export function TeamStreamCard({task,onOpen,onStatus}){
  const next={todo:'progress',progress:'review',review:'done',done:'todo'}[task.stage];
  const status=STAGES.find(s=>s.id===task.stage);
  return <div className="stream-entry" draggable onDragStart={e=>e.dataTransfer.setData('text/chronos-task',task.id)}>
    <span className="stream-person" style={{'--stream-person':task.color}}>{task.initials||'ME'}</span>
    <button className="stream-task-card" onClick={()=>onOpen({...task})} style={{'--stream-accent':task.color}}>
      <span className="stream-card-top"><span>{task.priority==='High'&&<Flag size={15}/>} {task.priority} priority</span></span>
      <strong>{task.title}</strong>{task.description&&<p>{task.description}</p>}
      <span className="stream-card-meta"><span><CalendarDays size={15}/>{formatShort(parseDate(task.date))}</span></span>
    </button>
    <button className={`stream-status status-${tones[task.stage]}`} onClick={()=>onStatus(task.id,next)} title={`Change to ${STAGES.find(s=>s.id===next)?.name}`} aria-label={`Change ${task.title} from ${status?.name} to next status`}>{task.stage==='done'&&<CheckCircle2 size={14}/>} {status?.name}</button>
  </div>;
}
