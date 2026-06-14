// LF 5 — Elektroenergieversorgung für Geräte und Systeme realisieren und deren Sicherheit gewährleisten
// 2. Ausbildungsjahr · 80 Stunden

export default {
  id: "lf-05",
  ihkNummer: 5,
  ausbildungsjahr: 2,
  zeitrichtwert: 80,
  titel: "Elektroenergieversorgung für Geräte und Systeme realisieren und deren Sicherheit gewährleisten",
  inhalte: [
    "Lineare Netzteile, Schaltnetzteile, Stromrichter",
    "Netzunabhängige Energieversorgung, störungs- und unterbrechungsfreie Stromversorgung",
    "Netzformen",
    "Netzabhängige und netzunabhängige Schutzmaßnahmen",
    "Technische Anschlussbedingungen, elektromagnetische Verträglichkeit (EMV)",
    "Arbeitsschutz, Unfallverhütung",
    "Blockschaltbilder, Übersichtsschaltpläne, Stromlaufpläne",
    "Kühlung",
    "Produktinformationen",
  ],
  themenfelder: [
    { id: "tf-01-netzteile", titel: "Lineare Netzteile und Schaltnetzteile", data: () => import("./tf-01-netzteile/index.js") },
    { id: "tf-02-schutz", titel: "Schutzmaßnahmen und Netzformen", data: () => import("./tf-02-schutz/index.js") },
    { id: "tf-03-emv", titel: "EMV und technische Anschlussbedingungen", data: () => import("./tf-03-emv/index.js") },
  ],
};
