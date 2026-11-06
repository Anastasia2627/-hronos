import React, { useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard, CalendarDays, ListTodo, CalendarClock, Settings2, Search, Bell,
  Plus, ChevronLeft, ChevronRight, ChevronDown, MoreHorizontal, MapPin, Video,
  Users, Clock3, Repeat2, Check, CheckCircle2, X, Trash2, Pencil,
  Menu, SlidersHorizontal, Filter, Sparkles, Timer, FolderOpen, CalendarPlus,
  Mail, ArrowRight, Eye, EyeOff, CalendarRange, Info, Link2,
  Palette, Globe2, ListChecks, Grid2X2, Calendar, CircleCheck,
  PanelLeftClose, PanelLeftOpen, Circle, CalendarCheck, AlertCircle,
  ArrowUpRight, CheckSquare, ExternalLink
} from 'lucide-react';
import {
  TODAY, dateKey, parseDate, offsetDate, startOfWeek, startOfMonth,
  sameDay, formatMonth, formatDay, formatShort, formatTime, createId,
  initialCalendars, initialEvents, initialTasks, STAGES, CAL_COLORS,
  emptyEvent, emptyTask, getWeekNumber, monthCells
} from './data.js';

const WEEKDAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const TYPES = { arrangement:{label:'Meeting',icon:Video,tone:'blue'},reminder:{label:'Reminder',icon:Bell,tone:'orange'},task:{label:'Task',icon:CheckSquare,tone:'purple'} };
const MENU = [
  { key:'overview', label:'Overview', icon:LayoutDashboard },
  { key:'calendar', label:'Calendar', icon:CalendarDays },
  { key:'tasks', label:'My tasks', icon:ListTodo },
  { key:'schedule', label:'Schedule', icon:CalendarClock },
];
const useStored = (key, initial) => {
  const [value, setValue] = useState(() => {
    try { const found = window.localStorage.getItem(key); return found ? JSON.parse(found) : initial; }
    catch { return initial; }
  });
  useEffect(() => { try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode */ } }, [key, value]);
  return [value, setValue];
};
const getOccurrences = (events, day) => {
  const key = dateKey(day), time = day.getTime();
  return events.filter((e) => {
    const starts = parseDate(e.date).getTime();
    if (e.date === key) return true;
    if (time < starts) return false;
    const diff = Math.round((time - starts) / 86400000);
    return (e.repeat === 'daily' && diff > 0) || (e.repeat === 'weekly' && diff > 0 && diff % 7 === 0);
  }).sort((a,b) => a.start.localeCompare(b.start));
};
const initials = (name) => (name||'Anastasiia').trim().split(' ').slice(0,2).map((s)=>s[0]).join('').toUpperCase();

