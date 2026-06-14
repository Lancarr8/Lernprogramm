// schaltung.js — tf-01-uri: Das Ohmsche Gesetz
// Interaktiver Schaltungsaufbau: User verbindet die Klemmen per Klick.

export default {
  titel: "Schaltung: Vorwiderstand einer LED",
  beschreibung:
    "Ein Vorwiderstand R_V begrenzt den Strom durch die LED auf den zulässigen Wert. " +
    "Die Versorgungsspannung beträgt U = 5 V, die LED benötigt U_LED = 2 V bei I = 20 mA. " +
    "Am Vorwiderstand fallen die restlichen 3 V ab.",
  schaltplan: {
    typ: "interaktiv",
    canvas: { width: 520, height: 260 },
    bauteile: [
      { id: "bat", typ: "batterie", label: "U = 5 V", cx: 80, cy: 140 },
      { id: "r1", typ: "widerstand", label: "R_V = 150 Ω", cx: 220, cy: 70 },
      { id: "led1", typ: "led", label: "LED", cx: 370, cy: 70 },
    ],
    // Terminals pro Typ liegen fix im Code (CircuitBuilder.getTerminals):
    //   batterie:   plus=(cx, cy-35)   minus=(cx, cy+35)
    //   widerstand: links=(cx-40, cy)  rechts=(cx+40, cy)
    //   led:        anode=(cx-25, cy)  kathode=(cx+25, cy)
    loesung: [
      { von: "bat.plus", zu: "r1.links" },
      { von: "r1.rechts", zu: "led1.anode" },
      { von: "led1.kathode", zu: "bat.minus" },
    ],
    hinweis:
      "Verbinde die Klemmen so, dass der Strom vom + Pol der Batterie durch Widerstand und LED zurück zum − Pol fließt.",
  },
  frage: "Welchen Wert muss der Vorwiderstand R_V haben, damit die LED nicht durchbrennt?",
  antwort:
    "R_V = (U − U_LED) / I = (5 V − 2 V) / 0,02 A = 150 Ω\n" +
    "Am Widerstand fallen 3 V ab, an der LED 2 V — zusammen 5 V.",
  aufgebautMit: [
    "LED (beliebige Farbe)",
    "Widerstand 150 Ω (Farbcode: braun–grün–braun)",
    "5 V Spannungsquelle (z. B. USB-Netzteil)",
    "Verbindungskabel",
    "Steckbrett",
  ],
};
