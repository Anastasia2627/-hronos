import React from 'react';
import { Bell, BookOpen, Folder, FolderOpen, Home, Layers3, ListTodo, Plus, Search, Settings2 } from 'lucide-react';
import { LANES } from './TeamStreamCard.jsx';

export function TeamSpaceSidebar({ active, onActive, onAdd }) {
  return <aside className="team-internal-sidebar"><div className="team-internal-brand"><span className="team-symbol">c<span>.</span></span><strong>Team space</strong></div>
    <div className="team-space-modes"><button className={active==='all'?'selected':''} onClick={()=>onActive('all')}>All tasks</button><button className={active==='team'?'selected':''} onClick={()=>onActive('team')}>Team tasks</button></div>
    <div className="team-nav-caption">WORKSPACE</div>
    <button className="team-side-link" onClick={()=>onActive('all')}><Layers3 size={16}/> My board</button>
    <button className="team-side-link" onClick={()=>onActive('team')}><ListTodo size={16}/> My tasks</button>
    <button className="team-side-link" onClick={()=>document.querySelector('.team-search-input')?.focus()}><Search size={16}/> Find a task</button>
    <div className="team-side-heading"><span>COLLECTIONS</span><button aria-label="Add task" title="Add task" onClick={()=>onAdd('team')}><Plus size={17}/></button></div>
    {LANES.map(l=><button className={`team-folder ${active===l.id?'selected':''}`} key={l.id} onClick={()=>onActive(active===l.id?'all':l.id)}>{active===l.id?<FolderOpen size={16}/>:<Folder size={16}/>}<span>{l.title}</span></button>)}
    <div className="team-sidebar-spacer"/><div className="team-sidebar-foot"><span className="team-sidebar-hint"><Bell size={16}/> Local preview workspace</span><span className="team-sidebar-hint"><BookOpen size={16}/> Shared data with My tasks</span></div>
  </aside>;
}
