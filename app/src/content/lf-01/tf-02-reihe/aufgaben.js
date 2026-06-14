// aufgaben.js — tf-02-reihe: Reihenschaltung

export default {
  titel: "Aufgaben: Reihenschaltung",
  aufgaben: [
    {
      id: "a1",
      typ: "berechnung",
      frage: "R1 = 100 \u03a9, R2 = 220 \u03a9 \u2014 berechne R_ges.",
      einheit: "\u03a9",
      loesung: 320,
      toleranz: 2,
      hinweis: "R_ges = R1 + R2",
    },
    {
      id: "a2",
      typ: "berechnung",
      frage: "U = 12 V, R1 = 100 \u03a9, R2 = 200 \u03a9. Wie gro\u00df ist die Spannung an R1?",
      einheit: "V",
      loesung: 4,
      toleranz: 0.1,
      hinweis: "Erst I = U / R_ges berechnen, dann U1 = I \u00b7 R1",
    },
    {
      id: "a3",
      typ: "multiple-choice",
      frage: "Wie verh\u00e4lt sich der Strom in einer Reihenschaltung?",
      optionen: [
        "\u00dcberall gleich gro\u00df",
        "Nach jedem Widerstand kleiner",
        "Nach jedem Widerstand gr\u00f6\u00dfer",
        "H\u00e4ngt von der Gr\u00f6\u00dfe des Widerstands ab",
      ],
      korrekt: 0,
      erklaerung:
        "In der Reihenschaltung gibt es nur einen Weg f\u00fcr den Strom. " +
        "Er flie\u00dft durch jeden Widerstand hindurch \u2014 nirgends wird er mehr oder weniger.",
    },
    {
      id: "a4",
      typ: "berechnung",
      frage:
        "3 LEDs mit je U_LED = 2 V werden in Reihe geschaltet. " +
        "Welche Versorgungsspannung wird mindestens ben\u00f6tigt?",
      einheit: "V",
      loesung: 6,
      toleranz: 0,
      hinweis: "U_ges = U1 + U2 + U3",
    },
  ],
};
