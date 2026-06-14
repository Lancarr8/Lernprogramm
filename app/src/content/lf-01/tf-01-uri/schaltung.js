// schaltung.js — tf-01-uri: Das Ohmsche Gesetz
// SVG-Schaltplan: typ auf "svg-inline" setzen und svg-Feld befüllen wenn Schaltplan vorliegt.

export default {
  titel: "Schaltung: Vorwiderstand einer LED",
  beschreibung:
    "Ein Vorwiderstand R_V begrenzt den Strom durch die LED auf den zul\u00e4ssigen Wert. " +
    "Versorgungsspannung U = 5 V, LED-Spannung U_LED = 2 V, LED-Strom I = 20 mA.",
  schaltplan: {
    typ: "beschreibung-only", // \u2192 auf "svg-inline" \u00e4ndern wenn SVG vorliegt
    svg: null,
  },
  frage: "Welchen Wert muss der Vorwiderstand R_V haben?",
  antwort: "R_V = (U \u2212 U_LED) / I = (5 V \u2212 2 V) / 0,02 A = 150 \u03a9",
  aufgebautMit: [
    "LED (beliebige Farbe)",
    "Widerstand 150 \u03a9 (Farbcode: braun\u2013gr\u00fcn\u2013braun)",
    "5 V Spannungsquelle (z.\u202fB. USB-Netzteil)",
    "Verbindungskabel",
    "Steckbrett",
  ],
};
