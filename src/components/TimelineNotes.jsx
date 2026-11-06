import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { useStored } from '../lib/shared.jsx';

export function TimelineNotes() {
  const [notes, setNotes] = useStored('chronos-timeline-notes-v1', []);
  const [text, setText] = useState('');
  const addNote = e => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setNotes(previous => [...previous, { id: Date.now().toString(), body: value, when: new Date().toISOString() }]);
    setText('');
  };
  return <aside className="timeline-notes"><div className="timeline-notes-header"><span className="timeline-notes-icon"><MessageCircle size={19}/></span><div><strong>Activity & notes</strong><small>Personal workspace · saved locally</small></div></div>
    <div className="timeline-note-feed">{notes.length ? notes.map(note => <div className="timeline-note" key={note.id}><span className="timeline-note-avatar">You</span><div><strong>Your note <small>{new Date(note.when).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</small></strong><p>{note.body}</p></div></div>) : <div className="timeline-note-empty"><MessageCircle size={27}/><strong>No notes yet</strong><p>Write a quick update about your milestones. Your notes stay in this browser.</p></div>}</div>
    <form className="timeline-note-composer" onSubmit={addNote}><textarea value={text} onChange={e=>setText(e.target.value)} rows={3} placeholder="Write a note..." aria-label="New timeline note"/><button type="submit" disabled={!text.trim()}><Send size={17}/> Add note</button></form>
  </aside>;
}
