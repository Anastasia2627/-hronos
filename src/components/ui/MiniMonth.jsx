import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { dateKey, parseDate, monthCells, sameDay } from '../../data.js';

const WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function MiniMonth({ value, onSelect, marked = [], className = '' }) {
  const selected = typeof value === 'string' ? parseDate(value) : value;
  const [visible, setVisible] = useState(() => new Date(selected.getFullYear(), selected.getMonth(), 1));
  const navigate = direction => setVisible(d => new Date(d.getFullYear(), d.getMonth() + direction, 1));
  return <div className={`mini-month-picker ${className}`}>
    <header><button type="button" aria-label="Previous month" onClick={() => navigate(-1)}><ChevronLeft size={18}/></button><strong>{visible.toLocaleDateString('en-US', { month:'long',year:'numeric' })}</strong><button type="button" aria-label="Next month" onClick={() => navigate(1)}><ChevronRight size={18}/></button></header>
    <div className="mini-month-grid">{WEEK.map((day,index) => <span className="mini-month-weekday" key={index}>{day}</span>)}{monthCells(visible).map((day, i) => <button key={i} type="button" className={`${day.getMonth() !== visible.getMonth() ? 'outside' : ''} ${sameDay(day, selected) ? 'selected' : ''} ${sameDay(day, new Date()) ? 'today' : ''}`} onClick={() => { setVisible(new Date(day.getFullYear(),day.getMonth(),1)); onSelect(dateKey(day)); }} aria-label={day.toDateString()} aria-pressed={sameDay(day,selected)}>{day.getDate()}{marked.includes(dateKey(day)) && <i/>}</button>)}</div>
  </div>;
}
