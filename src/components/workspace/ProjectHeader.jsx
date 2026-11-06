import React, { useState } from 'react';
import { Check, ChevronDown, Edit3, LayoutGrid, List, Plus, Search, X } from 'lucide-react';
import { useStored } from '../../lib/shared.jsx';

export function ProjectHeader({ view, setView, query, setQuery, priority, setPriority, onAdd, count }) {
  const [name, setName] = useStored('chronos-project-name-v1', 'Chronos Studio');
  const [renaming, setRenaming] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const saveName = event => { event.preventDefault(); if (draftName.trim()) setName(draftName.trim()); setRenaming(false); };
  return <header className="project-intro">
    <div className="project-name-row">{renaming ?
      <form className="project-rename" onSubmit={saveName}><input autoFocus aria-label="Project name" value={draftName} onChange={e => setDraftName(e.target.value)} maxLength={55} required />
        <button aria-label="Save project name"><Check size={19}/></button><button type="button" aria-label="Cancel" onClick={() => setRenaming(false)}><X size={18}/></button></form> :
      <><h1>{name}</h1><button title="Edit project name" aria-label="Edit project name" className="project-name-edit" onClick={() => { setDraftName(name); setRenaming(true); }}><Edit3 size={17}/></button></>}
    </div>
    <div className="project-details-row"><span className="project-count-info">{count} tasks · Project board</span></div>
    <div className="project-actions-row">
      <label className="project-search"><Search size={17}/><input value={query} placeholder="Search project tasks" aria-label="Search project tasks" onChange={e => setQuery(e.target.value)}/></label>
      <label className="project-priority-select">Priority <ChevronDown size={14}/><select value={priority} aria-label="Filter by priority" onChange={e => setPriority(e.target.value)}><option value="all">All</option><option value="High">High</option><option value="Medium">Medium</option><option value="Low">Low</option></select></label>
      <div className="project-view-modes" role="group" aria-label="Project view"><button aria-label="Board view" aria-pressed={view==='board'} className={view==='board'?'active':''} onClick={() => setView('board')}><LayoutGrid size={18}/></button><button aria-label="List view" aria-pressed={view==='list'} className={view==='list'?'active':''} onClick={() => setView('list')}><List size={19}/></button></div>
      <button className="project-main-add" onClick={onAdd}><Plus size={17}/> New task</button>
    </div>
  </header>;
}
