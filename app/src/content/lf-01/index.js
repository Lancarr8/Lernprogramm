// LF 1 — Elektrotechnische Systeme analysieren und Funktionen prüfen
// 1. Ausbildungsjahr · 80 Stunden

export default {
  id: "lf-01",
  ihkNummer: 1,
  ausbildungsjahr: 1,
  zeitrichtwert: 80,
  titel: "Elektrotechnische Systeme analysieren und Funktionen prüfen",
  inhalte: [
    "Betriebliche Strukturen, Arbeitsorganisation, betriebliche Kommunikation",
    "Produkte, Dienstleistungen",
    "Schaltpläne, Schaltzeichen",
    "Elektrische Betriebsmittel, Grundschaltungen, elektrische Grundgrößen",
    "Verhalten und Kennwerte exemplarischer Bauelemente und Funktionseinheiten",
    "Gefahren des elektrischen Stromes, Sicherheitsregeln, Arbeitsschutz",
    "Messverfahren, Funktionsprüfung, Fehlersuche",
    "Teamarbeit",
    "Methoden der Informationsbeschaffung und -aufbereitung",
  ],
  themenfelder: [
    { id: "tf-01-uri", titel: "Das Ohmsche Gesetz", data: () => import("./tf-01-uri/index.js") },
    { id: "tf-02-reihe", titel: "Reihenschaltung", data: () => import("./tf-02-reihe/index.js") },
    { id: "tf-03-parallel", titel: "Parallelschaltung", data: () => import("./tf-03-parallel/index.js") },
    { id: "tf-04-schaltzeichen", titel: "Schaltpläne und Schaltzeichen", data: () => import("./tf-04-schaltzeichen/index.js") },
    { id: "tf-05-messen", titel: "Messverfahren und Fehlersuche", data: () => import("./tf-05-messen/index.js") },
    { id: "tf-06-sicherheit", titel: "Gefahren des Stromes und Sicherheitsregeln", data: () => import("./tf-06-sicherheit/index.js") },
  ],
};
