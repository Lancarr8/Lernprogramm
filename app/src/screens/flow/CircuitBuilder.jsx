import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../../components/Button.jsx";
import { rise } from "../../theme/motion.js";

// CircuitBuilder — interaktiver Schaltungsaufbau. Der User verbindet Klemmen
// per Klick (zwei Klemmen antippen = Draht). Die App prüft gegen config.loesung.
// Terminal-Positionen liegen fix pro Bauteil-Typ im Code (nicht im Content).

function getTerminals(bauteil) {
  const { id, typ, cx, cy } = bauteil;
  if (typ === "batterie")
    return {
      [`${id}.plus`]: { x: cx, y: cy - 35, label: "+" },
      [`${id}.minus`]: { x: cx, y: cy + 35, label: "−" },
    };
  if (typ === "widerstand")
    return {
      [`${id}.links`]: { x: cx - 40, y: cy, label: "" },
      [`${id}.rechts`]: { x: cx + 40, y: cy, label: "" },
    };
  if (typ === "led")
    return {
      [`${id}.anode`]: { x: cx - 25, y: cy, label: "A" },
      [`${id}.kathode`]: { x: cx + 25, y: cy, label: "K" },
    };
  return {};
}

function getAllTerminals(bauteile) {
  return Object.assign({}, ...bauteile.map(getTerminals));
}

// Rail-Routing: jeder Draht läuft vertikal auf eine gemeinsame Schiene (oben oder
// unten) und dann horizontal entlang dieser Schiene — saubere rechteckige Serien-
// Schleife statt berechneter Mittelpunkte. Drähte, die in die untere Hälfte reichen
// (z. B. Rückleitung zum Minus-Pol), nehmen die Bottom-Rail, sonst die Top-Rail.
function railWirePath(t1, t2, topRail, bottomRail, midY) {
  const rail = Math.max(t1.y, t2.y) > midY ? bottomRail : topRail;
  return `M ${t1.x} ${t1.y} L ${t1.x} ${rail} L ${t2.x} ${rail} L ${t2.x} ${t2.y}`;
}

