import React from 'react';
import { Plus } from 'lucide-react';
import { TeamStreamCard } from './TeamStreamCard.jsx';

export function TeamStreamColumn({ lane, tasks, onOpen, onStatus, onMoveLane, onAdd }) {
  const Icon = lane.icon;

  return <section className="stream-column" aria-label={`${lane.title}, ${tasks.length} tasks`}
    onDragOver={event => event.preventDefault()}
    onDrop={event => {
      event.preventDefault();
      const id = event.dataTransfer.getData('text/chronos-task');
      if (id) onMoveLane(id, lane.id);
    }}>
    <div className="stream-col-heading">
      <span className="stream-col-icon"><Icon size={19} strokeWidth={2.1} /></span>
      <div><strong>{lane.title}</strong></div>
      <span className="stream-col-count">{tasks.length}</span>
      <button aria-label={`Add task to ${lane.title}`} onClick={() => onAdd(lane.id)}><Plus size={19} /></button>
    </div>
    <div className="stream-track">
      {tasks.map(task => <TeamStreamCard key={task.id} task={task} onOpen={onOpen} onStatus={onStatus} />)}
      {!tasks.length && <p className="stream-empty">No tasks here yet.</p>}
      <button className="stream-add-card" onClick={() => onAdd(lane.id)}><Plus size={17} /> Add task</button>
    </div>
  </section>;
}