function App() {
  const [calendars, setCalendars] = useStored('chronos-calendars-v1', initialCalendars);
  const [events, setEvents] = useStored('chronos-events-v1', initialEvents);
  const [tasks, setTasks] = useStored('chronos-tasks-v1', initialTasks);
  const [profile, setProfile] = useStored('chronos-profile-v1', { name:'Anastasiia', email:'hello@chronos.demo', role:'Creative workspace' });
  const [page, setPage] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('month');
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
  const activeCalendars = useMemo(()=>new Set(calendars.filter((c)=>c.visible).map((c)=>c.id)),[calendars]);
  const filteredEvents = useMemo(() => events.filter((e) => activeCalendars.has(e.calendarId)
    && (typeFilter === 'all' || e.type === typeFilter)
    && e.title.toLowerCase().includes(search.trim().toLowerCase())), [events, activeCalendars, typeFilter, search]);
  const filteredTasks = useMemo(() => tasks.filter((t) => (taskFilter === 'all' || (taskFilter==='mine' && t.initials==='AK') || (taskFilter==='high' && t.priority==='High')) && `${t.title} ${t.description}`.toLowerCase().includes(search.trim().toLowerCase())),[tasks,search,taskFilter]);
  const colorFor = (id) => calendars.find((c)=>c.id===id)?.color || '#f18b47';
  const selectPage = (p) => { setPage(p); setSidebarOpen(false); setNotificationsOpen(false); window.scrollTo({top:0,behavior:'smooth'}); };
  const toggleCalendar = (id) => setCalendars((list)=>list.map((c)=>c.id===id ? {...c, visible:!c.visible}: c));
  const changeMonth = (delta) => setSelectedDate((d)=>new Date(d.getFullYear(), d.getMonth()+delta, Math.min(d.getDate(),28)));
  const changeViewPage = (delta) => {
    setSelectedDate((d) => view === 'month' ? new Date(d.getFullYear(), d.getMonth()+delta,1) : view === 'year' ? new Date(d.getFullYear()+delta,d.getMonth(),1) : offsetDate(d,delta*(view==='week'?7:1)));
  };
  const openEvent = (event=null, day=new Date(), hour='09:00', mode='modal') => {
    const initial = event ? {...event} : {...emptyEvent(dateKey(day)),start:hour,end:`${String(Math.min(23,Number(hour.slice(0,2))+1)).padStart(2,'0')}:${hour.slice(3)}`};
    setEventDraft(initial); setEventEditor(mode);
    if(mode==='page') selectPage('create-event');
  };
  const closeEvent = () => { setEventDraft(null); if(page==='create-event') selectPage('calendar'); };
  const saveEvent = (form) => {
    if (!form.title.trim()) {setToast('Add a title to your event');return;}
    if(form.end <= form.start){setToast('End time must be after start time');return;}
    if(form.id) setEvents((prev)=>prev.map((e)=>e.id===form.id?{...form,title:form.title.trim()}:e));
    else setEvents((prev)=>[...prev,{...form,id:createId(),title:form.title.trim()}]);
    setToast(form.id?'Event updated':'Event added to your calendar');
    setSelectedDate(parseDate(form.date)); closeEvent();
  };
  const deleteEvent = (id) => {
    setEvents((prev)=>prev.filter((e)=>e.id!==id)); setConfirmDelete(null); closeEvent(); setToast('Event deleted');
  };
  const saveTask = (form) => {
    if(!form.title.trim()){setToast('Add a title to your task');return;}
    if(form.id) setTasks((prev)=>prev.map((t)=>t.id===form.id?{...form,title:form.title.trim()}:t));
    else setTasks((prev)=>[...prev,{...form,id:createId(),title:form.title.trim()}]);
    setTaskDraft(null); setToast(form.id?'Task updated':'Task created');
  };
  const moveTask = (id,stage) => setTasks((prev)=>prev.map((task)=>task.id===id?{...task,stage}:task));
  const deleteTask = (id) => {setTasks((prev)=>prev.filter((t)=>t.id!==id)); setTaskDraft(null);setConfirmDelete(null);setToast('Task deleted');};
  const saveCalendar = (form) => {
    if(!form.name.trim()){setToast('Give your calendar a name');return;}
    if(form.id) setCalendars((list)=>list.map((c)=>c.id===form.id?{...form,name:form.name.trim()}:c));
    else setCalendars((list)=>[...list,{...form,id:createId(),name:form.name.trim(),visible:true,readOnly:false}]);
    setCalendarDraft(null);setToast('Calendar saved');
  };
  const deleteCalendar = (id) => {
    if(['personal','holidays'].includes(id))return;
    setCalendars((list)=>list.filter((c)=>c.id!==id));
    setEvents((list)=>list.filter((e)=>e.calendarId!==id));
    setConfirmDelete(null);setCalendarDraft(null);setToast('Calendar deleted');
  };
  const todayEvents=getOccurrences(filteredEvents,TODAY);
  const upcomingCount=filteredEvents.filter((e)=>parseDate(e.date)>=new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate())).length;
  const overdue=tasks.filter((t)=>t.stage!=='done' && parseDate(t.date)<new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate())).length;

  return (
    <div className={`app-shell ${sidebarCollapsed?'sidebar-small':''}`}>
      {sidebarOpen && <button className="mobile-shade" onClick={()=>setSidebarOpen(false)} aria-label="Close menu"/>}
      <aside className={`sidebar ${sidebarOpen?'sidebar-visible':''}`}>
        <div className="brand-row">
          <button className="brand" onClick={()=>selectPage('overview')} aria-label="Go to overview">
            <span className="brand-symbol"><span/><span/><span/><span/></span>
            <span className="brand-name">chronos<span className="brand-period">.</span></span>
          </button>
          <button className="icon-button collapse-button" aria-label="Toggle sidebar" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>{sidebarCollapsed?<PanelLeftOpen size={18}/>:<PanelLeftClose size={18}/>}</button>
        </div>
        <div className="workspace-pill"><span className="workspace-icon"><Grid2X2 size={15}/></span><span className="sidebar-copy">My workspace</span><ChevronDown className="sidebar-copy" size={15}/></div>
        <nav className="nav-stack" aria-label="Main navigation">
          <span className="sidebar-section-title sidebar-copy">WORKSPACE</span>
          {MENU.map((item)=><button key={item.key} className={`nav-link ${page===item.key?'nav-active':''}`} onClick={()=>selectPage(item.key)} title={item.label}><item.icon size={19} strokeWidth={1.9}/><span className="sidebar-copy">{item.label}</span>{item.key==='tasks'&&tasks.filter(t=>t.stage!=='done').length>0&&<span className="nav-number sidebar-copy">{tasks.filter(t=>t.stage!=='done').length}</span>}</button>)}
        </nav>
        <div className="sidebar-calendars">
          <div className="sidebar-heading"><span className="sidebar-section-title sidebar-copy">MY CALENDARS</span><button className="icon-button tiny" aria-label="Add calendar" title="Add calendar" onClick={()=>setCalendarDraft({name:'',description:'',color:CAL_COLORS[0],visible:true})}><Plus size={17}/></button></div>
          {calendars.map((cal)=><div className="sidebar-calendar" key={cal.id}>
            <button className="visibility-toggle" title={cal.visible?'Hide calendar':'Show calendar'} aria-label={`${cal.visible?'Hide':'Show'} ${cal.name}`} onClick={()=>toggleCalendar(cal.id)} style={{'--calendar-color':cal.color}}><span className={`calendar-check ${cal.visible?'is-on':''}`}>{cal.visible&&<Check size={11} strokeWidth={3}/>}</span></button>
            <button className={`calendar-name sidebar-copy ${cal.visible?'':'calendar-muted'}`} onClick={()=> {setCalendarDraft({...cal});}}>{cal.name}</button>
          </div>)}
          <button className="add-calendar sidebar-copy" onClick={()=>setCalendarDraft({name:'',description:'',color:CAL_COLORS[0],visible:true})}><Plus size={15}/> Add calendar</button>
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-soft-card sidebar-copy"><span className="soft-spark"><Sparkles size={18}/></span><strong>A little more clarity.</strong><p>Make space for what matters today.</p></div>
          <button className={`nav-link ${page==='settings'?'nav-active':''}`} onClick={()=>selectPage('settings')}><Settings2 size={19}/><span className="sidebar-copy">Settings</span></button>
          <div className="sidebar-person"><span className="avatar">{initials(profile.name)}</span><span className="sidebar-person-text sidebar-copy"><strong>{profile.name}</strong><small>Personal account</small></span><button className="icon-button sidebar-copy" title="Profile settings" onClick={()=>selectPage('settings')}><MoreHorizontal size={18}/></button></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left"><button className="icon-button mobile-menu" onClick={()=>setSidebarOpen(true)} aria-label="Open menu"><Menu size={21}/></button><span className="muted-crumb">Workspace</span><ChevronRight size={14} className="crumb-chevron"/><strong>{page==='create-event'?'New event':page==='overview'?'Overview':page==='calendar'?'Calendar':page==='tasks'?'My tasks':page==='schedule'?'Schedule':'Settings'}</strong></div>
          <div className="topbar-right">
            <label className="global-search"><Search size={17}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search anything..." aria-label="Search events and tasks"/><kbd>⌘ K</kbd></label>
            <div className="topbar-notify"><button className="icon-button header-action" title="Notifications" onClick={()=>setNotificationsOpen(!notificationsOpen)}><Bell size={19}/>{overdue>0&&<span className="notification-dot"/>}</button>
              {notificationsOpen && <div className="notification-panel"><div className="notification-heading"><strong>Notifications</strong><span className="status-pill tone-green">All caught up</span></div><p>{overdue?`${overdue} task${overdue===1?' is':'s are'} past the due date.`:'Nothing urgent right now.'}</p><button className="text-button" onClick={()=>{selectPage('tasks');setNotificationsOpen(false);}}>View my tasks <ArrowRight size={15}/></button></div>}</div>
            <button className="topbar-avatar" title="Open profile" onClick={()=>selectPage('settings')}>{initials(profile.name)}</button>
          </div>
        </header>

        <div className="page-body">
          {page==='overview' && <Overview date={TODAY} name={profile.name} events={todayEvents} tasks={tasks} calendars={calendars} upcomingCount={upcomingCount} colorFor={colorFor} onNewEvent={()=>openEvent(null,TODAY,'09:00','page')} onOpenEvent={(e)=>openEvent(e)} onOpenTask={(t)=>setTaskDraft({...t})} onPage={selectPage} onAddTask={()=>setTaskDraft(emptyTask())} onJumpDate={(d)=>{setSelectedDate(d);selectPage('calendar');}} />}
          {page==='calendar' && <div className="calendar-page">
            <PageHeading eyebrow="YOUR TIME, BEAUTIFULLY ORGANIZED" title="Calendar" subtitle="Every moment, right where it belongs." right={<button className="btn btn-primary" onClick={()=>openEvent(null,selectedDate,'09:00','page')}><Plus size={18}/> New event</button>}/>
            <section className="calendar-panel">
              <div className="calendar-toolbar"><div className="date-controls"><button className="btn btn-today" onClick={()=>setSelectedDate(new Date())}>Today</button><button className="icon-button button-bordered" aria-label="Previous period" onClick={()=>changeViewPage(-1)}><ChevronLeft size={19}/></button><button className="icon-button button-bordered" aria-label="Next period" onClick={()=>changeViewPage(1)}><ChevronRight size={19}/></button><strong>{view==='year'?selectedDate.getFullYear():view==='month'?formatMonth(selectedDate):view==='week'?`${formatShort(startOfWeek(selectedDate))} — ${formatShort(offsetDate(startOfWeek(selectedDate),6))}`:formatDay(selectedDate)}</strong></div>
                <div className="calendar-tools"><div className="filter-wrap"><button className={`btn btn-quiet ${showFilters?'btn-filter-active':''}`} onClick={()=>setShowFilters(!showFilters)}><SlidersHorizontal size={17}/> Filter {typeFilter!=='all'&&<span className="filter-dot"/>}</button>{showFilters&&<div className="filter-dropdown"><span className="dropdown-label">Event type</span>{[{id:'all',name:'All events'},...Object.entries(TYPES).map(([id,val])=>({id,name:val.label}))].map((t)=><button key={t.id} className={typeFilter===t.id?'selected':''} onClick={()=>{setTypeFilter(t.id);setShowFilters(false);}}>{t.name}{typeFilter===t.id&&<Check size={14}/>}</button>)}</div>}</div><div className="segmented" role="group" aria-label="Calendar view">{['month','week','day','year'].map((s)=><button key={s} className={view===s?'segment-active':''} onClick={()=>setView(s)}>{s[0].toUpperCase()+s.slice(1)}</button>)}</div></div>
              </div>
              {view==='month' && <MonthCalendar date={selectedDate} events={filteredEvents} colorFor={colorFor} onDate={(d)=>{setSelectedDate(d);setView('day');}} onBlank={(d)=>openEvent(null,d)} onEvent={openEvent}/>}
              {(view==='week'||view==='day') && <TimeCalendar date={selectedDate} days={view==='day'?1:7} events={filteredEvents} colorFor={colorFor} onBlank={(d,h)=>openEvent(null,d,h)} onEvent={openEvent} onDate={(d)=>{setSelectedDate(d);setView('day');}}/>}
              {view==='year'&&<YearCalendar date={selectedDate} events={filteredEvents} colorFor={colorFor} onMonth={(d)=>{setSelectedDate(d);setView('month');}}/>}
            </section>
            <div className="calendar-footer"><span><span className="mini-circle orange"/> Click an empty date or time to add an event</span><span>All changes are saved on this device</span></div>
          </div>}
          {page==='tasks'&&<div className="tasks-page"><PageHeading eyebrow="STAY ON TOP OF THE DETAILS" title="My tasks" subtitle="Small steps, meaningful progress." right={<button className="btn btn-primary" onClick={()=>setTaskDraft(emptyTask())}><Plus size={18}/> New task</button>}/><div className="task-tools"><span><strong>{tasks.filter((t)=>t.stage!=='done').length}</strong> active tasks <span className="dot-separator">·</span> {tasks.filter((t)=>t.stage==='done').length} completed</span><select className="select-minimal" value={taskFilter} onChange={(e)=>setTaskFilter(e.target.value)} aria-label="Task filter"><option value="all">All tasks</option><option value="mine">Assigned to me</option><option value="high">High priority</option></select></div><TaskBoard tasks={filteredTasks} onOpen={setTaskDraft} onMove={moveTask} onAdd={(stage)=>setTaskDraft({...emptyTask(),stage})}/></div>}
          {page==='schedule'&&<SchedulePage events={filteredEvents} date={selectedDate} onDate={setSelectedDate} colorFor={colorFor} onEvent={openEvent} onNew={()=>openEvent(null,selectedDate,'09:00','page')}/>}
          {page==='settings'&&<SettingsPage profile={profile} onProfile={setProfile} calendars={calendars} onEditCal={setCalendarDraft} onNewCal={()=>setCalendarDraft({name:'',description:'',color:CAL_COLORS[0],visible:true})} onToast={setToast}/>}
          {page==='create-event'&&eventDraft&&<div className="create-page"><button className="back-link" onClick={closeEvent}><ChevronLeft size={17}/> Back to calendar</button><PageHeading eyebrow="MAKE A MOMENT" title={eventDraft.id?'Edit event':'Create an event'} subtitle="Give your plans a place to live."/><div className="create-card"><EventForm key={eventDraft.id||`${eventDraft.date}-${eventDraft.start}`} draft={eventDraft} calendars={calendars} onSave={saveEvent} onCancel={closeEvent} onDelete={eventDraft.id?()=>setConfirmDelete({kind:'event',id:eventDraft.id,label:eventDraft.title}):null} isPage/></div></div>}
        </div>
      </main>

      {eventDraft&&eventEditor==='modal'&&page!=='create-event'&&<Modal onClose={closeEvent} title={eventDraft.id?'Edit event':'Quick event'} subtitle="Keep your day in sync." size="medium"><EventForm key={eventDraft.id||`${eventDraft.date}-${eventDraft.start}`} draft={eventDraft} calendars={calendars} onSave={saveEvent} onCancel={closeEvent} onDelete={eventDraft.id?()=>setConfirmDelete({kind:'event',id:eventDraft.id,label:eventDraft.title}):null}/></Modal>}
      {taskDraft&&<Modal onClose={()=>setTaskDraft(null)} title={taskDraft.id?'Task details':'New task'} subtitle="Break things down. Keep moving." size="medium"><TaskForm key={taskDraft.id||'new-task'} draft={taskDraft} onSave={saveTask} onCancel={()=>setTaskDraft(null)} onDelete={taskDraft.id?()=>setConfirmDelete({kind:'task',id:taskDraft.id,label:taskDraft.title}):null}/></Modal>}
      {calendarDraft&&<Modal onClose={()=>setCalendarDraft(null)} title={calendarDraft.id?'Calendar settings':'New calendar'} subtitle="A little structure makes space for more." size="medium"><CalendarForm key={calendarDraft.id||'new-calendar'} draft={calendarDraft} onSave={saveCalendar} onCancel={()=>setCalendarDraft(null)} onDelete={calendarDraft.id&&!['personal','holidays'].includes(calendarDraft.id)?()=>setConfirmDelete({kind:'calendar',id:calendarDraft.id,label:calendarDraft.name}):null}/></Modal>}
      {confirmDelete&&<Modal title={`Delete ${confirmDelete.kind}?`} subtitle={`“${confirmDelete.label}” will be removed from this device.`} onClose={()=>setConfirmDelete(null)} size="small"><div className="modal-actions"><button className="btn btn-secondary" onClick={()=>setConfirmDelete(null)}>Cancel</button><button className="btn btn-danger" onClick={()=>confirmDelete.kind==='event'?deleteEvent(confirmDelete.id):confirmDelete.kind==='task'?deleteTask(confirmDelete.id):deleteCalendar(confirmDelete.id)}>Delete {confirmDelete.kind}</button></div></Modal>}
      {toast&&<div className="toast" role="status"><CheckCircle2 size={18}/>{toast}<button onClick={()=>setToast('')} aria-label="Dismiss"><X size={15}/></button></div>}
    </div>
  );
}

