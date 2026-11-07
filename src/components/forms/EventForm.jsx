import React, { useState } from 'react';
import { Check, Clock3, Repeat2, Link2, MapPin, Tag, Palette, Trash2, CalendarDays, Plus, X, Flag } from 'lucide-react';
import { CAL_COLORS } from '../../data.js';
import { TYPES } from '../../lib/shared.jsx';

const REPEATS = [
  { id:'none', label:'Does not repeat' },
  { id:'daily', label:'Every day' },
  { id:'weekdays', label:'Weekdays' },
  { id:'weekly', label:'Every week' },
  { id:'monthly', label:'Every month' }
];

export function EventForm({ draft, calendars, categories = ['General'], onAddCategory, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState({ category:'General', endDate:draft.date, color:'', meetingLink:'', ...draft });
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const change = (key, val) => setForm(current => ({ ...current, [key]:val }));
  const changeType = type => setForm(current => ({ ...current, type }));
  const type = form.type || 'arrangement';
  const arrangement = type === 'arrangement';
  const task = type === 'task';
  const calendar = calendars.find(c => c.id === form.calendarId);
  const addCategory = () => {
    const name = onAddCategory?.(categoryName) || categoryName.trim();
    if (name) {change('category',name);setCategoryName('');setCreatingCategory(false);}
  };

  return <form className="editor-form event-form" onSubmit={e=>{e.preventDefault();onSave(form);}}>
    <div className="event-kind-select" role="group" aria-label="Event type">
      {Object.entries(TYPES).map(([key,meta])=>{const Icon=meta.icon;return <button key={key} type="button" className={`event-kind ${type === key ? 'selected' : ''} event-kind-${meta.tone}`} aria-pressed={type === key} onClick={()=>changeType(key)}><Icon size={19}/><span><strong>{meta.label}</strong><small>{meta.description}</small></span></button>;})}
    </div>

    <label className="field event-main-title"><span>{task ? 'Task name' : arrangement ? 'Event name' : 'Reminder name'} <em>*</em></span><input required autoFocus value={form.title || ''} onChange={e=>change('title',e.target.value)} placeholder={task ? 'What needs to get done?' : arrangement ? 'What are you planning?' : 'What should I remember?'}/></label>

    <div className="event-section-heading"><CalendarDays size={18}/><h3>{task ? 'Due date' : 'When'}</h3></div>
    <div className="event-form-dates">
      <label className="field"><span>{task ? 'Date' : 'Start date'}</span><input type="date" required value={form.date} onChange={e=>{const date=e.target.value;setForm(f=>({...f,date,endDate:arrangement && f.endDate && f.endDate>=date ? f.endDate : date}));}}/></label>
      {arrangement && <label className="field"><span>End date</span><input type="date" min={form.date} value={form.endDate || form.date} onChange={e=>change('endDate',e.target.value)}/></label>}
      {arrangement && <label className="field"><span><Clock3 size={15}/> Start time</span><input type="time" required value={form.start} onChange={e=>change('start',e.target.value)}/></label>}
      {arrangement && <label className="field"><span><Clock3 size={15}/> End time</span><input type="time" required value={form.end} onChange={e=>change('end',e.target.value)}/></label>}
      {!arrangement && <label className="field"><span><Clock3 size={15}/> {task ? 'Due time' : 'Remind me at'}</span><input type="time" value={form.start} onChange={e=>change('start',e.target.value)}/></label>}
    </div>
    <div className="event-form-dates event-form-secondary">
      <label className="field"><span><CalendarDays size={15}/> Calendar</span><div className="select-with-dot"><i style={{background:calendar?.color || '#f18b47'}}/><select value={form.calendarId} onChange={e=>change('calendarId',e.target.value)}>{calendars.filter(c=>!c.readOnly).map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div></label>
      <label className="field"><span><Repeat2 size={15}/> Repeat</span><select value={form.repeat || 'none'} onChange={e=>change('repeat',e.target.value)}>{REPEATS.map(r=><option key={r.id} value={r.id}>{r.label}</option>)}</select></label>
    </div>
    <div className="event-form-dates event-form-secondary">
      <div className="field"><span><Tag size={15}/> Category</span><div className="event-category-select"><select value={form.category || 'General'} onChange={e=>change('category',e.target.value)}>{[...new Set([...categories,form.category || 'General'])].map(name=><option key={name}>{name}</option>)}</select><button type="button" aria-label="Create category" title="Create category" onClick={()=>setCreatingCategory(v=>!v)}><Plus size={17}/></button></div></div>
      {(task || type === 'reminder') && <div className="event-color-choice"><span><Palette size={15}/> Color</span><div className="event-swatches" role="group" aria-label="Event color"><button type="button" className={!form.color ? 'selected' : ''} aria-label="Use calendar color" title="Calendar color" onClick={()=>change('color','')}><span style={{background:calendar?.color || '#f18b47'}}/></button>{CAL_COLORS.map(color=><button type="button" key={color} aria-label={`Set color ${color}`} aria-pressed={form.color === color} className={form.color === color ? 'selected' : ''} onClick={()=>change('color',color)}><span style={{background:color}}/></button>)}</div></div>}
    </div>
    {creatingCategory && <div className="new-category-line"><input value={categoryName} onChange={e=>setCategoryName(e.target.value)} placeholder="New category name" aria-label="New category name" onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addCategory();}}}/><button className="btn btn-primary" type="button" onClick={addCategory}>Add</button><button type="button" aria-label="Cancel new category" onClick={()=>setCreatingCategory(false)}><X size={17}/></button></div>}

    {arrangement && <label className="field event-link-field"><span><Link2 size={16}/> Meeting link</span><input type="url" value={form.meetingLink || ''} onChange={e=>change('meetingLink',e.target.value)} placeholder="https://meet.google.com/..."/></label>}
    <details className="form-more event-details"><summary>More details</summary>
      {arrangement && <label className="field"><span><MapPin size={16}/> Location <small>optional</small></span><input value={form.location || ''} onChange={e=>change('location',e.target.value)} placeholder="Address, room or venue"/></label>}
      <label className="field"><span>{task ? 'Task description' : arrangement ? 'Agenda / notes' : 'Reminder details'}</span><textarea rows={3} value={form.description || ''} onChange={e=>change('description',e.target.value)} placeholder="Add details if needed"/></label>
    </details>
    <div className="form-actions">{onDelete && <button className="btn btn-outline-danger" type="button" onClick={onDelete}><Trash2 size={16}/> Delete</button>}
      <div className="form-buttons"><button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button><button className="btn btn-primary" type="submit"><Check size={17}/>{draft.id ? 'Save changes' : 'Create'}</button></div></div>
  </form>;
}
