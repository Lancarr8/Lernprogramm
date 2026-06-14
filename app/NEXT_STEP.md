# NEXT_STEP.md — CircuitBuilder: Interaktiver Schaltungsaufbau
> Aktiver Auftrag für CC. Nicht autonom editieren: Roadmap.md, HANDOFF.md, REQUIREMENTS.md.

## Scope
Neue Komponente `CircuitBuilder.jsx` bauen. SchaltungScreen erkennt
`typ: "interaktiv"` und rendert den Builder statt dem statischen SVG.
User verbindet Klemmen per Klick — App prüft ob die Schaltung stimmt.

## Nicht anfassen
- Alle anderen Screens, FlowController, Progress-Layer — nicht ändern
- Bestehende SchaltungScreen-Modi (svg-inline, beschreibung-only) — weiter funktionsfähig lassen

---

## Datenmodell (schaltung.js Schema für typ: "interaktiv")

```js
{
  typ: "interaktiv",
  canvas: { width: 520, height: 260 },
  bauteile: [
    {
      id: "bat",
      typ: "batterie",     // "batterie" | "widerstand" | "led"
      label: "U = 5 V",
      cx: 80,  cy: 140,    // Mittelpunkt der Komponente
    },
    {
      id: "r1",
      typ: "widerstand",
      label: "R_V = 150 Ω",
      cx: 220, cy: 70,
    },
    {
      id: "led1",
      typ: "led",
      label: "LED",
      cx: 370, cy: 70,
    },
  ],
  // Terminals pro Typ (nicht im Data, fix im Code):
  // batterie:  plus=(cx, cy-35)  minus=(cx, cy+35)
  // widerstand: links=(cx-40,cy)  rechts=(cx+40,cy)
  // led:       anode=(cx-25,cy)  kathode=(cx+25,cy)

  loesung: [
    { von: "bat.plus",      zu: "r1.links"      },
    { von: "r1.rechts",     zu: "led1.anode"    },
    { von: "led1.kathode",  zu: "bat.minus"     },
  ],
  hinweis: "Verbinde die Klemmen so dass der Strom vom + Pol der Batterie durch Widerstand und LED zurück zum − Pol fließt.",
}
```

---

## Task 1 — schaltung.js für tf-01-uri auf "interaktiv" umstellen

Überschreibe `app/src/content/lf-01/tf-01-uri/schaltung.js` mit dem
interaktiven Schema (s.o.). Behalte `beschreibung`, `frage`, `antwort`,
`aufgebautMit` — nur `schaltplan`-Block ersetzen.

---

## Task 2 — CircuitBuilder.jsx bauen

Erstelle `app/src/screens/flow/CircuitBuilder.jsx`.

### Props
```jsx
<CircuitBuilder
  config={data.schaltplan}   // { canvas, bauteile, loesung, hinweis }
  onSolved={onComplete}      // wird aufgerufen wenn Schaltung korrekt
/>
```

### State
```js
const [wires, setWires] = useState([]);          // [{ von, zu }]
const [selected, setSelected] = useState(null);  // "bat.plus" etc.
const [solved, setSolved] = useState(false);
const [wrongFlash, setWrongFlash] = useState(false);
```

### Terminal-Positionen (fix per Bauteil-Typ)
```js
function getTerminals(bauteil) {
  const { id, typ, cx, cy } = bauteil;
  if (typ === "batterie")  return {
    [`${id}.plus`]:    { x: cx, y: cy - 35, label: "+" },
    [`${id}.minus`]:   { x: cx, y: cy + 35, label: "−" },
  };
  if (typ === "widerstand") return {
    [`${id}.links`]:   { x: cx - 40, y: cy, label: "" },
    [`${id}.rechts`]:  { x: cx + 40, y: cy, label: "" },
  };
  if (typ === "led") return {
    [`${id}.anode`]:   { x: cx - 25, y: cy, label: "A" },
    [`${id}.kathode`]: { x: cx + 25, y: cy, label: "K" },
  };
  return {};
}

// Alle Terminals zusammenführen
function getAllTerminals(bauteile) {
  return Object.assign({}, ...bauteile.map(getTerminals));
}
```

