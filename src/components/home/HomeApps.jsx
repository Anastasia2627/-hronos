import React from 'react';
import {
  CalendarDays, ListTodo, LayoutGrid, CalendarClock, UsersRound,
  Settings2, CalendarPlus2, ListPlus, ArrowUpRight
} from 'lucide-react';

export const HOME_APPS = [
  { key: 'calendar', name: 'Calendar', description: 'Events & reminders', icon: CalendarDays, tone: 'blue' },
  { key: 'tasks', name: 'Tasks', description: 'Stay on track', icon: ListTodo, tone: 'violet' },
  { key: 'projects', name: 'Projects', description: 'Your project boards', icon: LayoutGrid, tone: 'periwinkle' },
  { key: 'schedule', name: 'My day', description: 'Today’s schedule', icon: CalendarClock, tone: 'peach' },
  { key: 'team', name: 'Team space', description: 'Work together', icon: UsersRound, tone: 'mint' },
  { key: 'settings', name: 'Settings', description: 'Your preferences', icon: Settings2, tone: 'slate' },
  { key: 'new-event', name: 'New event', description: 'Plan something', icon: CalendarPlus2, tone: 'orange' },
  { key: 'new-task', name: 'New task', description: 'Capture an idea', icon: ListPlus, tone: 'pink' },
];

export function HomeApps({ onPage, onNewEvent, onAddTask }) {
  const go = (key) => key === 'new-event' ? onNewEvent() : key === 'new-task' ? onAddTask() : onPage(key);
  return <section className="home-apps" aria-label="Your workspace shortcuts">
    <div className="home-section-heading"><h2>Apps</h2><span>Everything in one place</span></div>
    <div className="home-app-grid">{HOME_APPS.map(({ key, name, description, icon: Icon, tone }) =>
      <button key={key} className={`home-app-card home-tone-${tone}`} onClick={() => go(key)}>
        <span className="home-app-banner" aria-hidden="true" />
        <span className="home-app-icon"><Icon size={23} strokeWidth={2.35}/></span>
        <ArrowUpRight className="home-app-arrow" size={17}/>
        <strong className="home-app-name">{name}</strong>
        <span className="home-app-desc">{description}</span>
      </button>
    )}</div>
  </section>;
}
