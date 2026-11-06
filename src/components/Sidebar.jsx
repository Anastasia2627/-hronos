import React from 'react';
import { Settings2, Plus, ChevronDown, MoreHorizontal, Check, Sparkles, Grid2X2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { CAL_COLORS } from '../data.js';
import { MENU, initials } from '../lib/shared.jsx';

export function Sidebar({ sidebarOpen, sidebarCollapsed, setSidebarCollapsed, calendars, profile, page, tasks, selectPage, toggleCalendar, setCalendarDraft }) {
  return (<aside className={`sidebar ${sidebarOpen ? 'sidebar-visible' : ''}`}>
    <div className="brand-row">
      <button className="brand" onClick={() => selectPage('overview')} aria-label="Go to overview">
        <span className="brand-symbol"><span /><span /><span /><span /></span>
        <span className="brand-name">chronos<span className="brand-period">.</span></span>
      </button>
      <button className="icon-button collapse-button" aria-label="Toggle sidebar" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}</button>
    </div>
    <div className="workspace-pill"><span className="workspace-icon"><Grid2X2 size={15} /></span><span className="sidebar-copy">My workspace</span><ChevronDown className="sidebar-copy" size={15} /></div>
    <nav className="nav-stack" aria-label="Main navigation">
      <span className="sidebar-section-title sidebar-copy">WORKSPACE</span>
      {MENU.map((item) => <button key={item.key} className={`nav-link ${page === item.key ? 'nav-active' : ''}`} onClick={() => selectPage(item.key)} title={item.label}><item.icon size={19} strokeWidth={1.9} /><span className="sidebar-copy">{item.label}</span>{item.key === 'tasks' && tasks.filter(t => t.stage !== 'done').length > 0 && <span className="nav-number sidebar-copy">{tasks.filter(t => t.stage !== 'done').length}</span>}</button>)}
    </nav>
    <div className="sidebar-calendars">
      <div className="sidebar-heading"><span className="sidebar-section-title sidebar-copy">MY CALENDARS</span><button className="icon-button tiny" aria-label="Add calendar" title="Add calendar" onClick={() => setCalendarDraft({ name: '', description: '', color: CAL_COLORS[0], visible: true })}><Plus size={17} /></button></div>
      {calendars.map((cal) => <div className="sidebar-calendar" key={cal.id}>
        <button className="visibility-toggle" title={cal.visible ? 'Hide calendar' : 'Show calendar'} aria-label={`${cal.visible ? 'Hide' : 'Show'} ${cal.name}`} onClick={() => toggleCalendar(cal.id)} style={{ '--calendar-color': cal.color }}><span className={`calendar-check ${cal.visible ? 'is-on' : ''}`}>{cal.visible && <Check size={11} strokeWidth={3} />}</span></button>
        <button className={`calendar-name sidebar-copy ${cal.visible ? '' : 'calendar-muted'}`} onClick={() => { setCalendarDraft({ ...cal }); }}>{cal.name}</button>
      </div>)}
      <button className="add-calendar sidebar-copy" onClick={() => setCalendarDraft({ name: '', description: '', color: CAL_COLORS[0], visible: true })}><Plus size={15} /> Add calendar</button>
    </div>
    <div className="sidebar-bottom">
      <div className="sidebar-soft-card sidebar-copy"><span className="soft-spark"><Sparkles size={18} /></span><strong>A little more clarity.</strong><p>Make space for what matters today.</p></div>
      <button className={`nav-link ${page === 'settings' ? 'nav-active' : ''}`} onClick={() => selectPage('settings')}><Settings2 size={19} /><span className="sidebar-copy">Settings</span></button>
      <div className="sidebar-person"><span className="avatar">{profile.avatar ? <img src={profile.avatar} alt="" /> : initials(profile.name)}</span><span className="sidebar-person-text sidebar-copy"><strong>{profile.name}</strong><small>Personal account</small></span><button className="icon-button sidebar-copy" title="Profile settings" onClick={() => selectPage('settings')}><MoreHorizontal size={18} /></button></div>
    </div>
  </aside>);
}
