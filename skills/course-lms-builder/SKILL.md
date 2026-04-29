---
name: course-lms-builder
description: Build or upgrade premium multi-page learning-course websites or LMS-style study hubs for any technology or curriculum. Use when Codex needs to create structured lesson pages, progress trackers, dark mode, localStorage-based resume flow, quizzes, glossary, completion certificates, stage milestones, revision pages, or summary pages for educational content.
---

# Course LMS Builder

## Overview

Build a polished, structured learning hub for a technology topic using the same course-product pattern as the Docker learning site: multi-page lessons, educator-style explanations, progress tracking, local storage persistence, dark mode, quizzes, glossary, summary, certificate, and mobile-friendly navigation.

Prefer a static site with shared `styles.css` and `app.js` unless the user explicitly asks for a framework. Preserve an existing site's visual language when extending it. When starting from scratch, keep the experience premium, calm, structured, and clearly sequential.

For larger or reusable course repos, prefer placing each course app inside `apps/<course-slug>/` and keeping lesson pages inside `apps/<course-slug>/lessons/` so the repo root stays focused on shared skills, docs, and app folders.

## Workflow

### 1. Clarify the course shape

Determine:
- the technology or topic
- target audience level
- approximate lesson count or phases
- whether you are creating from scratch or extending an existing course

If details are missing, make a reasonable sequential plan and state the assumption after the work.

### 2. Plan the course architecture

Default to this structure when the user wants a product-like learning site:
- `apps/<course-slug>/index.html` for roadmap and overview
- `apps/<course-slug>/lessons/lesson-N.html` pages for each lesson when the course is large enough that root-level clutter would hurt repo readability
- `apps/<course-slug>/revision.html`
- `apps/<course-slug>/course-summary.html`
- `apps/<course-slug>/glossary.html`
- `apps/<course-slug>/certificate.html`
- shared `apps/<course-slug>/styles.css`
- shared `apps/<course-slug>/app.js`

Read `references/course-blueprint.md` before implementing the page map and LMS features.

### 3. Write the lessons like an educator

For each lesson, keep the content sequential and teaching-focused:
- explain why the lesson matters
- define the main concepts in simple language
- use analogies where helpful
- add diagrams, flow blocks, or comparison cards
- include practical examples
- include mistakes to avoid
- include a short checkpoint or quiz

Read `references/lesson-framework.md` for the lesson writing pattern.

### 4. Build the LMS shell

Use shared logic in `app.js` for cross-site behavior instead of repeating code across pages.

Default LMS features:
- learner name capture via dialog
- time-based greeting
- localStorage progress tracking
- resume from last or furthest lesson
- percentage progress with animated bars
- stage milestones and encouragement
- dark mode with persistence
- collapsible mobile sidebar or course-map toggle
- touch-friendly layout for phones and tablets
- bottom lesson navigation with clear next-step buttons
- lesson notes stored locally
- lesson quizzes stored locally
- glossary and certificate access from shared navigation

### 5. Make progression feel intentional

Keep lessons in strict sequence. Organize them by phases or stages if the course is large. After each phase, include a visible progression moment such as:
- milestone modal
- phase-complete message
- next-level prompt
- roadmap status change

Use clear labels like `Phase 1`, `Phase 2`, `Next lesson`, `Current phase`, and `Course complete`.

### 6. Keep the UI premium and useful

Avoid generic AI-looking layouts. Aim for:
- sticky sidebar roadmap
- collapsible mobile roadmap on smaller screens
- clear hero and section hierarchy
- expressive but controlled colors
- good spacing and alignment
- icons, diagram blocks, and progress visuals
- readable typography
- responsive behavior for desktop and mobile

Responsive safety rules:
- do not rely on `max-content`, `fit-content`, or fixed-width grid columns for primary action rows on smaller screens
- let grid and flex children shrink with `min-width: 0` where needed
- allow buttons, cards, labels, and metric rows to wrap instead of forcing horizontal overflow
- constrain media and visual blocks to `max-width: 100%`
- verify no lesson, tracker, glossary, or certificate section causes right-side overflow on mobile widths

Do not overload the user with clutter. Add features only when they improve learning.

### 7. Validate the learning product

Before finishing:
- verify lesson ordering and page counts
- verify progress math
- verify localStorage behavior assumptions in the code
- verify mobile navigation works well on smaller screens
- verify no shared grid, action row, or card cluster overflows horizontally
- verify dark mode and tracker hooks exist across pages
- verify summary, glossary, and certificate routes are wired
- verify the shared script with a syntax check when possible

## Reuse guidance

When the user asks for a similar course for another technology:
1. reuse the same LMS architecture
2. replace the course content, glossary terms, quizzes, and phase names
3. keep the teaching tone beginner-friendly unless the user asks for a different level
4. preserve any existing premium UI if updating an earlier site

## References

- Read `references/course-blueprint.md` for default product features and architecture.
- Read `references/lesson-framework.md` for lesson-writing and quiz structure.
