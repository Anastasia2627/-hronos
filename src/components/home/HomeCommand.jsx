import React, { useMemo, useState } from 'react';
import { Search, ArrowUpRight, X, ListTodo, CalendarPlus2, ListPlus } from 'lucide-react';
import { HOME_APPS } from './HomeApps.jsx';

export function HomeCommand({ tasks, onPage, onTask, onNewEvent, onAddTask }) {
  const [query, setQuery] = useState('');
  const term = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!term) return [];
    const pages = HOME_APPS.filter(app => `${app.name} ${app.description}`.toLowerCase().includes(term))
      .map(app => ({ id: app.key, label: app.name, sub: 'Section', icon: app.icon, select: () => onPage(app.key) }));
    const found = tasks.filter(task => `${task.title} ${task.description || ''}`.toLowerCase().includes(term))
      .slice(0, 5).map(task => ({ id: task.id, label: task.title, sub: 'Task', icon: ListTodo,
        select: () => onTask({ ...task }) }));
    return [...pages, ...found].slice(0, 6);
  }, [term, tasks, onPage, onTask, onNewEvent, onAddTask]);
  const launch = item => { item.select(); setQuery(''); };
  return <div className="home-command-wrap">
    <form className="home-command" role="search" onSubmit={e => { e.preventDefault(); if (results[0]) launch(results[0]); }}>
      <div className="home-command-input"><Search size={21}/>
        <input aria-label="Search pages and tasks" placeholder="Search tasks or open a section…" value={query}
          onChange={e => setQuery(e.target.value)} onKeyDown={e => { if (e.key === 'Escape') setQuery(''); }} autoComplete="off"/>
        {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={18}/></button>}
      </div>
      <div className="home-command-footer">
        <div className="home-command-actions">
          <button type="button" onClick={onNewEvent}><CalendarPlus2 size={16}/> New event</button>
          <button type="button" onClick={onAddTask}><ListPlus size={16}/> New task</button>
        </div>
        
        <button className="home-command-submit" type="submit" aria-label="Open search result" disabled={!results.length}><ArrowUpRight size={20}/></button>
      </div>
    </form>
    {term && <div className="home-results" role="region" aria-label="Search results">
      {results.length ? results.map(item => <button key={item.id} onClick={() => launch(item)}><item.icon size={18}/><span><strong>{item.label}</strong><small>{item.sub}</small></span><ArrowUpRight size={17}/></button>) : <p>No matching pages or tasks</p>}
    </div>}
  </div>;
}
