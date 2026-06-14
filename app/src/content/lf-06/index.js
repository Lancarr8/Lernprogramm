// LF 6 — Elektronische Baugruppen von Geräten konzipieren, herstellen und prüfen
// 2. Ausbildungsjahr · 60 Stunden

export default {
  id: "lf-06",
  ihkNummer: 6,
  ausbildungsjahr: 2,
  zeitrichtwert: 60,
  titel: "Elektronische Baugruppen von Geräten konzipieren, herstellen und prüfen",
  inhalte: [
    "Methoden der Schaltungsanalyse und -synthese",
    "Kennlinien und Bauformen linearer und nichtlinearer Bauelemente, Datenbllätter",
    "Beschaffung gerätespezifischer Daten, Bauteilbibliotheken und Datenbanken",
    "Analoge und digitale Signale",
    "Kostenkalkulation und Beschaffungsprozess",
    "Herstellungs- und Bestückungsverfahren",
    "Messmittel und -verfahren",
  ],
  themenfelder: [
    { id: "tf-01-schaltungsanalyse", titel: "Schaltungsanalyse und -synthese", data: () => import("./tf-01-schaltungsanalyse/index.js") },
    { id: "tf-02-bauelemente", titel: "Bauelemente, Kennlinien und Datenbllätter", data: () => import("./tf-02-bauelemente/index.js") },
    { id: "tf-03-leiterplatte", titel: "Herstellungs- und Bestückungsverfahren", data: () => import("./tf-03-leiterplatte/index.js") },
  ],
};
