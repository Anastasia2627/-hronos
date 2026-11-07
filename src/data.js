export const TODAY = new Date();
export const atMidnight = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
export const dateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
export const parseDate = (value) => { const [y, m, d] = value.split('-').map(Number); return new Date(y, m - 1, d); };
export const offsetDate = (date, days) => { const d = new Date(date); d.setDate(d.getDate() + days); return d; };
export const startOfWeek = (date) => { const d = atMidnight(date); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d; };
export const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
export const sameDay = (a, b) => dateKey(a) === dateKey(b);
export const formatMonth = (date) => date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
export const formatDay = (date) => date.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
export const formatShort = (date) => date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
export const formatTime = (s = '09:00') => { const [h,m] = s.split(':').map(Number); return new Date(2000,0,1,h,m).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); };
export const createId = () => (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
export const CAL_COLORS = ['#f18b47','#5fa7f3','#8e75e9','#53ba8a','#e878a2','#e7b653'];

export const initialCalendars = [
  { id: 'personal', name: 'Personal', description: 'Your time, your plans', color: '#f18b47', visible: true, readOnly: false, members: [] },
  { id: 'work', name: 'Work', description: 'Meetings & focus time', color: '#5fa7f3', visible: true, readOnly: false, members: [] },
  { id: 'projects', name: 'Projects', description: 'Creative work & deadlines', color: '#8e75e9', visible: true, readOnly: false, members: [] },
  { id: 'holidays', name: 'Ukraine holidays', description: 'Public holiday calendar · Demo', color: '#53ba8a', visible: true, readOnly: true },
];

const today = atMidnight(TODAY);
const dt = (offset) => dateKey(offsetDate(today, offset));
export const initialEvents = [
  { id:'e1', title:'Daily standup', date:dt(0), start:'09:00', end:'09:30', type:'arrangement', calendarId:'work', location:'Zoom', participants:'team@chronos.demo', description:'Quick sync with the team.', repeat:'none', category:'General' },
  { id:'e2', title:'Project planning', date:dt(0), start:'10:00', end:'11:00', type:'task', calendarId:'projects', location:'', participants:'', description:'Review the roadmap and set priorities.', repeat:'none', category:'General' },
  { id:'e3', title:'Client call', date:dt(0), start:'11:30', end:'12:30', type:'arrangement', calendarId:'work', location:'Zoom', participants:'', description:'Feedback and next steps.', repeat:'none', category:'General' },
  { id:'e4', title:'Lunch break', date:dt(0), start:'13:00', end:'14:00', type:'reminder', calendarId:'personal', location:'', participants:'', description:'Take a little break.', repeat:'none', category:'General' },
  { id:'e5', title:'Design review', date:dt(0), start:'14:00', end:'15:00', type:'arrangement', calendarId:'projects', location:'', participants:'', description:'Look through the new screens.', repeat:'none', category:'General' },
  { id:'e6', title:'Weekly planning', date:dt(1), start:'09:30', end:'10:30', type:'task', calendarId:'personal', location:'', participants:'', description:'Plan the next week.', repeat:'none', category:'General' },
  { id:'e7', title:'Product catch-up', date:dt(3), start:'12:00', end:'13:00', type:'arrangement', calendarId:'work', location:'Zoom', participants:'', description:'Share current progress.', repeat:'none', category:'General' },
  { id:'e8', title:'Send final assets', date:dt(5), start:'16:00', end:'16:30', type:'reminder', calendarId:'projects', location:'', participants:'', description:'Export and deliver files.', repeat:'none', category:'General' },
  { id:'e9', title:'Coffee with friends', date:dt(8), start:'12:00', end:'13:30', type:'arrangement', calendarId:'personal', location:'City center', participants:'', description:'', repeat:'none', category:'General' },
  { id:'e10', title:'Portfolio update', date:dt(-2), start:'11:00', end:'12:00', type:'task', calendarId:'projects', location:'', participants:'', description:'', repeat:'none', category:'General' },
  { id:'e11', title:'Independence Day', date:`${today.getFullYear()}-08-24`, start:'00:00', end:'23:59', type:'reminder', calendarId:'holidays', location:'Ukraine', participants:'', description:'Ukrainian public holiday.', repeat:'none', category:'General' },
];
export const STAGES = [
  { id:'todo', name:'To do', tone:'purple' },
  { id:'progress', name:'In progress', tone:'orange' },
  { id:'review', name:'In review', tone:'blue' },
  { id:'done', name:'Done', tone:'green' },
];
export const initialTasks = [
  { id:'t1', title:'Design landing page', description:'Create a clean and modern landing page.', stage:'todo', date:dt(2), color:'#9478e9', initials:'AK', priority:'Medium', workspaceLane:'team' },
  { id:'t2', title:'Research competitors', description:'Analyze top competitors and note key takeaways.', stage:'todo', date:dt(3), color:'#5a9de5', initials:'SP', workspaceLane:'ideas', priority:'Low' },
  { id:'t3', title:'Write project brief', description:'Define the scope, goals and deliverables.', stage:'todo', date:dt(4), color:'#4fba85', initials:'MJ', workspaceLane:'team', priority:'High' },
  { id:'t4', title:'Build homepage', description:'Develop the homepage according to the design.', stage:'progress', date:dt(1), color:'#ecad48', initials:'AK', workspaceLane:'team', priority:'High' },
  { id:'t5', title:'Implement features', description:'Add the core features and functionality.', stage:'progress', date:dt(5), color:'#ef7e82', initials:'TD', workspaceLane:'other', priority:'Medium' },
  { id:'t6', title:'Review components', description:'Check spacing, states and responsiveness.', stage:'review', date:dt(2), color:'#7298ee', initials:'AK', workspaceLane:'ideas', priority:'Medium' },
  { id:'t7', title:'Project kick-off', description:'Initial meeting with the team and stakeholders.', stage:'done', date:dt(-4), color:'#4cbb84', initials:'AK', workspaceLane:'team', priority:'Low' },
  { id:'t8', title:'Collect requirements', description:'Gather and document project requirements.', stage:'done', date:dt(-2), color:'#4cbb84', initials:'SP', workspaceLane:'other', priority:'Low' },
];
export const emptyEvent = (date = dateKey(today)) => ({ title:'',date,start:'09:00',end:'10:00',type:'arrangement',calendarId:'personal',description:'',location:'',participants:'',repeat:'none', category:'General' });
export const emptyTask = () => ({title:'',description:'',stage:'todo',date:dateKey(today),repeat:'none',category:'General',color:'#9478e9',initials:'AK',priority:'Medium',featured:false});
export const getWeekNumber = (d) => { const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); const dayNum = date.getUTCDay() || 7; date.setUTCDate(date.getUTCDate() + 4 - dayNum); const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1)); return Math.ceil((((date - yearStart)/86400000)+1)/7); };
export function monthCells(date) { const first = startOfWeek(startOfMonth(date)); return Array.from({length:42}, (_,i)=>offsetDate(first,i)); }
