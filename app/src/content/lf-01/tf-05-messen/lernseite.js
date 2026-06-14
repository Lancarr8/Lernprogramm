// lernseite.js — tf-05-messen: Messverfahren und Fehlersuche

export default {
  eyebrow: "Lernfeld 1 \u00b7 Grundlagen",
  titel: "Messen und Fehlersuche",
  formelText:
    "Voltmeter parallel \u2014 Amperemeter in Reihe. " +
    "Falscher Anschluss = Kurzschluss oder kein Messergebnis.",
  anker: {
    text:
      "Eine Schaltung funktioniert nicht. Statt zu raten setzt du das Multimeter an: " +
      "Spannung messen, Strom messen, Durchgang pr\u00fcfen. " +
      "Systematisch vorgehen \u2014 wie ein Arzt der einen Patienten untersucht.",
    highlights: ["Multimeter", "Systematisch", "wie ein Arzt"],
  },
  warum: {
    titel: "Das Warum \u00b7 Messen statt Raten",
    punkte: [
      { label: "Voltmeter",    text: "misst Spannung \u2014 wird parallel zum Bauteil geschaltet." },
      { label: "Amperemeter",  text: "misst Strom \u2014 wird in Reihe in den Stromkreis geschaltet." },
      { label: "Ohmmeter",     text: "misst Widerstand \u2014 nur bei abgeschalteter Spannung." },
    ],
  },
  interaktiv: {
    typ: "formel",
    formel: "Multimeter: U \u2192 parallel \u00b7 I \u2192 in Reihe \u00b7 R \u2192 spannungslos",
    beispiel: {
      werte: [
        "Spannung messen: Messleitungen an beide Klemmen des Bauteils",
        "Strom messen: Schaltung \u00f6ffnen, Amperemeter einschleifen",
        "Widerstand messen: Spannung abschalten, Bauteil ausbauen",
      ],
      ergebnis: "Falscher Anschluss des Amperemeters \u2192 Kurzschluss!",
    },
  },
  teaser:
    "Gleich bist du dran: Erkl\u00e4re warum das Voltmeter parallel und " +
    "das Amperemeter in Reihe geschaltet werden muss.",
};
