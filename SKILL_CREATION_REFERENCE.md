# DRIP SKILL CREATION REFERENCE
## The Complete Guide to Building a Design Skill

This document is the master reference for creating new skills for the Drip library.
Every skill must follow this specification exactly. No exceptions.

---

## PART 1 — WHAT A SKILL IS

A skill is not a component library. It is not a theme. It is not a stylesheet.

A skill is a **complete design world** — a structured folder of files that teaches
an AI agent how to think, decide, and build within a specific visual language.
The agent reads the skill and internalizes it. Every component it builds from
that point on — whether it's in the skill folder or not — belongs to the same world.

The test of a good skill:
> If you asked the agent to build a component that doesn't exist in the skill folder,
> would the result still feel like it belongs? If yes, the skill is teaching correctly.

---

## PART 2 — THE FOLDER STRUCTURE

Every skill must follow this exact structure. No files may be omitted.
Optional files are marked.

```
skill-name/
│
├── SKILL.md                        ← ENTRY POINT. Agent reads this first.
├── philosophy.md                   ← The soul of the design.
├── skill.json                      ← Machine-readable manifest for the CLI.
│
├── tokens/
│   ├── colors.md                   ← Full palette with usage rules.
│   ├── typography.md               ← Fonts, scale, hierarchy rules.
│   ├── spacing.md                  ← Spacing scale and layout rules.
│   ├── borders.md                  ← Border widths, radius, outline styles.
│   ├── shadows.md                  ← Shadow/glow system.
│   └── motion.md                   ← Animation principles and keyframes.
│
├── integration/
│   ├── tailwind.config.js          ← Extends Tailwind with skill tokens.
│   ├── globals.css                 ← CSS variables, fonts, base resets.
│   └── setup.md                    ← Step-by-step wiring instructions.
│
├── components/
│   ├── core/
│   │   ├── Button.jsx              ← Required
│   │   ├── Input.jsx               ← Required
│   │   └── Badge.jsx               ← Required
│   ├── display/
│   │   ├── Card.jsx                ← Required
│   │   └── Alert.jsx               ← Required
│   ├── navigation/
│   │   └── Navbar.jsx              ← Required
│   └── feedback/
│       └── Spinner.jsx             ← Required
│
├── layouts/
│   └── AppShell.jsx                ← Optional but strongly recommended
│
├── examples/
│   ├── LandingPage.jsx             ← Required — the north star example
│   └── README.md                   ← Required — explains what to notice
│
├── responsive/
│   └── breakpoints.md             ← Required
│
└── meta/
    └── changelog.md               ← Required
```

---

## PART 3 — FILE SPECIFICATIONS

Each file below has a required structure. Follow it exactly.

---

### SKILL.md — The Entry Point

This is the most important file. The agent reads this first and it controls
everything — reading order, permissions, constraints, behavior rules.
A weak SKILL.md means the skill will be applied inconsistently.

**Required sections:**

```md
---
name: skill-name
version: 1.0.0
stack: React + Tailwind CSS + Framer Motion
category: dark | light | colorful | minimal | expressive
mood: [3-5 adjectives describing the feeling]
---

# SKILL NAME IN CAPS

One paragraph describing the design world. What does it reference?
What emotional response does it create? What problem does it solve
for someone who was stuck with generic AI UIs?

---

## HOW TO USE THIS SKILL

### STEP 1 — Read intent before code
Read these files in order before generating anything:
1. philosophy.md
2. tokens/colors.md
3. tokens/typography.md
4. tokens/shadows.md   (or whichever token is most defining for this skill)
5. tokens/borders.md
6. tokens/motion.md
7. tokens/spacing.md

### STEP 2 — Set up the project
Follow integration/setup.md exactly.

### STEP 3 — Study components as reference patterns
[Explain how to use components — as references, not copy-paste]

### STEP 4 — Use examples as your quality benchmark
[Direct agent to examples/LandingPage.jsx]

---

## WHAT YOU CAN OVERRIDE
[List exactly what is flexible — colors for brand, font sizes, content]

## WHAT YOU MUST NEVER OVERRIDE
[List the non-negotiables — the 3-5 rules that define the aesthetic]
[Be specific. "No border radius" not "keep the style consistent"]

---

## AGENT BEHAVIOR RULES
[5-8 specific rules the agent must follow when building new components]
[These catch the common ways agents drift from the aesthetic]

---

## STACK REQUIREMENTS
[Dependencies, versions, font sources]
```

