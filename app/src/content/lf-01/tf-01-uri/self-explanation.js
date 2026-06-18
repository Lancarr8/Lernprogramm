// self-explanation.js — tf-01-uri: Das Ohmsche Gesetz
// Autorisierte Konzept-Karte (Grundwahrheit) — geprüft, NICHT generiert.
// classifyExplanation() klassifiziert Freitext nur gegen diese Karte (Regex-Heuristik).
// .js (kein .json), damit die test-Heuristiken als Funktionen mitkommen können.

export default {
  id: "uri",
  prompt:
    "Warum kannst du bei U = R · I nicht eine Größe ändern, ohne dass eine andere mitgeht?",
  hint: "Denk an die Wasser-Analogie von vorhin — Druck, Engstelle, Fluss.",
  keyPoints: [
    {
      id: "kp1",
      label: "Spannung = der Antrieb",
      canonical: "Die Spannung U ist die treibende Größe (Druck), die Ladung bewegt.",
      nudge:
        "Du hast die treibende Größe noch nicht benannt — was „drückt“ die Ladung überhaupt durch den Draht?",
      test: (t) =>
        /spannung/.test(t) &&
        /(treib|drück|druck|antrieb|schieb|kraft|potential|potenzial|pumpe)/.test(t),
    },
    {
      id: "kp2",
      label: "Widerstand bremst den Fluss",
      canonical: "Der Widerstand R hemmt den Stromfluss (Engstelle).",
      nudge: "Und was hält dagegen? Welche Größe bremst den Fluss?",
      test: (t) =>
        /widerstand/.test(t) &&
        /(bremst|hemmt|begrenzt|gegen|engstell|\beng|behindert|drossel|dagegen)/.test(t),
    },
    {
      id: "kp3",
      label: "Strom ergibt sich aus beiden",
      canonical: "Der Strom I ist keine frei gesetzte Größe, sondern folgt aus U und R.",
      nudge:
        "Ist der Strom eine eigene, frei einstellbare Größe — oder ergibt er sich aus den anderen beiden?",
      test: (t) =>
        /strom/.test(t) &&
        /(ergibt|ergebnis|folgt|resultiert|hängt|abhäng|stellt sich)/.test(t),
    },
    {
      id: "kp4",
      label: "U fest: R größer → I kleiner",
      canonical: "Bei festem U sind R und I gegenläufig gekoppelt: steigt R, sinkt I.",
      nudge:
        "Kern der Sache: Du hältst U fest und drehst R hoch. Was passiert mit I — in welche Richtung?",
      test: (t) =>
        /(größer|grösser|höher|hoeher|mehr|steigt|erhöh|erhoeh)[^.]{0,45}(kleiner|weniger|sinkt|fällt|faellt|geringer|runter)/.test(
          t
        ) ||
        /(kleiner|weniger|sinkt)[^.]{0,45}(größer|grösser|mehr|steigt)/.test(t) ||
        /je[^.]{0,18}desto/.test(t) ||
        /(umgekehrt|gegenläufig|gegenlaeufig|gekoppelt|koppl)/.test(t),
    },
  ],
  misconceptions: [
    {
      id: "mc2",
      label: "Spannung und Strom als dasselbe",
      fix: "Spannung und Strom fühlen sich verwandt an, sind aber nicht dasselbe — das eine ist der Druck, das andere der Fluss. Welches ist welches?",
      test: (t) =>
        /(spannung und strom|strom und spannung)[^.]{0,25}(dasselbe|das gleiche|gleich|identisch|das selbe)/.test(
          t
        ) || /spannung[^.]{0,15}(ist|=|sind)[^.]{0,12}(der )?strom/.test(t),
    },
    {
      id: "mc1",
      label: "Mehr Widerstand = mehr Strom",
      fix: "Halt — denk nochmal an die Engstelle: lässt eine engere Stelle mehr oder weniger durch?",
      test: (t) =>
        /(mehr|höher|hoeher|größer|grösser)[^.]{0,30}widerstand[^.]{0,35}(mehr|höher|hoeher|größer|grösser|steigt)[^.]{0,18}strom/.test(
          t
        ) ||
        /widerstand[^.]{0,20}(erhöh|erhoeh|größer|grösser|hoch)[^.]{0,30}strom[^.]{0,15}(steigt|größer|grösser|mehr)/.test(
          t
        ),
    },
    {
      id: "mc3",
      label: "Strom wird „verbraucht“",
      fix: "Der Strom ist im einfachen Stromkreis überall gleich groß — er wird nicht „verbraucht“. Was ändert sich am Widerstand stattdessen?",
      test: (t) =>
        /strom[^.]{0,20}(verbraucht|aufgebraucht|verloren|weg|weniger nach)/.test(t) ||
        /verbraucht[^.]{0,15}strom/.test(t),
    },
  ],
  praiseDeepening:
    "Stark — alle Kernpunkte sitzen. Jetzt schärfer: Was passiert mit I, wenn U *und* R gleichzeitig steigen?",
};
