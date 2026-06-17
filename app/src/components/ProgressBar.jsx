// Geteilter Fortschrittsbalken — segmentiert (ein Segment pro Schritt/Themenbereich).
// done = wie viele Segmente aktiv (teal), total = Gesamtzahl. Rein token-basiert,
// keine animierten Layout-Properties (Segmente sind statisch breit).

export default function ProgressBar({ done = 0, total = 0, style }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={done}
      aria-valuemin={0}
      aria-valuemax={total}
      style={{ display: "flex", gap: "var(--space-2)", ...style }}
    >
      {Array.from({ length: Math.max(total, 1) }).map((_, i) => (
        <span
          key={i}
          style={{
            height: 3,
            flex: 1,
            borderRadius: 2,
            background: i < done ? "var(--c-teal)" : "var(--c-edge)",
          }}
        />
      ))}
    </div>
  );
}