---

### philosophy.md — The Soul

This file exists to give the agent cultural and conceptual context.
An agent that understands WHY a design looks the way it does will make
better decisions than one that only knows the rules.

**Required sections:**

```md
# PHILOSOPHY — SKILL NAME

## The Reference World
[Describe the real-world aesthetic this skill references.
 Specific references: movements, eras, products, designers, interfaces.
 Make it vivid. "Imagine a room in 1983..." not "This is a dark theme."]

## Core Principles
[4-6 named principles, each with:
 - A clear principle name
 - 2-3 paragraphs explaining the logic behind it
 - WHY this decision makes the design work]

## Visual References
[Bullet list of 5-8 specific references:
 films, games, designers, products, websites, historical movements]

## What Breaks This Aesthetic
[Two-column table: WRONG vs RIGHT
 7-10 specific examples of what to avoid and what to do instead
 Be concrete — "no rounded corners" not "keep it consistent"]

## Tone of Copy & Labels
[How should UI text, labels, and system messages sound?
 Give 4-5 examples of WRONG vs RIGHT copy for this aesthetic]
```

---

### skill.json — The Manifest

Machine-readable file the CLI reads. Required for `npx drip add` to work.

```json
{
  "name": "skill-name",
  "version": "1.0.0",
  "description": "One sentence. Punchy. Describes the vibe and what makes it distinct.",
  "category": "dark | light | colorful | minimal | expressive",
  "mood": ["adjective1", "adjective2", "adjective3"],
  "stack": ["react", "tailwind", "framer-motion"],
  "dependencies": {
    "framer-motion": "^10.0.0"
  },
  "devDependencies": {},
  "components": 15,
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}
```

---

### tokens/colors.md — The Palette

**Required sections:**

```md
# TOKENS — COLORS

## Opening rule
[One paragraph establishing the color philosophy.
 What is the dominant color? What is the emotional logic?
 Example: "This palette is built on a single hue at many luminosity levels."
 Example: "Four accent colors rotate like confetti — never one color dominates."]

## Color Tables
[One table per color group. Groups depend on the skill:
 - Backgrounds & Surfaces
 - Text
 - Primary / Accent (the signature color)
 - Secondary accents (if any)
 - Borders
 - Special (glows, overlays, patterns)]

Table format:
| Token | CSS Var | Hex | Tailwind Class | Usage |

## Color Rules
[5-8 numbered rules.
 Each rule is specific and enforceable.
 Example: "Primary text is always #00FF41 — never white, never gray."
 Example: "Yellow #FBBF24 always pairs with dark text — never white text on yellow."]
```

---

### tokens/typography.md — The Type System

**Required sections:**

```md
# TOKENS — TYPOGRAPHY

## Opening rule
[One paragraph on the font philosophy.
 How many fonts? Why these specific fonts?
 What personality do they communicate?]

## Font Table
| Role | Family | Source | Weights |

## Google Fonts Import URL
[The exact URL to paste into globals.css]

## Type Scale
[Table with every size in the system:
 Role | Size | Weight | Font | Line Height | Letter Spacing | Usage]

## Hierarchy Rules
[3-5 specific rules about how to apply the scale.
 Which roles use which font?
 Are there special effects (glow, colored words, squiggle underlines)?]

## Icon Typography (if using Lucide or similar)
[strokeWidth value, size conventions, container rules]

## What Never To Do
[4-6 specific prohibitions]
```

---

### tokens/spacing.md

**Required sections:**

```md
# TOKENS — SPACING

## Base Unit
[What is the base unit? 4px? 8px? Why?]

## Spacing Scale
| Token | Value | Tailwind | Usage |

## Layout Widths
| Token | Value | Usage |

## Section Spacing Rules
[Standard vertical padding for sections.
 Spacing between heading and content.
 Spacing between elements within a component.]

## Special Spacing Rules
[Any rules unique to this aesthetic.
 Example: "Sections must never feel empty — fill spacing with decoration."
 Example: "Density over air — terminals are information-dense."]
```

---

### tokens/borders.md

**Required sections:**

```md
# TOKENS — BORDERS & RADIUS

## The Core Rule
[The single most important border decision for this skill.
 Example: "Always 0px radius." or "Always 2px chunky borders."
 This rule must be stated clearly and early.]

## Border Width Table
| Context | Width | Color |

## Radius Scale
| Token | Value | Tailwind | Used For |

## Special Radius Patterns (if applicable)
[Any unusual radius combinations: speech bubbles, arches, blobs, etc.]

## Rules
[4-6 numbered rules]
```

