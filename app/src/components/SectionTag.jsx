// SectionTag — gedimmtes Mono-Label über Karten-Abschnitten (BERECHNUNG, MATERIAL …).
// Margin-los: Abstand gehört dem Layout (Stack/Parent), nicht der Komponente.
export default function SectionTag({ children, style, ...rest }) {
  return (
    <p
      className="mono"
      style={{
        margin: 0,
        color: "var(--c-dim)",
        fontSize: "var(--fs-label)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        ...style,
      }}
      {...rest}
    >
      {children}
    </p>
  );
}
