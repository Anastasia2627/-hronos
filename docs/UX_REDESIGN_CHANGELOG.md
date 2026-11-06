# UX redesign — implementation notes

This refactor applies the criteria in AGENTS.md and docs/UX_BOOK_PLAYBOOK.md.

## Changed
- Home: simplified to six clear destinations; creating items is a separate, visible action in search.
- Tasks: opens in List view; optional Board and Timeline views remain. Projects retains the dedicated board.
- Project board: status colors now match Tasks (violet / orange / blue / green), avoiding conflicting meanings.
- Project header: removed fake member-invitation controls; real collaboration awaits the backend.
- Settings: only show profile save actions for tabs that actually edit profile data.
- Calendar: removed redundant instructional footer; creating an event remains obvious through its primary button.
- Statuses: show a readable text label; no important information exists only on hover.
- Accessibility: clearer focus, larger form text, mobile layout protections, reduced-motion support.
- CSS: removed old accumulating polish/refresh overrides; organized structure in component CSS, shared design tokens in foundations.css and a single design-system.css, movement rules in motion.css.

## Validate manually after installing dependencies
- Home section links, search results and quick new-task/new-event actions.
- Create/edit/delete an event (including via the calendar cell and full page).
- Add/change/delete a task, switch views and move a board card.
- Create/hide/show a calendar; main calendar cannot be hidden.
- Profile save and discard behavior.
- 360/768/1440 viewport widths, mobile menu, touch without hover, keyboard-only navigation.
- No API, DB or real invitations yet. Some demo data remains intentionally local.

## Source concepts
- Krug: scanning, self-evident navigation and brevity, real task testing.
- Marcotte: flexible layouts, content-driven breakpoints and no lost actions on mobile.
- Unger / Chandler: goal-based information architecture, scenario flows and iterative prototype testing.
