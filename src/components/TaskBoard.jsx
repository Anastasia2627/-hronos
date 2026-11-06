import React from 'react';
import { CalendarDays, CheckCircle2, Plus, Palette, Code2, Search, FileText, LayoutTemplate, ClipboardList } from 'lucide-react';
import { parseDate, formatShort, STAGES } from '../data.js';
import { AdaptivePill } from './ui/AdaptivePill.jsx';

const taskIcon = (title = '') => {
  const text = title.toLowerCase();
  if (/design|wireframe|component|brand/.test(text)) return Palette;
  if (/build|implement|develop|code/.test(text)) return Code2;
  if (/research|competitor/.test(text)) return Search;
  if (/brief|document|requirement/.test(text)) return FileText;
  if (/project|planning|homepage/.test(text)) return LayoutTemplate;
  return ClipboardList;
};

function TaskCard({ task, compact, selected, onOpen, onChoose }) {
  const done = task.stage === 'done';
  const Icon = done ? CheckCircle2 : taskIcon(task.title);
  return <div className={`task-card-wrap ${selected?'task-card-selected':''}`} draggable={!compact} onDragStart={e=>{e.dataTransfer.setData('text/chronos-task',task.id);}}>
    {!compact && onChoose && <input className="task-card-check" type="checkbox" aria-label={`Select ${task.title}`} checked={selected} onChange={()=>onChoose(task.id)} onClick={e=>e.stopPropagation()} />}
    <button className="task-card" style={{'--task-accent':task.color}} onClick={()=>onOpen({...task})}>
      <div className="task-card-top"><span className="task-card-glyph"><Icon size={18} strokeWidth={2.25}/></span><AdaptivePill status={task.priority.toLowerCase()} /></div>
      <strong>{task.title}</strong>{task.description && <p>{task.description}</p>}
      <div className="task-bottom"><span className="task-initials">{task.initials}</span><span className="task-due"><CalendarDays size={14}/>{formatShort(parseDate(task.date))}</span>{done&&<CheckCircle2 size={16} className="task-done-icon"/>}</div>
    </button>
  </div>;
}

export function TaskBoard({ tasks, onOpen, onMove, onAdd, compact = false, chosen = [], onChoose }) {
  const stages = compact ? STAGES.filter(x=>x.id!=='review') : STAGES;
  return <div className={`kanban-board ${compact?'kanban-compact':''}`}>{stages.map(stage=>{
    const items=tasks.filter(t=>t.stage===stage.id || (compact&&stage.id==='progress'&&t.stage==='review'));
    return <section key={stage.id} className={`kanban-column column-${stage.tone}`} onDragOver={e=>{if(!compact)e.preventDefault();}} onDrop={e=>{if(compact)return;e.preventDefault();const id=e.dataTransfer.getData('text/chronos-task');if(id)onMove(id,stage.id);}}>
      <div className="kanban-heading"><AdaptivePill status={stage.id} className="adaptive-pill-responsive" /><span className="count-pill">{items.length}</span><button className="icon-button" aria-label={`Add task to ${stage.name}`} onClick={()=>onAdd(stage.id)}><Plus size={17}/></button></div>
      <div className="kanban-items">{items.slice(0,compact?3:undefined).map(task=><TaskCard key={task.id} task={task} compact={compact} selected={chosen.includes(task.id)} onChoose={onChoose} onOpen={onOpen}/>)}
        {!compact&&<button className="add-task-slot" onClick={()=>onAdd(stage.id)}><Plus size={16}/> Add task</button>}
        {compact&&items.length>3&&<span className="more-task-count">+{items.length-3} more tasks</span>}
      </div>
    </section>;
  })}</div>;
}
