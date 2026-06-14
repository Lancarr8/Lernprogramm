// schaltung.js — tf-06-sicherheit

export default {
  titel: "Schutzschaltung: FI-Schalter und Sicherung",
  beschreibung:
    "Eine typische Schutzschaltung im Haushalt: " +
    "Sicherung (Leitungsschutzschalter) und FI-Schalter (RCD) sch\u00fctzen " +
    "gegen \u00dcberstrom und Fehlerstrom.",
  schaltplan: {
    typ: "svg-inline",
    svg: `<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="gs2" width="26" height="26" patternUnits="userSpaceOnUse">
      <path d="M26 0L0 0 0 26" fill="none" stroke="rgba(79,210,194,0.05)" stroke-width="0.8"/>
    </pattern>
  </defs>
  <rect width="520" height="260" fill="url(#gs2)"/>

  <!-- L conductor (Phase) -->
  <text x="30" y="78" fill="#E8745C" font-family="monospace" font-size="11" font-weight="bold">L</text>
  <line x1="50" y1="75" x2="100" y2="75" stroke="#E8745C" stroke-width="2"/>

  <!-- Sicherung / LSS -->
  <rect x="100" y="63" width="50" height="24" rx="3" fill="#0E1518" stroke="#E8745C" stroke-width="2"/>
  <line x1="125" y1="63" x2="125" y2="87" stroke="#E8745C" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="125" y="55" fill="#E8F0EE" font-family="monospace" font-size="9" text-anchor="middle">Sicherung</text>
  <text x="125" y="100" fill="#86999A" font-family="monospace" font-size="9" text-anchor="middle">16 A</text>
  <line x1="150" y1="75" x2="190" y2="75" stroke="#E8745C" stroke-width="2"/>

  <!-- FI-Schalter -->
  <rect x="190" y="55" width="70" height="40" rx="4" fill="#0E1518" stroke="#4FD2C2" stroke-width="2"/>
  <text x="225" y="73" fill="#4FD2C2" font-family="monospace" font-size="10" text-anchor="middle">FI</text>
  <text x="225" y="87" fill="#4FD2C2" font-family="monospace" font-size="8" text-anchor="middle">30 mA</text>
  <line x1="260" y1="75" x2="300" y2="75" stroke="#E8745C" stroke-width="2"/>

  <!-- N conductor -->
  <text x="30" y="138" fill="#86999A" font-family="monospace" font-size="11" font-weight="bold">N</text>
  <line x1="50" y1="135" x2="190" y2="135" stroke="#86999A" stroke-width="2"/>
  <line x1="260" y1="135" x2="300" y2="135" stroke="#86999A" stroke-width="2"/>
  <!-- N through FI -->
  <line x1="190" y1="135" x2="190" y2="95" stroke="#86999A" stroke-width="1.5"/>
  <line x1="190" y1="95" x2="200" y2="95" stroke="#86999A" stroke-width="1.5"/>
  <line x1="250" y1="95" x2="260" y2="95" stroke="#86999A" stroke-width="1.5"/>
  <line x1="260" y1="95" x2="260" y2="135" stroke="#86999A" stroke-width="1.5"/>

  <!-- PE conductor (Schutzerde) -->
  <text x="30" y="198" fill="#4FD2C2" font-family="monospace" font-size="11" font-weight="bold">PE</text>
  <line x1="50" y1="195" x2="350" y2="195" stroke="#4FD2C2" stroke-width="2"/>

  <!-- Load (Verbraucher) -->
  <rect x="300" y="63" width="60" height="24" rx="3" fill="#0E1518" stroke="#86999A" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="330" y="78" fill="#86999A" font-family="monospace" font-size="9" text-anchor="middle">Verbraucher</text>
  <line x1="360" y1="75" x2="380" y2="75" stroke="#E8745C" stroke-width="2"/>
  <line x1="360" y1="135" x2="380" y2="135" stroke="#86999A" stroke-width="2"/>

  <!-- Earth connection from load to PE -->
  <line x1="380" y1="75" x2="380" y2="195" stroke="#4FD2C2" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="390" y="140" fill="#4FD2C2" font-family="monospace" font-size="8">Geh\u00e4use</text>
  <text x="390" y="152" fill="#4FD2C2" font-family="monospace" font-size="8">geerdet</text>

  <!-- GND symbol -->
  <line x1="350" y1="195" x2="350" y2="208" stroke="#4FD2C2" stroke-width="2"/>
  <line x1="336" y1="208" x2="364" y2="208" stroke="#4FD2C2" stroke-width="2.5"/>
  <line x1="340" y1="215" x2="360" y2="215" stroke="#4FD2C2" stroke-width="1.5"/>
  <line x1="344" y1="222" x2="356" y2="222" stroke="#4FD2C2" stroke-width="1"/>

  <!-- FI explanation -->
  <text x="225" y="160" fill="#4FD2C2" font-family="monospace" font-size="8" text-anchor="middle">FI vergleicht I_L und I_N</text>
  <text x="225" y="172" fill="#4FD2C2" font-family="monospace" font-size="8" text-anchor="middle">Differenz &gt; 30 mA \u2192 Ausl\u00f6sung</text>

  <text x="260" y="242" fill="#86999A" font-family="monospace" font-size="9" text-anchor="middle" letter-spacing="1">L=Phase \u00b7 N=Neutral \u00b7 PE=Schutzerde \u00b7 FI=Fehlerstromschutz</text>
</svg>`,
  },
  frage: "Warum l\u00f6st der FI-Schalter aus wenn jemand einen spannungsf\u00fchrenden Leiter ber\u00fchrt?",
  antwort:
    "Der FI-Schalter vergleicht den Strom in L (Phase) und N (Neutral). " +
    "Normalerweise gleich. " +
    "Flie\u00dft Strom \u00fcber einen K\u00f6rper zur Erde, fehlt dieser Strom im R\u00fcckleiter. " +
    "Die Differenz (Fehlerstrom) l\u00f6st den FI in unter 30 ms aus \u2014 " +
    "zu schnell f\u00fcr einen t\u00f6dlichen Schaden.",
  aufgebautMit: [],
};
