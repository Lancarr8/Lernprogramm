// schaltung.js — tf-05-messen: Messverfahren

export default {
  titel: "Schaltung: Richtig messen",
  beschreibung:
    "Eine LED-Schaltung mit Vorwiderstand. " +
    "Lerne wo Voltmeter (V) und Amperemeter (A) richtig angeschlossen werden.",
  schaltplan: {
    typ: "svg-inline",
    svg: `<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="gm" width="26" height="26" patternUnits="userSpaceOnUse">
      <path d="M26 0L0 0 0 26" fill="none" stroke="rgba(79,210,194,0.05)" stroke-width="0.8"/>
    </pattern>
  </defs>
  <rect width="520" height="260" fill="url(#gm)"/>

  <!-- Main circuit -->
  <!-- Top rail -->
  <line x1="80" y1="60" x2="440" y2="60" stroke="#4FD2C2" stroke-width="2"/>
  <!-- Right vertical -->
  <line x1="440" y1="60" x2="440" y2="180" stroke="#4FD2C2" stroke-width="2"/>
  <!-- Bottom rail -->
  <line x1="80" y1="180" x2="440" y2="180" stroke="#4FD2C2" stroke-width="2"/>
  <!-- Left vertical (battery) -->
  <line x1="80" y1="60" x2="80" y2="180" stroke="#4FD2C2" stroke-width="2"/>

  <!-- Battery -->
  <line x1="70" y1="105" x2="90" y2="105" stroke="#4FD2C2" stroke-width="3" stroke-linecap="round"/>
  <line x1="74" y1="118" x2="86" y2="118" stroke="#4FD2C2" stroke-width="1.5" stroke-linecap="round"/>
  <text x="94" y="109" fill="#FFA24D" font-family="monospace" font-size="11" font-weight="700">+</text>
  <text x="94" y="122" fill="#86999A" font-family="monospace" font-size="11">\u2212</text>
  <text x="44" y="116" fill="#4FD2C2" font-family="monospace" font-size="10" text-anchor="middle">5 V</text>

  <!-- Amperemeter IN SERIES (top rail, between bat+ and R) -->
  <line x1="80" y1="60" x2="130" y2="60" stroke="#4FD2C2" stroke-width="2"/>
  <circle cx="150" cy="60" r="16" fill="#0E1518" stroke="#86999A" stroke-width="2"/>
  <text x="150" y="64" fill="#86999A" font-family="monospace" font-size="11" text-anchor="middle" font-weight="bold">A</text>
  <line x1="166" y1="60" x2="190" y2="60" stroke="#4FD2C2" stroke-width="2"/>
  <text x="150" y="93" fill="#86999A" font-family="monospace" font-size="9" text-anchor="middle">in Reihe</text>

  <!-- Resistor -->
  <rect x="190" y="48" width="70" height="24" rx="3" fill="#0E1518" stroke="#4FD2C2" stroke-width="2"/>
  <text x="225" y="42" fill="#E8F0EE" font-family="monospace" font-size="10" text-anchor="middle">R = 150 \u03a9</text>
  <line x1="260" y1="60" x2="290" y2="60" stroke="#4FD2C2" stroke-width="2"/>

  <!-- LED -->
  <polygon points="290,48 290,72 314,60" fill="rgba(255,162,77,0.15)" stroke="#FFA24D" stroke-width="2" stroke-linejoin="round"/>
  <line x1="314" y1="48" x2="314" y2="72" stroke="#FFA24D" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="314" y1="60" x2="340" y2="60" stroke="#4FD2C2" stroke-width="2"/>
  <text x="302" y="85" fill="#FFA24D" font-family="monospace" font-size="10" text-anchor="middle">LED</text>

  <!-- Voltmeter PARALLEL to LED -->
  <line x1="290" y1="60" x2="290" y2="130" stroke="#FFA24D" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="340" y1="60" x2="340" y2="130" stroke="#FFA24D" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="290" y1="130" x2="310" y2="130" stroke="#FFA24D" stroke-width="1.5"/>
  <circle cx="325" cy="130" r="16" fill="#0E1518" stroke="#FFA24D" stroke-width="2"/>
  <text x="325" y="134" fill="#FFA24D" font-family="monospace" font-size="11" text-anchor="middle" font-weight="bold">V</text>
  <line x1="340" y1="130" x2="340" y2="130" stroke="#FFA24D" stroke-width="1.5"/>
  <text x="315" y="162" fill="#FFA24D" font-family="monospace" font-size="9" text-anchor="middle">parallel zur LED</text>

  <!-- Voltmeter right connection -->
  <line x1="340" y1="130" x2="360" y2="130" stroke="#FFA24D" stroke-width="1.5"/>

  <!-- Labels -->
  <text x="150" y="200" fill="#86999A" font-family="monospace" font-size="9" text-anchor="middle">Amperemeter in Reihe:</text>
  <text x="150" y="212" fill="#86999A" font-family="monospace" font-size="9" text-anchor="middle">misst I durch Schaltung</text>
  <text x="360" y="200" fill="#FFA24D" font-family="monospace" font-size="9" text-anchor="middle">Voltmeter parallel:</text>
  <text x="360" y="212" fill="#FFA24D" font-family="monospace" font-size="9" text-anchor="middle">misst U an der LED</text>

  <text x="260" y="242" fill="#86999A" font-family="monospace" font-size="9" text-anchor="middle" letter-spacing="1">V PARALLEL \u00b7 A IN REIHE \u00b7 R SPANNUNGSLOS</text>
</svg>`,
  },
  frage: "Warum darf das Amperemeter nicht parallel zur LED geschaltet werden?",
  antwort:
    "Das Amperemeter hat fast keinen Innenwiderstand (~0 \u03a9). " +
    "Parallel zur LED w\u00fcrde es die LED \u00fcberbr\u00fccken \u2014 Kurzschluss. " +
    "Der gesamte Strom fl\u00f6sse durch das Amperemeter, die LED bliebe dunkel " +
    "und das Ger\u00e4t w\u00fcrde m\u00f6glicherweise zerst\u00f6rt.",
  aufgebautMit: [
    "LED-Schaltung aus tf-01-uri",
    "Multimeter (auf Gleichspannung / Gleichstrom stellen)",
    "Verbindungskabel",
  ],
};