function BatterieSymbol({ cx, cy, label }) {
  return (
    <g>
      <line x1={cx} y1={cy - 35} x2={cx} y2={cy - 10} stroke="var(--c-teal)" strokeWidth="2" />
      <line
        x1={cx - 15}
        y1={cy - 10}
        x2={cx + 15}
        y2={cy - 10}
        stroke="var(--c-teal)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1={cx - 9}
        y1={cy}
        x2={cx + 9}
        y2={cy}
        stroke="var(--c-teal)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line x1={cx} y1={cy} x2={cx} y2={cy + 35} stroke="var(--c-teal)" strokeWidth="2" />
      <text x={cx + 20} y={cy - 8} fill="var(--c-ember)" fontFamily="var(--font-mono)" fontSize="11">
        +
      </text>
      <text x={cx + 20} y={cy + 5} fill="var(--c-dim)" fontFamily="var(--font-mono)" fontSize="11">
        −
      </text>
      <text
        x={cx}
        y={cy + 55}
        fill="var(--c-teal)"
        fontFamily="var(--font-mono)"
        fontSize="10"
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

function WiderstandSymbol({ cx, cy, label }) {
  return (
    <g>
      <line x1={cx - 40} y1={cy} x2={cx - 20} y2={cy} stroke="var(--c-teal)" strokeWidth="2" />
      <rect
        x={cx - 20}
        y={cy - 12}
        width="40"
        height="24"
        rx="3"
        fill="var(--c-bg)"
        stroke="var(--c-teal)"
        strokeWidth="2"
      />
      <line x1={cx + 20} y1={cy} x2={cx + 40} y2={cy} stroke="var(--c-teal)" strokeWidth="2" />
      <text
        x={cx}
        y={cy - 18}
        fill="var(--c-ink)"
        fontFamily="var(--font-mono)"
        fontSize="10"
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

function LEDSymbol({ cx, cy, label }) {
  return (
    <g>
      <line x1={cx - 25} y1={cy} x2={cx - 15} y2={cy} stroke="var(--c-teal)" strokeWidth="2" />
      <polygon
        points={`${cx - 15},${cy - 13} ${cx - 15},${cy + 13} ${cx + 8},${cy}`}
        fill="color-mix(in srgb, var(--c-ember) 15%, transparent)"
        stroke="var(--c-ember)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line
        x1={cx + 8}
        y1={cy - 13}
        x2={cx + 8}
        y2={cy + 13}
        stroke="var(--c-ember)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line x1={cx + 8} y1={cy} x2={cx + 25} y2={cy} stroke="var(--c-teal)" strokeWidth="2" />
      {/* Lichtpfeile */}
      <line
        x1={cx + 14}
        y1={cy - 8}
        x2={cx + 22}
        y2={cy - 18}
        stroke="var(--c-ember)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1={cx + 19}
        y1={cy - 4}
        x2={cx + 28}
        y2={cy - 14}
        stroke="var(--c-ember)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text
        x={cx}
        y={cy + 28}
        fill="var(--c-ember)"
        fontFamily="var(--font-mono)"
        fontSize="10"
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

const SYMBOLS = {
  batterie: BatterieSymbol,
  widerstand: WiderstandSymbol,
  led: LEDSymbol,
};

export default function CircuitBuilder({ config, onSolved }) {
  const [wires, setWires] = useState([]); // [{ von, zu }]
  const [selected, setSelected] = useState(null); // "bat.plus" etc.
  const [solved, setSolved] = useState(false);

  const { canvas, bauteile, loesung } = config;
  const allTerminals = getAllTerminals(bauteile);

  // Gemeinsame Routing-Schienen ober-/unterhalb aller Klemmen.
  const terminalYs = Object.values(allTerminals).map((t) => t.y);
  const minY = Math.min(...terminalYs);
  const maxY = Math.max(...terminalYs);
  const topRail = minY - 20;
  const bottomRail = maxY + 20;
  const midY = (minY + maxY) / 2;

  function checkSolution(currentWires) {
    const allCorrect = loesung.every((req) =>
      currentWires.some(
        (w) =>
          (w.von === req.von && w.zu === req.zu) || (w.von === req.zu && w.zu === req.von)
      )
    );
    if (allCorrect) setSolved(true);
  }

  function handleTerminalClick(terminalId) {
    if (solved) return;

    if (!selected) {
      setSelected(terminalId);
      return;
    }
    if (selected === terminalId) {
      setSelected(null);
      return;
    }

    // Gleiche Komponente? Nicht erlaubt.
    const sameComponent = selected.split(".")[0] === terminalId.split(".")[0];
    if (sameComponent) {
      setSelected(null);
      return;
    }

    // Bereits verbunden?
    const alreadyConnected = wires.some(
      (w) =>
        (w.von === selected && w.zu === terminalId) ||
        (w.von === terminalId && w.zu === selected)
    );
    if (alreadyConnected) {
      setSelected(null);
      return;
    }

    const newWires = [...wires, { von: selected, zu: terminalId }];
    setWires(newWires);
    setSelected(null);
    checkSolution(newWires);
  }

  return (
    <div>
      <svg
        viewBox={`0 0 ${canvas.width} ${canvas.height}`}
        width="100%"
        role="img"
        aria-label="Interaktiver Schaltungsaufbau"
        style={{
          display: "block",
          maxWidth: canvas.width,
          margin: "0 auto",
          border: "1px solid var(--c-edge)",
          borderRadius: "var(--radius-md)",
          background: "var(--c-bg2)",
        }}
      >
        {/* Bauteil-Symbole */}
        {bauteile.map((b) => {
          const Sym = SYMBOLS[b.typ];
          return Sym ? <Sym key={b.id} cx={b.cx} cy={b.cy} label={b.label} /> : null;
        })}

        {/* Drähte */}
        {wires.map((w, i) => {
          const t1 = allTerminals[w.von];
          const t2 = allTerminals[w.zu];
          if (!t1 || !t2) return null;
          return (
            <path
              key={i}
              d={railWirePath(t1, t2, topRail, bottomRail, midY)}
              fill="none"
              stroke="var(--c-ember)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}

        {/* Klemmen (Terminals) — klickbar, oben */}
        {Object.entries(allTerminals).map(([id, pos]) => {
          const isSelected = selected === id;
          const isConnected = wires.some((w) => w.von === id || w.zu === id);
          return (
            <circle
              key={id}
              cx={pos.x}
              cy={pos.y}
              r={isSelected ? 9 : 6}
              fill={isSelected ? "var(--c-teal)" : isConnected ? "var(--c-ember)" : "var(--c-bg2)"}
              stroke={isSelected ? "var(--c-teal)" : "var(--c-edge)"}
              strokeWidth="2"
              style={{ cursor: solved ? "default" : "pointer" }}
              onClick={() => handleTerminalClick(id)}
            />
          );
        })}
      </svg>

      {/* Gelöst-State */}
      {solved && (
        <motion.div {...rise} style={{ textAlign: "center", marginTop: 16 }}>
          <p
            style={{
              color: "var(--c-teal)",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              marginBottom: 12,
            }}
          >
            ✓ Schaltung korrekt — Strom kann fließen
          </p>
          <Button variant="go" onClick={onSolved}>
            Weiter
          </Button>
        </motion.div>
      )}

      {/* Reset */}
      {!solved && wires.length > 0 && (
        <button
          onClick={() => {
            setWires([]);
            setSelected(null);
          }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--c-dim)",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginTop: 8,
          }}
        >
          Zurücksetzen
        </button>
      )}
    </div>
  );
}
