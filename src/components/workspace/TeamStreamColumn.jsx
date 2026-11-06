import React from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';
import { TeamStreamCard } from './TeamStreamCard.jsx';

export function TeamStreamColumn({ lane, tasks, onOpen, onStatus, onMoveLane, onAdd }) {
  return <section className="stream-column" onDragOver={e=>e.preventDefault()} onDrop={e=>{
    e.preventDefault();const id=e.dataTransfer.getData('text/chronos-task');if(id)onMoveLane(id,lane.id);
  }}>
    <div className="stream-col-heading"><span className="stream-col-icon">{lane.icon}</span><div><strong>{lane.title}</strong><small>{lane.subtitle}</small></div><span className="stream-col-count">{tasks.length}</span><button title={`Add to ${lane.title}`} onClick={()=>onAdd(lane.id)}><Plus size={18}/></button></div>
    <div className="stream-track">{tasks.map(t=><TeamStreamCard key={t.id} task={t} onOpen={onOpen} onStatus={onStatus}/>)}
      {!tasks.length&&<p className="stream-empty">No tasks here yet. Add your first one.</p>}
      <button className="stream-add-card" onClick={()=>onAdd(lane.id)}><Plus size={15}/> Add task</button>
    </div>
  </section>;
}