function PageHeading({eyebrow,title,subtitle,right}) {return <div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div>{right&&<div className="page-actions">{right}</div>}</div>;}
function Modal({title,subtitle,children,onClose,size='medium'}){useEffect(()=>{const handler=(e)=>{if(e.key==='Escape')onClose()};window.addEventListener('keydown',handler);document.body.style.overflow='hidden';return()=>{window.removeEventListener('keydown',handler);document.body.style.overflow='';};},[onClose]);return <div className="modal-backdrop" role="presentation" onMouseDown={(e)=>{if(e.target===e.currentTarget)onClose();}}><section className={`modal-dialog modal-${size}`} role="dialog" aria-modal="true" aria-label={title}><header className="modal-header"><div><h2>{title}</h2><p>{subtitle}</p></div><button className="icon-button close-modal" aria-label="Close" onClick={onClose}><X size={20}/></button></header>{children}</section></div>;}

function Overview({date,name,events,tasks,calendars,upcomingCount,colorFor,onNewEvent,onOpenEvent,onOpenTask,onPage,onAddTask,onJumpDate}) {
  const done=tasks.filter(t=>t.stage==='done').length;
  const coming=tasks.filter(t=>t.stage!=='done').length;
  const firstName=(name||'there').split(' ')[0];
  const todayLabel=date.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
  return <div className="overview-page">
    <div className="overview-greeting"><div><span className="eyebrow">{todayLabel.toUpperCase()}</span><h1>Good {date.getHours()<12?'morning':date.getHours()<17?'afternoon':'evening'}, {firstName}<span className="hello-period">.</span></h1><p>Here's what's happening in your world today.</p></div><button className="btn btn-primary" onClick={onNewEvent}><Plus size={18}/> New event</button></div>
    <div className="stat-grid">
      <div className="stat-card"><span className="stat-icon stat-blue"><CalendarDays size={20}/></span><div><span className="stat-label">Today's events</span><strong>{events.length.toString().padStart(2,'0')}</strong><small>On your schedule</small></div><ArrowUpRight className="stat-arrow" size={17}/></div>
      <div className="stat-card"><span className="stat-icon stat-orange"><ListChecks size={20}/></span><div><span className="stat-label">Active tasks</span><strong>{coming.toString().padStart(2,'0')}</strong><small>Things in motion</small></div><ArrowUpRight className="stat-arrow" size={17}/></div>
      <div className="stat-card"><span className="stat-icon stat-green"><CheckCircle2 size={20}/></span><div><span className="stat-label">Completed</span><strong>{done.toString().padStart(2,'0')}</strong><small>Little wins add up</small></div><ArrowUpRight className="stat-arrow" size={17}/></div>
    </div>
    <div className="overview-middle">
      <section className="surface today-card"><div className="section-header"><div><h2>Today's schedule <Info size={14} className="info-icon"/></h2><p>Your day, at a glance</p></div><button className="icon-button button-bordered" title="Open schedule" onClick={()=>onPage('schedule')}><MoreHorizontal size={20}/></button></div><div className="timeline-list">{events.length?events.map((event,i)=>{const TypeIcon=TYPES[event.type]?.icon||CalendarDays;return <button className="timeline-item" key={`${event.id}-${i}`} onClick={()=>onOpenEvent(event)}><span className="timeline-time">{formatTime(event.start)}</span><span className="timeline-track"><span className="timeline-dot" style={{background:colorFor(event.calendarId)}}/></span><span className="timeline-type" style={{'--accent':colorFor(event.calendarId)}}><TypeIcon size={17}/></span><span className="timeline-description"><strong>{event.title}</strong><small>{event.location||TYPES[event.type]?.label||'Event'}</small></span><span className={`status-pill ${i===0?'tone-green':i===1?'tone-blue':i===2?'tone-yellow':'tone-gray'}`}>{i===0?'Ready':i===1?'In progress':i===2?'Upcoming':'Planned'}</span></button>}) : <div className="empty-schedule"><CalendarCheck size={27}/><strong>Room to breathe</strong><p>There are no events scheduled for today.</p></div>}</div><button className="insight-strip" onClick={()=>onPage('tasks')}><Sparkles size={18}/><span><strong>{coming} things on your list</strong> — keep the momentum going</span><ArrowRight size={16}/></button></section>
      <div className="overview-side"><section className="surface mini-calendar-card"><div className="section-header"><div><h2>Calendar</h2><p>Plan ahead with ease</p></div><button className="icon-button" title="View calendar" onClick={()=>onPage('calendar')}><ArrowUpRight size={18}/></button></div><MiniCalendar date={date} events={events} colorFor={colorFor} onDay={onJumpDate}/></section><section className="surface quick-card"><div className="section-header"><div><h2>Quick access</h2><p>Just a click away</p></div></div><div className="quick-links"><button onClick={()=>onPage('calendar')}><span className="quick-icon quick-blue"><CalendarDays size={19}/></span><strong>Calendar</strong><ArrowRight size={15}/></button><button onClick={()=>onPage('tasks')}><span className="quick-icon quick-violet"><ListTodo size={19}/></span><strong>Task board</strong><ArrowRight size={15}/></button><button onClick={()=>onPage('schedule')}><span className="quick-icon quick-orange"><Clock3 size={19}/></span><strong>Schedule</strong><ArrowRight size={15}/></button></div></section></div>
    </div>
    <section className="overview-tasks"><div className="section-header board-heading"><div><h2>My task board</h2><p>See your progress, one card at a time</p></div><button className="text-button" onClick={()=>onPage('tasks')}>View all tasks <ArrowRight size={16}/></button></div><TaskBoard compact tasks={tasks} onOpen={onOpenTask} onMove={()=>onPage('tasks')} onAdd={onAddTask}/></section>
  </div>;
}
function MiniCalendar({date,events=[],colorFor,onDay}) {const [shown,setShown]=useState(new Date(date.getFullYear(),date.getMonth(),1)); useEffect(()=>setShown(new Date(date.getFullYear(),date.getMonth(),1)),[date]); return <div className="mini-calendar"><div className="mini-month"><strong>{formatMonth(shown)}</strong><span><button aria-label="Previous month" onClick={()=>setShown(d=>new Date(d.getFullYear(),d.getMonth()-1,1))}><ChevronLeft size={16}/></button><button aria-label="Next month" onClick={()=>setShown(d=>new Date(d.getFullYear(),d.getMonth()+1,1))}><ChevronRight size={16}/></button></span></div><div className="mini-grid">{WEEKDAYS.map(d=><span className="mini-weekday" key={d}>{d.slice(0,1)}</span>)}{monthCells(shown).slice(0,42).map((day,i)=>{const entries=getOccurrences(events,day);return <button key={i} className={`mini-day ${day.getMonth()!==shown.getMonth()?'mini-outside':''} ${sameDay(day,TODAY)?'mini-today':''}`} onClick={()=>onDay(day)}><span>{day.getDate()}</span>{entries.length>0&&<i style={{background:colorFor(entries[0].calendarId)}}/>}</button>;})}</div></div>;}

