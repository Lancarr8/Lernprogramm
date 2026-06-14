# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Lernprogramm** is a learning web app for German electronics apprentices (Elektronik-Azubis), built around official curriculum learning fields (Lernfelder). It follows a strict pedagogical template: real-world anchor → why (interactive visual) → formula/memory aid → graded tasks → self-explanation with AI feedback → circuit application → build-it-yourself. v1 covers the complete URI (Ohm's Law) learning flow end-to-end.

**Read first:** `Roadmap.md` (single source of truth for concepts, design, full roadmap v1–v5) and `HANDOFF.md` (working patterns, token reference, known simplifications) before touching any code.  
**Requirements:** `REQUIREMENTS.md` (functional + non-functional requirements, architectural principles).

## Commands

All commands run from `app/`:

```bash
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Preview dist/ locally
```

No test runner, no lint script — not configured yet.

## Architecture

```
Lernprogramm/
├── REQUIREMENTS.md                 # Functional + non-functional requirements
├── Roadmap.md                      # CRITICAL — concept, learning template, roadmap
├── HANDOFF.md                      # CRITICAL — working patterns, token table, simplifications
├── uri_slice_prototype.jsx         # Reference impl for LernseiteURI screen (262 lines)
├── self_explanation_screen_v1.jsx  # Reference impl for SelfExplanation screen (531 lines)
└── app/                            # Web app (Vite + React + Framer Motion)
    └── src/
        ├── main.jsx                # Entry: MotionConfig (reducedMotion="user") + applyTokens()
        ├── App.jsx                 # Flow shell — will become simple step-state router (Stage 2)
        ├── theme/
        │   ├── tokens.js           # ALL colors/fonts/radii/grid — single source of truth
        │   ├── applyTokens.js      # Mirrors tokens as CSS custom properties on :root
        │   └── motion.js           # Duration/easing tokens + Framer variants (rise, pop, fade)
        ├── components/             # Shared primitives: Panel, Button, BracketCorners
        ├── styles/global.css       # Font imports, reset, .grid-bg schematic grid, reduced-motion
        └── screens/                # Five learning screens (Stage 2 — to be built)
```

**Stage 1 (done):** Design system + primitives + shell.  
**Stage 2 (in progress):** Five screens in `src/screens/`, step-state flow in `App.jsx`.

## Non-Functional Requirements (summary)

Full details in `REQUIREMENTS.md`. Key constraints for code decisions:

- **PWA / Offline:** App must work without internet (Berufsschule has unreliable WiFi). Service Worker required — not yet configured (`vite-plugin-pwa`).
- **Storage:** localStorage / IndexedDB — local only. No backend, no accounts in V1.
- **Responsive:** PC at home + Berufsschule displays — responsive layout required.
- **Sync:** Planned for later version. No cross-device sync in V1.
- **AI boundary:** `classifyExplanation()` is the only AI touchpoint — heuristic for offline, LLM swap later.

## Design System Rules

`src/theme/tokens.js` is the **only** source for colors, fonts, and radii. Never hardcode hex values or font names in components or styles — use `var(--c-teal)`, `var(--font-mono)`, etc. New tokens must be added to `tokens.js` and the `cssVars` object before use.

**Palette:** Deep teal-graphite background (`#0E1518`), Measurement-Teal accent (`#4FD2C2`), Ember for results (`#FFA24D`), Warn red (`#E8745C`). No pure black, no pure white.  
**Fonts:** Space Grotesk (body/display), JetBrains Mono (readouts/formulas).  
**Animations:** `transform`/`opacity` only (GPU). `prefers-reduced-motion` is handled globally by `<MotionConfig reducedMotion="user">` in `main.jsx` — no per-component handling needed, but never break the MotionConfig wrapper.

## AI Boundary (Critical)

`classifyExplanation()` in the Self-Explanation screen is the **only** AI touchpoint. It classifies student text against an authorized concept map — it never generates physics or exam content. This separation must not be weakened. No LLM calls are wired up yet; the function stays heuristic until explicitly swapped.

## Scope Boundaries (require explicit GO from Nico)

- No backend, no real LLM calls, no accounts, no drag-and-drop circuit editor, no hub/dashboard
- No cross-device sync in V1
- Do not edit `Roadmap.md`, `HANDOFF.md`, or `REQUIREMENTS.md` autonomously
- No new npm dependencies without GO

## Definition of Done (per screen)

- Follows the learning template in `Roadmap.md` §Die Lern-Schablone
- Uses shared tokens + primitives — no token duplicates, no hardcoded colors/fonts
- Animations on `transform`/`opacity` only, 60fps target
- `npm run dev` runs without console errors

## Working Style

- Respond in **German**, recommendation first, concise.
- Work autonomously within the current `app/NEXT_STEP.md` task scope.
- Ask for GO on architecture changes, new dependencies, or anything outside scope.
- Code complete or not at all — no partial implementations.
