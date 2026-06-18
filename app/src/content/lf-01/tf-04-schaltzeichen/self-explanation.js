// self-explanation.js — tf-04-schaltzeichen
// Autorisierte Konzept-Karte. test() = Regex-Heuristik (CC-Erstfassung aus den
// canonical-Texten abgeleitet — von Nico zu prüfen/verfeinern).

export default {
  prompt: "Was zeigt ein Schaltplan — und warum sind genormte Schaltzeichen wichtig?",
  hint:
    "Denk daran: Ein Elektriker in Japan und einer in Deutschland sollen denselben Schaltplan lesen können.",
  keyPoints: [
    {
      id: "kp1",
      label: "Schaltplan zeigt elektrische Funktion",
      canonical:
        "Ein Schaltplan stellt die elektrischen Verbindungen und Funktionen dar, nicht die räumliche Anordnung der Bauteile.",
      nudge: "Was genau zeigt ein Schaltplan — wie Bauteile räumlich liegen oder wie sie verbunden sind?",
      test: (t) =>
        /(schaltplan|stromlaufplan|schaltbild)/.test(t) &&
        /(verbindung\w*|funktion\w*|elektrisch\w*|verbunden|zusammenhang|wie.*zusammen)/.test(t),
    },
    {
      id: "kp2",
      label: "Schaltzeichen sind genormt",
      canonical:
        "Schaltzeichen sind international genormt nach DIN EN 60617 / IEC 60617 — jedes Symbol hat weltweit dieselbe Bedeutung.",
      nudge: "Warum müssen Schaltzeichen genormt sein? Was wäre das Problem ohne Normung?",
      test: (t) =>
        /(schaltzeichen|symbol\w*|zeichen)/.test(t) &&
        /(genormt|norm\w*|din|iec|60617|standard|international|einheitlich|weltweit|festgelegt|gleiche bedeutung)/.test(t),
    },
    {
      id: "kp3",
      label: "Schaltplan ermöglicht Kommunikation",
      canonical:
        "Mit einem Schaltplan können Elektriker weltweit Schaltungen lesen, prüfen und nachbauen — ohne Sprachbarriere.",
      nudge: "Welchen praktischen Vorteil hat ein international gültiger Schaltplan für einen Elektriker?",
      test: (t) =>
        /(schaltplan|schaltung|plan)/.test(t) &&
        /(weltweit|international|überall|jeder|ohne sprach\w*|sprachbarriere|lesen|nachbau\w*|kommunizier\w*|verständ\w*)/.test(t),
    },
  ],
  misconceptions: [
    {
      id: "mc1",
      label: "Schaltplan zeigt Bauteilanordnung",
      fix:
        "Das ist der Aufbauplan oder das Platinenlayout. Ein Schaltplan zeigt nur die logischen Verbindungen — die räumliche Anordnung spielt keine Rolle.",
      test: (t) =>
        /schaltplan/.test(t) &&
        /(räumlich\w*|anordnung|platine|layout|wo.*liegen|wie.*angeordnet|position\w*|aufgebaut)/.test(t) &&
        !/nicht[^.]{0,30}(räumlich\w*|anordnung|platine|layout|position)/.test(t),
    },
  ],
  praiseDeepening:
    "Gut erklärt. Weiterführend: Was ist der Unterschied zwischen Schaltplan, Stromlaufplan und Aufbauplan?",
};
