// HUD-Klammer-Ecken — Signatur-Element an Panels. Absolut positioniert,
// daher gehoert es in einen Container mit position: relative.

export default function BracketCorners({ color = "var(--c-teal)", size = 12 }) {
  const base = {
    position: "absolute",
    width: size,
    height: size,
    borderColor: color,
    borderStyle: "solid",
    borderWidth: 0,
    pointerEvents: "none",
  };
  return (
    <>
      <span style={{ ...base, top: -1, left: -1, borderTopWidth: 2, borderLeftWidth: 2 }} />
      <span style={{ ...base, top: -1, right: -1, borderTopWidth: 2, borderRightWidth: 2 }} />
      <span style={{ ...base, bottom: -1, left: -1, borderBottomWidth: 2, borderLeftWidth: 2 }} />
      <span style={{ ...base, bottom: -1, right: -1, borderBottomWidth: 2, borderRightWidth: 2 }} />
    </>
  );
}
