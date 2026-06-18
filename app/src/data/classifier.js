// classifier.js — Klassifikation des Azubi-Freitexts gegen die autorisierte
// Konzept-Karte. Synchron, regelbasiert (Regex-Heuristik), kein Modell, kein
// Download, sofort, voll offline.
//
// AI-GRENZE: klassifiziert NUR — vergleicht den Text gegen die autorisierten
// test()-Heuristiken der Konzept-Karte und generiert keinen Fachinhalt. Vertrag:
//   (rawText, concept) => { covered: string[], misconceptions: string[], confidence: number }
//
// Hintergrund: Der frühere Embedding-Ansatz (TF.js USE / ONNX) wurde verworfen —
// englisches Modell auf Deutsch war fragil und konnte Polarität (richtig vs. falsch)
// nicht trennen; multilinguale Modelle initialisieren im Browser nicht (siehe Roadmap).
// Die autorisierten Regex-Heuristiken sind polaritätssicher und für die geprüften
// Konzept-Karten zuverlässig.

export function classifyExplanation(rawText, concept) {
  const t = rawText.toLowerCase().replace(/\s+/g, " ");
  return {
    covered: concept.keyPoints.filter((k) => typeof k.test === "function" && k.test(t)).map((k) => k.id),
    misconceptions: concept.misconceptions
      .filter((m) => typeof m.test === "function" && m.test(t))
      .map((m) => m.id),
    confidence: 0.5,
  };
}
