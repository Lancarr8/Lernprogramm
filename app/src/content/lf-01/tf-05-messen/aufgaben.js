// aufgaben.js — tf-05-messen: Messverfahren und Fehlersuche

export default {
  titel: "Aufgaben: Messen und Fehlersuche",
  aufgaben: [
    {
      id: "a1",
      typ: "multiple-choice",
      frage: "Wie wird ein Voltmeter in den Stromkreis geschaltet?",
      optionen: [
        "Parallel zum zu messenden Bauteil",
        "In Reihe in den Stromkreis",
        "An den Pluspol der Spannungsquelle",
        "Au\u00dferhalb des Stromkreises",
      ],
      korrekt: 0,
      erklaerung:
        "Das Voltmeter misst die Spannung zwischen zwei Punkten. " +
        "Es muss parallel liegen, damit es dieselbe Spannung abgreift \u2014 " +
        "und einen sehr hohen Innenwiderstand haben damit es den Stromkreis nicht beeinflusst.",
    },
    {
      id: "a2",
      typ: "multiple-choice",
      frage: "Was passiert wenn du ein Amperemeter parallel schaltest?",
      optionen: [
        "Kurzschluss \u2014 das Amperemeter hat sehr kleinen Widerstand",
        "Es misst den Strom korrekt",
        "Es misst die Spannung statt des Stroms",
        "Nichts passiert",
      ],
      korrekt: 0,
      erklaerung:
        "Ein Amperemeter hat einen sehr kleinen Innenwiderstand \u2014 fast null. " +
        "Parallel geschaltet \u00fcberbr\u00fcckt es das Bauteil und erzeugt einen Kurzschluss.",
    },
    {
      id: "a3",
      typ: "multiple-choice",
      frage: "Eine LED leuchtet nicht. Welcher erste Messschritt ist sinnvoll?",
      optionen: [
        "Spannung an der LED messen (Voltmeter parallel zur LED)",
        "Widerstand der LED messen (unter Spannung)",
        "Strom durch die Leitung zum Widerstand messen",
        "Die Schaltung komplett zerlegen",
      ],
      korrekt: 0,
      erklaerung:
        "Systematische Fehlersuche: Zuerst pr\u00fcfen ob \u00fcberhaupt Spannung anliegt. " +
        "Wenn keine Spannung an der LED \u2192 Unterbrechung vorher suchen. " +
        "Wenn Spannung da aber kein Licht \u2192 LED defekt.",
    },
    {
      id: "a4",
      typ: "multiple-choice",
      frage: "Wann darf der Widerstand mit dem Ohmmeter gemessen werden?",
      optionen: [
        "Nur bei abgeschalteter Spannung und ausgebautem Bauteil",
        "Immer, auch unter Betriebsspannung",
        "Nur wenn der Strom unter 1 A ist",
        "Nur bei Gleichstromschaltungen",
      ],
      korrekt: 0,
      erklaerung:
        "Das Ohmmeter legt selbst eine kleine Messspannung an. " +
        "Externe Spannung w\u00fcrde das Ger\u00e4t besch\u00e4digen. " +
        "Parallelwege in der Schaltung verf\u00e4lschen das Ergebnis \u2014 daher Bauteil ausbauen.",
    },
  ],
};
