// LF 2 — Elektrische Installationen planen und ausführen
// 1. Ausbildungsjahr · 80 Stunden

export default {
  id: "lf-02",
  ihkNummer: 2,
  ausbildungsjahr: 1,
  zeitrichtwert: 80,
  titel: "Elektrische Installationen planen und ausführen",
  inhalte: [
    "Auftragsplanung, Auftragsrealisierung",
    "Energiebedarf einer Anlage oder eines Gerätes",
    "Sicherheitsbestimmungen",
    "Installationstechnik",
    "Betriebsmittelkenndaten",
    "Schaltplanarten",
    "Leitungsdimensionierung",
    "Arbeitsorganisation",
    "Kostenberechnung, Angebotserstellung",
  ],
  themenfelder: [
    { id: "tf-01-installation", titel: "Elektrische Installation planen", data: () => import("./tf-01-installation/index.js") },
    { id: "tf-02-leitungen", titel: "Leitungsdimensionierung", data: () => import("./tf-02-leitungen/index.js") },
    { id: "tf-03-schutz", titel: "Sicherheitsbestimmungen und Schutzmaßnahmen", data: () => import("./tf-03-schutz/index.js") },
    { id: "tf-04-kosten", titel: "Kostenberechnung und Angebotserstellung", data: () => import("./tf-04-kosten/index.js") },
  ],
};
