// progress.js — Einziger Zugriffspunkt für Lernfortschritt in localStorage.
// Alle anderen Module lesen/schreiben NUR über diese API.

const KEY = "lernprogramm:progress";

const DEFAULT = {
  lastVisited: null,
  lernfelder: {},
};

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : structuredClone(DEFAULT);
  } catch {
    return structuredClone(DEFAULT);
  }
}

export function saveProgress(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Progress konnte nicht gespeichert werden:", e);
  }
}

export function markScreenDone(lernfeldId, themenfeldId, screenIndex, totalScreens) {
  const data = loadProgress();
  if (!data.lernfelder[lernfeldId]) data.lernfelder[lernfeldId] = { themenfelder: {} };
  const lf = data.lernfelder[lernfeldId];
  if (!lf.themenfelder[themenfeldId]) {
    lf.themenfelder[themenfeldId] = {
      completed: false,
      screens: Array(totalScreens).fill(false),
      score: null,
      attempts: 0,
    };
  }
  const tf = lf.themenfelder[themenfeldId];
  tf.screens[screenIndex] = true;
  tf.attempts += 1;
  tf.completed = tf.screens.every(Boolean);
  data.lastVisited = { lernfeldId, themenfeldId, screenIndex };
  saveProgress(data);
}

export function resetProgress() {
  localStorage.removeItem(KEY);
}
