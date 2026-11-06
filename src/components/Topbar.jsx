import React from 'react';
import { Search, Bell, Menu, X, ArrowRight } from 'lucide-react';
import { initials } from '../lib/shared.jsx';

const TITLES = {
  overview: 'Home', calendar: 'Calendar', tasks: 'Tasks', projects: 'Projects',
  team: 'Team space', schedule: 'Daily schedule', settings: 'Settings', 'create-event': 'New event'
};

export function Topbar({ setSidebarOpen, page, search, setSearch, notificationsOpen, setNotificationsOpen, overdue, profile, selectPage }) {
  const searchable = ['calendar', 'schedule', 'tasks'].includes(page);
  return <header className="topbar">
    <div className="topbar-left">
      <button className="icon-button mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={21}/></button>
      <strong>{TITLES[page] || 'Chronos'}</strong>
    </div>
    <div className="topbar-right">
      {searchable && <label className="global-search"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder={page === 'tasks' ? 'Search tasks' : 'Search events'} aria-label={page === 'tasks' ? 'Search tasks' : 'Search calendar events'}/>{search && <button type="button" aria-label="Clear search" onClick={() => setSearch('')}><X size={16}/></button>}</label>}
      <div className="topbar-notify"><button className="icon-button header-action" aria-label="Notifications" title="Notifications" onClick={() => setNotificationsOpen(!notificationsOpen)}><Bell size={19}/>{overdue > 0 && <span className="notification-dot"/>}</button>
        {notificationsOpen && <div className="notification-panel"><div className="notification-heading"><strong>Notifications</strong></div><p>{overdue ? `${overdue} overdue ${overdue === 1 ? 'task' : 'tasks'}` : 'No overdue tasks.'}</p><button className="text-button" onClick={() => {selectPage('tasks');setNotificationsOpen(false);}}>Open tasks <ArrowRight size={15}/></button></div>}
      </div>
      <button className="topbar-avatar" title="My profile" aria-label="Open profile" onClick={() => selectPage('settings')}>{profile.avatar ? <img src={profile.avatar} alt=""/> : initials(profile.name)}</button>
    </div>
  </header>;
}
