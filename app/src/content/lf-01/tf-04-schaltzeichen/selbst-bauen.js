// selbst-bauen.js — tf-04-schaltzeichen

export default {
  titel: "Selbst \u00fcben: Schaltplan zeichnen",
  sicherheit: "Kein Strom n\u00f6tig \u2014 reine Zeichen\u00fcbung auf Papier.",
  materialien: [
    { menge: 1, bauteil: "Papier (kariert bevorzugt)" },
    { menge: 1, bauteil: "Bleistift und Lineal" },
    { menge: 1, bauteil: "Diese Referenzkarte (Bildschirm oder Ausdruck)" },
  ],
  schritte: [
    "Zeichne eine Gleichspannungsquelle (langer und kurzer Strich).",
    "F\u00fcge einen Widerstand in Reihe hinzu (Rechteck).",
    "Erg\u00e4nze eine LED (Dreieck + Strich + zwei Pfeile).",
    "Schlie\u00dfe den Stromkreis mit Leitungen (gerade Linien).",
    "Beschrifte: U = 5 V, R = 150 \u03a9.",
    "Zeichne eine zweite Schaltung: gleiche Bauteile, aber R und LED parallel.",
    "Vergleiche: Wo liegt der Unterschied zwischen Reihen- und Parallelschaltung im Schaltplan?",
  ],
  abschluss:
    "Wenn du einen einfachen Schaltplan zeichnen kannst, kannst du auch " +
    "fremde Schaltpl\u00e4ne lesen. Das ist die Grundlage jeder Elektroarbeit.",
};
