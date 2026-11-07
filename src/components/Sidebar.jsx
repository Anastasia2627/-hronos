import React, { useState } from 'react';
import { Settings2, Plus, ChevronDown, Check, Pencil, PanelLeftClose, PanelLeftOpen, ListChecks } from 'lucide-react';
import { CAL_COLORS, emptyTask } from '../data.js';
import { MENU, initials } from '../lib/shared.jsx';

export function Sidebar({ sidebarOpen, sidebarCollapsed, setSidebarCollapsed, calendars, calendarFilter, setCalendarFilter,
  profile, page, selectPage, toggleCalendar, setCalendarDraft, dueTasks, moveTask, setTaskDraft }) {
  const [calendarsOpen, setCalendarsOpen] = useState(true);
  const [tasksOpen, setTasksOpen] = useState(true);
  const newCalendar = () => setCalendarDraft({ name:'', description:'', color:CAL_COLORS[0], visible:true, members:[] });
  const showExtras = !sidebarCollapsed;

  return <aside className={`sidebar ${sidebarOpen ? 'sidebar-visible' : ''}`}>
    <div className="brand-row">
      <button className="brand" onClick={() => selectPage('overview')} aria-label="Go to Home"><span className="brand-symbol"><span/><span/><span/><span/></span><span className="brand-name">chronos<span className="brand-period">.</span></span></button>
      <button className="icon-button collapse-button" aria-label={sidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'} onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed ? <PanelLeftOpen size={19}/> : <PanelLeftClose size={19}/>}</button>
    </div>
    <nav className="nav-stack" aria-label="Main navigation">{MENU.map(item => <button key={item.key} className={`nav-link ${page === item.key ? 'nav-active' : ''}`} onClick={() => selectPage(item.key)} data-hint={item.label} aria-label={item.label} aria-current={page === item.key ? 'page' : undefined}><item.icon size={20} strokeWidth={1.9}/><span className="sidebar-copy">{item.label}</span></button>)}</nav>
    <div className="sidebar-workspace">
      <div className="sidebar-panel-title"><button aria-expanded={calendarsOpen} onClick={() => setCalendarsOpen(!calendarsOpen)}><ChevronDown className={calendarsOpen ? '' : 'is-closed'} size={17}/><span>My calendars</span></button><button className="sidebar-mini-button" title="Create calendar" aria-label="Create calendar" onClick={newCalendar}><Plus size={17}/></button></div>
      {calendarsOpen && showExtras && <div className="sidebar-panel-list">
        <button className={`sidebar-calendar-filter ${calendarFilter === 'all' ? 'active' : ''}`} onClick={() => {setCalendarFilter('all');selectPage('calendar');}}><span className="all-calendar-dot"/><span>All calendars</span>{calendarFilter === 'all' && <Check size={15}/>}</button>
        {calendars.map(cal => <div className={`sidebar-calendar-entry ${calendarFilter === cal.id ? 'selected' : ''}`} key={cal.id}>
          <button className="sidebar-calendar-filter" onClick={() => {setCalendarFilter(cal.id);selectPage('calendar');}} title={`Open ${cal.name}`}><span className="sidebar-calendar-dot" style={{ background:cal.color }}/><span>{cal.name}</span>{calendarFilter === cal.id && <Check size={15}/>}</button>
          <button className="sidebar-mini-button" title={`Edit ${cal.name}`} aria-label={`Edit ${cal.name}`} onClick={() => setCalendarDraft({ ...cal })}><Pencil size={14}/></button>
          <label className="sidebar-visibility" title={cal.id === 'personal' ? 'Default calendar stays visible' : 'Show or hide calendar'}><input type="checkbox" checked={cal.visible} disabled={cal.id === 'personal'} onChange={() => toggleCalendar(cal.id)} aria-label={`Show ${cal.name}`}/><span/></label>
        </div>)}
      </div>}
      <div className="sidebar-panel-title sidebar-task-title"><button aria-expanded={tasksOpen} onClick={() => setTasksOpen(!tasksOpen)}><ChevronDown className={tasksOpen ? '' : 'is-closed'} size={17}/><span>Tasks</span><small>{dueTasks.length}</small></button><button className="sidebar-mini-button" title="New task" aria-label="New task" onClick={() => setTaskDraft(emptyTask())}><Plus size={17}/></button></div>
      {tasksOpen && showExtras && <div className="sidebar-task-list">{dueTasks.slice(0,5).map(task => <div key={task.id} className="sidebar-task-item"><button className="sidebar-task-check" aria-label={`Mark ${task.title} complete`} onClick={() => moveTask(task.id,'done')}><span/></button><button className="sidebar-task-text" onClick={() => setTaskDraft({ ...task })}>{task.title}</button></div>)}{!dueTasks.length && <p>All caught up!</p>}{dueTasks.length > 5 && <span className="sidebar-tasks-extra">+{dueTasks.length - 5} more tasks</span>}</div>}
    </div>
    <div className="sidebar-bottom"><button className={`nav-link ${page === 'settings' ? 'nav-active' : ''}`} onClick={() => selectPage('settings')} aria-label="Settings" data-hint="Settings"><Settings2 size={20}/><span className="sidebar-copy">Settings</span></button>
      <button className={`sidebar-person ${page === 'profile' ? 'person-active' : ''}`} onClick={() => selectPage('profile')} aria-label="My profile" data-hint="My profile"><span className="avatar">{profile.avatar ? <img src={profile.avatar} alt=""/> : initials(profile.name)}</span><span className="sidebar-person-text sidebar-copy"><strong>{profile.name}</strong><small>My profile</small></span></button>
    </div>
  </aside>;
}
