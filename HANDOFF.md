# HANDOFF.md — Lernprogramm
> Working Patterns, Migration-Hinweise, Known Issues.
> Autorität: Nico / Chat-Claude. CC darf diese Datei nicht autonom editieren.
> Zuletzt aktualisiert: 2026-06-14

---

## Für CC: Vor dem ersten Commit lesen

Diese Datei dokumentiert Entscheidungen, Fallen und Muster die nicht
aus dem Code selbst ersichtlich sind. Ignorieren = Fehler reproduzieren.

---

## Token-Migration (Prototypen → echte Screens)

Die Referenz-Prototypen (`uri_slice_prototype.jsx`, `self_explanation_screen_v1.jsx`)
sind **selbst-enthaltend** — sie haben eigene Inline-CSS und `const C = {...}` Objekte
mit hardcodierten Hex-Werten. Das war absichtlich für die Prototyp-Phase.

**Beim Übertragen in Stage 2 gilt:**
- Alle Hex-Werte durch CSS Custom Properties ersetzen: `#4FD2C2` → `var(--c-teal)`
- Alle font-family Strings durch Token-Vars ersetzen: `'JetBrains Mono'` → `var(--font-mono)`
- Inline `<style>` Tags entfernen — Styles gehören in den Component oder global.css
- Einzige Quelle für Tokens: `src/theme/tokens.js` + `src/theme/applyTokens.js`

**Token-Mapping (Prototyp → CSS Var):**

| Prototyp-Wert | CSS Variable |
|---|---|
| `#0E1518` | `var(--c-bg)` |
| `#0A0F12` | `var(--c-bg2)` |
| `#142127` | `var(--c-pan)` |
| `#17262C` | `var(--c-pan2)` |
| `#4FD2C2` | `var(--c-teal)` |
| `#FFA24D` | `var(--c-ember)` |
| `#E8745C` | `var(--c-warn)` |
| `#E8F0EE` | `var(--c-ink)` |
| `#86999A` | `var(--c-dim)` |
| `rgba(79,210,194,.16)` | `var(--c-edge)` |
| `'Space Grotesk'...` | `var(--font-body)` |
| `'JetBrains Mono'...` | `var(--font-mono)` |
| `8px` | `var(--radius-sm)` |
| `10px` | `var(--radius-md)` |
| `14px` | `var(--radius-lg)` |

---

## BracketCorners — immer die shared Komponente

`self_explanation_screen_v1.jsx` hat eine eigene inline `BracketCorners`-Implementierung.
**Nicht übernehmen.** Im echten Build ausschließlich `components/BracketCorners.jsx` verwenden.

```jsx
// ✅ Richtig
import BracketCorners from "../components/BracketCorners.jsx";

// ❌ Falsch — nie inline neu implementieren
function BracketCorners() { ... }
```

---

## Fortschrittsbalken — nie hardcoded

Der Step-Indikator muss `currentStep` und `totalSteps` als Props bekommen.
`totalSteps` kommt aus der Content-Definition des Themenbereichs, nicht aus einer Konstante.

```jsx
// ✅ Richtig
<StepBar current={currentStep} total={themenbereich.steps.length} />

// ❌ Falsch
<span className="on" /><span className="on" /><span className="on" /><span /><span />
```

---

## Demo-Buttons — DEV-only Guard

Die Demo-Buttons in `self_explanation_screen_v1.jsx` sind Entwicklungshelfer.
Vor Production-Build sicherstellen:

```jsx
// ✅ Richtig — nur im Dev-Modus sichtbar
{import.meta.env.DEV && (
  <>
    <button onClick={() => loadDemo("strong")}>Demo: starke Erklärung</button>
    <button onClick={() => loadDemo("weak")}>Demo: mit Fehlvorstellung</button>
  </>
)}
```

---

## classifyExplanation — Vertragsschema (Austausch-Punkt)

Die Funktion ist der einzige erlaubte KI-Berührungspunkt.
Vertrag muss beim LLM-Swap exakt eingehalten werden:

```js
// Input
classifyExplanation(rawText: string, concept: ConceptCard): ClassifyResult

// Output — unveränderlich
{
  covered: string[],        // IDs der getroffenen keyPoints
  misconceptions: string[], // IDs der erkannten Fehlvorstellungen
  confidence: number        // 0–1, Prototyp: fix 0.5
}
```

Alles andere im Screen bleibt unverändert. Nur diese Funktion tauschen.

---

## Schrittanzahl — dynamisch aus Content

Die Anzahl der Schritte pro Themenbereich ist **nicht fix**.
Jeder Themenbereich definiert seine eigene Schrittliste in `src/content/lf-xx/tf-xx/index.js`.

```js
// Beispiel: src/content/lf-01/tf-01-uri/index.js
export default {
  id: "tf-01-uri",
  titel: "Das Ohmsche Gesetz",
  steps: [
    { type: "lernseite",        data: () => import("./lernseite.js") },
    { type: "aufgaben",         data: () => import("./aufgaben.js") },
    { type: "self-explanation", data: () => import("./self-explanation.js") },
    { type: "schaltung",        data: () => import("./schaltung.js") },
    { type: "selbst-bauen",     data: () => import("./selbst-bauen.js") },
  ],
};
```

Der Flow-Controller liest `steps.length` für den Step-Indikator und
`steps[currentIndex].type` um den richtigen Screen zu rendern.

---

## Animationen — ausschließlich transform/opacity

GPU-Regel: Nur `transform` und `opacity` animieren.
`height`, `width`, `top`, `left`, `background`, `color` niemals animiert —
verursachen Layout-Reflows und sind nicht 60fps-fähig.

Accordion-Effekte (wie das Wasser-Analogie-Panel im URI-Prototyp) sind
eine Ausnahme im Prototyp (`max-height` Trick). Im echten Build:
Framer Motion `AnimatePresence` mit `height: "auto"` + `overflow: hidden`.

---

## Fonts — kein doppelter Import

`global.css` lädt Space Grotesk + JetBrains Mono via Google Fonts.
Die Prototypen haben eigene `@import` in ihrem CSS — das ist Prototyp-Overhead.
In Stage-2-Screens kein `@import` für Fonts — global.css übernimmt das.
