import React, { useState } from 'react';
import {
  CalendarDays, Check, CheckCircle2, ChevronDown, CircleDashed,
  Flag, Layers3, ListTodo, PlayCircle, ScanEye, Trash2,
  UserRound, Pin, Palette
} from 'lucide-react';
import { STAGES, CAL_COLORS } from '../../data.js';

const STATUS_ICONS = {
  todo: CircleDashed,
  progress: PlayCircle,
  review: ScanEye,
  done: CheckCircle2,
};
const PRIORITIES = [ 'Low', 'Medium', 'High' ];

export function TaskForm({ draft, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState({ featured: false, ...draft });
  const change = (field, value) => setForm(current => ({ ...current, [field]: value }));
  const stage = STAGES.find(item => item.id === form.stage) || STAGES[0];
  const StageIcon = STATUS_ICONS[stage.id] || CircleDashed;
  const highlighted = Boolean(form.featured);

  return <form className="task-editor" onSubmit={event => { event.preventDefault(); onSave(form); }}>
    <div className="task-editor-heading">
      <span className="task-editor-symbol"><ListTodo size={22} strokeWidth={2.2} /></span>
      <div className="task-editor-heading-copy">
        <span className="task-editor-eyebrow">{draft.id ? 'WORKSPACE' : 'NEW TASK'}</span>
        <strong>{form.workspaceLane === 'ideas' ? 'Ideas' : form.workspaceLane === 'other' ? 'Other' : 'Team tasks'}</strong>
      </div>
      <span className={`task-editor-current task-stage-${stage.id}`}><StageIcon size={15} />{stage.name}</span>
    </div>

    <div className="task-editor-content">
      <label className="task-editor-field task-editor-title">
        <span>Task name <em>*</em></span>
        <input required autoFocus placeholder="What needs to be done?" value={form.title || ''} onChange={event => change('title', event.target.value)} />
      </label>
      <label className="task-editor-field task-editor-description">
        <span>Description <small>Optional</small></span>
        <textarea rows={2} placeholder="Add a little context…" value={form.description || ''} onChange={event => change('description', event.target.value)} />
      </label>

      <div className="task-editor-section-label"><span>PROGRESS</span><i /></div>
      <div className="task-editor-status" role="group" aria-label="Task status">
        {STAGES.map(item => {
          const Icon = STATUS_ICONS[item.id];
          return <button key={item.id} className={`task-editor-status-button task-stage-${item.id} ${form.stage === item.id ? 'selected' : ''}`} type="button" aria-pressed={form.stage === item.id} onClick={() => change('stage', item.id)}>
            <Icon size={18} strokeWidth={2.3} /><span>{item.name}</span>
          </button>;
        })}
      </div>

      <div className="task-editor-schedule">
        <label className="task-editor-field">
          <span><CalendarDays size={16} /> Due date</span>
          <input required type="date" value={form.date || ''} onChange={event => change('date', event.target.value)} />
        </label>
        <div className="task-editor-field">
          <span><Flag size={16} /> Priority</span>
          <div className="task-editor-priorities" role="group" aria-label="Task priority">
            {PRIORITIES.map(priority => <button key={priority} type="button" className={`task-editor-priority task-priority-${priority.toLowerCase()} ${form.priority === priority ? 'selected' : ''}`} aria-pressed={form.priority === priority} onClick={() => change('priority', priority)}><i />{priority}</button>)}
          </div>
        </div>
      </div>

      <label className={`task-editor-feature ${highlighted ? 'is-on' : ''}`}>
        <span className="task-editor-pin-icon"><Pin size={19} strokeWidth={2.2}/></span>
        <span className="task-editor-feature-copy"><strong>Add to Priority stack</strong><small>Keep this task in focus on Home</small></span>
        <input type="checkbox" checked={highlighted} onChange={event => change('featured', event.target.checked)} />
        <span className="task-editor-switch" aria-hidden="true" />
      </label>

      <details className="task-editor-more">
        <summary><span><Layers3 size={17}/> More details</span><ChevronDown size={18} className="task-editor-more-chevron" /></summary>
        <div className="task-editor-extra">
          <label className="task-editor-field"><span><UserRound size={16}/> Assigned to</span><input maxLength={3} value={form.initials || ''} onChange={event => change('initials', event.target.value.toUpperCase())} placeholder="AK" /></label>
          <label className="task-editor-field"><span><Layers3 size={16}/> Team group</span><select value={form.workspaceLane || 'team'} onChange={event => change('workspaceLane', event.target.value)}><option value="team">Team tasks</option><option value="ideas">Ideas</option><option value="other">Other</option></select></label>
          <div className="task-editor-field task-editor-color-row"><span><Palette size={16}/> Card color</span><div className="task-editor-colors" role="group" aria-label="Card color">{CAL_COLORS.map(color => <button key={color} type="button" aria-label={`Select card color ${color}`} aria-pressed={form.color === color} className={form.color === color ? 'is-selected' : ''} style={{ '--swatch': color }} onClick={() => change('color', color)}>{form.color === color && <Check size={15} strokeWidth={3}/>}</button>)}</div></div>
        </div>
      </details>
    </div>

    <div className="task-editor-footer">
      {onDelete && <button type="button" className="task-editor-delete" onClick={onDelete}><Trash2 size={17}/> Delete task</button>}
      <div className="task-editor-actions"><button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button><button type="submit" className="btn btn-primary"><Check size={17}/>{draft.id ? 'Save changes' : 'Create task'}</button></div>
    </div>
  </form>;
}
