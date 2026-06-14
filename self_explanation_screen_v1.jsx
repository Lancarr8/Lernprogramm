import React, { useState, useRef } from "react";

/*
  self_explanation_screen_v1.jsx — Schritt 5 der Lern-Schablone ("selbst erörtern").
  Golden-Path-Referenz, URI-Slice. React + CSS-Animation (im echten Build -> Framer Motion).

  LEITPLANKE (KI = sokratischer Coach, nie Quelle der Wahrheit):
  Die KI schreibt KEINE Physik. Sie klassifiziert nur den Freitext gegen die
  autorierte Konzept-Karte (CONCEPT_URI) und liefert {covered, misconceptions, confidence}.
  Jeder angezeigte Erklär-/Coach-Text stammt aus autorierten Snippets in der Karte.

  AUSTAUSCH-PUNKT: classifyExplanation() ist im Prototyp eine Heuristik (Regex).
  Im echten Build wird NUR diese Funktion durch einen LLM-Call ersetzt, der exakt
  dasselbe Objekt zurückgibt. Alles andere bleibt unveraendert.

  CONTENT: CONCEPT_URI ist hier inline (selbst-enthaltend wie die anderen Prototypen).
  Spaeter 1:1 nach data/concept_uri.json extrahierbar.
*/

// ---------------------------------------------------------------------------
// Konzept-Karte (autorierter Grundwahrheits-Datensatz) — geprueft, nicht generiert
// ---------------------------------------------------------------------------
const CONCEPT_URI = {
  id: "uri",
  prompt:
    "Warum kannst du bei U = R \u00B7 I nicht eine Gr\u00F6\u00DFe \u00E4ndern, ohne dass eine andere mitgeht?",
  hint: "Denk an die Wasser-Analogie von vorhin \u2014 Druck, Engstelle, Fluss.",
  keyPoints: [
    {
      id: "kp1",
      label: "Spannung = der Antrieb",
      canonical: "Die Spannung U ist die treibende Gr\u00F6\u00DFe (Druck), die Ladung bewegt.",
      nudge:
        "Du hast die treibende Gr\u00F6\u00DFe noch nicht benannt \u2014 was \u201Edr\u00FCckt\u201C die Ladung \u00FCberhaupt durch den Draht?",
      test: (t) =>
        /spannung/.test(t) &&
        /(treib|dr\u00FCck|druck|antrieb|schieb|kraft|potential|potenzial|pumpe)/.test(t),
    },
    {
      id: "kp2",
      label: "Widerstand bremst den Fluss",
      canonical: "Der Widerstand R hemmt den Stromfluss (Engstelle).",
      nudge: "Und was h\u00E4lt dagegen? Welche Gr\u00F6\u00DFe bremst den Fluss?",
      test: (t) =>
        /widerstand/.test(t) &&
        /(bremst|hemmt|begrenzt|gegen|engstell|\beng|behindert|drossel|dagegen)/.test(t),
    },
    {
      id: "kp3",
      label: "Strom ergibt sich aus beiden",
      canonical: "Der Strom I ist keine frei gesetzte Gr\u00F6\u00DFe, sondern folgt aus U und R.",
      nudge:
        "Ist der Strom eine eigene, frei einstellbare Gr\u00F6\u00DFe \u2014 oder ergibt er sich aus den anderen beiden?",
      test: (t) =>
        /strom/.test(t) &&
        /(ergibt|ergebnis|folgt|resultiert|h\u00E4ngt|abh\u00E4ng|stellt sich)/.test(t),
    },
    {
      id: "kp4",
      label: "U fest: R gr\u00F6\u00DFer \u2192 I kleiner",
      canonical: "Bei festem U sind R und I gegenl\u00E4ufig gekoppelt: steigt R, sinkt I.",
      nudge:
        "Kern der Sache: Du h\u00E4ltst U fest und drehst R hoch. Was passiert mit I \u2014 in welche Richtung?",
      test: (t) =>
        /(gr\u00F6\u00DFer|gr\u00F6sser|h\u00F6her|hoeher|mehr|steigt|erh\u00F6h|erhoeh)[^.]{0,45}(kleiner|weniger|sinkt|f\u00E4llt|faellt|geringer|runter)/.test(
          t
        ) ||
        /(kleiner|weniger|sinkt)[^.]{0,45}(gr\u00F6\u00DFer|gr\u00F6sser|mehr|steigt)/.test(t) ||
        /je[^.]{0,18}desto/.test(t) ||
        /(umgekehrt|gegenl\u00E4ufig|gegenlaeufig|gekoppelt|koppl)/.test(t),
    },
  ],
  misconceptions: [
    {
      id: "mc2",
      label: "Spannung und Strom als dasselbe",
      fix: "Spannung und Strom f\u00FChlen sich verwandt an, sind aber nicht dasselbe \u2014 das eine ist der Druck, das andere der Fluss. Welches ist welches?",
      test: (t) =>
        /(spannung und strom|strom und spannung)[^.]{0,25}(dasselbe|das gleiche|gleich|identisch|das selbe)/.test(
          t
        ) || /spannung[^.]{0,15}(ist|=|sind)[^.]{0,12}(der )?strom/.test(t),
    },
    {
      id: "mc1",
      label: "Mehr Widerstand = mehr Strom",
      fix: "Halt \u2014 denk nochmal an die Engstelle: l\u00E4sst eine engere Stelle mehr oder weniger durch?",
      test: (t) =>
        /(mehr|h\u00F6her|hoeher|gr\u00F6\u00DFer|gr\u00F6sser)[^.]{0,30}widerstand[^.]{0,35}(mehr|h\u00F6her|hoeher|gr\u00F6\u00DFer|gr\u00F6sser|steigt)[^.]{0,18}strom/.test(
          t
        ) ||
        /widerstand[^.]{0,20}(erh\u00F6h|erhoeh|gr\u00F6\u00DFer|gr\u00F6sser|hoch)[^.]{0,30}strom[^.]{0,15}(steigt|gr\u00F6\u00DFer|gr\u00F6sser|mehr)/.test(
          t
        ),
    },
    {
      id: "mc3",
      label: "Strom wird \u201Everbraucht\u201C",
      fix: "Der Strom ist im einfachen Stromkreis \u00FCberall gleich gro\u00DF \u2014 er wird nicht \u201Everbraucht\u201C. Was \u00E4ndert sich am Widerstand stattdessen?",
      test: (t) =>
        /strom[^.]{0,20}(verbraucht|aufgebraucht|verloren|weg|weniger nach)/.test(t) ||
        /verbraucht[^.]{0,15}strom/.test(t),
    },
  ],
  praiseDeepening:
    "Stark \u2014 alle Kernpunkte sitzen. Jetzt sch\u00E4rfer: Was passiert mit I, wenn U *und* R gleichzeitig steigen?",
};

