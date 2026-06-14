// LF 13 — Fertigungs- und Prüfsysteme in Stand halten
// 4. Ausbildungsjahr · 60 Stunden

export default {
  id: "lf-13",
  ihkNummer: 13,
  ausbildungsjahr: 4,
  zeitrichtwert: 60,
  titel: "Fertigungs- und Prüfsysteme in Stand halten",
  inhalte: [
    "Instandhaltungskonzepte",
    "Instandhaltungsmanagement",
    "Fertigungs- und Prüfeinrichtungen",
    "Soll-Ist-Vergleich",
    "Qualitätsmanagement",
    "Fehler, Fehleranalyse",
    "Wirtschaftlichkeit",
  ],
  themenfelder: [
    { id: "tf-01-konzepte", titel: "Instandhaltungskonzepte und -management", data: () => import("./tf-01-konzepte/index.js") },
    { id: "tf-02-analyse", titel: "Fehler- und Verschleißanalyse", data: () => import("./tf-02-analyse/index.js") },
    { id: "tf-03-wirtschaftlichkeit", titel: "Wirtschaftlichkeit und Qualitätsmanagement", data: () => import("./tf-03-wirtschaftlichkeit/index.js") },
  ],
};
