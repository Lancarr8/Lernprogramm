# NEXT_STEP.md — Classifier: Wechsel auf TensorFlow.js
> Aktiver Auftrag für CC. Nur classifier.js + vite.config.js + packages ändern.
> Nicht autonom editieren: Roadmap.md, HANDOFF.md, REQUIREMENTS.md.

## Warum
@xenova/transformers + ONNX Runtime hängt im Browser (SharedArrayBuffer-Problem).
TensorFlow.js nutzt WebGL — kein ONNX, kein SharedArrayBuffer, funktioniert in jedem Browser.

---

## Task 1 — Pakete tauschen

```bash
cd app
npm uninstall @xenova/transformers
npm install @tensorflow/tfjs @tensorflow-models/universal-sentence-encoder
```

---

## Task 2 — vite.config.js bereinigen

`optimizeDeps.exclude: ["@xenova/transformers"]` entfernen.
Falls keine anderen excludes mehr da sind, den ganzen `optimizeDeps`-Block entfernen.

---

## Task 3 — classifier.js neu schreiben

Ersetze den gesamten Inhalt von `app/src/data/classifier.js`:

```js
// classifier.js — Semantische Klassifikation via TensorFlow.js Universal Sentence Encoder.
// Kein ONNX, kein SharedArrayBuffer — läuft per WebGL in jedem modernen Browser.
// Kontrastiver Ansatz für Fehlvorstellungen: MC feuert nur wenn ähnlicher als alle KPs.

import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";

const KP_THRESHOLD = 0.58;
const MC_MIN       = 0.70;
const MC_CONTRAST  = 0.02;

let model = null;
let loadingPromise = null;

export async function loadClassifier(onProgress) {
  if (model) return model;
  if (loadingPromise) return loadingPromise;

  // TF.js meldet keinen Fortschritt — onProgress einmalig mit 50% simulieren
  if (onProgress) onProgress({ status: "progress", progress: 50 });

  loadingPromise = use.load().then((m) => {
    model = m;
    if (onProgress) onProgress({ status: "progress", progress: 100 });
    return m;
  });

  return loadingPromise;
}

// Text → Float32Array Embedding (512-dimensional)
async function embed(text) {
  const tensor = await model.embed([text]);
  const data = await tensor.data();
  tensor.dispose();
  return Array.from(data);
}

// Kosinus-Ähnlichkeit
function cosineSim(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na  += a[i] * a[i];
    nb  += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

// Text in Sätze aufteilen
function splitSentences(text) {
  return text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 8);
}

// Hauptfunktion — Vertrag identisch zu bisheriger classifyExplanation
export async function classifyExplanation(rawText, concept) {
  if (!model) throw new Error("Classifier nicht geladen — loadClassifier() zuerst aufrufen");

  const sentences = splitSentences(rawText);
  if (sentences.length === 0) {
    return { covered: [], misconceptions: [], confidence: 0 };
  }

  // Satz-Embeddings (batch für Effizienz)
  const sentenceTensor = await model.embed(sentences);
  const sentenceData = await sentenceTensor.data();
  sentenceTensor.dispose();

  const dim = 512;
  const sentenceVecs = sentences.map((_, i) =>
    Array.from(sentenceData.slice(i * dim, (i + 1) * dim))
  );

  // KP-Embeddings (für Kernpunkte + MC-Kontrast)
  const kpVecs = await Promise.all(concept.keyPoints.map((kp) => embed(kp.canonical)));

  // --- Kernpunkte ---
  const covered = [];
  for (let ki = 0; ki < concept.keyPoints.length; ki++) {
    const maxSim = Math.max(...sentenceVecs.map((sv) => cosineSim(sv, kpVecs[ki])));
    if (maxSim >= KP_THRESHOLD) covered.push(concept.keyPoints[ki].id);
  }

  // --- Fehlvorstellungen (kontrastiv) ---
  const misconceptions = [];
  for (const mc of concept.misconceptions) {
    const mcVec = await embed(mc.beschreibung);
    let triggered = false;

    for (const sv of sentenceVecs) {
      const simToMC     = cosineSim(sv, mcVec);
      const maxSimToKPs = Math.max(...kpVecs.map((kv) => cosineSim(sv, kv)));

      if (simToMC >= MC_MIN && simToMC > maxSimToKPs + MC_CONTRAST) {
        triggered = true;
        break;
      }
    }

    if (triggered) misconceptions.push(mc.id);
  }

  return { covered, misconceptions, confidence: 0.85 };
}
```

---

## Task 4 — Verifikation

### Node-Test (wie bisher)
Verifiziere mit den Demo-Texten aus dem letzten Task.
Falls Schwellwerte nachkalibriert werden müssen: in 0.02er-Schritten.
Ziel: stark → 4 KPs, 0 MCs · schwach → <4 KPs, mc1 erkannt.

