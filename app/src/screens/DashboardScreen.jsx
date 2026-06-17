import { motion } from "framer-motion";
import Panel from "../components/Panel.jsx";
import Button from "../components/Button.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { rise } from "../theme/motion.js";
import * as allContent from "../content/index.js";
import { useProgress } from "../data/ProgressContext.jsx";

// DashboardScreen — Übersicht aller Lernfelder + Fortschritt + Wiedereinstieg.

function getLernfeldProgress(lernfeld, progress) {
  const lf = progress.lernfelder[lernfeld.id];
  if (!lf) return { done: 0, total: lernfeld.themenfelder.length };
  const done = lernfeld.themenfelder.filter((tf) => lf.themenfelder[tf.id]?.completed).length;
  return { done, total: lernfeld.themenfelder.length };
}

// Titel von Lernfeld + Themenbereich für das "Weitermachen"-Banner auflösen.
function resolveLastVisited(lastVisited, lernfelder) {
  if (!lastVisited) return null;
  const lernfeld = lernfelder.find((lf) => lf.id === lastVisited.lernfeldId);
  if (!lernfeld) return null;
  const themenfeld = lernfeld.themenfelder.find((tf) => tf.id === lastVisited.themenfeldId);
  if (!themenfeld) return null;
  return { lernfeld, themenfeld };
}

export default function DashboardScreen({ navigate }) {
  const { progress } = useProgress();
  const lernfelder = Object.values(allContent);
  const last = resolveLastVisited(progress.lastVisited, lernfelder);

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
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            className="mono"
            style={{ fontSize: 12, color: "var(--c-dim)", letterSpacing: ".04em" }}
          >
            LERNPROGRAMM
          </span>
          <span className="mono" style={{ fontSize: 12, color: "var(--c-teal)" }}>
            v0.1
          </span>
        </div>

        {/* Weitermachen-Banner */}
        {last && (
          <Panel tone="pan2">
            <span
              className="mono"
              style={{
                fontSize: 10.5,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "var(--c-teal)",
              }}
            >
              Weitermachen
            </span>
            <p style={{ margin: "8px 0 14px", fontSize: 15, color: "var(--c-ink)" }}>
              {last.lernfeld.titel} · {last.themenfeld.titel}
            </p>
            <Button variant="go" onClick={() => navigate("flow", progress.lastVisited)}>
              Hier weiterlernen
            </Button>
          </Panel>
        )}

        {/* Lernfeld-Karten */}
        {lernfelder.map((lf) => {
          const { done, total } = getLernfeldProgress(lf, progress);
          const fertig = total > 0 && done === total;
          return (
            <Panel
              key={lf.id}
              onClick={() => navigate("lernfeld", { lernfeldId: lf.id })}
              style={{ cursor: "pointer" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <h2 style={{ margin: 0, fontSize: 18 }}>{lf.titel}</h2>
                <span
                  className="mono"
                  style={{ fontSize: 11.5, color: "var(--c-dim)", whiteSpace: "nowrap" }}
                >
                  LF {lf.ihkNummer}
                </span>
              </div>

              <ProgressBar done={done} total={total} style={{ margin: "13px 0 9px" }} />

              <span
                className="mono"
                style={{ fontSize: 11.5, color: fertig ? "var(--c-teal)" : "var(--c-dim)" }}
              >
                {fertig ? "Abgeschlossen ✓" : `${done} von ${total} abgeschlossen`}
              </span>
            </Panel>
          );
        })}
      </motion.div>
    </div>
  );
}
