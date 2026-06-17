// ProgressContext — reaktiver Lernfortschritt. Hält den Progress-State im Speicher
// und persistiert über progress.js. Ersetzt loadProgress()-Direktaufrufe in Render-Bodies,
// damit Dashboard/Lernfeld nach einem Schritt ohne Page-Reload aktualisieren.

// Context-Modul exportiert bewusst Provider + useProgress-Hook zusammen (Standard-Muster).
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { loadProgress, markScreenDone, resetProgress } from "./progress.js";

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => loadProgress());

  function markDone(lernfeldId, themenfeldId, screenIndex, totalScreens) {
    markScreenDone(lernfeldId, themenfeldId, screenIndex, totalScreens);
    setProgress(loadProgress());
  }

  function reset() {
    resetProgress();
    setProgress(loadProgress());
  }

  return (
    <ProgressContext.Provider value={{ progress, markDone, reset }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress muss innerhalb von <ProgressProvider> verwendet werden");
  return ctx;
}
