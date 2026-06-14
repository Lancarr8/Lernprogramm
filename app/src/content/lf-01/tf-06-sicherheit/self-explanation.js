// self-explanation.js — tf-06-sicherheit

export default {
  prompt:
    "Warum ist elektrischer Strom gef\u00e4hrlich \u2014 und was bestimmt " +
    "wie gef\u00e4hrlich ein Stromschlag ist?",
  hint:
    "Denk an das Ohmsche Gesetz: I = U / R. " +
    "Der K\u00f6rper ist ein Widerstand.",
  keyPoints: [
    {
      id: "kp1",
      label: "Stromst\u00e4rke ist entscheidend, nicht Spannung",
      canonical:
        "Nicht die Spannung t\u00f6tet, sondern die Stromst\u00e4rke die durch den K\u00f6rper flie\u00dft. " +
        "Schon 50 mA durch das Herz k\u00f6nnen t\u00f6dlich sein.",
      nudge:
        "Was ist in Wirklichkeit gef\u00e4hrlich bei einem Stromschlag \u2014 Volt oder Ampere?",
    },
    {
      id: "kp2",
      label: "K\u00f6rperwiderstand bestimmt den Strom",
      canonical:
        "Der K\u00f6rperwiderstand bestimmt nach I = U/R wie viel Strom bei gegebener Spannung flie\u00dft. " +
        "Feuchte Haut senkt den Widerstand und erh\u00f6ht die Gefahr.",
      nudge:
        "Wie berechnet sich der K\u00f6rperstrom \u2014 und welche Rolle spielt die Feuchtigkeit?",
    },
    {
      id: "kp3",
      label: "Schutzma\u00dfnahmen verhindern Fehlerstrom",
      canonical:
        "Schutzma\u00dfnahmen wie Isolierung, Schutzerde und FI-Schalter verhindern " +
        "dass Strom durch den K\u00f6rper flie\u00dft oder schalten schnell genug ab.",
      nudge:
        "Wie sch\u00fctzen technische Ma\u00dfnahmen vor gef\u00e4hrlichem Strom?",
    },
  ],
  misconceptions: [
    {
      id: "mc1",
      label: "Niedrige Spannung ist immer sicher",
      beschreibung:
        "Spannungen unter 50 V sind immer sicher und k\u00f6nnen nicht gef\u00e4hrlich werden.",
      fix:
        "Auch Niederspannung kann gef\u00e4hrlich sein: " +
        "bei sehr niedrigem K\u00f6rperwiderstand (z.B. in der Badewanne) " +
        "flie\u00dfen selbst bei 12 V gef\u00e4hrliche Str\u00f6me. " +
        "Kontext entscheidet \u2014 nicht nur die Spannung.",
    },
    {
      id: "mc2",
      label: "Strom flie\u00dft nur bei direktem Kontakt",
      beschreibung:
        "Gef\u00e4hrlicher Strom flie\u00dft nur wenn man beide Leiter gleichzeitig ber\u00fchrt.",
      fix:
        "Schon ein Kontakt mit einem spannungsf\u00fchrenden Teil gen\u00fcgt \u2014 " +
        "wenn der K\u00f6rper \u00fcber Schutzerde oder Fu\u00dfboden geerdet ist. " +
        "Deshalb Schutzschuhe und Isoliermatten bei Elektroarbeiten.",
    },
  ],
  praiseDeepening:
    "Gut erkl\u00e4rt. Weiterf\u00fchrend: Warum ist Wechselstrom bei gleicher Spannung " +
    "gef\u00e4hrlicher als Gleichstrom f\u00fcr den menschlichen K\u00f6rper?",
};
