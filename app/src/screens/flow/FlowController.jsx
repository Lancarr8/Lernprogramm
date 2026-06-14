import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { markScreenDone } from "../../data/progress.js";
import * as allContent from "../../content/index.js";
import { fade } from "../../theme/motion.js";
import Button from "../../components/Button.jsx";
import LernseiteScreen from "./LernseiteScreen.jsx";
import AufgabenScreen from "./AufgabenScreen.jsx";
import SelfExplanationScreen from "./SelfExplanationScreen.jsx";
import SchaltungScreen from "./SchaltungScreen.jsx";
import SelbstBauenScreen from "./SelbstBauenScreen.jsx";

const SCREEN_MAP = {
  lernseite: LernseiteScreen,
  aufgaben: AufgabenScreen,
  "self-explanation": SelfExplanationScreen,
  schaltung: SchaltungScreen,
  "selbst-bauen": SelbstBauenScreen,
};

export default function FlowController({ navigate, context }) {
  const { lernfeldId, themenfeldId, screenIndex = 0 } = context;
  const [steps, setSteps] = useState(null);
  const [stepData, setStepData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(screenIndex);

  // Steps laden (einmalig)
  useEffect(() => {
    const lf = Object.values(allContent).find((l) => l.id === lernfeldId);
    const tfMeta = lf?.themenfelder.find((t) => t.id === themenfeldId);
    tfMeta?.data().then((mod) => setSteps(mod.default.steps));
  }, [lernfeldId, themenfeldId]);

  // StepData laden wenn sich currentIndex oder steps ändern
  useEffect(() => {
    if (!steps) return;
    setStepData(null);
    steps[currentIndex].data().then((mod) => setStepData(mod.default));
  }, [steps, currentIndex]);

  function handleComplete() {
    markScreenDone(lernfeldId, themenfeldId, currentIndex, steps.length);
    if (currentIndex < steps.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      navigate("lernfeld", { lernfeldId });
    }
  }

  if (!steps) {
    return (
      <div
        className="grid-bg"
        style={{ minHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <span style={{ color: "var(--c-teal)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
          Lade…
        </span>
      </div>
    );
  }

  const currentStep = steps[currentIndex];
  const ScreenComponent = SCREEN_MAP[currentStep.type];

  if (!ScreenComponent) {
    return (
      <div
        className="grid-bg"
        style={{ minHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <span style={{ color: "var(--c-warn)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
          Unbekannter Screen-Typ: {currentStep.type}
        </span>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", minHeight: "100%" }}>
      {/* Zurück zum Lernfeld — über jedem Flow-Screen */}
      <Button
        variant="ghost"
        onClick={() => navigate("lernfeld", { lernfeldId })}
        style={{ position: "absolute", top: 12, left: 12, zIndex: 20 }}
      >
        ← Zurück
      </Button>

      {/* DEV-Skip: überspringt den aktuellen Schritt (ignoriert dessen Hürde). Nur im Dev-Modus. */}
      {import.meta.env.DEV && (
        <Button
          variant="ghost"
          onClick={handleComplete}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 20,
            color: "var(--c-ember)",
            borderColor: "var(--c-ember)",
          }}
        >
          Überspringen →
        </Button>
      )}
      <motion.div key={currentIndex} {...fade}>
        <ScreenComponent
          data={stepData}
          onComplete={handleComplete}
          navigate={navigate}
          currentStep={currentIndex + 1}
          totalSteps={steps.length}
          lernfeldId={lernfeldId}
          themenfeldId={themenfeldId}
        />
      </motion.div>
    </div>
  );
}
