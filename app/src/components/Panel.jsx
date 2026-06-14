import BracketCorners from "./BracketCorners.jsx";

// Geteiltes Panel-Primitiv mit optionalen HUD-Klammer-Ecken.
// tone: "pan" (Standard) | "pan2" (etwas heller, fuer hervorgehobene Panels).

export default function Panel({ children, brackets = true, tone = "pan", style, ...rest }) {
  const bg = tone === "pan2" ? "var(--c-pan2)" : "var(--c-pan)";
  return (
    <div
      style={{
        position: "relative",
        background: bg,
        border: "1px solid var(--c-edge)",
        borderRadius: "var(--radius-md)",
        padding: 16,
        ...style,
      }}
      {...rest}
    >
      {brackets && <BracketCorners />}
      {children}
    </div>
  );
}
