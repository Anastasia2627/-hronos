import React, { useMemo, useState } from 'react';
import { ArrowUpDown, Filter, ListFilter, Plus, RefreshCw, Search, Star } from 'lucide-react';
import { emptyTask } from '../data.js';
import { TeamSpaceSidebar } from './workspace/TeamSpaceSidebar.jsx';
import { LANES, getLane } from './workspace/TeamStreamCard.jsx';
import { TeamStreamColumn } from './workspace/TeamStreamColumn.jsx';

export function TeamSpacePage({ tasks, onOpen, onStatus, onMoveLane, profile }) {
  const [active,setActive] = useState('all');
  const [search,setSearch] = useState('');
  const [hideDone,setHideDone] = useState(false);
  const [sortAsc,setSortAsc] = useState(true);
  const [favorite,setFavorite] = useState(true);
  const visible = useMemo(()=>tasks.filter(t=>(active==='all'||getLane(t)===active)&&(!hideDone||t.stage!=='done')&&`${t.title} ${t.description}`.toLowerCase().includes(search.toLowerCase())).sort((a,b)=>sortAsc?a.date.localeCompare(b.date):b.date.localeCompare(a.date)),[tasks,active,hideDone,search,sortAsc]);
  const add = lane => onOpen({...emptyTask(),workspaceLane:lane});
  return <div className="team-space-page"><div className="team-space-shell"><TeamSpaceSidebar active={active} onActive={setActive} onAdd={add}/>
    <div className="team-space-main"><header className="team-space-topbar"><span className="team-board-label">My Task Board <b>#1</b></span><button className={`team-favorite ${favorite?'on':''}`} aria-label="Toggle favorite board" aria-pressed={favorite} onClick={()=>setFavorite(!favorite)}><Star size={17} fill={favorite?'currentColor':'none'}/></button>
      <span className="team-board-spacer"/><label className="team-search"><Search size={16}/><input className="team-search-input" placeholder="Search this board" value={search} onChange={e=>setSearch(e.target.value)}/></label>
      <button className={`team-filter-toggle ${hideDone?'on':''}`} onClick={()=>setHideDone(!hideDone)}><Filter size={16}/> {hideDone?'Active only':'All cards'}</button>
      <button className="team-add-main" onClick={()=>add(active==='all'?'team':active)}><Plus size={17}/> New task</button>
      <span className="team-mini-avatar">{(profile.name||'A').slice(0,1).toUpperCase()}</span>
    </header>
    <div className="team-space-heading"><div><span className="team-space-eyebrow">YOUR COLLABORATIVE SPACE</span><h1>Team workspace</h1><p>Keep your team ideas, plans and tasks together.</p></div><button className="team-sort-btn" onClick={()=>setSortAsc(!sortAsc)}><ArrowUpDown size={16}/> {sortAsc?'Earliest first':'Latest first'}</button></div>
    <div className="team-streams">{LANES.filter(l=>active==='all'||l.id===active).map(l=><TeamStreamColumn key={l.id} lane={l} tasks={visible.filter(t=>getLane(t)===l.id)} onOpen={onOpen} onStatus={onStatus} onMoveLane={onMoveLane} onAdd={add}/>)}</div>
    </div></div></div>;
}
