import React, { useState } from 'react';
import { CalendarDays, Check, ChevronDown, Edit3, Globe2, LayoutGrid, List, Plus, Search, X } from 'lucide-react';
import { useStored } from '../../lib/shared.jsx';

export function ProjectHeader({ view, setView, query, setQuery, priority, setPriority, onAdd, count }) {
  const [name, setName] = useStored('chronos-project-name-v1', 'Chronos Studio');
  const [members, setMembers] = useStored('chronos-project-members-v1', ['AK','SP','MJ']);
  const [renaming, setRenaming] = useState(false);
  const [adding, setAdding] = useState(false);
  const [person, setPerson] = useState('');
  const [draftName, setDraftName] = useState(name);
  const addPerson = e => { e.preventDefault(); if (!person.trim()) return; setMembers(old => [...old,person.trim().slice(0,2).toUpperCase()]); setPerson('');setAdding(false);};
  const saveName = e => { e.preventDefault(); if(draftName.trim()) setName(draftName.trim()); setRenaming(false); };
  return <header className="project-intro">
    <div className="project-intro-top"><span className="project-last-update">Last updated <b>just now</b> · Local workspace</span><span className="project-created"><CalendarDays size={15}/> Demo project</span></div>
    <div className="project-name-row">{renaming ? <form className="project-rename" onSubmit={saveName}><input autoFocus aria-label="Project name" value={draftName} onChange={e=>setDraftName(e.target.value)} maxLength={55}/><button title="Save project name"><Check size={19}/></button><button type="button" title="Cancel" onClick={()=>setRenaming(false)}><X size={18}/></button></form> : <><h1>{name}</h1><button title="Edit project name" aria-label="Edit project name" className="project-name-edit" onClick={()=>{setDraftName(name);setRenaming(true);}}><Edit3 size={17}/></button></>}</div>
    <div className="project-details-row"><span className="project-visibility"><Globe2 size={17}/> Personal workspace</span><span className="project-avatar-row">{members.slice(0,5).map((m,i)=><span className={`project-member member-${i%5}`} key={i}>{m}</span>)}</span>
      <div className="project-add-member"><button onClick={()=>setAdding(!adding)}><Plus size={15}/> Add teammate</button>{adding && <form onSubmit={addPerson} className="project-member-popover"><label>Add a teammate to this local preview<input autoFocus maxLength={40} placeholder="Name or initials" value={person} onChange={e=>setPerson(e.target.value)}/></label><button type="submit" className="project-member-submit">Add</button><small>No invitation will be sent without a backend.</small></form>}</div>
      <span className="project-count-info">{count} tasks in this board</span></div>
    <div className="project-actions-row"><div className="project-board-title"><strong>Project board</strong><span>Plan, track and finish together</span></div>
      <label className="project-search"><Search size={17}/><input value={query} placeholder="Search tasks" onChange={e=>setQuery(e.target.value)}/></label>
      <label className="project-priority-select">Priority <ChevronDown size={14}/><select value={priority} aria-label="Filter by priority" onChange={e=>setPriority(e.target.value)}><option value="all">All</option><option value="High">High</option><option value="Medium">Medium</option><option value="Low">Low</option></select></label>
      <div className="project-view-modes"><button aria-label="Board view" aria-pressed={view==='board'} className={view==='board'?'active':''} onClick={()=>setView('board')}><LayoutGrid size={18}/></button><button aria-label="List view" aria-pressed={view==='list'} className={view==='list'?'active':''} onClick={()=>setView('list')}><List size={19}/></button></div>
      <button className="project-main-add" onClick={onAdd}><Plus size={17}/> New task</button>
    </div>
  </header>;
}