function MonthCalendar({date,events,colorFor,onDate,onBlank,onEvent}) {const cells=monthCells(date); return <div className="month-view"><div className="month-day-head"><span className="week-no-title">W</span>{WEEKDAYS.map(d=><span key={d}>{d}</span>)}</div><div className="month-grid">{Array.from({length:6},(_,week)=>{const row=cells.slice(week*7,week*7+7);return <React.Fragment key={week}><div className="week-number">{getWeekNumber(row[0])}</div>{row.map((day,i)=>{const dayEvents=getOccurrences(events,day);return <div key={i} className={`month-cell ${day.getMonth()!==date.getMonth()?'other-month':''} ${sameDay(day,TODAY)?'current-day':''}`} onClick={()=>onBlank(day)} role="button" tabIndex={0} onKeyDown={(e)=>{if(e.key==='Enter')onBlank(day);}} aria-label={`Create event on ${formatDay(day)}`}><button className={`day-number ${sameDay(day,TODAY)?'today-number':''}`} onClick={(e)=>{e.stopPropagation();onDate(day);}}>{day.getDate()}</button><div className="cell-events">{dayEvents.slice(0,3).map((event,i)=><button key={`${event.id}-${i}`} className="event-chip" style={{'--event-color':colorFor(event.calendarId)}} onClick={(e)=>{e.stopPropagation();onEvent(event)}} title={`${event.title} · ${formatTime(event.start)}`}><span className="event-chip-dot"/>{event.title}</button>)}{dayEvents.length>3&&<button className="more-events" onClick={(e)=>{e.stopPropagation();onDate(day);}}>+{dayEvents.length-3} more</button>}</div></div>;})}</React.Fragment>;})}</div></div>;}

