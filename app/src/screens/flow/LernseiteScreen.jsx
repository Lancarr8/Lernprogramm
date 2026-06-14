import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Panel from "../../components/Panel.jsx";
import Button from "../../components/Button.jsx";
import ProgressBar from "../../components/ProgressBar.jsx";
import { rise, motion as motionTokens } from "../../theme/motion.js";

// LernseiteScreen — migriert aus uri_slice_prototype.jsx.
// Hex-Werte → CSS-Custom-Properties, CSS-Animationen → Framer Motion,
// inline <style> entfernt, shared Panel/Button/ProgressBar.
// MODES-Daten + Dreieck-SVG bleiben inline (wandern in Phase 4 in Content).

const MODES = {
  U: {
    key: "U",
    label: "Spannung",
    formula: "U = R · I",
    worked: ["R = 4 Ω", "I = 3 A", "U = 4 Ω · 3 A = 12 V"],
    result: "12 V",
  },
  R: {
    key: "R",
    label: "Widerstand",
    formula: "R = U / I",
    worked: ["U = 12 V", "I = 3 A", "R = 12 V / 3 A = 4 Ω"],
    result: "4 Ω",
  },
  I: {
    key: "I",
    label: "Strom",
    formula: "I = U / R",
    worked: ["U = 12 V", "R = 4 Ω", "I = 12 V / 4 Ω = 3 A"],
    result: "3 A",
  },
};

const tagStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  fontSize: 10.5,
  letterSpacing: ".16em",
  textTransform: "uppercase",
  color: "var(--c-dim)",
};

function TagDot({ color = "var(--c-ember)" }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: 5, height: 5, borderRadius: "50%", background: color }}
    />
  );
}

