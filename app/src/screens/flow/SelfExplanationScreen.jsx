import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Panel from "../../components/Panel.jsx";
import Button from "../../components/Button.jsx";
import { rise, pop } from "../../theme/motion.js";

/*
  SelfExplanationScreen — migriert aus self_explanation_screen_v1.jsx.
  Schritt der Lern-Schablone "selbst erörtern".

  LEITPLANKE (KI = sokratischer Coach, nie Quelle der Wahrheit):
  classifyExplanation() klassifiziert nur den Freitext gegen die autorisierte
  Konzept-Karte (CONCEPT_URI) und liefert {covered, misconceptions, confidence}.
  Jeder Coach-Text stammt aus autorisierten Snippets der Karte.

  AUSTAUSCH-PUNKT: classifyExplanation() ist hier Heuristik (Regex). Im echten
  Build wird NUR diese Funktion durch einen LLM-Call ersetzt, der exakt dasselbe
  Objekt zurückgibt. Alles andere bleibt unverändert. (Vertrag siehe HANDOFF.md.)

  CONTENT: CONCEPT_URI bleibt inline (wandert in Phase 4 nach self-explanation.js).
*/

// ---------------------------------------------------------------------------
// Konzept-Karte (autorisierter Grundwahrheits-Datensatz) — geprüft, nicht generiert
// ---------------------------------------------------------------------------
const CONCEPT_URI = {
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

// ---------------------------------------------------------------------------
// Klassifikator (PROTOTYP-HEURISTIK) — Austausch-Punkt für den echten LLM-Call.
// Vertrag: (raw, concept) => { covered: string[], misconceptions: string[], confidence: number }
// ---------------------------------------------------------------------------
function classifyExplanation(raw, concept) {
  const t = raw.toLowerCase().replace(/\s+/g, " ");
  return {
    covered: concept.keyPoints.filter((k) => k.test(t)).map((k) => k.id),
    misconceptions: concept.misconceptions.filter((m) => m.test(t)).map((m) => m.id),
    confidence: 0.5, // Prototyp: feste Heuristik-Konfidenz; echter Call liefert echten Wert
  };
}

// ---------------------------------------------------------------------------
// Feedback-Assembly — setzt NUR autorisierte Snippets zusammen, schreibt nichts neu.
// ---------------------------------------------------------------------------
function buildFeedback(result, concept) {
  const covered = new Set(result.covered);
  const keyPoints = concept.keyPoints.map((k) => ({
    id: k.id,
    label: k.label,
    ok: covered.has(k.id),
  }));
  const flags = result.misconceptions
    .map((id) => concept.misconceptions.find((m) => m.id === id))
    .filter(Boolean)
    .map((m) => ({ id: m.id, label: m.label, fix: m.fix }));

  const coveredCount = result.covered.length;
  const total = concept.keyPoints.length;
  const allGood = coveredCount === total && flags.length === 0;

  // Sokratische Folgefrage: Fehlvorstellung hat Vorrang, sonst erster fehlender Kernpunkt.
  let nextStep;
  if (flags.length > 0) {
    nextStep = flags[0].fix;
  } else {
    const miss = concept.keyPoints.find((k) => !covered.has(k.id));
    nextStep = miss ? miss.nudge : concept.praiseDeepening;
  }

  const verdict = allGood
    ? "Sitzt — alle Kernpunkte getroffen"
    : `${coveredCount} von ${total} Kernpunkten` +
      (flags.length ? ` · ${flags.length} Stolperstein${flags.length > 1 ? "e" : ""}` : "");

  return { keyPoints, flags, nextStep, verdict, allGood };
}

// ---------------------------------------------------------------------------
// Icons (inline SVG, currentColor) — keine Icon-Font-Abhängigkeit
// ---------------------------------------------------------------------------
const Svg = (p) => (
  <svg
    width={p.size || 18}
    height={p.size || 18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flex: "none" }}
  >
    {p.children}
  </svg>
);
const IconCheck = (p) => (
  <Svg size={p.size}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.5 2.5 4.5-5" />
  </Svg>
);
const IconCircle = (p) => (
  <Svg size={p.size}>
    <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
  </Svg>
);
const IconWarn = (p) => (
  <Svg size={p.size}>
    <path d="M12 3l9 16H3z" />
    <path d="M12 10v4" />
    <path d="M12 17.5v.5" />
  </Svg>
);
const IconArrow = (p) => (
  <Svg size={p.size}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </Svg>
);
const IconMsg = (p) => (
  <Svg size={p.size}>
    <path d="M4 5h16v11H9l-4 3v-3H4z" />
  </Svg>
);
const IconSchool = (p) => (
  <Svg size={p.size}>
    <path d="M3 8l9-4 9 4-9 4z" />
    <path d="M7 10.5V15c0 1 2.2 2 5 2s5-1 5-2v-4.5" />
  </Svg>
);
const IconShield = (p) => (
  <Svg size={p.size}>
    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </Svg>
);

