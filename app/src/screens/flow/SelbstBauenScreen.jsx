import { useState } from "react";
import { motion } from "framer-motion";
import Panel from "../../components/Panel.jsx";
import Button from "../../components/Button.jsx";
import SectionTag from "../../components/SectionTag.jsx";
import { rise } from "../../theme/motion.js";
import { IconTick, IconWarn } from "../../components/Icons.jsx";

// SelbstBauenScreen — Aufbauanleitung / Praxisaufgabe.
// Liest Content aus `data` (Schema siehe NEXT_STEP / selbst-bauen.js).

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
        gap: "var(--space-3)",
        padding: "var(--space-2) 0",
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
        }}
      >
        {checked ? <IconTick size={13} /> : null}
      </span>
      <span
        style={{
          fontSize: "var(--fs-body)",
          lineHeight: "var(--lh-base)",
          color: checked ? "var(--c-dim)" : "var(--c-ink)",
        }}
      >
        {children}
      </span>
    </button>
  );
}

export default function SelbstBauenScreen({ data, onComplete, currentStep, totalSteps, kontext }) {
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
      <Shell currentStep={currentStep} totalSteps={totalSteps} kontext={kontext}>
        <Panel>
          <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--c-teal)" }}>
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
      <Shell currentStep={currentStep} totalSteps={totalSteps} kontext={kontext}>
        <Panel>
          <SectionTag style={{ marginBottom: "var(--space-3)" }}>SELBST BAUEN</SectionTag>
          <p
            style={{
              margin: "0 0 var(--space-5)",
              fontSize: "var(--fs-body)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--c-dim)",
            }}
          >
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
    <Shell currentStep={currentStep} totalSteps={totalSteps} kontext={kontext}>
      <motion.div {...rise} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        {data.titel && <h1 style={{ margin: 0, fontSize: "var(--fs-h1)" }}>{data.titel}</h1>}

        {/* Sicherheitshinweis */}
        {data.sicherheit && (
          <div
            style={{
              display: "flex",
              gap: "var(--space-3)",
              alignItems: "flex-start",
              background: "var(--c-warn-soft)",
              border: "1px solid var(--c-warn-edge)",
              borderRadius: "var(--radius-md)",
              padding: "var(--space-3) var(--space-3)",
            }}
          >
            <span aria-hidden="true" style={{ color: "var(--c-warn)", display: "inline-flex", marginTop: 1 }}>
              <IconWarn size={17} />
            </span>
            <div>
              <div
                style={{
                  fontSize: "var(--fs-micro)",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "var(--c-warn)",
                  marginBottom: "var(--space-1)",
                }}
              >
                Sicherheit
              </div>
              <div style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-base)" }}>{data.sicherheit}</div>
            </div>
          </div>
        )}

        {/* Materialliste */}
        {materialien.length > 0 && (
          <Panel>
            <SectionTag style={{ marginBottom: "var(--space-3)" }}>MATERIAL</SectionTag>
            {materialien.map((m, i) => (
              <CheckRow key={i} checked={matDone.has(i)} onToggle={() => toggleMat(i)}>
                <b style={{ color: "var(--c-teal)", fontWeight: 500 }}>{m.menge}×</b> {m.bauteil}
              </CheckRow>
            ))}
          </Panel>
        )}

        {/* Schritte */}
        <Panel>
          <SectionTag style={{ marginBottom: "var(--space-3)" }}>AUFBAU</SectionTag>
          {schritte.map((s, i) => (
            <CheckRow key={i} checked={stepDone.has(i)} onToggle={() => toggleStep(i)}>
              <b style={{ color: "var(--c-teal)", fontWeight: 500, marginRight: "var(--space-2)" }}>{i + 1}.</b>
              {s}
            </CheckRow>
          ))}
        </Panel>

        {/* Abschluss */}
        {alleAbgehakt && data.abschluss && (
          <motion.p
            {...rise}
            style={{ margin: 0, fontSize: "var(--fs-body)", lineHeight: "var(--lh-base)", color: "var(--c-ok)" }}
          >
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
