import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  ListTodo,
  PanelsTopLeft,
  UsersRound,
  CalendarClock,
  Bell,
  Video,
  CheckSquare
} from 'lucide-react';
import { dateKey, parseDate } from '../data.js';

export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const TYPES = { arrangement: { label: 'Meeting', icon: Video, tone: 'blue' }, reminder: { label: 'Reminder', icon: Bell, tone: 'orange' }, task: { label: 'Task', icon: CheckSquare, tone: 'purple' } };

export const MENU = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'calendar', label: 'Calendar', icon: CalendarDays },
  { key: 'tasks', label: 'My tasks', icon: ListTodo },
  { key: 'projects', label: 'Projects', icon: PanelsTopLeft },
  { key: 'team', label: 'Team space', icon: UsersRound },
  { key: 'schedule', label: 'Schedule', icon: CalendarClock },
];

export const useStored = (key, initial) => {
  const [value, setValue] = useState(() => {
    try { const found = window.localStorage.getItem(key); return found ? JSON.parse(found) : initial; }
    catch { return initial; }
  });
  useEffect(() => { try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode */ } }, [key, value]);
  return [value, setValue];
};

export const getOccurrences = (events, day) => {
  const key = dateKey(day), time = day.getTime();
  return events.filter((e) => {
    const starts = parseDate(e.date).getTime();
    if (e.date === key) return true;
    if (time < starts) return false;
    const diff = Math.round((time - starts) / 86400000);
    return (e.repeat === 'daily' && diff > 0) || (e.repeat === 'weekly' && diff > 0 && diff % 7 === 0);
  }).sort((a, b) => a.start.localeCompare(b.start));
};

export const initials = (name) => (name || 'Anastasiia').trim().split(' ').slice(0, 2).map((s) => s[0]).join('').toUpperCase();
