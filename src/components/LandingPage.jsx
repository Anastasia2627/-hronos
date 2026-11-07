import React from 'react';
import { ArrowUpRight, CalendarDays, Check, CheckCircle2, ChevronRight, Clock3, Layers3, ListTodo, MoveUpRight, Sparkles, UsersRound } from 'lucide-react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const preview = [9, 10, 11, 12, 13, 14, 15];

function CalendarArtwork() {
  return <div className="welcome-illustration" aria-label="Preview of a calendar with meetings and tasks">
    <div className="welcome-grid" aria-hidden="true" />
    <div className="welcome-floating welcome-floating-left"><span className="welcome-mini-avatar">AK</span><div><strong>Your week, in one place</strong><small>3 plans lined up</small></div><CheckCircle2 size={18}/></div>
    <div className="welcome-calendar-card">
      <div className="welcome-calendar-head"><span><CalendarDays size={18}/> NOVEMBER 2026</span><span className="welcome-week-pill">Week 45</span></div>
      <div className="welcome-days">{days.map((day, i) => <div className={i === 3 ? 'selected' : ''} key={day}><small>{day}</small><strong>{preview[i]}</strong></div>)}</div>
      <div className="welcome-meeting"><span className="welcome-meeting-icon"><Clock3 size={18}/></span><div><strong>Design review</strong><small>10:00 – 11:00 · Work calendar</small></div><span className="welcome-event-dot"/></div>
      <div className="welcome-meeting is-lavender"><span className="welcome-meeting-icon"><UsersRound size={18}/></span><div><strong>Team catch-up</strong><small>14:00 – 14:30 · Projects</small></div><span className="welcome-event-dot"/></div>
      <div className="welcome-task"><Check size={16}/><span>Send final assets</span><span className="welcome-task-time">Today</span></div>
    </div>
    <div className="welcome-floating welcome-floating-right"><span className="welcome-mini-icon"><CheckCircle2 size={18}/></span><div><strong>You're making progress</strong><small>4 tasks completed this week</small></div></div>
  </div>;
}

export function LandingPage({ onEnter }) {
  return <div className="welcome-page">
    <header className="welcome-nav"><div className="welcome-brand"><span className="brand-symbol"><span/><span/><span/><span/></span><strong>chronos<span>.</span></strong></div><button className="welcome-nav-button" onClick={onEnter}>Open demo <ArrowUpRight size={17}/></button></header>
    <main>
      <section className="welcome-hero">
        <span className="welcome-kicker"><Sparkles size={16}/> A little more room for life</span>
        <h1>Make time for<br/><span className="welcome-highlight">what matters.</span></h1>
        <p>All your events, reminders and tasks — together in one beautiful calendar. Less juggling, more living.</p>
        <div className="welcome-actions"><button className="welcome-primary" onClick={onEnter}>Explore Chronos <ArrowUpRight size={19}/></button><button className="welcome-secondary" onClick={onEnter}>Explore demo <ChevronRight size={18}/></button></div>
        <span className="welcome-note">Interactive local demo · No account needed yet</span>
        <span className="welcome-glow" aria-hidden="true"/>
        <span className="welcome-spark welcome-spark-one" aria-hidden="true">✳</span><span className="welcome-spark welcome-spark-two" aria-hidden="true">✳</span>
      </section>
      <section className="welcome-preview"><CalendarArtwork/></section>
      <section className="welcome-features"><p className="welcome-eyebrow">THE LITTLE THINGS THAT ADD UP</p><h2>One place. A clearer day.</h2><div className="welcome-feature-grid"><article><span className="feature-icon orange"><CalendarDays size={24}/></span><h3>Make your plans</h3><p>See your day, week or month in a single view.</p></article><article><span className="feature-icon violet"><ListTodo size={24}/></span><h3>Stay on top of tasks</h3><p>Keep your to-dos and deadlines close to your events.</p></article><article><span className="feature-icon blue"><Layers3 size={24}/></span><h3>Keep things organized</h3><p>Separate work, personal plans and projects by calendar.</p></article></div></section>
      <section className="welcome-bottom"><h2>Ready for a little more clarity?</h2><button className="welcome-primary" onClick={onEnter}>Try the demo <MoveUpRight size={19}/></button></section>
    </main><footer className="welcome-footer">chronos. <span>Made for better days.</span></footer>
  </div>;
}