export default function LernseiteScreen({ onComplete, currentStep, totalSteps }) {
  const [sel, setSel] = useState("U");
  const [water, setWater] = useState(false);
  const m = MODES[sel];

  // Aktive Zelle = Ember-Text; übrige Zellen abgedimmt.
  const cellTextFill = (k) => (sel === k ? "var(--c-ember)" : "var(--c-teal)");
  const cellOpacity = (k) => (sel === k ? 1 : 0.4);

  return (
    <div
      className="grid-bg"
      style={{ minHeight: "100%", display: "flex", justifyContent: "center", padding: "22px 16px 40px" }}
    >
      <motion.div
        {...rise}
        style={{ width: "100%", maxWidth: 460, display: "flex", flexDirection: "column", gap: 14 }}
      >
        {/* HEADER */}
        <Panel>
          <div
            style={{
              fontSize: 10.5,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "var(--c-teal)",
            }}
          >
            Lernfeld 1 · Grundlagen · Schritt {currentStep} / {totalSteps}
          </div>
          <h1 style={{ fontSize: 25, fontWeight: 500, margin: "5px 0 6px", letterSpacing: "-.01em" }}>
            Das Ohmsche Gesetz
          </h1>
          <div style={{ fontSize: 14, color: "var(--c-dim)" }}>
            Spannung, Strom und Widerstand hängen zusammen —{" "}
            <b style={{ color: "var(--c-teal)", fontWeight: 500 }}>U = R · I</b>
          </div>
          <ProgressBar done={currentStep} total={totalSteps} style={{ marginTop: 13 }} />
        </Panel>

        {/* REAL WORLD ANCHOR */}
        <Panel>
          <div style={{ ...tagStyle, marginBottom: 9 }}>
            <TagDot />
            Wo's vorkommt
          </div>
          <div style={{ fontSize: 14.5, lineHeight: 1.5 }}>
            Eine LED braucht <b style={{ color: "var(--c-ember)", fontWeight: 500 }}>20 mA</b> und
            verträgt <b style={{ color: "var(--c-ember)", fontWeight: 500 }}>2 V</b>. Du hängst sie an{" "}
            <b style={{ color: "var(--c-ember)", fontWeight: 500 }}>5 V</b> — ohne Vorwiderstand
            stirbt sie. Genau diesen Widerstand sagt dir das Ohmsche Gesetz.
          </div>
        </Panel>

        {/* WHY — Wasser-Analogie (Akkordeon via Framer AnimatePresence) */}
        <Panel>
          <button
            aria-expanded={water}
            onClick={() => setWater((v) => !v)}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              fontSize: 13,
              color: "var(--c-dim)",
            }}
          >
            <span>
              <span style={{ color: "var(--c-teal)", fontWeight: 500 }}>Das Warum</span> · die
              Wasser-Analogie
            </span>
            <motion.span
              animate={{ rotate: water ? 180 : 0 }}
              transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease.standard }}
              style={{ color: "var(--c-teal)", display: "inline-flex" }}
            >
              ▾
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {water && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: motionTokens.duration.base, ease: motionTokens.ease.standard }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ paddingTop: 11 }}>
                  {[
                    ["Spannung U", "der Druck, der dahintersteht."],
                    ["Strom I", "wie viel tatsächlich fließt."],
                    ["Widerstand R", "die Engstelle, die bremst."],
                  ].map(([term, desc]) => (
                    <div
                      key={term}
                      style={{
                        display: "flex",
                        gap: 9,
                        alignItems: "flex-start",
                        fontSize: 13,
                        lineHeight: 1.45,
                        marginBottom: 7,
                      }}
                    >
                      <em
                        style={{
                          fontStyle: "normal",
                          color: "var(--c-teal)",
                          fontWeight: 500,
                          minWidth: 74,
                          display: "inline-block",
                        }}
                      >
                        {term}
                      </em>
                      {desc}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Panel>

        {/* SIGNATURE — interaktives Dreieck */}
        <Panel>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <div style={tagStyle}>
              <TagDot color="var(--c-teal)" />
              Probier's
            </div>
            <div style={{ fontSize: 11, color: "var(--c-dim)" }}>Tipp an, was du suchst</div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "188px 1fr",
              gap: 14,
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <svg viewBox="0 0 220 190" width="188" role="img" aria-label="U-R-I Dreieck">
              <path
                d="M110 14 L206 176 L14 176 Z"
                style={{ stroke: "var(--c-teal)", strokeWidth: 1.4, fill: "transparent" }}
              />
              <line
                x1="60"
                y1="100"
                x2="160"
                y2="100"
                style={{ stroke: "var(--c-teal)", strokeWidth: 1.4 }}
              />
              <line
                x1="110"
                y1="100"
                x2="110"
                y2="176"
                style={{ stroke: "var(--c-teal)", strokeWidth: 1.4 }}
              />

              <g onClick={() => setSel("U")} style={{ cursor: "pointer", opacity: cellOpacity("U") }}>
                <path d="M110 14 L160 100 L60 100 Z" fill="transparent" />
                <text
                  x="110"
                  y="74"
                  textAnchor="middle"
                  fontSize="30"
                  style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fill: cellTextFill("U") }}
                >
                  U
                </text>
              </g>
              <g onClick={() => setSel("R")} style={{ cursor: "pointer", opacity: cellOpacity("R") }}>
                <path d="M60 100 L110 100 L110 176 L14 176 Z" fill="transparent" />
                <text
                  x="74"
                  y="150"
                  textAnchor="middle"
                  fontSize="27"
                  style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fill: cellTextFill("R") }}
                >
                  R
                </text>
              </g>
              <g onClick={() => setSel("I")} style={{ cursor: "pointer", opacity: cellOpacity("I") }}>
                <path d="M110 100 L160 100 L206 176 L110 176 Z" fill="transparent" />
                <text
                  x="146"
                  y="150"
                  textAnchor="middle"
                  fontSize="27"
                  style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fill: cellTextFill("I") }}
                >
                  I
                </text>
              </g>
            </svg>

            <div
              style={{
                border: "1px solid var(--c-edge)",
                borderRadius: 11,
                padding: "13px 13px 14px",
                background: "color-mix(in srgb, var(--c-teal) 5%, var(--c-bg2))",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "var(--c-dim)",
                }}
              >
                {m.label} gesucht
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 30,
                  fontWeight: 600,
                  color: "var(--c-ember)",
                  letterSpacing: "-.01em",
                  margin: "2px 0 10px",
                }}
              >
                {m.result}
              </div>
              <div
                style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--c-teal)", marginBottom: 8 }}
              >
                {m.formula}
              </div>
              {m.worked.map((line, i) => {
                const final = i === m.worked.length - 1;
                return (
                  <div
                    key={line}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12.5,
                      color: final ? "var(--c-teal)" : "var(--c-ink)",
                      fontWeight: final ? 600 : 400,
                      display: "flex",
                      gap: 7,
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <span style={{ color: "var(--c-teal)" }}>{final ? "→" : "·"}</span>
                    {line}
                  </div>
                );
              })}
            </div>
          </div>
        </Panel>

        {/* SELF-EXPLANATION teaser */}
        <Panel>
          <div style={{ fontSize: 13.5, lineHeight: 1.45 }}>
            Gleich bist du dran:{" "}
            <b style={{ color: "var(--c-teal)", fontWeight: 500 }}>Erklär in einem Satz</b>, warum
            mehr Widerstand den Strom kleiner macht.
          </div>
        </Panel>

        {/* CTA */}
        <Button variant="go" onClick={onComplete} style={{ justifyContent: "center" }}>
          Weiter zur Aufgabe
        </Button>
      </motion.div>
    </div>
  );
}
