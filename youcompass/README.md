# YouCompass

A college-planning workspace for classes, degree requirements, major combinations, study abroad, opportunities and people. Research is one optional direction.

## Features

- Semester studio: official Columbia bulletin discovery, searchable course descriptions, credit and prerequisite text, drag-and-drop or dropdown course moves, editable terms, personal course-load checks, alternate plan versions and JSON export.
- Degree checklist: school-specific Columbia College, Engineering and General Studies Core, technical/nontechnical and major planning buckets. Add detailed departmental requirement rows from the loaded bulletin, with source links and editable targets. Completed credit requires explicit self-reported confirmation. Tentative allocations remain separate. Engineering nontechnical aggregation does not duplicate overall degree points.
- Pathway lab: compare two interests, automatically read both bulletins, explore introductory course ideas and create an independent plan version. Joint and double-major eligibility and overlap require school/department review.
- Global pass: source-linked featured programs, live official program finder, current-page details, custom programs and possible-term placement. Saving a program grants no course credit or admission.
- Research Hub: multiple research plans, linked faculty, a reading shelf with notes, milestones, professor-specific drafts, shared outreach tracking, calendar links and an isolated research demo. The active research question informs faculty discovery.
- Existing CV/PDF profile, personalized opportunities, named public contacts, professor-specific outreach drafts, application/follow-up tracking and Google Calendar event links.
- A separate six-step demo, dashboard notes, small-goal checkboxes, focus mode and keyboard command palette.

## Accuracy and privacy

Academic summaries are dated in `data/academic.json`; applicable cohort, placement, transfer, program and adviser decisions govern. Course listings do not confirm term availability. Program dates retain their year and are not treated as evidence that applications are open. The tool is an independent planner, not an official degree audit or registration system. Plans and CV text are stored in this browser; source requests send only program identifiers for academic planning. Calendar links open a reviewable Google Calendar event; the user saves it.

## Development

```sh
npm ci
npm run build
npm test
npm run validate
npm run dev -- --port 3000
```

`web/layout.html`, `web/hub.css`, and `web/hub.js` define the campus workspace. `web/legacy-client.js` preserves opportunity, CV, outreach and calendar behavior. `worker/academic.mjs` reads allowlisted official academic sources. `worker/legacy.mjs` preserves the existing backend. `scripts/generate-source.mjs` combines these into the generated Worker entrypoint `worker/index.js`; edit modular sources, not that generated file. The build embeds the local PDF.js assets and emits `dist/server/index.js`. Tests cover planning-credit rules, source parsing, Plan B independence and existing matching/calendar behavior.

Hosting uses the existing Site identity in `.openai/hosting.json` and preserves its audience.
