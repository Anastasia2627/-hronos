import React from 'react';
import { CalendarPlus, ListPlus } from 'lucide-react';
import { HomeApps } from './home/HomeApps.jsx';
import { HomeCommand } from './home/HomeCommand.jsx';
import { HomeFocus } from './home/HomeFocus.jsx';

export function Overview({ date, name, events, tasks, colorFor, onNewEvent, onOpenEvent, onOpenTask, onPage, onAddTask }) {
  const firstName = (name || 'there').trim().split(' ')[0];
  return <div className="home-page">
    <section className="home-welcome">
      <div className="home-welcome-copy">
        <span className="home-kicker">YOUR WORKSPACE</span>
        <h1>Welcome back, {firstName}<span className="home-period">.</span></h1>
        <p>Your plans, together in one place.</p>
      </div>
      <HomeCommand tasks={tasks} onPage={onPage} onTask={onOpenTask} />
      <div className="home-shortcuts">
        <button className="home-shortcut home-shortcut-primary" onClick={onNewEvent}><CalendarPlus size={19}/> New event</button>
        <button className="home-shortcut" onClick={onAddTask}><ListPlus size={19}/> New task</button>
      </div>
    </section>
    <HomeApps onPage={onPage}/>
    <HomeFocus date={date} events={events} tasks={tasks} colorFor={colorFor}
      onEvent={onOpenEvent} onTask={onOpenTask} onPage={onPage}/>
  </div>;
}
