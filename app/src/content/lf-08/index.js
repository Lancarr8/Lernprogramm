// LF 8 — Geräte herstellen und prüfen
// 2. Ausbildungsjahr · 60 Stunden

export default {
  id: "lf-08",
  ihkNummer: 8,
  ausbildungsjahr: 2,
  zeitrichtwert: 60,
  titel: "Geräte herstellen und prüfen",
  inhalte: [
    "Gehäuse und mechanische Bauteile, technische Zeichnungen",
    "Schutzklassen, Schutzgrade, Wärmeableitung",
    "Aktive und passive Sensoren",
    "Elektromechanische, pneumatische und hydraulische Komponenten von Geräten",
    "Kleinmotoren",
    "AD- und DA-Umsetzer",
    "Verbindungs- und Anschlusstechniken",
    "Schutzmaßnahmen, Arbeitsschutz- und Unfallverhütungsvorschriften",
    "Filter, Abschirmung",
    "Qualitätssicherung",
  ],
  themenfelder: [
    { id: "tf-01-gehaeuse", titel: "Gehäuse und mechanische Bauteile", data: () => import("./tf-01-gehaeuse/index.js") },
    { id: "tf-02-sensoren", titel: "Sensoren, Aktoren und AD/DA-Umsetzer", data: () => import("./tf-02-sensoren/index.js") },
    { id: "tf-03-qualitaet", titel: "Qualitätssicherung und Prüfung", data: () => import("./tf-03-qualitaet/index.js") },
  ],
};
