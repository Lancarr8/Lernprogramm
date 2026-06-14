# NEXT_STEP.md — Screen-Refaktorierung: Content aus Dateien lesen
> Aktiver Auftrag für CC. Nicht autonom editieren: Roadmap.md, HANDOFF.md, REQUIREMENTS.md.

## Scope
LernseiteScreen + SelfExplanationScreen von hardcoded URI-Inhalt auf
data-Prop umstellen. Content aus lernseite.js / self-explanation.js lesen.
URI-Inhalte in die jeweiligen Content-Dateien extrahieren.
Andere Themenbereiche (tf-02..tf-06) zeigen Fallbacks — kein Crash.

## Nicht anfassen
- FlowController — nicht ändern
- Alle anderen Screens — nicht ändern
- HANDOFF.md, Roadmap.md, REQUIREMENTS.md — read-only

---

## Datenschemas (Vertrag für Content-Dateien)

### lernseite.js Schema
```js
export default {
  eyebrow: "Lernfeld 1 · Grundlagen",
  titel: "Das Ohmsche Gesetz",
  formelText: "Spannung, Strom und Widerstand hängen zusammen — U = R · I",
  anker: {
    text: "Eine LED braucht 20 mA und verträgt 2 V. Du hängst sie an 5 V — ohne Vorwiderstand stirbt sie. Genau diesen Widerstand sagt dir das Ohmsche Gesetz.",
    highlights: ["20 mA", "2 V", "5 V"],  // werden in ember-Farbe gezeigt
  },
  warum: {
    titel: "Das Warum · die Wasser-Analogie",
    punkte: [
      { label: "Spannung U", text: "der Druck, der dahintersteht." },
      { label: "Strom I",    text: "wie viel tatsächlich fließt." },
      { label: "Widerstand R", text: "die Engstelle, die bremst." },
    ],
  },
  interaktiv: {
    typ: "uri-dreieck",   // "uri-dreieck" | "formel" | null
    hint: "Tipp an, was du suchst",
    modi: {
      U: { label: "Spannung",    einheit: "V", formel: "U = R · I",
           worked: ["R = 4 Ω", "I = 3 A", "U = 4 Ω · 3 A = 12 V"], result: "12 V" },
      R: { label: "Widerstand",  einheit: "Ω", formel: "R = U / I",
           worked: ["U = 12 V", "I = 3 A", "R = 12 V / 3 A = 4 Ω"], result: "4 Ω" },
      I: { label: "Strom",       einheit: "A", formel: "I = U / R",
           worked: ["U = 12 V", "R = 4 Ω", "I = 12 V / 4 Ω = 3 A"], result: "3 A" },
    },
  },
  teaser: "Gleich bist du dran: Erkläre in einem Satz, warum mehr Widerstand den Strom kleiner macht.",
};
```

### self-explanation.js Schema
```js
export default {
  prompt: "Warum kannst du bei U = R · I nicht eine Größe ändern, ohne dass eine andere mitgeht?",
  hint: "Denk an die Wasser-Analogie von vorhin — Druck, Engstelle, Fluss.",
  keyPoints: [
    {
      id: "kp1",
      label: "Spannung = der Antrieb",
      canonical: "Die Spannung U ist die treibende Größe (Druck), die Ladung bewegt.",
      nudge: "Du hast die treibende Größe noch nicht benannt — was drückt die Ladung durch den Draht?",
      test: (t) => /spannung/.test(t) && /(treib|drück|druck|antrieb|schieb|kraft|potential|pumpe)/.test(t),
    },
    // ... weitere keyPoints
  ],
  misconceptions: [
    {
      id: "mc1",
      label: "Mehr Widerstand = mehr Strom",
      fix: "Halt — denk nochmal an die Engstelle: lässt eine engere Stelle mehr oder weniger durch?",
      test: (t) => /(mehr|höher|größer)[^.]{0,30}widerstand[^.]{0,35}(mehr|höher|größer|steigt)[^.]{0,18}strom/.test(t),
    },
  ],
  praiseDeepening: "Stark — alle Kernpunkte sitzen. Jetzt schärfer: Was passiert mit I, wenn U *und* R gleichzeitig steigen?",
};
```

