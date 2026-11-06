# Chronos — frontend prototype

A light, simple planner built with **React + Vite**. This repository contains a **frontend-only demonstration**, not the final full-stack submission. Data is stored in the browser's `localStorage`; there is no server or database yet.

## Start

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`. First visit opens the public welcome page; **Explore Chronos** opens the local demo. To check the build: `npm run build`.

## Find your way around

- **Home** — app shortcuts, quick creation and a short overview of upcoming work.
- **Calendar** — month/week/day/year, create or edit events, search and filters. Click an empty time for quick creation; **New event** opens a full page.
- **Tasks** — Board, List and Timeline, with collapsible filters. Create, edit, delete, move and bulk-update tasks.
- **Projects** — project Kanban view and list view, with the same underlying tasks.
- **More views** — Team space and Daily schedule. Both use the same saved tasks/events as the main screens.
- **My profile** — open from the avatar in the top bar or sidebar; update name, email, bio and avatar.
- **Settings** — calendar display preferences and calendar management, separated from personal profile. The Welcome page link lets you preview the public home again.
- **Public welcome** — landing page inspired by a clean editorial hero, with a preview of calendar, events and tasks. No login is implied; it is a frontend-only demonstration.

## What works / what is missing

Local event/task/calendar CRUD, calendar views, a compact month picker, filtering, profile fields and calendar preferences are implemented. The main personal calendar cannot be deleted or hidden. A decorative holiday example is not a complete regional holiday service.

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

Skeleton placeholders are deliberately absent from the local-only UI because there are no network requests. They can be added when real API loading exists.

## Private GitHub repository

Clone with an authorized GitHub account, or use GitHub **Code → Download ZIP**. A third-party editor reporting `Not Found` often means it lacks permission to access this private repository.

## Home launcher and status labels

Home is the starting workspace: use its search to open a section or an existing task, or choose one of the six app tiles. The overview below shows today’s events and the next open tasks. All actions use the existing frontend state and local storage; no AI assistant, API or server chat is implied.

Status labels use the existing To do / In progress / In review / Done stages and task priorities. Compact status labels remain accessible to screen readers. The collapsed left navigation uses labels on hover or keyboard focus without covering the content. These are display behaviours and do not add new task stages.


## UI design principles

The interface follows [AGENTS.md](AGENTS.md), [the UX book playbook](docs/UX_BOOK_PLAYBOOK.md), the [redesign notes](docs/UX_REDESIGN_CHANGELOG.md), and [file structure guide](docs/UI_CODE_STRUCTURE.md). The frontend uses local browser data; true authentication, shared invitations and the API remain future work.

## Interface decisions (November 2026)

The first two new references inspired the event date picker and the compact left calendar/agenda beside the calendar grid. The public landing uses the third reference’s generous typography and floating elements but replaces health/messaging concepts with an interactive calendar preview. Multi-day meeting ranges, sign-up, email sending and AI meeting notes are not part of this frontend-only prototype; the UI does not pretend they work.
