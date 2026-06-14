// selbst-bauen.js — tf-02-reihe: Reihenschaltung

export default {
  titel: "Selbst bauen: Spannungsteiler mit zwei Widerst\u00e4nden",
  sicherheit:
    "Spannungsquelle trennen bevor du Bauteile wechselst oder umsteckst. " +
    "Multimeter-Messleitungen nicht unter Spannung umstecken.",
  materialien: [
    { menge: 1, bauteil: "Widerstand 100 \u03a9 (braun\u2013schwarz\u2013braun)" },
    { menge: 1, bauteil: "Widerstand 200 \u03a9 (rot\u2013schwarz\u2013braun)" },
    { menge: 1, bauteil: "12 V Spannungsquelle" },
    { menge: 1, bauteil: "Multimeter" },
    { menge: 4, bauteil: "Verbindungskabel" },
    { menge: 1, bauteil: "Steckbrett" },
  ],
  schritte: [
    "R1 (100 \u03a9) und R2 (200 \u03a9) hintereinander ins Steckbrett stecken \u2014 eine Klemme von R1 direkt mit einer Klemme von R2 verbinden.",
    "Pluspol der Spannungsquelle mit der freien Klemme von R1 verbinden.",
    "Minuspol der Spannungsquelle mit der freien Klemme von R2 verbinden.",
    "Spannung anlegen. Multimeter auf Gleichspannung (DC) stellen.",
    "Gesamtspannung messen: Multimeter-Spitzen an Plus- und Minuspol der Quelle \u2192 sollte 12 V zeigen.",
    "Spannung an R1 messen: Multimeter-Spitzen an beide Klemmen von R1 \u2192 sollte ca. 4 V zeigen.",
    "Spannung an R2 messen: Multimeter-Spitzen an beide Klemmen von R2 \u2192 sollte ca. 8 V zeigen.",
    "Rechne nach: U_R1 + U_R2 = ? \u2014 Stimmt das Ergebnis mit der Gesamtspannung \u00fcberein?",
    "Optional: R1 durch 200 \u03a9 ersetzen \u2014 wie ver\u00e4ndern sich die Spannungen?",
  ],
  abschluss:
    "Gut gemacht \u2014 du hast gesehen wie sich die Spannung in einer Reihenschaltung " +
    "proportional zu den Widerst\u00e4nden aufteilt. Das nennt man Spannungsteiler.",
};
