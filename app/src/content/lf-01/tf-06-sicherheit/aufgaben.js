// aufgaben.js — tf-06-sicherheit

export default {
  titel: "Aufgaben: Sicherheit und Gefahren",
  aufgaben: [
    {
      id: "a1",
      typ: "multiple-choice",
      frage: "Ab welcher K\u00f6rperstromst\u00e4rke wird Wechselstrom f\u00fcr Menschen gef\u00e4hrlich?",
      optionen: ["10 mA", "100 mA", "1 A", "500 mA"],
      korrekt: 0,
      erklaerung:
        "Schon ab ca. 10 mA sind starke Muskelkr\u00e4mpfe m\u00f6glich. " +
        "Ab 50 mA durch den Herzbereich besteht Lebensgefahr durch Kammerflimmern.",
    },
    {
      id: "a2",
      typ: "berechnung",
      frage:
        "K\u00f6rperwiderstand feuchte Haut: R_K = 1000 \u03a9. Spannung: U = 230 V. " +
        "Berechne den K\u00f6rperstrom I.",
      einheit: "mA",
      loesung: 230,
      toleranz: 5,
      hinweis: "I = U / R \u2014 dann in mA umrechnen",
    },
    {
      id: "a3",
      typ: "multiple-choice",
      frage: "Was ist die korrekte Reihenfolge der 5 Sicherheitsregeln?",
      optionen: [
        "Freischalten \u2192 sichern \u2192 pr\u00fcfen \u2192 erden \u2192 abdecken",
        "Pr\u00fcfen \u2192 freischalten \u2192 erden \u2192 sichern \u2192 abdecken",
        "Abdecken \u2192 freischalten \u2192 erden \u2192 pr\u00fcfen \u2192 sichern",
        "Erden \u2192 pr\u00fcfen \u2192 freischalten \u2192 sichern \u2192 abdecken",
      ],
      korrekt: 0,
      erklaerung:
        "Die Reihenfolge ist verbindlich nach BGV A3: " +
        "1. Freischalten 2. Gegen Wiedereinschalten sichern " +
        "3. Spannungsfreiheit feststellen 4. Erden und Kurzschlie\u00dfen " +
        "5. Benachbarte Teile abdecken.",
    },
    {
      id: "a4",
      typ: "multiple-choice",
      frage: "Was macht ein FI-Schutzschalter (RCD)?",
      optionen: [
        "Er schaltet ab wenn Strom \u00fcber Schutzerde flie\u00dft (Fehlerstrom)",
        "Er schaltet ab wenn zu viel Strom flie\u00dft (wie eine Sicherung)",
        "Er misst die Spannung und schaltet bei \u00dcberspannung ab",
        "Er verhindert Kurzschl\u00fcsse in der Leitung",
      ],
      korrekt: 0,
      erklaerung:
        "Der FI-Schalter (Fehlerstrom-Schutzschalter) vergleicht Hin- und R\u00fcckstrom. " +
        "Flie\u00dft Strom \u00fcber einen K\u00f6rper zur Erde, entsteht eine Differenz \u2014 " +
        "der FI l\u00f6st in < 30 ms aus und rettet Leben.",
    },
  ],
};
