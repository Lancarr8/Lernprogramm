// lernseite.js — tf-06-sicherheit: Gefahren des Stromes und Sicherheitsregeln

export default {
  eyebrow: "Lernfeld 1 \u00b7 Grundlagen",
  titel: "Gefahren des elektrischen Stromes",
  formelText:
    "Schon 10 mA durch den K\u00f6rper k\u00f6nnen gef\u00e4hrlich sein \u2014 " +
    "50 mA k\u00f6nnen t\u00f6dlich sein.",
  anker: {
    text:
      "Strom t\u00f6tet nicht durch die Spannung \u2014 sondern durch die Stromst\u00e4rke die durch den K\u00f6rper flie\u00dft. " +
      "Schon 50 Milliampere durch das Herz k\u00f6nnen zum Tod f\u00fchren. " +
      "Das ist weniger als eine LED braucht.",
    highlights: ["50 Milliampere", "weniger als eine LED"],
  },
  warum: {
    titel: "Das Warum \u00b7 Strom und K\u00f6rperwiderstand",
    punkte: [
      { label: "K\u00f6rperwiderstand",  text: "variiert: trockene Haut ~1000 \u03a9, feuchte Haut ~100 \u03a9." },
      { label: "Gefahrengrenze",     text: "ab 25 V Wechselspannung / 60 V Gleichspannung ernstes Risiko." },
      { label: "Schutzma\u00dfnahmen",   text: "Isolierung, Schutzerde, FI-Schalter, Sicherungen." },
    ],
  },
  interaktiv: {
    typ: "formel",
    formel: "5 Sicherheitsregeln (BGV A3)",
    beispiel: {
      werte: [
        "1. Freischalten",
        "2. Gegen Wiedereinschalten sichern",
        "3. Spannungsfreiheit feststellen",
        "4. Erden und Kurzschlie\u00dfen",
        "5. Benachbarte, unter Spannung stehende Teile abdecken",
      ],
      ergebnis: "Reihenfolge einhalten \u2014 jeder Schritt ist Pflicht.",
    },
  },
  teaser:
    "Gleich bist du dran: Erkl\u00e4re warum der K\u00f6rperwiderstand so wichtig ist \u2014 " +
    "und warum 230 V gef\u00e4hrlich sind, auch wenn man keinen Schlag sp\u00fcrt.",
};
