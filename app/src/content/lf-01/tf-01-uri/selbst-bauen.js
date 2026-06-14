// selbst-bauen.js — tf-01-uri: Das Ohmsche Gesetz

export default {
  titel: "Selbst bauen: LED mit Vorwiderstand",
  sicherheit:
    "Trenne die Spannungsquelle bevor du Bauteile wechselst oder umsteckst.",
  materialien: [
    { menge: 1, bauteil: "LED (beliebige Farbe)" },
    { menge: 1, bauteil: "Widerstand 150 \u03a9 (braun\u2013gr\u00fcn\u2013braun)" },
    { menge: 1, bauteil: "5 V Spannungsquelle (z.\u202fB. USB-Netzteil)" },
    { menge: 2, bauteil: "Verbindungskabel" },
    { menge: 1, bauteil: "Steckbrett" },
  ],
  schritte: [
    "Widerstand (150 \u03a9) ins Steckbrett stecken.",
    "LED ins Steckbrett stecken \u2014 langes Bein (Anode) zum Widerstand hin.",
    "Pluspol der Spannungsquelle mit dem freien Ende des Widerstands verbinden.",
    "Minuspol der Spannungsquelle mit der Kathode (kurzes Bein) der LED verbinden.",
    "Spannung anlegen \u2014 LED leuchtet bei korrektem Aufbau.",
    "Widerstand durch 220 \u03a9 ersetzen \u2014 beobachte wie die LED dunkler wird.",
    "Widerstand durch 47 \u03a9 ersetzen \u2014 LED wird heller (Grenzwert beachten!).",
  ],
  abschluss:
    "Gut gemacht \u2014 du hast das Ohmsche Gesetz in der Praxis angewendet und " +
    "erlebt wie Widerstand und Strom direkt zusammenh\u00e4ngen.",
};
