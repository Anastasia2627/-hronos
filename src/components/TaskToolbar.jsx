import React from 'react';
import { ArrowDownUp, Filter, LayoutGrid, List, Plus, RefreshCw, Search, SlidersHorizontal, Milestone } from 'lucide-react';
import { STAGES } from '../data.js';

const VIEWS = [{ id: 'board', label: 'Board', icon: LayoutGrid }, { id: 'list', label: 'List', icon: List }, { id: 'timeline', label: 'Timeline', icon: Milestone }];

export function TaskToolbar({ view, onView, stage, onStage, priority, onPriority, sort, onSort, query, onQuery, onRefresh, onAdd, total }) {
  return <div className="work-toolbar">
    <div className="work-toolbar-top"><div className="work-view-tabs" role="group" aria-label="Task view">{VIEWS.map(({ id, label, icon: Icon }) => <button key={id} className={view === id ? 'work-tab active' : 'work-tab'} onClick={() => onView(id)} aria-pressed={view === id}><Icon size={17} /> {label}</button>)}</div><span className="work-count">{total} tasks</span></div>
    <div className="work-filters"><label className="work-local-search"><Search size={17}/><input placeholder="Find a task..." aria-label="Search tasks" value={query} onChange={e => onQuery(e.target.value)} /></label>
      <label className="work-select"><Filter size={16}/><select aria-label="Filter by status" value={stage} onChange={e => onStage(e.target.value)}><option value="all">All statuses</option>{STAGES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
      <label className="work-select"><SlidersHorizontal size={16}/><select aria-label="Filter by priority" value={priority} onChange={e => onPriority(e.target.value)}><option value="all">All priorities</option><option value="High">High priority</option><option value="Medium">Medium priority</option><option value="Low">Low priority</option></select></label>
      <label className="work-select"><ArrowDownUp size={16}/><select aria-label="Task sort order" value={sort} onChange={e => onSort(e.target.value)}><option value="due">Due date</option><option value="priority">Priority</option><option value="name">Name</option></select></label>
      <button className="work-refresh" title="Refresh view" aria-label="Refresh view" onClick={onRefresh}><RefreshCw size={17}/></button>
      <button className="btn btn-primary work-new" onClick={onAdd}><Plus size={17}/> New task</button>
    </div>
  </div>;
}