### Klick-Logik
```js
function handleTerminalClick(terminalId) {
  if (solved) return;

  if (!selected) {
    setSelected(terminalId);
    return;
  }

  if (selected === terminalId) {
    setSelected(null);
    return;
  }

  // Gleiche Komponente? Nicht erlaubt.
  const sameComponent = selected.split(".")[0] === terminalId.split(".")[0];
  if (sameComponent) { setSelected(null); return; }

  // Bereits verbunden?
  const alreadyConnected = wires.some(
    (w) => (w.von === selected && w.zu === terminalId) ||
            (w.von === terminalId && w.zu === selected)
  );
  if (alreadyConnected) { setSelected(null); return; }

  // Draht hinzufügen
  const newWires = [...wires, { von: selected, zu: terminalId }];
  setWires(newWires);
  setSelected(null);

  // Prüfen ob gelöst
  checkSolution(newWires);
}

function checkSolution(currentWires) {
  const allCorrect = config.loesung.every((req) =>
    currentWires.some(
      (w) => (w.von === req.von && w.zu === req.zu) ||
              (w.von === req.zu  && w.zu === req.von)
    )
  );
  if (allCorrect) setSolved(true);
}
```

### Draht-Rendering (L-förmiges Routing)
```js
function wirePath(t1, t2) {
  const midX = (t1.x + t2.x) / 2;
  // Horizontal bis Mitte, dann vertikal, dann horizontal
  return `M ${t1.x} ${t1.y} L ${midX} ${t1.y} L ${midX} ${t2.y} L ${t2.x} ${t2.y}`;
}
```

### Bauteil-Rendering (SVG-Funktionen)

**Batterie:**
```js
function BatterieSymbol({ cx, cy, label }) {
  return (
    <g>
      <line x1={cx} y1={cy-35} x2={cx} y2={cy-10} stroke="var(--c-teal)" strokeWidth="2"/>
      <line x1={cx-15} y1={cy-10} x2={cx+15} y2={cy-10} stroke="var(--c-teal)" strokeWidth="3" strokeLinecap="round"/>
      <line x1={cx-9}  y1={cy}    x2={cx+9}  y2={cy}    stroke="var(--c-teal)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1={cx} y1={cy} x2={cx} y2={cy+35} stroke="var(--c-teal)" strokeWidth="2"/>
      <text x={cx+20} y={cy-8}  fill="var(--c-ember)" fontFamily="var(--font-mono)" fontSize="11">+</text>
      <text x={cx+20} y={cy+5}  fill="var(--c-dim)"   fontFamily="var(--font-mono)" fontSize="11">−</text>
      <text x={cx}    y={cy+55} fill="var(--c-teal)"  fontFamily="var(--font-mono)" fontSize="10" textAnchor="middle">{label}</text>
    </g>
  );
}
```

**Widerstand:**
```js
function WiderstandSymbol({ cx, cy, label }) {
  return (
    <g>
      <line x1={cx-40} y1={cy} x2={cx-20} y2={cy} stroke="var(--c-teal)" strokeWidth="2"/>
      <rect x={cx-20} y={cy-12} width="40" height="24" rx="3"
        fill="var(--c-bg)" stroke="var(--c-teal)" strokeWidth="2"/>
      <line x1={cx+20} y1={cy} x2={cx+40} y2={cy} stroke="var(--c-teal)" strokeWidth="2"/>
      <text x={cx} y={cy-18} fill="var(--c-ink)" fontFamily="var(--font-mono)" fontSize="10" textAnchor="middle">{label}</text>
    </g>
  );
}
```

