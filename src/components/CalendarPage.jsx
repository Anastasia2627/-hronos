import React from 'react';
import { Plus, ChevronLeft, ChevronRight, Check, SlidersHorizontal } from 'lucide-react';
import { offsetDate, startOfWeek, formatMonth, formatDay, formatShort } from '../data.js';
import { TYPES } from '../lib/shared.jsx';
import { PageHeading } from './Common.jsx';
import { MonthCalendar, TimeCalendar, YearCalendar } from './CalendarViews.jsx';
import { CalendarSidebar } from './CalendarSidebar.jsx';

export function CalendarPage({ selectedDate, setSelectedDate, view, setView, filteredEvents, colorFor, openEvent, changeViewPage, typeFilter, setTypeFilter, showFilters, setShowFilters }) {
  return (<div className="calendar-page">
    <PageHeading title="Calendar" right={<button className="btn btn-primary" onClick={() => openEvent(null, selectedDate, '09:00', 'page')}><Plus size={18} /> New event</button>} />
    <div className="calendar-workspace"><CalendarSidebar date={selectedDate} events={filteredEvents} colorFor={colorFor} onDate={setSelectedDate} onEvent={openEvent} onCreate={() => openEvent(null, selectedDate)}/><section className="calendar-panel">
      <div className="calendar-toolbar"><div className="date-controls"><button className="btn btn-today" onClick={() => setSelectedDate(new Date())}>Today</button><button className="icon-button button-bordered" aria-label="Previous period" onClick={() => changeViewPage(-1)}><ChevronLeft size={19} /></button><button className="icon-button button-bordered" aria-label="Next period" onClick={() => changeViewPage(1)}><ChevronRight size={19} /></button><strong>{view === 'year' ? selectedDate.getFullYear() : view === 'month' ? formatMonth(selectedDate) : view === 'week' ? `${formatShort(startOfWeek(selectedDate))} — ${formatShort(offsetDate(startOfWeek(selectedDate), 6))}` : formatDay(selectedDate)}</strong></div>
        <div className="calendar-tools"><div className="filter-wrap"><button className={`btn btn-quiet ${showFilters ? 'btn-filter-active' : ''}`} onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal size={17} /> Filter {typeFilter !== 'all' && <span className="filter-dot" />}</button>{showFilters && <div className="filter-dropdown"><span className="dropdown-label">Event type</span>{[{ id: 'all', name: 'All events' }, ...Object.entries(TYPES).map(([id, val]) => ({ id, name: val.label }))].map((t) => <button key={t.id} className={typeFilter === t.id ? 'selected' : ''} onClick={() => { setTypeFilter(t.id); setShowFilters(false); }}>{t.name}{typeFilter === t.id && <Check size={14} />}</button>)}</div>}</div><div className="segmented" role="group" aria-label="Calendar view">{['month', 'week', 'day', 'year'].map((s) => <button key={s} className={view === s ? 'segment-active' : ''} onClick={() => setView(s)}>{s[0].toUpperCase() + s.slice(1)}</button>)}</div></div>
      </div>
      {view === 'month' && <MonthCalendar date={selectedDate} events={filteredEvents} colorFor={colorFor} onDate={(d) => { setSelectedDate(d); setView('day'); }} onBlank={(d) => openEvent(null, d)} onEvent={openEvent} />}
      {(view === 'week' || view === 'day') && <TimeCalendar date={selectedDate} days={view === 'day' ? 1 : 7} events={filteredEvents} colorFor={colorFor} onBlank={(d, h) => openEvent(null, d, h)} onEvent={openEvent} onDate={(d) => { setSelectedDate(d); setView('day'); }} />}
      {view === 'year' && <YearCalendar date={selectedDate} events={filteredEvents} colorFor={colorFor} onMonth={(d) => { setSelectedDate(d); setView('month'); }} />}
    </section></div>
  </div>);
}
