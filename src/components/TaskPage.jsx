import React from 'react';
import { Plus } from 'lucide-react';
import { emptyTask } from '../data.js';
import { PageHeading } from './Common.jsx';
import { TaskBoard } from './TaskBoard.jsx';

export function TaskPage({ tasks, taskFilter, setTaskFilter, filteredTasks, setTaskDraft, moveTask }) {
  return (
    <div className="tasks-page">
      <PageHeading eyebrow="STAY ON TOP OF THE DETAILS" title="My tasks" subtitle="Small steps, meaningful progress." right={<button className="btn btn-primary" onClick={() => setTaskDraft(emptyTask())}><Plus size={18} /> New task</button>} />
      <div className="task-tools"><span><strong>{tasks.filter(t => t.stage !== 'done').length}</strong> active tasks <span className="dot-separator">·</span> {tasks.filter(t => t.stage === 'done').length} completed</span><select className="select-minimal" value={taskFilter} onChange={e => setTaskFilter(e.target.value)} aria-label="Task filter"><option value="all">All tasks</option><option value="mine">Assigned to me</option><option value="high">High priority</option></select></div>
      <TaskBoard tasks={filteredTasks} onOpen={setTaskDraft} onMove={moveTask} onAdd={stage => setTaskDraft({ ...emptyTask(), stage })} />
    </div>
  );
}
