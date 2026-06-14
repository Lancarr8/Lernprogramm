// schaltung.js — tf-04-schaltzeichen

export default {
  titel: "Schaltzeichen: Referenzkarte",
  beschreibung:
    "Die wichtigsten Schaltzeichen nach DIN EN 60617. " +
    "Lerne sie auswendig \u2014 du wirst ihnen in jedem Schaltplan begegnen.",
  schaltplan: {
    typ: "svg-inline",
    svg: `<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="gs" width="26" height="26" patternUnits="userSpaceOnUse">
      <path d="M26 0L0 0 0 26" fill="none" stroke="rgba(79,210,194,0.05)" stroke-width="0.8"/>
    </pattern>
  </defs>
  <rect width="520" height="300" fill="url(#gs)"/>

  <!-- Row 1 -->
  <!-- Spannungsquelle -->
  <line x1="50" y1="55" x2="50" y2="90" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="38" y1="65" x2="62" y2="65" stroke="#4FD2C2" stroke-width="3" stroke-linecap="round"/>
  <line x1="42" y1="78" x2="58" y2="78" stroke="#4FD2C2" stroke-width="1.5" stroke-linecap="round"/>
  <text x="50" y="108" fill="#E8F0EE" font-family="monospace" font-size="10" text-anchor="middle">Spannungsquelle</text>

  <!-- Widerstand -->
  <line x1="145" y1="72" x2="165" y2="72" stroke="#4FD2C2" stroke-width="2"/>
  <rect x="165" y="62" width="50" height="20" rx="2" fill="#0E1518" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="215" y1="72" x2="235" y2="72" stroke="#4FD2C2" stroke-width="2"/>
  <text x="190" y="100" fill="#E8F0EE" font-family="monospace" font-size="10" text-anchor="middle">Widerstand</text>

  <!-- Kondensator -->
  <line x1="305" y1="72" x2="320" y2="72" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="320" y1="58" x2="320" y2="86" stroke="#4FD2C2" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="328" y1="58" x2="328" y2="86" stroke="#4FD2C2" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="328" y1="72" x2="344" y2="72" stroke="#4FD2C2" stroke-width="2"/>
  <text x="325" y="100" fill="#E8F0EE" font-family="monospace" font-size="10" text-anchor="middle">Kondensator</text>

  <!-- Schalter -->
  <line x1="405" y1="72" x2="422" y2="72" stroke="#4FD2C2" stroke-width="2"/>
  <circle cx="422" cy="72" r="3" fill="#4FD2C2"/>
  <line x1="424" y1="72" x2="438" y2="60" stroke="#4FD2C2" stroke-width="2" stroke-linecap="round"/>
  <circle cx="440" cy="72" r="3" fill="#4FD2C2"/>
  <line x1="440" y1="72" x2="458" y2="72" stroke="#4FD2C2" stroke-width="2"/>
  <text x="432" y="100" fill="#E8F0EE" font-family="monospace" font-size="10" text-anchor="middle">Schalter</text>

  <!-- Divider -->
  <line x1="20" y1="120" x2="500" y2="120" stroke="rgba(79,210,194,0.15)" stroke-width="1"/>

  <!-- Row 2 -->
  <!-- Diode/LED -->
  <line x1="50" y1="172" x2="65" y2="172" stroke="#FFA24D" stroke-width="2"/>
  <polygon points="65,158 65,186 88,172" fill="rgba(255,162,77,0.15)" stroke="#FFA24D" stroke-width="2" stroke-linejoin="round"/>
  <line x1="88" y1="158" x2="88" y2="186" stroke="#FFA24D" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="88" y1="172" x2="103" y2="172" stroke="#FFA24D" stroke-width="2"/>
  <line x1="93" y1="160" x2="100" y2="150" stroke="#FFA24D" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="98" y1="163" x2="106" y2="153" stroke="#FFA24D" stroke-width="1.5" stroke-linecap="round"/>
  <text x="76" y="205" fill="#E8F0EE" font-family="monospace" font-size="10" text-anchor="middle">LED</text>

  <!-- Gluehlampe -->
  <line x1="160" y1="172" x2="175" y2="172" stroke="#4FD2C2" stroke-width="2"/>
  <circle cx="190" cy="172" r="15" fill="#0E1518" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="182" y1="164" x2="198" y2="180" stroke="#4FD2C2" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="182" y1="180" x2="198" y2="164" stroke="#4FD2C2" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="205" y1="172" x2="220" y2="172" stroke="#4FD2C2" stroke-width="2"/>
  <text x="190" y="205" fill="#E8F0EE" font-family="monospace" font-size="10" text-anchor="middle">Gl\u00fchlampe</text>

  <!-- Sicherung -->
  <line x1="285" y1="172" x2="300" y2="172" stroke="#4FD2C2" stroke-width="2"/>
  <rect x="300" y="162" width="40" height="20" rx="2" fill="#0E1518" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="320" y1="162" x2="320" y2="182" stroke="#4FD2C2" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3,2"/>
  <line x1="340" y1="172" x2="355" y2="172" stroke="#4FD2C2" stroke-width="2"/>
  <text x="320" y="205" fill="#E8F0EE" font-family="monospace" font-size="10" text-anchor="middle">Sicherung</text>

  <!-- Motor -->
  <line x1="395" y1="172" x2="410" y2="172" stroke="#4FD2C2" stroke-width="2"/>
  <circle cx="425" cy="172" r="15" fill="#0E1518" stroke="#4FD2C2" stroke-width="2"/>
  <text x="425" y="176" fill="#4FD2C2" font-family="monospace" font-size="12" text-anchor="middle" font-weight="bold">M</text>
  <line x1="440" y1="172" x2="455" y2="172" stroke="#4FD2C2" stroke-width="2"/>
  <text x="425" y="205" fill="#E8F0EE" font-family="monospace" font-size="10" text-anchor="middle">Motor</text>

  <!-- Divider 2 -->
  <line x1="20" y1="220" x2="500" y2="220" stroke="rgba(79,210,194,0.15)" stroke-width="1"/>

  <!-- Spule -->
  <line x1="50" y1="255" x2="68" y2="255" stroke="#4FD2C2" stroke-width="2"/>
  <path d="M68 255 Q74 240 80 255 Q86 270 92 255 Q98 240 104 255 Q110 270 116 255" fill="none" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="116" y1="255" x2="134" y2="255" stroke="#4FD2C2" stroke-width="2"/>
  <text x="92" y="278" fill="#E8F0EE" font-family="monospace" font-size="10" text-anchor="middle">Spule / Induktivit\u00e4t</text>

  <!-- Transistor NPN simplified -->
  <line x1="230" y1="255" x2="250" y2="255" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="250" y1="235" x2="250" y2="275" stroke="#4FD2C2" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="250" y1="247" x2="268" y2="238" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="268" y1="238" x2="268" y2="228" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="250" y1="263" x2="268" y2="272" stroke="#4FD2C2" stroke-width="2"/>
  <path d="M264 268 L268 272 L264 274" fill="none" stroke="#4FD2C2" stroke-width="1.5"/>
  <line x1="268" y1="272" x2="268" y2="282" stroke="#4FD2C2" stroke-width="2"/>
  <text x="259" y="295" fill="#E8F0EE" font-family="monospace" font-size="10" text-anchor="middle">Transistor (NPN)</text>

  <!-- Erde/GND -->
  <line x1="380" y1="240" x2="380" y2="252" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="366" y1="252" x2="394" y2="252" stroke="#4FD2C2" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="370" y1="260" x2="390" y2="260" stroke="#4FD2C2" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="374" y1="268" x2="386" y2="268" stroke="#4FD2C2" stroke-width="1" stroke-linecap="round"/>
  <text x="380" y="283" fill="#E8F0EE" font-family="monospace" font-size="10" text-anchor="middle">Erde (GND)</text>

  <text x="260" y="295" fill="#86999A" font-family="monospace" font-size="9" text-anchor="middle" letter-spacing="1">DIN EN 60617 / IEC 60617</text>
</svg>`,
  },
  frage: "Welche drei Schaltzeichen kommen in JEDER einfachen Schaltung vor?",
  antwort:
    "Spannungsquelle (Energieversorgung), Widerstand (Strombegrenzung / Last) " +
    "und Leiter (Verbindungslinien). Alle anderen Symbole sind Erg\u00e4nzungen.",
  aufgebautMit: [],
};
