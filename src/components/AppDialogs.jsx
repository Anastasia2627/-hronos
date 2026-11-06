import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { Modal } from './Common.jsx';
import { EventForm } from './forms/EventForm.jsx';
import { TaskForm } from './forms/TaskForm.jsx';
import { CalendarForm } from './forms/CalendarForm.jsx';

export function AppDialogs({ state }) {
  const { page, eventDraft, eventEditor, taskDraft, setTaskDraft, calendarDraft, setCalendarDraft, confirmDelete, setConfirmDelete, toast, setToast, calendars, closeEvent, saveEvent, deleteEvent, saveTask, deleteTask, deleteTasks, saveCalendar, deleteCalendar } = state;
  return (
    <>
      {eventDraft && eventEditor === 'modal' && page !== 'create-event' && <Modal onClose={closeEvent} title={eventDraft.id ? 'Edit event' : 'Quick event'} subtitle="Keep your day in sync." size="medium"><EventForm key={eventDraft.id || `${eventDraft.date}-${eventDraft.start}`} draft={eventDraft} calendars={calendars} onSave={saveEvent} onCancel={closeEvent} onDelete={eventDraft.id ? () => setConfirmDelete({ kind: 'event', id: eventDraft.id, label: eventDraft.title }) : null} /></Modal>}
      {taskDraft && <Modal onClose={() => setTaskDraft(null)} title={taskDraft.id ? 'Task details' : 'New task'} subtitle="Break things down. Keep moving." size="medium"><TaskForm key={taskDraft.id || 'new-task'} draft={taskDraft} onSave={saveTask} onCancel={() => setTaskDraft(null)} onDelete={taskDraft.id ? () => setConfirmDelete({ kind: 'task', id: taskDraft.id, label: taskDraft.title }) : null} /></Modal>}
      {calendarDraft && <Modal onClose={() => setCalendarDraft(null)} title={calendarDraft.id ? 'Calendar settings' : 'New calendar'} subtitle="A little structure makes space for more." size="medium"><CalendarForm key={calendarDraft.id || 'new-calendar'} draft={calendarDraft} onSave={saveCalendar} onCancel={() => setCalendarDraft(null)} onDelete={calendarDraft.id && !['personal', 'holidays'].includes(calendarDraft.id) ? () => setConfirmDelete({ kind: 'calendar', id: calendarDraft.id, label: calendarDraft.name }) : null} /></Modal>}
      {confirmDelete && <Modal title={`Delete ${confirmDelete.kind}?`} subtitle={`“${confirmDelete.label}” will be removed from this device.`} onClose={() => setConfirmDelete(null)} size="small"><div className="modal-actions"><button className="btn btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button><button className="btn btn-danger" onClick={() => confirmDelete.kind === 'event' ? deleteEvent(confirmDelete.id) : confirmDelete.kind === 'task' ? deleteTask(confirmDelete.id) : confirmDelete.kind === 'bulk-task' ? deleteTasks(confirmDelete.ids) : deleteCalendar(confirmDelete.id)}>Delete {confirmDelete.kind === 'bulk-task' ? 'tasks' : confirmDelete.kind}</button></div></Modal>}
      {toast && <div className="toast" role="status"><CheckCircle2 size={18} />{toast}<button onClick={() => setToast('')} aria-label="Dismiss"><X size={15} /></button></div>}
    </>
  );
}