---

### tokens/shadows.md

**Required sections:**

```md
# TOKENS — SHADOWS

## The Core Rule
[What kind of shadows does this skill use?
 Hard offset? Soft gaussian? Glow? None?
 This is one of the most identity-defining choices in a design system.]

## Shadow Scale
| Token | CSS | Usage |

## Interaction Pattern (hover/active states with shadow)
[Show exactly how shadow changes on hover and active.
 Code example with all three states: rest, hover, active.]

## Special Variants (if applicable)
[Colored shadows, inner glows, text shadows, focus shadows]

## Rules
[5-8 numbered rules]
```

---

### tokens/motion.md

**Required sections:**

```md
# TOKENS — MOTION

## Motion Philosophy
[What does motion communicate in this skill?
 Is it physical? Elastic? Instant? Cinematic?
 What is the "feel test" — how should you know if an animation belongs?]

## Duration Scale
| Token | Value | Usage |

## Easing Curves
| Name | Value | Usage |
[Always include THE primary easing for this skill — the one used everywhere]

## Keyframe Library
[All CSS @keyframes used in the skill.
 For each: the CSS, a comment on usage, and any timing notes.]

## Component-Specific Patterns
[The 2-3 most important interaction patterns in this skill.
 Code examples for each.]

## Framer Motion Variants (if used)
[Standard variants as JS objects — fadeUp, popIn, stagger, hoverLift, etc.]

## Reduced Motion
[Always include the prefers-reduced-motion media query]

## What Must Never Be Animated
[4-6 specific prohibitions]
```

---

### integration/globals.css

**Required sections (in order):**

```css
/* ── FONT IMPORT ──────── */
@import url('...');

/* ── CSS VARIABLES ──────── */
:root {
  /* All design tokens as CSS variables */
  /* Group by: backgrounds, text, accents, borders, special */
}

/* ── BASE RESET ──────── */
/* box-sizing, margin, padding */
/* html: font-size, smoothing */
/* body: background, color, font-family, line-height */

/* ── SELECTION ──────── */
/* ::selection with brand colors */

/* ── FOCUS ──────── */
/* :focus-visible — replace default with skill-specific focus style */

/* ── SCROLLBAR ──────── */
/* Custom scrollbar in skill colors */

/* ── LINKS ──────── */
/* a tag base styles */

/* ── SKILL-SPECIFIC GLOBALS ──────── */
/* Anything unique to this aesthetic:
   CRT scanlines, dot grid patterns, noise textures,
   custom cursor rules, etc. */

/* ── REDUCED MOTION ──────── */
/* Always include */

/* ── UTILITY CLASSES ──────── */
/* 3-6 reusable classes unique to this skill */
```

---

### integration/tailwind.config.js

**Required sections (in theme.extend):**

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        /* All skill colors referencing CSS variables */
        /* Namespace with skill abbreviation: pg-, rt-, etc. */
      },
      fontFamily: {
        /* All skill fonts */
      },
      fontSize: {
        /* Any custom sizes not in Tailwind defaults */
      },
      borderRadius: {
        /* Skill radius scale */
        /* If skill uses 0px everywhere, override defaults to 0 */
      },
      boxShadow: {
        /* All shadow variants */
      },
      animation: {
        /* All named animations */
      },
      keyframes: {
        /* All @keyframes */
      },
      transitionTimingFunction: {
        /* Custom easing curves */
      },
    },
  },
};
```

---

### integration/setup.md

**Required sections:**

```md
# SETUP — SKILL NAME

## 1. Install Dependencies
[npm install commands]

## 2. Wire Up Tailwind Config
[How to merge the skill config into the project]

## 3. Import globals.css
[Code snippets for Next.js App Router, Pages Router, Vite/CRA]

## 4. Verify Setup
[A minimal JSX snippet that proves the skill is wired correctly.
 List exactly what the user should see if everything is working.]

## 5. Folder Location Recommendation
[Where to place the skill folder in the project]
```

---

### components/ — The Reference Components

Every component file must follow this structure:

```jsx
// SKILL NAME — ComponentName.jsx
//
// WHY THIS LOOKS THE WAY IT DOES:
// [3-5 paragraphs explaining the design decisions.
//  Why this shape? Why this color? Why this interaction?
//  Connect every decision back to the philosophy.
//  This is the most important part of the component file —
//  it's what lets the agent extrapolate to new components.]

