// lernseite.js — tf-04-schaltzeichen: Schaltpl\u00e4ne und Schaltzeichen

export default {
  eyebrow: "Lernfeld 1 \u00b7 Grundlagen",
  titel: "Schaltpl\u00e4ne und Schaltzeichen",
  formelText:
    "Schaltzeichen sind die Sprache der Elektrotechnik \u2014 " +
    "genormt nach DIN EN 60617.",
  anker: {
    text:
      "Ein Schaltplan ist wie eine Landkarte f\u00fcr Elektriker. " +
      "Wer die Zeichen kennt, kann jede Schaltung lesen \u2014 " +
      "egal ob sie in Deutschland, Japan oder den USA gebaut wurde. " +
      "Genormte Symbole machen das m\u00f6glich.",
    highlights: ["Landkarte", "genormt", "jede Schaltung lesen"],
  },
  warum: {
    titel: "Das Warum \u00b7 Symbole statt Zeichnungen",
    punkte: [
      { label: "Eindeutigkeit",  text: "Jedes Symbol hat weltweit genau eine Bedeutung." },
      { label: "Effizienz",      text: "Komplexe Bauteile werden auf ein einfaches Symbol reduziert." },
      { label: "Normierung",     text: "DIN EN 60617 legt alle Symbole verbindlich fest." },
    ],
  },
  interaktiv: {
    typ: "formel",
    formel: "Schaltzeichen \u2192 DIN EN 60617",
    beispiel: {
      werte: [
        "Widerstand: Rechteck",
        "Spannungsquelle: Langer + kurzer Strich",
        "LED: Dreieck + Strich + Pfeile",
        "Schalter: Linie mit L\u00fccke",
        "Kondensator: Zwei parallele Striche",
      ],
      ergebnis: "Alle Symbole sind international g\u00fcltig nach IEC 60617.",
    },
  },
  teaser:
    "Gleich bist du dran: Erkl\u00e4re was ein Schaltplan zeigt und " +
    "warum genormte Schaltzeichen wichtig sind.",
};