### Browser-Test in echtem Chrome
```bash
npm run build && npm run preview
```
- [ ] Modell lädt durch (kein Hang)
- [ ] Button wird nach Laden aktiv
- [ ] Ein Satz → sinnvolles Ergebnis

---

## Definition of Done

- [ ] `npm run lint` → 0 Errors
- [ ] `npm run build` → 0 Errors
- [ ] Node-Verifikation: Demo-Texte korrekt klassifiziert
- [ ] Browser: Modell initialisiert ohne Hang
- [ ] `@xenova/transformers` nicht mehr in package.json

## Wenn fertig
Schreibe: `## STATUS: TENSORFLOW COMPLETE`
Dokumentiere: Modell-Ladezeit im Browser + Similarity-Werte der Demo-Texte.
Warte auf Nicos Review.

---

## STATUS: TENSORFLOW COMPLETE — Browser-Hänger gelöst ✅

Erledigt am 2026-06-14. **Der ONNX/SharedArrayBuffer-Hänger ist weg** — das Modell
initialisiert jetzt im Browser.

### Tasks
- ✅ Task 1: `@xenova/transformers` deinstalliert, `@tensorflow/tfjs` +
  `@tensorflow-models/universal-sentence-encoder` installiert. xenova nicht mehr in package.json.
- ✅ Task 2: `optimizeDeps`-Block aus `vite.config.js` entfernt.
- ✅ Task 3: `classifier.js` auf TF.js USE umgeschrieben (Vertrag identisch).
  **Abweichung (wie Vorphasen, bewusst):** tfjs+USE per dynamischem `import()` in loadClassifier
  statt statisch — sonst landet ~1,9 MB im Haupt-Bundle. Jetzt eigener Lazy-Chunk (1,9 MB),
  Haupt-Bundle 315 KB. Nebeneffekt: kein ungenutzter `import * as tf` (Lint sauber).

### Kalibrierung (Node-Sweep, echte classifier.js-Funktionen)
USE ist **englisch** trainiert und bettet deutschen Text uniform hoch ein (~0.83–0.93),
daher deutlich höhere Schwellwerte als beim multilingualen Modell:
```
KP_THRESHOLD = 0.86   MC_MIN = 0.70   MC_CONTRAST = 0.045
```
Similarity-Werte der Demos (maxSim Satz↔Referenz):
```
strong  KP: kp1=0.932 kp2=0.891 kp3=0.893 kp4=0.894   (alle ≥0.86 → 4/4)
        MC: mc1 Δ=−0.004  mc2 Δ=−0.011  mc3 Δ=0.038 (<0.045)   → 0 MC
weak    KP: kp1=0.829 kp2=0.849 kp3=0.857 kp4=0.870   (nur kp4 ≥0.86 → 1/4)
        MC: mc1 Δ=0.064 ✓  mc2 Δ=0.051 ✓  mc3 Δ=0.013 (<0.045)  → [mc1,mc2]
```
Ergebnis (echte Funktionen): **strong → 4/4 KP, 0 MC** · **weak → 1/4 KP, [mc1,mc2]**
(mc1 erkannt; mc2 korrekt — der Text sagt wörtlich „Spannung und Strom sind dasselbe").

### Browser-Test (Prod-Build, `npm run preview`)
- ✅ Modell lädt durch, **kein Hang**. „Prüfen" wird nach **~4 s** aktiv.
- ✅ Erste Inferenz dauert ~15–20 s (einmaliger WebGL-Shader-Warmup), danach schnell.
- ✅ Starker Text → „Sitzt — alle Kernpunkte getroffen" + „Weiter zur Schaltung".
- ✅ Schwacher Text → „1 von 4 Kernpunkten · 2 Stolpersteine", Fehlvorstellung mc1 erkannt
  und angezeigt, „Erklärung verbessern". Browser-Ergebnis = Node-Ergebnis.
- ✅ Keine Konsolenfehler. `npm run lint` 0/0 · `npm run build` 0 Errors.
- Hinweis: getestet im Preview-Sandbox-Browser (der vorher mit ONNX hing) — TF.js läuft dort
  jetzt durch. In deinem echten Chrome/Edge sollte es genauso oder schneller sein.

### Caveats für Nico
- **Englisches Modell auf Deutsch:** Embeddings sind uniform hoch, Trennband schmal
  (KP-Lücke strong↔weak nur ~0.02). An 2 Demos kalibriert — für beliebige Azubi-Eingaben
  nicht robust. Für echten Einsatz: mehr Beispieltexte zum Kalibrieren, oder multilinguales
  USE (`use.loadQnA` ist es nicht; das mehrsprachige USE müsste man von separater TFHub-URL laden).
- **Erst-Inferenz-Warmup ~15–20 s:** evtl. ein „einen Moment…"-Hinweis beim ersten Prüfen sinnvoll
  (würde SelfExplanationScreen berühren → dein GO).
