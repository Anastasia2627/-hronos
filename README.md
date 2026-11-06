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
- **My tasks:** draggable Kanban cards, status, priority, due dates, assignee colors, add/edit/delete
- **Schedule:** day-by-day event agenda and a week selector
- **Settings:** personal profile and calendars with editable colors

## Functional demo behavior

Events, tasks, calendars and profile settings are persisted in **this browser’s localStorage**. You can create, edit, delete, filter and search items without a server. Calendars can be added, hidden, recolored or deleted (except the default / built-in calendars). Events can be repeated daily or weekly. The event can be created quickly by clicking an empty calendar cell or on a separate event-creation screen using “New event.”

**Not implemented yet:** API, MongoDB/Mongoose, Docker containers, authentication, real account syncing, actual email invitations, push notifications and live public-holiday API. The Ukraine holidays calendar has a **single demonstration holiday only**; it is not a real official holiday feed. Participant email entered in a demo event is only locally recorded and **is not sent**.

## Visual direction

White and very pale blue-gray surfaces; restrained warm orange brand accents; soft pastel status badges; clean cards, fine borders and compact iconography. The uploaded references guide the styling. Typography uses locally available `Gilroy` when installed, with Google `Manrope` as a close visual fallback.

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
    TaskPage.jsx          # task board screen
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

## Typography and icons

Gilroy is set as the first font choice. This repository does not distribute Gilroy font binaries. The browser uses Manrope if Gilroy is not installed locally. If you have a license to distribute Gilroy on the web, add your licensed .woff2 files under public/fonts and update src/styles/foundations.css with the corresponding @font-face URLs.

The icon set is `lucide-react` (React components). This is compatible with the allowed HTML, CSS, and React stack.

## UI code map

The app stays frontend-only. `src/App.jsx` coordinates screens, `src/components` contains reusable views, `src/components/forms` contains one form per file, `src/hooks/useChronos.js` owns demo logic and local storage, and `src/styles` groups small style sheets by responsibility. No API, MongoDB, or authentication is connected yet.
