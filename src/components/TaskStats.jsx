import React from 'react';
import { CheckCircle2, ClipboardList, Clock3, Eye } from 'lucide-react';

const CARDS = [
  { label: 'To do', stage: 'todo', icon: ClipboardList, tone: 'purple' },
  { label: 'In progress', stage: 'progress', icon: Clock3, tone: 'orange' },
  { label: 'In review', stage: 'review', icon: Eye, tone: 'blue' },
  { label: 'Completed', stage: 'done', icon: CheckCircle2, tone: 'green' }
];

export function TaskStats({ tasks, selected, onSelect }) {
  return <div className="task-stats">{CARDS.map(({ label, stage, icon: Icon, tone }) => <button type="button" key={stage} className={`task-stat ${selected === stage ? 'task-stat-active' : ''}`} onClick={() => onSelect(selected === stage ? 'all' : stage)} aria-pressed={selected === stage}><span className={`task-stat-icon status-${tone}`}><Icon size={18} /></span><span className="task-stat-label">{label}</span><strong>{tasks.filter(t => t.stage === stage).length.toString().padStart(2, '0')}</strong></button>)}</div>;
}
