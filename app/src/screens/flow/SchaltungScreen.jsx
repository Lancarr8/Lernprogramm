import { useState } from "react";
import { motion } from "framer-motion";
import Panel from "../../components/Panel.jsx";
import Button from "../../components/Button.jsx";
import SectionTag from "../../components/SectionTag.jsx";
import CircuitBuilder from "./CircuitBuilder.jsx";
import { rise } from "../../theme/motion.js";

// SchaltungScreen — Schaltplan lesen/verstehen.
// Liest Content aus `data` (Schema siehe NEXT_STEP / schaltung.js).

function Shell({ currentStep, totalSteps, kontext, children }) {
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
          <span
            style={{
              color: "var(--c-dim)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "62%",
            }}
          >
            LF {kontext?.lfNummer} · {kontext?.thema}
          </span>
          <span style={{ color: "var(--c-teal)", whiteSpace: "nowrap" }}>
            Schritt {currentStep} / {totalSteps}
          </span>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

// Frage + aufklappbare Musterlösung (geteilt zwischen interaktiv- und Standard-Render).
function FrageAntwort({ data, showAntwort, setShowAntwort }) {
  if (!data.frage && !data.antwort) return null;
  return (
    <div style={{ marginTop: "var(--space-4)" }}>
      {data.frage && (
        <p
          style={{
            margin: "0 0 var(--space-3)",
            fontSize: "var(--fs-body)",
            lineHeight: "var(--lh-base)",
            color: "var(--c-ink)",
          }}
        >
          {data.frage}
        </p>
      )}
      {data.antwort &&
        (!showAntwort ? (
          <Button onClick={() => setShowAntwort(true)}>Lösung anzeigen</Button>
        ) : (
          <motion.div
            {...rise}
            style={{
              background: "var(--c-bg2)",
              border: "1px solid var(--c-edge)",
              borderLeft: "3px solid var(--c-teal)",
              borderRadius: "0 8px 8px 0",
              padding: "var(--space-3) var(--space-3)",
              fontSize: "var(--fs-body)",
              lineHeight: "var(--lh-base)",
              fontFamily: "var(--font-mono)",
              color: "var(--c-teal)",
              whiteSpace: "pre-line",
            }}
          >
            {data.antwort}
          </motion.div>
        ))}
    </div>
  );
}

export default function SchaltungScreen({ data, onComplete, currentStep, totalSteps, kontext }) {
  const [showAntwort, setShowAntwort] = useState(false);

  if (!data) {
    return (
      <Shell currentStep={currentStep} totalSteps={totalSteps} kontext={kontext}>
        <Panel>
          <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--c-teal)" }}>
            Lade…
          </p>
        </Panel>
      </Shell>
    );
  }

  // Interaktiver Schaltungsaufbau (CircuitBuilder) statt statischem SVG.
  if (data.schaltplan?.typ === "interaktiv") {
    return (
      <Shell currentStep={currentStep} totalSteps={totalSteps} kontext={kontext}>
        <Panel>
          <SectionTag style={{ marginBottom: "var(--space-3)" }}>SCHALTUNG</SectionTag>
          {data.titel && (
            <h1 style={{ margin: "0 0 var(--space-2)", fontSize: "var(--fs-h1)" }}>{data.titel}</h1>
          )}
          {data.beschreibung && (
            <p style={{ margin: "0 0 var(--space-3)", fontSize: "var(--fs-body)", lineHeight: "var(--lh-base)" }}>
              {data.beschreibung}
            </p>
          )}
          <p
            style={{
              margin: "0 0 var(--space-4)",
              fontSize: "var(--fs-sm)",
              color: "var(--c-dim)",
              lineHeight: "var(--lh-base)",
            }}
          >
            {data.schaltplan.hinweis}
          </p>
          <CircuitBuilder config={data.schaltplan} onSolved={onComplete} />
          <FrageAntwort data={data} showAntwort={showAntwort} setShowAntwort={setShowAntwort} />
        </Panel>
      </Shell>
    );
  }

  const plan = data.schaltplan || {};
  const hasSvg = plan.typ === "svg-inline" && plan.svg;
  const bauteile = data.aufgebautMit || [];

  return (
    <Shell currentStep={currentStep} totalSteps={totalSteps} kontext={kontext}>
      <Panel>
        <SectionTag style={{ marginBottom: "var(--space-3)" }}>SCHALTUNG</SectionTag>
        {data.titel && (
          <h1 style={{ margin: "0 0 var(--space-3)", fontSize: "var(--fs-h1)" }}>{data.titel}</h1>
        )}

        {data.beschreibung && (
          <p style={{ margin: "0 0 var(--space-4)", fontSize: "var(--fs-body)", lineHeight: "var(--lh-relaxed)" }}>
            {data.beschreibung}
          </p>
        )}

        {/* Schaltplan (nur wenn svg-inline + SVG vorhanden) */}
        {hasSvg && (
          <div
            style={{
              border: "1px solid var(--c-edge)",
              borderRadius: "var(--radius-md)",
              padding: "var(--space-4)",
              background: "var(--c-bg2)",
              marginBottom: "var(--space-4)",
              display: "flex",
              justifyContent: "center",
            }}
            // Schaltplan-SVG stammt aus autorisiertem Content (vertrauenswürdig).
            dangerouslySetInnerHTML={{ __html: plan.svg }}
          />
        )}

        {bauteile.length > 0 && (
          <div style={{ marginBottom: "var(--space-4)" }}>
            <SectionTag style={{ marginBottom: "var(--space-3)" }}>AUFGEBAUT MIT</SectionTag>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: "var(--fs-body)", lineHeight: "var(--lh-relaxed)" }}>
              {bauteile.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {data.frage && (
          <p
            style={{
              margin: "0 0 var(--space-3)",
              fontSize: "var(--fs-body)",
              lineHeight: "var(--lh-base)",
              color: "var(--c-ink)",
            }}
          >
            {data.frage}
          </p>
        )}

        {/* Lösung-Toggle */}
        {data.antwort && (
          <>
            {!showAntwort ? (
              <Button onClick={() => setShowAntwort(true)}>Lösung anzeigen</Button>
            ) : (
              <motion.div
                {...rise}
                style={{
                  background: "var(--c-bg2)",
                  border: "1px solid var(--c-edge)",
                  borderLeft: "3px solid var(--c-teal)",
                  borderRadius: "0 8px 8px 0",
                  padding: "var(--space-3) var(--space-3)",
                  fontSize: "var(--fs-body)",
                  lineHeight: "var(--lh-base)",
                  fontFamily: "var(--font-mono)",
                  color: "var(--c-teal)",
                }}
              >
                {data.antwort}
              </motion.div>
            )}
          </>
        )}

        <div style={{ marginTop: "var(--space-5)" }}>
          <Button variant="go" onClick={onComplete}>
            {currentStep === totalSteps ? "Abschließen" : "Weiter"}
          </Button>
        </div>
      </Panel>
    </Shell>
  );
}
