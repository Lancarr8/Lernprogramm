// lernseite.js — tf-01-uri: Das Ohmsche Gesetz
// Inhalt der Lernseite (Realwelt-Anker → Warum → interaktives Dreieck → Teaser).
// Schema-Vertrag: siehe LernseiteScreen.

export default {
  eyebrow: "Lernfeld 1 · Grundlagen",
  titel: "Das Ohmsche Gesetz",
  formelText: "Spannung, Strom und Widerstand hängen zusammen — U = R · I",
  anker: {
    text:
      "Eine LED braucht 20 mA und verträgt 2 V. Du hängst sie an 5 V — ohne Vorwiderstand " +
      "stirbt sie. Genau diesen Widerstand sagt dir das Ohmsche Gesetz.",
    highlights: ["20 mA", "2 V", "5 V"], // werden in ember-Farbe gezeigt
  },
  warum: {
    titel: "Das Warum · die Wasser-Analogie",
    punkte: [
      { label: "Spannung U", text: "der Druck, der dahintersteht." },
      { label: "Strom I", text: "wie viel tatsächlich fließt." },
      { label: "Widerstand R", text: "die Engstelle, die bremst." },
    ],
  },
  interaktiv: {
    typ: "uri-dreieck", // "uri-dreieck" | "formel" | null
    hint: "Tipp an, was du suchst",
    modi: {
      U: {
        label: "Spannung",
        einheit: "V",
        formel: "U = R · I",
        worked: ["R = 4 Ω", "I = 3 A", "U = 4 Ω · 3 A = 12 V"],
        result: "12 V",
      },
      R: {
        label: "Widerstand",
        einheit: "Ω",
        formel: "R = U / I",
        worked: ["U = 12 V", "I = 3 A", "R = 12 V / 3 A = 4 Ω"],
        result: "4 Ω",
      },
      I: {
        label: "Strom",
        einheit: "A",
        formel: "I = U / R",
        worked: ["U = 12 V", "R = 4 Ω", "I = 12 V / 4 Ω = 3 A"],
        result: "3 A",
      },
    },
  },
  teaser:
    "Gleich bist du dran: Erkläre in einem Satz, warum mehr Widerstand den Strom kleiner macht.",
};
