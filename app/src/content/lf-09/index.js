// LF 9 — Geräte und Systeme in Stand halten
// 3. Ausbildungsjahr · 100 Stunden

export default {
  id: "lf-09",
  ihkNummer: 9,
  ausbildungsjahr: 3,
  zeitrichtwert: 100,
  titel: "Geräte und Systeme in Stand halten",
  inhalte: [
    "Normen und Richtlinien der Instandhaltung",
    "Prozessabbild, Servicemanual, geräte- und bauteilspezifische Datenbllätter",
    "Schaltungsanalyse auf Baugruppen- und Bauelementebene",
    "Fehlersuchstrategien",
    "Diagnoseverfahren und Wartungssysteme, auch prozessdatenbezogen",
    "Entsorgung",
    "Ausfallursachen",
    "Qualitätsmanagement",
    "Installation, Konfiguration und Update von Hard- und Softwarekomponenten",
  ],
  themenfelder: [
    { id: "tf-01-instandhaltung", titel: "Normen und Richtlinien der Instandhaltung", data: () => import("./tf-01-instandhaltung/index.js") },
    { id: "tf-02-fehlersuche", titel: "Fehlersuchstrategien und Diagnose", data: () => import("./tf-02-fehlersuche/index.js") },
    { id: "tf-03-wartung", titel: "Wartung, Reparatur und Dokumentation", data: () => import("./tf-03-wartung/index.js") },
  ],
};
