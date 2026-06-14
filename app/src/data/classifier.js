// classifier.js — Semantische Klassifikation via TensorFlow.js Universal Sentence Encoder.
// Kein ONNX, kein SharedArrayBuffer — läuft per WebGL (Fallback CPU) in jedem modernen Browser.
// Kontrastiver Ansatz für Fehlvorstellungen: MC feuert nur wenn ähnlicher als alle KPs.
//
// AI-GRENZE: klassifiziert nur (Embedding-Ähnlichkeit gegen die autorisierte Konzeptkarte),
// generiert keinen Fachinhalt. Vertrag:
//   (rawText, concept) => { covered: string[], misconceptions: string[], confidence: number }
//
// tfjs + USE (~1 MB+) werden dynamisch geladen (eigener Chunk), damit sie NICHT im
// Haupt-Bundle landen — erst beim ersten loadClassifier()-Aufruf nachgeladen.

// Kalibriert per Node-Sweep gegen die tf-01-uri-Demos. ACHTUNG: USE ist englisch-
// trainiert und bettet deutschen Text uniform hoch ein (~0.83–0.93) — daher die hohe
// KP-Schwelle. Das Trennband ist schmal; bei mehr Beispieltexten nachkalibrieren.
const KP_THRESHOLD = 0.86;
const MC_MIN = 0.7;
const MC_CONTRAST = 0.045;

let model = null;
let loadingPromise = null;

export async function loadClassifier(onProgress) {
  if (model) return model;
  if (loadingPromise) return loadingPromise;

  // TF.js/USE meldet keinen feinen Fortschritt — onProgress grob mit 50% / 100% bedienen.
  if (onProgress) onProgress({ status: "progress", progress: 50 });

  loadingPromise = Promise.all([
    import("@tensorflow/tfjs"), // registriert das WebGL-Backend als Side-Effect
    import("@tensorflow-models/universal-sentence-encoder"),
  ])
    .then(([, use]) => use.load())
    .then((m) => {
      model = m;
      if (onProgress) onProgress({ status: "progress", progress: 100 });
      return m;
    });

  return loadingPromise;
}

// Text → Float32-Embedding (512-dimensional)
async function embed(text) {
  const tensor = await model.embed([text]);
  const data = await tensor.data();
  tensor.dispose();
  return Array.from(data);
}

// Kosinus-Ähnlichkeit
function cosineSim(a, b) {
  let dot = 0,
    na = 0,
    nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
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

// Hauptfunktion — Vertrag identisch zur bisherigen classifyExplanation
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
      const simToMC = cosineSim(sv, mcVec);
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
