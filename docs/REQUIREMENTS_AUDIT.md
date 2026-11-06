# Chronos — requirements audit

Reference: `Chronos.pdf`, *Act: Basic*, printed pages 5–6 (PDF pages 6–7), plus *Document* and *Share* on printed pages 8–10. Checked against the current **frontend-only prototype**. An interface mock does not count as a working server feature.

Legend: ✅ works in browser / locally, ◐ partially implemented or simulated, ❌ not implemented.

| Requirement from the challenge | Status | Current behavior / missing work |
|---|---|---|
| Allowed stack: HTML, CSS, JS (React, Node), MongoDB/Mongoose, Docker | ◐ | React/Vite + HTML/CSS/JS done; no Node API, MongoDB, Mongoose or Docker yet. |
| User registration | ❌ | There is only a local profile form, not an account system. |
| Main calendar created automatically for every new user | ◐ | A personal calendar is seeded on first local browser use, not on registration. It cannot be deleted or hidden. |
| Extra calendars: create, edit name/description/color, hide, delete | ✅ | Saved to localStorage; no cross-device sync. |
| Public/national holidays for the user's region | ◐ | Only one example Ukraine holiday; no region detection or live holiday feed. |
| Meeting, reminder and task event categories | ◐ | All three categories are creatable, but dedicated notification/reminder behavior is not available. |
| Two event creation routes: blank calendar cell (in-place) and button (separate page) | ✅ | Modal from calendar and full-page editor from the New event button. |
| Every event has title, date and assigned calendar | ✅ | Validated by the editor and saved locally. |
| Email invitations to events | ❌ | Participant emails are stored locally, not sent. |
| Shared calendars; multiple users can add events | ❌ | There is no server, authentication or shared state. |
| Per-user colors and permissions on shared calendars | ❌ | Local calendar colors exist, but multi-user access control does not. |
| Month, week and year views with week numbers | ✅ | Month/week/day/year plus ISO week number in weekly view. |
| Event/calendar filters and search | ✅ | Local event type filter, calendar visibility controls and search. |
| Clickable event preview and correct event duration | ✅ | Event details open in editor; timed views use start/end time and show 24 hours. |
| Simple forms, validation, responsive UI, graceful errors | ◐ | Local input checks, layout breakpoints and confirmation dialogs; needs real browser/device and API error testing. |
| Separate Docker containers and working Dockerfiles for frontend and backend | ❌ | No backend or Docker configuration yet. |
| README with description, screenshots, requirements and launch steps | ◐ | Description/dependencies/commands present; add real screenshots after final UI review. |
| Full development log of CBL stages and algorithm | ❌ | Needs a stage-by-stage document with architecture and workflow. |
| LinkedIn retrospective post with campus tag | ❌ | Final Share phase, after the project is complete. |

## Next implementation priorities

1. Backend architecture and database models: users, calendars, membership/permissions, event types, invitations.
2. Real registration/login and automatic main calendar creation.
3. Region-aware holidays and real reminders / email invitations.
4. Server-backed calendar sharing, editable per-user colors and access control.
5. Docker setup for frontend/backend/database and repeatable launch.
6. Integration/security/responsive tests, screenshots, documentation and final Share stage.

## Scope of this UX pass

Keep all current local CRUD features but make the navigation easier: four main destinations, two extra views grouped under **More views**, fewer empty labels, optional form fields in **More options**, and no artificial loading delays. Skeleton components remain in the source to be shown when actual API loading is introduced.
