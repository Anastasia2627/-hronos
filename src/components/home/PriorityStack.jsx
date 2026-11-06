import React from 'react';
import { ArrowUpRight, Pin, Plus } from 'lucide-react';
import { formatShort, parseDate } from '../../data.js';

export function PriorityStack({ tasks, onTask, onPage }) {
  const featured = tasks.filter(task => task.stage !== 'done' && (task.featured || task.priority === 'High')).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  return <section className="priority-highlight" aria-labelledby="priority-stack-title">
    <div className="priority-highlight-head"><div><span className="priority-highlight-kicker"><Pin size={15} /> STAY ON TRACK</span><h3 id="priority-stack-title">Priority stack</h3><p>The tasks worth your attention today.</p></div><button type="button" onClick={() => onPage('tasks')}>All tasks <ArrowUpRight size={17} /></button></div>
    <div className="priority-highlight-content">
      {featured.length ? featured.map((task, index) => <button type="button" className="priority-highlight-card" key={task.id} onClick={() => onTask({ ...task })} style={{ '--stack-index': index, '--task-accent': task.color || '#ef8a45' }}>
        <div className="priority-highlight-card-meta"><span>{task.featured ? 'PINNED' : 'HIGH PRIORITY'}</span><span>{task.priority} priority</span></div>
        <strong>{task.title}</strong><p>{task.description || 'Open the task to see more details'}</p>
        <div className="priority-highlight-card-footer"><span>{formatShort(parseDate(task.date))}</span><span>{task.initials || '—'}</span></div>
      </button>) : <div className="priority-highlight-empty"><span><Plus size={22} /></span><strong>Make space for what matters.</strong><p>Open any task and switch on “Add to Priority stack”.</p></div>}
    </div>
  </section>;
}