---

## Task 1 — lernseite.js für tf-01-uri befüllen

Schreibe `app/src/content/lf-01/tf-01-uri/lernseite.js` mit dem vollständigen
Schema (s.o.) — alle Werte aus dem aktuellen `LernseiteScreen.jsx` extrahieren.
Das sind: MODES-Daten, Anker-Text, Wasser-Analogie-Punkte, Formel-Text, Teaser.

---

## Task 2 — self-explanation.js für tf-01-uri befüllen

Schreibe `app/src/content/lf-01/tf-01-uri/self-explanation.js` mit dem
vollständigen Schema — alle Werte aus `CONCEPT_URI` in `SelfExplanationScreen.jsx`
extrahieren (inkl. der test-Funktionen — .js-Dateien dürfen Funktionen enthalten).

---

## Task 3 — LernseiteScreen auf data-Prop umstellen

Update `app/src/screens/flow/LernseiteScreen.jsx`:

**Änderungen:**
- Hardcoded `MODES`-Konstante entfernen
- Content aus `props.data` lesen (kommt als Prop von FlowController)
- Fallback wenn `data` null (laden) oder leer (Inhalt folgt):
  ```jsx
  if (!data || Object.keys(data).length === 0) {
    return <PlaceholderShell titel="Lernseite" currentStep={currentStep} totalSteps={totalSteps} onComplete={onComplete} />;
  }
  ```
- Interaktiv-Block: nur rendern wenn `data.interaktiv.typ === "uri-dreieck"`,
  dann `data.interaktiv.modi` statt MODES verwenden
- Für `typ === "formel"` oder null: einfache Formel-Card ohne Triangle
- Anker-Text: `data.anker.highlights`-Wörter in ember-Farbe markieren
- Warum-Accordion: `data.warum.punkte` iterieren
- Teaser: `data.teaser`

**PlaceholderShell** (lokal im File, kein extra Import):
```jsx
function PlaceholderShell({ titel, currentStep, totalSteps, onComplete }) {
  return (
    <div className="grid-bg" style={{ minHeight: "100%", display: "flex",
      justifyContent: "center", padding: 24 }}>
      <motion.div {...rise} style={{ width: "100%", maxWidth: 520 }}>
        <div style={{ display: "flex", justifyContent: "space-between",
          marginBottom: 14, fontFamily: "var(--font-mono)", fontSize: 12 }}>
          <span style={{ color: "var(--c-dim)" }}>LERNSEITE</span>
          <span style={{ color: "var(--c-teal)" }}>Schritt {currentStep} / {totalSteps}</span>
        </div>
        <Panel>
          <p style={{ margin: "0 0 6px", color: "var(--c-dim)",
            fontFamily: "var(--font-mono)", fontSize: 12 }}>{titel.toUpperCase()}</p>
          <p style={{ margin: "0 0 20px", fontSize: 15, lineHeight: 1.6 }}>
            Inhalt folgt in Kürze.
          </p>
          <Button variant="go" onClick={onComplete}>Weiter</Button>
        </Panel>
      </motion.div>
    </div>
  );
}
```

---

## Task 4 — SelfExplanationScreen auf data-Prop umstellen

Update `app/src/screens/flow/SelfExplanationScreen.jsx`:

**Änderungen:**
- Hardcoded `CONCEPT_URI` entfernen
- Concept aus `props.data` lesen
- Fallback wenn `data` null oder leer:
  ```jsx
  if (!data || !data.keyPoints) {
    return <PlaceholderShell titel="Self-Explanation" ... />;
  }
  ```
- `classifyExplanation(raw, data)` statt `classifyExplanation(raw, CONCEPT_URI)`
- `buildFeedback(result, data)` statt `buildFeedback(result, CONCEPT_URI)`
- Prompt + Hint aus `data.prompt` / `data.hint`

---

## Definition of Done

- [ ] `npm run lint` → 0 Errors
- [ ] `npm run build` → 0 Errors
- [ ] tf-01-uri Flow funktioniert end-to-end (Inhalt kommt aus Content-Dateien)
- [ ] tf-02-reihe Flow: alle Screens zeigen Fallback, kein Crash
- [ ] LernseiteScreen hat keine hardcodierten MODES mehr
- [ ] SelfExplanationScreen hat kein hardcodiertes CONCEPT_URI mehr
- [ ] lernseite.js + self-explanation.js für tf-01-uri vollständig befüllt

