import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Panel from "../../components/Panel.jsx";
import Button from "../../components/Button.jsx";
import ProgressBar from "../../components/ProgressBar.jsx";
import { rise, motion as motionTokens } from "../../theme/motion.js";

// LernseiteScreen — Realwelt-Anker → Warum → interaktives Visual → Teaser.
// Inhalt kommt vollständig aus der data-Prop (Content-Datei lernseite.js).
// Kein hardcodierter Themen-Inhalt mehr.

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

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Markiert die highlight-Wörter im Text in ember-Farbe.
function renderHighlighted(text, highlights) {
  if (!highlights || highlights.length === 0) return text;
  const pattern = new RegExp(`(${highlights.map(escapeRegExp).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    highlights.includes(part) ? (
      <b key={i} style={{ color: "var(--c-ember)", fontWeight: 500 }}>
        {part}
      </b>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// "Intro — U = R · I" → Intro dim, Formelteil teal.
function renderFormelText(formelText) {
  if (!formelText) return null;
  const idx = formelText.indexOf("—");
  if (idx === -1) return formelText;
  const intro = formelText.slice(0, idx + 1);
  const formel = formelText.slice(idx + 1).trim();
  return (
    <>
      {intro}{" "}
      <b style={{ color: "var(--c-teal)", fontWeight: 500 }}>{formel}</b>
    </>
  );
}

function PlaceholderShell({ titel, currentStep, totalSteps, onComplete }) {
  return (
    <div
      className="grid-bg"
      style={{ minHeight: "100%", display: "flex", justifyContent: "center", padding: 24 }}
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
          <span style={{ color: "var(--c-dim)" }}>LERNSEITE</span>
          <span style={{ color: "var(--c-teal)" }}>
            Schritt {currentStep} / {totalSteps}
          </span>
        </div>
        <Panel>
          <p style={{ margin: "0 0 6px", color: "var(--c-dim)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
            {titel.toUpperCase()}
          </p>
          <p style={{ margin: "0 0 20px", fontSize: 15, lineHeight: 1.6 }}>Inhalt folgt in Kürze.</p>
          <Button variant="go" onClick={onComplete}>
            Weiter
          </Button>
        </Panel>
      </motion.div>
    </div>
  );
}

export default function LernseiteScreen({ data, onComplete, currentStep, totalSteps }) {
  const [sel, setSel] = useState(null);
  const [water, setWater] = useState(false);

  if (!data || Object.keys(data).length === 0) {
    return (
      <PlaceholderShell
        titel="Lernseite"
        currentStep={currentStep}
        totalSteps={totalSteps}
        onComplete={onComplete}
      />
    );
  }

  const interaktiv = data.interaktiv || {};
  const isTriangle = interaktiv.typ === "uri-dreieck";
  const isFormel = interaktiv.typ === "formel";
  const modi = interaktiv.modi || {};
  const modeKeys = Object.keys(modi);
  const activeKey = sel && modi[sel] ? sel : modeKeys[0];
  const m = modi[activeKey];

  // Aktive Zelle = Ember-Text; übrige Zellen abgedimmt.
  const cellTextFill = (k) => (activeKey === k ? "var(--c-ember)" : "var(--c-teal)");
  const cellOpacity = (k) => (activeKey === k ? 1 : 0.4);

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
            {data.eyebrow} · Schritt {currentStep} / {totalSteps}
          </div>
          <h1 style={{ fontSize: 25, fontWeight: 500, margin: "5px 0 6px", letterSpacing: "-.01em" }}>
            {data.titel}
          </h1>
          <div style={{ fontSize: 14, color: "var(--c-dim)" }}>{renderFormelText(data.formelText)}</div>
          <ProgressBar done={currentStep} total={totalSteps} style={{ marginTop: 13 }} />
        </Panel>

        {/* REAL WORLD ANCHOR */}
        {data.anker && (
          <Panel>
            <div style={{ ...tagStyle, marginBottom: 9 }}>
              <TagDot />
              Wo's vorkommt
            </div>
            <div style={{ fontSize: 14.5, lineHeight: 1.5 }}>
              {renderHighlighted(data.anker.text, data.anker.highlights)}
            </div>
          </Panel>
        )}

        {/* WHY — Akkordeon via Framer AnimatePresence */}
        {data.warum && (
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
                {(() => {
                  const parts = data.warum.titel.split(" · ");
                  return (
                    <>
                      <span style={{ color: "var(--c-teal)", fontWeight: 500 }}>{parts[0]}</span>
                      {parts.length > 1 ? ` · ${parts.slice(1).join(" · ")}` : ""}
                    </>
                  );
                })()}
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
                    {data.warum.punkte.map((p) => (
                      <div
                        key={p.label}
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
                          {p.label}
                        </em>
                        {p.text}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Panel>
        )}

        {/* SIGNATURE — interaktives Dreieck (typ === "uri-dreieck") */}
        {isTriangle && m && (
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
              <div style={{ fontSize: 11, color: "var(--c-dim)" }}>{interaktiv.hint}</div>
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
                <line x1="60" y1="100" x2="160" y2="100" style={{ stroke: "var(--c-teal)", strokeWidth: 1.4 }} />
                <line x1="110" y1="100" x2="110" y2="176" style={{ stroke: "var(--c-teal)", strokeWidth: 1.4 }} />

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
                  style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--c-dim)" }}
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
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--c-teal)", marginBottom: 8 }}>
                  {m.formel}
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
        )}

        {/* SIGNATURE — einfache Formel-Card (typ === "formel") */}
        {isFormel && m && (
          <Panel>
            <div style={{ ...tagStyle, marginBottom: 10 }}>
              <TagDot color="var(--c-teal)" />
              Formel
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 22,
                fontWeight: 600,
                color: "var(--c-teal)",
                textAlign: "center",
              }}
            >
              {m.formel}
            </div>
          </Panel>
        )}

        {/* SELF-EXPLANATION teaser */}
        {data.teaser && (
          <Panel>
            <div style={{ fontSize: 13.5, lineHeight: 1.45 }}>{data.teaser}</div>
          </Panel>
        )}

        {/* CTA */}
        <Button variant="go" onClick={onComplete} style={{ justifyContent: "center" }}>
          Weiter zur Aufgabe
        </Button>
      </motion.div>
    </div>
  );
}
