// Icons.jsx — Inline-SVG-Icon-Bibliothek. stroke=currentColor → Farbe vom Parent.
// viewBox 0 0 24 24, strokeWidth 1.8 — einheitlicher Stil über alle Screens.
// Konsolidiert aus den ehemals lokalen Defs in
// SelfExplanationScreen / LernfeldScreen / SelbstBauenScreen / CircuitBuilder.

export const Svg = (p) => (
  <svg
    width={p.size || 18}
    height={p.size || 18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flex: "none" }}
  >
    {p.children}
  </svg>
);

export const IconCheck = (p) => (
  <Svg size={p.size}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.5 2.5 4.5-5" />
  </Svg>
);

export const IconCircle = (p) => (
  <Svg size={p.size}>
    <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
  </Svg>
);

export const IconWarn = (p) => (
  <Svg size={p.size}>
    <path d="M12 3l9 16H3z" />
    <path d="M12 10v4" />
    <path d="M12 17.5v.5" />
  </Svg>
);

export const IconArrow = (p) => (
  <Svg size={p.size}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </Svg>
);

export const IconMsg = (p) => (
  <Svg size={p.size}>
    <path d="M4 5h16v11H9l-4 3v-3H4z" />
  </Svg>
);

export const IconSchool = (p) => (
  <Svg size={p.size}>
    <path d="M3 8l9-4 9 4-9 4z" />
    <path d="M7 10.5V15c0 1 2.2 2 5 2s5-1 5-2v-4.5" />
  </Svg>
);

export const IconShield = (p) => (
  <Svg size={p.size}>
    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </Svg>
);

export const IconLock = (p) => (
  <Svg size={p.size}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </Svg>
);

export const IconTick = (p) => (
  <Svg size={p.size}>
    <path d="M5 12.5l4 4 9-10" />
  </Svg>
);
