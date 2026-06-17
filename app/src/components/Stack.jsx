// Stack — Flex-Layout mit Token-Gap. direction "col" (default) | "row".
// gap = Token-Index 1–8 (entspricht --space-N).
export default function Stack({
  direction = "col",
  gap = 4,
  align,
  justify,
  style,
  children,
  ...rest
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction === "row" ? "row" : "column",
        gap: `var(--space-${gap})`,
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
