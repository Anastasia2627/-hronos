import React, { useEffect, useMemo, useState } from 'react';
import { emptyTask } from '../data.js';
import { PageHeading } from './Common.jsx';
import { TaskBoard } from './TaskBoard.jsx';
import { TaskToolbar } from './TaskToolbar.jsx';
import { TaskList } from './TaskList.jsx';
import { TaskTimeline } from './TaskTimeline.jsx';
import { BulkActions } from './BulkActions.jsx';

const rank={High:0,Medium:1,Low:2};
export function TaskPage({ tasks, filteredTasks, setTaskDraft, moveTask, moveTasks, setConfirmDelete }) {
  const [view,setView]=useState('board');
  const [stage,setStage]=useState('all');
  const [priority,setPriority]=useState('all');
  const [sort,setSort]=useState('due');
  const [chosen,setChosen]=useState([]);
  useEffect(()=>setChosen(current=>current.filter(id=>tasks.some(t=>t.id===id))),[tasks]);
  const visible=useMemo(()=>filteredTasks.filter(t=>(stage==='all'||t.stage===stage)&&(priority==='all'||t.priority===priority)).sort((a,b)=>sort==='name'?a.title.localeCompare(b.title):sort==='priority'?rank[a.priority]-rank[b.priority]:a.date.localeCompare(b.date)),[filteredTasks,stage,priority,sort]);
  const choose=id=>setChosen(current=>current.includes(id)?current.filter(x=>x!==id):[...current,id]);
  const chooseAll=(checked,listed)=>setChosen(current=>checked?[...new Set([...current,...listed.map(t=>t.id)])]:current.filter(id=>!listed.some(t=>t.id===id)));
  const perform=next=>{moveTasks(chosen,next);setChosen([])};
  return <div className="tasks-page"><PageHeading title="Tasks" />
    <TaskToolbar view={view} onView={setView} stage={stage} onStage={setStage} priority={priority} onPriority={setPriority} sort={sort} onSort={setSort} onAdd={()=>setTaskDraft(emptyTask())} total={visible.length}/>
    {view==='board'?<TaskBoard tasks={visible} onOpen={setTaskDraft} onMove={moveTask} onAdd={next=>setTaskDraft({...emptyTask(),stage:next})} chosen={chosen} onChoose={choose}/>:view==='list'?<TaskList tasks={visible} chosen={chosen} onChoose={choose} onChooseAll={chooseAll} onOpen={setTaskDraft} onMove={moveTask}/>:<TaskTimeline tasks={visible} onOpen={setTaskDraft}/>}
    <BulkActions count={chosen.length} onClear={()=>setChosen([])} onReview={()=>perform('review')} onComplete={()=>perform('done')} onDelete={()=>setConfirmDelete({kind:'bulk-task',ids:chosen,label:`${chosen.length} selected tasks`})}/>
  </div>;
}