import { useState } from "react";

// [Token constants at the top if not using CSS vars directly]

// [Variant definitions — object mapping variant names to style objects]

// [Size definitions if applicable]

export function ComponentName({ prop1, prop2, ...}) {
  // [State for hover/focus/active]

  return (
    <element style={{
      // [All styles inline, no Tailwind classes in component files]
      // [Comment on WHY for any non-obvious style decision]
    }}>
      {/* [Comment explaining any non-obvious JSX structure] */}
    </element>
  );
}

// ── USAGE EXAMPLES ────────────────────────────────────────────────────────────
// [4-6 realistic usage examples as comments]
// [Show all variants and common prop combinations]
```

**Required components and what each must demonstrate:**

| Component | Must demonstrate |
|---|---|
| `Button.jsx` | All variants (primary, secondary, ghost, danger). Hover lift or equivalent. The skill's primary interactive pattern. Loading state. |
| `Input.jsx` | Focus state with skill-specific styling. Error state. Label pattern. Hint text. The skill's focus ring approach. |
| `Badge.jsx` | All variants using confetti/semantic colors. Any special badge (status, featured, popular). |
| `Card.jsx` | The skill's surface pattern. Hover state. Featured variant. Any floating element pattern. |
| `Alert.jsx` | All 4 types: info, success, warning, error. Icon treatment. |
| `Navbar.jsx` | Logo mark. Nav links with hover. CTA button. Sticky behavior. |
| `Spinner.jsx` | Loading state that matches the skill's personality. Progress bar variant. |

---

### examples/LandingPage.jsx — The North Star

This is the single most important file in the skill.
The agent uses it to understand how everything works together.

**Required sections (in order):**

```
1. Token constants at top of file
2. Global styles string (font import + keyframes + base reset)
3. Nav component
4. Hero section with:
   - Background decoration (shapes, patterns, textures)
   - Eyebrow label
   - Headline with styled accent word
   - Subheadline
   - 2 CTA buttons
   - Supporting element (command pill, image, demo)
5. Stats/social proof bar
6. Features grid (6 items, 3 columns)
   - Uses confetti color rotation
   - Shows card hover behavior
7. Pricing section
   - 3 plans
   - Featured plan with special treatment
   - Feature checklist
8. CTA section
   - Full background color
   - Minimal content, maximum energy
9. Footer
```

**What the example must prove:**
- Every token is being used (not just referenced)
- Every component behaves correctly on hover
- Background decoration appears in every section
- The confetti color rotation is working
- Responsive consideration is visible
- The skill feels cohesive — one world, not a collection of parts

---

### examples/README.md

**Required sections:**

```md
# EXAMPLES — README

## [Skill Name] Landing Page — THE NORTH STAR
[3-4 paragraphs describing:
 - What sections are included
 - What specific decisions to notice in each section
 - What makes this example demonstrate the skill correctly]

## What Every Page Must Have Before Shipping
[Checklist of 10-12 items.
 These are the minimum requirements for any page built with this skill.
 Format as checkboxes: - [ ] item]
```

---

### responsive/breakpoints.md

**Required sections:**

```md
# RESPONSIVE — BREAKPOINTS

## Breakpoint System
[Standard breakpoint table]

## Mobile Adaptations
[For each major component/section:
 How does it change on mobile?
 What gets hidden? What stacks? What scales?]

