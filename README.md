# Chronos — frontend prototype

A light, simple planner built with **React + Vite**. This repository contains a **frontend-only demonstration**, not the final full-stack submission. Data is stored in the browser's `localStorage`; there is no server or database yet.

## Start

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`. To check the build: `npm run build`.

## Find your way around

- **Today** — your schedule and upcoming tasks, without a duplicate full task board.
- **Calendar** — month/week/day/year, create or edit events, search and filters. Click an empty time for quick creation; **New event** opens a full page.
- **Tasks** — Board, List and Timeline, with collapsible filters. Create, edit, delete, move and bulk-update tasks.
- **Projects** — project Kanban view and list view, with the same underlying tasks.
- **More views** — Team space and Daily schedule. Both use the same saved tasks/events as the main screens.
- **Settings** — profile, calendar management and preferences.

## What works / what is missing

Local event/task/calendar CRUD, calendar views, filtering and profile preferences are implemented. The main personal calendar cannot be deleted or hidden. A decorative holiday example is not a complete regional holiday service.

**Not implemented:** real sign-up/sign-in, backend API, MongoDB/Mongoose, Docker, email invitations, real collaboration and permissions, region-aware public holidays or actual reminder notifications. Participant emails in events are not sent. See [docs/REQUIREMENTS_AUDIT.md](docs/REQUIREMENTS_AUDIT.md) for a requirement-by-requirement check against the PDF.

## Structure

```text
src/
  App.jsx                    # Screen composition
  hooks/useChronos.js        # Local app state and CRUD
  data.js                    # Demo data, date helpers
  components/                # Small page components
    forms/                   # Event, task, calendar editors
    settings/                # Settings panels
    workspace/               # Project and team boards
  lib/shared.jsx             # Helpers and navigation
  styles/                    # CSS split by screen and purpose
  styles.css                 # CSS imports
```

The icon set is **lucide-react**. The interface uses **Gilroy** when it is locally installed, otherwise **Manrope**; font files are intentionally not included. Provide a properly licensed Gilroy file if you need identical rendering on every device.

Animated skeleton components are available in `src/components/Skeleton.jsx` for future real API loading. They are **not** artificially shown during local navigation.

## Private GitHub repository

Clone with an authorized GitHub account, or use GitHub **Code → Download ZIP**. A third-party editor reporting `Not Found` often means it lacks permission to access this private repository.

## Home launcher and status labels

Home is the starting workspace: use its search to open a section or an existing task, or choose one of the six app tiles. The overview below shows today’s events and the next open tasks. All actions use the existing frontend state and local storage; no AI assistant, API or server chat is implied.

Status labels use the existing To do / In progress / In review / Done stages and task priorities. In compact cards a coloured icon can expand to its full label on hover or keyboard focus. The collapsed left navigation expands on desktop hover or focus. These are display behaviours and do not add new task stages.


## UI design principles

The interface follows [AGENTS.md](AGENTS.md), [the UX book playbook](docs/UX_BOOK_PLAYBOOK.md), and the [redesign notes](docs/UX_REDESIGN_CHANGELOG.md). The frontend uses local browser data; true authentication, shared invitations and the API remain future work.
