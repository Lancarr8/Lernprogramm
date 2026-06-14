// schaltung.js — tf-03-parallel: Parallelschaltung

export default {
  titel: "Schaltung: Zwei Widerst\u00e4nde parallel",
  beschreibung:
    "R1 = 60 \u03a9 und R2 = 40 \u03a9 liegen parallel an U = 12 V. " +
    "Beide Zweige haben dieselbe Spannung \u2014 der Strom teilt sich auf.",
  schaltplan: {
    typ: "svg-inline",
    svg: `<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="gp" width="26" height="26" patternUnits="userSpaceOnUse">
      <path d="M26 0L0 0 0 26" fill="none" stroke="rgba(79,210,194,0.05)" stroke-width="0.8"/>
    </pattern>
    <marker id="ar" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#4FD2C2" opacity="0.6"/>
    </marker>
  </defs>
  <rect width="520" height="240" fill="url(#gp)"/>

  <!-- Left rail -->
  <line x1="80" y1="50" x2="80" y2="190" stroke="#4FD2C2" stroke-width="2"/>
  <!-- Top rail -->
  <line x1="80" y1="50" x2="440" y2="50" stroke="#4FD2C2" stroke-width="2"/>
  <!-- Bottom rail -->
  <line x1="80" y1="190" x2="440" y2="190" stroke="#4FD2C2" stroke-width="2"/>
  <!-- Right rail -->
  <line x1="440" y1="50" x2="440" y2="190" stroke="#4FD2C2" stroke-width="2"/>

  <!-- Mid junctions (left) -->
  <line x1="80" y1="100" x2="160" y2="100" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="80" y1="150" x2="160" y2="150" stroke="#4FD2C2" stroke-width="2"/>
  <!-- Mid junctions (right) -->
  <line x1="320" y1="100" x2="440" y2="100" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="320" y1="150" x2="440" y2="150" stroke="#4FD2C2" stroke-width="2"/>

  <!-- Vertical connectors to branches -->
  <line x1="80" y1="50" x2="80" y2="100" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="80" y1="150" x2="80" y2="190" stroke="#4FD2C2" stroke-width="2"/>

  <!-- Battery (DIN) on left rail -->
  <line x1="70" y1="117" x2="90" y2="117" stroke="#4FD2C2" stroke-width="3" stroke-linecap="round"/>
  <line x1="74" y1="130" x2="86" y2="130" stroke="#4FD2C2" stroke-width="1.5" stroke-linecap="round"/>
  <text x="95" y="121" fill="#FFA24D" font-family="monospace" font-size="11" font-weight="700">+</text>
  <text x="95" y="134" fill="#86999A" font-family="monospace" font-size="11">\u2212</text>
  <text x="42" y="127" fill="#4FD2C2" font-family="monospace" font-size="11" text-anchor="middle">12 V</text>

  <!-- R1 top branch -->
  <rect x="160" y="88" width="160" height="24" rx="3" fill="#0E1518" stroke="#4FD2C2" stroke-width="2"/>
  <text x="240" y="82" fill="#E8F0EE" font-family="monospace" font-size="11" text-anchor="middle">R1 = 60 \u03a9</text>
  <text x="240" y="126" fill="#4FD2C2" font-family="monospace" font-size="10" text-anchor="middle">I1 = 200 mA</text>

  <!-- R2 bottom branch -->
  <rect x="160" y="138" width="160" height="24" rx="3" fill="#0E1518" stroke="#FFA24D" stroke-width="2"/>
  <text x="240" y="132" fill="#E8F0EE" font-family="monospace" font-size="11" text-anchor="middle">R2 = 40 \u03a9</text>
  <text x="240" y="176" fill="#FFA24D" font-family="monospace" font-size="10" text-anchor="middle">I2 = 300 mA</text>

  <!-- Current arrows -->
  <path d="M82 65 L82 85" stroke="#4FD2C2" stroke-width="1.5" marker-end="url(#ar)"/>
  <text x="92" y="78" fill="#86999A" font-family="monospace" font-size="10">I_ges = 500 mA</text>

  <!-- Junction dots -->
  <circle cx="80" cy="100" r="4" fill="#4FD2C2"/>
  <circle cx="80" cy="150" r="4" fill="#4FD2C2"/>
  <circle cx="440" cy="100" r="4" fill="#4FD2C2"/>
  <circle cx="440" cy="150" r="4" fill="#4FD2C2"/>

  <!-- Voltage label -->
  <text x="460" y="128" fill="#86999A" font-family="monospace" font-size="10">U = 12 V</text>
  <text x="460" y="140" fill="#86999A" font-family="monospace" font-size="10">an beiden</text>

  <text x="260" y="222" fill="#86999A" font-family="monospace" font-size="10" text-anchor="middle" letter-spacing="1">PARALLELSCHALTUNG \u00b7 U = 12 V \u00b7 R_ges = 24 \u03a9 \u00b7 I_ges = 500 mA</text>
</svg>`,
  },
  frage: "Wie gro\u00df ist der Gesamtwiderstand R_ges?",
  antwort:
    "R_ges = (R1 \u00b7 R2) / (R1 + R2) = (60 \u00b7 40) / (60 + 40) = 2400 / 100 = 24 \u03a9\n" +
    "Probe: I_ges = U / R_ges = 12 V / 24 \u03a9 = 0,5 A = 500 mA\n" +
    "I1 = 12/60 = 200 mA \u00b7 I2 = 12/40 = 300 mA \u2192 200+300 = 500 mA \u2713",
  aufgebautMit: [
    "Widerstand 60 \u03a9",
    "Widerstand 40 \u03a9",
    "12 V Spannungsquelle",
    "Multimeter",
    "Verbindungskabel",
    "Steckbrett",
  ],
};
