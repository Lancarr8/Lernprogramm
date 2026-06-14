import React, { useState } from "react";

// URI-Slice — erster atmosphärischer Referenz-Screen ("Golden Path")
// Web-App-Prototyp. Atmosphäre im Rahmen, Klarheit im Inhalt.
// Im echten Build: Animationen über Framer Motion statt CSS.

const MODES = {
  U: {
    key: "U",
    label: "Spannung",
    unit: "V",
    formula: "U = R · I",
    worked: ["R = 4 Ω", "I = 3 A", "U = 4 Ω · 3 A = 12 V"],
    result: "12 V",
  },
  R: {
    key: "R",
    label: "Widerstand",
    unit: "Ω",
    formula: "R = U / I",
    worked: ["U = 12 V", "I = 3 A", "R = 12 V / 3 A = 4 Ω"],
    result: "4 Ω",
  },
  I: {
    key: "I",
    label: "Strom",
    unit: "A",
    formula: "I = U / R",
    worked: ["U = 12 V", "R = 4 Ω", "I = 12 V / 4 Ω = 3 A"],
    result: "3 A",
  },
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

.uri-root{
  --bg:#0E1518; --bg2:#0A0F12; --panel:#142127; --panel2:#17262C;
  --edge:rgba(79,210,194,0.16); --edge-strong:rgba(79,210,194,0.45);
  --teal:#4FD2C2; --teal-dim:rgba(79,210,194,0.55);
  --ember:#FFA24D; --ember-glow:rgba(255,162,77,0.30);
  --ink:#E8F0EE; --ink-dim:#86999A; --grid:rgba(79,210,194,0.045);
  font-family:'Space Grotesk',system-ui,sans-serif;
  color:var(--ink);
  background:
    radial-gradient(1100px 520px at 78% -10%, rgba(79,210,194,0.10), transparent 60%),
    radial-gradient(900px 520px at 8% 108%, rgba(255,162,77,0.07), transparent 60%),
    linear-gradient(180deg,var(--bg),var(--bg2));
  min-height:100vh;
  padding:22px 16px 40px;
  display:flex; justify-content:center;
}
.uri-mono{ font-family:'JetBrains Mono',ui-monospace,monospace; }
.uri-wrap{ width:100%; max-width:430px; display:flex; flex-direction:column; gap:14px; }

/* schematic grid behind panels */
.uri-panel{
  position:relative; border:1px solid var(--edge); border-radius:14px;
  background:
    linear-gradient(var(--grid) 1px,transparent 1px) 0 0/22px 22px,
    linear-gradient(90deg,var(--grid) 1px,transparent 1px) 0 0/22px 22px,
    linear-gradient(180deg,var(--panel2),var(--panel));
  padding:16px 16px 17px;
}
/* HUD bracket corners — the signature */
.uri-panel::before,.uri-panel::after{
  content:""; position:absolute; width:13px; height:13px; pointer-events:none;
  border:1.5px solid var(--edge-strong);
}
.uri-panel::before{ top:-1px; left:-1px; border-right:none; border-bottom:none; border-top-left-radius:14px;}
.uri-panel::after{ bottom:-1px; right:-1px; border-left:none; border-top:none; border-bottom-right-radius:14px;}

.uri-eyebrow{ font-size:10.5px; letter-spacing:.22em; color:var(--teal-dim); text-transform:uppercase; }
.uri-h1{ font-size:25px; font-weight:700; margin:5px 0 2px; letter-spacing:-.01em; }
.uri-formula-top{ font-size:14px; color:var(--ink-dim); }
.uri-formula-top b{ color:var(--teal); font-weight:600; }

.uri-prog{ display:flex; gap:5px; margin-top:13px; }
.uri-prog span{ height:3px; flex:1; border-radius:2px; background:rgba(255,255,255,0.08); }
.uri-prog span.on{ background:var(--teal); box-shadow:0 0 9px var(--teal-dim); }

.uri-tag{ display:inline-flex; align-items:center; gap:6px; font-size:10.5px;
  letter-spacing:.16em; text-transform:uppercase; color:var(--ink-dim); margin-bottom:9px;}
.uri-tag i{ width:5px; height:5px; border-radius:50%; background:var(--ember);
  box-shadow:0 0 8px var(--ember-glow); font-style:normal; }
.uri-tag.teal i{ background:var(--teal); box-shadow:0 0 8px var(--teal-dim); }

.uri-real{ font-size:14.5px; line-height:1.5; color:var(--ink); }
.uri-real b{ color:var(--ember); font-weight:600; }

.uri-water-btn{ all:unset; cursor:pointer; display:flex; align-items:center; justify-content:space-between;
  width:100%; font-size:13px; color:var(--ink-dim); }
.uri-water-btn:focus-visible{ outline:2px solid var(--teal); outline-offset:3px; border-radius:6px; }
.uri-chev{ transition:transform .25s ease; color:var(--teal); }
.uri-chev.open{ transform:rotate(180deg); }
.uri-water-body{ overflow:hidden; max-height:0; transition:max-height .3s ease, opacity .3s ease, margin .3s ease; opacity:0; }
.uri-water-body.open{ max-height:160px; opacity:1; margin-top:11px; }
.uri-row{ display:flex; gap:9px; align-items:flex-start; font-size:13px; line-height:1.45; margin-bottom:7px; color:var(--ink); }
.uri-row em{ font-style:normal; color:var(--teal); font-weight:600; min-width:74px; display:inline-block; }

/* triangle signature */
.uri-tri-head{ display:flex; align-items:baseline; justify-content:space-between; margin-bottom:4px; }
.uri-tri-hint{ font-size:11px; color:var(--ink-dim); }
.uri-tri-grid{ display:grid; grid-template-columns:188px 1fr; gap:14px; align-items:center; }
@media(max-width:380px){ .uri-tri-grid{ grid-template-columns:1fr; } }

.uri-cell{ cursor:pointer; transition:opacity .25s ease; }
.uri-cell text{ font-family:'JetBrains Mono',monospace; font-weight:600; }
.uri-seg{ stroke:var(--teal); stroke-width:1.4; fill:transparent; transition:all .25s ease; }
.uri-cell.dim{ opacity:.4; }
.uri-cell.active text{ fill:var(--ember); }
.uri-cell:not(.active) text{ fill:var(--teal); }

.uri-readout{ border:1px solid var(--edge); border-radius:11px; padding:13px 13px 14px;
  background:linear-gradient(180deg,rgba(79,210,194,0.05),rgba(0,0,0,0.12)); }
.uri-readout .lab{ font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-dim); }
.uri-result{ font-family:'JetBrains Mono',monospace; font-size:30px; font-weight:600; color:var(--ember);
  letter-spacing:-.01em; margin:2px 0 10px; text-shadow:0 0 18px var(--ember-glow); transition:color .25s; }
