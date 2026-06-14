// selbst-bauen.js — tf-03-parallel: Parallelschaltung

export default {
  titel: "Selbst bauen: Zwei Widerst\u00e4nde parallel",
  sicherheit:
    "Spannungsquelle trennen bevor du Bauteile wechselst. " +
    "Multimeter-Messleitungen nicht unter Spannung umstecken.",
  materialien: [
    { menge: 1, bauteil: "Widerstand 60 \u03a9" },
    { menge: 1, bauteil: "Widerstand 40 \u03a9" },
    { menge: 1, bauteil: "12 V Spannungsquelle" },
    { menge: 1, bauteil: "Multimeter" },
    { menge: 6, bauteil: "Verbindungskabel" },
    { menge: 1, bauteil: "Steckbrett" },
  ],
  schritte: [
    "R1 (60 \u03a9) und R2 (40 \u03a9) nebeneinander ins Steckbrett stecken \u2014 nicht hintereinander.",
    "Linke Klemmen beider Widerst\u00e4nde mit einem Kabel verbinden (linker Knoten).",
    "Rechte Klemmen beider Widerst\u00e4nde mit einem Kabel verbinden (rechter Knoten).",
    "Pluspol der Spannungsquelle an den linken Knoten anschlie\u00dfen.",
    "Minuspol der Spannungsquelle an den rechten Knoten anschlie\u00dfen.",
    "Spannung anlegen. Multimeter auf Gleichspannung stellen.",
    "Spannung an R1 messen \u2192 sollte 12 V zeigen.",
    "Spannung an R2 messen \u2192 sollte ebenfalls 12 V zeigen.",
    "Strom durch R1 messen (Amperemeter in Reihe mit R1) \u2192 sollte ca. 200 mA zeigen.",
    "Strom durch R2 messen (Amperemeter in Reihe mit R2) \u2192 sollte ca. 300 mA zeigen.",
    "Gesamtstrom am Pluspol messen \u2192 sollte ca. 500 mA zeigen. Stimmt I1 + I2 = I_ges?",
  ],
  abschluss:
    "Gut gemacht \u2014 du hast gesehen dass in der Parallelschaltung die Spannung " +
    "\u00fcberall gleich ist, sich der Strom aber aufteilt. " +
    "Das Gegenteil der Reihenschaltung.",
};
