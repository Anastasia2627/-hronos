import React, { useState } from 'react';
import { ArrowDownUp, Filter, LayoutGrid, List, Plus, Milestone } from 'lucide-react';
import { STAGES } from '../data.js';

const VIEWS=[{id:'board',label:'Board',icon:LayoutGrid},{id:'list',label:'List',icon:List},{id:'timeline',label:'Timeline',icon:Milestone}];
export function TaskToolbar({ view, onView, stage, onStage, priority, onPriority, sort, onSort, onAdd, total }) {
  const [showFilters,setShowFilters]=useState(false);
  const isFiltered=stage!=='all'||priority!=='all'||sort!=='due';
  return <div className="work-toolbar simple-task-toolbar">
    <div className="work-toolbar-top"><div className="work-view-tabs" role="group" aria-label="Task view">{VIEWS.map(({id,label,icon:Icon})=><button key={id} className={view===id?'work-tab active':'work-tab'} onClick={()=>onView(id)} aria-pressed={view===id}><Icon size={18}/>{label}</button>)}</div>
      <div className="task-toolbar-actions"><span className="work-count">{total} tasks</span><button className={`btn btn-quiet ${showFilters||isFiltered?'btn-filter-active':''}`} aria-expanded={showFilters} onClick={()=>setShowFilters(!showFilters)}><Filter size={17}/> Filters{isFiltered?' •':''}</button><button className="btn btn-primary" onClick={onAdd}><Plus size={18}/> New task</button></div>
    </div>
    {showFilters && <div className="work-filters simple-filters"><label className="work-select">Status<select aria-label="Filter by status" value={stage} onChange={e=>onStage(e.target.value)}><option value="all">All</option>{STAGES.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
      <label className="work-select">Priority<select aria-label="Filter by priority" value={priority} onChange={e=>onPriority(e.target.value)}><option value="all">All</option><option value="High">High</option><option value="Medium">Medium</option><option value="Low">Low</option></select></label>
      <label className="work-select"><ArrowDownUp size={16}/> Sort<select aria-label="Task sorting" value={sort} onChange={e=>onSort(e.target.value)}><option value="due">Due date</option><option value="priority">Priority</option><option value="name">Name</option></select></label>
      {isFiltered && <button className="text-button" onClick={()=>{onStage('all');onPriority('all');onSort('due')}}>Clear filters</button>}
    </div>}
  </div>;
}
