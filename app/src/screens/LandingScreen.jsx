import { motion } from "framer-motion";
import Panel from "../components/Panel.jsx";
import Button from "../components/Button.jsx";
import { rise } from "../theme/motion.js";

// LandingScreen — Erster Eindruck bei Erstbesuch. Einfach, klar, einladend.
// Atmosphäre wie der URI-Prototyp: grid-bg, Panel mit HUD-Klammer-Ecken.

export default function LandingScreen({ navigate }) {
  return (
    <div
      className="grid-bg"
      style={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <motion.div {...rise} style={{ width: "100%", maxWidth: 460 }}>
        <Panel tone="pan2" style={{ padding: "26px 22px 24px" }}>
          <span
            className="mono"
            style={{
              fontSize: 10.5,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "var(--c-teal)",
            }}
          >
            Lernprogramm · für Elektronik-Azubis
          </span>

          <h1 style={{ margin: "12px 0 8px", fontSize: 28, letterSpacing: "-.01em" }}>
            Lernfelder. Strukturiert.
          </h1>

          <p style={{ margin: "0 0 22px", fontSize: 15, color: "var(--c-dim)", lineHeight: 1.6 }}>
            IHK-Lernstoff offline lernen — von Grundlagen bis Praxis.
          </p>

          <Button variant="go" onClick={() => navigate("dashboard")}>
            Lernfelder entdecken
          </Button>

          <p
            className="mono"
            style={{ margin: "20px 0 0", fontSize: 11.5, color: "var(--c-dim)" }}
          >
            Läuft offline · kein Login · kein Tracking
          </p>
        </Panel>
      </motion.div>
    </div>
  );
}