**LED:**
```js
function LEDSymbol({ cx, cy, label }) {
  return (
    <g>
      <line x1={cx-25} y1={cy} x2={cx-15} y2={cy} stroke="var(--c-teal)" strokeWidth="2"/>
      <polygon points={`${cx-15},${cy-13} ${cx-15},${cy+13} ${cx+8},${cy}`}
        fill="rgba(255,162,77,0.15)" stroke="var(--c-ember)" strokeWidth="2" strokeLinejoin="round"/>
      <line x1={cx+8} y1={cy-13} x2={cx+8} y2={cy+13} stroke="var(--c-ember)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1={cx+8} y1={cy} x2={cx+25} y2={cy} stroke="var(--c-teal)" strokeWidth="2"/>
      {/* Lichtpfeile */}
      <line x1={cx+14} y1={cy-8}  x2={cx+22} y2={cy-18} stroke="var(--c-ember)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1={cx+19} y1={cy-4}  x2={cx+28} y2={cy-14} stroke="var(--c-ember)" strokeWidth="1.5" strokeLinecap="round"/>
      <text x={cx} y={cy+28} fill="var(--c-ember)" fontFamily="var(--font-mono)" fontSize="10" textAnchor="middle">{label}</text>
    </g>
  );
}
```

### Terminal-Dots
Klemmen als Kreise rendern:
```jsx
{Object.entries(allTerminals).map(([id, pos]) => {
  const isSelected = selected === id;
  const isConnected = wires.some(w => w.von === id || w.zu === id);
  return (
    <circle
      key={id}
      cx={pos.x} cy={pos.y} r={isSelected ? 9 : 6}
      fill={isSelected ? "var(--c-teal)" : isConnected ? "var(--c-ember)" : "var(--c-bg2)"}
      stroke={isSelected ? "var(--c-teal)" : "var(--c-edge)"}
      strokeWidth="2"
      style={{ cursor: solved ? "default" : "pointer" }}
      onClick={() => handleTerminalClick(id)}
    />
  );
})}
```

### Gelöst-State
```jsx
{solved && (
  <motion.div {...rise} style={{ textAlign: "center", marginTop: 16 }}>
    <p style={{ color: "var(--c-teal)", fontFamily: "var(--font-mono)", fontSize: 13, marginBottom: 12 }}>
      ✓ Schaltung korrekt — Strom kann fließen
    </p>
    <Button variant="go" onClick={onSolved}>Weiter</Button>
  </motion.div>
)}
```

### Reset-Button
```jsx
{!solved && wires.length > 0 && (
  <button
    onClick={() => { setWires([]); setSelected(null); }}
    style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--c-dim)",
      background: "none", border: "none", cursor: "pointer", marginTop: 8 }}
  >
    Zurücksetzen
  </button>
)}
```

---

## Task 3 — SchaltungScreen: CircuitBuilder einbinden

In `SchaltungScreen.jsx`:
```jsx
import CircuitBuilder from "./CircuitBuilder.jsx";

// Im Render, nach den bestehenden Checks:
if (data.schaltplan?.typ === "interaktiv") {
  return (
    <div className="grid-bg" ...>
      <motion.div {...rise} style={{ width: "100%", maxWidth: 560 }}>
        {/* Step indicator */}
        ...
        <Panel>
          <p style={{ ...eyebrow }}>SCHALTUNG</p>
          <p style={{ fontSize: 15, marginBottom: 4 }}>{data.titel}</p>
          <p style={{ fontSize: 13, color: "var(--c-dim)", marginBottom: 16 }}>{data.schaltplan.hinweis}</p>
          <CircuitBuilder config={data.schaltplan} onSolved={onComplete} />
        </Panel>
        {/* frage/antwort Toggle darunter */}
      </motion.div>
    </div>
  );
}
```

---

## Definition of Done

