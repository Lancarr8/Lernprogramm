// motion.js — Motion-Tokens (Dauer/Easing einmal definiert) + wiederverwendbare
// Framer-Varianten. prefers-reduced-motion wird global ueber <MotionConfig
// reducedMotion="user"> in main.jsx respektiert.

export const motion = {
  duration: { fast: 0.18, base: 0.32, slow: 0.5 },
  ease: {
    standard: [0.22, 1, 0.36, 1],
    in: [0.4, 0, 1, 1],
    out: [0, 0, 0.2, 1],
  },
};

export const rise = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: motion.duration.base, ease: motion.ease.standard },
};

export const pop = {
  initial: { opacity: 0, scale: 0.6 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: motion.duration.base, ease: motion.ease.standard },
};

export const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: motion.duration.fast, ease: motion.ease.standard },
};
