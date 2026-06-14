import { cssVars } from "./tokens.js";

// Spiegelt die Tokens als CSS-Custom-Properties auf :root (oder ein anderes Ziel).
// Einmal in main.jsx aufgerufen, danach koennen Styles var(--c-teal) usw. nutzen.
export function applyTokens(target = document.documentElement) {
  for (const [key, value] of Object.entries(cssVars)) {
    target.style.setProperty(key, value);
  }
}
