import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Panel from "../../components/Panel.jsx";
import Button from "../../components/Button.jsx";
import { rise, pop } from "../../theme/motion.js";
import { loadClassifier, classifyExplanation } from "../../data/classifier.js";
import {
  IconCheck,
  IconCircle,
  IconWarn,
  IconArrow,
  IconMsg,
  IconSchool,
  IconShield,
} from "../../components/Icons.jsx";

/*
  SelfExplanationScreen — migriert aus self_explanation_screen_v1.jsx.
  Schritt der Lern-Schablone "selbst erörtern".

  LEITPLANKE (KI = sokratischer Coach, nie Quelle der Wahrheit):
  classifyExplanation() klassifiziert nur den Freitext gegen die autorisierte
  Konzept-Karte (CONCEPT_URI) und liefert {covered, misconceptions, confidence}.
  Jeder Coach-Text stammt aus autorisierten Snippets der Karte.

  AUSTAUSCH-PUNKT (vollzogen): classifyExplanation() ist jetzt eine semantische
  Embedding-Klassifikation (data/classifier.js, lokales Modell im Browser) statt
  Regex. Der Vertrag ist identisch — sie KLASSIFIZIERT nur gegen die autorisierte
  Konzeptkarte und generiert keinen Fachinhalt. (Siehe HANDOFF.md.)

  CONTENT: Die Konzept-Karte kommt als data-Prop aus self-explanation.js
  (vom FlowController geladen) — kein hardcodierter Themen-Inhalt mehr im Screen.
*/

// classifyExplanation kommt jetzt aus data/classifier.js (semantisch, async).
// Hier verbleibt nur die Feedback-Assembly aus autorisierten Snippets.

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

// Icons → components/Icons.jsx (konsolidiert).

// Prototyp-Beispiele zum schnellen Durchklicken (DEV-Helfer, nur im Dev-Modus sichtbar)
const DEMOS = {
  strong:
    "Die Spannung ist der Antrieb, sie drückt die Ladung durch den Draht. Der Widerstand bremst diesen Fluss. Der Strom ergibt sich aus beiden. Wenn ich die Spannung festhalte und den Widerstand größer mache, wird der Strom kleiner — die drei sind gekoppelt.",
  weak:
    "Spannung und Strom sind eigentlich dasselbe. Und je mehr Widerstand ich nehme, desto mehr Strom fließt durch die LED.",
};

