import React, { useMemo, useState } from 'react';
import { emptyTask } from '../data.js';
import { TaskList } from './TaskList.jsx';
import { BulkActions } from './BulkActions.jsx';
import { ProjectHeader } from './workspace/ProjectHeader.jsx';
import { PROJECT_STAGES, ProjectBoardColumn } from './workspace/ProjectBoardColumn.jsx';

export function ProjectBoardPage({ tasks, onOpen, onMove, onMoveMany, onConfirmDelete }) {
  const [view,setView] = useState('board');
  const [query,setQuery] = useState('');
  const [priority,setPriority] = useState('all');
  const [chosen,setChosen] = useState([]);
  const visible = useMemo(()=>tasks.filter(t=>(priority==='all'||t.priority===priority)&&`${t.title} ${t.description}`.toLowerCase().includes(query.toLowerCase().trim())),[tasks,priority,query]);
  const create = stage => onOpen({...emptyTask(),stage});
  return <div className="project-page"><div className="project-shell"><ProjectHeader view={view} setView={setView} query={query} setQuery={setQuery} priority={priority} setPriority={setPriority} onAdd={()=>create('todo')} count={visible.length}/>
    {view==='board'?<div className="project-board-grid">{PROJECT_STAGES.map(s=><ProjectBoardColumn key={s.id} stage={s} tasks={visible.filter(t=>t.stage===s.id)} onAdd={create} onOpen={onOpen} onMove={onMove}/>)}</div>:
      <div className="project-list-panel"><TaskList tasks={visible} chosen={chosen} onChoose={id=>setChosen(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id])} onChooseAll={(checked,items)=>setChosen(checked?items.map(t=>t.id):[])} onOpen={onOpen} onMove={onMove}/></div>}
      <BulkActions count={chosen.length} onClear={()=>setChosen([])} onReview={()=>{onMoveMany(chosen,'review');setChosen([])}} onComplete={()=>{onMoveMany(chosen,'done');setChosen([])}} onDelete={()=>onConfirmDelete({kind:'bulk-task',ids:chosen,label:`${chosen.length} selected tasks`})}/>
    </div></div>;
}