## Touch Target Rules
[Minimum sizes for interactive elements on mobile]
```

---

## PART 4 — THE 5 LAWS OF SKILL QUALITY

Every skill must pass these 5 tests before it is published.

### Law 1 — The Extrapolation Test
Ask an agent to build a component that doesn't exist in the skill folder.
The result must feel native to the skill. If it feels generic or off-brand,
the philosophy.md and component annotations are not strong enough.

### Law 2 — The Solo Element Test
Take any single component out of context and look at it alone.
It must be instantly recognizable as belonging to this skill.
If it could belong to any other skill, it's not distinctive enough.

### Law 3 — The Non-Negotiables Test
Identify the 3 most important rules in SKILL.md's "What You Must Never Override."
Try breaking each one deliberately. The result must look obviously wrong.
If breaking a rule produces something that still looks fine, it wasn't a real rule.

### Law 4 — The New Developer Test
Give the skill to someone who has never seen it.
They should be able to read SKILL.md and philosophy.md and correctly predict
what a new component will look like before seeing any code.
If they can't, the philosophy is not clear enough.

### Law 5 — The Drift Test
Build 5 components with the skill, then come back a week later
and build a 6th. Without re-reading the skill, does the 6th feel consistent?
If yes, the skill has successfully taught the design language.
If not, the SKILL.md needs stronger behavior rules.

---

## PART 5 — THE CREATION PROCESS

Follow this exact sequence when creating a new skill.

### Phase 1 — Define the World (before any code)
1. Write the philosophy.md first — the soul before the system
2. Define the 3 non-negotiables (the rules that define the aesthetic)
3. Define the token system — especially the 2 most important tokens
   (usually color and shadow, or color and typography)
4. Write the "What You Must Never Override" section of SKILL.md
5. Create the example page concept — what sections, what content

### Phase 2 — Build the Tokens
1. colors.md → tailwind colors → CSS variables in globals.css
2. typography.md → font import → font families in tailwind
3. shadows.md → box-shadow utilities in tailwind
4. borders.md → border utilities
5. motion.md → keyframes and animation utilities in tailwind
6. spacing.md

### Phase 3 — Build the Example Page
Build LandingPage.jsx BEFORE the individual components.
WHY: The example page reveals what components are actually needed
and how they interact. Building components first often produces
components that don't work together correctly.

### Phase 4 — Extract Components
Extract each component from the example page into its own file.
Add the WHY annotations as you extract — they're freshest now.
Add variants and edge cases that weren't in the example.

### Phase 5 — Write SKILL.md
Write SKILL.md last — after you fully understand the skill.
The reading order, override rules, and behavior rules should
reflect what you actually learned building the skill, not what
you predicted before building it.

### Phase 6 — Quality Check
Run all 5 laws from Part 4.
Fix anything that fails before publishing.

---

## PART 6 — NAMING CONVENTIONS

### Skill names
- Lowercase, hyphenated: `retro-terminal`, `playful-geometric`
- Named after the aesthetic category, not a brand or person
- 2 words maximum — must be memorable and self-describing

### Token naming
- CSS variables: `--color-primary`, `--color-bg`, `--color-border`
- Tailwind classes: namespace with 2-3 letter prefix: `rt-primary`, `pg-accent`
- Descriptive not prescriptive: `--color-primary` not `--color-green`

### Component naming
- PascalCase JSX: `Button.jsx`, `TerminalWindow.jsx`
- Named for what they ARE not what they look like: `Card.jsx` not `StickerCard.jsx`
- Special variants named with prefix: `PopularBadge`, `CardIcon`

### File structure
- Always place in: `project/skills/skill-name/`
- Never place components outside their category folders
- Never create files not in the standard structure without strong reason

---

## PART 7 — WHAT MAKES SKILLS DIFFERENT FROM EACH OTHER

Every skill must have a clear answer to these 4 questions.
If the answers overlap significantly with an existing skill, reconsider.

1. **What is the ONE defining visual element?**
   - Retro Terminal: phosphor green glow on void black
   - Playful Geometric: hard pop shadow on warm cream

2. **What is the ONE defining interaction?**
   - Retro Terminal: typewriter text and blinking cursor
   - Playful Geometric: bounce hover lift

3. **What is the ONE defining typographic choice?**
   - Retro Terminal: single monospace font, pixelated rendering
   - Playful Geometric: Outfit headings + bouncy scale hierarchy

4. **What would immediately break the aesthetic?**
   - Retro Terminal: any border radius, any white text, any soft shadow
   - Playful Geometric: soft shadows, pure white background, linear easing

---

## PART 8 — SKILLS ROADMAP (reference)

Skills planned or in progress for the Drip library:

| Name | Category | Status | One defining element |
|---|---|---|---|
| retro-terminal | dark | ✓ PUBLISHED | Phosphor green glow |
| playful-geometric | light | ✓ PUBLISHED | Hard pop shadows |
| brutalist | aggressive | planned | Heavy borders, raw structure |
| swiss-grid | editorial | planned | International typographic discipline |
| glassmorphism | soft | planned | Frosted blur layers |
| bento | modular | planned | Variable grid density |
| neo-brutalist | bold | planned | Color blocks, loud borders |
| luxury-minimal | refined | planned | Gold accents, extreme whitespace |
| dark-editorial | magazine | planned | Serif + sans contrast |
| soft-pastel | gentle | planned | Muted palette, organic shapes |