// ---------------------------------------------------------------------------
// Fallback wenn keine Konzept-Karte vorliegt (leerer/ladender Themenbereich)
// ---------------------------------------------------------------------------
function PlaceholderShell({ titel, currentStep, totalSteps, onComplete }) {
  return (
    <div
      className="grid-bg"
      style={{ minHeight: "100%", display: "flex", justifyContent: "center", padding: "var(--space-5)" }}
    >
      <motion.div {...rise} style={{ width: "100%", maxWidth: 520 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "var(--space-4)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-label)",
          }}
        >
          <span style={{ color: "var(--c-dim)" }}>SELF-EXPLANATION</span>
          <span style={{ color: "var(--c-teal)" }}>
            Schritt {currentStep} / {totalSteps}
          </span>
        </div>
        <Panel>
          <p
            style={{
              margin: "0 0 var(--space-2)",
              color: "var(--c-dim)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-label)",
            }}
          >
            {titel.toUpperCase()}
          </p>
          <p style={{ margin: "0 0 var(--space-5)", fontSize: "var(--fs-body)", lineHeight: "var(--lh-relaxed)" }}>
            Inhalt folgt in Kürze.
          </p>
          <Button variant="go" onClick={onComplete}>
            Weiter
          </Button>
        </Panel>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------
export default function SelfExplanationScreen({ data, onComplete, currentStep, totalSteps, kontext }) {
  const concept = data;
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [classifierReady, setClassifierReady] = useState(false);
  const [classifierLoading, setClassifierLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [checking, setChecking] = useState(false);
  const taRef = useRef(null);

  // Embedding-Modell beim Mount laden (nur wenn eine Konzept-Karte vorliegt).
  useEffect(() => {
    if (!data || !data.keyPoints) return;
    let active = true;
    loadClassifier((progress) => {
      if (active && progress.status === "progress") {
        setLoadProgress(Math.round(progress.progress ?? 0));
      }
    }).then(() => {
      if (!active) return;
      setClassifierReady(true);
      setClassifierLoading(false);
    });
    return () => {
      active = false;
    };
  }, [data]);

  async function check(value) {
    if (!classifierReady) return;
    const v = value != null ? value : text;
    if (!v.trim()) {
      setFeedback(null);
      setEmpty(true);
      return;
    }
    setEmpty(false);
    setChecking(true);
    try {
      const result = await classifyExplanation(v, concept);
      setFeedback(buildFeedback(result, concept));
    } finally {
      setChecking(false);
    }
    setAttempts((n) => n + 1);
  }

  function loadDemo(key) {
    setText(DEMOS[key]);
    check(DEMOS[key]);
  }

  if (!data || !data.keyPoints) {
    return (
      <PlaceholderShell
        titel="Self-Explanation"
        currentStep={currentStep}
        totalSteps={totalSteps}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div
      className="grid-bg"
      style={{
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "var(--space-5) var(--space-4) var(--space-7)",
      }}
    >
      <motion.div {...rise} style={{ width: "100%", maxWidth: 600 }}>
        {/* Step indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "var(--space-4)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-label)",
          }}
        >
          <span
            style={{
              color: "var(--c-dim)",
              letterSpacing: ".04em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "62%",
            }}
          >
            LF {kontext?.lfNummer} · {kontext?.thema}
          </span>
          <span style={{ color: "var(--c-teal)", whiteSpace: "nowrap" }}>
            Schritt {currentStep} / {totalSteps} · selbst erklären
          </span>
        </div>

        {/* Prompt + Eingabe */}
        <Panel>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              marginBottom: "var(--space-2)",
              color: "var(--c-dim)",
            }}
          >
            <span style={{ color: "var(--c-teal)", display: "inline-flex" }}>
              <IconMsg size={18} />
            </span>
            <span style={{ fontSize: "var(--fs-sm)" }}>Erklär in eigenen Worten</span>
          </div>
          <p style={{ margin: "0 0 var(--space-1)", fontSize: "var(--fs-h3)", lineHeight: "var(--lh-base)" }}>
            {data.prompt}
          </p>
          {data.hint && (
            <p style={{ margin: 0, fontSize: "var(--fs-sm)", color: "var(--c-dim)" }}>{data.hint}</p>
          )}

          <textarea
            ref={taRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Schreib 2–4 Sätze, so wie du es einem Klassenkameraden erklären würdest…"
            style={{
              width: "100%",
              boxSizing: "border-box",
              marginTop: "var(--space-3)",
              background: "var(--c-bg2)",
              border: "1px solid var(--c-edge)",
              borderRadius: "var(--radius-sm)",
              color: "var(--c-ink)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--fs-body)",
              lineHeight: "var(--lh-relaxed)",
              padding: "var(--space-3)",
              minHeight: 108,
              resize: "vertical",
              outline: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "var(--space-2)",
              flexWrap: "wrap",
              marginTop: "var(--space-3)",
              alignItems: "center",
            }}
          >
            <Button
              variant="go"
              onClick={() => check()}
              disabled={!classifierReady || checking}
              style={{ opacity: !classifierReady || checking ? 0.6 : 1 }}
            >
              {checking ? (
                "Prüfe…"
              ) : classifierLoading ? (
                `Lädt KI… ${loadProgress}%`
              ) : (
                <>
                  <IconCheck size={15} />
                  Prüfen
                </>
              )}
            </Button>
            {import.meta.env.DEV && (
              <>
                <Button
                  variant="ghost"
                  onClick={() => loadDemo("strong")}
                  disabled={!classifierReady || checking}
                  style={{ opacity: !classifierReady || checking ? 0.6 : 1 }}
                >
                  Demo: starke Erklärung
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => loadDemo("weak")}
                  disabled={!classifierReady || checking}
                  style={{ opacity: !classifierReady || checking ? 0.6 : 1 }}
                >
                  Demo: mit Fehlvorstellung
                </Button>
              </>
            )}
          </div>

          {/* Warmup-Hinweis: nur beim ersten Prüfen (erste Inferenz baut WebGL-Shader auf) */}
          {checking && attempts === 0 && (
            <p
              style={{
                margin: "var(--space-3) 0 0",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-micro)",
                color: "var(--c-dim)",
              }}
            >
              Ersten Start vorbereiten — dauert ~15 Sekunden…
            </p>
          )}
        </Panel>

        {/* Leer-Hinweis */}
        {empty && (
          <motion.div {...rise} style={{ marginTop: "var(--space-4)" }}>
            <Panel tone="pan2">
              <span style={{ fontSize: "var(--fs-body)", color: "var(--c-dim)" }}>
                Schreib erst ein paar Sätze — dann schaut der Coach drauf.
              </span>
            </Panel>
          </motion.div>
        )}

        {/* Feedback */}
        {feedback && (
          <motion.div {...rise} style={{ marginTop: "var(--space-4)" }}>
            <Panel tone="pan2">
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-3)" }}>
                <span style={{ color: "var(--c-teal)", display: "inline-flex" }}>
                  <IconSchool size={19} />
                </span>
                <span style={{ fontSize: "var(--fs-sm)", color: "var(--c-dim)" }}>Coach</span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--fs-label)",
                    color: feedback.allGood ? "var(--c-ok)" : "var(--c-ember)",
                  }}
                >
                  {feedback.verdict}
                </span>
              </div>

              {/* Kernpunkte */}
              {feedback.keyPoints.map((k) => (
                <div
                  key={k.id}
                  style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start", padding: "var(--space-2) 0" }}
                >
                  <span
                    style={{ color: k.ok ? "var(--c-ok)" : "var(--c-dim)", display: "inline-flex", marginTop: 1 }}
                  >
                    {k.ok ? (
                      <motion.span {...pop} style={{ display: "inline-flex" }}>
                        <IconCheck />
                      </motion.span>
                    ) : (
                      <IconCircle />
                    )}
                  </span>
                  <span style={{ fontSize: "var(--fs-body)", color: k.ok ? "var(--c-ok)" : "var(--c-dim)" }}>
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
                    gap: "var(--space-3)",
                    alignItems: "flex-start",
                    background: "var(--c-warn-soft)",
                    border: "1px solid var(--c-warn-edge)",
                    borderRadius: "var(--radius-sm)",
                    padding: "var(--space-3) var(--space-3)",
                    marginTop: "var(--space-2)",
                  }}
                >
                  <span style={{ color: "var(--c-warn)", display: "inline-flex", marginTop: 1 }}>
                    <IconWarn />
                  </span>
                  <div>
                    <div style={{ fontSize: "var(--fs-sm)", color: "var(--c-warn)", marginBottom: "var(--space-1)" }}>
                      {f.label}
                    </div>
                    <div style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-base)" }}>{f.fix}</div>
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
                  padding: "var(--space-3) var(--space-3)",
                  marginTop: "var(--space-4)",
                }}
              >
                <div
                  style={{
                    fontSize: "var(--fs-label)",
                    color: "var(--c-ember)",
                    marginBottom: "var(--space-1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                  }}
                >
                  <IconArrow size={15} />
                  Nächster Schritt
                </div>
                <div style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-base)" }}>{feedback.nextStep}</div>
              </div>

              <div style={{ marginTop: "var(--space-3)", display: "flex", gap: "var(--space-2)" }}>
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
                  style={{ marginTop: "var(--space-2)", fontSize: "var(--fs-label)", color: "var(--c-dim)" }}
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
            fontSize: "var(--fs-micro)",
            color: "var(--c-dim)",
            margin: "var(--space-4) 0 0",
            lineHeight: "var(--lh-relaxed)",
            display: "flex",
            alignItems: "flex-start",
            gap: "var(--space-2)",
          }}
        >
          <span style={{ display: "inline-flex", marginTop: 1 }}>
            <IconShield size={14} />
          </span>
          Coach klassifiziert nur, welche Kernpunkte getroffen sind. Alle Erklärtexte sind
          autorisiert — die Klassifikation läuft lokal per Embedding-Modell im Browser.
        </p>
      </motion.div>
    </div>
  );
}
