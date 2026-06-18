// self-explanation.js — tf-05-messen
// Autorisierte Konzept-Karte. test() = Regex-Heuristik (CC-Erstfassung aus den
// canonical-Texten abgeleitet — von Nico zu prüfen/verfeinern).

export default {
  prompt: "Warum muss das Voltmeter parallel und das Amperemeter in Reihe geschaltet werden?",
  hint:
    "Denk an den Innenwiderstand der Messgeräte: Voltmeter sehr hoch, Amperemeter sehr niedrig.",
  keyPoints: [
    {
      id: "kp1",
      label: "Voltmeter misst Spannung zwischen zwei Punkten",
      canonical:
        "Das Voltmeter wird parallel zum Bauteil geschaltet, um die Spannung zwischen zwei Punkten zu messen.",
      nudge: "Was will das Voltmeter messen — und wie muss es dafür angeschlossen sein?",
      test: (t) =>
        /voltmeter/.test(t) &&
        /(parallel|spannung|zwischen|über (dem|das)|an beiden|an den klemmen)/.test(t),
    },
    {
      id: "kp2",
      label: "Voltmeter hat sehr hohen Innenwiderstand",
      canonical:
        "Der hohe Innenwiderstand des Voltmeters verhindert dass es den Stromkreis beeinflusst — es fließt kaum Strom durch das Gerät.",
      nudge:
        "Warum darf ein Voltmeter den Stromkreis nicht beeinflussen — und wie wird das technisch gelöst?",
      test: (t) =>
        /voltmeter/.test(t) &&
        /(hoh\w*[^.]{0,15}widerstand|hochohmig|kaum strom|fast kein strom|kein strom|beeinfluss\w*)/.test(t),
    },
    {
      id: "kp3",
      label: "Amperemeter in Reihe — kleiner Innenwiderstand",
      canonical:
        "Das Amperemeter wird in Reihe geschaltet damit der gesamte Strom durch das Gerät fließt. Sein sehr kleiner Innenwiderstand verhindert eine Verfälschung.",
      nudge:
        "Warum muss der Strom komplett durch das Amperemeter fließen — und warum braucht es einen kleinen Innenwiderstand?",
      test: (t) =>
        /amperemeter/.test(t) &&
        /(in reihe|reihe|gesamte\w* strom|ganze\w* strom|durchfließ\w*|durch.*fließ\w*|klein\w*[^.]{0,15}widerstand|niederohmig|geringe\w* widerstand)/.test(t),
    },
  ],
  misconceptions: [
    {
      id: "mc1",
      label: "Amperemeter parallel schalten",
      fix:
        "Niemals! Das Amperemeter hat fast keinen Widerstand. Parallel geschaltet erzeugt es einen Kurzschluss — Sicherung löst aus oder das Gerät wird zerstört.",
      test: (t) =>
        /amperemeter[^.]{0,25}parallel/.test(t) || /parallel[^.]{0,25}amperemeter/.test(t),
    },
    {
      id: "mc2",
      label: "Widerstand unter Spannung messen",
      fix:
        "Externe Spannung beschädigt das Ohmmeter. Immer erst Spannung abschalten und das Bauteil nach Möglichkeit ausbauen damit Parallelwege das Ergebnis nicht verfälschen.",
      test: (t) =>
        /(widerstand|ohmmeter|ohm)/.test(t) &&
        /(unter (betriebs)?spannung|mit spannung|spannung anliegt|eingeschaltet|unter strom|im betrieb)/.test(t),
    },
  ],
  praiseDeepening:
    "Gut erklärt. Vertiefung: Was ist die Halbierungsmethode bei der Fehlersuche — und warum ist sie effizienter als Messen von Punkt zu Punkt?",
};
