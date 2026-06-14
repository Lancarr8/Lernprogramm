// LF 11 — Prüfsysteme einrichten und anwenden
// 3. Ausbildungsjahr · 100 Stunden

export default {
  id: "lf-11",
  ihkNummer: 11,
  ausbildungsjahr: 3,
  zeitrichtwert: 100,
  titel: "Prüfsysteme einrichten und anwenden",
  inhalte: [
    "Prozessabbild",
    "Diagnosewerkzeuge, Debugger",
    "Bussysteme",
    "Programmieralgorithmen, Entwurfsdarstellungen",
    "Prüf-, Mess- und Analyseverfahren",
    "Signal- und Leistungsanpassung",
    "Zustazprüfungen, BURN-IN, Klimasimulation",
    "Prüfverfahren als Methoden des Qualitätsmanagements",
  ],
  themenfelder: [
    { id: "tf-01-pruefsysteme", titel: "Aufbau und Struktur von Prüfsystemen", data: () => import("./tf-01-pruefsysteme/index.js") },
    { id: "tf-02-pruefprogramme", titel: "Prüfprogramme erstellen und anpassen", data: () => import("./tf-02-pruefprogramme/index.js") },
    { id: "tf-03-qualitaet", titel: "Qualitätssicherung durch Prüfverfahren", data: () => import("./tf-03-qualitaet/index.js") },
  ],
};
