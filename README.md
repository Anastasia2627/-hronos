# Chronos · frontend prototype

Lightweight calendar-first planner built with React and Vite. This is a **local frontend demo**, not a completed full-stack submission. Data is saved in the browser's localStorage; there is no API or MongoDB yet.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints, usually `http://localhost:5173`.

## Where things are

- **Home** — quick actions, priority tasks, and today's events.
- **Calendar** — arrangement, reminder and task events; month/week/day/year; calendar filters; categories and colors; recurrence including monthly.
- **My day** — focused agenda for the selected day.
- **Sidebar → My calendars** — expand/collapse list, view a specific calendar, change visibility, add and edit calendars. The main personal calendar stays visible.
- **Calendar → People with access** — manage local preview emails for one selected calendar. No email is sent; real invitations will require a server.
- **Sidebar → Tasks** — compact task checklist. Create/edit, mark completed, set repeat rules, assign category and color, or pin to the Home priority stack. Tasks also appear in the calendar.
- **Profile** — personal information; **Settings** — calendar preferences and management.

The standalone Tasks, Projects and Team space views were removed intentionally to avoid repeating the same tasks across multiple interfaces. Their components and CSS files were deleted, not hidden.

## Event types (Chronos PDF)

The three assignment categories are **Arrangement**, **Reminder**, and **Task**.

- Arrangement: date range, start/end time, calendar, repeat rule, optional meeting link and optional separate physical location.
- Reminder: date, reminder time, calendar, repeat rule, category and color.
- Task: due date/time, calendar, repeat rule, category and color; no participant field on creation.

A custom category can be created while editing an event or task. Monthly recurrence is computed for calendar occurrences; existing local demo records are kept compatible.

## Not yet implemented

Real registration/authentication, email invitations, permissioned shared calendars, server scheduling and delivery of notifications, regional public holiday integration, MongoDB and Docker. Email addresses under "People with access" are **local preview data only**. These features cannot be honestly completed without backend work.

## Files

```text
src/
  App.jsx                     # Home / Calendar / My day / Profile / Settings routes
  hooks/useChronos.js         # local data, CRUD, calendar filters and categories
  data.js                     # sample data and dates
  lib/shared.jsx              # event types, recurrence, navigation and storage
  components/
    Sidebar.jsx               # calendar selector and task checklist
    CalendarPage.jsx          # calendar grid and compact filters
    CalendarSidebar.jsx       # mini month, agenda and people with access
    forms/                    # event, task and calendar forms
    home/                     # Home shortcuts and priority stack
    settings/                 # profile and preferences
  styles/                     # only active screens and controls
  styles.css                  # CSS entry point
```

See [AGENTS.md](AGENTS.md), [docs/UX_BOOK_PLAYBOOK.md](docs/UX_BOOK_PLAYBOOK.md), and [docs/REQUIREMENTS_AUDIT.md](docs/REQUIREMENTS_AUDIT.md). The icon set is lucide-react; Gilroy is used when installed locally, with fallbacks otherwise.
