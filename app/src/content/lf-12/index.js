// LF 12 — Geräte und Systeme planen und realisieren
// 4. Ausbildungsjahr · 80 Stunden

export default {
  id: "lf-12",
  ihkNummer: 12,
  ausbildungsjahr: 4,
  zeitrichtwert: 80,
  titel: "Geräte und Systeme planen und realisieren",
  inhalte: [
    "Kundenauftrag",
    "Projekt- und Produktmanagement",
    "Gerätebau, Design, Ergonomie",
    "Schutzmaßnahmen",
    "Qualität, Qualitätsmerkmale, Qualitätsziele",
    "Kostenkalkulation und -abrechnung",
    "Projektpräsentation",
  ],
  themenfelder: [
    { id: "tf-01-projektmanagement", titel: "Projektmanagement und Planung", data: () => import("./tf-01-projektmanagement/index.js") },
    { id: "tf-02-realisierung", titel: "Geräte und Systeme realisieren", data: () => import("./tf-02-realisierung/index.js") },
    { id: "tf-03-praesentation", titel: "Dokumentation und Projektpräsentation", data: () => import("./tf-03-praesentation/index.js") },
  ],
};
