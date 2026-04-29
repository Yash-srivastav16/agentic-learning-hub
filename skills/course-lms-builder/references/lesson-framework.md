# Lesson framework

## Writing pattern

For each lesson, prefer this order:
1. lesson title and purpose
2. why this lesson matters
3. simple explanation in plain language
4. analogy or intuition
5. diagram or flow explanation
6. real example
7. common mistakes
8. key takeaway
9. checkpoint questions
10. short quiz
11. learn-more references for deeper exploration when useful
12. bottom navigation to the next lesson or summary

## Tone
- teach like an educator, not a documentation generator
- prioritize clarity over density
- explain the "why" behind concepts
- use simple terms first, technical terms second
- avoid making the lesson feel like raw notes unless the user asks for note format
- keep in-page UI text concise enough to stay readable on mobile layouts
- keep cards, action labels, and diagram blocks short enough that they can wrap safely on narrow screens
- keep resource cards consistent with the overall product style rather than looking like pasted link lists

When matching the current Docker learning hub, the lesson page should feel like the same family:
- same sidebar presence and product shell
- same educator/support card rhythm
- same bottom next-step navigation treatment
- same progress-aware feel and dashboard polish
- same dark/light theme system unless the user asks otherwise

## Diagram ideas
Use mermaid or HTML/CSS blocks for:
- flows
- component relationships
- before vs after comparisons
- lifecycle diagrams
- multi-step learning sequences

Responsive UI guardrails:
- avoid content-sized action grids that can push the layout wider than the viewport
- prefer `minmax(0, 1fr)` for lesson grids and allow children to shrink
- ensure diagram rows collapse to one column at mobile breakpoints
- check that long lesson titles, buttons, and quiz options wrap instead of overflowing

## Learn-more resource pattern

When a lesson would benefit from external references, include a compact `Learn more` section with 2 to 4 high-signal cards. Prefer these categories:
- `Official Docs`
- `YouTube / Video`
- `Udemy / Course`
- `Practice / Sandbox` or `Cheat Sheet`

Guidelines:
- official docs should usually be the first reference
- video/course links should help reinforce the same lesson, not distract from it
- keep descriptions short and scannable
- if no verified links are available, include clearly labeled placeholders the user can replace later
- on mobile, these cards should stack cleanly and never force horizontal overflow

## Quiz pattern
Keep quizzes short and useful:
- 2 to 4 multiple-choice questions per lesson
- one correct answer
- short explanation after checking
- persist best score locally

## Common mistake prompts
Use mistakes to reinforce learning:
- what beginners usually confuse
- what breaks in practice
- what wrong mental model to avoid

## Good final question for each lesson
End with a question that checks explanation ability, not only recall.
Example:
- "Can you explain this concept to a teammate in simple words?"
