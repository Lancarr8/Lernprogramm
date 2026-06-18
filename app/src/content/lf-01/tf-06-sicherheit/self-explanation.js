// self-explanation.js — tf-06-sicherheit
// Autorisierte Konzept-Karte. test() = Regex-Heuristik (CC-Erstfassung aus den
// canonical-Texten abgeleitet — von Nico zu prüfen/verfeinern).

export default {
  prompt:
    "Warum ist elektrischer Strom gefährlich — und was bestimmt wie gefährlich ein Stromschlag ist?",
  hint: "Denk an das Ohmsche Gesetz: I = U / R. Der Körper ist ein Widerstand.",
  keyPoints: [
    {
      id: "kp1",
      label: "Stromstärke ist entscheidend, nicht Spannung",
      canonical:
        "Nicht die Spannung tötet, sondern die Stromstärke die durch den Körper fließt. Schon 50 mA durch das Herz können tödlich sein.",
      nudge: "Was ist in Wirklichkeit gefährlich bei einem Stromschlag — Volt oder Ampere?",
      test: (t) =>
        /(stromstärke|strom|ampere|milliampere|\bma\b)/.test(t) &&
        /(tödlich|gefähr\w*|entscheid\w*|herz|nicht die spannung|nicht spannung|nicht die volt)/.test(t),
    },
    {
      id: "kp2",
      label: "Körperwiderstand bestimmt den Strom",
      canonical:
        "Der Körperwiderstand bestimmt nach I = U/R wie viel Strom bei gegebener Spannung fließt. Feuchte Haut senkt den Widerstand und erhöht die Gefahr.",
      nudge: "Wie berechnet sich der Körperstrom — und welche Rolle spielt die Feuchtigkeit?",
      test: (t) =>
        /(körper\w*|haut)/.test(t) &&
        /(widerstand|feucht\w*|nass\w*|trocken\w*|i ?= ?u|u ?\/ ?r|ohm|schweiß)/.test(t),
    },
    {
      id: "kp3",
      label: "Schutzmaßnahmen verhindern Fehlerstrom",
      canonical:
        "Schutzmaßnahmen wie Isolierung, Schutzerde und FI-Schalter verhindern dass Strom durch den Körper fließt oder schalten schnell genug ab.",
      nudge: "Wie schützen technische Maßnahmen vor gefährlichem Strom?",
      test: (t) =>
        /(schutzmaßnahm\w*|isolier\w*|fi[- ]?schalter|fi schalter|schutzerd\w*|schutzleiter|erdung|geerdet|sicherung|abschalt\w*)/.test(t),
    },
  ],
  misconceptions: [
    {
      id: "mc1",
      label: "Niedrige Spannung ist immer sicher",
      fix:
        "Auch Niederspannung kann gefährlich sein: bei sehr niedrigem Körperwiderstand (z.B. in der Badewanne) fließen selbst bei 12 V gefährliche Ströme. Kontext entscheidet — nicht nur die Spannung.",
      test: (t) =>
        (/(niedrig\w*|gering\w*|klein\w*|niederspannung|kleinspannung|unter \d+)/.test(t) &&
          /(spannung|volt|\bv\b)/.test(t) &&
          /(sicher|harmlos|keine gefahr|nicht gefähr\w*|ungefähr\w*|passiert nichts)/.test(t)),
    },
    {
      id: "mc2",
      label: "Strom fließt nur bei direktem Kontakt mit beiden Leitern",
      fix:
        "Schon ein Kontakt mit einem spannungsführenden Teil genügt — wenn der Körper über Schutzerde oder Fußboden geerdet ist. Deshalb Schutzschuhe und Isoliermatten bei Elektroarbeiten.",
      test: (t) =>
        /(beide\w*[^.]{0,15}(leiter|pole|kabel|drähte|adern|phasen))/.test(t) ||
        /(nur|erst)[^.]{0,20}(beide|gleichzeitig)[^.]{0,20}berühr\w*/.test(t) ||
        /gleichzeitig[^.]{0,20}berühr\w*/.test(t),
    },
  ],
  praiseDeepening:
    "Gut erklärt. Weiterführend: Warum ist Wechselstrom bei gleicher Spannung gefährlicher als Gleichstrom für den menschlichen Körper?",
};
