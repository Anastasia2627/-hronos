import React, { useEffect, useState } from 'react';
import { LayoutDashboard, CalendarDays, CalendarClock, Settings2, UserRound, Bell, Video, CheckSquare } from 'lucide-react';
import { dateKey, parseDate } from '../data.js';

export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const TYPES = {
  arrangement: { label: 'Arrangement', icon: Video, tone: 'blue', description: 'Meeting or planned event' },
  reminder: { label: 'Reminder', icon: Bell, tone: 'orange', description: 'Something to remember' },
  task: { label: 'Task', icon: CheckSquare, tone: 'purple', description: 'Something to get done' }
};
export const MENU = [
  { key: 'overview', label: 'Home', icon: LayoutDashboard },
  { key: 'calendar', label: 'Calendar', icon: CalendarDays },
  { key: 'schedule', label: 'My day', icon: CalendarClock }
];
export const useStored = (key, initial) => {
  const [value, setValue] = useState(() => {
    try { const found = window.localStorage.getItem(key); return found ? JSON.parse(found) : initial; }
    catch { return initial; }
  });
  useEffect(() => { try { window.localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key, value]);
  return [value, setValue];
};
const dayValue = (day) => parseDate(dateKey(day)).getTime();
export const occursOnDay = (item, day) => {
  const start = parseDate(item.date).getTime();
  const target = dayValue(day);
  const end = parseDate(item.endDate || item.date).getTime();
  if (target < start) return false;
  const diff = Math.round((target - start) / 86400000);
  if (!item.repeat || item.repeat === 'none') return target <= end;
  if (item.repeat === 'daily') return true;
  if (item.repeat === 'weekdays') return [1, 2, 3, 4, 5].includes(day.getDay());
  if (item.repeat === 'weekly') return diff % 7 === 0;
  if (item.repeat === 'monthly') {
    const originalDay = parseDate(item.date).getDate();
    const lastDayThisMonth = new Date(day.getFullYear(),day.getMonth()+1,0).getDate();
    return day.getDate() === Math.min(originalDay,lastDayThisMonth);
  }
  return target <= end;
};
export const getOccurrences = (events, day) => events.filter(e => occursOnDay(e, day)).sort((a, b) => (a.start || '').localeCompare(b.start || ''));
export const initials = name => (name || 'Anastasiia').trim().split(' ').slice(0, 2).map(s => s[0]).join('').toUpperCase();

export const nextTaskOccurrence = (task, reference = new Date()) => {
  if (!task.repeat || task.repeat === 'none') return task.date;
  const start = parseDate(task.date);
  const from = start > reference ? start : new Date(reference.getFullYear(),reference.getMonth(),reference.getDate());
  for (let i=0;i<400;i++) {
    const candidate = new Date(from.getFullYear(),from.getMonth(),from.getDate()+i);
    const key = dateKey(candidate);
    if (occursOnDay(task,candidate) && !(task.completedDates || []).includes(key)) return key;
  }
  return task.date;
};
