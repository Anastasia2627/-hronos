import React from 'react';
import { HomeApps } from './home/HomeApps.jsx';
import { HomeCommand } from './home/HomeCommand.jsx';
import { HomeFocus } from './home/HomeFocus.jsx';

export function Overview({ date, name, events, tasks, colorFor, onNewEvent, onOpenEvent, onOpenTask, onPage, onAddTask }) {
  const firstName = (name || 'there').trim().split(' ')[0];
  return <div className="home-page">
    <section className="home-welcome">
      <div className="home-welcome-copy"><span className="home-hello-mark">✳</span>
        <h1>Make today yours.</h1>
        <p>Welcome back, {firstName}. Pick up where you left off.</p>
      </div>
      <div className="home-orbit" aria-hidden="true"><span className="home-orbit-a"/><span className="home-orbit-b"/><span className="home-orbit-c"/></div>
      <HomeCommand tasks={tasks} onPage={onPage} onTask={onOpenTask} onNewEvent={onNewEvent} onAddTask={onAddTask}/>
    </section>
    <HomeApps onPage={onPage} onNewEvent={onNewEvent} onAddTask={onAddTask}/>
    <HomeFocus date={date} events={events} tasks={tasks} colorFor={colorFor}
      onEvent={onOpenEvent} onTask={onOpenTask} onPage={onPage}/>
  </div>;
}
