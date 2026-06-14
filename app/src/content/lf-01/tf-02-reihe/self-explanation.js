// self-explanation.js — tf-02-reihe: Reihenschaltung

export default {
  prompt:
    "Warum ist der Strom in einer Reihenschaltung \u00fcberall gleich \u2014 " +
    "die Spannung aber nicht?",
  hint:
    "Denk an die Weihnachtslichterkette: nur ein Weg f\u00fcr den Strom, " +
    "viele Verbraucher hintereinander.",
  keyPoints: [
    {
      id: "kp1",
      label: "Nur ein Weg f\u00fcr den Strom",
      canonical:
        "In der Reihenschaltung gibt es nur einen einzigen Pfad f\u00fcr den Strom \u2014 " +
        "alle Bauteile liegen hintereinander auf diesem Weg.",
      nudge:
        "Wie viele Wege hat der Strom in einer Reihenschaltung? Was bedeutet das f\u00fcr seine St\u00e4rke?",
    },
    {
      id: "kp2",
      label: "Strom ist \u00fcberall gleich",
      canonical:
        "Weil es nur einen Weg gibt, ist der Strom an jeder Stelle gleich gro\u00df: I_ges = I1 = I2.",
      nudge:
        "Wenn der Strom nur einen Weg hat \u2014 kann er dann irgendwo kleiner oder gr\u00f6\u00dfer werden?",
    },
    {
      id: "kp3",
      label: "Spannung teilt sich auf",
      canonical:
        "Die Gesamtspannung verteilt sich auf die einzelnen Widerst\u00e4nde: U_ges = U1 + U2.",
      nudge:
        "Was passiert mit der Spannung? F\u00e4llt sie gleichm\u00e4\u00dfig oder abh\u00e4ngig vom Widerstand ab?",
    },
    {
      id: "kp4",
      label: "Widerst\u00e4nde addieren sich",
      canonical:
        "Der Gesamtwiderstand ist die Summe aller Einzelwiderst\u00e4nde: R_ges = R1 + R2 + \u2026",
      nudge:
        "Jeder Widerstand bremst den Strom. Was passiert wenn du mehrere hintereinander schaltest?",
    },
  ],
  misconceptions: [
    {
      id: "mc1",
      label: "Strom wird nach jedem Widerstand kleiner",
      beschreibung:
        "Nach jedem Widerstand wird der Strom kleiner, weil der Widerstand ihn verbraucht.",
      fix:
        "Der Strom wird nicht verbraucht \u2014 er flie\u00dft nur durch den Widerstand hindurch. " +
        "Was sich \u00e4ndert ist die Spannung, nicht der Strom.",
    },
    {
      id: "mc2",
      label: "Spannung ist \u00fcberall gleich",
      beschreibung:
        "In einer Reihenschaltung ist die Spannung an jedem Widerstand gleich gro\u00df.",
      fix:
        "Das gilt f\u00fcr die Parallelschaltung, nicht f\u00fcr die Reihe. " +
        "In der Reihenschaltung teilt sich die Spannung proportional zu den Widerst\u00e4nden auf.",
    },
  ],
  praiseDeepening:
    "Stark \u2014 alle Kernpunkte sitzen. Jetzt weiter: " +
    "Was passiert mit R_ges und I wenn du einen Widerstand aus der Reihe entfernst?",
};
