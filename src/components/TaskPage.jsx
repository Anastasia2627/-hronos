import React, { useEffect, useMemo, useState } from 'react';
import { emptyTask } from '../data.js';
import { PageHeading } from './Common.jsx';
import { TaskBoard } from './TaskBoard.jsx';
import { TaskToolbar } from './TaskToolbar.jsx';
import { TaskList } from './TaskList.jsx';
import { TaskTimeline } from './TaskTimeline.jsx';
import { BulkActions } from './BulkActions.jsx';
import { PageSkeleton } from './Skeleton.jsx';
import { TaskStats } from './TaskStats.jsx';

const ranking = { High: 0, Medium: 1, Low: 2 };

export function TaskPage({ tasks, filteredTasks, setTaskDraft, moveTask, moveTasks, setConfirmDelete }) {
  const [view, setView] = useState('board');
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('due');
  const [chosen, setChosen] = useState([]);
  const [busy, setBusy] = useState(false);
  useEffect(()=>{setChosen(current=>current.filter(id=>tasks.some(t=>t.id===id)));},[tasks]);
  const visible = useMemo(()=>filteredTasks.filter(task=>(status==='all'||task.stage===status)&&(priority==='all'||task.priority===priority)&&`${task.title} ${task.description}`.toLowerCase().includes(query.trim().toLowerCase())).sort((a,b)=>sort==='name'?a.title.localeCompare(b.title):sort==='priority'?(ranking[a.priority]-ranking[b.priority]):a.date.localeCompare(b.date)),[filteredTasks,status,priority,query,sort]);
  const choose = id=>setChosen(current=>current.includes(id)?current.filter(x=>x!==id):[...current,id]);
  const chooseAll = (checked,visibleTasks)=>setChosen(current=>checked?[...new Set([...current,...visibleTasks.map(t=>t.id)])]:current.filter(id=>!visibleTasks.some(t=>t.id===id)));
  const refresh = ()=>{setBusy(true);window.setTimeout(()=>setBusy(false),650);};
  const perform = stage=>{moveTasks(chosen,stage);setChosen([]);};
  return <div className="tasks-page"><PageHeading eyebrow="YOUR WORKSPACE" title="My tasks" subtitle="Everything in one place. Move at your own pace." />
    {view === 'list' && <TaskStats tasks={tasks} selected={status} onSelect={setStatus} />}
    <TaskToolbar view={view} onView={setView} stage={status} onStage={setStatus} priority={priority} onPriority={setPriority} sort={sort} onSort={setSort} query={query} onQuery={setQuery} onRefresh={refresh} onAdd={()=>setTaskDraft(emptyTask())} total={visible.length}/>
    {busy?<PageSkeleton page="tasks" view={view}/>:view==='board'?<TaskBoard tasks={visible} onOpen={setTaskDraft} onMove={moveTask} onAdd={stage=>setTaskDraft({...emptyTask(),stage})} chosen={chosen} onChoose={choose}/>:view==='list'?<TaskList tasks={visible} chosen={chosen} onChoose={choose} onChooseAll={chooseAll} onOpen={setTaskDraft} onMove={moveTask}/>:<TaskTimeline tasks={visible} onOpen={setTaskDraft}/>}
    <BulkActions count={chosen.length} onClear={()=>setChosen([])} onReview={()=>perform('review')} onComplete={()=>perform('done')} onDelete={()=>setConfirmDelete({kind:'bulk-task',ids:chosen,label:`${chosen.length} selected tasks`})}/>
  </div>;
}
