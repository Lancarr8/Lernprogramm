// LF 4 — Informationstechnische Systeme bereitstellen
// 1. Ausbildungsjahr · 80 Stunden

export default {
  id: "lf-04",
  ihkNummer: 4,
  ausbildungsjahr: 1,
  zeitrichtwert: 80,
  titel: "Informationstechnische Systeme bereitstellen",
  inhalte: [
    "Funktion und Struktur des Pflichtenheftes",
    "Hardware, Betriebssysteme, Standard- und anwendungsspezifische Software",
    "Beschaffungsprozess",
    "Installations- und Konfigurationsprozesse von Hard- und Softwarekomponenten",
    "Ergonomische Arbeitsplatzgestaltung",
    "Werkzeuge und Methoden zur Diagnose und Fehlerbehebung",
    "Lokale und globale Netzwerke, Datenübertragungsprotokolle",
    "Datensicherung und Datenschutz, Urheber- und Medienrecht",
    "Präsentationstechniken und -methoden",
  ],
  themenfelder: [
    { id: "tf-01-hardware", titel: "Hardware und Betriebssysteme", data: () => import("./tf-01-hardware/index.js") },
    { id: "tf-02-netzwerke", titel: "Netzwerke und Datenübertragung", data: () => import("./tf-02-netzwerke/index.js") },
    { id: "tf-03-datenschutz", titel: "Datenschutz und Datensicherheit", data: () => import("./tf-03-datenschutz/index.js") },
  ],
};
