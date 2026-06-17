# NEXT_STEP — Dashboard + Lernfeld: token-nativ + Progress-Reaktivität
Stand: 2026-06-17 · Autorität: Nico/Chat-Claude · CC führt aus.

## Ziel
Dashboard- und Lernfeld-Screen auf das Token-/Primitive-Fundament heben (wie Migration B
bei den Flow-Screens) und den `loadProgress()`-im-Render-Smell durch einen reaktiven
Progress-Context ersetzen. Schließt die zwei letzten offenen P0-Punkte.
**Kein visuelles Redesign** — Layout & Hierarchie bleiben; nur Tokens, Primitive
(Eyebrow/Icon) und Reaktivität.

## Scope
IN:
- Phase A: `data/ProgressContext.jsx` (neu), `main.jsx`, `router.jsx`,
  `screens/flow/FlowController.jsx`, Consumption in `screens/DashboardScreen.jsx`
  + `screens/LernfeldScreen.jsx`.
- Phase B: `screens/DashboardScreen.jsx`, `screens/LernfeldScreen.jsx`
  (Tokens + Eyebrow + Icon).

OUT (nicht anfassen):
- `data/progress.js` — bleibt Persistenz-Layer. Context ruft rein, ändert ihn nicht.
- Flow-Screens (Lernseite/Aufgaben/SelfExpl/Schaltung/SelbstBauen), CircuitBuilder,
  Content, Doku (Roadmap/HANDOFF/REQUIREMENTS).
- Visuelles Redesign, Layout-Umbau, Farb-Rollen, neue npm-Deps.

## Grundregeln
- GO-Regel: pro Datei erst lesen → `edit_file` mit `dryRun: true` → GO → schreiben.
  Neue Datei (`ProgressContext.jsx`) als Vollinhalt zeigen → GO → `write_file`.
- Code vollständig oder gar nicht.
- Keine neuen Pakete (Context = React-built-in: `createContext`/`useContext`/`useState`).
- Motion-GPU-Regel: nur `transform`/`opacity`. Animierte `motion.div` (rise) NICHT durch
  `Stack` ersetzen — gaps in-place tokenisieren (Animationsverlust vermeiden).
- Token-Identifier + Line-Height-Werte in Step 0 aus `tokens.js`/`cssVars` verifizieren,
  nicht aus dieser Spec raten.
- AI-Grenze unangetastet.

---

## PHASE A — Progress reaktiv (Architektur, zuerst)

### A1 — Neu: `src/data/ProgressContext.jsx`
- `createContext`; `ProgressProvider({ children })` hält `progress` in
  `useState(() => loadProgress())`.
- Exponiert `{ progress, markDone, reset }`:
  - `markDone(lernfeldId, themenfeldId, screenIndex, totalScreens)` → ruft
    `markScreenDone(...)` aus `progress.js` (persistiert), danach `setProgress(loadProgress())`.
  - `reset()` → `resetProgress()`, danach `setProgress(loadProgress())`.
- `useProgress()`-Hook (`useContext`); wirft, wenn außerhalb Provider verwendet.
- Import aus `./progress.js`: `loadProgress`, `markScreenDone`, `resetProgress`.

### A2 — `main.jsx`
- `<ProgressProvider>` direkt um `<App/>` (innerhalb `<MotionConfig>`, innerhalb `StrictMode`).

### A3 — `router.jsx`
- `loadProgress()`-Direktaufruf raus; `useProgress()` für die `initialScreen`-Entscheidung
  (`progress.lastVisited ? "dashboard" : "landing"`).
- `useRouter` wird in `App` aufgerufen, das vom Provider umschlossen ist → Hook-Order ok.

### A4 — `FlowController.jsx`
- `import { markScreenDone } from "../../data/progress.js"` raus.
- `const { markDone } = useProgress();` ; `handleComplete` ruft
  `markDone(lernfeldId, themenfeldId, currentIndex, steps.length)` statt `markScreenDone(...)`.

### A5 — `DashboardScreen.jsx` + `LernfeldScreen.jsx` (NUR Consumption in dieser Phase)
- `const progress = loadProgress();` raus → `const { progress } = useProgress();`.
- `loadProgress`-Import entfernen. Restliches Styling bleibt hier noch unangetastet (→ Phase B).

