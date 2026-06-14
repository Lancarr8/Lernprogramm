// aufgaben.js — tf-03-parallel: Parallelschaltung

export default {
  titel: "Aufgaben: Parallelschaltung",
  aufgaben: [
    {
      id: "a1",
      typ: "berechnung",
      frage: "R1 = 100 \u03a9, R2 = 100 \u03a9 parallel \u2014 berechne R_ges.",
      einheit: "\u03a9",
      loesung: 50,
      toleranz: 1,
      hinweis: "R_ges = (R1 \u00b7 R2) / (R1 + R2)",
    },
    {
      id: "a2",
      typ: "berechnung",
      frage: "U = 12 V, R1 = 60 \u03a9, R2 = 40 \u03a9 parallel. Wie gro\u00df ist I_ges?",
      einheit: "A",
      loesung: 0.5,
      toleranz: 0.01,
      hinweis: "I1 = U/R1, I2 = U/R2, I_ges = I1 + I2",
    },
    {
      id: "a3",
      typ: "multiple-choice",
      frage: "Was passiert mit R_ges wenn du einen dritten Widerstand parallel schaltest?",
      optionen: [
        "R_ges wird kleiner",
        "R_ges wird gr\u00f6\u00dfer",
        "R_ges bleibt gleich",
        "R_ges wird null",
      ],
      korrekt: 0,
      erklaerung:
        "Jeder zus\u00e4tzliche Parallelzweig bietet dem Strom einen weiteren Weg \u2014 " +
        "der Gesamtwiderstand sinkt, der Gesamtstrom steigt.",
    },
    {
      id: "a4",
      typ: "multiple-choice",
      frage: "Wo ist der Unterschied zur Reihenschaltung?",
      optionen: [
        "Bei Parallel: Spannung gleich, Strom teilt sich auf",
        "Bei Parallel: Strom gleich, Spannung teilt sich auf",
        "Bei beiden: Spannung und Strom gleich",
        "Kein Unterschied",
      ],
      korrekt: 0,
      erklaerung:
        "Reihenschaltung: Strom gleich, Spannung teilt sich. " +
        "Parallelschaltung: Spannung gleich, Strom teilt sich. Genau umgekehrt.",
    },
  ],
};
