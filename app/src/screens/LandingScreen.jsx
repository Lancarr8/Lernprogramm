import { motion } from "framer-motion";
import Panel from "../components/Panel.jsx";
import Button from "../components/Button.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
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
        padding: "var(--space-5)",
      }}
    >
      <motion.div {...rise} style={{ width: "100%", maxWidth: 460 }}>
        <Panel tone="pan2" style={{ padding: "var(--space-6) var(--space-5) var(--space-5)" }}>
          <Eyebrow>Lernprogramm · für Elektronik-Azubis</Eyebrow>

          <h1 style={{ margin: "var(--space-3) 0 var(--space-2)", fontSize: "var(--fs-display)", letterSpacing: "-.01em" }}>
            Lernfelder. Strukturiert.
          </h1>

          <p
            style={{
              margin: "0 0 var(--space-5)",
              fontSize: "var(--fs-body)",
              color: "var(--c-dim)",
              lineHeight: "var(--lh-relaxed)",
            }}
          >
            IHK-Lernstoff offline lernen — von Grundlagen bis Praxis.
          </p>

          <Button variant="go" onClick={() => navigate("dashboard")}>
            Lernfelder entdecken
          </Button>

          <p
            className="mono"
            style={{ margin: "var(--space-5) 0 0", fontSize: "var(--fs-micro)", color: "var(--c-dim)" }}
          >
            Läuft offline · kein Login · kein Tracking
          </p>
        </Panel>
      </motion.div>
    </div>
  );
}