### Verify A
- `npm run lint` 0/0, `npm run build` 0 Errors.
- Flow komplett durchklicken → „← Zurück"/Abschluss → Dashboard/Lernfeld zeigen aktualisierten
  Fortschritt OHNE Page-Reload.
- localStorage leeren → Reload → Landing (kein `lastVisited`). Nach erstem Schritt → `lastVisited` gesetzt.
- → **Commit A:** „Progress reaktiv: ProgressContext, loadProgress aus Render-Bodies".

---

## REVIEW-GATE (Nico) zwischen A und B.

---

## PHASE B — Dashboard + Lernfeld token-nativ + Icon (nach Review von A)

### Mapping-Recap (= Migration-B-Maps; in Step 0 gegen tokens.js verifizieren)
- Font-Size: 25/26 → `--fs-display` · 18 → `--fs-h2` · 16 → `--fs-h3` · 15 → `--fs-body` ·
  13 → `--fs-sm` · 12 → `--fs-label` · 11.5/10.5 → `--fs-micro`.
- Spacing (margin/padding/gap): 8 → `--space-2` · 9–13 → `--space-3` · 14–16 → `--space-4` ·
  22 → `--space-5` · 40 → `--space-7`.
- Line-Height nach Rolle: Headings → `--lh-tight`, Body/UI → `--lh-base`.
- Letter-Spacing: eng -0.01em → `--ls-tight`; Eyebrow 0.2em via `Eyebrow`/`--ls-eyebrow`.
- ROH lassen: Geometrie (maxWidth 560, Bar-Höhe 3, Icon-Box 18), Radien, Opacities,
  Zwischenwerte außerhalb der Bänder.

### B1 — `DashboardScreen.jsx`
- Font-Size/Spacing/Line-Height-Hardcodes → Tokens.
- `Eyebrow`-Adoption NUR bei eindeutigem Muster-Match (uppercase + 0.2em-Tracking bleibt optisch erhalten):
  - Weitermachen-Label (uppercase, letterSpacing .18em, teal) → `<Eyebrow>`. ✔ Match.
  - „LERNPROGRAMM" (letterSpacing .04em, dim) → NUR fontSize/color tokenisieren, KEIN Eyebrow
    (0.2em-Tracking würde die Optik ändern). „v0.1"-Tag ebenso als mono-Span tokenisieren.
- „Abgeschlossen ✓": Glyph „✓" raus → `<IconCheck size={…}/>` inline, Farbe teal (wie bisher
  der grüne Text). Text „Abgeschlossen" bleibt. (IconCheck = konsistent zu LernfeldScreens StatusIcon.)
- Animiertes Spalten-`motion.div` (rise) bleibt — `gap`/Paddings in-place tokenisieren.

### B2 — `LernfeldScreen.jsx`
- „IHK-Lernfeld · Nr. {ihkNummer}" (uppercase, letterSpacing .2em, teal) → `<Eyebrow>`. ✔ Match.
- h1 26 → `--fs-display`; `letterSpacing` → `--ls-tight`.
- Card-/Header-Spacings + Font-Sizes (h2 16 → `--fs-h3` etc.) → Tokens.
- StatusIcon nutzt bereits `Icons.jsx` — unverändert.

### Verify B
- lint/build grün. Beide Screens rendern ohne Bruch (LandingScreen als Stil-Referenz).
- Dashboard-„✓" ist jetzt SVG-Icon. Keine rohen Font/Spacing-Werte mehr im Scope
  (außer bewusst roh: Geometrie/Radien/Opacities). ≤2px-Snaps ok.
- → **Commit B:** „Dashboard + Lernfeld token-nativ; Emoji-Glyph raus".

---

## Ausführungs-Protokoll (CC)
0. Step-0-Inventar zeigen (vor Änderungen):
   - Betroffene Dateien (echte Pfade) je Phase.
   - Exakte Token-Identifier + Line-Height-Werte aus `tokens.js`/`cssVars`.
   - Props von `Eyebrow` + Signatur von `IconCheck` aus dem Code.
   - Pro Datei: alle Font/Spacing/LineHeight-Hardcodes + Adoption-Kandidaten mit
     vorgeschlagenem Token/Primitive. Für Phase A zusätzlich: Vollinhalt `ProgressContext.jsx`.
