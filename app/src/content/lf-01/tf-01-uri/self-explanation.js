// self-explanation.js — tf-01-uri: Das Ohmsche Gesetz
// Autorisierte Konzept-Karte (Grundwahrheit) — geprüft, NICHT generiert.
// classifyExplanation() vergleicht den Azubi-Text per Embedding-Ähnlichkeit
// gegen `canonical` (Kernpunkte) bzw. `beschreibung` (Fehlvorstellungen).
// Keine test-Funktionen mehr — die Klassifikation ist jetzt semantisch.
// Angezeigte Coach-Texte (nudge/fix/praiseDeepening) bleiben autorisierte Snippets.

export default {
  prompt:
    "Warum kannst du bei U = R · I nicht eine Größe ändern, ohne dass eine andere mitgeht?",
  hint: "Denk an die Wasser-Analogie von vorhin — Druck, Engstelle, Fluss.",
  keyPoints: [
    {
      id: "kp1",
      label: "Spannung = der Antrieb",
      canonical: "Die Spannung treibt die Ladung durch den Leiter wie Druck in einem Wasserrohr.",
      nudge: "Was drückt die Ladung überhaupt durch den Draht?",
    },
    {
      id: "kp2",
      label: "Widerstand bremst den Fluss",
      canonical: "Der Widerstand hemmt den Stromfluss wie eine Engstelle im Rohr.",
      nudge: "Was hält dem Strom entgegen — welche Größe bremst ihn?",
    },
    {
      id: "kp3",
      label: "Strom ergibt sich aus beiden",
      canonical: "Der Strom ist keine freie Größe — er folgt aus Spannung und Widerstand.",
      nudge: "Ist der Strom frei einstellbar, oder ergibt er sich aus den anderen beiden?",
    },
    {
      id: "kp4",
      label: "U fest: R größer → I kleiner",
      canonical: "Wenn der Widerstand steigt und die Spannung gleich bleibt, sinkt der Strom.",
      nudge: "Du hältst U fest und drehst R hoch — in welche Richtung geht I?",
    },
  ],
  misconceptions: [
    {
      id: "mc1",
      label: "Mehr Widerstand = mehr Strom",
      beschreibung: "Mehr Widerstand führt zu mehr Strom wenn die Spannung gleich bleibt.",
      fix: "Halt — denk an die Engstelle: lässt eine engere Stelle mehr oder weniger durch?",
    },
    {
      id: "mc2",
      label: "Spannung und Strom sind dasselbe",
      beschreibung: "Spannung und Strom sind identisch oder dasselbe.",
      fix: "Spannung ist der Druck, Strom ist der Fluss — das eine ist die Ursache, das andere die Wirkung.",
    },
    {
      id: "mc3",
      label: "Strom wird verbraucht",
      beschreibung: "Der Strom wird im Widerstand verbraucht oder weniger.",
      fix: "Im einfachen Stromkreis ist der Strom überall gleich groß — was sich ändert ist die Spannung.",
    },
  ],
  praiseDeepening:
    "Stark — alle Kernpunkte sitzen. Jetzt schärfer: Was passiert mit I wenn U *und* R gleichzeitig steigen?",
};
