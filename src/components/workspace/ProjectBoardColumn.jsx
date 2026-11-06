import React from 'react';
import { CalendarDays, Check, MessageCircle, MoreHorizontal, Paperclip, Plus } from 'lucide-react';
import { formatShort, parseDate } from '../../data.js';

export const PROJECT_STAGES = [
  { id: 'todo', title: 'Backlog', color: 'cyan' },
  { id: 'progress', title: 'On Progress', color: 'pink' },
  { id: 'review', title: 'Quality Check', color: 'amber' },
  { id: 'done', title: 'Done', color: 'mint' },
];

export function ProjectBoardColumn({ stage, tasks, onAdd, onOpen, onMove }) {
  return <section className="project-column" onDragOver={e => e.preventDefault()} onDrop={e => {
    e.preventDefault(); const id = e.dataTransfer.getData('text/chronos-task');
    if (id) onMove(id, stage.id);
  }}>
    <div className="project-col-heading">
      <span className={`project-col-label ${stage.color}`}>{stage.title}</span>
      <span className="project-col-count">{tasks.length}</span>
      <button onClick={() => onAdd(stage.id)} aria-label={`Add to ${stage.title}`} title="Add task"><Plus size={18}/></button>
    </div>
    <div className="project-card-stack">
      {tasks.map(task => <div className="project-card" key={task.id} draggable onDragStart={e => e.dataTransfer.setData('text/chronos-task', task.id)}>
        <button className="project-card-main" onClick={() => onOpen({...task})} aria-label={`Edit ${task.title}`}>
          <span className="project-card-top"><span className="project-card-category" style={{color:task.color}}>{task.priority === 'High' ? 'Priority focus' : task.priority === 'Low' ? 'Planning' : 'Project work'}</span><MoreHorizontal size={18}/></span>
          <strong>{task.title}</strong><p>{task.description || 'No description added'}</p>
          <span className="project-card-bottom"><span className="project-avatars"><span className="project-person" style={{'--person-color': task.color}}>{task.initials || 'ME'}</span></span>
            <span className="project-card-meta"><CalendarDays size={14}/>{formatShort(parseDate(task.date))}</span>
            <span className="project-card-meta"><MessageCircle size={14}/>0</span>
            <span className="project-card-meta"><Paperclip size={14}/>0</span>
            {task.stage === 'done' && <Check className="project-completed" size={17}/>}</span>
        </button>
        <span className={`project-corner ${stage.color}`}/>
      </div>)}
      <button className="project-add-card" onClick={() => onAdd(stage.id)}><Plus size={17}/> Add card</button>
    </div>
  </section>;
}
