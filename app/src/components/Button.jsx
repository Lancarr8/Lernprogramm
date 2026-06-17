import { motion } from "framer-motion";

// Geteiltes Button-Primitiv. variant: "go" (Primaer/Teal) | "default" | "ghost".
// whileTap nutzt Framer; reduced-motion wird global via MotionConfig respektiert.

const variants = {
  go: {
    background: "var(--c-teal)",
    color: "#06201C",
    borderColor: "var(--c-teal)",
    fontWeight: 500,
  },
  default: {
    background: "transparent",
    color: "var(--c-ink)",
    borderColor: "var(--c-edge)",
  },
  ghost: {
    background: "transparent",
    color: "var(--c-dim)",
    borderColor: "var(--c-edge)",
    fontSize: "var(--fs-label)",
    padding: "var(--space-2) var(--space-3)",
  },
};

export default function Button({ variant = "default", children, style, ...rest }) {
  const v = variants[variant] || variants.default;
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--fs-body)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-2) var(--space-4)",
        cursor: "pointer",
        border: "1px solid var(--c-edge)",
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        ...v,
        ...style,
      }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
