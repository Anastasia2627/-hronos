# Chronos — Frontend concept

A bright, calm time-planning workspace built with **React + Vite**. This is the first **frontend-only** iteration of the Chronos challenge.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

To check the production build:

```bash
npm run build
npm run preview
```

## Included screens

- **Overview:** today’s timeline, summary cards, mini calendar, quick links, task snapshot
- **Calendar:** month, week, day, year; previous/next/today, search and event-type filter, calendar visibility, event preview/editing
- **My tasks:** Kanban board, sortable/filterable table with multi-select, month milestones timeline and personal notes, status/priority badges, add/edit/delete, drag and drop
- **Projects:** ManagePro-inspired project board with four pastel workflow columns, editable project name, local teammate badges, priority search/filter, drag-and-drop and a list view
- **Team space:** Zaval-inspired three-stream workspace with a nested collections sidebar, timeline cards, status shortcuts, sorting, search and drag-and-drop between groups
- **Schedule:** day-by-day event agenda and a week selector
- **Settings:** personal profile and calendars with editable colors

## Functional demo behavior

Events, tasks, calendars and profile settings are persisted in **this browser’s localStorage**. You can create, edit, delete, filter and search items without a server. Calendars can be added, hidden, recolored or deleted (except the default / built-in calendars). Events can be repeated daily or weekly. The event can be created quickly by clicking an empty calendar cell or on a separate event-creation screen using “New event.”

**Not implemented yet:** API, MongoDB/Mongoose, Docker containers, authentication, real account syncing, actual email invitations, push notifications and live public-holiday API. The Ukraine holidays calendar has a **single demonstration holiday only**; it is not a real official holiday feed. Participant email entered in a demo event is only locally recorded and **is not sent**.

## Visual direction

White and very pale blue-gray surfaces; restrained warm orange brand accents; soft pastel status badges; clean cards, fine borders and compact iconography. The uploaded references guide the styling. Neutral animated skeleton placeholders appear during initial navigation and manual view refresh; these are simulated in the local demo, not network operations. Typography uses locally available `Gilroy` when installed, with Google `Manrope` as a close visual fallback.

## Project structure

```text
src/
  App.jsx                 # screen routing and view composition
  hooks/useChronos.js     # frontend state, CRUD actions, filters
  lib/shared.jsx          # calendar helpers + navigation config
  components/
    Sidebar.jsx           # navigation and calendars
    Topbar.jsx            # search, alerts, profile access
    CalendarPage.jsx      # calendar toolbar and screen
    TaskPage.jsx          # tasks screen and view switching
    ProjectBoardPage.jsx  # status-based project board and list
    TeamSpacePage.jsx     # three-lane collaborative-style workspace
    workspace/            # shared project/team cards and headers
    TaskToolbar.jsx       # filters, sorting, view tabs
    TaskList.jsx          # list / table view
    TaskTimeline.jsx      # milestone timeline
    TaskStats.jsx         # progress counters
    TimelineNotes.jsx     # local-only notes
    BulkActions.jsx       # multi-select toolbar
    Skeleton.jsx          # animated loading placeholders
    CreateEventPage.jsx   # full-page event creation
    AppDialogs.jsx        # event, task, calendar dialogs
    CalendarViews.jsx     # month, week, day, year grids
    Overview.jsx          # dashboard and mini calendar
    TaskBoard.jsx         # draggable kanban board
    SchedulePage.jsx      # agenda / schedule
    SettingsPage.jsx      # preferences
    Common.jsx            # reusable modal and page heading
    forms/                 # one form per file
  data.js                 # demo content and date utilities
  styles.css              # stylesheet imports, in cascade order
  styles/                 # small CSS files by screen and role
  main.jsx                # React entry point
```

The UI is deliberately frontend-only. Do not include credentials or API keys in
this repository. Local data stays in the current browser. For a fresh demo,
clear the browser's local site storage.

## Cloning a private repository

This repo is private. To clone it, sign in to GitHub in your Git client. From a
terminal you can use `git clone https://github.com/Anastasia2627/-hronos.git`.
If GitHub says *Not Found* inside a third-party editor, check that the editor
is signed in to the correct account and has repository access; alternatively,
download the repository ZIP using GitHub's **Code → Download ZIP** option.


## Frontend architecture (v0.2)

- `src/App.jsx` — page routing and shared state wiring.
- `src/components/` — one screen or interface section per file.
- `src/components/forms/` — separate event/task/calendar forms.
- `src/hooks/useChronos.js` — frontend-only actions and browser storage.
- `src/styles/` — focused CSS modules by screen/area.
- `src/data.js` — demo data and date helpers.

**Typography:** the UI tries locally installed **Gilroy**, with Google **Manrope** as a close visual fallback. Gilroy is a commercial font and is not included in this repository. To make it available for all visitors, add properly licensed `.woff2` files to `public/fonts/` and update `src/styles/foundations.css` with their relative URLs. Do not commit unlicensed font files.

**Icons:** `lucide-react`; there is no additional icon library. No backend or database is used at this stage.

## Two additional workspace views

**Projects** and **Team space** share the existing locally saved task data with **My tasks**. Create and edit a task in one view and see it in the others. Dragging between Projects columns changes its status; dragging between Team space columns changes its workspace group. The project title and demonstration teammate initials stay in localStorage. Teammates are visual demo entries; no invitations or real collaboration are possible without a backend.
