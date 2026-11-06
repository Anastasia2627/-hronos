import React, { useMemo, useState } from 'react';
import { Search, ArrowRight, CornerDownLeft, X, ListTodo } from 'lucide-react';
import { HOME_APPS } from './HomeApps.jsx';

export function HomeCommand({tasks,onPage,onTask}) {
  const [query,setQuery] = useState('');
  const term = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!term) return [];
    const apps = HOME_APPS.filter(app=>`${app.name} ${app.description}`.toLowerCase().includes(term)).map(app=>({id:app.key,label:app.name,sub:'Open section',icon:app.icon,select:()=>onPage(app.key)}));
    const found = tasks.filter(task=>`${task.title} ${task.description||''}`.toLowerCase().includes(term)).slice(0,4).map(task=>({id:task.id,label:task.title,sub:'Task',icon:ListTodo,select:()=>onTask({...task})}));
    return [...apps,...found].slice(0,6);
  },[term,tasks,onPage,onTask]);
  const launch = item => {item.select();setQuery('');};
  return <div className="home-command-wrap">
    <form className="home-command" role="search" onSubmit={e=>{e.preventDefault();if(results[0])launch(results[0]);}}>
      <Search size={22}/><input aria-label="Search pages and tasks" placeholder="Search pages and tasks..." value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Escape')setQuery('');}} autoComplete="off"/>
      {query ? <button type="button" onClick={()=>setQuery('')} aria-label="Clear search"><X size={19}/></button> : <span className="home-enter"><CornerDownLeft size={15}/> Enter</span>}
    </form>
    {term && <div className="home-results" role="region" aria-label="Search results">
      {results.length ? results.map(item=><button key={item.id} onClick={()=>launch(item)}><item.icon size={18}/><span><strong>{item.label}</strong><small>{item.sub}</small></span><ArrowRight size={17}/></button>):<p>No matching pages or tasks</p>}
    </div>}
  </div>;
}
