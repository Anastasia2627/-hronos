import React from 'react';
import { HomeApps } from './home/HomeApps.jsx';
import { HomeCommand } from './home/HomeCommand.jsx';
import { HomeFocus } from './home/HomeFocus.jsx';

export function Overview({ date, name, events, tasks, colorFor, onNewEvent, onOpenEvent, onOpenTask, onPage, onAddTask }) {
  const firstName = (name || 'there').trim().split(' ')[0];
  const dateLabel = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  return <div className="home-page">
    <section className="home-welcome">
      <div className="home-welcome-copy">
        <h1>Welcome back, {firstName}.</h1>
        <p>{dateLabel} · Find a plan or create something new.</p>
      </div>
      <HomeCommand tasks={tasks} onPage={onPage} onTask={onOpenTask} onNewEvent={onNewEvent} onAddTask={onAddTask}/>
    </section>
    <HomeApps onPage={onPage}/>
    <HomeFocus date={date} events={events} tasks={tasks} colorFor={colorFor}
      onEvent={onOpenEvent} onTask={onOpenTask} onPage={onPage}/>
  </div>;
}
