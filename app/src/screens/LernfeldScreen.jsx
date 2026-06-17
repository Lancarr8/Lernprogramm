import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Panel from "../components/Panel.jsx";
import Button from "../components/Button.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { rise } from "../theme/motion.js";
import * as allContent from "../content/index.js";
import { loadProgress } from "../data/progress.js";
import { IconCheck, IconLock, IconArrow } from "../components/Icons.jsx";

// LernfeldScreen — Alle Themenbereiche eines Lernfelds + persönliche Roadmap.
// Schrittanzahl pro Themenbereich kommt dynamisch aus der Content-Definition
// (lazy import), nie aus einer Konstante.

function StatusIcon({ state }) {
  if (state === "done") return <IconCheck size={17} />;
  if (state === "locked") return <IconLock size={16} />;
  return <IconArrow size={17} />; // open
}

function getStepStatus(tf, progress, unlocked) {
  const tfProgress = progress.lernfelder[tf._lernfeldId]?.themenfelder?.[tf.id];
  const completed = !!tfProgress?.completed;
  const started = !!tfProgress?.screens?.some(Boolean);
  if (completed) return { color: "var(--c-teal)", label: "Wiederholen", state: "done" };
  if (!unlocked) return { color: "var(--c-dim)", label: "Gesperrt", state: "locked" };
  if (started) return { color: "var(--c-ink)", label: "Weitermachen", state: "open" };
  return { color: "var(--c-ink)", label: "Starten", state: "open" };
}

export default function LernfeldScreen({ navigate, context }) {
  const progress = loadProgress();
  const lernfeld = Object.values(allContent).find((lf) => lf.id === context?.lernfeldId);

  // Schrittanzahl pro Themenbereich aus den lazy-geladenen tf-Modulen auflösen.
  const [stepCounts, setStepCounts] = useState({});
  useEffect(() => {
    if (!lernfeld) return;
    let cancelled = false;
    Promise.all(
      lernfeld.themenfelder.map((tf) => tf.data().then((mod) => [tf.id, mod.default.steps.length]))
    ).then((entries) => {
      if (!cancelled) setStepCounts(Object.fromEntries(entries));
    });
    return () => {
      cancelled = true;
    };
  }, [lernfeld]);

  if (!lernfeld) {
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
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "var(--c-dim)", marginBottom: 14 }}>Lernfeld nicht gefunden.</p>
          <Button onClick={() => navigate("dashboard")}>← Zurück</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid-bg" style={{ minHeight: "100%", padding: "22px 16px 40px" }}>
      <motion.div
        {...rise}
        style={{
          width: "100%",
          maxWidth: 560,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <Button variant="ghost" onClick={() => navigate("dashboard")} style={{ alignSelf: "flex-start" }}>
          ← Zurück
        </Button>

        <div>
          <span
            className="mono"
            style={{
              fontSize: 10.5,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "var(--c-teal)",
            }}
          >
            IHK-Lernfeld · Nr. {lernfeld.ihkNummer}
          </span>
          <h1 style={{ margin: "8px 0 0", fontSize: 26, letterSpacing: "-.01em" }}>
            {lernfeld.titel}
          </h1>
        </div>

        {lernfeld.themenfelder.map((tf, i) => {
          // Unlock: erster Themenbereich immer offen, sonst vorheriger completed.
          const prev = lernfeld.themenfelder[i - 1];
          const prevDone = i === 0 || !!progress.lernfelder[lernfeld.id]?.themenfelder?.[prev.id]?.completed;
          const status = getStepStatus({ ...tf, _lernfeldId: lernfeld.id }, progress, prevDone);

          const total = stepCounts[tf.id] ?? 0;
          const screens = progress.lernfelder[lernfeld.id]?.themenfelder?.[tf.id]?.screens ?? [];
          const done = screens.filter(Boolean).length;
          const locked = status.state === "locked";

          return (
            <Panel
              key={tf.id}
              style={{ opacity: locked ? 0.55 : 1, cursor: locked ? "default" : "pointer" }}
              onClick={
                locked
                  ? undefined
                  : () =>
                      navigate("flow", {
                        lernfeldId: lernfeld.id,
                        themenfeldId: tf.id,
                        screenIndex: 0,
                      })
              }
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  aria-hidden="true"
                  style={{ color: status.color, width: 18, display: "inline-flex", justifyContent: "center" }}
                >
                  <StatusIcon state={status.state} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h2 style={{ margin: 0, fontSize: 16 }}>{tf.titel}</h2>
                  <ProgressBar done={done} total={total} style={{ margin: "10px 0 0" }} />
                </div>
                {!locked && (
                  <Button
                    variant={status.state === "done" ? "default" : "go"}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("flow", {
                        lernfeldId: lernfeld.id,
                        themenfeldId: tf.id,
                        screenIndex: 0,
                      });
                    }}
                  >
                    {status.label}
                  </Button>
                )}
              </div>
            </Panel>
          );
        })}
      </motion.div>
    </div>
  );
}
