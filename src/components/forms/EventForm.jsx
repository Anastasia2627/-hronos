import React, { useState } from 'react';
import { CalendarDays, MapPin, Users, Clock3, Repeat2, Check, Trash2, Palette } from 'lucide-react';
import { TYPES } from '../../lib/shared.jsx';
import { MiniMonth } from '../ui/MiniMonth.jsx';

export function EventForm({ draft, calendars, onSave, onCancel, onDelete, isPage=false }) {
  const [form,setForm]=useState(draft);
  const change=(field,value)=>setForm(prev=>({...prev,[field]:value}));
  const selected=calendars.find(c=>c.id===form.calendarId);
  return <form className="editor-form" onSubmit={e=>{e.preventDefault();onSave(form)}}>
    <div className="editor-type-row">{Object.entries(TYPES).map(([id,t])=>{const Icon=t.icon;return <button type="button" key={id} className={`type-choice type-${t.tone} ${form.type===id?'type-selected':''}`} onClick={()=>change('type',id)} aria-pressed={form.type===id}><Icon size={18}/>{t.label}</button>})}</div>
    <label className="field field-title"><span>Title <em>*</em></span><input autoFocus={isPage} required placeholder="What are you planning?" value={form.title} onChange={e=>change('title',e.target.value)}/></label>
    <div className="event-time-layout">
      <div className="event-picker-side"><MiniMonth value={form.date} onSelect={date=>change('date',date)}/></div>
      <div className="event-details-side">
        <label className="field"><span><CalendarDays size={16}/> Date</span><input type="date" required value={form.date} onChange={e=>change('date',e.target.value)}/></label>
        <div className="form-row"><label className="field"><span><Clock3 size={16}/> Start time</span><input required type="time" value={form.start} onChange={e=>change('start',e.target.value)}/></label><label className="field"><span><Clock3 size={16}/> End time</span><input required type="time" value={form.end} onChange={e=>change('end',e.target.value)}/></label></div>
        <label className="field"><span><Palette size={16}/> Calendar</span><div className="select-with-dot"><i style={{background:selected?.color||'#f18b47'}}/><select value={form.calendarId} onChange={e=>change('calendarId',e.target.value)}>{calendars.filter(c=>!c.readOnly).map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div></label>
      </div>
    </div>
    <details className="form-more" open={Boolean(form.id && (form.location || form.participants || form.repeat!=='none' || form.description))}><summary>More options</summary>
      <label className="field"><span><Repeat2 size={16}/> Repeat</span><select value={form.repeat||'none'} onChange={e=>change('repeat',e.target.value)}><option value="none">Doesn't repeat</option><option value="daily">Every day</option><option value="weekly">Every week</option></select></label>
      <label className="field"><span><MapPin size={16}/> Location or meeting link</span><input placeholder="Optional" value={form.location||''} onChange={e=>change('location',e.target.value)}/></label>
      <label className="field"><span><Users size={16}/> Participants <small>(invitations coming with backend)</small></span><input type="text" placeholder="name@example.com" value={form.participants||''} onChange={e=>change('participants',e.target.value)}/></label>
      <label className="field"><span>Notes</span><textarea rows={3} value={form.description||''} onChange={e=>change('description',e.target.value)} placeholder="Add details"/></label>
    </details>
    <div className="form-actions">{onDelete&&<button className="btn btn-outline-danger" type="button" onClick={onDelete}><Trash2 size={16}/> Delete</button>}<div className="form-buttons"><button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button><button type="submit" className="btn btn-primary"><Check size={17}/>{draft.id?'Save changes':'Create event'}</button></div></div>
  </form>;
}
