import { useEffect, useMemo, useState } from 'react';
import { TODAY, dateKey, parseDate, offsetDate, createId, initialCalendars, initialEvents, initialTasks, emptyEvent } from '../data.js';
import { useStored, getOccurrences, occursOnDay, nextTaskOccurrence } from '../lib/shared.jsx';

const cleanEmail = email => email.trim().toLowerCase();

export function useChronos() {
  const [calendars, setCalendars] = useStored('chronos-calendars-v1', initialCalendars);
  const [events, setEvents] = useStored('chronos-events-v1', initialEvents);
  const [tasks, setTasks] = useStored('chronos-tasks-v1', initialTasks);
  const [categories, setCategories] = useStored('chronos-categories-v1', ['General', 'Work', 'Personal', 'Study']);
  const [profile, setProfile] = useStored('chronos-profile-v1', { name:'Anastasiia', email:'hello@chronos.demo', role:'Creative workspace', defaultView:'month' });
  const [page, setPage] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useStored('chronos-view-v1', 'month');
  const [calendarFilter, setCalendarFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');
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

  useEffect(() => {
    setCalendars(prev => prev.some(c => c.id === 'personal' && !c.visible)
      ? prev.map(c => c.id === 'personal' ? { ...c, visible:true } : c) : prev);
  }, [setCalendars]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 3600); return () => clearTimeout(t); }, [toast]);

  const filteredEvents = useMemo(() => {
    const visible = new Set(calendars.filter(c => c.visible).map(c => c.id));
    const calendarTasks = tasks.filter(t => t.repeat && t.repeat !== 'none' || t.stage !== 'done').map(t => ({ ...t, id:'task:'+t.id, linkedTaskId:t.id, type:'task', calendarId:'personal', start:'09:00', end:'10:00', endDate:t.date, category:t.category || 'General', repeat:t.repeat || 'none', description:t.description || '' }));
    return [...events, ...calendarTasks].filter(e => visible.has(e.calendarId)
      && (calendarFilter === 'all' || e.calendarId === calendarFilter)
      && (typeFilter === 'all' || e.type === typeFilter)
      && (categoryFilter === 'all' || (e.category || 'General') === categoryFilter)
      && `${e.title} ${e.description || ''}`.toLowerCase().includes(search.trim().toLowerCase()));
  }, [events, tasks, calendars, calendarFilter, typeFilter, categoryFilter, search]);
  const colorFor = id => calendars.find(c => c.id === id)?.color || '#f18b47';
  const colorForEvent = e => e.color || colorFor(e.calendarId);
  const selectPage = p => {
    const destination = ['tasks', 'projects', 'team'].includes(p) ? 'calendar' : p;
    setPage(destination); setSearch(''); setSidebarOpen(false); setNotificationsOpen(false);
    window.scrollTo({ top:0, behavior:'smooth' });
  };
  const toggleCalendar = id => {
    if (id === 'personal') return;
    setCalendars(prev => prev.map(c => c.id === id ? { ...c, visible:!c.visible } : c));
  };
  const changeViewPage = delta => setSelectedDate(d => view === 'month'
    ? new Date(d.getFullYear(), d.getMonth() + delta, 1)
    : view === 'year' ? new Date(d.getFullYear() + delta, d.getMonth(), 1)
    : offsetDate(d, delta * (view === 'week' ? 7 : 1)));

  const openEvent = (event = null, day = new Date(), hour = '09:00', mode = 'modal') => {
    const d = event ? { ...event, endDate:event.endDate || event.date, category:event.category || 'General' }
      : { ...emptyEvent(dateKey(day)), start:hour,
        end:`${String(Math.min(23, Number(hour.slice(0,2)) + 1)).padStart(2,'0')}:${hour.slice(3)}`,
        calendarId:calendarFilter === 'all' || calendars.find(c => c.id === calendarFilter)?.readOnly ? 'personal' : calendarFilter };
    setEventDraft(d); setEventEditor(mode);
    if (mode === 'page') selectPage('create-event');
  };
  const closeEvent = () => { setEventDraft(null); if (page === 'create-event') selectPage('calendar'); };
  const openCalendarItem = (item, day, hour, mode) => {
    if (item?.linkedTaskId) { const task = tasks.find(t => t.id === item.linkedTaskId); if (task) setTaskDraft({ ...task }); return; }
    openEvent(item,day,hour,mode);
  };
  const saveEvent = form => {
    if (!form.title.trim()) { setToast('Please enter a title'); return; }
    if (form.endDate && form.endDate < form.date) { setToast('End date must not be earlier than start date'); return; }
    if (form.type === 'arrangement' && (form.endDate || form.date) === form.date && form.end <= form.start) {
      setToast('End time must be after start time'); return;
    }
    const event = { ...form, title:form.title.trim(), endDate:form.endDate || form.date };
    setEvents(prev => event.id ? prev.map(e => e.id === event.id ? event : e)
      : [...prev, { ...event, id:createId() }]);
    setSelectedDate(parseDate(event.date)); closeEvent(); setToast(event.id ? 'Event updated' : 'Event added');
  };
  const deleteEvent = id => { setEvents(prev => prev.filter(e => e.id !== id)); setConfirmDelete(null); closeEvent(); setToast('Event deleted'); };
  const toggleEventCompleted = (id, date) => setEvents(prev => prev.map(e => e.id !== id ? e : {
    ...e,
    completedDates:(e.completedDates || []).includes(date) ? (e.completedDates || []).filter(x => x !== date) : [...(e.completedDates || []), date]
  }));

  const saveTask = form => {
    if (!form.title.trim()) { setToast('Please enter a title'); return; }
    const task = { ...form, title:form.title.trim() };
    if (task.stage === 'done' && task.repeat && task.repeat !== 'none') {
      const due = nextTaskOccurrence(task);
      task.completedDates = [...new Set([...(task.completedDates || []),due])];
      task.stage = 'todo';
    }
    setTasks(prev => task.id ? prev.map(t => t.id === task.id ? task : t) : [...prev, { ...task, id:createId() }]);
    setTaskDraft(null); setToast(task.id ? 'Task updated' : 'Task added');
  };
  const moveTask = (id, stage) => setTasks(prev => prev.map(t => {
    if (t.id !== id) return t;
    if (stage === 'done' && t.repeat && t.repeat !== 'none') {
      const nextDate = nextTaskOccurrence(t);
      return { ...t, stage:'todo', completedDates:[...new Set([...(t.completedDates || []), nextDate])] };
    }
    return { ...t, stage };
  }));
  const toggleTaskFeatured = id => setTasks(prev => prev.map(t => t.id === id ? { ...t, featured:!t.featured } : t));
  const deleteTask = id => { setTasks(prev => prev.filter(t => t.id !== id)); setTaskDraft(null); setConfirmDelete(null); setToast('Task deleted'); };

  const saveCalendar = form => {
    if (!form.name.trim()) { setToast('Please enter a calendar name'); return; }
    const updated = { ...form, name:form.name.trim(), members:form.members || [] };
    setCalendars(prev => updated.id ? prev.map(c => c.id === updated.id ? { ...updated, visible:c.id === 'personal' ? true : updated.visible } : c)
      : [...prev, { ...updated, id:createId(), visible:true, readOnly:false }]);
    setCalendarDraft(null); setToast('Calendar saved');
  };
  const deleteCalendar = id => {
    if (['personal','holidays'].includes(id)) return;
    setCalendars(prev => prev.filter(c => c.id !== id));
    setEvents(prev => prev.filter(e => e.calendarId !== id));
    setCalendarFilter('all'); setCalendarDraft(null); setConfirmDelete(null); setToast('Calendar removed');
  };
  const addMember = (calendarId, address) => {
    const email = cleanEmail(address);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setToast('Enter a valid email address'); return false; }
    setCalendars(prev => prev.map(c => {
      if (c.id !== calendarId || c.readOnly || (c.members || []).includes(email)) return c;
      return { ...c, members:[...(c.members || []), email] };
    }));
    setToast('Person added locally — email invitations require a backend'); return true;
  };
  const removeMember = (calendarId, address) => setCalendars(prev => prev.map(c => c.id === calendarId ? { ...c, members:(c.members || []).filter(e => e !== address) } : c));
  const addCategory = name => {
    const value = name.trim(); if (!value) return '';
    setCategories(prev => prev.some(x => x.toLowerCase() === value.toLowerCase()) ? prev : [...prev, value]);
    return value;
  };
  const todayEvents = getOccurrences(filteredEvents, TODAY);
  const dueTasks = tasks.filter(t => t.stage !== 'done' || t.repeat && t.repeat !== 'none')
    .map(t => ({...t, nextDate:nextTaskOccurrence(t)}))
    .sort((a,b) => a.nextDate.localeCompare(b.nextDate));
  const spotlightTasks = dueTasks.filter(t => t.featured || t.priority === 'High').slice(0,4);
  const overdue = dueTasks.filter(t => parseDate(t.nextDate) < new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate())).length;

  return { calendars, events, tasks, categories, profile, setProfile, page, selectedDate, setSelectedDate, view, setView,
    search, setSearch, calendarFilter, setCalendarFilter, typeFilter, setTypeFilter, categoryFilter, setCategoryFilter,
    showFilters, setShowFilters, eventDraft, eventEditor, taskDraft, setTaskDraft, calendarDraft, setCalendarDraft,
    confirmDelete, setConfirmDelete, sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed, toast, setToast,
    notificationsOpen, setNotificationsOpen, filteredEvents, colorFor, colorForEvent, selectPage, toggleCalendar,
    changeViewPage, openEvent, openCalendarItem, closeEvent, saveEvent, deleteEvent, toggleEventCompleted, saveTask,
    moveTask, toggleTaskFeatured, deleteTask, saveCalendar, deleteCalendar, addMember, removeMember, addCategory,
    todayEvents, dueTasks, spotlightTasks, overdue };
}
