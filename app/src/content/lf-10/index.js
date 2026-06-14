// LF 10 — Fertigungsanlagen einrichten
// 3. Ausbildungsjahr · 80 Stunden

export default {
  id: "lf-10",
  ihkNummer: 10,
  ausbildungsjahr: 3,
  zeitrichtwert: 80,
  titel: "Fertigungsanlagen einrichten",
  inhalte: [
    "Ablaufsteuerung",
    "Verknüpfungssteuerung",
    "Kompakte, modulare und computergestützte Steuerungen",
    "Anlagensicherheit durch Hardware und Programmierung",
    "Informationstechnische Schutzziele: Verfügbarkeit, Integrität, Vertraulichkeit, Authentizität",
    "Fertigungstoleranzen",
    "Elektromechanische, hydraulische und pneumatische Komponenten",
    "Unfallverhütungsvorschriften",
    "Qualitätsmanagement bei Fertigungsprozessen",
    "Prozessoptimierung",
  ],
  themenfelder: [
    { id: "tf-01-steuerungen", titel: "Ablauf- und Verknüpfungssteuerungen", data: () => import("./tf-01-steuerungen/index.js") },
    { id: "tf-02-sicherheit", titel: "Anlagensicherheit und Schutzmaßnahmen", data: () => import("./tf-02-sicherheit/index.js") },
    { id: "tf-03-optimierung", titel: "Prozessoptimierung und Qualitätsmanagement", data: () => import("./tf-03-optimierung/index.js") },
  ],
};
