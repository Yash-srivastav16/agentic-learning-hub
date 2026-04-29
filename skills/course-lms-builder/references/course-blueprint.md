# Course blueprint

## Default product shape

Use this shape when building a polished LMS-style course site:
- `apps/<course-slug>/index.html` roadmap / landing page
- `apps/<course-slug>/lessons/lesson-N.html` for lesson pages in larger course repos
- `apps/<course-slug>/revision.html`
- `apps/<course-slug>/course-summary.html`
- `apps/<course-slug>/glossary.html`
- `apps/<course-slug>/certificate.html`
- shared `apps/<course-slug>/styles.css`
- shared `apps/<course-slug>/app.js`

## Canonical UI baseline for this repo

When `apps/docker-learning-hub/` exists, use it as the default visual and structural baseline for new courses in the same repo.

Keep these family traits by default:
- the same topbar + sticky sidebar + content dashboard composition
- the same premium dark-surface style with cyan/mint-led accents and restrained glow
- the same roadmap-first navigation and progress-led UX
- the same utility page types: revision, summary, glossary, certificate
- the same bottom lesson navigation and milestone flow
- the same mobile behavior: collapsible course map and stacked lesson sections

Safe places to adapt:
- course name, icon, and subject branding
- lesson titles, phase labels, and glossary terms
- quiz bank, certificate wording, and examples
- support accent colors related to the technology
- curated resource links for docs, videos, and courses

Avoid drifting by default on:
- overall layout skeleton
- card styling system
- progress tracker behavior
- sidebar structure
- certificate/glossary/revision roles
- mobile interaction model

If the canonical app is not present, fall back to this default house style:
- dark premium LMS shell with one strong accent family
- roadmap-first layout with topbar + sidebar + content dashboard
- product-style hero instead of a blog-like article header
- modular cards, progress surfaces, and utility pages that feel like one platform
- mobile course-map toggle and clear next-step navigation

The fallback should still feel like the same product category as the Docker hub even when the exact files are unavailable.

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
- reusable learn-more/reference cards for docs, videos, and course links

Implement these centrally in `styles.css` when possible:
- overflow-safe grid and flex patterns
- `min-width: 0` on shared grid children that contain long content
- wrapped action/button rows instead of content-sized layouts on small screens
- media constrained to the container width
- shared mobile breakpoints that collapse multi-column lesson sections cleanly

## Recommended resource system

Add a structured reference layer so learners can go deeper without losing the product flow.

Overview-level ideas:
- `Reference Hub` section on the landing page
- `Recommended resources` card near the dashboard area
- phase-level resource clusters for beginner, intermediate, and advanced sections

Lesson-level ideas:
- `Learn more` strip after the main explanation
- compact resource cards for:
  - `Official Docs`
  - `YouTube / Video`
  - `Udemy / Structured Course`
  - `Practice / Playground`

Resource quality rules:
- prefer official documentation as the anchor reference
- use YouTube for walkthrough-style reinforcement
- use Udemy or equivalent for structured long-form learning
- keep external references clearly secondary to the main lesson flow
- design resource cards in the same visual language as the rest of the LMS
- if current links are unknown, create visible placeholders that are easy to swap later

## Recommended page behaviors

### Overview
- roadmap and phase structure
- continue / next buttons
- dashboard summary
- feature cards for later pages
- mobile-first hero and course-map access
- reference hub or curated learn-more cluster

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
- curated learn-more resources when useful
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