function TimeCalendar({date,days,events,colorFor,onBlank,onEvent,onDate}) {const start=days===1?date:startOfWeek(date);const dayList=Array.from({length:days},(_,i)=>offsetDate(start,i));return <div className={`time-view ${days===1?'single-day':''}`}><div className="time-header"><div className="time-label-head">GMT{(-new Date().getTimezoneOffset()/60)>=0?'+':''}{-new Date().getTimezoneOffset()/60}</div>{dayList.map(d=><button key={dateKey(d)} className={`time-head-day ${sameDay(d,TODAY)?'time-today':''}`} onClick={()=>onDate(d)}><small>{d.toLocaleDateString('en-US',{weekday:'short'})}</small><strong>{d.getDate()}</strong></button>)}</div><div className="time-scroll"><div className="time-row-container"><div className="time-numbers">{Array.from({length:12},(_,i)=><div key={i}>{formatTime(`${String(i+8).padStart(2,'0')}:00`)}</div>)}</div>{dayList.map((d)=><div className="time-day-column" key={dateKey(d)}>{Array.from({length:12},(_,i)=><button key={i} className="time-slot" title={`Create event at ${i+8}:00 on ${formatShort(d)}`} onClick={()=>onBlank(d,`${String(i+8).padStart(2,'0')}:00`)}/>)}{getOccurrences(events,d).filter(e=>Number(e.start.slice(0,2))>=8&&Number(e.start.slice(0,2))<20).map((event,i)=>{const h=Number(event.start.slice(0,2));const min=Number(event.start.slice(3));const [eh,em]=event.end.split(':').map(Number);const length=Math.max(.65,(eh*60+em-h*60-min)/60);return <button key={`${event.id}-${i}`} className="timed-event" style={{top:`${((h-8)*64)+(min/60)*64+3}px`,height:`${Math.max(40,length*64-5)}px`,'--event-color':colorFor(event.calendarId)}} onClick={()=>onEvent(event)} title={event.title}><strong>{event.title}</strong><small>{formatTime(event.start)} – {formatTime(event.end)}</small></button>})}</div>)}</div></div></div>;}

