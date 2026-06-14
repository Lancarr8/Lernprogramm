// tokens.js — Single Source of Truth fuer das Design-System (Stillwater / Werkbank-HUD).
// In JS definiert, damit Logik + Framer dieselben Werte lesen. Per applyTokens()
// werden sie zur Laufzeit als CSS-Custom-Properties auf :root gespiegelt → driftfrei.

export const tokens = {
  color: {
    bg: "#0E1518",
    bg2: "#0A0F12",
    pan: "#142127",
    pan2: "#17262C",
    teal: "#4FD2C2",
    ember: "#FFA24D",
    warn: "#E8745C",
    warnSoft: "rgba(232,116,92,0.12)",
    warnEdge: "rgba(232,116,92,0.30)",
    ink: "#E8F0EE",
    dim: "#86999A",
    edge: "rgba(79,210,194,.16)",
  },
  font: {
    body: "'Space Grotesk', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },
  radius: {
    sm: "8px",
    md: "10px",
    lg: "14px",
  },
  grid: "26px",
};

// Mapping tokens -> CSS-Custom-Properties. Einzige Stelle, die Namen vergibt.
export const cssVars = {
  "--c-bg": tokens.color.bg,
  "--c-bg2": tokens.color.bg2,
  "--c-pan": tokens.color.pan,
  "--c-pan2": tokens.color.pan2,
  "--c-teal": tokens.color.teal,
  "--c-ember": tokens.color.ember,
  "--c-warn": tokens.color.warn,
  "--c-warn-soft": tokens.color.warnSoft,
  "--c-warn-edge": tokens.color.warnEdge,
  "--c-ink": tokens.color.ink,
  "--c-dim": tokens.color.dim,
  "--c-edge": tokens.color.edge,
  "--font-body": tokens.font.body,
  "--font-mono": tokens.font.mono,
  "--radius-sm": tokens.radius.sm,
  "--radius-md": tokens.radius.md,
  "--radius-lg": tokens.radius.lg,
  "--grid": tokens.grid,
};
