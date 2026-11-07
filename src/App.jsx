import React, { useState } from 'react';
import { TODAY, CAL_COLORS, emptyTask } from './data.js';
import { useChronos } from './hooks/useChronos.js';
import { Sidebar } from './components/Sidebar.jsx';
import { Topbar } from './components/Topbar.jsx';
import { Overview } from './components/Overview.jsx';
import { CalendarPage } from './components/CalendarPage.jsx';
import { SchedulePage } from './components/SchedulePage.jsx';
import { SettingsPage } from './components/SettingsPage.jsx';
import { ProfilePage } from './components/ProfilePage.jsx';
import { LandingPage } from './components/LandingPage.jsx';
import { CreateEventPage } from './components/CreateEventPage.jsx';
import { AppDialogs } from './components/AppDialogs.jsx';

export default function App() {
  const [entered,setEntered] = useState(() => { try { return localStorage.getItem('chronos-demo-entered-v1') === 'yes'; } catch { return false; } });
  const openDemo = () => { try {localStorage.setItem('chronos-demo-entered-v1','yes');}catch{} setEntered(true); };
  const openWelcome = () => { setEntered(false); window.scrollTo({top:0,behavior:'instant'}); };
  const state = useChronos();
  const {
    calendars, tasks, categories, profile, setProfile, page, selectedDate, setSelectedDate, view, setView,
    search, setSearch, calendarFilter, setCalendarFilter, typeFilter, setTypeFilter, categoryFilter, setCategoryFilter,
    showFilters, setShowFilters, eventDraft, filteredEvents, sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed,
    notificationsOpen, setNotificationsOpen, overdue, selectPage, toggleCalendar, setCalendarDraft, setTaskDraft,
    openEvent, openCalendarItem, changeViewPage, colorFor, colorForEvent, moveTask, todayEvents, dueTasks, closeEvent, saveEvent,
    setConfirmDelete, setToast, addMember, removeMember, addCategory
  } = state;
  if (!entered) return <LandingPage onEnter={openDemo}/>;
  return <div className={`app-shell ${sidebarCollapsed ? 'sidebar-small' : ''}`}>
    {sidebarOpen && <button className="mobile-shade" onClick={()=>setSidebarOpen(false)} aria-label="Close navigation"/>}
    <Sidebar sidebarOpen={sidebarOpen} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}
      calendars={calendars} calendarFilter={calendarFilter} setCalendarFilter={setCalendarFilter} profile={profile}
      page={page} selectPage={selectPage} toggleCalendar={toggleCalendar} setCalendarDraft={setCalendarDraft}
      dueTasks={dueTasks} moveTask={moveTask} setTaskDraft={setTaskDraft}/>
    <main className="main-area"><Topbar setSidebarOpen={setSidebarOpen} page={page} search={search} setSearch={setSearch}
      notificationsOpen={notificationsOpen} setNotificationsOpen={setNotificationsOpen} overdue={overdue} profile={profile} selectPage={selectPage}/>
      <div className="page-body" key={page}>
        {page === 'overview' && <Overview date={TODAY} name={profile.name} events={todayEvents} tasks={tasks} colorFor={colorFor}
          onNewEvent={()=>openEvent(null,TODAY,'09:00','page')} onOpenEvent={openCalendarItem} onOpenTask={task=>setTaskDraft({...task})}
          onPage={selectPage} onAddTask={()=>setTaskDraft(emptyTask())}/>}
        {page === 'calendar' && <CalendarPage selectedDate={selectedDate} setSelectedDate={setSelectedDate} view={view} setView={setView}
          filteredEvents={filteredEvents} colorFor={colorFor} colorForEvent={colorForEvent} openEvent={openEvent} onOpenEvent={openCalendarItem}
          changeViewPage={changeViewPage} calendarFilter={calendarFilter} calendars={calendars}
          typeFilter={typeFilter} setTypeFilter={setTypeFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
          categories={categories} showFilters={showFilters} setShowFilters={setShowFilters}
          onAddMember={addMember} onRemoveMember={removeMember} onEditCalendar={setCalendarDraft}/>}
        {page === 'schedule' && <SchedulePage events={filteredEvents} date={selectedDate} onDate={setSelectedDate}
          colorFor={colorFor} onEvent={openCalendarItem} onNew={()=>openEvent(null,selectedDate,'09:00','page')}/>}
        {page === 'profile' && <ProfilePage profile={profile} onProfile={setProfile} calendars={calendars} onToast={setToast}/>}
        {page === 'settings' && <SettingsPage profile={profile} onProfile={setProfile} onCalendarView={setView} calendars={calendars}
          onToggleCal={toggleCalendar} onEditCal={setCalendarDraft} onNewCal={()=>setCalendarDraft({name:'',description:'',color:CAL_COLORS[0],visible:true,members:[]})}
          onToast={setToast} onNavigate={selectPage} onWelcome={openWelcome}/>}
        {page === 'create-event' && eventDraft && <CreateEventPage eventDraft={eventDraft} calendars={calendars} categories={categories}
          onAddCategory={addCategory} saveEvent={saveEvent} closeEvent={closeEvent} setConfirmDelete={setConfirmDelete}/>}
      </div>
    </main>
    <AppDialogs state={state}/>
  </div>;
}
