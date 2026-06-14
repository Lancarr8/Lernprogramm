// self-explanation.js — tf-04-schaltzeichen

export default {
  prompt:
    "Was zeigt ein Schaltplan \u2014 und warum sind genormte Schaltzeichen wichtig?",
  hint:
    "Denk daran: Ein Elektriker in Japan und einer in Deutschland sollen " +
    "denselben Schaltplan lesen k\u00f6nnen.",
  keyPoints: [
    {
      id: "kp1",
      label: "Schaltplan zeigt elektrische Funktion",
      canonical:
        "Ein Schaltplan stellt die elektrischen Verbindungen und Funktionen dar, " +
        "nicht die r\u00e4umliche Anordnung der Bauteile.",
      nudge:
        "Was genau zeigt ein Schaltplan \u2014 wie Bauteile r\u00e4umlich liegen oder wie sie verbunden sind?",
    },
    {
      id: "kp2",
      label: "Schaltzeichen sind genormt",
      canonical:
        "Schaltzeichen sind international genormt nach DIN EN 60617 / IEC 60617 \u2014 " +
        "jedes Symbol hat weltweit dieselbe Bedeutung.",
      nudge:
        "Warum m\u00fcssen Schaltzeichen genormt sein? Was w\u00e4re das Problem ohne Normung?",
    },
    {
      id: "kp3",
      label: "Schaltplan erm\u00f6glicht Kommunikation",
      canonical:
        "Mit einem Schaltplan k\u00f6nnen Elektriker weltweit Schaltungen lesen, " +
        "pr\u00fcfen und nachbauen \u2014 ohne Sprachbarriere.",
      nudge:
        "Welchen praktischen Vorteil hat ein international g\u00fcltiger Schaltplan f\u00fcr einen Elektriker?",
    },
  ],
  misconceptions: [
    {
      id: "mc1",
      label: "Schaltplan zeigt Bauteilanordnung",
      beschreibung:
        "Ein Schaltplan zeigt wie die Bauteile r\u00e4umlich auf der Platine angeordnet sind.",
      fix:
        "Das ist der Aufbauplan oder das Platinenlayout. Ein Schaltplan zeigt nur " +
        "die logischen Verbindungen \u2014 die r\u00e4umliche Anordnung spielt keine Rolle.",
    },
  ],
  praiseDeepening:
    "Gut erkl\u00e4rt. Weiterf\u00fchrend: Was ist der Unterschied zwischen " +
    "Schaltplan, Stromlaufplan und Aufbauplan?",
};