function YearCalendar({date,events,colorFor,onMonth}){return <div className="year-grid">{Array.from({length:12},(_,month)=>{const d=new Date(date.getFullYear(),month,1);const days=monthCells(d).slice(0,35);return <button className="year-month" key={month} onClick={()=>onMonth(d)}><h3>{d.toLocaleDateString('en-US',{month:'long'})}</h3><div className="year-mini-grid">{WEEKDAYS.map(x=><span className="yr-weekday" key={x}>{x[0]}</span>)}{days.map((day,i)=>{const matching=getOccurrences(events,day);return <span className={`yr-date ${day.getMonth()!==month?'yr-out':''} ${sameDay(day,TODAY)?'yr-today':''}`} key={i}>{day.getDate()}{matching.length>0&&<i style={{background:colorFor(matching[0].calendarId)}}/>}</span>})}</div></button>})}</div>;}

function TaskBoard({tasks,onOpen,onMove,onAdd,compact=false}) {const stages=compact?STAGES.filter(x=>x.id!=='review'):STAGES;return <div className={`kanban-board ${compact?'kanban-compact':''}`}>{stages.map((stage)=>{const items=tasks.filter(t=>t.stage===stage.id || (compact && stage.id==='progress' && t.stage==='review'));return <section className={`kanban-column column-${stage.tone}`} key={stage.id} onDragOver={e=>{if(!compact)e.preventDefault();}} onDrop={e=>{if(compact)return;e.preventDefault();const id=e.dataTransfer.getData('text/chronos-task');if(id)onMove(id,stage.id);}}><div className="kanban-heading"><span className={`kanban-title-icon kanban-${stage.tone}`}>{stage.id==='done'?<Check size={16}/>:stage.id==='progress'?<Timer size={16}/>:stage.id==='review'?<Eye size={16}/>:<ListChecks size={16}/>}</span><strong>{stage.name}</strong><span className="count-pill">{items.length}</span><button className="icon-button" title={`Add task to ${stage.name}`} onClick={()=>onAdd(stage.id)}><MoreHorizontal size={18}/></button></div><div className="kanban-items">{items.slice(0,compact?3:undefined).map((task)=>{const done=task.stage==='done';return <button key={task.id} draggable={!compact} onDragStart={(e)=>e.dataTransfer.setData('text/chronos-task',task.id)} className="task-card" style={{'--task-accent':task.color}} onClick={()=>onOpen({...task})}><div className="task-card-top"><span className="task-card-glyph">{done?<CheckCircle2 size={19}/>:task.stage==='review'?<Eye size={19}/>:task.stage==='progress'?<Pencil size={18}/>:<FolderOpen size={18}/>}</span><span className={`task-priority ${task.priority.toLowerCase()}`}>{task.priority}</span></div><strong>{task.title}</strong><p>{task.description}</p><div className="task-bottom"><span className="task-initials">{task.initials}</span><span className="task-due"><CalendarDays size={13}/>{formatShort(parseDate(task.date))}</span>{done&&<CheckCircle2 size={16} className="task-done-icon"/>}</div></button>})}{!compact&&<button className="add-task-slot" onClick={()=>onAdd(stage.id)}><Plus size={15}/> Add task</button>}{compact&&items.length>3&&<span className="more-task-count">+{items.length-3} more tasks</span>}</div></section>})}</div>;}

