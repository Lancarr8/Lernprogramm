import React from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import App from "./App.jsx";
import { applyTokens } from "./theme/applyTokens.js";
import "./styles/global.css";

// Tokens als CSS-Vars auf :root spiegeln, bevor gerendert wird.
applyTokens();

// reducedMotion="user" -> Framer respektiert prefers-reduced-motion global.
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>
);
