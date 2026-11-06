import React, { useState } from 'react';
import { Settings2, Plus, ChevronDown, Check, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { CAL_COLORS } from '../data.js';
import { MENU, EXTRA_MENU, initials } from '../lib/shared.jsx';

export function Sidebar({ sidebarOpen, sidebarCollapsed, setSidebarCollapsed, calendars, profile, page, tasks, selectPage, toggleCalendar, setCalendarDraft }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const showCalendars = ['calendar', 'schedule'].includes(page);
  const openMore = moreOpen || EXTRA_MENU.some(item => item.key === page);
  const newCalendar = () => setCalendarDraft({ name: '', description: '', color: CAL_COLORS[0], visible: true });
  return <aside className={`sidebar ${sidebarOpen ? 'sidebar-visible' : ''}`}>
    <div className="brand-row">
      <button className="brand" onClick={() => selectPage('overview')} aria-label="Go to Today">
        <span className="brand-symbol"><span /><span /><span /><span /></span>
        <span className="brand-name">chronos<span className="brand-period">.</span></span>
      </button>
      <button className="icon-button collapse-button" aria-label={sidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'} onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed ? <PanelLeftOpen size={19}/> : <PanelLeftClose size={19}/>}</button>
    </div>
    <nav className="nav-stack" aria-label="Main navigation">
      {MENU.map(item => <button key={item.key} className={`nav-link ${page === item.key ? 'nav-active' : ''}`} onClick={() => selectPage(item.key)} title={item.label} aria-current={page === item.key ? 'page' : undefined}>
        <item.icon size={20} strokeWidth={1.9}/><span className="sidebar-copy">{item.label}</span>
        {item.key === 'tasks' && <span className="nav-number sidebar-copy">{tasks.filter(t => t.stage !== 'done').length}</span>}
      </button>)}
      <button className={`nav-link more-views ${openMore ? 'more-open' : ''}`} onClick={() => setMoreOpen(!openMore)} aria-expanded={openMore} aria-label="More views" title="More views">
        <ChevronDown size={19}/><span className="sidebar-copy">More views</span>
      </button>
      {openMore && <div className="nav-extra">{EXTRA_MENU.map(item => <button key={item.key} className={`nav-link ${page === item.key ? 'nav-active' : ''}`} onClick={() => selectPage(item.key)} title={item.label}>
        <item.icon size={19}/><span className="sidebar-copy">{item.label}</span>
      </button>)}</div>}
    </nav>
    {showCalendars && <div className="sidebar-calendars">
      <div className="sidebar-heading"><span className="sidebar-section-title sidebar-copy">Calendars</span><button className="icon-button tiny" aria-label="Add calendar" onClick={newCalendar}><Plus size={17}/></button></div>
      {calendars.map(cal => <div className="sidebar-calendar" key={cal.id}>
        <button className="visibility-toggle" disabled={cal.id === 'personal'} title={cal.id === 'personal' ? 'Main calendar is always visible' : `${cal.visible ? 'Hide' : 'Show'} ${cal.name}`} aria-label={cal.id === 'personal' ? 'Main calendar is always visible' : `${cal.visible ? 'Hide' : 'Show'} ${cal.name}`} onClick={() => toggleCalendar(cal.id)} style={{ '--calendar-color': cal.color }}>
          <span className={`calendar-check ${cal.visible ? 'is-on' : ''}`}>{cal.visible && <Check size={11} strokeWidth={3}/>}</span>
        </button>
        <button className={`calendar-name sidebar-copy ${cal.visible ? '' : 'calendar-muted'}`} onClick={() => setCalendarDraft({ ...cal })}>{cal.name}</button>
      </div>)}
    </div>}
    <div className="sidebar-bottom">
      <button className={`nav-link ${page === 'settings' ? 'nav-active' : ''}`} onClick={() => selectPage('settings')}><Settings2 size={20}/><span className="sidebar-copy">Settings</span></button>
      <button className="sidebar-person" onClick={() => selectPage('settings')} title="Edit your profile">
        <span className="avatar">{profile.avatar ? <img src={profile.avatar} alt=""/> : initials(profile.name)}</span>
        <span className="sidebar-person-text sidebar-copy"><strong>{profile.name}</strong><small>My profile</small></span>
      </button>
    </div>
  </aside>;
}
