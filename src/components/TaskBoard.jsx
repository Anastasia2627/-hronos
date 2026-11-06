import React from 'react';
import {
  CalendarDays,
  Plus,
  MoreHorizontal,
  Check,
  CheckCircle2,
  Pencil,
  Timer,
  FolderOpen,
  Eye,
  ListChecks
} from 'lucide-react';
import { parseDate, formatShort, STAGES } from '../data.js';
import { initials } from '../lib/shared.jsx';

export function TaskBoard({ tasks, onOpen, onMove, onAdd, compact = false }) { const stages = compact ? STAGES.filter(x => x.id !== 'review') : STAGES; return <div className={`kanban-board ${compact ? 'kanban-compact' : ''}`}>{stages.map((stage) => { const items = tasks.filter(t => t.stage === stage.id || (compact && stage.id === 'progress' && t.stage === 'review')); return <section className={`kanban-column column-${stage.tone}`} key={stage.id} onDragOver={e => { if (!compact) e.preventDefault(); }} onDrop={e => { if (compact) return; e.preventDefault(); const id = e.dataTransfer.getData('text/chronos-task'); if (id) onMove(id, stage.id); }}><div className="kanban-heading"><span className={`kanban-title-icon kanban-${stage.tone}`}>{stage.id === 'done' ? <Check size={16} /> : stage.id === 'progress' ? <Timer size={16} /> : stage.id === 'review' ? <Eye size={16} /> : <ListChecks size={16} />}</span><strong>{stage.name}</strong><span className="count-pill">{items.length}</span><button className="icon-button" title={`Add task to ${stage.name}`} onClick={() => onAdd(stage.id)}><MoreHorizontal size={18} /></button></div><div className="kanban-items">{items.slice(0, compact ? 3 : undefined).map((task) => { const done = task.stage === 'done'; return <button key={task.id} draggable={!compact} onDragStart={(e) => e.dataTransfer.setData('text/chronos-task', task.id)} className="task-card" style={{ '--task-accent': task.color }} onClick={() => onOpen({ ...task })}><div className="task-card-top"><span className="task-card-glyph">{done ? <CheckCircle2 size={19} /> : task.stage === 'review' ? <Eye size={19} /> : task.stage === 'progress' ? <Pencil size={18} /> : <FolderOpen size={18} />}</span><span className={`task-priority ${task.priority.toLowerCase()}`}>{task.priority}</span></div><strong>{task.title}</strong><p>{task.description}</p><div className="task-bottom"><span className="task-initials">{task.initials}</span><span className="task-due"><CalendarDays size={13} />{formatShort(parseDate(task.date))}</span>{done && <CheckCircle2 size={16} className="task-done-icon" />}</div></button> })}{!compact && <button className="add-task-slot" onClick={() => onAdd(stage.id)}><Plus size={15} /> Add task</button>}{compact && items.length > 3 && <span className="more-task-count">+{items.length - 3} more tasks</span>}</div></section> })}</div>; }
