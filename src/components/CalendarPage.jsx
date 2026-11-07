import React from 'react';
import { Plus, ChevronLeft, ChevronRight, Check, SlidersHorizontal, X } from 'lucide-react';
import { offsetDate, startOfWeek, formatMonth, formatDay, formatShort } from '../data.js';
import { TYPES } from '../lib/shared.jsx';
import { PageHeading } from './Common.jsx';
import { MonthCalendar, TimeCalendar, YearCalendar } from './CalendarViews.jsx';
import { CalendarSidebar } from './CalendarSidebar.jsx';

export function CalendarPage({ selectedDate, setSelectedDate, view, setView, filteredEvents, colorFor, colorForEvent, openEvent, onOpenEvent,
  changeViewPage, typeFilter, setTypeFilter, categoryFilter, setCategoryFilter, categories, showFilters, setShowFilters,
  calendarFilter, calendars, onAddMember, onRemoveMember, onEditCalendar }) {
  const selectedCalendar = calendars.find(c => c.id === calendarFilter);
  const filtersApplied = typeFilter !== 'all' || categoryFilter !== 'all';
  return <div className="calendar-page">
    <PageHeading title="Calendar" right={<button className="btn btn-primary" onClick={() => openEvent(null,selectedDate,'09:00','page')}><Plus size={18}/> New event</button>}/>
    <div className="calendar-workspace"><CalendarSidebar date={selectedDate} events={filteredEvents} colorForEvent={colorForEvent} onDate={setSelectedDate} onEvent={onOpenEvent}
      onCreate={() => openEvent(null,selectedDate)} calendar={selectedCalendar} onAddMember={onAddMember} onRemoveMember={onRemoveMember} onEditCalendar={onEditCalendar}/>
      <section className="calendar-panel">
        <div className="calendar-toolbar">
          <div className="date-controls"><button className="btn btn-today" onClick={() => setSelectedDate(new Date())}>Today</button><button className="icon-button button-bordered" aria-label="Previous period" onClick={() => changeViewPage(-1)}><ChevronLeft size={19}/></button><button className="icon-button button-bordered" aria-label="Next period" onClick={() => changeViewPage(1)}><ChevronRight size={19}/></button><strong>{view === 'year' ? selectedDate.getFullYear() : view === 'month' ? formatMonth(selectedDate) : view === 'week' ? `${formatShort(startOfWeek(selectedDate))} — ${formatShort(offsetDate(startOfWeek(selectedDate),6))}` : formatDay(selectedDate)}</strong></div>
          <div className="calendar-tools"><div className="filter-wrap"><button className={`btn btn-quiet ${showFilters ? 'btn-filter-active' : ''}`} onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters}><SlidersHorizontal size={17}/> Filter {filtersApplied && <span className="filter-dot"/>}</button>
            {showFilters && <div className="filter-dropdown calendar-quick-filter"><div className="filter-title"><strong>Show events</strong><button aria-label="Close filter" onClick={() => setShowFilters(false)}><X size={16}/></button></div><span className="dropdown-label">Type</span><div className="quick-filter-pills">{[{id:'all',name:'All'},...Object.entries(TYPES).map(([id,meta])=>({id,name:meta.label}))].map(t => <button key={t.id} className={typeFilter === t.id?'selected':''} onClick={()=>setTypeFilter(t.id)}>{t.name}{typeFilter === t.id && <Check size={13}/>}</button>)}</div><span className="dropdown-label">Category</span><select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}><option value="all">All categories</option>{categories.map(c=><option key={c}>{c}</option>)}</select><div className="filter-footer"><button onClick={() => {setTypeFilter('all');setCategoryFilter('all');}}>Reset</button><button className="btn btn-primary" onClick={()=>setShowFilters(false)}>Apply</button></div></div>}</div>
            <div className="segmented" role="group" aria-label="Calendar view">{['month','week','day','year'].map(mode => <button key={mode} className={view === mode ? 'segment-active' : ''} onClick={()=>setView(mode)}>{mode[0].toUpperCase()+mode.slice(1)}</button>)}</div></div>
        </div>
        {view === 'month' && <MonthCalendar date={selectedDate} events={filteredEvents} colorFor={colorFor} onDate={d=>{setSelectedDate(d);setView('day');}} onBlank={d=>openEvent(null,d)} onEvent={onOpenEvent}/>}
        {(view === 'week'||view === 'day') && <TimeCalendar date={selectedDate} days={view === 'day' ? 1 : 7} events={filteredEvents} colorFor={colorFor} onBlank={(d,h)=>openEvent(null,d,h)} onEvent={onOpenEvent} onDate={d=>{setSelectedDate(d);setView('day');}}/>}
        {view === 'year' && <YearCalendar date={selectedDate} events={filteredEvents} colorFor={colorFor} onMonth={d=>{setSelectedDate(d);setView('month');}}/>}
      </section>
    </div>
  </div>;
}
