import React, { useEffect, useState } from 'react';
import { CalendarDays, ChevronRight, Settings2, UserRound, RotateCcw, Save, ArrowUpRight } from 'lucide-react';
import { ProfileCalendars } from './settings/ProfileCalendars.jsx';
import { ProfilePreferences } from './settings/ProfilePreferences.jsx';

const VIEWS = ['day', 'week', 'month', 'year'];

export function SettingsPage({ profile, onProfile, calendars, onEditCal, onNewCal, onToggleCal, onCalendarView, onToast, onNavigate, onWelcome }) {
  const [defaultView, setDefaultView] = useState(profile.defaultView || 'month');
  useEffect(() => setDefaultView(profile.defaultView || 'month'), [profile.defaultView]);
  const changed = defaultView !== (profile.defaultView || 'month');
  const save = event => {
    event.preventDefault();
    if (!VIEWS.includes(defaultView)) return;
    onProfile({ ...profile, defaultView });
    onCalendarView(defaultView);
    onToast('Calendar preferences saved');
  };

  return <section className="settings-page" aria-label="Settings">
    <header className="account-heading settings-heading"><span className="account-eyebrow">WORKSPACE</span><h1>Settings</h1><p>Make Chronos work your way.</p></header>
    <div className="settings-layout">
      <div className="settings-settings-card">
        <form onSubmit={save}>
          <div className="settings-panel-heading"><span className="settings-heading-icon"><Settings2 size={22}/></span><div><h2>Calendar preferences</h2><p>Choose how your calendar opens.</p></div></div>
          <ProfilePreferences form={{defaultView}} update={changes => { if (changes.defaultView) setDefaultView(changes.defaultView); }}/>
          <div className="settings-form-actions"><button type="button" className="ps-btn ps-btn-outline" disabled={!changed} onClick={() => setDefaultView(profile.defaultView || 'month')}><RotateCcw size={16}/> Cancel</button><button type="submit" className="ps-btn ps-btn-save" disabled={!changed}><Save size={16}/> Save preferences</button></div>
        </form>
      </div>
      <div className="settings-settings-card">
        <div className="settings-panel-heading"><span className="settings-heading-icon is-blue"><CalendarDays size={22}/></span><div><h2>My calendars</h2><p>Colors, visibility and calendar names.</p></div></div>
        <ProfileCalendars calendars={calendars} onEditCal={onEditCal} onNewCal={onNewCal} onToggleCal={onToggleCal}/>
      </div>
    </div>
    <div className="settings-bottom-links"><button onClick={() => onNavigate('profile')}><UserRound size={19}/><span><strong>My profile</strong><small>Edit your personal details and photo</small></span><ChevronRight size={18}/></button><button onClick={onWelcome}><ArrowUpRight size={19}/><span><strong>Welcome page</strong><small>Preview the public Chronos homepage</small></span><ChevronRight size={18}/></button></div>
  </section>;
}