1. Auf GO warten.
2. Phase A: Datei für Datei dryRun → GO → schreiben. Verify A. Commit A.
3. Review-Gate (Nico) zwischen A und B.
4. Phase B: dito. Verify B. Commit B.
5. Commits bleiben lokal. Push nur auf ausdrückliche Ansage.

## Akzeptanzkriterien (gesamt)
- Kein `loadProgress()` mehr in Render-Bodies; Fortschritt reaktiv über Context.
- Dashboard/Lernfeld token-nativ; Eyebrow/Icon adoptiert wo Muster passt; kein Emoji-Glyph.
- Kein Verhaltens-/Layout-/Farb-Redesign über das Ziel hinaus. Kein neues Paket.
- Flow-Screens/Content/Doku unangetastet. Zwei saubere Commits (A, B).

## Nicht in diesem Schritt
- Visuelles Redesign Dashboard/Lernfeld. Weitere Lernfeld-Inhalte (LF2).
- Realer Classifier-Test in echtem Chrome/Edge.

---

## STATUS: PHASE A COMPLETE (Commit A) — wartet auf Review-Gate

Erledigt am 2026-06-17.
- **NEU** `data/ProgressContext.jsx`: `ProgressProvider` (State via `useState(()=>loadProgress())`),
  `markDone`/`reset` (persistieren über progress.js + `setProgress(loadProgress())`), `useProgress()`-Hook.
- `main.jsx`: `<ProgressProvider>` um `<App/>` (in MotionConfig, in StrictMode).
- `router.jsx`: `loadProgress()` raus → `useProgress()` für `initialScreen`.
- `FlowController.jsx`: `markScreenDone`-Import raus → `useProgress().markDone` in `handleComplete`.
- `DashboardScreen.jsx` + `LernfeldScreen.jsx`: `loadProgress()` raus → `useProgress()` (nur Consumption; Styling unverändert).
- Lint **0/0** (react-refresh-Warning der Context-Datei gezielt deaktiviert), Build 0 Errors, keine Konsolenfehler.
- **Reaktivität verifiziert (ohne Reload):** Flow durchgeklickt → Lernfeld zeigt tf-01-uri sofort „Wiederholen"
  (`completed`), tf-02 reaktiv freigeschaltet, Dashboard „1 von 6 abgeschlossen". Leeres localStorage → Landing.
- `data/progress.js` unverändert (Persistenz-Layer). Flow-Screens/Content/Doku unangetastet.

**→ REVIEW-GATE:** Warte auf Nicos Abnahme von Phase A, bevor Phase B (Dashboard/Lernfeld token-nativ) startet.

---

## STATUS: PHASE B COMPLETE (Commit B)

Erledigt am 2026-06-17 (nach GO für Phase B).
- **DashboardScreen.jsx**: Font/Spacing/LineHeight → Tokens; **Weitermachen-Label → `<Eyebrow>`**;
  „LERNPROGRAMM"/„v0.1" nur fontSize/color tokenisiert (kein Eyebrow); **Glyph „✓" → `<IconCheck size={13}/>`**
  inline (teal) + Text „Abgeschlossen". Animiertes Spalten-`motion.div` bleibt (gaps in-place).
- **LernfeldScreen.jsx**: „IHK-Lernfeld · Nr." → `<Eyebrow>`; h1 26→`--fs-display`, ls→`--ls-tight`;
  Card-Spacings + h2 16→`--fs-h3` → Tokens; StatusIcon (Icons.jsx) unverändert.
- Lint **0/0**, Build 0 Errors, keine Konsolenfehler.
- **Render verifiziert (computed):** Dashboard — Weitermachen-Eyebrow 11px/uppercase, LERNPROGRAMM 12px,
  „Abgeschlossen" mit SVG-Icon (Glyph weg), Card-h2 18px(`--fs-h2`). Lernfeld — Eyebrow 11px/uppercase/ls 2.2px,
  h1 28px(display)/ls −0.28px(`--ls-tight`), tf-h2 16px(`--fs-h3`), 6 Status-SVGs, kein Emoji-Glyph.
- Beide Screens rendern ohne Bruch; Flow-Screens/Content/Doku unangetastet.

**Migration „Dashboard/Lernfeld token-nativ + Progress-Reaktivität" abgeschlossen (Commit A + B).**