// ---------------------------------------------------------------------------
// Klassifikator (PROTOTYP-HEURISTIK) — Austausch-Punkt fuer den echten LLM-Call.
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
// Feedback-Assembly — setzt NUR autorierte Snippets zusammen, schreibt nichts neu.
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
    ? "Sitzt \u2014 alle Kernpunkte getroffen"
    : `${coveredCount} von ${total} Kernpunkten` +
      (flags.length ? ` \u00B7 ${flags.length} Stolperstein${flags.length > 1 ? "e" : ""}` : "");

  return { keyPoints, flags, nextStep, verdict, allGood };
}

// ---------------------------------------------------------------------------
// Design-Tokens (Stillwater / Werkbank-HUD)
// ---------------------------------------------------------------------------
const C = {
  bg: "#0E1518",
  bg2: "#0A0F12",
  pan: "#142127",
  pan2: "#17262C",
  teal: "#4FD2C2",
  ember: "#FFA24D",
  warn: "#E8745C",
  ink: "#E8F0EE",
  dim: "#86999A",
  edge: "rgba(79,210,194,.16)",
};

const FONT = "'Space Grotesk', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
@keyframes se-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes se-pop { from { opacity: 0; transform: scale(.6); } to { opacity: 1; transform: scale(1); } }
.se-fb { animation: se-rise .32s ease both; }
.se-kp-ok svg { animation: se-pop .3s ease both; }
.se-screen *:focus-visible { outline: 2px solid ${C.teal}; outline-offset: 2px; }
.se-ta::placeholder { color: ${C.dim}; }
.se-btn:active { transform: scale(.98); }
@media (prefers-reduced-motion: reduce) {
  .se-fb, .se-kp-ok svg { animation: none !important; }
  .se-btn:active { transform: none; }
}
`;

// ---------------------------------------------------------------------------
// Icons (inline SVG, currentColor) — keine Icon-Font-Abhaengigkeit
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
const IconChevron = (p) => (
  <Svg size={p.size}>
    <path d="M15 6l-6 6 6 6" />
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

function BracketCorners() {
  const base = { position: "absolute", width: 12, height: 12, borderColor: C.teal, borderStyle: "solid", borderWidth: 0 };
  return (
    <>
      <span style={{ ...base, top: -1, left: -1, borderTopWidth: 2, borderLeftWidth: 2 }} />
      <span style={{ ...base, top: -1, right: -1, borderTopWidth: 2, borderRightWidth: 2 }} />
      <span style={{ ...base, bottom: -1, left: -1, borderBottomWidth: 2, borderLeftWidth: 2 }} />
      <span style={{ ...base, bottom: -1, right: -1, borderBottomWidth: 2, borderRightWidth: 2 }} />
    </>
  );
}

// Prototyp-Beispiele zum schnellen Durchklicken (Dev-Helfer, im echten Build entfernbar)
const DEMOS = {
  strong:
    "Die Spannung ist der Antrieb, sie dr\u00FCckt die Ladung durch den Draht. Der Widerstand bremst diesen Fluss. Der Strom ergibt sich aus beiden. Wenn ich die Spannung festhalte und den Widerstand gr\u00F6\u00DFer mache, wird der Strom kleiner \u2014 die drei sind gekoppelt.",
  weak:
    "Spannung und Strom sind eigentlich dasselbe. Und je mehr Widerstand ich nehme, desto mehr Strom flie\u00DFt durch die LED.",
};

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------
export default function SelfExplanationScreen() {
  const concept = CONCEPT_URI;
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [empty, setEmpty] = useState(false);
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
  }

  function loadDemo(key) {
    setText(DEMOS[key]);
    check(DEMOS[key]);
  }

  const wrap = {
    background: C.bg,
    border: `1px solid ${C.edge}`,
    borderRadius: 14,
    padding: "20px 18px 18px",
    fontFamily: FONT,
    color: C.ink,
    position: "relative",
    maxWidth: 600,
    margin: "0 auto",
    backgroundImage: `linear-gradient(${C.edge} 1px,transparent 1px),linear-gradient(90deg,${C.edge} 1px,transparent 1px)`,
    backgroundSize: "26px 26px,26px 26px",
  };
  const panel = {
    position: "relative",
    background: C.pan,
    border: `1px solid ${C.edge}`,
    borderRadius: 10,
    padding: 16,
  };
  const btnBase = {
    fontFamily: FONT,
    fontSize: 14,
    borderRadius: 8,
    padding: "9px 16px",
    cursor: "pointer",
    border: `1px solid ${C.edge}`,
    background: "transparent",
    color: C.ink,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    transition: "transform .08s ease",
  };
  const btnGo = { ...btnBase, background: C.teal, color: "#06201C", borderColor: C.teal, fontWeight: 500 };
  const btnGhost = { ...btnBase, fontSize: 12.5, color: C.dim, padding: "7px 11px" };

  return (
    <div style={{ background: C.bg2, padding: 18, borderRadius: 16 }}>
      <style>{STYLE}</style>
      <div className="se-screen" style={wrap}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.dim }}>
            <IconChevron size={20} />
            <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: ".04em" }}>LERNFELD \u00B7 URI</span>
          </div>
          <span style={{ fontFamily: MONO, fontSize: 12, color: C.teal }}>Schritt 5 / 7 \u00B7 selbst erkl\u00E4ren</span>
        </div>

        {/* Prompt + Eingabe */}
        <div style={panel}>
          <BracketCorners />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: C.dim }}>
            <span style={{ color: C.teal, display: "inline-flex" }}>
              <IconMsg size={18} />
            </span>
            <span style={{ fontSize: 13 }}>Erkl\u00E4r in eigenen Worten</span>
          </div>
          <p style={{ margin: "0 0 4px", fontSize: 16.5, lineHeight: 1.5 }}>
            {"Warum kannst du bei "}
            <span style={{ fontFamily: MONO, color: C.teal }}>U = R \u00B7 I</span>
            {" nicht eine Gr\u00F6\u00DFe \u00E4ndern, ohne dass eine andere mitgeht?"}
          </p>
          <p style={{ margin: 0, fontSize: 13.5, color: C.dim }}>{concept.hint}</p>

          <textarea
            ref={taRef}
            className="se-ta"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Schreib 2\u20134 S\u00E4tze, so wie du es einem Klassenkameraden erkl\u00E4ren w\u00FCrdest\u2026"
            style={{
              width: "100%",
              boxSizing: "border-box",
              marginTop: 13,
              background: C.bg2,
              border: `1px solid ${C.edge}`,
              borderRadius: 8,
              color: C.ink,
              fontFamily: FONT,
              fontSize: 15,
              lineHeight: 1.6,
              padding: 12,
              minHeight: 108,
              resize: "vertical",
              outline: "none",
            }}
          />

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12, alignItems: "center" }}>
            <button className="se-btn" style={btnGo} onClick={() => check()}>
              <IconCheck size={15} />
              Pr\u00FCfen
            </button>
            <button className="se-btn" style={btnGhost} onClick={() => loadDemo("strong")}>
              Demo: starke Erkl\u00E4rung
            </button>
            <button className="se-btn" style={btnGhost} onClick={() => loadDemo("weak")}>
              Demo: mit Fehlvorstellung
            </button>
          </div>
        </div>

        {/* Leer-Hinweis */}
        {empty && (
          <div className="se-fb" style={{ ...panel, background: C.pan2, marginTop: 14 }}>
            <span style={{ fontSize: 14, color: C.dim }}>
              Schreib erst ein paar S\u00E4tze \u2014 dann schaut der Coach drauf.
            </span>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="se-fb" style={{ ...panel, background: C.pan2, marginTop: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
              <span style={{ color: C.teal, display: "inline-flex" }}>
                <IconSchool size={19} />
              </span>
              <span style={{ fontSize: 13, color: C.dim }}>Coach</span>
              <span
                style={{
                  marginLeft: "auto",
                  fontFamily: MONO,
                  fontSize: 12,
                  color: feedback.allGood ? C.teal : C.ember,
                }}
              >
                {feedback.verdict}
              </span>
            </div>

            {/* Kernpunkte */}
            {feedback.keyPoints.map((k) => (
              <div
                key={k.id}
                className={k.ok ? "se-kp-ok" : undefined}
                style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "7px 0" }}
              >
                <span style={{ color: k.ok ? C.teal : C.dim, display: "inline-flex", marginTop: 1 }}>
                  {k.ok ? <IconCheck /> : <IconCircle />}
                </span>
                <span style={{ fontSize: 14.5, color: k.ok ? C.ink : C.dim }}>{k.label}</span>
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
                  background: "rgba(232,116,92,.10)",
                  border: "1px solid rgba(232,116,92,.30)",
                  borderRadius: 8,
                  padding: "11px 12px",
                  marginTop: 8,
                }}
              >
                <span style={{ color: C.warn, display: "inline-flex", marginTop: 1 }}>
                  <IconWarn />
                </span>
                <div>
                  <div style={{ fontSize: 13, color: C.warn, marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.5 }}>{f.fix}</div>
                </div>
              </div>
            ))}

            {/* Sokratische Folgefrage */}
            <div
              style={{
                background: C.bg2,
                border: `1px solid ${C.edge}`,
                borderLeft: `3px solid ${C.ember}`,
                borderRadius: "0 8px 8px 0",
                padding: "12px 13px",
                marginTop: 14,
              }}
            >
              <div style={{ fontSize: 12, color: C.ember, marginBottom: 3, display: "flex", alignItems: "center", gap: 5 }}>
                <IconArrow size={15} />
                N\u00E4chster Schritt
              </div>
              <div style={{ fontSize: 14.5, lineHeight: 1.5 }}>{feedback.nextStep}</div>
            </div>

            <div style={{ marginTop: 13, display: "flex", gap: 8 }}>
              {feedback.allGood ? (
                <button className="se-btn" style={btnGo}>
                  Weiter zur Schaltung
                  <IconArrow size={15} />
                </button>
              ) : (
                <button className="se-btn" style={btnBase} onClick={() => taRef.current && taRef.current.focus()}>
                  Erkl\u00E4rung verbessern
                </button>
              )}
            </div>
          </div>
        )}

        {/* Leitplanken-Notiz (Reviewer-Hinweis) */}
        <p
          style={{
            fontFamily: MONO,
            fontSize: 11,
            color: C.dim,
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
          Coach klassifiziert nur, welche Kernpunkte getroffen sind. Alle Erkl\u00E4rtexte sind autoriert \u2014 im
          Prototyp Heuristik, sp\u00E4ter LLM-Call, gleicher Vertrag.
        </p>
      </div>
    </div>
  );
}
