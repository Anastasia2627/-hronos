import React, { useMemo, useState } from 'react';
import { ArrowUpDown, Filter, Plus, Search } from 'lucide-react';
import { emptyTask } from '../data.js';
import { LANES, getLane } from './workspace/TeamStreamCard.jsx';
import { TeamStreamColumn } from './workspace/TeamStreamColumn.jsx';

export function TeamSpacePage({ tasks, onOpen, onStatus, onMoveLane }) {
  const [active, setActive] = useState('all');
  const [query, setQuery] = useState('');
  const [hideDone, setHideDone] = useState(false);
  const [earliest, setEarliest] = useState(true);

  const visible = useMemo(() => tasks
    .filter(task => (active === 'all' || getLane(task) === active)
      && (!hideDone || task.stage !== 'done')
      && `${task.title} ${task.description || ''}`.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => earliest ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)),
    [tasks, active, hideDone, query, earliest]);

  const add = lane => onOpen({ ...emptyTask(), workspaceLane: lane });
  const lanes = LANES.filter(lane => active === 'all' || lane.id === active);

  return <div className="team-space-page">
    <div className="team-space-shell">
      <header className="team-space-heading">
        <div><h1>Team space</h1><p>Tasks grouped by topic</p></div>
        <button className="btn btn-primary" onClick={() => add(active === 'all' ? 'team' : active)}>
          <Plus size={18} /> New task
        </button>
      </header>
      <div className="team-space-topbar">
        <div className="team-lane-tabs" role="group" aria-label="Task categories">
          <button className={active === 'all' ? 'selected' : ''} aria-pressed={active === 'all'} onClick={() => setActive('all')}>All</button>
          {LANES.map(lane => <button key={lane.id} className={active === lane.id ? 'selected' : ''}
            aria-pressed={active === lane.id} onClick={() => setActive(lane.id)}>{lane.title}</button>)}
        </div>
        <span className="team-board-spacer" />
        <label className="team-search"><Search size={17} /><input placeholder="Find a task" aria-label="Search team tasks"
          value={query} onChange={event => setQuery(event.target.value)} /></label>
        <button className={`team-filter-toggle ${hideDone ? 'on' : ''}`} onClick={() => setHideDone(!hideDone)} aria-pressed={hideDone}>
          <Filter size={16} /> {hideDone ? 'Active only' : 'All statuses'}
        </button>
        <button className="team-sort-btn" onClick={() => setEarliest(!earliest)} aria-label={`Sorted by ${earliest ? 'oldest' : 'newest'} due date; reverse order`}>
          <ArrowUpDown size={17} /> {earliest ? 'Oldest' : 'Newest'}
        </button>
      </div>
      <div className="team-streams">
        {lanes.map(lane => <TeamStreamColumn key={lane.id} lane={lane}
          tasks={visible.filter(task => getLane(task) === lane.id)}
          onOpen={onOpen} onStatus={onStatus} onMoveLane={onMoveLane} onAdd={add} />)}
      </div>
    </div>
  </div>;
}
