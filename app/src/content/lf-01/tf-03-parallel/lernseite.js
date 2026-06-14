// lernseite.js — tf-03-parallel: Parallelschaltung

export default {
  eyebrow: "Lernfeld 1 \u00b7 Grundlagen",
  titel: "Die Parallelschaltung",
  formelText:
    "In der Parallelschaltung teilt sich der Strom auf \u2014 " +
    "1/R_ges = 1/R1 + 1/R2",
  anker: {
    text:
      "Jede Steckdose in deiner Wohnung hat 230 V \u2014 egal ob du eine Lampe " +
      "oder einen Fernseher anschlie\u00dft. Alle Ger\u00e4te liegen parallel: " +
      "gleiche Spannung f\u00fcr alle, jedes zieht sich seinen eigenen Strom.",
    highlights: ["parallel", "gleiche Spannung", "eigenen Strom"],
  },
  warum: {
    titel: "Das Warum \u00b7 viele Wege, eine Spannung",
    punkte: [
      { label: "Spannung U",   text: "ist an jedem Zweig gleich gro\u00df: U1 = U2 = U_ges." },
      { label: "Strom I",      text: "teilt sich auf: I_ges = I1 + I2." },
      { label: "Widerstand R", text: "R_ges ist kleiner als der kleinste Einzelwiderstand." },
    ],
  },
  interaktiv: {
    typ: "formel",
    formel: "R_ges = (R1 \u00b7 R2) / (R1 + R2)",
    beispiel: {
      werte: ["R1 = 100 \u03a9", "R2 = 100 \u03a9"],
      ergebnis: "R_ges = (100 \u00b7 100) / (100 + 100) = 50 \u03a9",
    },
  },
  teaser:
    "Gleich bist du dran: Erkl\u00e4re warum der Gesamtwiderstand in einer " +
    "Parallelschaltung kleiner wird wenn du mehr Widerst\u00e4nde hinzuf\u00fcgst.",
};
