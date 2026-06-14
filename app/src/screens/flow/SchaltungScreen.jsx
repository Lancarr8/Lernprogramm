import { useState } from "react";
import { motion } from "framer-motion";
import Panel from "../../components/Panel.jsx";
import Button from "../../components/Button.jsx";
import CircuitBuilder from "./CircuitBuilder.jsx";
import { rise } from "../../theme/motion.js";

// SchaltungScreen — Schaltplan lesen/verstehen.
// Liest Content aus `data` (Schema siehe NEXT_STEP / schaltung.js).

function Shell({ currentStep, totalSteps, children }) {
  return (
    <div
      className="grid-bg"
      style={{ minHeight: "100%", display: "flex", justifyContent: "center", padding: "22px 16px 40px" }}
    >
      <motion.div {...rise} style={{ width: "100%", maxWidth: 520 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 14,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
          }}
        >
          <span style={{ color: "var(--c-dim)" }}>LERNFELD · URI</span>
          <span style={{ color: "var(--c-teal)" }}>
            Schritt {currentStep} / {totalSteps}
          </span>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

const eyebrow = {
  margin: "0 0 12px",
  color: "var(--c-dim)",
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  letterSpacing: ".1em",
};

// Frage + aufklappbare Musterlösung (geteilt zwischen interaktiv- und Standard-Render).
function FrageAntwort({ data, showAntwort, setShowAntwort }) {
  if (!data.frage && !data.antwort) return null;
  return (
    <div style={{ marginTop: 16 }}>
      {data.frage && (
        <p style={{ margin: "0 0 12px", fontSize: 15.5, lineHeight: 1.55, color: "var(--c-ink)" }}>
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
              padding: "12px 13px",
              fontSize: 14.5,
              lineHeight: 1.5,
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

export default function SchaltungScreen({ data, onComplete, currentStep, totalSteps }) {
  const [showAntwort, setShowAntwort] = useState(false);

  if (!data) {
    return (
      <Shell currentStep={currentStep} totalSteps={totalSteps}>
        <Panel>
          <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--c-teal)" }}>
            Lade…
          </p>
        </Panel>
      </Shell>
    );
  }

  // Interaktiver Schaltungsaufbau (CircuitBuilder) statt statischem SVG.
  if (data.schaltplan?.typ === "interaktiv") {
    return (
      <Shell currentStep={currentStep} totalSteps={totalSteps}>
        <Panel>
          <p style={eyebrow}>SCHALTUNG</p>
          {data.titel && <h1 style={{ margin: "0 0 8px", fontSize: 20 }}>{data.titel}</h1>}
          {data.beschreibung && (
            <p style={{ margin: "0 0 10px", fontSize: 14.5, lineHeight: 1.55 }}>{data.beschreibung}</p>
          )}
          <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--c-dim)", lineHeight: 1.5 }}>
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
    <Shell currentStep={currentStep} totalSteps={totalSteps}>
      <Panel>
        <p style={eyebrow}>SCHALTUNG</p>
        {data.titel && <h1 style={{ margin: "0 0 10px", fontSize: 20 }}>{data.titel}</h1>}

        {data.beschreibung && (
          <p style={{ margin: "0 0 16px", fontSize: 15, lineHeight: 1.6 }}>{data.beschreibung}</p>
        )}

        {/* Schaltplan (nur wenn svg-inline + SVG vorhanden) */}
        {hasSvg && (
          <div
            style={{
              border: "1px solid var(--c-edge)",
              borderRadius: "var(--radius-md)",
              padding: 14,
              background: "var(--c-bg2)",
              marginBottom: 16,
              display: "flex",
              justifyContent: "center",
            }}
            // Schaltplan-SVG stammt aus autorisiertem Content (vertrauenswürdig).
            dangerouslySetInnerHTML={{ __html: plan.svg }}
          />
        )}

        {bauteile.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <p style={eyebrow}>AUFGEBAUT MIT</p>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14.5, lineHeight: 1.7 }}>
              {bauteile.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {data.frage && (
          <p style={{ margin: "0 0 12px", fontSize: 15.5, lineHeight: 1.55, color: "var(--c-ink)" }}>
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
                  padding: "12px 13px",
                  fontSize: 14.5,
                  lineHeight: 1.5,
                  fontFamily: "var(--font-mono)",
                  color: "var(--c-teal)",
                }}
              >
                {data.antwort}
              </motion.div>
            )}
          </>
        )}

        <div style={{ marginTop: 20 }}>
          <Button variant="go" onClick={onComplete}>
            {currentStep === totalSteps ? "Abschließen" : "Weiter"}
          </Button>
        </div>
      </Panel>
    </Shell>
  );
}
