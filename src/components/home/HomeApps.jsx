import React from 'react';
import { CalendarDays, ListTodo, LayoutGrid, CalendarClock, UsersRound, Settings2, ArrowUpRight } from 'lucide-react';

export const HOME_APPS = [
  { key: 'calendar', name: 'Calendar', description: 'Events and reminders', icon: CalendarDays, tone: 'blue' },
  { key: 'tasks', name: 'Tasks', description: 'All tasks and deadlines', icon: ListTodo, tone: 'violet' },
  { key: 'projects', name: 'Project board', description: 'Work by status', icon: LayoutGrid, tone: 'periwinkle' },
  { key: 'schedule', name: 'My day', description: 'Your daily agenda', icon: CalendarClock, tone: 'peach' },
  { key: 'team', name: 'Team space', description: 'Shared work preview', icon: UsersRound, tone: 'mint' },
  { key: 'settings', name: 'Settings', description: 'Calendar preferences', icon: Settings2, tone: 'slate' },
];

export function HomeApps({ onPage }) {
  return <section className="home-apps" aria-label="Workspace sections">
    <div className="home-section-heading"><h2>Your workspace</h2></div>
    <div className="home-app-grid">{HOME_APPS.map(({ key, name, description, icon: Icon, tone }) =>
      <button key={key} className={`home-app-card home-tone-${tone}`} onClick={() => onPage(key)}>
        <span className="home-app-banner" aria-hidden="true" />
        <span className="home-app-icon"><Icon size={23} strokeWidth={2.3}/></span>
        <ArrowUpRight className="home-app-arrow" aria-hidden="true" size={18}/>
        <strong className="home-app-name">{name}</strong>
        <span className="home-app-desc">{description}</span>
      </button>
    )}</div>
  </section>;
}
