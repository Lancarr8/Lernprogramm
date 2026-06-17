// Eyebrow — getrackte Mono-Versalien-Marke (Hero/Section). Default teal.
export default function Eyebrow({
  children,
  color = "var(--c-teal)",
  size = "var(--fs-micro)",
  style,
  ...rest
}) {
  return (
    <span
      className="mono"
      style={{
        display: "inline-block",
        fontSize: size,
        letterSpacing: "var(--ls-eyebrow)",
        textTransform: "uppercase",
        color,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