.uri-step{ font-family:'JetBrains Mono',monospace; font-size:12.5px; color:var(--ink); opacity:.9;
  display:flex; gap:7px; align-items:center; margin-top:5px; }
.uri-step .dot{ color:var(--teal); }
.uri-step.final{ color:var(--teal); font-weight:600; }

.uri-self{ display:flex; gap:11px; align-items:center; }
.uri-self .q{ font-size:13.5px; line-height:1.45; color:var(--ink); }
.uri-self .q b{ color:var(--teal); }

.uri-cta-row{ display:flex; gap:10px; margin-top:2px; }
.uri-btn{ all:unset; cursor:pointer; text-align:center; border-radius:11px; font-weight:600; font-size:14px;
  padding:13px 14px; transition:transform .12s ease, box-shadow .25s ease, background .25s ease; }
.uri-btn:focus-visible{ outline:2px solid #fff; outline-offset:2px; }
.uri-btn.primary{ flex:1.4; color:#07110F; background:linear-gradient(180deg,#62E3D2,var(--teal));
  box-shadow:0 0 0 1px rgba(79,210,194,0.5), 0 6px 22px rgba(79,210,194,0.22); }
.uri-btn.ghost{ flex:1; color:var(--ink); background:rgba(255,255,255,0.04); border:1px solid var(--edge); }
.uri-btn:active{ transform:translateY(1px); }

.uri-fade{ animation:uriUp .5s ease both; }
.uri-fade.d1{ animation-delay:.05s; } .uri-fade.d2{ animation-delay:.12s; }
.uri-fade.d3{ animation-delay:.19s; } .uri-fade.d4{ animation-delay:.26s; }
@keyframes uriUp{ from{opacity:0; transform:translateY(10px);} to{opacity:1; transform:none;} }

@media(prefers-reduced-motion:reduce){
  .uri-fade,.uri-water-body,.uri-chev,.uri-seg,.uri-cell,.uri-result{ animation:none!important; transition:none!important; }
}
`;

export default function URISlicePrototype() {
  const [sel, setSel] = useState("U");
  const [water, setWater] = useState(false);
  const m = MODES[sel];

  const cellClass = (k) => `uri-cell${sel === k ? " active" : sel ? " dim" : ""}`;

  return (
    <div className="uri-root">
      <style>{CSS}</style>
      <div className="uri-wrap">

        {/* HEADER */}
        <div className="uri-panel uri-fade">
          <div className="uri-eyebrow">Lernfeld 1 · Grundlagen</div>
          <div className="uri-h1">Das Ohmsche Gesetz</div>
          <div className="uri-formula-top">
            Spannung, Strom und Widerstand hängen zusammen — <b>U = R · I</b>
          </div>
          <div className="uri-prog">
            <span className="on" /><span className="on" /><span className="on" /><span /><span />
          </div>
        </div>

        {/* REAL WORLD ANCHOR */}
        <div className="uri-panel uri-fade d1">
          <div className="uri-tag"><i />Wo's vorkommt</div>
          <div className="uri-real">
            Eine LED braucht <b>20 mA</b> und verträgt <b>2 V</b>. Du hängst sie an <b>5 V</b> —
            ohne Vorwiderstand stirbt sie. Genau diesen Widerstand sagt dir das Ohmsche Gesetz.
          </div>
        </div>

        {/* WHY — water analogy */}
        <div className="uri-panel uri-fade d2">
          <button
            className="uri-water-btn"
            aria-expanded={water}
            onClick={() => setWater((v) => !v)}
          >
            <span><span style={{ color: "var(--teal)", fontWeight: 600 }}>Das Warum</span> · die Wasser-Analogie</span>
            <span className={`uri-chev${water ? " open" : ""}`}>▾</span>
          </button>
          <div className={`uri-water-body${water ? " open" : ""}`}>
            <div className="uri-row"><em>Spannung U</em> der Druck, der dahintersteht.</div>
            <div className="uri-row"><em>Strom I</em> wie viel tatsächlich fließt.</div>
            <div className="uri-row"><em>Widerstand R</em> die Engstelle, die bremst.</div>
          </div>
        </div>

        {/* SIGNATURE — interactive triangle */}
        <div className="uri-panel uri-fade d3">
          <div className="uri-tri-head">
            <div className="uri-tag teal" style={{ marginBottom: 0 }}><i />Probier's</div>
            <div className="uri-tri-hint">Tipp an, was du suchst</div>
          </div>

          <div className="uri-tri-grid" style={{ marginTop: 12 }}>
            <svg viewBox="0 0 220 190" width="188" role="img" aria-label="U-R-I Dreieck">
              {/* outer + dividers */}
              <path className="uri-seg" d="M110 14 L206 176 L14 176 Z" />
              <line className="uri-seg" x1="60" y1="100" x2="160" y2="100" />
              <line className="uri-seg" x1="110" y1="100" x2="110" y2="176" />

              {/* U cell (top) */}
              <g className={cellClass("U")} onClick={() => setSel("U")} style={{ cursor: "pointer" }}>
                <path d="M110 14 L160 100 L60 100 Z" fill="transparent" />
                <text x="110" y="74" textAnchor="middle" fontSize="30">U</text>
              </g>
              {/* R cell (bottom-left) */}
              <g className={cellClass("R")} onClick={() => setSel("R")} style={{ cursor: "pointer" }}>
                <path d="M60 100 L110 100 L110 176 L14 176 Z" fill="transparent" />
                <text x="74" y="150" textAnchor="middle" fontSize="27">R</text>
              </g>
              {/* I cell (bottom-right) */}
              <g className={cellClass("I")} onClick={() => setSel("I")} style={{ cursor: "pointer" }}>
                <path d="M110 100 L160 100 L206 176 L110 176 Z" fill="transparent" />
                <text x="146" y="150" textAnchor="middle" fontSize="27">I</text>
              </g>
            </svg>

            <div className="uri-readout">
              <div className="lab">{m.label} gesucht</div>
              <div className="uri-result">{m.result}</div>
              <div className="uri-mono" style={{ fontSize: 13, color: "var(--teal)", marginBottom: 8 }}>
                {m.formula}
              </div>
              {m.worked.map((line, i) => (
                <div className={`uri-step${i === m.worked.length - 1 ? " final" : ""}`} key={i}>
                  <span className="dot">{i === m.worked.length - 1 ? "→" : "·"}</span>{line}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SELF-EXPLANATION teaser */}
        <div className="uri-panel uri-fade d4">
          <div className="uri-self">
            <div className="q">
              Gleich bist du dran: <b>Erklär in einem Satz</b>, warum mehr Widerstand
              den Strom kleiner macht.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="uri-cta-row uri-fade d4">
          <button className="uri-btn primary">Weiter zur Aufgabe</button>
          <button className="uri-btn ghost">Nochmal erklären</button>
        </div>

      </div>
    </div>
  );
}
