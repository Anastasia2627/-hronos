import React from 'react';
import { TODAY, CAL_COLORS, emptyTask } from './data.js';
import { useChronos } from './hooks/useChronos.js';
import { Sidebar } from './components/Sidebar.jsx';
import { Topbar } from './components/Topbar.jsx';
import { Overview } from './components/Overview.jsx';
import { CalendarPage } from './components/CalendarPage.jsx';
import { TaskPage } from './components/TaskPage.jsx';
import { ProjectBoardPage } from './components/ProjectBoardPage.jsx';
import { TeamSpacePage } from './components/TeamSpacePage.jsx';
import { SchedulePage } from './components/SchedulePage.jsx';
import { SettingsPage } from './components/SettingsPage.jsx';
import { CreateEventPage } from './components/CreateEventPage.jsx';
import { AppDialogs } from './components/AppDialogs.jsx';

export default function App() {
  const state = useChronos();
  const { calendars, tasks, profile, setProfile, page, selectedDate, setSelectedDate, view, setView,
    search, setSearch, typeFilter, setTypeFilter, showFilters, setShowFilters, eventDraft, taskFilter,
    setTaskFilter, filteredEvents, filteredTasks, sidebarOpen, setSidebarOpen, sidebarCollapsed,
    setSidebarCollapsed, notificationsOpen, setNotificationsOpen, overdue, selectPage, toggleCalendar,
    setCalendarDraft, setTaskDraft, openEvent, changeViewPage, colorFor, moveTask, moveTaskLane, moveTasks, todayEvents,
    closeEvent, saveEvent, setConfirmDelete, setToast } = state;

  return (
    <div className={`app-shell ${sidebarCollapsed ? 'sidebar-small' : ''}`}>
      {sidebarOpen && <button className="mobile-shade" onClick={() => setSidebarOpen(false)} aria-label="Close menu" />}
      <Sidebar sidebarOpen={sidebarOpen} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}
        calendars={calendars} profile={profile} page={page} tasks={tasks} selectPage={selectPage}
        toggleCalendar={toggleCalendar} setCalendarDraft={setCalendarDraft} />
      <main className="main-area">
        <Topbar setSidebarOpen={setSidebarOpen} page={page} search={search} setSearch={setSearch}
          notificationsOpen={notificationsOpen} setNotificationsOpen={setNotificationsOpen}
          overdue={overdue} profile={profile} selectPage={selectPage} />
        <div className="page-body">
          {page === 'overview' && <Overview date={TODAY} name={profile.name} events={todayEvents} tasks={tasks} colorFor={colorFor}
            onNewEvent={() => openEvent(null, TODAY, '09:00', 'page')} onOpenEvent={openEvent}
            onOpenTask={task => setTaskDraft({ ...task })} onPage={selectPage}
            onAddTask={() => setTaskDraft(emptyTask())} />}
          {page === 'calendar' && <CalendarPage selectedDate={selectedDate} setSelectedDate={setSelectedDate}
            view={view} setView={setView} filteredEvents={filteredEvents} colorFor={colorFor}
            openEvent={openEvent} changeViewPage={changeViewPage} typeFilter={typeFilter}
            setTypeFilter={setTypeFilter} showFilters={showFilters} setShowFilters={setShowFilters} />}
          {page === 'tasks' && <TaskPage tasks={tasks} filteredTasks={filteredTasks} setTaskDraft={setTaskDraft}
            moveTask={moveTask} moveTasks={moveTasks} setConfirmDelete={setConfirmDelete} />}
          {page === 'projects' && <ProjectBoardPage tasks={tasks} onOpen={setTaskDraft} onMove={moveTask} onMoveMany={moveTasks} onConfirmDelete={setConfirmDelete} />}
          {page === 'team' && <TeamSpacePage tasks={tasks} onOpen={setTaskDraft} onStatus={moveTask} onMoveLane={moveTaskLane} profile={profile}/>}
          {page === 'schedule' && <SchedulePage events={filteredEvents} date={selectedDate}
            onDate={setSelectedDate} colorFor={colorFor} onEvent={openEvent}
            onNew={() => openEvent(null, selectedDate, '09:00', 'page')} />}
          {page === 'settings' && <SettingsPage profile={profile} onProfile={setProfile} onCalendarView={setView} calendars={calendars} onToggleCal={toggleCalendar}
            onEditCal={setCalendarDraft} onNewCal={() => setCalendarDraft({ name: '', description: '', color: CAL_COLORS[0], visible: true })}
            onToast={setToast} />}
          {page === 'create-event' && eventDraft && <CreateEventPage eventDraft={eventDraft}
            calendars={calendars} saveEvent={saveEvent} closeEvent={closeEvent} setConfirmDelete={setConfirmDelete} />}
        </div>
      </main>
      <AppDialogs state={state} />
    </div>
  );
}
