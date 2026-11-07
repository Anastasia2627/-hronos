import React, { useState } from 'react';
import { CalendarDays, Check, CheckCircle2, ChevronDown, CircleDashed, Flag, ListTodo, PlayCircle, ScanEye, Trash2, Pin, Palette, Repeat2, Tag, Plus, X } from 'lucide-react';
import { STAGES, CAL_COLORS } from '../../data.js';

const ICONS = { todo:CircleDashed, progress:PlayCircle, review:ScanEye, done:CheckCircle2 };
const PRIORITIES = ['Low','Medium','High'];

export function TaskForm({ draft, categories = ['General'], onAddCategory, onSave, onCancel, onDelete }) {
  const [form,setForm] = useState({ featured:false,category:'General',repeat:'none',...draft });
  const [newCategory,setNewCategory] = useState(false);
  const [categoryName,setCategoryName] = useState('');
  const change=(key,value)=>setForm(f=>({...f,[key]:value}));
  const status = STAGES.find(s=>s.id === form.stage) || STAGES[0];
  const StatusIcon = ICONS[status.id];
  const addCategory=()=>{const value=onAddCategory?.(categoryName)||categoryName.trim();if(value){change('category',value);setNewCategory(false);setCategoryName('');}};
  return <form className="task-editor" onSubmit={e=>{e.preventDefault();onSave(form);}}>
    <div className="task-editor-heading"><span className="task-editor-symbol"><ListTodo size={22}/></span><div className="task-editor-heading-copy"><span className="task-editor-eyebrow">PERSONAL PLANNER</span><strong>{draft.id ? 'Edit task' : 'New task'}</strong></div><span className={`task-editor-current task-stage-${status.id}`}><StatusIcon size={15}/>{status.name}</span></div>
    <div className="task-editor-content">
      <label className="task-editor-field task-editor-title"><span>Task name <em>*</em></span><input autoFocus required placeholder="What needs to be done?" value={form.title||''} onChange={e=>change('title',e.target.value)}/></label>
      <label className="task-editor-field task-editor-description"><span>Description <small>Optional</small></span><textarea rows={2} value={form.description||''} onChange={e=>change('description',e.target.value)} placeholder="Add a little context..."/></label>
      <div className="task-editor-section-label"><span>PROGRESS</span><i/></div>
      <div className="task-editor-status" role="group" aria-label="Task status">{STAGES.map(s=>{const Icon=ICONS[s.id];return <button key={s.id} type="button" className={`task-editor-status-button task-stage-${s.id} ${form.stage === s.id?'selected':''}`} aria-pressed={form.stage === s.id} onClick={()=>change('stage',s.id)}><Icon size={18}/><span>{s.name}</span></button>;})}</div>
      <div className="task-editor-schedule"><label className="task-editor-field"><span><CalendarDays size={16}/> Due date</span><input type="date" required value={form.date} onChange={e=>change('date',e.target.value)}/></label><label className="task-editor-field"><span><Repeat2 size={16}/> Repeat</span><select value={form.repeat||'none'} onChange={e=>change('repeat',e.target.value)}><option value="none">Does not repeat</option><option value="daily">Every day</option><option value="weekly">Every week</option><option value="monthly">Every month</option></select></label></div>
      <div className="task-editor-schedule"><div className="task-editor-field"><span><Flag size={16}/> Priority</span><div className="task-editor-priorities" role="group" aria-label="Task priority">{PRIORITIES.map(p=><button key={p} type="button" className={`task-editor-priority task-priority-${p.toLowerCase()} ${form.priority === p?'selected':''}`} aria-pressed={form.priority === p} onClick={()=>change('priority',p)}><i/>{p}</button>)}</div></div><div className="task-editor-field"><span><Tag size={16}/> Category</span><div className="event-category-select"><select value={form.category||'General'} onChange={e=>change('category',e.target.value)}>{[...new Set([...categories,form.category||'General'])].map(name=><option key={name}>{name}</option>)}</select><button type="button" title="New category" onClick={()=>setNewCategory(!newCategory)}><Plus size={16}/></button></div></div></div>
      {newCategory && <div className="new-category-line"><input value={categoryName} placeholder="Category name" onChange={e=>setCategoryName(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addCategory();}}}/><button className="btn btn-primary" type="button" onClick={addCategory}>Add</button><button type="button" title="Cancel" onClick={()=>setNewCategory(false)}><X size={16}/></button></div>}
      <label className={`task-editor-feature ${form.featured?'is-on':''}`}><span className="task-editor-pin-icon"><Pin size={18}/></span><span className="task-editor-feature-copy"><strong>Add to Priority stack</strong><small>Keep this task in focus on Home</small></span><input type="checkbox" checked={Boolean(form.featured)} onChange={e=>change('featured',e.target.checked)}/><span className="task-editor-switch" aria-hidden="true"/></label>
      <details className="task-editor-more"><summary><span><Palette size={17}/> Card color</span><ChevronDown size={17} className="task-editor-more-chevron"/></summary><div className="task-editor-extra"><div className="task-editor-colors" role="group" aria-label="Card color">{CAL_COLORS.map(color=><button key={color} type="button" aria-label={`Card color ${color}`} aria-pressed={form.color === color} className={form.color === color?'is-selected':''} style={{'--swatch':color}} onClick={()=>change('color',color)}>{form.color === color&&<Check size={15}/>}</button>)}</div></div></details>
    </div>
    <div className="task-editor-footer">{onDelete&&<button type="button" className="task-editor-delete" onClick={onDelete}><Trash2 size={17}/> Delete task</button>}<div className="task-editor-actions"><button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button><button type="submit" className="btn btn-primary"><Check size={17}/>{draft.id?'Save changes':'Create task'}</button></div></div>
  </form>;
}
