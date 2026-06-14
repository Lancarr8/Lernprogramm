import { useState } from "react";
import { motion } from "framer-motion";
import Panel from "../../components/Panel.jsx";
import Button from "../../components/Button.jsx";
import ProgressBar from "../../components/ProgressBar.jsx";
import { rise } from "../../theme/motion.js";

// AufgabenScreen — gestufte Aufgaben mit sofortigem Feedback.
// Liest Content aus `data` (Schema siehe NEXT_STEP / aufgaben.js).
// Typen: "berechnung" (Zahl-Input ± Toleranz) | "multiple-choice".

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
      <p style={eyebrow}>BERECHNUNG</p>
      <p style={{ margin: "0 0 14px", fontSize: 16, lineHeight: 1.55 }}>{aufgabe.frage}</p>

      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
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
            fontSize: 16,
            padding: "10px 12px",
            outline: "none",
          }}
        />
        {aufgabe.einheit && (
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--c-dim)", fontSize: 15 }}>
            {aufgabe.einheit}
          </span>
        )}
        <Button variant="go" onClick={pruefen}>
          Prüfen
        </Button>
      </div>

      {aufgabe.hinweis && state !== "ok" && (
        <p style={{ margin: "12px 0 0", fontSize: 13, color: "var(--c-dim)" }}>
          Hinweis: {aufgabe.hinweis}
        </p>
      )}

      {state === "fail" && (
        <motion.p
          {...rise}
          style={{ margin: "12px 0 0", fontSize: 14, color: "var(--c-warn)" }}
        >
          Noch nicht richtig — probier's nochmal.
        </motion.p>
      )}

      {state === "ok" && (
        <motion.div {...rise} style={{ marginTop: 14 }}>
          <p style={{ margin: "0 0 12px", fontSize: 14, color: "var(--c-teal)" }}>
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
      <p style={eyebrow}>MULTIPLE CHOICE</p>
      <p style={{ margin: "0 0 14px", fontSize: 16, lineHeight: 1.55 }}>{aufgabe.frage}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {aufgabe.optionen.map((opt, i) => {
          const selected = picked === i;
          const reveal = picked !== null;
          let borderColor = "var(--c-edge)";
          let textColor = "var(--c-ink)";
          if (reveal && i === aufgabe.korrekt) {
            borderColor = "var(--c-teal)";
            textColor = "var(--c-teal)";
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
                padding: "11px 13px",
                borderRadius: "var(--radius-sm)",
                border: `1px solid ${borderColor}`,
                background: "var(--c-bg2)",
                color: textColor,
                fontSize: 14.5,
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <motion.div {...rise} style={{ marginTop: 14 }}>
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 14,
              color: istKorrekt ? "var(--c-teal)" : "var(--c-warn)",
            }}
          >
            {istKorrekt ? "Richtig." : "Nicht ganz."}
          </p>
          {aufgabe.erklaerung && (
            <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.5, color: "var(--c-ink)" }}>
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

export default function AufgabenScreen({ data, onComplete, currentStep, totalSteps }) {
  const [index, setIndex] = useState(0);

  // Ladezustand
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

  const aufgaben = data.aufgaben || [];

  // Fallback: keine Aufgaben befüllt
  if (aufgaben.length === 0) {
    return (
      <Shell currentStep={currentStep} totalSteps={totalSteps}>
        <Panel>
          <p style={eyebrow}>AUFGABEN</p>
          <p style={{ margin: "0 0 20px", fontSize: 15, lineHeight: 1.6, color: "var(--c-dim)" }}>
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
    <Shell currentStep={currentStep} totalSteps={totalSteps}>
      {data.titel && (
        <h1 style={{ margin: "0 0 4px", fontSize: 20 }}>{data.titel}</h1>
      )}
      <ProgressBar done={index} total={aufgaben.length} style={{ margin: "0 0 14px" }} />
      <span
        className="mono"
        style={{ fontSize: 11.5, color: "var(--c-dim)", display: "block", marginBottom: 10 }}
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
