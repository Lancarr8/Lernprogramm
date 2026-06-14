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
    fontSize: 12.5,
    padding: "7px 11px",
  },
};

export default function Button({ variant = "default", children, style, ...rest }) {
  const v = variants[variant] || variants.default;
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      style={{
        fontFamily: "var(--font-body)",
        fontSize: 14,
        borderRadius: "var(--radius-sm)",
        padding: "9px 16px",
        cursor: "pointer",
        border: "1px solid var(--c-edge)",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        ...v,
        ...style,
      }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
