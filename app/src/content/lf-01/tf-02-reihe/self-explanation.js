// self-explanation.js — tf-02-reihe: Reihenschaltung
// Autorisierte Konzept-Karte. test() = Regex-Heuristik (CC-Erstfassung aus den
// canonical-Texten abgeleitet — von Nico zu prüfen/verfeinern).

export default {
  prompt:
    "Warum ist der Strom in einer Reihenschaltung überall gleich — die Spannung aber nicht?",
  hint:
    "Denk an die Weihnachtslichterkette: nur ein Weg für den Strom, viele Verbraucher hintereinander.",
  keyPoints: [
    {
      id: "kp1",
      label: "Nur ein Weg für den Strom",
      canonical:
        "In der Reihenschaltung gibt es nur einen einzigen Pfad für den Strom — alle Bauteile liegen hintereinander auf diesem Weg.",
      nudge: "Wie viele Wege hat der Strom in einer Reihenschaltung? Was bedeutet das für seine Stärke?",
      test: (t) =>
        /(ein(en|zig\w*)?|nur ein|einzig\w*)[^.]{0,15}(weg|pfad)/.test(t) || /hintereinander/.test(t),
    },
    {
      id: "kp2",
      label: "Strom ist überall gleich",
      canonical:
        "Weil es nur einen Weg gibt, ist der Strom an jeder Stelle gleich groß: I_ges = I1 = I2.",
      nudge: "Wenn der Strom nur einen Weg hat — kann er dann irgendwo kleiner oder größer werden?",
      test: (t) =>
        /strom/.test(t) &&
        /(überall (gleich|konstant)|gleich (groß|stark)|konstant|an jeder stelle gleich)/.test(t),
    },
    {
      id: "kp3",
      label: "Spannung teilt sich auf",
      canonical: "Die Gesamtspannung verteilt sich auf die einzelnen Widerstände: U_ges = U1 + U2.",
      nudge: "Was passiert mit der Spannung? Fällt sie gleichmäßig oder abhängig vom Widerstand ab?",
      test: (t) =>
        /spannung/.test(t) &&
        /(teilt sich|teilen sich|aufteil|verteil|aufgeteilt|fällt[^.]{0,20}ab|anteil|summe)/.test(t),
    },
    {
      id: "kp4",
      label: "Widerstände addieren sich",
      canonical: "Der Gesamtwiderstand ist die Summe aller Einzelwiderstände: R_ges = R1 + R2 + …",
      nudge: "Jeder Widerstand bremst den Strom. Was passiert wenn du mehrere hintereinander schaltest?",
      test: (t) =>
        /(widerständ\w*)[^.]{0,35}(addier\w*|summ\w*|zusammen|aufsummier\w*|größer|steigt|mehr)/.test(t) ||
        /(addier\w*|summe)[^.]{0,25}widerständ/.test(t),
    },
  ],
  misconceptions: [
    {
      id: "mc1",
      label: "Strom wird nach jedem Widerstand kleiner",
      fix:
        "Der Strom wird nicht verbraucht — er fließt nur durch den Widerstand hindurch. Was sich ändert ist die Spannung, nicht der Strom.",
      test: (t) =>
        (/strom[^.]{0,30}(kleiner|weniger|sinkt|abnimmt|verbraucht)/.test(t) && /widerstand/.test(t)) ||
        /widerstand[^.]{0,25}(verbraucht|aufbraucht)[^.]{0,15}strom/.test(t),
    },
    {
      id: "mc2",
      label: "Spannung ist überall gleich",
      fix:
        "Das gilt für die Parallelschaltung, nicht für die Reihe. In der Reihenschaltung teilt sich die Spannung proportional zu den Widerständen auf.",
      test: (t) =>
        /spannung[^.]{0,25}(überall|jedem|allen|jeder stelle)[^.]{0,12}gleich/.test(t) ||
        /(überall|jedem|allen)[^.]{0,15}gleich\w*[^.]{0,15}spannung/.test(t),
    },
  ],
  praiseDeepening:
    "Stark — alle Kernpunkte sitzen. Jetzt weiter: Was passiert mit R_ges und I wenn du einen Widerstand aus der Reihe entfernst?",
};