- [ ] `npm run lint` → 0 Errors
- [ ] `npm run build` → 0 Errors
- [ ] tf-01-uri Schaltung: 3 Klemmen verbindbar, bei korrekter Schaltung → "Weiter"
- [ ] Falsche Verbindung (gleiche Komponente): wird ignoriert
- [ ] Reset-Button funktioniert
- [ ] Bestehende modi (svg-inline, beschreibung-only) weiter funktionsfähig
- [ ] Kein hardcoded Hex

## Wenn fertig
Schreibe: `## STATUS: CIRCUITBUILDER COMPLETE`
und liste auf was gebaut wurde. Warte auf Nicos Review.

---

## STATUS: CIRCUITBUILDER COMPLETE

Erledigt am 2026-06-14:

**Task 1 — `schaltung.js` (tf-01-uri) auf `typ: "interaktiv"` umgestellt.**
- Nur der `schaltplan`-Block ersetzt (canvas 520×260, 3 Bauteile bat/r1/led1, loesung mit
  3 Verbindungen, hinweis). `beschreibung`, `frage`, `antwort`, `aufgebautMit` unverändert behalten.
- **Hinweis:** Dein bisheriger statischer `svg-inline`-Schaltplan (das schöne IEC/DIN-SVG) wurde
  dabei ersetzt — so vom Task vorgegeben. Er steckt noch in der Git-Historie, falls du ihn
  zurück willst.

**Task 2 — `CircuitBuilder.jsx` gebaut.**
- `getTerminals`/`getAllTerminals` (Klemmen fix pro Typ im Code), `wirePath` (L-Routing),
  SVG-Symbole Batterie/Widerstand/LED, Klemmen-Dots (klickbar), Klick-Logik
  (`handleTerminalClick` + `checkSolution`), Gelöst-State + Reset-Button.
- `wrongFlash` aus der Scaffold-Vorlage **weggelassen** — wurde im Spec-Code nie gesetzt und
  ist nicht Teil der DoD; ein deklarierter, ungenutzter State hätte Lint-Warnings erzeugt.
- LED-Polygon-Füllung: statt hardcodiertem `rgba(255,162,77,0.15)` jetzt
  `color-mix(in srgb, var(--c-ember) 15%, transparent)` (DoD: kein Hex; kein neues Token nötig).

**Task 3 — `SchaltungScreen.jsx`: CircuitBuilder eingebunden.**
- Früher Branch `if (data.schaltplan?.typ === "interaktiv")` → rendert Builder + Hinweis +
  Frage/Lösung-Toggle. Frage/Antwort-Toggle in lokale `FrageAntwort`-Komponente ausgelagert
  (im interaktiv-Branch genutzt).
- Bestehende Pfade (`svg-inline`, `beschreibung-only`, Lade-/Standard-Render) **unverändert** —
  der neue Branch ist ein Early-Return davor.

**Verifikation (Lint + Build + Laufzeit, DOM-verifiziert):**
- ✅ `npm run lint` 0/0 · ✅ `npm run build` 0 Errors.
- ✅ tf-01-uri Schaltung (Schritt 4): Builder rendert (6 Klemmen, Hinweis).
- ✅ Gleiche-Komponente-Klick (bat.plus + bat.minus) → ignoriert (0 Drähte).
- ✅ Korrekte Verbindung → Draht erscheint · Reset-Button leert Drähte.
- ✅ Alle 3 korrekten Verbindungen → „✓ Schaltung korrekt — Strom kann fließen" + „Weiter" →
  führt zu Schritt 5. „Lösung anzeigen" zeigt die Musterlösung.
- ✅ Keine Konsolenfehler. Kein hardcoded Hex in CircuitBuilder.
- Hinweis zu „bestehende modi": `svg-inline`/`beschreibung-only`-Code ist unangetastet (nur
  Early-Return davor eingefügt) und war in Phase 4 bereits verifiziert — daher nicht erneut
  durchgeklickt (kein aktiver Themenbereich nutzt diese modi mehr).
