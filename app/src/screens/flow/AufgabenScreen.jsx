import { useState } from "react";
import { motion } from "framer-motion";
import Panel from "../../components/Panel.jsx";
import Button from "../../components/Button.jsx";
import ProgressBar from "../../components/ProgressBar.jsx";
import SectionTag from "../../components/SectionTag.jsx";
import { rise } from "../../theme/motion.js";

// AufgabenScreen — gestufte Aufgaben mit sofortigem Feedback.
// Liest Content aus `data` (Schema siehe NEXT_STEP / aufgaben.js).
// Typen: "berechnung" (Zahl-Input ± Toleranz) | "multiple-choice".

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

function BerechnungAufgabe({ aufgabe, onSolved, isLast }) {
  const [val, setVal] = useState("");
  const [state, setState] = useState(null); // null | "ok" | "fail"

  function pruefen() {
    const num = parseFloat(val.replace(",", "."));
    if (Number.isNaN(num)) {
      setState("fail");
      return;
    }
    const tol = aufgabe.toleranz ?? 0;
    setState(Math.abs(num - aufgabe.loesung) <= tol ? "ok" : "fail");
  }

  return (
    <Panel>
      <SectionTag style={{ marginBottom: "var(--space-3)" }}>BERECHNUNG</SectionTag>
      <p style={{ margin: "0 0 var(--space-4)", fontSize: "var(--fs-h3)", lineHeight: "var(--lh-base)" }}>
        {aufgabe.frage}
      </p>

      <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", flexWrap: "wrap" }}>
        <input
          type="text"
          inputMode="decimal"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            if (state) setState(null);
          }}
          placeholder="Wert"
          style={{
            flex: "1 1 120px",
            minWidth: 0,
            background: "var(--c-bg2)",
            border: "1px solid var(--c-edge)",
            borderRadius: "var(--radius-sm)",
            color: "var(--c-ink)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-h3)",
            padding: "var(--space-3) var(--space-3)",
            outline: "none",
          }}
        />
        {aufgabe.einheit && (
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--c-dim)", fontSize: "var(--fs-body)" }}>
            {aufgabe.einheit}
          </span>
        )}
        <Button variant="go" onClick={pruefen}>
          Prüfen
        </Button>
      </div>

      {aufgabe.hinweis && state !== "ok" && (
        <p style={{ margin: "var(--space-3) 0 0", fontSize: "var(--fs-sm)", color: "var(--c-dim)" }}>
          Hinweis: {aufgabe.hinweis}
        </p>
      )}

      {state === "fail" && (
        <motion.p
          {...rise}
          style={{ margin: "var(--space-3) 0 0", fontSize: "var(--fs-body)", color: "var(--c-warn)" }}
        >
          Noch nicht richtig — probier's nochmal.
        </motion.p>
      )}

      {state === "ok" && (
        <motion.div {...rise} style={{ marginTop: "var(--space-4)" }}>
          <p style={{ margin: "0 0 var(--space-3)", fontSize: "var(--fs-body)", color: "var(--c-ok)" }}>
            Richtig — {aufgabe.loesung}
            {aufgabe.einheit ? ` ${aufgabe.einheit}` : ""}.
          </p>
          <Button variant="go" onClick={onSolved}>
            {isLast ? "Abschließen" : "Nächste Aufgabe"}
          </Button>
        </motion.div>
      )}
    </Panel>
  );
}

