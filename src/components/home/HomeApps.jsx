import React from 'react';
import { CalendarDays, ListTodo, LayoutGrid, CalendarClock, UsersRound, Settings2, ArrowUpRight } from 'lucide-react';

export const HOME_APPS = [
  { key:'calendar', name:'Calendar', description:'Meetings & reminders', icon:CalendarDays, tone:'blue' },
  { key:'tasks', name:'Tasks', description:'Keep things moving', icon:ListTodo, tone:'orange' },
  { key:'projects', name:'Projects', description:'Boards & milestones', icon:LayoutGrid, tone:'violet' },
  { key:'schedule', name:'My day', description:'Your daily timeline', icon:CalendarClock, tone:'peach' },
  { key:'team', name:'Team space', description:'Shared project view', icon:UsersRound, tone:'mint' },
  { key:'settings', name:'Settings', description:'Profile & preferences', icon:Settings2, tone:'pink' },
];

export function HomeApps({ onPage }) {
  return <section className="home-apps" aria-label="Workspace apps">
    <div className="home-section-heading"><h2>Your space</h2></div>
    <div className="home-app-grid">{HOME_APPS.map(({key,name,description,icon:Icon,tone}) =>
      <button key={key} className={`home-app-card home-tone-${tone}`} onClick={()=>onPage(key)}>
        <span className="home-app-top"><span className="home-app-icon"><Icon size={25} strokeWidth={2}/></span><ArrowUpRight className="home-app-arrow" size={19}/></span>
        <span className="home-app-name">{name}</span><span className="home-app-desc">{description}</span>
      </button>)}</div>
  </section>;
}
