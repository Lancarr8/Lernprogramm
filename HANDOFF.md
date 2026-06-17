# HANDOFF.md — Lernprogramm
> Working Patterns, Schemas, Known Issues, Fallen.
> Autorität: Nico / Chat-Claude. CC darf diese Datei nicht autonom editieren.
> Zuletzt aktualisiert: 2026-06-16

---

## Für CC: Vor dem ersten Commit lesen

Diese Datei dokumentiert Entscheidungen, Fallen und Muster die nicht
aus dem Code selbst ersichtlich sind. Ignorieren = Fehler reproduzieren.

---

## Projektstand (Kurzüberblick)

- **V1 komplett** — alle Screens funktionieren, LF1 inhaltlich befüllt, deployed auf Netlify
- **Prototyp-Migration abgeschlossen** — uri_slice_prototype.jsx + self_explanation_screen_v1.jsx
  sind Referenzdokumente, kein aktiver Code mehr
- **TF.js Classifier aktiv** — classifyExplanation läuft lokal im Browser per Universal Sentence Encoder
- **Deployment:** github.com/Lancarr8/Lernprogramm → Netlify auto-deploy bei push auf master

---

## Token-System

**Einzige Quelle:** `src/theme/tokens.js` + `src/theme/applyTokens.js`

**Kein Hex-Wert in Component-Dateien.** Immer CSS Custom Properties:

| CSS Variable | Bedeutung |
|---|---|
| `var(--c-bg)` | Hintergrund `#0E1518` |
| `var(--c-bg2)` | Tiefer Hintergrund `#0A0F12` |
| `var(--c-pan)` | Panel `#142127` |
| `var(--c-pan2)` | Panel dunkel `#17262C` |
| `var(--c-teal)` | Akzent `#4FD2C2` |
| `var(--c-ember)` | Ergebnis/LED `#FFA24D` |
| `var(--c-warn)` | Warnung `#E8745C` |
| `var(--c-warn-soft)` | Warn-Hintergrund `rgba(232,116,92,0.12)` |
| `var(--c-warn-edge)` | Warn-Rand `rgba(232,116,92,0.30)` |
| `var(--c-ink)` | Text hell `#E8F0EE` |
| `var(--c-dim)` | Text gedimmt `#86999A` |
| `var(--c-edge)` | Rand `rgba(79,210,194,.16)` |
| `var(--c-ok)` | Erfolg/Erreicht `#5FE3A1` (Mint) |
| `var(--c-ok-soft)` | Erfolg-Hintergrund `rgba(95,227,161,0.12)` |
| `var(--c-ok-edge)` | Erfolg-Rand `rgba(95,227,161,0.30)` |
| `var(--font-body)` | Space Grotesk |
| `var(--font-mono)` | JetBrains Mono |
| `var(--radius-sm/md/lg)` | 8 / 10 / 14 px |
| `var(--space-1…8)` | Spacing 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px |
| `var(--fs-display…micro)` | display 28 · h1 22 · h2 18 · h3 16 · body 15 · sm 13 · label 12 · micro 11 |
| `var(--lh-tight/base/relaxed)` | Line-Height 1.2 / 1.5 / 1.65 |
| `var(--ls-eyebrow)` | Letter-Spacing Eyebrow 0.2em |
| `var(--ls-tight)` | Letter-Spacing eng -0.01em |

---

## Shared Komponenten — immer verwenden, nie neu implementieren

```jsx
import Panel          from "../components/Panel.jsx";
import Button         from "../components/Button.jsx";
import BracketCorners from "../components/BracketCorners.jsx";
import ProgressBar    from "../components/ProgressBar.jsx";
import Eyebrow        from "../components/Eyebrow.jsx";
import SectionTag     from "../components/SectionTag.jsx";
import Stack          from "../components/Stack.jsx";
import { IconCheck, IconLock, IconArrow } from "../components/Icons.jsx";  // u. a.
```

**BracketCorners:** Niemals inline reimplementieren.
**ProgressBar:** Props `done` + `total` (segmentiert) — nie hardcoded Spans.
**Eyebrow:** Getrackte Mono-Versalien-Marke. Props `children`, `color` (def. `var(--c-teal)`), `size` (def. `var(--fs-micro)`), `style`. Nur für uppercase Hero/Section-Marken.
**SectionTag:** Gedimmtes Mono-Versalien-Label über Karten-Abschnitten. Props `children`, `style`. Margin-los by design — Abstand gehört dem Layout (Stack/Parent).
**Stack:** Flex mit Token-Gap. Props `direction` (`"col"` def. | `"row"`), `gap` (Index 1–8 → `var(--space-N)`, def. 4), `align`, `justify`, `style`.
**Icons.jsx:** Inline-SVG, `stroke=currentColor`, viewBox 24×24, strokeWidth 1.8, def. size 18. Verfügbar: IconCheck/Circle/Warn/Arrow/Msg/School/Shield/Lock/Tick. Keine lokalen Icon-Defs mehr in Screens.

