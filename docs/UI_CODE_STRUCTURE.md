# Chronos UI · file layout

Chronos is a calendar-first frontend demo. Standalone Tasks, Projects and Team space pages were removed as duplicated navigational destinations.

## React

- `src/App.jsx` — active pages and shared props; no separate task/project/team routes.
- `src/hooks/useChronos.js` — event, calendar and task data; filters, recurrence, categories and local members.
- `src/lib/shared.jsx` — exact assignment event types, occurrence calculations and nav.
- `src/components/Sidebar.jsx` — calendar selector/editor and compact task list.
- `src/components/CalendarSidebar.jsx` — month picker, day's events and local calendar members.
- `src/components/CalendarPage.jsx` — calendar views plus lightweight filter popover.
- `src/components/forms/EventForm.jsx` — fields specific to Arrangement / Reminder / Task events.
- `src/components/forms/TaskForm.jsx` — compact task editor, recurrence, category and color.
- `src/components/home/` — Home entry points, priority stack, next tasks.

## CSS ownership

- `styles/foundations.css`, `styles/design-system.css` — tokens and shared hierarchy.
- `styles/sidebar.css`, `styles/responsive.css` — navigation and responsive layout.
- `styles/calendar.css`, `styles/calendar-experience.css`, `styles/event-form.css` — calendar, left panel and event form.
- `styles/forms.css`, `styles/task-editor.css` — shared form controls and task editor.
- `styles/home.css`, `styles/priority-stack.css` — Home content.
- `styles/motion.css` — purposeful feedback, including reduced-motion behavior.

Avoid adding global `*-fix.css` or `*-polish.css` overrides. Edit the owning component and stylesheet instead.

## Regression check

1. Calendar selection and visibility, including permanently visible Personal calendar.
2. Arrangement, Reminder, Task creation and editing from the two required entry points.
3. Recurrence across month/year boundaries (including dates like January 31).
4. Category creation and task color persisted in localStorage.
5. Local-only member management restricted to selected writable calendar.
6. Task checklist completes a one-off task; recurring tasks advance to next occurrence.
7. Home, Calendar, My day, Profile and Settings on mobile, tablet and desktop.
8. Run Vite build and browser interaction tests when dependencies are available. Static syntax checks are not equivalent.
