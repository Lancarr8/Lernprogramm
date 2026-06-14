// aufgaben.js — tf-01-uri: Das Ohmsche Gesetz
// Inhalt von Nico geprüft und freigegeben.

export default {
  titel: "Aufgaben: Das Ohmsche Gesetz",
  aufgaben: [
    {
      id: "a1",
      typ: "berechnung",
      frage: "R = 100 \u03a9, U = 12 V \u2014 berechne I.",
      einheit: "A",
      loesung: 0.12,
      toleranz: 0.005,
      hinweis: "I = U / R",
    },
    {
      id: "a2",
      typ: "berechnung",
      frage: "I = 0,5 A, U = 230 V \u2014 berechne R.",
      einheit: "\u03a9",
      loesung: 460,
      toleranz: 1,
      hinweis: "R = U / I",
    },
    {
      id: "a3",
      typ: "multiple-choice",
      frage: "R wird verdoppelt, U bleibt gleich. Was passiert mit I?",
      optionen: ["I verdoppelt sich", "I halbiert sich", "I bleibt gleich", "I wird null"],
      korrekt: 1,
      erklaerung: "I = U / R \u2014 doppelter R bedeutet halber Strom.",
    },
    {
      id: "a4",
      typ: "berechnung",
      frage: "LED: U_LED = 2 V, I = 20 mA, Versorgung U = 5 V \u2014 wie gro\u00df ist R_V?",
      einheit: "\u03a9",
      loesung: 150,
      toleranz: 5,
      hinweis: "R_V = (U \u2212 U_LED) / I",
    },
  ],
};