function SchedulePage({events,date,onDate,colorFor,onEvent,onNew}){const days=Array.from({length:7},(_,i)=>offsetDate(startOfWeek(date),i));const todays=getOccurrences(events,date);return <div className="schedule-page"><PageHeading eyebrow="A GENTLER WAY TO PLAN" title="Schedule" subtitle="One day at a time. You've got this." right={<button className="btn btn-primary" onClick={onNew}><Plus size={18}/> Add event</button>}/><div className="schedule-layout"><div className="surface schedule-main"><div className="schedule-main-header"><div><span className="eyebrow">DAILY OVERVIEW</span><h2>{formatDay(date)}</h2><p>{todays.length} {todays.length===1?'event':'events'} on your schedule</p></div><div className="schedule-nav"><button className="icon-button button-bordered" onClick={()=>onDate(offsetDate(date,-1))}><ChevronLeft size={19}/></button><button className="btn btn-today" onClick={()=>onDate(new Date())}>Today</button><button className="icon-button button-bordered" onClick={()=>onDate(offsetDate(date,1))}><ChevronRight size={19}/></button></div></div><div className="schedule-days">{days.map(d=><button key={dateKey(d)} className={sameDay(d,date)?'schedule-day-selected':''} onClick={()=>onDate(d)}><span>{d.toLocaleDateString('en-US',{weekday:'short'})}</span><strong>{d.getDate()}</strong>{getOccurrences(events,d).length>0&&<i/>}</button>)}</div>{todays.length>0?<div className="schedule-event-list">{todays.map((e,i)=>{const Icon=TYPES[e.type]?.icon||Calendar;return <button key={`${e.id}-${i}`} className="schedule-event-row" onClick={()=>onEvent(e)}><div className="schedule-event-time"><strong>{formatTime(e.start)}</strong><small>{formatTime(e.end)}</small></div><div className="schedule-event-indicator" style={{background:colorFor(e.calendarId)}}/><span className="schedule-event-icon" style={{'--accent':colorFor(e.calendarId)}}><Icon size={19}/></span><div className="schedule-event-copy"><strong>{e.title}</strong><small>{e.location||TYPES[e.type]?.label}</small></div><span className="schedule-event-arrow"><ArrowUpRight size={18}/></span></button>})}</div>:<div className="empty-schedule large"><CalendarCheck size={32}/><strong>Your day is all yours</strong><p>Choose a date or create something new.</p></div>}</div><div className="schedule-side"><div className="surface"><div className="section-header"><div><h2>At a glance</h2><p>Make your time count</p></div></div><div className="schedule-metric"><span className="quick-icon quick-orange"><CalendarDays size={19}/></span><span><strong>{todays.length} scheduled</strong><small>Events for this day</small></span></div><div className="schedule-metric"><span className="quick-icon quick-blue"><Clock3 size={19}/></span><span><strong>{todays.filter(e=>e.type==='arrangement').length} meetings</strong><small>Time with others</small></span></div><div className="schedule-metric"><span className="quick-icon quick-violet"><Bell size={19}/></span><span><strong>{todays.filter(e=>e.type==='reminder').length} reminders</strong><small>Don't miss a thing</small></span></div></div><div className="soft-quote"><Sparkles size={21}/><strong>Make space for what matters.</strong><p>A clearer schedule makes for a calmer mind.</p></div></div></div></div>;}

function SettingsPage({profile,onProfile,calendars,onEditCal,onNewCal,onToast}){const [form,setForm]=useState(profile);useEffect(()=>setForm(profile),[profile]);return <div className="settings-page"><PageHeading eyebrow="MAKE IT YOURS" title="Settings" subtitle="All the little things, just how you like them."/><div className="settings-surface"><div className="profile-cover"><span className="cover-blob cover-blob-one"/><span className="cover-blob cover-blob-two"/></div><div className="profile-identity"><span className="profile-avatar">{initials(profile.name)}</span><div><h2>{profile.name}</h2><p>{profile.role}</p></div></div><div className="settings-content"><section className="settings-section"><div className="settings-section-heading"><div><h3>Personal information</h3><p>Your details, your workspace.</p></div><button className="btn btn-primary" onClick={()=>{onProfile(form);onToast('Profile changes saved');}}>Save changes</button></div><div className="settings-fields"><label className="field"><span>Display name</span><input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))}/></label><label className="field"><span>Email address <small>Demo only</small></span><input type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))}/></label><label className="field settings-field-wide"><span>Short bio</span><input value={form.role} onChange={e=>setForm(p=>({...p,role:e.target.value}))}/></label></div></section><section className="settings-section"><div className="settings-section-heading"><div><h3>My calendars</h3><p>Give every part of your life its own color.</p></div><button className="btn btn-secondary" onClick={onNewCal}><Plus size={16}/> Add calendar</button></div><div className="settings-calendar-list">{calendars.map(c=><button key={c.id} onClick={()=>onEditCal({...c})}><span className="setting-cal-dot" style={{background:c.color}}/><span><strong>{c.name}</strong><small>{c.description||'No description'}</small></span><span className="status-pill tone-gray">{c.readOnly?'Built-in':'Custom'}</span><ChevronRight size={18}/></button>)}</div></section><div className="local-note"><Info size={18}/><span>This is a frontend-only preview. Your events, calendars and tasks are saved locally in this browser, not to an online account.</span></div></div></div></div>;}

