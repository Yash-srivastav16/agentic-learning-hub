# Agentic Learning Hub

An AI-assisted learning repo built around a simple problem:

learning a technology usually means jumping across too many disconnected places:
- official documentation
- videos
- Udemy/course content
- notes
- blog posts

This repo brings those ideas into one structured, reusable workflow.

Right now it includes:
- a full Docker LMS-style learning app
- a reusable Codex skill for generating similar course platforms for other technologies

The current Docker app includes:
- sequential lessons
- progress tracking
- local notes
- quizzes
- glossary
- milestone celebrations
- dark mode
- completion certificate
- mobile-friendly course navigation

## Why this exists

This started as a way to make Docker learning feel less fragmented.

Instead of keeping notes in one place, course links in another, and memory checks nowhere, the goal was to build a single learning flow that feels closer to a real LMS product.

The more interesting part is that the structure is reusable.

The project also includes a Codex skill, `course-lms-builder`, that can generate similar structured learning hubs for other technologies.

## Current app

The active example app in this repo is:

- [apps/docker-learning-hub](./apps/docker-learning-hub)
- Live demo: [https://yash-srivastav16.github.io/agentic-learning-hub/](https://yash-srivastav16.github.io/agentic-learning-hub/)

## What the site includes

- `30` Docker lessons across `4` phases
- personalized learner tracker stored in local storage
- time-based greeting with saved learner name
- animated progress tracking
- lesson completion tracking
- saved lesson quiz scores
- searchable glossary
- printable completion certificate
- stage-upgrade milestone modals
- dark mode with persistence
- responsive mobile layout with collapsible course map

## Mobile support

The course now works better on phones and tablets:
- collapsible mobile sidebar / course map
- touch-friendly topbar controls
- full-width action buttons on smaller screens
- stacked lesson/dashboard cards on mobile
- mobile-safe progress and tracker layout

Most people will open a shared project from LinkedIn on mobile first, so this repo is designed to make the reading flow usable there too.

## Project structure

```text
agentic-learning-hub/
├── README.md
├── .gitignore
├── apps/
│   └── docker-learning-hub/
│       ├── index.html
│       ├── revision.html
│       ├── glossary.html
│       ├── certificate.html
│       ├── course-summary.html
│       ├── app.js
│       ├── styles.css
│       └── lessons/
│           └── lesson-1.html ... lesson-30.html
└── skills/
    └── course-lms-builder/
```

## How to run locally

This is a static site, so you can open it directly in a browser.

### Option 1: open directly

Open:

```text
apps/docker-learning-hub/index.html
```

from the repo root.

### Option 2: serve locally

If you want a local server:

```bash
cd apps/docker-learning-hub
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deployment

This repo is set up to deploy the Docker course app to **GitHub Pages** from:

```text
apps/docker-learning-hub
```

The workflow file is:

- [deploy-pages.yml](./.github/workflows/deploy-pages.yml)

### Expected production URL

- [https://yash-srivastav16.github.io/agentic-learning-hub/](https://yash-srivastav16.github.io/agentic-learning-hub/)

### GitHub Pages setup

In the GitHub repo settings:
- open `Settings`
- open `Pages`
- under `Build and deployment`, select `GitHub Actions`

After that, every push to `main` will deploy the static site automatically.

## Local storage behavior

The learning tracker uses browser local storage for:
- learner name
- theme
- furthest lesson reached
- completed lessons
- lesson notes
- quiz scores
- milestone state
- certificate unlock state

That means progress is browser-specific unless you build a backend later.

## Reusable Codex skill

The reusable skill lives in:

- [skills/course-lms-builder/SKILL.md](./skills/course-lms-builder/SKILL.md)

It is designed to create similar premium learning platforms for other technologies.

### What the skill does

It helps Codex create:
- multi-page lesson sites
- roadmap pages
- progress tracking
- dark mode
- quizzes
- glossary
- summary page
- completion certificate
- mobile-friendly responsive learning flows

### What problem the skill solves

When learning a new technology, content is usually fragmented across:
- documentation
- videos
- courses
- notes
- blog posts

The skill is meant to solve that structure problem.

Instead of manually assembling a course experience from scattered resources, it gives Codex a reusable blueprint to generate:
- a sequenced lesson roadmap
- educator-style lessons
- LMS-style progress tracking
- revision and recall tools
- a course shell that feels like one product instead of disconnected notes

### What the skill generates by default

For a typical static learning hub, the skill is designed to generate:

```text
apps/<course-slug>/
  index.html
  revision.html
  course-summary.html
  glossary.html
  certificate.html
  styles.css
  app.js
  lessons/lesson-N.html
```

And it expects the product to include:
- sequential phases or stages
- next / previous lesson flow
- persistent learner progress
- local notes
- lesson quizzes
- glossary terms
- milestone celebrations
- mobile course-map navigation

### Responsive and mobile guarantees built into the skill

The skill now explicitly guides Codex to avoid the layout issues we fixed in this project.

It tells future generations to:
- avoid content-sized action grids that overflow on smaller screens
- let grid and flex children shrink safely
- wrap buttons and cards instead of forcing horizontal scroll
- keep media constrained to container width
- verify no lesson, tracker, glossary, or certificate screen spills to the right on mobile

That makes the reusable workflow safer for mobile-first sharing.

### Example uses

```text
Use $course-lms-builder to create a premium multi-page learning course site for Kubernetes.
```

```text
Use $course-lms-builder to build a structured LMS-style course for React with lessons, progress tracking, quizzes, glossary, and certificate.
```

```text
Use $course-lms-builder to extend an existing learning site for Terraform while preserving the current design style.
```

### How to use the skill

#### Option 1: use the project copy as reference

Point Codex to the skill inside this repo:

```text
Use $course-lms-builder at ./skills/course-lms-builder to create a learning platform for [technology].
```

#### Option 2: install it into your Codex skills directory

Copy the folder to:

```text
~/.codex/skills/course-lms-builder
```

Then invoke it directly by name in future sessions.

### Prompt pattern that works well

This is the simplest reusable prompt shape:

```text
Use $course-lms-builder to create a premium LMS-style learning site for [technology].
Include phased lessons, progress tracking, quizzes, glossary, certificate, dark mode, and mobile-friendly navigation.
```

You can also add constraints such as:
- beginner vs advanced audience
- number of phases
- whether to extend an existing site
- whether to preserve an existing visual style

### Example prompt set

```text
Use $course-lms-builder to create a beginner-to-advanced Kubernetes course in 4 phases.
```

```text
Use $course-lms-builder to build a React learning hub with roadmap, quizzes, glossary, summary, and certificate.
```

```text
Use $course-lms-builder to upgrade an existing Terraform course site and preserve the current design system.
```

### How to extend or improve the skill

The skill is intentionally reusable, not locked.

If you want better outputs over time, you can keep pushing improvements into:
- `skills/course-lms-builder/SKILL.md`
- `skills/course-lms-builder/references/course-blueprint.md`
- `skills/course-lms-builder/references/lesson-framework.md`

That means the workflow can evolve with your own preferences for:
- lesson depth
- UI structure
- quiz style
- responsiveness
- tracker behavior
- milestone experience

## Agentic workflow

This project was built in an agentic way:
- identify the learning problem
- define the course structure
- build the course UI and shared LMS logic
- make the flow reusable as a Codex skill
- keep improving the output through iterative refinement

So the outcome is not only a Docker course site, but also a reusable workflow for building similar learning products for other technologies.

## Suggested next improvements

- add final score analytics across all quizzes
- add spaced-revision mode
- add export/import for learner progress
- add backend sync instead of local-only storage
- add richer carousel assets and demo video

## Links

Public links:

- GitHub repo: [https://github.com/Yash-srivastav16/agentic-learning-hub](https://github.com/Yash-srivastav16/agentic-learning-hub)
- Live demo: [https://yash-srivastav16.github.io/agentic-learning-hub/](https://yash-srivastav16.github.io/agentic-learning-hub/)
- LinkedIn carousel/screenshots: `OPTIONAL_LINK`
