// self-explanation.js — tf-05-messen

export default {
  prompt:
    "Warum muss das Voltmeter parallel und das Amperemeter in Reihe " +
    "geschaltet werden?",
  hint:
    "Denk an den Innenwiderstand der Messger\u00e4te: " +
    "Voltmeter sehr hoch, Amperemeter sehr niedrig.",
  keyPoints: [
    {
      id: "kp1",
      label: "Voltmeter misst Spannung zwischen zwei Punkten",
      canonical:
        "Das Voltmeter wird parallel zum Bauteil geschaltet, " +
        "um die Spannung zwischen zwei Punkten zu messen.",
      nudge:
        "Was will das Voltmeter messen \u2014 und wie muss es daf\u00fcr angeschlossen sein?",
    },
    {
      id: "kp2",
      label: "Voltmeter hat sehr hohen Innenwiderstand",
      canonical:
        "Der hohe Innenwiderstand des Voltmeters verhindert dass es " +
        "den Stromkreis beeinflusst \u2014 es flie\u00dft kaum Strom durch das Ger\u00e4t.",
      nudge:
        "Warum darf ein Voltmeter den Stromkreis nicht beeinflussen \u2014 " +
        "und wie wird das technisch gel\u00f6st?",
    },
    {
      id: "kp3",
      label: "Amperemeter in Reihe \u2014 kleiner Innenwiderstand",
      canonical:
        "Das Amperemeter wird in Reihe geschaltet damit der gesamte Strom " +
        "durch das Ger\u00e4t flie\u00dft. Sein sehr kleiner Innenwiderstand " +
        "verhindert eine Verf\u00e4lschung.",
      nudge:
        "Warum muss der Strom komplett durch das Amperemeter flie\u00dfen \u2014 " +
        "und warum braucht es einen kleinen Innenwiderstand?",
    },
  ],
  misconceptions: [
    {
      id: "mc1",
      label: "Amperemeter parallel schalten",
      beschreibung:
        "Das Amperemeter kann wie das Voltmeter parallel geschaltet werden.",
      fix:
        "Niemals! Das Amperemeter hat fast keinen Widerstand. " +
        "Parallel geschaltet erzeugt es einen Kurzschluss \u2014 " +
        "Sicherung l\u00f6st aus oder das Ger\u00e4t wird zerst\u00f6rt.",
    },
    {
      id: "mc2",
      label: "Widerstand unter Spannung messen",
      beschreibung:
        "Man kann den Widerstand mit dem Ohmmeter auch unter Betriebsspannung messen.",
      fix:
        "Externe Spannung besch\u00e4digt das Ohmmeter. " +
        "Immer erst Spannung abschalten und das Bauteil nach M\u00f6glichkeit ausbauen " +
        "damit Parallelwege das Ergebnis nicht verf\u00e4lschen.",
    },
  ],
  praiseDeepening:
    "Gut erkl\u00e4rt. Vertiefung: Was ist die Halbierungsmethode bei der Fehlersuche \u2014 " +
    "und warum ist sie effizienter als Messen von Punkt zu Punkt?",
};
