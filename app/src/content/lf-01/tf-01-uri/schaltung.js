// schaltung.js — tf-01-uri: Das Ohmsche Gesetz
// Schaltplan: LED mit Vorwiderstand (IEC-Symbole, DIN-konform)

export default {
  titel: "Schaltung: Vorwiderstand einer LED",
  beschreibung:
    "Ein Vorwiderstand R_V begrenzt den Strom durch die LED auf den zul\u00e4ssigen Wert. " +
    "Die Versorgungsspannung betr\u00e4gt U = 5 V, die LED ben\u00f6tigt U_LED = 2 V bei I = 20 mA. " +
    "Am Vorwiderstand fallen die restlichen 3 V ab.",
  schaltplan: {
    typ: "svg-inline",
    svg: `<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#4FD2C2" opacity="0.7"/>
    </marker>
    <pattern id="g" width="26" height="26" patternUnits="userSpaceOnUse">
      <path d="M26 0L0 0 0 26" fill="none" stroke="rgba(79,210,194,0.05)" stroke-width="0.8"/>
    </pattern>
  </defs>
  <rect width="520" height="220" fill="url(#g)"/>

  <!-- Leitungen -->
  <line x1="80" y1="55" x2="160" y2="55" stroke="#4FD2C2" stroke-width="2" stroke-linecap="round"/>
  <line x1="230" y1="55" x2="280" y2="55" stroke="#4FD2C2" stroke-width="2" stroke-linecap="round"/>
  <line x1="340" y1="55" x2="440" y2="55" stroke="#4FD2C2" stroke-width="2" stroke-linecap="round"/>
  <line x1="440" y1="55" x2="440" y2="165" stroke="#4FD2C2" stroke-width="2" stroke-linecap="round"/>
  <line x1="440" y1="165" x2="80" y2="165" stroke="#4FD2C2" stroke-width="2" stroke-linecap="round"/>
  <line x1="80" y1="165" x2="80" y2="55" stroke="#4FD2C2" stroke-width="2" stroke-linecap="round"/>
  <path d="M100 55 L120 55" stroke="#4FD2C2" stroke-width="1.5" marker-end="url(#arr)" opacity="0.6"/>

  <!-- Spannungsquelle (DIN) -->
  <line x1="70" y1="95" x2="90" y2="95" stroke="#4FD2C2" stroke-width="3" stroke-linecap="round"/>
  <line x1="73" y1="108" x2="87" y2="108" stroke="#4FD2C2" stroke-width="1.5" stroke-linecap="round"/>
  <text x="95" y="99" fill="#FFA24D" font-family="monospace" font-size="12" font-weight="700">+</text>
  <text x="95" y="113" fill="#86999A" font-family="monospace" font-size="12">\u2212</text>
  <text x="44" y="110" fill="#E8F0EE" font-family="monospace" font-size="11" text-anchor="middle">U</text>
  <text x="44" y="122" fill="#4FD2C2" font-family="monospace" font-size="11" text-anchor="middle">5 V</text>

  <!-- Widerstand (IEC-Rechteck) -->
  <rect x="160" y="43" width="70" height="24" rx="3" fill="#0E1518" stroke="#4FD2C2" stroke-width="2"/>
  <text x="195" y="36" fill="#E8F0EE" font-family="monospace" font-size="11" text-anchor="middle">R_V</text>
  <text x="195" y="82" fill="#4FD2C2" font-family="monospace" font-size="11" text-anchor="middle">150 \u03a9</text>
  <text x="195" y="94" fill="#86999A" font-family="monospace" font-size="9" text-anchor="middle">U_R = 3 V</text>

  <!-- LED (Diodensymbol) -->
  <polygon points="280,43 280,67 310,55" fill="rgba(255,162,77,0.15)" stroke="#FFA24D" stroke-width="2" stroke-linejoin="round"/>
  <line x1="310" y1="43" x2="310" y2="67" stroke="#FFA24D" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="310" y1="55" x2="340" y2="55" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="318" y1="40" x2="328" y2="30" stroke="#FFA24D" stroke-width="1.5" stroke-linecap="round" marker-end="url(#arr)"/>
  <line x1="324" y1="45" x2="336" y2="36" stroke="#FFA24D" stroke-width="1.5" stroke-linecap="round" marker-end="url(#arr)"/>
  <text x="305" y="36" fill="#E8F0EE" font-family="monospace" font-size="11" text-anchor="middle">LED</text>
  <text x="305" y="82" fill="#FFA24D" font-family="monospace" font-size="11" text-anchor="middle">D1</text>
  <text x="305" y="94" fill="#86999A" font-family="monospace" font-size="9" text-anchor="middle">U_LED = 2 V</text>

  <!-- GND -->
  <line x1="440" y1="165" x2="440" y2="175" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="430" y1="175" x2="450" y2="175" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="433" y1="179" x2="447" y2="179" stroke="#4FD2C2" stroke-width="1.5"/>
  <line x1="436" y1="183" x2="444" y2="183" stroke="#4FD2C2" stroke-width="1"/>

  <!-- Knotenpunkte -->
  <circle cx="80" cy="55" r="3" fill="#4FD2C2"/>
  <circle cx="440" cy="55" r="3" fill="#4FD2C2"/>
  <circle cx="80" cy="165" r="3" fill="#4FD2C2"/>

  <!-- Stromangabe -->
  <text x="390" y="115" fill="#86999A" font-family="monospace" font-size="10" text-anchor="middle">I = 20 mA</text>
  <line x1="390" y1="85" x2="390" y2="145" stroke="#86999A" stroke-width="1" stroke-dasharray="3,3"/>
  <path d="M385 135 L390 145 L395 135" fill="none" stroke="#86999A" stroke-width="1"/>

  <!-- Beschriftung -->
  <text x="260" y="205" fill="#86999A" font-family="monospace" font-size="10" text-anchor="middle" letter-spacing="1">LED MIT VORWIDERSTAND \u00b7 U = 5 V \u00b7 R_V = 150 \u03a9 \u00b7 I = 20 mA</text>
</svg>`,
  },
  frage: "Welchen Wert muss der Vorwiderstand R_V haben, damit die LED nicht durchbrennt?",
  antwort:
    "R_V = (U \u2212 U_LED) / I = (5 V \u2212 2 V) / 0,02 A = 150 \u03a9\n" +
    "Am Widerstand fallen 3 V ab, an der LED 2 V \u2014 zusammen 5 V.",
  aufgebautMit: [
    "LED (beliebige Farbe)",
    "Widerstand 150 \u03a9 (Farbcode: braun\u2013gr\u00fcn\u2013braun)",
    "5 V Spannungsquelle (z.\u202fB. USB-Netzteil)",
    "Verbindungskabel",
    "Steckbrett",
  ],
};
