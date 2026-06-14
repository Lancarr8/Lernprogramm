// LF 3 — Steuerungen analysieren und anpassen
// 1. Ausbildungsjahr · 80 Stunden

export default {
  id: "lf-03",
  ihkNummer: 3,
  ausbildungsjahr: 1,
  zeitrichtwert: 80,
  titel: "Steuerungen analysieren und anpassen",
  inhalte: [
    "Blockschaltbild, EVA-Prinzip, Sensoren, Aktoren, Schnittstellen",
    "Wirkungskette, Funktionsbeschreibungen",
    "Verbindungs- und speicherprogrammierte Signalverarbeitung",
    "Logische Grundverknüpfungen, Speicherfunktionen",
    "Normen, Vorschriften und Regeln",
    "Technische Dokumentationen",
  ],
  themenfelder: [
    { id: "tf-01-eva", titel: "EVA-Prinzip, Sensoren und Aktoren", data: () => import("./tf-01-eva/index.js") },
    { id: "tf-02-logik", titel: "Logische Grundverknüpfungen und Speicherfunktionen", data: () => import("./tf-02-logik/index.js") },
    { id: "tf-03-sps", titel: "Speicherprogrammierte Steuerungen", data: () => import("./tf-03-sps/index.js") },
  ],
};