---

## Animationen — GPU-Regel

Nur `transform` und `opacity` animieren. Niemals `height`, `width`, `top`, `left`, `color`.
Framer Motion Varianten aus `src/theme/motion.js` verwenden: `rise`, `pop`, `fade`.

```jsx
import { rise, fade } from "../../theme/motion.js";
<motion.div {...rise}>...</motion.div>
```

---

## Fonts — kein doppelter Import

`global.css` lädt Space Grotesk + JetBrains Mono. In keinem Screen-File `@import` für Fonts.

---

## Demo-Buttons — DEV-only

```jsx
{import.meta.env.DEV && (
  <Button variant="ghost" onClick={() => loadDemo("strong")}>Demo: stark</Button>
)}
```

---

## classifyExplanation — Vertrag (unveränderlich)

**Implementierung:** `src/data/classifier.js` via TF.js Universal Sentence Encoder.
Läuft lokal im Browser — kein API-Key, kein Server, offline-fähig.

```js
// Input
classifyExplanation(rawText: string, concept: ConceptCard): Promise<ClassifyResult>

// Output — Vertrag unveränderlich
{
  covered: string[],        // IDs der getroffenen keyPoints
  misconceptions: string[], // IDs der erkannten Fehlvorstellungen
  confidence: number        // 0–1
}
```

**WICHTIG:** Import ist dynamisch (Lazy Chunk). Nicht statisch importieren:
```js
// ✅ Richtig — dynamic import in classifier.js selbst
import { pipeline } from "@tensorflow/tfjs";

// ❌ Falsch — würde TF.js ins Haupt-Bundle ziehen
import * as tf from "@tensorflow/tfjs"; // nicht in Screen-Files!
```

**Kalibrierte Schwellwerte (nicht ohne Test ändern):**
- `KP_THRESHOLD = 0.86` — Kosinus-Ähnlichkeit für Kernpunkte (USE bettet dt. Text uniform hoch ein → hohe Schwelle)
- `MC_MIN = 0.7` — Minimum für Fehlvorstellungen
- `MC_CONTRAST = 0.045` — kontrastiver Abstand: MC feuert nur wenn ähnlicher als alle KPs + dieser Abstand

**Bekannte Limitation:** USE ist englisch-trainiert. Deutsch-Trennband ist schmal (~0.02).
Kalibrierung auf 2 Demo-Texten — für produktiven Einsatz mehr Beispiele kalibrieren.

**Warmup:** Erste Inferenz dauert 15–20s (WebGL shader build). SelfExplanationScreen
zeigt Hinweis bei `checking && attempts === 0`.

---

## Content-Datei Schemas

### lernseite.js
```js
export default {
  eyebrow: "Lernfeld X · Thema",
  titel: "Titel des Themenbereichs",
  formelText: "Kurze Formel oder Kernaussage als Einleitung",
  anker: {
    text: "Realwelt-Anker — warum ist das relevant?",
    highlights: ["Wort1", "Wort2"],  // werden teal markiert
  },
  warum: {
    titel: "Das Warum · Unterüberschrift",
    punkte: [
      { label: "Begriff", text: "Erklärung in einem Satz." },
    ],
  },
  interaktiv: {
    typ: "uri-dreieck" | "formel" | null,
    // bei "uri-dreieck": hint + modi (U/R/I)
    // bei "formel": formel (string) + beispiel { werte: [], ergebnis: "" }
    // bei null: kein interaktiver Block
  },
  teaser: "Überleitung zur Self-Explanation.",
};
```

### aufgaben.js
```js
export default {
  titel: "Aufgaben: Thema",
  aufgaben: [
    {
      id: "a1",
      typ: "berechnung",       // oder "multiple-choice"
      frage: "...",
      einheit: "Ω",            // nur bei berechnung
      loesung: 42,             // nur bei berechnung
      toleranz: 1,             // nur bei berechnung (±)
      hinweis: "Formel: ...",  // nur bei berechnung
      // multiple-choice:
      optionen: ["A", "B", "C", "D"],
      korrekt: 0,              // Index des richtigen
      erklaerung: "...",
    },
  ],
};
```

### self-explanation.js
```js
export default {
  prompt: "Frage an den Azubi.",
  hint: "Hinweis wenn er nicht weiß wo anfangen.",
  keyPoints: [
    {
      id: "kp1",
      label: "Kurzbezeichnung",
      canonical: "Kanonische Erklärung (wird für Embedding genutzt).",
      nudge: "Gezielter Hinweis wenn dieser KP fehlt.",
    },
  ],
  misconceptions: [
    {
      id: "mc1",
      label: "Fehlvorstellung kurz",
      beschreibung: "Fehlvorstellung ausgeschrieben (für Embedding).",
      fix: "Korrektive Erklärung.",
    },
  ],
  praiseDeepening: "Lob + Vertiefungsfrage wenn alles stimmt.",
};
```