function MultipleChoiceAufgabe({ aufgabe, onSolved, isLast }) {
  const [picked, setPicked] = useState(null);
  const istKorrekt = picked === aufgabe.korrekt;

  return (
    <Panel>
      <SectionTag style={{ marginBottom: "var(--space-3)" }}>MULTIPLE CHOICE</SectionTag>
      <p style={{ margin: "0 0 var(--space-4)", fontSize: "var(--fs-h3)", lineHeight: "var(--lh-base)" }}>
        {aufgabe.frage}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        {aufgabe.optionen.map((opt, i) => {
          const selected = picked === i;
          const reveal = picked !== null;
          let borderColor = "var(--c-edge)";
          let textColor = "var(--c-ink)";
          if (reveal && i === aufgabe.korrekt) {
            borderColor = "var(--c-ok)";
            textColor = "var(--c-ok)";
          } else if (reveal && selected) {
            borderColor = "var(--c-warn-edge)";
            textColor = "var(--c-warn)";
          }
          return (
            <button
              key={i}
              onClick={() => picked === null && setPicked(i)}
              disabled={reveal}
              style={{
                all: "unset",
                cursor: reveal ? "default" : "pointer",
                boxSizing: "border-box",
                width: "100%",
                padding: "var(--space-3) var(--space-3)",
                borderRadius: "var(--radius-sm)",
                border: `1px solid ${borderColor}`,
                background: "var(--c-bg2)",
                color: textColor,
                fontSize: "var(--fs-body)",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <motion.div {...rise} style={{ marginTop: "var(--space-4)" }}>
          <p
            style={{
              margin: "0 0 var(--space-2)",
              fontSize: "var(--fs-body)",
              color: istKorrekt ? "var(--c-ok)" : "var(--c-warn)",
            }}
          >
            {istKorrekt ? "Richtig." : "Nicht ganz."}
          </p>
          {aufgabe.erklaerung && (
            <p
              style={{
                margin: "0 0 var(--space-3)",
                fontSize: "var(--fs-body)",
                lineHeight: "var(--lh-base)",
                color: "var(--c-ink)",
              }}
            >
              {aufgabe.erklaerung}
            </p>
          )}
          <Button variant="go" onClick={onSolved}>
            {isLast ? "Abschließen" : "Nächste Aufgabe"}
          </Button>
        </motion.div>
      )}
    </Panel>
  );
}

export default function AufgabenScreen({ data, onComplete, currentStep, totalSteps, kontext }) {
  const [index, setIndex] = useState(0);

  // Ladezustand
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

  const aufgaben = data.aufgaben || [];

  // Fallback: keine Aufgaben befüllt
  if (aufgaben.length === 0) {
    return (
      <Shell currentStep={currentStep} totalSteps={totalSteps} kontext={kontext}>
        <Panel>
          <SectionTag style={{ marginBottom: "var(--space-3)" }}>AUFGABEN</SectionTag>
          <p
            style={{
              margin: "0 0 var(--space-5)",
              fontSize: "var(--fs-body)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--c-dim)",
            }}
          >
            Aufgaben folgen in Kürze.
          </p>
          <Button variant="go" onClick={onComplete}>
            {currentStep === totalSteps ? "Abschließen" : "Weiter"}
          </Button>
        </Panel>
      </Shell>
    );
  }

  const aufgabe = aufgaben[index];
  const isLast = index === aufgaben.length - 1;

  function handleSolved() {
    if (isLast) onComplete();
    else setIndex((i) => i + 1);
  }

  return (
    <Shell currentStep={currentStep} totalSteps={totalSteps} kontext={kontext}>
      {data.titel && (
        <h1 style={{ margin: "0 0 var(--space-1)", fontSize: "var(--fs-h1)" }}>{data.titel}</h1>
      )}
      <ProgressBar done={index} total={aufgaben.length} style={{ margin: "0 0 var(--space-4)" }} />
      <span
        className="mono"
        style={{ fontSize: "var(--fs-micro)", color: "var(--c-dim)", display: "block", marginBottom: "var(--space-3)" }}
      >
        Aufgabe {index + 1} / {aufgaben.length}
      </span>

      {/* key=index: Antwort-State pro Aufgabe frisch */}
      {aufgabe.typ === "multiple-choice" ? (
        <MultipleChoiceAufgabe key={index} aufgabe={aufgabe} onSolved={handleSolved} isLast={isLast} />
      ) : (
        <BerechnungAufgabe key={index} aufgabe={aufgabe} onSolved={handleSolved} isLast={isLast} />
      )}
    </Shell>
  );
}
