// lernseite.js — tf-02-reihe: Reihenschaltung

export default {
  eyebrow: "Lernfeld 1 \u00b7 Grundlagen",
  titel: "Die Reihenschaltung",
  formelText:
    "In der Reihenschaltung addieren sich die Widerst\u00e4nde \u2014 R_ges = R1 + R2 + \u2026",
  anker: {
    text:
      "Eine alte Weihnachtslichterkette: Eine Birne kaputt \u2014 alle aus. Warum? " +
      "Weil alle L\u00e4mpchen in Reihe geschaltet sind. Es gibt nur einen einzigen Weg " +
      "f\u00fcr den Strom \u2014 ist er irgendwo unterbrochen, flie\u00dft er nirgends mehr.",
    highlights: ["in Reihe", "einen einzigen Weg"],
  },
  warum: {
    titel: "Das Warum \u00b7 ein Weg, viele Verbraucher",
    punkte: [
      { label: "Strom I",       text: "flie\u00dft durch alle Bauteile \u2014 \u00fcberall gleich gro\u00df." },
      { label: "Spannung U",    text: "teilt sich auf \u2014 jeder Widerstand bekommt seinen Anteil." },
      { label: "Widerstand R",  text: "addiert sich \u2014 jeder Widerstand bremst zus\u00e4tzlich." },
    ],
  },
  interaktiv: {
    typ: "formel",
    formel: "R_ges = R1 + R2 + R3",
    beispiel: {
      werte: ["R1 = 100 \u03a9", "R2 = 150 \u03a9", "R3 = 200 \u03a9"],
      ergebnis: "R_ges = 100 + 150 + 200 = 450 \u03a9",
    },
  },
  teaser:
    "Gleich bist du dran: Erkl\u00e4re warum der Strom in einer Reihenschaltung " +
    "\u00fcberall gleich ist \u2014 die Spannung aber nicht.",
};
