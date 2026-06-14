import { useState } from "react";
import { motion } from "framer-motion";
import Panel from "../../components/Panel.jsx";
import Button from "../../components/Button.jsx";
import { rise } from "../../theme/motion.js";

// SelbstBauenScreen — Aufbauanleitung / Praxisaufgabe.
// Liest Content aus `data` (Schema siehe NEXT_STEP / selbst-bauen.js).

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

// Abhakbare Zeile (Material oder Schritt).
function CheckRow({ checked, onToggle, children }) {
  return (
    <button
      onClick={onToggle}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "8px 0",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flex: "none",
          width: 18,
          height: 18,
          marginTop: 1,
          borderRadius: 5,
          border: `1px solid ${checked ? "var(--c-teal)" : "var(--c-edge)"}`,
          background: checked ? "var(--c-teal)" : "transparent",
          color: "#06201C",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {checked ? "✓" : ""}
      </span>
      <span style={{ fontSize: 14.5, lineHeight: 1.5, color: checked ? "var(--c-dim)" : "var(--c-ink)" }}>
        {children}
      </span>
    </button>
  );
}

export default function SelbstBauenScreen({ data, onComplete, currentStep, totalSteps }) {
  const [matDone, setMatDone] = useState(() => new Set());
  const [stepDone, setStepDone] = useState(() => new Set());

  function toggle(setFn) {
    return (i) =>
      setFn((prev) => {
        const next = new Set(prev);
        if (next.has(i)) next.delete(i);
        else next.add(i);
        return next;
      });
  }
  const toggleMat = toggle(setMatDone);
  const toggleStep = toggle(setStepDone);

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

  const materialien = data.materialien || [];
  const schritte = data.schritte || [];

  // Fallback: keine Schritte befüllt
  if (schritte.length === 0) {
    return (
      <Shell currentStep={currentStep} totalSteps={totalSteps}>
        <Panel>
          <p style={eyebrow}>SELBST BAUEN</p>
          <p style={{ margin: "0 0 20px", fontSize: 15, lineHeight: 1.6, color: "var(--c-dim)" }}>
            Inhalt folgt in Kürze.
          </p>
          <Button variant="go" onClick={onComplete}>
            {currentStep === totalSteps ? "Abschließen" : "Weiter"}
          </Button>
        </Panel>
      </Shell>
    );
  }

  const alleAbgehakt = stepDone.size === schritte.length;

  return (
    <Shell currentStep={currentStep} totalSteps={totalSteps}>
      <motion.div {...rise} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {data.titel && <h1 style={{ margin: 0, fontSize: 21 }}>{data.titel}</h1>}

        {/* Sicherheitshinweis */}
        {data.sicherheit && (
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              background: "var(--c-warn-soft)",
              border: "1px solid var(--c-warn-edge)",
              borderRadius: "var(--radius-md)",
              padding: "12px 13px",
            }}
          >
            <span aria-hidden="true" style={{ color: "var(--c-warn)", fontSize: 16, marginTop: 1 }}>
              ⚠
            </span>
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "var(--c-warn)",
                  marginBottom: 3,
                }}
              >
                Sicherheit
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5 }}>{data.sicherheit}</div>
            </div>
          </div>
        )}

        {/* Materialliste */}
        {materialien.length > 0 && (
          <Panel>
            <p style={eyebrow}>MATERIAL</p>
            {materialien.map((m, i) => (
              <CheckRow key={i} checked={matDone.has(i)} onToggle={() => toggleMat(i)}>
                <b style={{ color: "var(--c-teal)", fontWeight: 500 }}>{m.menge}×</b> {m.bauteil}
              </CheckRow>
            ))}
          </Panel>
        )}

        {/* Schritte */}
        <Panel>
          <p style={eyebrow}>AUFBAU</p>
          {schritte.map((s, i) => (
            <CheckRow key={i} checked={stepDone.has(i)} onToggle={() => toggleStep(i)}>
              <b style={{ color: "var(--c-teal)", fontWeight: 500, marginRight: 6 }}>{i + 1}.</b>
              {s}
            </CheckRow>
          ))}
        </Panel>

        {/* Abschluss */}
        {alleAbgehakt && data.abschluss && (
          <motion.p {...rise} style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "var(--c-teal)" }}>
            {data.abschluss}
          </motion.p>
        )}

        <Button
          variant="go"
          onClick={onComplete}
          disabled={!alleAbgehakt}
          style={{
            justifyContent: "center",
            opacity: alleAbgehakt ? 1 : 0.45,
            cursor: alleAbgehakt ? "pointer" : "not-allowed",
          }}
        >
          {alleAbgehakt
            ? currentStep === totalSteps
              ? "Abschließen"
              : "Weiter"
            : `Noch ${schritte.length - stepDone.size} Schritt${
                schritte.length - stepDone.size > 1 ? "e" : ""
              } abhaken`}
        </Button>
      </motion.div>
    </Shell>
  );
}