## Wenn fertig
Schreibe am Ende dieser Datei: `## STATUS: REFACTORING COMPLETE`
und liste auf was geändert wurde. Warte dann auf Nicos Review.

---

## STATUS: REFACTORING COMPLETE

Erledigt am 2026-06-14:

**Task 1 — `lernseite.js` (tf-01-uri) befüllt.**
- Vollständiges Schema: eyebrow, titel, formelText, anker (text + highlights `["20 mA","2 V","5 V"]`),
  warum (Wasser-Analogie, 3 Punkte), interaktiv (`typ: "uri-dreieck"`, hint, modi U/R/I mit
  einheit/formel/worked/result), teaser. Alle Werte aus dem alten LernseiteScreen extrahiert.

**Task 2 — `self-explanation.js` (tf-01-uri) befüllt.**
- Komplette Konzept-Karte aus `CONCEPT_URI`: prompt, hint, 4 keyPoints (inkl. `test`-Heuristik-
  Funktionen, .js erlaubt das), 3 misconceptions (mit `test`), praiseDeepening. 1:1 übernommen,
  AI-Grenze gewahrt (autorisierter Inhalt, nicht generiert).

**Task 3 — `LernseiteScreen.jsx` auf data-Prop umgestellt.**
- Hardcodierte `MODES`-Konstante entfernt. Inhalt kommt aus `props.data`.
- `PlaceholderShell` (lokal) + Guard `if (!data || Object.keys(data).length === 0)`.
- Interaktiv-Block typabhängig: `uri-dreieck` → Dreieck mit `data.interaktiv.modi`;
  `formel` → einfache Formel-Card; sonst nichts. Anker-Highlights generisch via Helper
  (`renderHighlighted`), Warum-Akkordeon iteriert `data.warum.punkte`, Teaser aus `data.teaser`.
- Hooks vor dem Early-Return (rules-of-hooks gewahrt).

**Task 4 — `SelfExplanationScreen.jsx` auf data-Prop umgestellt.**
- Hardcodiertes `CONCEPT_URI` entfernt. `concept = data`. classify/buildFeedback nutzen `data`.
- `PlaceholderShell` (lokal) + Guard `if (!data || !data.keyPoints)`.
- Prompt aus `data.prompt`, Hint aus `data.hint`. Klassifikator-/Feedback-Logik unverändert
  (Austausch-Punkt-Vertrag intakt). Demo-Buttons bleiben DEV-only.

**Verifikation (Lint + Build + Laufzeit, DOM-verifiziert):**
- ✅ `npm run lint` 0/0 · ✅ `npm run build` 0 Errors.
- ✅ **tf-01-uri** end-to-end aus Content-Dateien: Lernseite (Eyebrow/Titel/Formel/Anker-Highlight
  „20 mA" / Warum-Akkordeon / Dreieck 12 V→4 Ω / Teaser) · Self-Explanation (Prompt + Hint aus
  Datei, Coach „Sitzt — alle Kernpunkte" → „Weiter zur Schaltung").
- ✅ **tf-02-reihe** (leeres `{}`): Lernseite- und Self-Explanation-Placeholder greifen, „Weiter"
  führt durch, kein Crash. (Auch Aufgaben/Schaltung/Bauen zeigen ihre Fallbacks.)
- ✅ LernseiteScreen ohne MODES, SelfExplanationScreen ohne CONCEPT_URI. Keine Konsolenfehler.

**Hinweise für Nico:**
- `lernseite.js` rendert `formelText` so, dass der Teil nach „—" teal hervorgehoben wird, und
  `warum.titel` so, dass der Teil vor „ · " teal ist — generisch über alle Themenbereiche.
- Mir ist aufgefallen, dass du `aufgaben.js` für tf-01-uri inzwischen mit 4 echten Aufgaben
  befüllt hast (R=100 Ω … etc.) — lief im Test einwandfrei, ist aber nicht Teil dieses Auftrags.
