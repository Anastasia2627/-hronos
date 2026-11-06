import React from 'react';
import { Search, Bell, ChevronRight, Menu, ArrowRight } from 'lucide-react';
import { initials } from '../lib/shared.jsx';

export function Topbar({ setSidebarOpen, page, search, setSearch, notificationsOpen, setNotificationsOpen, overdue, profile, selectPage }) {
  return (<header className="topbar">
    <div className="topbar-left"><button className="icon-button mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={21} /></button><span className="muted-crumb">Workspace</span><ChevronRight size={14} className="crumb-chevron" /><strong>{page === 'create-event' ? 'New event' : page === 'overview' ? 'Overview' : page === 'calendar' ? 'Calendar' : page === 'tasks' ? 'My tasks' : page === 'projects' ? 'Projects' : page === 'team' ? 'Team space' : page === 'schedule' ? 'Schedule' : 'Settings'}</strong></div>
    <div className="topbar-right">
      <label className="global-search"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search anything..." aria-label="Search events and tasks" /><kbd>⌘ K</kbd></label>
      <div className="topbar-notify"><button className="icon-button header-action" title="Notifications" onClick={() => setNotificationsOpen(!notificationsOpen)}><Bell size={19} />{overdue > 0 && <span className="notification-dot" />}</button>
        {notificationsOpen && <div className="notification-panel"><div className="notification-heading"><strong>Notifications</strong><span className="status-pill tone-green">All caught up</span></div><p>{overdue ? `${overdue} task${overdue === 1 ? ' is' : 's are'} past the due date.` : 'Nothing urgent right now.'}</p><button className="text-button" onClick={() => { selectPage('tasks'); setNotificationsOpen(false); }}>View my tasks <ArrowRight size={15} /></button></div>}</div>
      <button className="topbar-avatar" title="Open profile" onClick={() => selectPage('settings')}>{profile.avatar ? <img src={profile.avatar} alt="" /> : initials(profile.name)}</button>
    </div>
  </header>);
}