function EventForm({draft,calendars,onSave,onCancel,onDelete,isPage=false}){const [form,setForm]=useState(draft);const change=(field,value)=>setForm(x=>({...x,[field]:value}));const selected=calendars.find(c=>c.id===form.calendarId);return <form className="editor-form" onSubmit={e=>{e.preventDefault();onSave(form)}}><div className="editor-type-row">{Object.entries(TYPES).map(([id,t])=>{const Icon=t.icon;return <button type="button" key={id} className={`type-choice type-${t.tone} ${form.type===id?'type-selected':''}`} onClick={()=>change('type',id)}><Icon size={17}/>{t.label}</button>})}</div><label className="field field-title"><span>Event title <em>*</em></span><input autoFocus={isPage} required placeholder="What are you planning?" value={form.title} onChange={e=>change('title',e.target.value)}/></label><div className="form-row"><label className="field"><span><CalendarDays size={14}/> Date</span><input type="date" required value={form.date} onChange={e=>change('date',e.target.value)}/></label><label className="field"><span><Repeat2 size={14}/> Repeat</span><select value={form.repeat||'none'} onChange={e=>change('repeat',e.target.value)}><option value="none">Doesn't repeat</option><option value="daily">Every day</option><option value="weekly">Every week</option></select></label></div><div className="form-row"><label className="field"><span><Clock3 size={14}/> Starts</span><input required type="time" value={form.start} onChange={e=>change('start',e.target.value)}/></label><label className="field"><span><Clock3 size={14}/> Ends</span><input required type="time" value={form.end} onChange={e=>change('end',e.target.value)}/></label></div><label className="field"><span><Palette size={14}/> Calendar</span><div className="select-with-dot"><i style={{background:selected?.color||'#f18b47'}}/><select value={form.calendarId} onChange={e=>change('calendarId',e.target.value)}>{calendars.filter(c=>!c.readOnly).map(c=><option value={c.id} key={c.id}>{c.name}</option>)}</select></div></label><label className="field"><span><MapPin size={14}/> Location or meeting link</span><input placeholder="Zoom, office or an address" value={form.location||''} onChange={e=>change('location',e.target.value)}/></label><label className="field"><span><Users size={14}/> Participants <small>(demo — email is not sent)</small></span><input type="text" placeholder="name@example.com" value={form.participants||''} onChange={e=>change('participants',e.target.value)}/></label><label className="field"><span>Notes</span><textarea rows={3} placeholder="Add some helpful details..." value={form.description||''} onChange={e=>change('description',e.target.value)}/></label><div className="form-actions">{onDelete&&<button className="btn btn-outline-danger" type="button" onClick={onDelete}><Trash2 size={16}/> Delete</button>}<div className="form-buttons"><button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button><button type="submit" className="btn btn-primary"><Check size={17}/>{draft.id?'Save changes':'Create event'}</button></div></div></form>;}
function TaskForm({draft,onSave,onCancel,onDelete}){const [form,setForm]=useState(draft);const change=(key,val)=>setForm(f=>({...f,[key]:val}));return <form className="editor-form" onSubmit={e=>{e.preventDefault();onSave(form)}}><label className="field field-title"><span>Task title <em>*</em></span><input required placeholder="What needs to get done?" value={form.title} onChange={e=>change('title',e.target.value)}/></label><label className="field"><span>Description</span><textarea rows={3} value={form.description} placeholder="A few details about this task..." onChange={e=>change('description',e.target.value)}/></label><div className="form-row"><label className="field"><span>Status</span><select value={form.stage} onChange={e=>change('stage',e.target.value)}>{STAGES.map(s=><option value={s.id} key={s.id}>{s.name}</option>)}</select></label><label className="field"><span>Priority</span><select value={form.priority} onChange={e=>change('priority',e.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label></div><div className="form-row"><label className="field"><span>Due date</span><input type="date" required value={form.date} onChange={e=>change('date',e.target.value)}/></label><label className="field"><span>Assignee initials</span><input value={form.initials} maxLength={3} onChange={e=>change('initials',e.target.value.toUpperCase())}/></label></div><div className="field"><span>Card color</span><div className="color-choices">{CAL_COLORS.map(color=><button key={color} type="button" className={form.color===color?'color-selected':''} style={{'--choice-color':color}} onClick={()=>change('color',color)}>{form.color===color&&<Check size={15}/>}</button>)}</div></div><div className="form-actions">{onDelete&&<button type="button" onClick={onDelete} className="btn btn-outline-danger"><Trash2 size={16}/> Delete</button>}<div className="form-buttons"><button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button><button type="submit" className="btn btn-primary"><Check size={17}/>{draft.id?'Save changes':'Create task'}</button></div></div></form>;}
function CalendarForm({draft,onSave,onCancel,onDelete}){const [form,setForm]=useState(draft);const change=(key,val)=>setForm(f=>({...f,[key]:val}));return <form className="editor-form" onSubmit={e=>{e.preventDefault();onSave(form)}}><label className="field field-title"><span>Calendar name <em>*</em></span><input value={form.name} disabled={form.readOnly} placeholder="e.g. Family, Side projects" onChange={e=>change('name',e.target.value)} required/></label><label className="field"><span>Description</span><input value={form.description||''} disabled={form.readOnly} placeholder="What's this calendar for?" onChange={e=>change('description',e.target.value)}/></label><div className="field"><span>Color</span><div className="color-choices">{CAL_COLORS.map(color=><button key={color} type="button" disabled={form.readOnly} className={form.color===color?'color-selected':''} style={{'--choice-color':color}} onClick={()=>change('color',color)}>{form.color===color&&<Check size={15}/>}</button>)}</div></div>{form.readOnly&&<p className="local-note inline-note"><Info size={16}/> This built-in holiday calendar is read-only in the demo.</p>}<div className="form-actions">{onDelete&&<button type="button" onClick={onDelete} className="btn btn-outline-danger"><Trash2 size={16}/> Delete</button>}<div className="form-buttons"><button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>{!form.readOnly&&<button type="submit" className="btn btn-primary"><Check size={17}/> Save calendar</button>}</div></div></form>;}

export default App;
