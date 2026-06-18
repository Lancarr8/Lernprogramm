// self-explanation.js — tf-03-parallel: Parallelschaltung
// Autorisierte Konzept-Karte. test() = Regex-Heuristik (CC-Erstfassung aus den
// canonical-Texten abgeleitet — von Nico zu prüfen/verfeinern).

export default {
  prompt:
    "Warum wird der Gesamtwiderstand einer Parallelschaltung kleiner, wenn du mehr Widerstände hinzufügst?",
  hint:
    "Denk an Steckdosen: Jedes zusätzliche Gerät öffnet einen neuen Weg für den Strom.",
  keyPoints: [
    {
      id: "kp1",
      label: "Spannung an allen Zweigen gleich",
      canonical:
        "In der Parallelschaltung liegt an jedem Zweig dieselbe Spannung an: U1 = U2 = U_ges.",
      nudge: "Was ist in der Parallelschaltung überall gleich — Strom oder Spannung?",
      test: (t) =>
        /spannung/.test(t) &&
        /(gleich|überall|jedem zweig|allen zweigen|an jedem|an allen|dieselbe)/.test(t),
    },
    {
      id: "kp2",
      label: "Strom teilt sich auf",
      canonical: "Der Gesamtstrom teilt sich auf die Zweige auf: I_ges = I1 + I2.",
      nudge: "Wenn der Strom sich aufteilt — was passiert mit I_ges im Vergleich zu I1 und I2?",
      test: (t) =>
        /strom/.test(t) &&
        /(teilt sich|teilen sich|aufteil|verteil|aufgeteilt|zweig\w*|summe)/.test(t),
    },
    {
      id: "kp3",
      label: "Mehr Zweige → mehr Wege → kleinerer R_ges",
      canonical:
        "Jeder zusätzliche Parallelzweig bietet dem Strom einen weiteren Weg. Mehr Wege bedeuten weniger Gesamtwiderstand.",
      nudge: "Warum sinkt der Widerstand wenn du einen weiteren Zweig hinzufügst?",
      test: (t) =>
        (/(mehr|weitere\w*|zusätzlich\w*|jede[rn]?)[^.]{0,25}(zweig\w*|weg\w*|pfad\w*)/.test(t) &&
          /(kleiner|sinkt|weniger|geringer|niedriger|abnimmt)/.test(t)) ||
        /(widerstand)[^.]{0,20}(kleiner|sinkt|geringer)[^.]{0,30}(zweig|weg|pfad)/.test(t),
    },
    {
      id: "kp4",
      label: "R_ges kleiner als kleinster Einzelwiderstand",
      canonical: "Der Gesamtwiderstand ist immer kleiner als der kleinste Widerstand im Netz.",
      nudge: "Wie groß ist R_ges im Vergleich zum kleinsten Einzelwiderstand?",
      test: (t) =>
        /(kleiner|geringer|niedriger)[^.]{0,30}(kleinste|kleinsten|einzel\w*)/.test(t) ||
        /(gesamtwiderstand|r_?ges)[^.]{0,20}(kleiner|geringer|kleinste)/.test(t),
    },
  ],
  misconceptions: [
    {
      id: "mc1",
      label: "Parallelschaltung wie Reihenschaltung",
      fix:
        "Nur in der Reihenschaltung addieren sich die Widerstände direkt. In der Parallelschaltung addieren sich die Kehrwerte: 1/R_ges = 1/R1 + 1/R2.",
      test: (t) =>
        /parallel\w*[^.]{0,40}(addier\w*|summ\w*|wie (in )?(der )?reihe)/.test(t) ||
        /widerständ\w*[^.]{0,25}(addier\w*)[^.]{0,30}parallel/.test(t),
    },
    {
      id: "mc2",
      label: "Strom gleich in allen Zweigen",
      fix:
        "Der Strom in den Zweigen hängt vom jeweiligen Widerstand ab: I = U/R. Gleich ist die Spannung — nicht der Strom.",
      test: (t) =>
        /strom[^.]{0,25}(in allen zweigen|jedem zweig|überall)[^.]{0,12}gleich/.test(t) ||
        /(allen zweigen|jedem zweig|überall)[^.]{0,15}gleich\w*[^.]{0,15}strom/.test(t),
    },
  ],
  praiseDeepening:
    "Stark — alle Kernpunkte sitzen. Nächste Stufe: Was passiert mit I_ges wenn einer der Parallelzweige unterbrochen wird?",
};