**Keine test-Funktionen** — die werden von classifyExplanation semantisch gelöst.

### schaltung.js
```js
export default {
  titel: "...",
  beschreibung: "...",
  schaltplan: {
    typ: "interaktiv" | "svg-inline" | "beschreibung-only",
    // bei "interaktiv": CircuitBuilder-Config (s.u.)
    // bei "svg-inline": svg: `<svg>...</svg>`
    // bei "beschreibung-only": svg: null
  },
  frage: "...",
  antwort: "...",
  aufgebautMit: ["Bauteil 1", "Bauteil 2"],
};
```

### selbst-bauen.js
```js
export default {
  titel: "...",
  sicherheit: "Sicherheitshinweis.",
  materialien: [
    { menge: 1, bauteil: "..." },
  ],
  schritte: ["Schritt 1...", "Schritt 2..."],
  abschluss: "Abschlusstext.",
};
```

---

## CircuitBuilder — Config-Schema

Nur bei `schaltplan.typ === "interaktiv"` relevant:

```js
schaltplan: {
  typ: "interaktiv",
  canvas: { width: 520, height: 260 },
  bauteile: [
    { id: "bat", typ: "batterie",   label: "U = 5 V",    cx: 80,  cy: 140 },
    { id: "r1",  typ: "widerstand", label: "R = 150 Ω",  cx: 220, cy: 70  },
    { id: "led1",typ: "led",        label: "LED",         cx: 370, cy: 70  },
  ],
  // Terminal-Positionen (fix per Typ, im Code):
  // batterie:   plus=(cx, cy-35)   minus=(cx, cy+35)
  // widerstand: links=(cx-40, cy)  rechts=(cx+40, cy)
  // led:        anode=(cx-25, cy)  kathode=(cx+25, cy)
  loesung: [
    { von: "bat.plus",   zu: "r1.links"    },
    { von: "r1.rechts",  zu: "led1.anode"  },
    { von: "led1.kathode", zu: "bat.minus" },
  ],
  hinweis: "Verbinde die Klemmen...",
}
```

Aktuell unterstützte Bauteil-Typen: `batterie`, `widerstand`, `led`.
Parallelschaltung (geteilte Knoten) ist noch nicht implementiert — V2.

---

## Neuen Themenbereich anlegen

1. Ordner erstellen: `app/src/content/lf-xx/tf-yy-name/`
2. Dateien anlegen: `index.js`, `lernseite.js`, `aufgaben.js`, `self-explanation.js`, `schaltung.js`, `selbst-bauen.js`
3. In `lf-xx/index.js` unter `themenfelder` eintragen:
   ```js
   { id: "tf-yy-name", titel: "...", data: () => import("./tf-yy-name/index.js") }
   ```
4. `index.js` des Themenbereichs mit steps befüllen (Standard: alle 5 Typen)

---

## LernseiteScreen — interaktiv-Typen

| `interaktiv.typ` | Was gerendert wird |
|---|---|
| `"uri-dreieck"` | Interaktives URI-Dreieck mit Modi (U/R/I) |
| `"formel"` | Panel mit `formel` (groß, teal) + `beispiel.werte` (Liste) + `beispiel.ergebnis` |
| `null` | Kein interaktiver Block |

---

## SchaltungScreen — Routing

```
data.schaltplan.typ
  "interaktiv"       → CircuitBuilder (click-to-connect)
  "svg-inline"       → SVG direkt gerendert (data.schaltplan.svg)
  "beschreibung-only"→ Kein Schaltplan, nur Text + Frage/Antwort
```

---

## FlowController — Zurück-Button

Jeder Flow-Screen hat einen absolut positionierten "← Zurück"-Button
(top: 12, left: 12, zIndex: 20) der zu `navigate("lernfeld", { lernfeldId })` führt.
Wird direkt über dem ScreenComponent gerendert — nicht im Screen selbst.

---

## Known Issues / Offene Punkte

| Problem | Status | Hinweis |
|---|---|---|
| Classifier-Trennband schmal (~0.02) | Akzeptiert für V1 | Mehr Demo-Texte kalibrieren für Produktion |
| Zurück-Button mobile überlappt Step-Zeile | Akzeptiert für V1 | Bei Mobile-Optimierung adressieren |
| USE englisch-trainiert | Akzeptiert | Multilingual USE für V2 evaluieren |
| 2 npm audit Vulnerabilities (esbuild/vite) | Notiert | Build-Zeit only, kein Prod-Risiko. Vite-Major-Upgrade als bewusster Task |
| tf-03-parallel CircuitBuilder fehlt | V2 geplant | Braucht Node-Konzept im CircuitBuilder |
