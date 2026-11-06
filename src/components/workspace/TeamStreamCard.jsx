import React from 'react';
import { CalendarDays, CheckCircle2, Flag, Layers3, Lightbulb, UsersRound } from 'lucide-react';
import { STAGES, formatShort, parseDate } from '../../data.js';

const tones = { todo: 'gray', progress: 'yellow', review: 'blue', done: 'green' };
const nextStage = { todo: 'progress', progress: 'review', review: 'done', done: 'todo' };

export const LANES = [
  { id: 'team', title: 'Team tasks', icon: UsersRound },
  { id: 'ideas', title: 'Ideas', icon: Lightbulb },
  { id: 'other', title: 'Other', icon: Layers3 },
];

export const getLane = task => task.workspaceLane || (task.initials === 'AK' ? 'team' : task.priority === 'Low' ? 'ideas' : 'other');

export function TeamStreamCard({ task, onOpen, onStatus }) {
  const stage = STAGES.find(item => item.id === task.stage);
  const next = nextStage[task.stage];
  const nextLabel = STAGES.find(item => item.id === next)?.name;

  return <article className="stream-entry" draggable onDragStart={event => {
    event.dataTransfer.setData('text/chronos-task', task.id);
  }}>
    <span className="stream-person" style={{ '--stream-person': task.color }}>{task.initials || 'ME'}</span>
    <div className="stream-card-shell">
      <button className="stream-task-card" style={{ '--stream-accent': task.color }} onClick={() => onOpen({ ...task })}>
        <span className="stream-card-top">{task.priority === 'High' && <Flag size={15} />}{task.priority} priority</span>
        <strong>{task.title}</strong>
        {task.description && <p>{task.description}</p>}
      </button>
      <div className="stream-card-footer">
        <span className="stream-card-meta"><CalendarDays size={15} />{formatShort(parseDate(task.date))}</span>
        <button className={`stream-status status-${tones[task.stage]}`} onClick={() => onStatus(task.id, next)}
          aria-label={`Change ${task.title} status from ${stage?.name} to ${nextLabel}`} title={`Next status: ${nextLabel}`}>
          {task.stage === 'done' && <CheckCircle2 size={15} />}{stage?.name}
        </button>
      </div>
    </div>
  </article>;
}
