// self-explanation.js — tf-03-parallel: Parallelschaltung

export default {
  prompt:
    "Warum wird der Gesamtwiderstand einer Parallelschaltung kleiner, " +
    "wenn du mehr Widerst\u00e4nde hinzuf\u00fcgst?",
  hint:
    "Denk an Steckdosen: Jedes zus\u00e4tzliche Ger\u00e4t \u00f6ffnet einen " +
    "neuen Weg f\u00fcr den Strom.",
  keyPoints: [
    {
      id: "kp1",
      label: "Spannung an allen Zweigen gleich",
      canonical:
        "In der Parallelschaltung liegt an jedem Zweig dieselbe Spannung an: U1 = U2 = U_ges.",
      nudge:
        "Was ist in der Parallelschaltung \u00fcberall gleich \u2014 Strom oder Spannung?",
    },
    {
      id: "kp2",
      label: "Strom teilt sich auf",
      canonical:
        "Der Gesamtstrom teilt sich auf die Zweige auf: I_ges = I1 + I2.",
      nudge:
        "Wenn der Strom sich aufteilt \u2014 was passiert mit I_ges im Vergleich zu I1 und I2?",
    },
    {
      id: "kp3",
      label: "Mehr Zweige \u2192 mehr Wege \u2192 kleinerer R_ges",
      canonical:
        "Jeder zus\u00e4tzliche Parallelzweig bietet dem Strom einen weiteren Weg. " +
        "Mehr Wege bedeuten weniger Gesamtwiderstand.",
      nudge:
        "Warum sinkt der Widerstand wenn du einen weiteren Zweig hinzuf\u00fcgst?",
    },
    {
      id: "kp4",
      label: "R_ges kleiner als kleinster Einzelwiderstand",
      canonical:
        "Der Gesamtwiderstand ist immer kleiner als der kleinste Widerstand im Netz.",
      nudge:
        "Wie gro\u00df ist R_ges im Vergleich zum kleinsten Einzelwiderstand?",
    },
  ],
  misconceptions: [
    {
      id: "mc1",
      label: "Parallelschaltung wie Reihenschaltung",
      beschreibung:
        "In der Parallelschaltung addieren sich die Widerst\u00e4nde wie in der Reihenschaltung.",
      fix:
        "Nur in der Reihenschaltung addieren sich die Widerst\u00e4nde direkt. " +
        "In der Parallelschaltung addieren sich die Kehrwerte: 1/R_ges = 1/R1 + 1/R2.",
    },
    {
      id: "mc2",
      label: "Strom gleich in allen Zweigen",
      beschreibung:
        "In der Parallelschaltung ist der Strom in allen Zweigen gleich gro\u00df.",
      fix:
        "Der Strom in den Zweigen h\u00e4ngt vom jeweiligen Widerstand ab: I = U/R. " +
        "Gleich ist die Spannung \u2014 nicht der Strom.",
    },
  ],
  praiseDeepening:
    "Stark \u2014 alle Kernpunkte sitzen. N\u00e4chste Stufe: " +
    "Was passiert mit I_ges wenn einer der Parallelzweige unterbrochen wird?",
};
