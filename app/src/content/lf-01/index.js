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
    {
      id: "tf-01-uri",
      titel: "Das Ohmsche Gesetz",
      data: () => import("./tf-01-uri/index.js"),
    },
    // TODO: Nico — weitere Themenbereiche aus den Inhalten ableiten
    // Vorschläge: Schaltzeichen + Schaltpläne lesen, Reihen-/Parallelschaltung,
    // Bauelemente (R/C/L), Messverfahren, Sicherheitsregeln
  ],
};
