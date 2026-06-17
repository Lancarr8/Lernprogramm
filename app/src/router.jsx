// router.jsx — Zentraler App-State. Kein react-router — einfacher useState-Flow.
// Screens: "landing" | "dashboard" | "lernfeld" | "flow"

import { useState } from "react";
import { useProgress } from "./data/ProgressContext.jsx";

export function useRouter() {
  const { progress } = useProgress();
  const initialScreen = progress.lastVisited ? "dashboard" : "landing";

  const [screen, setScreen] = useState(initialScreen);
  const [context, setContext] = useState(null);

  function navigate(to, ctx = null) {
    setContext(ctx);
    setScreen(to);
  }

  return { screen, context, navigate };
}
