# Chronos UI — where things live

Frontend only. React state and demo data are local, no backend or fake network responses.

## Components

- `src/App.jsx` — screen selection and shared handlers.
- `src/hooks/useChronos.js` — local UI state and actions.
- `src/data.js` — models, sample data and date helpers.
- `src/components/TeamSpacePage.jsx` — Team space filters and composition.
- `src/components/workspace/TeamStreamColumn.jsx` — one activity column, drop target.
- `src/components/workspace/TeamStreamCard.jsx` — single task and status control.
- Other sections are split under `src/components/`, with `forms/`, `home/`, `settings/`, and `workspace/`.

## CSS

- `src/styles/foundations.css` — variables, fonts and basic resets.
- `src/styles/design-system.css` — shared buttons, typography, navigation and form appearance.
- Screen-specific CSS files (e.g. `team-space.css`, `team-streams.css`) own **layout**; do not redefine the same grid in global CSS.
- `src/styles/motion.css` — entrance, hover, press and reduced-motion handling.
- `src/styles.css` — imports; do not accumulate `*-polish.css` or `*-fix.css` layers.

## Regression guardrails

1. Do not reintroduce a nested sidebar column in Team space without mounting the matching sidebar component.
2. Avoid fixed narrow widths on columns. Use a single-column fallback when cards cannot fit, not horizontal text squeezing.
3. All action controls must work without hover and have visible keyboard focus.
4. Keep inactive states readable, not faint. Skeleton placeholders should be implemented for **real API loading** when a backend exists, not for a simulated pause.
5. Verify 390, 768, 1024, 1440 px; test adding and editing a task, changing status, moving task between groups, searching and filtering.
6. Run an actual build and browser interaction test when package dependencies are available. Static JSX/CSS validation is not a substitute.
