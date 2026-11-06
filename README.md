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

White and very pale blue-gray surfaces; restrained warm orange brand accents; soft pastel status badges; clean cards, fine borders and compact iconography. The uploaded references guide the styling. The app uses the `DM Sans` font from Google Fonts (system fonts are a fallback).

## Project structure

```text
src/
  App.jsx        # screens, layout, event/task/calendar editors
  data.js        # seed data, calendar date helpers
  styles.css     # visual system and responsive layout
  main.jsx       # React entry point
```
