// selbst-bauen.js — tf-05-messen

export default {
  titel: "Selbst messen: LED-Schaltung analysieren",
  sicherheit:
    "Multimeter immer erst auf den richtigen Messbereich stellen bevor du anschlie\u00dft. " +
    "Amperemeter NIEMALS parallel schalten \u2014 Kurzschluss!",
  materialien: [
    { menge: 1, bauteil: "LED-Schaltung aus tf-01-uri (oder neu aufbauen)" },
    { menge: 1, bauteil: "Multimeter" },
    { menge: 2, bauteil: "Zus\u00e4tzliche Verbindungskabel f\u00fcr Messleitungen" },
    { menge: 1, bauteil: "Steckbrett" },
  ],
  schritte: [
    "LED-Schaltung aufbauen: 5 V \u2192 R (150 \u03a9) \u2192 LED \u2192 GND.",
    "Multimeter auf Gleichspannung (DC V) stellen.",
    "Spannung an der LED messen: Messleitungen parallel zur LED anschlie\u00dfen. Notiere U_LED.",
    "Spannung am Widerstand messen: Messleitungen parallel zum Widerstand. Notiere U_R.",
    "Rechne nach: U_LED + U_R = ? (sollte 5 V ergeben).",
    "Multimeter auf Gleichstrom (DC A oder mA) stellen.",
    "Schaltung \u00f6ffnen: Kabel zwischen Widerstand und LED trennen.",
    "Amperemeter in die L\u00fccke einschleifen (in Reihe). Notiere I.",
    "Rechne nach: I = U_R / R = ? (sollte I \u00fcbereinstimmen).",
    "Optional: Widerstand durch 220 \u03a9 ersetzen. Wie \u00e4ndern sich Strom und Spannungen?",
  ],
  abschluss:
    "Du hast systematisch gemessen und das Kirchhoffsche Spannungsgesetz best\u00e4tigt: " +
    "Die Summe aller Spannungen im Kreis ist null (Quellspannung = Summe der Spannungsabf\u00e4lle).",
};
