// schaltung.js — tf-02-reihe: Reihenschaltung

export default {
  titel: "Schaltung: Spannungsteiler mit zwei Widerst\u00e4nden",
  beschreibung:
    "R1 = 100 \u03a9 und R2 = 200 \u03a9 liegen in Reihe an U = 12 V. " +
    "Verbinde die Bauteile so dass der Strom flie\u00dfen kann. " +
    "Beobachte dann wie sich die Spannung aufteilt.",
  schaltplan: {
    typ: "interaktiv",
    canvas: { width: 520, height: 260 },
    bauteile: [
      { id: "bat", typ: "batterie",   label: "U = 12 V", cx: 80,  cy: 150 },
      { id: "r1",  typ: "widerstand", label: "R1 = 100 \u03a9", cx: 220, cy: 70  },
      { id: "r2",  typ: "widerstand", label: "R2 = 200 \u03a9", cx: 370, cy: 70  },
    ],
    loesung: [
      { von: "bat.plus",  zu: "r1.links"  },
      { von: "r1.rechts", zu: "r2.links"  },
      { von: "r2.rechts", zu: "bat.minus" },
    ],
    hinweis:
      "Verbinde Batterie\u2011Plus \u2192 R1 \u2192 R2 \u2192 Batterie\u2011Minus. " +
      "Alle drei in einem Weg hintereinander.",
  },
  frage: "Wie gro\u00df ist die Spannung an R2?",
  antwort:
    "I = U / R_ges = 12 V / 300 \u03a9 = 40 mA\n" +
    "U_R2 = I \u00b7 R2 = 40 mA \u00b7 200 \u03a9 = 8 V\n" +
    "Probe: U_R1 = 40 mA \u00b7 100 \u03a9 = 4 V \u2192 4 V + 8 V = 12 V \u2713",
  aufgebautMit: [
    "Widerstand 100 \u03a9 (braun\u2013schwarz\u2013braun)",
    "Widerstand 200 \u03a9 (rot\u2013schwarz\u2013braun)",
    "12 V Spannungsquelle",
    "Multimeter",
    "Verbindungskabel",
    "Steckbrett",
  ],
};
