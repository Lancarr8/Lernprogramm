import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Panel from "../../components/Panel.jsx";
import Button from "../../components/Button.jsx";
import ProgressBar from "../../components/ProgressBar.jsx";
import Eyebrow from "../../components/Eyebrow.jsx";
import { rise, motion as motionTokens } from "../../theme/motion.js";

// LernseiteScreen — Realwelt-Anker → Warum → interaktives Visual → Teaser.
// Inhalt kommt vollständig aus der data-Prop (Content-Datei lernseite.js).
// Kein hardcodierter Themen-Inhalt mehr.

const tagStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-2)",
  fontSize: "var(--fs-micro)",
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
          <span style={{ color: "var(--c-dim)" }}>LERNSEITE</span>
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
      style={{
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "var(--space-5) var(--space-4) var(--space-7)",
      }}
    >
      <motion.div
        {...rise}
        style={{
          width: "100%",
          maxWidth: 460,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
        }}
      >
        {/* HEADER */}
        <Panel>
          <Eyebrow>
            {data.eyebrow} · Schritt {currentStep} / {totalSteps}
          </Eyebrow>
          <h1
            style={{
              fontSize: "var(--fs-display)",
              fontWeight: 500,
              margin: "var(--space-2) 0 var(--space-2)",
              letterSpacing: "-.01em",
            }}
          >
            {data.titel}
          </h1>
          <div style={{ fontSize: "var(--fs-body)", color: "var(--c-dim)" }}>
            {renderFormelText(data.formelText)}
          </div>
          <ProgressBar done={currentStep} total={totalSteps} style={{ marginTop: "var(--space-3)" }} />
        </Panel>

        {/* REAL WORLD ANCHOR */}
        {data.anker && (
          <Panel>
            <div style={{ ...tagStyle, marginBottom: "var(--space-2)" }}>
              <TagDot />
              Wo's vorkommt
            </div>
            <div style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-base)" }}>
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
                fontSize: "var(--fs-sm)",
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
                  <div style={{ paddingTop: "var(--space-3)" }}>
                    {data.warum.punkte.map((p) => (
                      <div
                        key={p.label}
                        style={{
                          display: "flex",
                          gap: "var(--space-2)",
                          alignItems: "flex-start",
                          fontSize: "var(--fs-sm)",
                          lineHeight: "var(--lh-base)",
                          marginBottom: "var(--space-2)",
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
                marginBottom: "var(--space-1)",
              }}
            >
              <div style={tagStyle}>
                <TagDot color="var(--c-teal)" />
                Probier's
              </div>
              <div style={{ fontSize: "var(--fs-micro)", color: "var(--c-dim)" }}>{interaktiv.hint}</div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "188px 1fr",
                gap: "var(--space-4)",
                alignItems: "center",
                marginTop: "var(--space-3)",
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
                  padding: "var(--space-3) var(--space-3) var(--space-4)",
                  background: "color-mix(in srgb, var(--c-teal) 5%, var(--c-bg2))",
                }}
              >
                <div
                  style={{ fontSize: "var(--fs-micro)", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--c-dim)" }}
                >
                  {m.label} gesucht
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 30, // bewusste Out-of-band-Hero-Zahl (Readout)
                    fontWeight: 600,
                    color: "var(--c-ember)",
                    letterSpacing: "-.01em",
                    margin: "var(--space-1) 0 var(--space-3)",
                  }}
                >
                  {m.result}
                </div>
                <div
                  style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--c-teal)", marginBottom: "var(--space-2)" }}
                >
                  {m.formel}
                </div>
                {m.worked.map((line, i) => {
                  const final = i === m.worked.length - 1;
                  return (
                    <div
                      key={line}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--fs-label)",
                        color: final ? "var(--c-teal)" : "var(--c-ink)",
                        fontWeight: final ? 600 : 400,
                        display: "flex",
                        gap: "var(--space-2)",
                        alignItems: "center",
                        marginTop: "var(--space-2)",
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

        {/* SIGNATURE — Formel-Card (typ === "formel"): Formel + Rechenbeispiel */}
        {isFormel && interaktiv.formel && (
          <Panel>
            <div style={{ ...tagStyle, marginBottom: "var(--space-3)" }}>
              <TagDot color="var(--c-teal)" />
              Formel
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-h1)",
                fontWeight: 600,
                color: "var(--c-teal)",
                textAlign: "center",
                lineHeight: "var(--lh-tight)",
                margin: "var(--space-1) 0 var(--space-4)",
              }}
            >
              {interaktiv.formel}
            </div>

            {interaktiv.beispiel && (
              <div
                style={{
                  border: "1px solid var(--c-edge)",
                  borderRadius: 11,
                  padding: "var(--space-3) var(--space-3) var(--space-4)",
                  background: "color-mix(in srgb, var(--c-teal) 5%, var(--c-bg2))",
                }}
              >
                {(interaktiv.beispiel.werte || []).map((w, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--fs-label)",
                      color: "var(--c-ink)",
                      display: "flex",
                      gap: "var(--space-2)",
                      alignItems: "flex-start",
                      lineHeight: "var(--lh-base)",
                      marginTop: i === 0 ? 0 : "var(--space-2)",
                    }}
                  >
                    <span style={{ color: "var(--c-teal)" }}>·</span>
                    {w}
                  </div>
                ))}
                {interaktiv.beispiel.ergebnis && (
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--fs-body)",
                      fontWeight: 600,
                      color: "var(--c-ember)",
                      lineHeight: "var(--lh-base)",
                      marginTop: (interaktiv.beispiel.werte || []).length ? "var(--space-3)" : 0,
                    }}
                  >
                    → {interaktiv.beispiel.ergebnis}
                  </div>
                )}
              </div>
            )}
          </Panel>
        )}

        {/* SELF-EXPLANATION teaser */}
        {data.teaser && (
          <Panel>
            <div style={{ fontSize: "var(--fs-sm)", lineHeight: "var(--lh-base)" }}>{data.teaser}</div>
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
