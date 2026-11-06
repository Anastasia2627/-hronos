import React, { useMemo, useState } from 'react';
import { ArrowUpDown, Filter, Plus, Search } from 'lucide-react';
import { emptyTask } from '../data.js';
import { LANES, getLane } from './workspace/TeamStreamCard.jsx';
import { TeamStreamColumn } from './workspace/TeamStreamColumn.jsx';

export function TeamSpacePage({tasks,onOpen,onStatus,onMoveLane}){
  const [active,setActive]=useState('all');
  const [query,setQuery]=useState('');
  const [hideDone,setHideDone]=useState(false);
  const [earliest,setEarliest]=useState(true);
  const visible=useMemo(()=>tasks.filter(task=>(active==='all'||getLane(task)===active)&&(!hideDone||task.stage!=='done')&&`${task.title} ${task.description}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>earliest?a.date.localeCompare(b.date):b.date.localeCompare(a.date)),[tasks,active,hideDone,query,earliest]);
  const add=lane=>onOpen({...emptyTask(),workspaceLane:lane});
  return <div className="team-space-page simplified-team"><div className="team-space-shell"><div className="team-space-main">
    <header className="team-space-heading"><div><h1>Team space</h1><p>Tasks grouped by topic</p></div><button className="btn btn-primary" onClick={()=>add(active==='all'?'team':active)}><Plus size={18}/> New task</button></header>
    <div className="team-space-topbar team-simple-toolbar"><div className="team-lane-tabs" role="group" aria-label="Group by topic"><button className={active==='all'?'selected':''} onClick={()=>setActive('all')}>All</button>{LANES.map(l=><button key={l.id} className={active===l.id?'selected':''} onClick={()=>setActive(l.id)}>{l.title}</button>)}</div>
      <span className="team-board-spacer"/><label className="team-search"><Search size={17}/><input className="team-search-input" placeholder="Find a task" value={query} onChange={e=>setQuery(e.target.value)}/></label>
      <button className={`team-filter-toggle ${hideDone?'on':''}`} onClick={()=>setHideDone(!hideDone)} aria-pressed={hideDone}><Filter size={16}/>{hideDone?'Active only':'All statuses'}</button>
      <button className="team-sort-btn" onClick={()=>setEarliest(!earliest)}><ArrowUpDown size={17}/>{earliest?'Oldest':'Newest'}</button>
    </div>
    <div className="team-streams">{LANES.filter(l=>active==='all'||l.id===active).map(l=><TeamStreamColumn key={l.id} lane={l} tasks={visible.filter(t=>getLane(t)===l.id)} onOpen={onOpen} onStatus={onStatus} onMoveLane={onMoveLane} onAdd={add}/>)}</div>
  </div></div></div>;
}