// Prototyp-Beispiele zum schnellen Durchklicken (DEV-Helfer, nur im Dev-Modus sichtbar)
const DEMOS = {
  strong:
    "Die Spannung ist der Antrieb, sie drückt die Ladung durch den Draht. Der Widerstand bremst diesen Fluss. Der Strom ergibt sich aus beiden. Wenn ich die Spannung festhalte und den Widerstand größer mache, wird der Strom kleiner — die drei sind gekoppelt.",
  weak:
    "Spannung und Strom sind eigentlich dasselbe. Und je mehr Widerstand ich nehme, desto mehr Strom fließt durch die LED.",
};

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------
export default function SelfExplanationScreen({ onComplete, currentStep, totalSteps }) {
  const concept = CONCEPT_URI;
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const taRef = useRef(null);

  function check(value) {
    const v = value != null ? value : text;
    if (!v.trim()) {
      setFeedback(null);
      setEmpty(true);
      return;
    }
    setEmpty(false);
    const result = classifyExplanation(v, concept);
    setFeedback(buildFeedback(result, concept));
    setAttempts((n) => n + 1);
  }

  function loadDemo(key) {
    setText(DEMOS[key]);
    check(DEMOS[key]);
  }

  return (
    <div
      className="grid-bg"
      style={{ minHeight: "100%", display: "flex", justifyContent: "center", padding: "22px 16px 40px" }}
    >
      <motion.div {...rise} style={{ width: "100%", maxWidth: 600 }}>
        {/* Step indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
          }}
        >
          <span style={{ color: "var(--c-dim)", letterSpacing: ".04em" }}>LERNFELD · URI</span>
          <span style={{ color: "var(--c-teal)" }}>
            Schritt {currentStep} / {totalSteps} · selbst erklären
          </span>
        </div>

        {/* Prompt + Eingabe */}
        <Panel>
          <div
            style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: "var(--c-dim)" }}
          >
            <span style={{ color: "var(--c-teal)", display: "inline-flex" }}>
              <IconMsg size={18} />
            </span>
            <span style={{ fontSize: 13 }}>Erklär in eigenen Worten</span>
          </div>
          <p style={{ margin: "0 0 4px", fontSize: 16.5, lineHeight: 1.5 }}>
            {"Warum kannst du bei "}
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--c-teal)" }}>U = R · I</span>
            {" nicht eine Größe ändern, ohne dass eine andere mitgeht?"}
          </p>
          <p style={{ margin: 0, fontSize: 13.5, color: "var(--c-dim)" }}>{concept.hint}</p>

          <textarea
            ref={taRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Schreib 2–4 Sätze, so wie du es einem Klassenkameraden erklären würdest…"
            style={{
              width: "100%",
              boxSizing: "border-box",
              marginTop: 13,
              background: "var(--c-bg2)",
              border: "1px solid var(--c-edge)",
              borderRadius: "var(--radius-sm)",
              color: "var(--c-ink)",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.6,
              padding: 12,
              minHeight: 108,
              resize: "vertical",
              outline: "none",
            }}
          />

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12, alignItems: "center" }}>
            <Button variant="go" onClick={() => check()}>
              <IconCheck size={15} />
              Prüfen
            </Button>
            {import.meta.env.DEV && (
              <>
                <Button variant="ghost" onClick={() => loadDemo("strong")}>
                  Demo: starke Erklärung
                </Button>
                <Button variant="ghost" onClick={() => loadDemo("weak")}>
                  Demo: mit Fehlvorstellung
                </Button>
              </>
            )}
          </div>
        </Panel>

        {/* Leer-Hinweis */}
        {empty && (
          <motion.div {...rise} style={{ marginTop: 14 }}>
            <Panel tone="pan2">
              <span style={{ fontSize: 14, color: "var(--c-dim)" }}>
                Schreib erst ein paar Sätze — dann schaut der Coach drauf.
              </span>
            </Panel>
          </motion.div>
        )}

        {/* Feedback */}
        {feedback && (
          <motion.div {...rise} style={{ marginTop: 14 }}>
            <Panel tone="pan2">
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
                <span style={{ color: "var(--c-teal)", display: "inline-flex" }}>
                  <IconSchool size={19} />
                </span>
                <span style={{ fontSize: 13, color: "var(--c-dim)" }}>Coach</span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: feedback.allGood ? "var(--c-teal)" : "var(--c-ember)",
                  }}
                >
                  {feedback.verdict}
                </span>
              </div>

              {/* Kernpunkte */}
              {feedback.keyPoints.map((k) => (
                <div
                  key={k.id}
                  style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "7px 0" }}
                >
                  <span
                    style={{ color: k.ok ? "var(--c-teal)" : "var(--c-dim)", display: "inline-flex", marginTop: 1 }}
                  >
                    {k.ok ? (
                      <motion.span {...pop} style={{ display: "inline-flex" }}>
                        <IconCheck />
                      </motion.span>
                    ) : (
                      <IconCircle />
                    )}
                  </span>
                  <span style={{ fontSize: 14.5, color: k.ok ? "var(--c-ink)" : "var(--c-dim)" }}>
                    {k.label}
                  </span>
                </div>
              ))}

              {/* Fehlvorstellungen */}
              {feedback.flags.map((f) => (
                <div
                  key={f.id}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    background: "var(--c-warn-soft)",
                    border: "1px solid var(--c-warn-edge)",
                    borderRadius: "var(--radius-sm)",
                    padding: "11px 12px",
                    marginTop: 8,
                  }}
                >
                  <span style={{ color: "var(--c-warn)", display: "inline-flex", marginTop: 1 }}>
                    <IconWarn />
                  </span>
                  <div>
                    <div style={{ fontSize: 13, color: "var(--c-warn)", marginBottom: 2 }}>{f.label}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.5 }}>{f.fix}</div>
                  </div>
                </div>
              ))}

              {/* Sokratische Folgefrage */}
              <div
                style={{
                  background: "var(--c-bg2)",
                  border: "1px solid var(--c-edge)",
                  borderLeft: "3px solid var(--c-ember)",
                  borderRadius: "0 8px 8px 0",
                  padding: "12px 13px",
                  marginTop: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--c-ember)",
                    marginBottom: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <IconArrow size={15} />
                  Nächster Schritt
                </div>
                <div style={{ fontSize: 14.5, lineHeight: 1.5 }}>{feedback.nextStep}</div>
              </div>

              <div style={{ marginTop: 13, display: "flex", gap: 8 }}>
                {feedback.allGood ? (
                  <Button variant="go" onClick={onComplete}>
                    Weiter zur Schaltung
                    <IconArrow size={15} />
                  </Button>
                ) : (
                  <Button onClick={() => taRef.current && taRef.current.focus()}>
                    Erklärung verbessern
                  </Button>
                )}
              </div>

              {/* Nach 3 Fehlversuchen: sanfter Ausweg, ohne die Selbsterklärungs-Hürde zu erzwingen */}
              {!feedback.allGood && attempts >= 3 && (
                <Button
                  variant="ghost"
                  onClick={onComplete}
                  style={{ marginTop: 8, fontSize: 12, color: "var(--c-dim)" }}
                >
                  Trotzdem weiter (Erklärung später wiederholen)
                </Button>
              )}
            </Panel>
          </motion.div>
        )}

        {/* Leitplanken-Notiz (Reviewer-Hinweis) */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--c-dim)",
            margin: "16px 0 0",
            lineHeight: 1.6,
            display: "flex",
            alignItems: "flex-start",
            gap: 6,
          }}
        >
          <span style={{ display: "inline-flex", marginTop: 1 }}>
            <IconShield size={14} />
          </span>
          Coach klassifiziert nur, welche Kernpunkte getroffen sind. Alle Erklärtexte sind
          autorisiert — im Prototyp Heuristik, später LLM-Call, gleicher Vertrag.
        </p>
      </motion.div>
    </div>
  );
}
