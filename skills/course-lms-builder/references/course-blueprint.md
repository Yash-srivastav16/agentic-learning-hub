# Course blueprint

## Default product shape

Use this shape when building a polished LMS-style course site:
- `index.html` roadmap / landing page
- one lesson page per lesson
- `revision.html`
- `course-summary.html`
- `glossary.html`
- `certificate.html`
- shared `styles.css`
- shared `app.js`

## Shared LMS features

Implement these centrally in `app.js` when possible:
- learner name prompt stored in local storage
- greeting by time of day
- furthest lesson tracker
- last viewed lesson tracking
- progress percentage
- completed lesson count
- restart / reset flow
- milestone celebration by phase
- dark mode toggle with persistence
- lesson notes by lesson
- quiz score persistence
- certificate unlock logic
- quick links for glossary, summary, revision, and certificate
- collapsible mobile sidebar or course-map toggle
- touch-friendly responsive layout behavior

Implement these centrally in `styles.css` when possible:
- overflow-safe grid and flex patterns
- `min-width: 0` on shared grid children that contain long content
- wrapped action/button rows instead of content-sized layouts on small screens
- media constrained to the container width
- shared mobile breakpoints that collapse multi-column lesson sections cleanly

## Recommended page behaviors

### Overview
- roadmap and phase structure
- continue / next buttons
- dashboard summary
- feature cards for later pages
- mobile-first hero and course-map access

### Lesson pages
- core lesson content
- educator note
- why this matters
- deep dive
- key terms
- practice
- common mistakes
- checkpoint
- short quiz
- private notes area
- clear previous / next lesson navigation at the bottom
- readable stacked layout on mobile devices
- no right-side overflow from cards, action rows, or diagrams at phone widths

### Revision
- compact recap
- question bank
- review guidance

### Summary
- phase-by-phase recap
- course growth map
- next steps

### Glossary
- searchable term list
- links back to lessons

### Certificate
- locked state before completion
- unlocked personalized state after completion
- print-ready view

## Recommended quality checks
- all pages load shared CSS and JS
- sidebar sequence is correct
- mobile sidebar opens, closes, and restores content focus correctly
- no horizontal scrolling caused by shared grids, buttons, or visual blocks
- progress reflects lesson count correctly
- completion state does not break on final lesson
- reset clears tracker state intentionally
- quiz scoring persists and does not save incomplete attempts
