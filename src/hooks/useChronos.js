import React, { useEffect, useMemo, useState } from 'react';
import { TODAY, dateKey, parseDate, offsetDate, createId, initialCalendars, initialEvents, initialTasks, emptyEvent } from '../data.js';
import { useStored, getOccurrences, initials } from '../lib/shared.jsx';

export function useChronos() {
  const [calendars, setCalendars] = useStored('chronos-calendars-v1', initialCalendars);
  // Older local demos could hide the main calendar; keep it visible on upgrade.
  useEffect(() => {
    setCalendars(list => list.some(c => c.id === 'personal' && !c.visible)
      ? list.map(c => c.id === 'personal' ? { ...c, visible: true } : c)
      : list);
  }, [setCalendars]);
  const [events, setEvents] = useStored('chronos-events-v1', initialEvents);
  const [tasks, setTasks] = useStored('chronos-tasks-v1', initialTasks);
  const [profile, setProfile] = useStored('chronos-profile-v1', { name: 'Anastasiia', email: 'hello@chronos.demo', role: 'Creative workspace' });
  const [page, setPage] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useStored('chronos-view-v1', 'month');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [eventDraft, setEventDraft] = useState(null);
  const [eventEditor, setEventEditor] = useState('modal');
  const [taskDraft, setTaskDraft] = useState(null);
  const [calendarDraft, setCalendarDraft] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toast, setToast] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [taskFilter, setTaskFilter] = useState('all');
  const [profileEditing, setProfileEditing] = useState(false);
  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(''), 3600);
    return () => clearTimeout(timeout);
  }, [toast]);
  const activeCalendars = useMemo(() => new Set(calendars.filter((c) => c.visible).map((c) => c.id)), [calendars]);
  const filteredEvents = useMemo(() => events.filter((e) => activeCalendars.has(e.calendarId)
    && (typeFilter === 'all' || e.type === typeFilter)
    && e.title.toLowerCase().includes(search.trim().toLowerCase())), [events, activeCalendars, typeFilter, search]);
  const filteredTasks = useMemo(() => tasks.filter((t) => (taskFilter === 'all' || (taskFilter === 'mine' && t.initials === 'AK') || (taskFilter === 'high' && t.priority === 'High')) && `${t.title} ${t.description}`.toLowerCase().includes(search.trim().toLowerCase())), [tasks, search, taskFilter]);
  const colorFor = (id) => calendars.find((c) => c.id === id)?.color || '#f18b47';
  const selectPage = (p) => { setPage(p); setSearch(''); setSidebarOpen(false); setNotificationsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const toggleCalendar = (id) => { if (id === 'personal') return; setCalendars(list => list.map(c => c.id === id ? { ...c, visible: !c.visible } : c)); };
  const changeMonth = (delta) => setSelectedDate((d) => new Date(d.getFullYear(), d.getMonth() + delta, Math.min(d.getDate(), 28)));
  const changeViewPage = (delta) => {
    setSelectedDate((d) => view === 'month' ? new Date(d.getFullYear(), d.getMonth() + delta, 1) : view === 'year' ? new Date(d.getFullYear() + delta, d.getMonth(), 1) : offsetDate(d, delta * (view === 'week' ? 7 : 1)));
  };
  const openEvent = (event = null, day = new Date(), hour = '09:00', mode = 'modal') => {
    const initial = event ? { ...event } : { ...emptyEvent(dateKey(day)), start: hour, end: `${String(Math.min(23, Number(hour.slice(0, 2)) + 1)).padStart(2, '0')}:${hour.slice(3)}` };
    setEventDraft(initial); setEventEditor(mode);
    if (mode === 'page') selectPage('create-event');
  };
  const closeEvent = () => { setEventDraft(null); if (page === 'create-event') selectPage('calendar'); };
  const saveEvent = (form) => {
    if (!form.title.trim()) { setToast('Add a title to your event'); return; }
    if (form.end <= form.start) { setToast('End time must be after start time'); return; }
    if (form.id) setEvents((prev) => prev.map((e) => e.id === form.id ? { ...form, title: form.title.trim() } : e));
    else setEvents((prev) => [...prev, { ...form, id: createId(), title: form.title.trim() }]);
    setToast(form.id ? 'Event updated' : 'Event added to your calendar');
    setSelectedDate(parseDate(form.date)); closeEvent();
  };
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id)); setConfirmDelete(null); closeEvent(); setToast('Event deleted');
  };
  const saveTask = (form) => {
    if (!form.title.trim()) { setToast('Add a title to your task'); return; }
    if (form.id) setTasks((prev) => prev.map((t) => t.id === form.id ? { ...form, title: form.title.trim() } : t));
    else setTasks((prev) => [...prev, { ...form, id: createId(), title: form.title.trim() }]);
    setTaskDraft(null); setToast(form.id ? 'Task updated' : 'Task created');
  };
  const moveTask = (id, stage) => setTasks((prev) => prev.map((task) => task.id === id ? { ...task, stage } : task));
  const moveTaskLane = (id, workspaceLane) => setTasks(prev => prev.map(task => task.id === id ? { ...task, workspaceLane } : task));
  const moveTasks = (ids, stage) => { const selected = new Set(ids); setTasks(prev => prev.map(t => selected.has(t.id) ? { ...t, stage } : t)); setToast(`${ids.length} tasks updated`); };
  const deleteTasks = (ids) => { const selected = new Set(ids); setTasks(prev => prev.filter(t => !selected.has(t.id))); setConfirmDelete(null); setToast(`${ids.length} tasks deleted`); };
  const deleteTask = (id) => { setTasks((prev) => prev.filter((t) => t.id !== id)); setTaskDraft(null); setConfirmDelete(null); setToast('Task deleted'); };
  const saveCalendar = (form) => {
    if (!form.name.trim()) { setToast('Give your calendar a name'); return; }
    if (form.id) setCalendars(list => list.map(c => c.id === form.id ? { ...form, name: form.name.trim(), visible: c.id === 'personal' ? true : form.visible } : c));
    else setCalendars((list) => [...list, { ...form, id: createId(), name: form.name.trim(), visible: true, readOnly: false }]);
    setCalendarDraft(null); setToast('Calendar saved');
  };
  const deleteCalendar = (id) => {
    if (['personal', 'holidays'].includes(id)) return;
    setCalendars((list) => list.filter((c) => c.id !== id));
    setEvents((list) => list.filter((e) => e.calendarId !== id));
    setConfirmDelete(null); setCalendarDraft(null); setToast('Calendar deleted');
  };
  const todayEvents = getOccurrences(filteredEvents, TODAY);
  const upcomingCount = filteredEvents.filter((e) => parseDate(e.date) >= new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate())).length;
  const overdue = tasks.filter((t) => t.stage !== 'done' && parseDate(t.date) < new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate())).length;
  return { calendars, events, tasks, profile, setProfile, page, selectedDate, setSelectedDate, view, setView, search, setSearch, typeFilter, setTypeFilter, showFilters, setShowFilters, eventDraft, eventEditor, taskDraft, setTaskDraft, calendarDraft, setCalendarDraft, confirmDelete, setConfirmDelete, sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed, toast, setToast, notificationsOpen, setNotificationsOpen, taskFilter, setTaskFilter, filteredEvents, filteredTasks, colorFor, selectPage, toggleCalendar, changeViewPage, openEvent, closeEvent, saveEvent, deleteEvent, saveTask, moveTask, moveTaskLane, moveTasks, deleteTask, deleteTasks, saveCalendar, deleteCalendar, todayEvents, upcomingCount, overdue };
}
