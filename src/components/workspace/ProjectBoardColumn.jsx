import React from 'react';
import { CalendarDays, Check, Plus } from 'lucide-react';
import { formatShort, parseDate } from '../../data.js';

export const PROJECT_STAGES=[
  {id:'todo',title:'To do',color:'cyan'},
  {id:'progress',title:'In progress',color:'pink'},
  {id:'review',title:'In review',color:'amber'},
  {id:'done',title:'Done',color:'mint'},
];

export function ProjectBoardColumn({stage,tasks,onAdd,onOpen,onMove}){
  return <section className="project-column" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const id=e.dataTransfer.getData('text/chronos-task');if(id)onMove(id,stage.id)}}>
    <div className="project-col-heading"><span className={`project-col-label ${stage.color}`}>{stage.title}</span><span className="project-col-count">{tasks.length}</span><button onClick={()=>onAdd(stage.id)} title={`Add task to ${stage.title}`} aria-label={`Add to ${stage.title}`}><Plus size={18}/></button></div>
    <div className="project-card-stack">{tasks.map(task=><div key={task.id} className="project-card" draggable onDragStart={e=>e.dataTransfer.setData('text/chronos-task',task.id)}>
      <button className="project-card-main" onClick={()=>onOpen({...task})} aria-label={`Edit ${task.title}`}>
        <span className="project-card-top"><span className="project-card-category" style={{color:task.color}}>{task.priority==='High'?'High priority':task.priority==='Low'?'Low priority':'Task'}</span></span>
        <strong>{task.title}</strong>{task.description && <p>{task.description}</p>}
        <span className="project-card-bottom"><span className="project-person" style={{'--person-color':task.color}}>{task.initials||'ME'}</span><span className="project-card-meta"><CalendarDays size={15}/>{formatShort(parseDate(task.date))}</span>{task.stage==='done'&&<Check className="project-completed" size={17}/>}</span>
      </button><span className={`project-corner ${stage.color}`}/>
    </div>)}<button className="project-add-card" onClick={()=>onAdd(stage.id)}><Plus size={17}/> Add task</button></div>
  </section>;
}
